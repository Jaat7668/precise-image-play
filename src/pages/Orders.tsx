import { useState } from "react";
import { useOrders, useOrderItems } from "@/hooks/use-orders";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/lib/cart-context";
import { useMenuItems } from "@/hooks/use-menu-items";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, ChevronUp, RefreshCw, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const statusColors: Record<string, string> = {
  pending: "bg-secondary text-secondary-foreground",
  confirmed: "bg-primary/10 text-primary",
  preparing: "bg-accent/10 text-accent",
  delivered: "bg-accent text-accent-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

const Orders = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: orders = [], isLoading } = useOrders();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  if (!loading && !user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h1 className="font-display text-3xl font-bold text-foreground mb-6">My Orders</h1>

        {isLoading ? (
          <p className="text-muted-foreground">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <p className="font-semibold text-muted-foreground">No orders yet</p>
            <p className="text-sm text-muted-foreground mt-1">Start ordering from our menu!</p>
            <Button className="mt-4" onClick={() => navigate("/")}>Browse Menu</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isExpanded={expandedOrderId === order.id}
                onToggle={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function OrderCard({ order, isExpanded, onToggle }: { order: any; isExpanded: boolean; onToggle: () => void }) {
  const { data: items = [] } = useOrderItems(isExpanded ? order.id : null);
  const { addItem } = useCart();
  const { data: menuItems = [] } = useMenuItems();

  const handleReorder = () => {
    for (const item of items) {
      const menuItem = menuItems.find((m) => m.id === item.menu_item_id);
      if (menuItem && menuItem.is_available && menuItem.stock > 0) {
        for (let i = 0; i < item.quantity; i++) {
          addItem(menuItem);
        }
      }
    }
    toast.success("Items added to cart!");
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
            <p className="font-semibold text-foreground">${order.total.toFixed(2)}</p>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${statusColors[order.status] || "bg-secondary text-secondary-foreground"}`}>
            {order.status}
          </span>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {isExpanded && (
        <div className="border-t border-border p-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.quantity}× {item.name}</span>
              <span className="text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          {order.discount > 0 && (
            <div className="flex justify-between text-sm text-accent">
              <span>Discount</span>
              <span>-${order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="pt-2 border-t border-border flex justify-between items-center">
            <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
            <Button variant="outline" size="sm" onClick={handleReorder} className="gap-1">
              <RefreshCw className="w-3 h-3" /> Reorder
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
