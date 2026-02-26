import { categories, type Category } from "@/lib/menu-data";

interface Props {
  active: Category | "all";
  onSelect: (cat: Category | "all") => void;
}

const CategoryFilter = ({ active, onSelect }: Props) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={() => onSelect("all")}
        className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
          active === "all"
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        🍽️ All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
            active === cat.id
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {cat.emoji} {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
