import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { categories, allCategories } from "../../data/categories";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { Badge } from "../components/ui/badge";
import { getAllProducts } from "../../api/productApi";
import { Product } from "../../types/Product";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { AnimatePresence, motion } from "framer-motion";

interface CategoryPageProps {
  category?: string;
}

// Category title mapping
const categoryTitleMap: Record<string, string> = {
  "sarees": "All Sarees",
  "lehenga": "Lehenga",
  "festive-collections": "Festive Collections",
  "cotton-sarees": "Cotton Sarees",
  "blouse-collections": "Blouse Collections",
  "daily-wear-kurtas": "Daily Wear Kurtas",
  "traditional-kurtas": "Traditional Kurtas",
  "daily-wear-dresses": "Daily Wear Dresses - Nighty, Inners",
  "half-sarees": "Half Sarees",
  "skirts": "Skirts",
  "sherwani-suit": "Sherwani Suit",
  "wedding-shirt": "Wedding Shirt",
  "pattu-pavadai": "Pattu Pavadai",
  "boys-dhoti-shirt": "Boys Soft Cotton Dhoti & Shirt Set",
  "kids-frock": "Kids Frock",
  accessories: "Accessories",
};

const normalizeCategory = (value?: string) =>
  value
    ?.toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "";

const categoryAliases: Record<string, string[]> = {
  sarees: ["saree"],
  lehenga: ["lehenga", "lehengas"],
  "blouse-collections": ["blouse", "blouses", "blouse-collection"],
  "daily-wear-kurtas": ["daily-wear-kurta", "kurta", "kurtas"],
  "traditional-kurtas": ["traditional-kurta", "kurta", "kurtas"],
  "daily-wear-dresses": ["daily-wear-dress", "dress", "dresses", "nighty"],
  "half-sarees": ["half-saree"],
  skirts: ["skirt"],
  "sherwani-suit": ["sherwani", "suit", "sherwani-suits"],
  "wedding-shirt": ["wedding-shirts", "shirt", "shirts"],
  "pattu-pavadai": ["pattu-pavadai"],
  "boys-dhoti-shirt": ["boys-dhoti-shirt", "dhoti-shirt"],
  "kids-frock": ["kids-frock", "frock", "frocks"],
  accessories: [
    "accessory",
    "jewellery",
    "jewelry",
    "ornaments",
    "bags",
    "bag",
    "dupatta",
    "dupattas",
  ],
};

const sareeOccasions = [
  {
    id: "all",
    label: "All",
    style: "Every saree edit",
    image:
      "https://images.unsplash.com/photo-1610189019496-13e6e7cbbc40?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "wedding",
    label: "Wedding",
    style: "Indian bridal",
    image:
      "https://images.unsplash.com/photo-1688789913221-071a44294edf?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "festive",
    label: "Festive",
    style: "Modern celebration",
    image:
      "https://images.unsplash.com/photo-1756483571456-6fa86cb1ae53?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "ceremonies",
    label: "Ceremonies",
    style: "Indian rituals",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "traditional",
    label: "Traditional",
    style: "Classic drapes",
    image:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "casual",
    label: "Casual",
    style: "Everyday modern",
    image:
      "https://images.unsplash.com/photo-1692107271822-50cc09b2bf73?auto=format&fit=crop&w=1000&q=80",
  },
];

const occasionAliases: Record<string, string[]> = {
  ceremonies: ["ceremony", "ceremonial", "ceremonies"],
  festive: ["festival", "festivals", "festive"],
  traditional: ["tradition", "traditional"],
};

const getProductCategoryKeys = (product: Product) => [
  normalizeCategory(product.productCategory),
  normalizeCategory(product.productType),
  normalizeCategory(product.productSubType),
];

const getCategoryMatchKeys = (category: string) => {
  const normalizedCategory = normalizeCategory(category);

  return new Set([
    normalizedCategory,
    ...(categoryAliases[normalizedCategory] || []).map(normalizeCategory),
  ]);
};

const productMatchesCategory = (product: Product, category: string) => {
  const categoryKeys = getCategoryMatchKeys(category);

  return getProductCategoryKeys(product).some((key) => categoryKeys.has(key));
};

