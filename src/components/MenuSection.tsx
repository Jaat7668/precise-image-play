import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import MenuCard from "./MenuCard";
import { menuItems, type Category } from "@/lib/menu-data";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filtered = activeCategory === "all"
    ? menuItems
    : menuItems.filter((i) => i.category === activeCategory);

  return (
    <section id="menu" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">Our Menu</h2>
          <p className="text-muted-foreground text-lg">Handcrafted with love, baked to perfection</p>
        </div>
        <div className="mb-10">
          <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
