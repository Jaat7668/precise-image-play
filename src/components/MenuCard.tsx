import { Plus } from "lucide-react";
import type { DbMenuItem } from "@/hooks/use-menu-items";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

interface Props {
  item: DbMenuItem;
}

const MenuCard = ({ item }: Props) => {
  const { addItem } = useCart();

  const handleAdd = () => {
    if (item.stock <= 0) {
      toast.error("This item is out of stock");
      return;
    }
    addItem(item);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 animate-scale-in">
      <div className="relative overflow-hidden h-48">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {item.is_popular && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
            Popular
          </span>
        )}
        {item.stock <= 0 && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-bold text-sm">Out of Stock</span>
          </div>
        )}
        {item.stock > 0 && item.stock <= 5 && (
          <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full">
            Only {item.stock} left
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-display font-semibold text-lg text-card-foreground">{item.name}</h3>
          <span className="font-bold text-primary whitespace-nowrap">${item.price.toFixed(2)}</span>
        </div>
        {item.packaging && (
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded mb-2 inline-block">{item.packaging}</span>
        )}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
        <button
          onClick={handleAdd}
          disabled={item.stock <= 0}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          {item.stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
