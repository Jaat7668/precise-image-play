import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Minus, Plus, ShoppingBag, Trash2, Tag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/hooks/use-auth";
import { useProfile } from "@/hooks/use-profile";
import { usePlaceOrder } from "@/hooks/use-orders";
import { useValidateCoupon } from "@/hooks/use-promotions";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const placeOrder = usePlaceOrder();
  const validateCoupon = useValidateCoupon();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [loyaltyPointsUsed, setLoyaltyPointsUsed] = useState(0);

  const loyaltyDiscount = loyaltyPointsUsed * 0.01; // 1 point = $0.01
  const totalDiscount = discount + loyaltyDiscount;
  const finalTotal = Math.max(0, totalPrice - totalDiscount);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    const result = await validateCoupon(couponCode);
    if (result.valid) {
      const discountValue = result.discount_percent > 0
        ? totalPrice * (result.discount_percent / 100)
        : result.discount_amount;
      setDiscount(discountValue);
      setAppliedCoupon(couponCode.toUpperCase());
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please sign in to place an order");
      setIsOpen(false);
      navigate("/auth");
      return;
    }

    const address = profile?.delivery_address || "";
    if (!address) {
      toast.error("Please add a delivery address in your profile");
      setIsOpen(false);
      navigate("/profile");
      return;
    }

    try {
      await placeOrder.mutateAsync({
        items: items.map((i) => ({ menu_item_id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        subtotal: totalPrice,
        discount: totalDiscount,
        total: finalTotal,
        delivery_address: address,
        coupon_code: appliedCoupon || undefined,
        loyalty_points_used: loyaltyPointsUsed,
      });
      toast.success("Order placed successfully! 🎉", {
        description: `Total: $${finalTotal.toFixed(2)} — Your food is being prepared.`,
      });
      clearCart();
      setDiscount(0);
      setAppliedCoupon(null);
      setLoyaltyPointsUsed(0);
      setCouponCode("");
      setIsOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to place order");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col bg-card">
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="font-semibold">Your cart is empty</p>
              <p className="text-sm mt-1">Add some delicious items!</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 py-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 rounded-lg bg-secondary/50">
                  <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-card-foreground truncate">{item.name}</h4>
                    <p className="text-sm text-primary font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80">
                        <Plus className="w-3 h-3" />
                      </button>
                      <button onClick={() => removeItem(item.id)} className="ml-auto text-destructive hover:opacity-70">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              {/* Coupon */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="pl-9"
                    disabled={!!appliedCoupon}
                  />
                </div>
                {appliedCoupon ? (
                  <Button variant="outline" size="sm" onClick={() => { setAppliedCoupon(null); setDiscount(0); setCouponCode(""); }}>
                    Remove
                  </Button>
                ) : (
                  <Button variant="secondary" size="sm" onClick={handleApplyCoupon}>Apply</Button>
                )}
              </div>

              {/* Loyalty Points */}
              {profile && profile.loyalty_points > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Loyalty Points: {profile.loyalty_points}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (loyaltyPointsUsed > 0) {
                        setLoyaltyPointsUsed(0);
                      } else {
                        setLoyaltyPointsUsed(Math.min(profile.loyalty_points, Math.floor(totalPrice * 100)));
                      }
                    }}
                  >
                    {loyaltyPointsUsed > 0 ? "Remove" : "Use Points"}
                  </Button>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-accent"><span>Discount</span><span>-${totalDiscount.toFixed(2)}</span></div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="font-display text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold text-primary">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button onClick={handleCheckout} className="w-full py-3.5 text-lg font-semibold" disabled={placeOrder.isPending}>
                {placeOrder.isPending ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
