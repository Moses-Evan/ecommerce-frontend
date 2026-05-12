import { Hero } from "../components/Hero";
import { CategoryCard } from "../components/CategoryCard";
import { ProductCard } from "../components/ProductCard";
import { Testimonials } from "../components/Testimonials";
import { Newsletter } from "../components/Newsletter";
import {
  Sparkles,
  ShieldCheck,
  TruckIcon,
  Headphones,
  ArrowRight,
  Star,
} from "lucide-react";
import { getAllProducts } from "../../api/productApi";
import { Product } from "../../types/Product";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useNavigation } from "../contexts/NavigationContext";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";

export function HomePage() {
  const { navigate } = useNavigation();
  const categories = [
    {
      title: "Wedding Collection",
      categoryId: "wedding",
      image:
        "https://images.unsplash.com/photo-1688789913221-071a44294edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwc2FyZWUlMjBicmlkYWx8ZW58MXx8fHwxNzU5NTg5NTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      itemCount: "150+",
    },
    {
      title: "Festive Elegance",
      categoryId: "festive",
      image:
        "https://images.unsplash.com/photo-1756483571456-6fa86cb1ae53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZlJTIwc2FyZWUlMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3NTk1ODk1NTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      itemCount: "200+",
    },
    {
      title: "Designer Sarees",
      categoryId: "designer",
      image:
        "https://images.unsplash.com/photo-1756483509177-bbabd67a3234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNhcmVlJTIwbHV4dXJ5fGVufDF8fHx8MTc1OTU4OTU1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      itemCount: "100+",
    },
    {
      title: "Casual Wear",
      categoryId: "casual",
      image:
        "https://images.unsplash.com/photo-1692107271822-50cc09b2bf73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzYXJlZSUyMGNvdHRvbnxlbnwxfHx8fDE3NTk1ODk1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      itemCount: "180+",
    },
  ];

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      console.log("Fetched products:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const featuredProducts = products.slice(0, 8);

  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-secondary" />,
      title: "Authentic Craftsmanship",
      description: "Handpicked sarees from master weavers across India",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-secondary" />,
      title: "Quality Assured",
      description: "100% genuine fabrics with quality guarantee",
    },
    {
      icon: <TruckIcon className="h-8 w-8 text-secondary" />,
      title: "Free Shipping",
      description: "Free delivery on orders above €200",
    },
    {
      icon: <Headphones className="h-8 w-8 text-secondary" />,
      title: "24/7 Support",
      description: "Dedicated customer service for all your queries",
    },
  ];

  return (
    <main>
      <Hero />

      {/* Features Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary mb-2 tracking-widest uppercase">
              Explore
            </p>
            <h2 className="text-4xl md:text-5xl mb-4">Our Collections</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collections for every occasion, from grand
              weddings to everyday elegance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary mb-2 tracking-widest uppercase">
              Bestsellers
            </p>
            <h2 className="text-4xl md:text-5xl mb-4">Featured Sarees</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked selections from our most loved collections
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-10">
                Loading products...
              </div>
            ) : (
              featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  productName={product.productName}
                  productSellingPrice={product.productSellingPrice}
                  productMrp={product.productMrp}
                  productImages={product.productImages}
                  productBestSeller={product.productBestSeller}
                  productFabricType={product.productFabricType}
                  productDiscount={product.productDiscount}
                />
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => navigate("category", { category: "all" })}
              size="lg"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals Banner */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="p-12">
                <p className="text-secondary mb-2 tracking-widest uppercase">
                  New Season
                </p>
                <h2 className="text-4xl md:text-5xl mb-4">
                  Spring Collection 2025
                </h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  Discover our latest collection featuring vibrant colors,
                  exquisite craftsmanship, and contemporary designs perfect for
                  the new season.
                </p>
                <Button
                  onClick={() => navigate("category", { category: "all" })}
                  size="lg"
                >
                  Explore New Arrivals
                </Button>
              </div>
              <div className="h-[400px] lg:h-full">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1740664651822-3a02ec12c121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwYmFubmVyfGVufDF8fHx8MTc1OTU5MDc1NXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="New Collection"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Occasion */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary mb-2 tracking-widest uppercase">
              Perfect For Every Moment
            </p>
            <h2 className="text-4xl md:text-5xl mb-4">Shop by Occasion</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find the perfect saree for your special moments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => navigate("category", { category: "wedding" })}
              className="relative group cursor-pointer rounded-lg overflow-hidden h-80"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1688789913221-071a44294edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwc2FyZWUlMjBicmlkYWx8ZW58MXx8fHwxNzU5NTg5NTUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Wedding"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl text-white mb-1">Weddings</h3>
                  <p className="text-white/80 text-sm">
                    Timeless elegance for your big day
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => navigate("category", { category: "festive" })}
              className="relative group cursor-pointer rounded-lg overflow-hidden h-80"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1597811119369-748db0973125?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGluZGlhbiUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc1OTU5MDc1NHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Festive"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl text-white mb-1">Festivals</h3>
                  <p className="text-white/80 text-sm">
                    Celebrate in vibrant style
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => navigate("category", { category: "casual" })}
              className="relative group cursor-pointer rounded-lg overflow-hidden h-80"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1692107271822-50cc09b2bf73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzYXJlZSUyMGNvdHRvbnxlbnwxfHx8fDE3NTk1ODk1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Casual"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl text-white mb-1">Casual Elegance</h3>
                  <p className="text-white/80 text-sm">Comfort meets style</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-secondary mb-2 tracking-widest uppercase">
                Why Draupadi Vastralya
              </p>
              <h2 className="text-4xl mb-6">
                Crafted with Love, Delivered with Care
              </h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Each saree in our collection is handpicked from master weavers
                across India, ensuring authenticity, quality, and timeless
                elegance. We celebrate India's rich textile heritage while
                bringing you contemporary designs.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full flex-shrink-0">
                    <Star className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Authentic Craftsmanship</h4>
                    <p className="text-sm text-muted-foreground">
                      Direct sourcing from traditional weavers ensures genuine
                      quality
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full flex-shrink-0">
                    <Star className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Curated Collections</h4>
                    <p className="text-sm text-muted-foreground">
                      Every piece is carefully selected to match your style
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-full flex-shrink-0">
                    <Star className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="mb-1">Sustainable Practices</h4>
                    <p className="text-sm text-muted-foreground">
                      Supporting artisan communities and preserving traditions
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => navigate("about")}
                variant="outline"
                size="lg"
                className="mt-8"
              >
                Learn Our Story
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1693987646600-c911a3f571b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZXh0aWxlJTIwcGF0dGVybnxlbnwxfHx8fDE3NTk1ODk1NTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Textile pattern"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-lg overflow-hidden mt-8">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1702574145861-bcb8227a31bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF2aW5nJTIwbG9vbSUyMHRleHRpbGV8ZW58MXx8fHwxNzU5NTkwMDkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Weaving process"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl mb-2">10,000+</div>
              <p className="text-primary-foreground/80">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-2">500+</div>
              <p className="text-primary-foreground/80">Unique Designs</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-2">50+</div>
              <p className="text-primary-foreground/80">Master Weavers</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-2">15+</div>
              <p className="text-primary-foreground/80">States Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </main>
  );
}
