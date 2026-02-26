import { Plus } from "lucide-react";
import type { MenuItem } from "@/lib/menu-data";
import { useCart } from "@/lib/cart-context";

interface Props {
  item: MenuItem;
}

const MenuCard = ({ item }: Props) => {
  const { addItem } = useCart();

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 animate-scale-in">
      <div className="relative overflow-hidden h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {item.popular && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
            Popular
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-lg text-card-foreground">{item.name}</h3>
          <span className="font-bold text-primary whitespace-nowrap">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
        <button
          onClick={() => addItem(item)}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
