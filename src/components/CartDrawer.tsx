import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    toast.success("Order placed successfully! 🎉", {
      description: `Total: $${totalPrice.toFixed(2)} — Your food is being prepared.`,
    });
    clearCart();
    setIsOpen(false);
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
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
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

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-display text-lg font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