const getOccasionMatchKeys = (occasion: string) => {
  const normalizedOccasion = normalizeCategory(occasion);

  return new Set([
    normalizedOccasion,
    ...(occasionAliases[normalizedOccasion] || []).map(normalizeCategory),
  ]);
};

const productMatchesOccasion = (product: Product, occasion: string) => {
  const occasionKeys = getOccasionMatchKeys(occasion);

  return (
    product.productOccasion?.some((item) =>
      occasionKeys.has(normalizeCategory(item)),
    ) || false
  );
};

export function CategoryPage({ category = "all" }: CategoryPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const fabrics = Array.from(
    new Set(products.map((p) => p.productFabricType).filter(Boolean)),
  );
  const colors = Array.from(
    new Set(products.map((p) => p.productColor).filter(Boolean)),
  );
  const showSareeOccasions = getCategoryMatchKeys(category).has("sarees");

  useEffect(() => {
    if (!showSareeOccasions) {
      setSelectedOccasion(null);
    }
  }, [showSareeOccasions]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category (from route parameter)
    if (category && category !== "all") {
      filtered = filtered.filter((p) => productMatchesCategory(p, category));
    }

    // Filter by price
    filtered = filtered.filter(
      (p) =>
        p.productSellingPrice >= priceRange[0] &&
        p.productSellingPrice <= priceRange[1],
    );

    // Filter by fabric
    if (selectedFabrics.length > 0) {
      filtered = filtered.filter((p) =>
        selectedFabrics.includes(p.productFabricType),
      );
    }

    // Filter by color
    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) => selectedColors.includes(p.productColor));
    }

    // Filter sarees by backend productOccasion
    if (showSareeOccasions && selectedOccasion) {
      filtered = filtered.filter((p) =>
        productMatchesOccasion(p, selectedOccasion),
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.productSellingPrice - b.productSellingPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.productSellingPrice - a.productSellingPrice);
        break;
      case "new":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      default:
        filtered.sort((a, b) => {
          const aIsPopular = a.productBadges?.some(
            (badge) => normalizeCategory(badge) === "bestseller",
          );
          const bIsPopular = b.productBadges?.some(
            (badge) => normalizeCategory(badge) === "bestseller",
          );

          return (bIsPopular ? 1 : 0) - (aIsPopular ? 1 : 0);
        });
    }

    return filtered;
  }, [
    products,
    category,
    priceRange,
    selectedFabrics,
    selectedColors,
    selectedOccasion,
    showSareeOccasions,
    sortBy,
  ]);

  const categoryTitle =
    category && category !== "all"
      ? categoryTitleMap[category] || "All Categories"
      : "All Categories Collection";

  const getCategoryGroupName = () => {
    if (!category || category === "all") return null;
    const categoryInfo = allCategories.find((cat) => cat.id === category);
    return categoryInfo?.group || null;
  };

  const toggleFabric = (fabric: string) => {
    setSelectedFabrics((prev) =>
      prev.includes(fabric)
        ? prev.filter((f) => f !== fabric)
        : [...prev, fabric],
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            {getCategoryGroupName() && (
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
                {getCategoryGroupName()}
              </p>
            )}
            <h1 className="text-4xl md:text-5xl font-bold">{categoryTitle}</h1>
          </div>
          <p className="text-muted-foreground">
            {loading
              ? "Loading products..."
              : `Showing ${filteredProducts.length} products`}
          </p>
        </div>

        {showSareeOccasions && (
          <section className="mb-10">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
                  Shop Sarees By Occasion
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Modern and Indian styles for every moment
                </h2>
              </div>

              {selectedOccasion && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedOccasion(null)}
                >
                  Clear Occasion
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {sareeOccasions.map((occasion, index) => {
                const isAll = occasion.id === "all";
                const isSelected = isAll
                  ? !selectedOccasion
                  : selectedOccasion === occasion.id;
                const itemCount = products.filter((product) => {
                  if (!productMatchesCategory(product, "sarees")) {
                    return false;
                  }

                  return isAll || productMatchesOccasion(product, occasion.id);
                }).length;

                return (
                  <motion.button
                    key={occasion.id}
                    type="button"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.25 }}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (isAll) {
                        setSelectedOccasion(null);
                        return;
                      }

                      setSelectedOccasion((current) =>
                        current === occasion.id ? null : occasion.id,
                      );
                    }}
                    className={`group relative min-h-64 overflow-hidden rounded-lg border text-left shadow-sm transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-border hover:border-primary/60"
                    }`}
                  >
                    <ImageWithFallback
                      src={occasion.image}
                      alt={`${occasion.label} sarees`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />
                    <div className="relative flex h-full min-h-64 flex-col justify-end p-5 text-white">
                      <span className="mb-2 w-fit rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
                        {itemCount} items
                      </span>
                      <h3 className="text-2xl font-semibold">
                        {occasion.label}
                      </h3>
                      <p className="text-sm text-white/80">{occasion.style}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </section>
        )}

        {/* Category Showcase - Show all categories when viewing all collections */}
        {category === "all" && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Shop by Category</h3>
            <div className="grid grid-cols-1 gap-8">
              {categories.map((group) => (
                <div key={group.name}>
                  <h4 className="text-lg font-semibold text-primary mb-4 uppercase tracking-wide">
                    {group.name}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {group.items.map((item) => {
                      const itemCount = products.filter(
                        (p) => productMatchesCategory(p, item.id),
                      ).length;
                      return (
                        <div
                          key={item.id}
                          className="group relative overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-all duration-300 cursor-pointer"
                        >
                          <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center overflow-hidden">
                            <div className="text-center p-4 group-hover:scale-110 transition-transform duration-300">
                              <div className="text-3xl mb-2">👗</div>
                              <p className="text-xs font-semibold text-foreground line-clamp-2">
                                {item.name}
                              </p>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                            <Badge
                              variant="secondary"
                              className="text-xs w-fit"
                            >
                              {itemCount} items
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`${showFilters ? "w-64" : "w-0"} flex-shrink-0 transition-all duration-300 overflow-hidden`}
          >
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <Label className="mb-3 block font-semibold">Price Range</Label>
                <Slider
                  min={10}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>€{priceRange[0]}</span>
                  <span>€{priceRange[1]}</span>
                </div>
              </div>

              {/* Fabric Filter */}
              {fabrics.length > 0 && (
                <div className="mb-6">
                  <Label className="mb-3 block font-semibold">Fabric</Label>
                  <div className="space-y-2">
                    {fabrics.map((fabric) => (
                      <div key={fabric} className="flex items-center gap-2">
                        <Checkbox
                          id={`fabric-${fabric}`}
                          checked={selectedFabrics.includes(fabric)}
                          onCheckedChange={() => toggleFabric(fabric)}
                        />
                        <label
                          htmlFor={`fabric-${fabric}`}
                          className="text-sm cursor-pointer"
                        >
                          {fabric}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Filter */}
              {colors.length > 0 && (
                <div className="mb-6">
                  <Label className="mb-3 block font-semibold">Color</Label>
                  <div className="space-y-2">
                    {colors.map((color) => (
                      <div key={color} className="flex items-center gap-2">
                        <Checkbox
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => toggleColor(color)}
                        />
                        <label
                          htmlFor={`color-${color}`}
                          className="text-sm cursor-pointer"
                        >
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedFabrics([]);
                  setSelectedColors([]);
                  setSelectedOccasion(null);
                  setPriceRange([0, 1000]);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? "Hide" : "Show"} Filters
              </Button>

              <div className="flex items-center gap-2 ml-auto">
                <Label className="text-sm font-semibold">Sort by:</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="new">New Arrivals</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  Loading products...
                </p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.96 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <ProductCard
                      id={product.id}
                      productName={product.productName}
                      productSellingPrice={product.productSellingPrice}
                      productMrp={product.productMrp}
                      productImages={product.productImages}
                      productBadges={product.productBadges}
                      productFabricType={product.productFabricType}
                      productDiscount={product.productDiscount}
                    />
                  </motion.div>
                ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg mb-4">
                  No products found matching your filters.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedFabrics([]);
                    setSelectedColors([]);
                    setSelectedOccasion(null);
                    setPriceRange([0, 1000]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
