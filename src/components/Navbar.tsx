import { ShoppingBag, User, ClipboardList, LogOut } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { totalItems, setIsOpen } = useCart();
  const { user, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold text-foreground">
          Crust<span className="text-primary">&</span>Chill
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="flex items-center gap-2">
                    <ClipboardList className="w-4 h-4" /> My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut} className="flex items-center gap-2 text-destructive">
                  <LogOut className="w-4 h-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
          )}

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
      </div>
    </nav>
  );
};

export default Navbar;
