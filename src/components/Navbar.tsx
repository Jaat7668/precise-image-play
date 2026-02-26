import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const Navbar = () => {
  const { totalItems, setIsOpen } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="font-display text-2xl font-bold text-foreground">
          Crust<span className="text-primary">&</span>Chill
        </a>
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <ShoppingBag className="w-4 h-4" />
          Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground rounded-full text-xs flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
