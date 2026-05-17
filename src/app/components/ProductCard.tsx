import { Heart, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigation } from "../contexts/NavigationContext";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  id: string;

  productName: string;

  productSellingPrice: number;

  productMrp?: number;

  productImages: string[];

  productBadges?: string[];

  productFabricType?: string;
  productDiscount: number;
}

export function ProductCard({
  id,
  productName,
  productSellingPrice,
  productMrp,
  productImages,
  productBadges,
  productFabricType,
  productDiscount,
}: ProductCardProps) {
  // const discount = productMrp
  //   ? Math.round(((productMrp - productSellingPrice) / productMrp) * 100)
  //   : 0;
  const discount = productDiscount || 0;

  const { navigate } = useNavigation();

  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    addItem({
      id,
      name: productName,
      price: productSellingPrice,
      image: productImages?.[0],
      fabric: productFabricType,
    });
  };

  return (
    <div
      onClick={() => navigate("product", { productId: id })}
      className="group relative bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <ImageWithFallback
          src={productImages?.[0]}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {productBadges?.includes("Bestseller") && (
            <Badge className="bg-secondary text-secondary-foreground">
              Bestseller
            </Badge>
          )}

          {discount > 0 && <Badge variant="destructive">{discount}% OFF</Badge>}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="bg-white p-2 rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground transition-colors cursor-crosshair"
            title="wishlist"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Add To Cart */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 min-h-[3rem]">{productName}</h3>

        <div className="flex items-center gap-2">
          <span className="text-primary">
            €{productSellingPrice.toLocaleString()}
          </span>

          {productMrp && (
            <span className="text-sm text-muted-foreground line-through">
              €{productMrp.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
