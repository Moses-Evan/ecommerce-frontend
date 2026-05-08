import { Heart, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigation } from "../contexts/NavigationContext";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isBestseller?: boolean;
  fabric?: string;
}

export function ProductCard({ id, name, price, originalPrice, image, isNew, isBestseller, fabric }: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const { navigate } = useNavigation();
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id, name, price, image, fabric });
  };

  return (
    <div 
      onClick={() => navigate("product", { productId: id })}
      className="group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-accent text-accent-foreground">New</Badge>
          )}
          {isBestseller && (
            <Badge className="bg-secondary text-secondary-foreground">Bestseller</Badge>
          )}
          {discount > 0 && (
            <Badge variant="destructive">{discount}% OFF</Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white p-2 rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors">
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Quick View Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
          <Button onClick={handleAddToCart} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 min-h-[3rem]">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-primary">₹{price.toLocaleString()}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
