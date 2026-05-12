import { useState, useMemo } from "react";
import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
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
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Badge } from "../components/ui/badge";

interface CategoryPageProps {
  category?: string;
}

export function CategoryPage({ category = "all" }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [quickFilterCategory, setQuickFilterCategory] = useState<string | null>(
    null,
  );

  const fabrics = Array.from(new Set(products.map((p) => p.fabric)));
  const colors = Array.from(new Set(products.map((p) => p.color)));

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category (from route or quick filter)
    const activeCategory = category !== "all" ? category : quickFilterCategory;
    if (activeCategory) {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }

    // Filter by price
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    // Filter by fabric
    if (selectedFabrics.length > 0) {
      filtered = filtered.filter((p) => selectedFabrics.includes(p.fabric));
    }

    // Filter by color
    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) => selectedColors.includes(p.color));
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "new":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        filtered.sort(
          (a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0),
        );
    }

    return filtered;
  }, [
    category,
    quickFilterCategory,
    priceRange,
    selectedFabrics,
    selectedColors,
    sortBy,
  ]);

  const categoryTitle =
    category === "all"
      ? "All Sarees"
      : category === "wedding"
        ? "Wedding Collection"
        : category === "festive"
          ? "Festive Elegance"
          : category === "designer"
            ? "Designer Sarees"
            : "Casual Wear";

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

  const categoryFilters = [
    {
      id: "wedding",
      name: "Wedding Collection",
      image:
        "https://images.unsplash.com/photo-1633482218981-9ef4bdcae01b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwYnJpZGFsJTIwcmVkfGVufDF8fHx8MTc1OTU5MTA2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      count: products.filter((p) => p.category === "wedding").length,
    },
    {
      id: "festive",
      name: "Festive Elegance",
      image:
        "https://images.unsplash.com/photo-1759325349279-12f5cc1876b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXN0aXZhbCUyMGNlbGVicmF0aW9uJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU5NTEwMDA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      count: products.filter((p) => p.category === "festive").length,
    },
    {
      id: "designer",
      name: "Designer Sarees",
      image:
        "https://images.unsplash.com/photo-1759563874711-b026ac0b6c6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGZhc2hpb24lMjBsdXh1cnl8ZW58MXx8fHwxNzU5NTkxMDY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      count: products.filter((p) => p.category === "designer").length,
    },
    {
      id: "casual",
      name: "Casual Wear",
      image:
        "https://images.unsplash.com/photo-1741847639057-b51a25d42892?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBjb3R0b24lMjBmYWJyaWN8ZW58MXx8fHwxNzU5NTkxMDY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      count: products.filter((p) => p.category === "casual").length,
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl mb-4">{categoryTitle}</h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {/* Category Quick Filters - Only show on "All Sarees" page */}
        {category === "all" && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl">Shop by Collection</h3>
              {quickFilterCategory && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuickFilterCategory(null)}
                >
                  View All
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categoryFilters.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() =>
                    setQuickFilterCategory(
                      quickFilterCategory === cat.id ? null : cat.id,
                    )
                  }
                  className={`relative group cursor-pointer rounded-lg overflow-hidden h-48 transition-all ${
                    quickFilterCategory === cat.id
                      ? "ring-2 ring-primary ring-offset-2"
                      : "hover:ring-2 hover:ring-primary/50"
                  }`}
                >
                  <ImageWithFallback
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                    <h4 className="text-white mb-1">{cat.name}</h4>
                    <Badge variant="secondary" className="w-fit">
                      {cat.count} items
                    </Badge>
                  </div>
                  {quickFilterCategory === cat.id && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
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
                <h3 className="text-lg">Filters</h3>
                <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <Label className="mb-3 block">Price Range</Label>
                <Slider
                  min={0}
                  max={20000}
                  step={500}
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
              <div className="mb-6">
                <Label className="mb-3 block">Fabric</Label>
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

              {/* Color Filter */}
              <div className="mb-6">
                <Label className="mb-3 block">Color</Label>
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

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSelectedFabrics([]);
                  setSelectedColors([]);
                  setPriceRange([0, 20000]);
                  setQuickFilterCategory(null);
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
                <Label className="text-sm">Sort by:</Label>
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
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    productName={product.name}
                    productSellingPrice={product.price}
                    productMrp={product.originalPrice}
                    productImages={product.images || [product.image]}
                    productBestSeller={product.isBestseller}
                    productFabricType={product.fabric}
                    productDiscount={
                      product.originalPrice
                        ? Math.round(
                            ((product.originalPrice - product.price) /
                              product.originalPrice) *
                              100,
                          )
                        : 0
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground">
                  No products found matching your filters.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedFabrics([]);
                    setSelectedColors([]);
                    setPriceRange([0, 20000]);
                    setQuickFilterCategory(null);
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
