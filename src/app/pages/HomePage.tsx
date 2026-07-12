import { Hero } from "../components/Hero";
import { CategoryCard } from "../components/CategoryCard";
import { ProductCard } from "../components/ProductCard";
import { Testimonials } from "../components/Testimonials";
import { HomeTrustStrip } from "../components/HomeTrustStrip";
import { ArrowRight, Star } from "lucide-react";
import { getAllProducts } from "../../api/productApi";
import { Product } from "../../types/Product";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useNavigation } from "../contexts/NavigationContext";
import { Button } from "../components/ui/button";
import { PremiumCollectionsSection } from "../components/PremiumCollectionsSection";
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

  const priceRanges = [
    {
      range: "10-50€",
      note: "Everyday",
    },
    {
      range: "50-100€",
      note: "Festive",
    },
    {
      range: "100-200€",
      note: "Silks",
    },
    {
      range: "200-500€",
      note: "Premium",
    },
    {
      range: "500€+",
      note: "Bridal",
    },
  ];

  return (
    <main>
      <Hero />

      {/* Shop by Price */}
      <section className="py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl border border-secondary/20 bg-[#fff8ef] px-4 py-10 shadow-sm sm:px-6 md:px-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-rose-800 via-amber-500 to-emerald-700" />
            <div className="pointer-events-none absolute -left-12 top-8 h-32 w-32 rounded-full border-[18px] border-secondary/10" />
            <div className="pointer-events-none absolute -right-10 bottom-4 h-28 w-28 rounded-full border-[16px] border-primary/10" />

            <div className="relative text-center">
              <p className="mb-2 text-xs tracking-[0.35em] text-secondary uppercase">
                Curated Sarees
              </p>
              <h2 className="text-4xl md:text-5xl mb-3">Shop by Price</h2>
              <div className="mx-auto mb-8 flex max-w-xs items-center justify-center gap-3">
                <span className="h-px flex-1 bg-secondary/40" />
                <span className="h-2 w-2 rotate-45 bg-secondary" />
                <span className="h-px flex-1 bg-secondary/40" />
              </div>
            </div>

            <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
              {priceRanges.map((priceRange) => (
                <button
                  key={priceRange.range}
                  type="button"
                  onClick={() => navigate("category", { category: "all" })}
                  className="group mx-auto flex aspect-square w-full max-w-[138px] flex-col items-center justify-center rounded-full border-[3px] border-[#8b1e2d]/30 bg-[#76000a] p-4 text-center text-white shadow-[0_8px_22px_rgba(118,0,10,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:bg-[#8f0714] hover:shadow-[0_14px_30px_rgba(118,0,10,0.28)] focus:outline-none focus:ring-4 focus:ring-amber-400/40 sm:max-w-[150px] cursor-pointer"
                  aria-label={`Shop sarees priced ${priceRange.range}`}
                >
                  <span className="mb-2 h-2 w-12 rounded-full bg-amber-300/90 transition-transform duration-300 group-hover:scale-x-125" />
                  <span className="text-base font-semibold leading-tight sm:text-lg">
                    {priceRange.range}
                  </span>
                  <span className="mt-1 text-xs uppercase tracking-widest text-white/80 sm:text-sm">
                    {priceRange.note}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PremiumCollectionsSection products={products} loading={loading} />

      {/* Categories Section */}
      {/* <section className="py-20">
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
      </section> */}

      {/* Featured Products Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-secondary mb-2 tracking-widest uppercase">
              Bestsellers
            </p>
            <h2 className="text-4xl md:text-5xl mb-4">Newly Arrived</h2>
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
                  productBadges={product.productBadges}
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
      {/* <section className="py-20">
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
      </section> */}

      {/* Shop by Occasion */}
      {/* <section className="py-20 bg-muted/30">
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
      </section> */}

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-secondary mb-2 tracking-widest uppercase">
                Why Niorra
              </p>
              <h2 className="text-4xl mb-6">
                Crafted with Love, Delivered with Care
              </h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Niorra has become the best online shopping site in Sarees &
                ready made Blouses. Niorra brings you an array of silk sarees,
                cotton sari and linen handloom sarees online. Famously known as
                pure silk saree brand in India, A perfect place to buy hand loom
                silk sari from the best online shopping website for a popular
                bridal, party wear & reception saree choice.
              </p>
              <h2 className="text-4xl mb-6">
                No. 1 Saree collection in Germany
              </h2>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                More then 2000 designs in sarees are available in stock. A range
                of pure silk sarees is available at your fingertips for you to
                explore and choose. Shop from the comforts of your surrounding
                and look for what you want. No bargaining or haggling, but
                certainly various options for online saree shopping in Germany,
                such as Pay by card, Pay Pal
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

              {/* <Button
                onClick={() => navigate("about")}
                variant="outline"
                size="lg"
                className="mt-8"
              >
                Learn Our Story
              </Button> */}
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

      {/* Trust Strip */}
      <HomeTrustStrip />
    </main>
  );
}
