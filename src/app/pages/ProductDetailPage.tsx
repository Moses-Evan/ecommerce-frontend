import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { products } from "../data/products";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ShoppingCart, Heart, Share2, Ruler, Info } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../contexts/CartContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface ProductDetailPageProps {
  productId: string;
}

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const product = products.find(p => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addItem({ ...product, quantity });
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-muted-foreground">
          <span className="hover:text-primary cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="hover:text-primary cursor-pointer capitalize">{product.category}</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="bg-muted rounded-lg overflow-hidden mb-4 aspect-[3/4]">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[product.image, product.image, product.image, product.image].map((img, idx) => (
                <div
                  key={idx}
                  className={`aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer border-2 ${
                    selectedImage === idx ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex gap-2 mb-4">
              {product.isNew && <Badge className="bg-accent">New</Badge>}
              {product.isBestseller && <Badge className="bg-secondary text-secondary-foreground">Bestseller</Badge>}
              {discount > 0 && <Badge variant="destructive">{discount}% OFF</Badge>}
            </div>

            <h1 className="text-3xl md:text-4xl mb-4">{product.name}</h1>
            
            {product.designer && (
              <p className="text-muted-foreground mb-4">by {product.designer}</p>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl text-primary">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-foreground mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Product Details */}
            <div className="bg-muted/30 rounded-lg p-6 mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fabric:</span>
                <span>{product.fabric}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Color:</span>
                <span>{product.color}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Length:</span>
                <span>{product.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Occasion:</span>
                <span>{product.occasion}</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <Label className="mb-2 block">Quantity</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <Button onClick={handleAddToCart} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Additional Info */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Ruler className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                  <p>Size Guide</p>
                  <p className="text-sm text-muted-foreground">View our comprehensive size guide</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                  <p>Care Instructions</p>
                  <p className="text-sm text-muted-foreground">{product.care}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping Info</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p className="mt-4">
                This exquisite saree is crafted with the finest materials and showcases exceptional craftsmanship. 
                Each piece is carefully handpicked to ensure the highest quality and authenticity. The intricate 
                details and traditional motifs make this saree a timeless addition to your wardrobe.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <p className="text-muted-foreground">Customer reviews coming soon...</p>
          </TabsContent>
          <TabsContent value="shipping" className="mt-6">
            <div className="space-y-4">
              <p>Free shipping on orders above ₹2999</p>
              <p>Estimated delivery: 5-7 business days</p>
              <p>Cash on Delivery available</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
