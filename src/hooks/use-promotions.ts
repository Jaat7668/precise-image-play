import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Promotion {
  id: string;
  title: string;
  description: string;
  banner_url: string;
  discount_percent: number;
  is_active: boolean;
  starts_at: string;
  ends_at: string | null;
}

export function usePromotions() {
  return useQuery({
    queryKey: ["promotions"],
    queryFn: async () => {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from("promotions")
        .select("*")
        .eq("is_active", true)
        .lte("starts_at", now)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as any[]).map(p => ({ ...p, discount_percent: Number(p.discount_percent) })) as Promotion[];
    },
  });
}

export function useValidateCoupon() {
  return async (code: string): Promise<{ valid: boolean; discount_percent: number; discount_amount: number; message: string }> => {
    const { data, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", code.toUpperCase())
      .eq("is_active", true)
      .single();

    if (error || !data) return { valid: false, discount_percent: 0, discount_amount: 0, message: "Invalid coupon code" };

    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return { valid: false, discount_percent: 0, discount_amount: 0, message: "Coupon has expired" };
    }
    if (data.max_uses && data.current_uses >= data.max_uses) {
      return { valid: false, discount_percent: 0, discount_amount: 0, message: "Coupon usage limit reached" };
    }

    return {
      valid: true,
      discount_percent: Number(data.discount_percent),
      discount_amount: Number(data.discount_amount),
      message: `Coupon applied! ${Number(data.discount_percent) > 0 ? `${data.discount_percent}% off` : `$${data.discount_amount} off`}`,
    };
  };
}
