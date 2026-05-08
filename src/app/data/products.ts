export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  fabric: string;
  color: string;
  description: string;
  length: string;
  designer?: string;
  care: string;
  isNew?: boolean;
  isBestseller?: boolean;
  occasion: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Royal Silk Banarasi Saree with Zari Work",
    price: 8999,
    originalPrice: 12999,
    image: "https://images.unsplash.com/photo-1676696706907-0e04665b80bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwc2FyZWUlMjB0ZXh0dXJlfGVufDF8fHx8MTc1OTU4OTU1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "wedding",
    fabric: "Pure Silk",
    color: "Maroon",
    description: "Exquisite Banarasi silk saree featuring intricate zari work and traditional motifs. Perfect for weddings and grand celebrations.",
    length: "6.5 meters with unstitched blouse piece",
    designer: "Weaver's Studio",
    care: "Dry clean only",
    isBestseller: true,
    occasion: "Wedding"
  },
  {
    id: "2",
    name: "Elegant Chanderi Cotton Saree",
    price: 4999,
    originalPrice: 6999,
    image: "https://images.unsplash.com/photo-1676696663276-d556eea4f577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwZmFicmljJTIwdGV4dHVyZSUyMGJsdWV8ZW58MXx8fHwxNzU5NTkwNzI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "festive",
    fabric: "Chanderi Cotton",
    color: "Blue",
    description: "Lightweight and elegant Chanderi cotton saree with beautiful border work. Ideal for festive occasions.",
    length: "6.3 meters with blouse piece",
    care: "Hand wash or dry clean",
    isNew: true,
    occasion: "Festival"
  },
  {
    id: "3",
    name: "Premium Kanjeevaram Silk Saree",
    price: 15999,
    originalPrice: 19999,
    image: "https://images.unsplash.com/photo-1739429946375-0a703857a86a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzYXJlZSUyMHdvbWFuJTIwZWxlZ2FudHxlbnwxfHx8fDE3NTk1ODk1NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "wedding",
    fabric: "Kanjeevaram Silk",
    color: "Red",
    description: "Authentic Kanjeevaram silk saree with traditional temple border and rich pallu. A timeless classic.",
    length: "6.5 meters with contrast blouse",
    designer: "South Silk Weavers",
    care: "Dry clean only",
    isBestseller: true,
    isNew: true,
    occasion: "Wedding"
  },
  {
    id: "4",
    name: "Festive Georgette Saree with Embroidery",
    price: 5999,
    image: "https://images.unsplash.com/photo-1756483571456-6fa86cb1ae53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZlJTIwc2FyZWUlMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3NTk1ODk1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "festive",
    fabric: "Georgette",
    color: "Green",
    description: "Beautiful georgette saree with delicate embroidery work. Drapes gracefully and perfect for celebrations.",
    length: "6 meters with blouse piece",
    care: "Dry clean recommended",
    isNew: true,
    occasion: "Festival"
  },
  {
    id: "5",
    name: "Handwoven Tussar Silk Saree",
    price: 7499,
    originalPrice: 9999,
    image: "https://images.unsplash.com/photo-1688789913221-071a44294edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwc2FyZWUlMjBicmlkYWx8ZW58MXx8fHwxNzU5NTg5NTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "designer",
    fabric: "Tussar Silk",
    color: "Gold",
    description: "Handwoven tussar silk saree with natural texture and contemporary design. A perfect blend of tradition and modernity.",
    length: "6.5 meters",
    designer: "Artisan Collective",
    care: "Dry clean only",
    isBestseller: true,
    occasion: "Party"
  },
  {
    id: "6",
    name: "Contemporary Designer Saree",
    price: 12999,
    image: "https://images.unsplash.com/photo-1756483509177-bbabd67a3234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNhcmVlJTIwbHV4dXJ5fGVufDF8fHx8MTc1OTU4OTU1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "designer",
    fabric: "Silk Blend",
    color: "Pink",
    description: "Modern designer saree with unique draping style and contemporary embellishments. Stand out in style.",
    length: "6 meters with stitched blouse",
    designer: "Modern Drapes",
    care: "Dry clean only",
    isNew: true,
    occasion: "Party"
  },
  {
    id: "7",
    name: "Classic Cotton Handloom Saree",
    price: 3499,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1692107271822-50cc09b2bf73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzYXJlZSUyMGNvdHRvbnxlbnwxfHx8fDE3NTk1ODk1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "casual",
    fabric: "Cotton",
    color: "White",
    description: "Comfortable and breathable cotton handloom saree perfect for daily wear and casual occasions.",
    length: "6 meters with blouse",
    care: "Machine wash cold",
    occasion: "Casual"
  },
  {
    id: "8",
    name: "Luxurious Tissue Silk Saree",
    price: 9999,
    originalPrice: 13999,
    image: "https://images.unsplash.com/photo-1693987646600-c911a3f571b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZXh0aWxlJTIwcGF0dGVybnxlbnwxfHx8fDE3NTk1ODk1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "wedding",
    fabric: "Tissue Silk",
    color: "Silver",
    description: "Shimmering tissue silk saree with metallic finish. Perfect for evening events and celebrations.",
    length: "6.5 meters",
    care: "Dry clean only",
    isBestseller: true,
    occasion: "Wedding"
  }
];

export const categories = [
  { id: "wedding", name: "Wedding Collection", count: 150 },
  { id: "festive", name: "Festive Elegance", count: 200 },
  { id: "designer", name: "Designer Sarees", count: 100 },
  { id: "casual", name: "Casual Wear", count: 180 }
];
