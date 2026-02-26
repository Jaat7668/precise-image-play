import { useState } from "react";
import { useCategories, useMenuItems } from "@/hooks/use-menu-items";
import MenuCard from "./MenuCard";
import { Skeleton } from "@/components/ui/skeleton";

const MenuSection = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | "all">("all");
  const { data: categories = [], isLoading: catLoading } = useCategories();
  const { data: menuItems = [], isLoading: menuLoading } = useMenuItems();

  const filtered = activeCategoryId === "all"
    ? menuItems
    : menuItems.filter((i) => i.category_id === activeCategoryId);

  return (
    <section id="menu" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">Our Menu</h2>
          <p className="text-muted-foreground text-lg">Handcrafted with love, baked to perfection</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <button
            onClick={() => setActiveCategoryId("all")}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
              activeCategoryId === "all"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            🍽️ All
          </button>
          {catLoading
            ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-10 w-28 rounded-full" />)
            : categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                    activeCategoryId === cat.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat.emoji} {cat.name}
                </button>
              ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-card rounded-lg overflow-hidden border border-border">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))
            : filtered.map((item) => <MenuCard key={item.id} item={item} />)}
        </div>
        {!menuLoading && filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">No items found in this category.</p>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
