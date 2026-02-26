import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./use-auth";

export interface Order {
  id: string;
  user_id: string;
  status: string;
  subtotal: number;
  discount: number;
  total: number;
  delivery_address: string;
  coupon_code: string | null;
  loyalty_points_used: number;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string | null;
  name: string;
  price: number;
  quantity: number;
}

export function useOrders() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["orders", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as any[]).map(o => ({ ...o, subtotal: Number(o.subtotal), discount: Number(o.discount), total: Number(o.total) })) as Order[];
    },
  });
}

export function useOrderItems(orderId: string | null) {
  return useQuery({
    queryKey: ["order_items", orderId],
    enabled: !!orderId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId!);
      if (error) throw error;
      return (data as any[]).map(i => ({ ...i, price: Number(i.price) })) as OrderItem[];
    },
  });
}

interface PlaceOrderInput {
  items: { menu_item_id: string; name: string; price: number; quantity: number }[];
  subtotal: number;
  discount: number;
  total: number;
  delivery_address: string;
  coupon_code?: string;
  loyalty_points_used?: number;
}

export function usePlaceOrder() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (input: PlaceOrderInput) => {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user!.id,
          subtotal: input.subtotal,
          discount: input.discount,
          total: input.total,
          delivery_address: input.delivery_address,
          coupon_code: input.coupon_code || null,
          loyalty_points_used: input.loyalty_points_used || 0,
          status: "confirmed",
        })
        .select()
        .single();
      if (orderError) throw orderError;

      // Insert order items
      const orderItems = input.items.map((item) => ({
        order_id: order.id,
        menu_item_id: item.menu_item_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));
      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      // Decrement stock for each item
      for (const item of input.items) {
        await supabase.rpc("decrement_stock", { item_id: item.menu_item_id, qty: item.quantity });
      }

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["menu_items"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
