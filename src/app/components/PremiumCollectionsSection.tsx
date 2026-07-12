import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProductCard } from "./ProductCard";
import { Product } from "../../types/Product";
import { useNavigation } from "../contexts/NavigationContext";

interface CollectionItem {
  id: string;
  title: string;
  label: string;
  image: string;
  categorySlug: string;
  products: Product[];
}

interface PremiumCollectionsSectionProps {
  collections?: CollectionItem[];
  products?: Product[];
  loading?: boolean;
}

const normalizeCategory = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const sortNewestFirst = (a: Product, b: Product) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

const collectionThumbnail = "src/images/SummerCollections.png";
const collectionThumbnail2 = "src/images/collec.png";
const collectionThumbnail3 = "src/images/collec2.png";
const collectionThumbnail4 = "src/images/SummerCollections.png";
const collectionThumbnails = [
  collectionThumbnail,
  collectionThumbnail2,
  collectionThumbnail3,
  collectionThumbnail4,
];

const buildCollectionsFromProducts = (products: Product[] = []) => {
  const groupedProducts = products.reduce<Record<string, Product[]>>(
    (groups, product) => {
      const category = product.productCategory?.trim();

      if (!category) {
        return groups;
      }

      groups[category] = [...(groups[category] || []), product];
      return groups;
    },
    {},
  );

  return Object.entries(groupedProducts).map(
    ([category, categoryProducts], index) => {
      const sortedProducts = [...categoryProducts].sort(sortNewestFirst);
      return {
        id: normalizeCategory(category),
        title: category,
        label: `${categoryProducts.length} ${
          categoryProducts.length === 1 ? "item" : "items"
        }`,
        image: collectionThumbnails[index % collectionThumbnails.length],
        categorySlug: normalizeCategory(category),
        products: sortedProducts.slice(0, 4),
      };
    },
  );
};

export function PremiumCollectionsSection({
  collections,
  products = [],
  loading = false,
}: PremiumCollectionsSectionProps) {
  const { navigate } = useNavigation();
  const items = useMemo(
    () => (collections ?? buildCollectionsFromProducts(products)).slice(0, 4),
    [collections, products],
  );

  if (!loading && items.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden px-4 py-16 md:px-6 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(254,217,209,0.55),_transparent_30%)]" />
      <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-12 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl" />

      <div className="container relative mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm font-semibold text-rose-700 shadow-xl backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />
            Collections curated for festive elegance
          </div>
          <h2 className="text-3xl font-semibold text-stone-900 md:text-4xl">
            Discover latest saree collections in a premium showcase
          </h2>
        </motion.div>

        <div className="space-y-8">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="grid gap-6 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl md:grid-cols-[1.05fr_1.45fr]"
                >
                  <div className="space-y-4 rounded-[1.75rem] bg-stone-100/70 p-6">
                    <div className="h-56 rounded-[1.5rem] bg-stone-200/70" />
                    <div className="space-y-3">
                      <div className="h-6 w-44 rounded-full bg-stone-200/70" />
                      <div className="h-4 w-32 rounded-full bg-stone-200/70" />
                      <div className="h-4 w-full rounded-full bg-stone-200/70" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, productIndex) => (
                      <div
                        key={productIndex}
                        className="rounded-[1.5rem] border border-white/70 bg-white/75 p-4 shadow-sm"
                      >
                        <div className="h-40 rounded-[1.25rem] bg-stone-200/70" />
                        <div className="mt-4 space-y-2">
                          <div className="h-4 w-3/4 rounded-full bg-stone-200/70" />
                          <div className="h-4 w-1/2 rounded-full bg-stone-200/70" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : items.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.12 }}
                  className="grid gap-6 rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl md:grid-cols-[1.05fr_1.45fr]"
                >
                  <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-white via-rose-50 to-orange-50 shadow-inner shadow-rose-100/50">
                    <ImageWithFallback
                      src={collection.image}
                      alt={collection.title}
                      className="h-full w-full min-h-[24rem] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                    <div className="absolute  bottom-0 flex flex-col gap-4 p-6 text-white">
                      {/* <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white shadow-sm backdrop-blur-xl">
                        {collection.label}
                      </span>
                      <div>
                        <h3 className="text-3xl pl-2 font-semibold tracking-tight text-white md:text-4xl">
                          {collection.title}
                        </h3>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-white/85 sm:text-base">
                          {collection.description}
                        </p>
                      </div> */}
                      <button
                        type="button"
                        onClick={() =>
                          navigate("category", {
                            category: collection.categorySlug,
                          })
                        }
                        className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-900/20 transition duration-300 hover:bg-accent cursor-pointer"
                      >
                        View Collection
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {collection.products.map((product) => (
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
                    ))}
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}

export default PremiumCollectionsSection;
