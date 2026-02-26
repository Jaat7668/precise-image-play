export type Category = "pizza" | "drinks" | "breads";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  popular?: boolean;
}

export const categories: { id: Category; label: string; emoji: string }[] = [
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "drinks", label: "Cold Drinks", emoji: "🥤" },
  { id: "breads", label: "Breads", emoji: "🍞" },
];

export const menuItems: MenuItem[] = [
  {
    id: "p1",
    name: "Margherita Classic",
    description: "Fresh mozzarella, San Marzano tomatoes, basil, extra virgin olive oil",
    price: 12.99,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "p2",
    name: "Pepperoni Supreme",
    description: "Double pepperoni, mozzarella, oregano, chili flakes",
    price: 14.99,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "p3",
    name: "BBQ Chicken",
    description: "Grilled chicken, BBQ sauce, red onions, cilantro, smoked gouda",
    price: 15.99,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
  },
  {
    id: "p4",
    name: "Veggie Garden",
    description: "Bell peppers, mushrooms, olives, artichokes, fresh tomatoes",
    price: 13.99,
    category: "pizza",
    image: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=400&h=300&fit=crop",
  },
  {
    id: "d1",
    name: "Classic Cola",
    description: "Ice-cold classic cola, refreshing and bubbly",
    price: 2.99,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop",
  },
  {
    id: "d2",
    name: "Fresh Lemonade",
    description: "Freshly squeezed lemons, hint of mint, lightly sweetened",
    price: 3.99,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "d3",
    name: "Iced Tea",
    description: "Brewed black tea, chilled, with a slice of lemon",
    price: 2.49,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  },
  {
    id: "d4",
    name: "Sparkling Water",
    description: "Naturally carbonated mineral water",
    price: 1.99,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=400&h=300&fit=crop",
  },
  {
    id: "b1",
    name: "Garlic Breadsticks",
    description: "Warm breadsticks brushed with garlic butter and herbs",
    price: 5.99,
    category: "breads",
    image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400&h=300&fit=crop",
    popular: true,
  },
  {
    id: "b2",
    name: "Focaccia",
    description: "Italian flatbread with rosemary, sea salt, olive oil",
    price: 6.99,
    category: "breads",
    image: "https://images.unsplash.com/photo-1586444248879-bc604bc77dad?w=400&h=300&fit=crop",
  },
  {
    id: "b3",
    name: "Cheesy Pull-Apart",
    description: "Soft rolls stuffed with mozzarella and parmesan",
    price: 7.99,
    category: "breads",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
  },
  {
    id: "b4",
    name: "Ciabatta Rolls",
    description: "Crusty Italian bread rolls, perfect for dipping",
    price: 4.99,
    category: "breads",
    image: "https://images.unsplash.com/photo-1549931319-a545753467c8?w=400&h=300&fit=crop",
  },
];
