import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DbMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string | null;
  brand_id: string | null;
  packaging: string;
  stock: number;
  is_popular: boolean;
  is_available: boolean;
  category_name?: string;
  category_emoji?: string;
}

export interface DbCategory {
  id: string;
  name: string;
  emoji: string;
  display_order: number;
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data as DbCategory[];
    },
  });
}

export function useMenuItems() {
  return useQuery({
    queryKey: ["menu_items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*, categories(name, emoji)")
        .eq("is_available", true)
        .order("name");
      if (error) throw error;
      return (data as any[]).map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: Number(item.price),
        image_url: item.image_url,
        category_id: item.category_id,
        brand_id: item.brand_id,
        packaging: item.packaging,
        stock: item.stock,
        is_popular: item.is_popular,
        is_available: item.is_available,
        category_name: item.categories?.name ?? "",
        category_emoji: item.categories?.emoji ?? "",
      })) as DbMenuItem[];
    },
  });
}
