import { Heart, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigation } from "../contexts/NavigationContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

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
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { t } = useLanguage();
  const [isRemoving, setIsRemoving] = useState(false);
  const isWishlisted = isInWishlist(id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isWishlisted) {
      toggleWishlist(id);
      return;
    }

    setIsRemoving(true);
    window.setTimeout(() => {
      toggleWishlist(id);
      setIsRemoving(false);
    }, 280);
  };

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
      className={`group relative overflow-hidden rounded-lg border border-border/80 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(131,11,27,0.14)] cursor-pointer niorra-card-reveal niorra-card-frame ${isRemoving ? "niorra-wishlist-removing" : ""}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted ring-1 ring-inset ring-black/5">
        <ImageWithFallback
          src={productImages?.[0]}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 niorra-silk-drift"
        />
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={handleWishlistToggle}
            disabled={isRemoving}
            className={`p-2 rounded-full shadow-lg transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-95 cursor-pointer backdrop-blur-sm ${isWishlisted ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-background/95 hover:bg-primary hover:text-primary-foreground"}`}
            aria-label={
              isWishlisted ? t("Remove from wishlist") : t("Add to wishlist")
            }
            aria-pressed={isWishlisted}
            title={
              isWishlisted ? t("Remove from wishlist") : t("Add to wishlist")
            }
          >
            <Heart
              className={`h-4 w-4 ${isWishlisted ? "fill-current niorra-heart-glow" : ""}`}
            />
          </button>
        </div>

        {/* Add To Cart */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
          <Button
            onClick={handleAddToCart}
            className="w-full mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-900/20 transition duration-300 hover:bg-accent cursor-pointer"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {t("Add to Cart")}
          </Button>
        </div>
      </div>

      {/* Status rail stays above the image so the product remains unobstructed. */}
      <div className="niorra-heritage-rail flex min-h-12 items-center gap-2 border-b border-border/60 px-4 pt-3">
        <span className="niorra-heritage-mark" aria-hidden="true" />
        {productBadges?.includes("Bestseller") ? (
          <Badge className="niorra-badge-reveal bg-secondary text-secondary-foreground">
            {t("Bestseller")}
          </Badge>
        ) : productBadges?.includes("New") ? (
          <Badge className="niorra-badge-reveal bg-secondary text-secondary-foreground">
            {t("New Arrival")}
          </Badge>
        ) : (
          <Badge className="niorra-badge-reveal border-secondary/60 bg-background/70 text-primary">
            {t("Niorra Edit")}
          </Badge>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 pt-3">
        <h3 className="mb-3 line-clamp-2 min-h-[3rem] text-[1.05rem] leading-snug text-foreground">
          {productName}
        </h3>

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight text-primary">
            €{productSellingPrice.toLocaleString()}
          </span>

          {productMrp && (
            <span className="text-sm text-muted-foreground line-through">
              €{productMrp.toLocaleString()}
            </span>
          )}
          {discount > 0 && (
            <Badge
              variant="destructive"
              className="niorra-badge-reveal px-1.5 py-0 text-[10px]"
            >
              {discount}% OFF
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
