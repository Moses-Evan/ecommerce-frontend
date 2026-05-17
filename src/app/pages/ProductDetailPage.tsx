import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../contexts/CartContext";
import { getProductById } from "../../api/productApi";
import { Product } from "../../types/Product";

interface ProductDetailPageProps {
  productId: string;
  relatedProducts?: Product[];
}

const sizes = ["XS", "S", "M", "L", "XL"];

export function ProductDetailPage({
  productId,
  relatedProducts = [],
}: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");

  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(productId);
        // productData.productBestSeller = true;
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Product not found.</p>
        </div>
      </div>
    );
  }

  const discount = product.productDiscount || 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.productName,
      price: product.productSellingPrice,
      image: product.productImages[0],
      fabric: product.productFabricType,
      quantity,
    });
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-8 flex flex-wrap gap-2">
          <span className="hover:text-primary cursor-pointer">Home</span>

          <span>/</span>

          <span className="text-foreground">{product.productName}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* LEFT SIDE */}
          <div>
            {/* MAIN IMAGE */}
            <div className="flex-1">
              <div className="relative overflow-hidden rounded-3xl  aspect-[3/4] mb-6 ">
                {discount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute top-4 left-4 z-10"
                  >
                    {discount}% OFF
                  </Badge>
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0.5, scale: 1.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 1, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <ImageWithFallback
                      src={product.productImages[selectedImage]}
                      alt={product.productName}
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* THUMBNAILS */}
              <div className="grid grid-cols-4 gap-2">
                {product.productImages.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-[3/4] bg-muted rounded-xl overflow-hidden border-2 cursor-pointer hover:bg-accent/90 transition-all duration-300 ${
                      selectedImage === idx
                        ? "border-primary scale-95"
                        : "border-border"
                    }`}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`thumb-${idx}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="flex gap-2 mb-4">
              {product.productBadges?.includes("New") && (
                <Badge className="bg-red-500">New</Badge>
              )}
              {product.productBadges?.includes("Bestseller") && (
                <Badge className="bg-yellow-500 text-secondary-foreground">
                  Bestseller
                </Badge>
              )}
              {discount > 0 && (
                <Badge variant="destructive">{discount}% OFF</Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl mb-4">{product.productName}</h1>

            <p className="text-muted-foreground mb-6">{product.productBrand}</p>

            {/* PRICE */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl text-primary">
                €{product.productSellingPrice.toLocaleString()}
              </span>

              {product.productMrp && (
                <span className="text-xl text-muted-foreground line-through">
                  €{product.productMrp.toLocaleString()}
                </span>
              )}
            </div>

            {/* STOCK */}
            <div className="mb-6">
              {product.productStock > 0 ? (
                <div className="space-y-3">
                  <Badge className="bg-green-600">In Stock</Badge>
                  {product.productStock < 10 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <span className="text-foreground">Hurry up!</span>
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                          className="inline-flex h-2.5 w-2.5 rounded-full bg-accent"
                        />
                      </div>

                      <p className="text-sm text-foreground">
                        Only{" "}
                        <span className="text-primary">
                          {product.productStock}
                        </span>{" "}
                        left in stock.
                      </p>

                      <div className="space-y-1">
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: `${Math.max(1, product.productStock) * 10}%`,
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-primary to-rose-500"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Low stock</span>
                          <span>{product.productStock} pcs left</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* DESCRIPTION */}
            <p className="text-muted-foreground leading-7 mb-8">
              {product.productDescription}
            </p>

            {/* SIZE */}
            {/* <div className="mb-8">
              <h3 className="font-medium mb-3">Select Size</h3>

              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-xl border ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-border"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div> */}

            {/* QUANTITY */}
            <div className="mb-8">
              <h3 className="font-medium mb-3">Quantity</h3>

              <div className="flex items-center border rounded-xl w-fit overflow-hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mb-8">
              <Button
                size="lg"
                className="flex-1 h-14"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add To Cart
              </Button>

              <Button variant="outline" size="lg" className="h-14 w-14">
                <Heart className="w-5 h-5" />
              </Button>

              <Button variant="outline" size="lg" className="h-14 w-14">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 pb-8">
              <div className="border rounded-2xl p-5">
                <p className="text-muted-foreground">Brand</p>

                <p className="font-medium">{product.productBrand}</p>
              </div>

              <div className="border rounded-2xl p-5">
                <p className="text-muted-foreground">Color</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{product.productColor} </p>
                  <p
                    className="inline-flex h-4.5 w-4.5 rounded-full"
                    style={{ backgroundColor: product.productColorCode }}
                  ></p>
                </div>
              </div>

              <div className="border rounded-2xl p-5">
                <p className="text-muted-foreground">Fabric</p>

                <p className="font-medium">{product.productFabricType}</p>
              </div>

              <div className="border rounded-2xl p-5">
                <p className="text-muted-foreground">Occasion</p>

                <p className="font-medium">
                  {product.productOccasion.join(", ")}
                </p>
              </div>
            </div>

            {/* FEATURES */}
            <div className="space-y-5 border-t pt-6">
              <div className="flex gap-4">
                <Truck className="w-5 h-5 mt-1 text-primary" />

                <div>
                  <p className="font-medium">Free Shipping</p>

                  <p className="text-sm text-muted-foreground">
                    On orders above 200€
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <RotateCcw className="w-5 h-5 mt-1 text-primary" />

                <div>
                  <p className="font-medium">Easy Returns</p>

                  <p className="text-sm text-muted-foreground">
                    7 day return policy
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <ShieldCheck className="w-5 h-5 mt-1 text-primary" />

                <div>
                  <p className="font-medium">Secure Payments</p>

                  <p className="text-sm text-muted-foreground">
                    100% secure checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-20">
          <Tabs defaultValue="description">
            <TabsList className="mb-8">
              <TabsTrigger value="description">Description</TabsTrigger>

              <TabsTrigger value="details">Details</TabsTrigger>

              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <p className="text-muted-foreground leading-8">
                {product.productDescription}
              </p>
            </TabsContent>

            <TabsContent value="details">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="border rounded-2xl p-5">
                  <p className="text-muted-foreground">Brand</p>

                  <p className="font-medium">{product.productBrand}</p>
                </div>

                <div className="border rounded-2xl p-5">
                  <p className="text-muted-foreground">Color</p>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{product.productColor} </p>
                    <p
                      className="inline-flex h-4.5 w-4.5 rounded-full"
                      style={{ backgroundColor: product.productColorCode }}
                    ></p>
                  </div>
                </div>

                <div className="border rounded-2xl p-5">
                  <p className="text-muted-foreground">Fabric</p>

                  <p className="font-medium">{product.productFabricType}</p>
                </div>

                <div className="border rounded-2xl p-5">
                  <p className="text-muted-foreground">Occasion</p>

                  <p className="font-medium">
                    {product.productOccasion.join(", ")}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping">
              <div className="space-y-4 text-muted-foreground">
                <p>Free shipping on orders above 200€</p>

                <p>Estimated delivery within 5-7 business days</p>

                <p>Cash on Delivery available</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-semibold mb-8">Related Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  productName={item.productName}
                  productSellingPrice={item.productSellingPrice}
                  productMrp={item.productMrp}
                  productImages={item.productImages}
                  productBadges={item.productBadges}
                  productFabricType={item.productFabricType}
                  productDiscount={item.productDiscount}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
