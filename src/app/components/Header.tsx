import { ShoppingCart, Heart, User, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import { useNavigation } from "../contexts/NavigationContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useLanguage } from "../contexts/LanguageContext";
import { getAccessToken } from "../../api/auth";
import { getAllProducts } from "../../api/productApi";
import { Product } from "../../types/Product";
import { CollectionGroupDropdown } from "./CategoryDropdown";
import { categories } from "../data/categories";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import logoIcon from "../../images/logo-icon.png";

export function Header() {
  const { navigate, page, params } = useNavigation();
  const { totalItems } = useCart();
  const { productIds } = useWishlist();
  const { language, setLanguage, t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const cartIconAnimation = useAnimationControls();
  const previousTotalItems = useRef(totalItems);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    typeof params.query === "string" ? params.query : "",
  );
  const [searchProducts, setSearchProducts] = useState<Product[] | null>(null);
  const [searchProductsLoading, setSearchProductsLoading] = useState(false);
  const [searchProductsError, setSearchProductsError] = useState(false);
  const openAccount = () => navigate(getAccessToken() ? "account" : "login");

  useEffect(() => {
    setSearchQuery(typeof params.query === "string" ? params.query : "");
  }, [params.query]);

  useEffect(() => {
    if (!searchOpen) return;

    searchInputRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen || searchProducts !== null) return;

    let active = true;
    setSearchProductsLoading(true);
    setSearchProductsError(false);
    getAllProducts()
      .then((products) => {
        if (active) setSearchProducts(products);
      })
      .catch((error: unknown) => {
        console.error("Error fetching product search suggestions:", error);
        if (active) setSearchProductsError(true);
      })
      .finally(() => {
        if (active) setSearchProductsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [searchOpen, searchProducts]);

  const searchSuggestions = searchProducts
    ? searchProducts
        .filter((product) => {
          const query = searchQuery.trim().toLocaleLowerCase();
          if (query.length < 2) return false;
          return [
            product.productName,
            product.productDescription,
            product.productCategory,
            product.productType,
            product.productSubType,
            product.productFabricType,
            product.productColor,
            product.productBrand,
            product.productSku,
          ]
            .filter(Boolean)
            .some((value) => value.toLocaleLowerCase().includes(query));
        })
        .slice(0, 5)
    : [];

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    navigate("search", { query });
    setSearchOpen(false);
  };

  useEffect(() => {
    if (
      totalItems > previousTotalItems.current &&
      !prefersReducedMotion
    ) {
      void cartIconAnimation.start({
        rotate: [0, -14, 14, -10, 10, 0],
        scale: [1, 1.2, 1],
        transition: { duration: 0.55, ease: "easeInOut" },
      });
    }

    previousTotalItems.current = totalItems;
  }, [totalItems, prefersReducedMotion, cartIconAnimation]);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      {/* Top Bar */}
      <div className="relative overflow-hidden bg-primary text-primary-foreground py-2">
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-secondary/25 to-transparent niorra-gold-sheen" />
        <div className="container relative mx-auto px-4 flex justify-center items-center gap-4">
          <span className="h-1 w-1 rotate-45 bg-secondary niorra-jewel-pulse" />
          <p className="text-sm">{t("Flash Sale Going On!")}</p>
          <span className="h-1 w-1 rotate-45 bg-secondary niorra-jewel-pulse [animation-delay:400ms]" />
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-1.5 lg:flex-initial lg:gap-2"
            onClick={() => navigate("home")}
          >
            {/* <h1 className="text-3xl text-primary tracking-tight">Niorra</h1> */}
            <img
              src={logoIcon}
              className="h-11 w-11 shrink-0 object-contain sm:h-16 sm:w-16 lg:h-20 lg:w-20"
              alt=""
            />
            <h1 className="truncate text-xl tracking-tight text-niorra-red sm:text-2xl lg:text-3xl">
              NIORRA
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex min-w-0 flex-1 flex-nowrap items-center justify-center gap-x-2 overflow-visible px-1 xl:gap-x-4">
            <button
              onClick={() => navigate("home")}
              className={`shrink-0 whitespace-nowrap text-sm text-foreground hover:text-primary transition-colors cursor-pointer ${page === "home" ? "text-primary" : ""}`}
            >
              {t("Home")}
            </button>
            {categories.map((group: any) => (
              <CollectionGroupDropdown
                key={group.name}
                groupName={group.name}
                items={group.items}
              />
            ))}
            <button
              onClick={() => navigate("contact")}
              className={`shrink-0 whitespace-nowrap text-sm text-foreground hover:text-primary transition-colors cursor-pointer ${page === "contact" ? "text-primary" : ""}`}
            >
              {t("Contact")}
            </button>
            {/* <button
              onClick={() => navigate("category", { category: "accessories" })}
              className={`text-foreground hover:text-primary transition-colors cursor-pointer ${page === "category" ? "text-primary" : ""}`}
            >
              Accessories
            </button> */}
          </nav>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-4">
            <div
              className="flex items-center rounded-full border border-border p-1 text-xs font-semibold"
              aria-label="Language"
            >
              <button
                type="button"
                onClick={() => setLanguage("de")}
                className={`rounded-full px-1.5 py-1 cursor-pointer transition-colors sm:px-2 ${language === "de" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-1.5 py-1 cursor-pointer transition-colors sm:px-2 ${language === "en" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              aria-label={t("Search products")}
              aria-expanded={searchOpen}
              className="relative cursor-pointer rounded-full p-1.5 transition-colors hover:bg-accent/10 sm:p-2"
            >
              {searchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => navigate("account", { tab: "wishlist" })}
              aria-label={`${t("View wishlist")}${productIds.length ? ` (${productIds.length})` : ""}`}
              className={`relative hidden md:block rounded-full p-2 transition-colors cursor-pointer ${productIds.length > 0 ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-accent/10"}`}
            >
              <Heart
                className={`h-5 w-5 ${productIds.length > 0 ? "fill-current" : ""}`}
              />
              {productIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {productIds.length}
                </span>
              )}
            </button>
            <button
              onClick={openAccount}
              aria-label={t("View account")}
              className="hidden md:block p-2 hover:bg-accent/10 rounded-full transition-colors cursor-pointer"
            >
              <User className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate("cart")}
              aria-label={`${t("Cart")}${totalItems ? ` (${totalItems})` : ""}`}
              className="relative cursor-pointer rounded-full p-1.5 transition-colors hover:bg-accent/10 sm:p-2"
            >
              <motion.span
                animate={cartIconAnimation}
                className="inline-flex origin-center"
              >
                <ShoppingCart className="h-5 w-5" />
              </motion.span>
              <AnimatePresence initial={false}>
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{
                      opacity: 0,
                      scale: prefersReducedMotion ? 1 : 0.5,
                      y: prefersReducedMotion ? 0 : 3,
                    }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.7 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.2,
                      type: "spring",
                      stiffness: 500,
                      damping: 24,
                    }}
                    className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {searchOpen && (
            <motion.form
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
              onSubmit={submitSearch}
              role="search"
              className="relative"
            >
              <div className="mt-3 flex gap-2 border-t border-border pt-3 sm:mt-4 sm:pt-4">
                <label className="sr-only" htmlFor="header-product-search">
                  {t("Search products")}
                </label>
                <input
                  ref={searchInputRef}
                  id="header-product-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={t("Search products...")}
                  className="h-11 min-w-0 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="submit"
                  className="h-11 shrink-0 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {t("Search")}
                </button>
              </div>
              {searchQuery.trim().length >= 2 && (
                <div className="absolute inset-x-0 top-full z-[60] mt-2 max-h-80 overflow-y-auto rounded-xl border border-border bg-background p-2 shadow-xl">
                  {searchProductsLoading ? (
                    <p className="px-3 py-4 text-sm text-muted-foreground">
                      {t("Loading products...")}
                    </p>
                  ) : searchProductsError ? (
                    <p role="alert" className="px-3 py-4 text-sm text-muted-foreground">
                      {t("Unable to load products. Please try again.")}
                    </p>
                  ) : searchSuggestions.length > 0 ? (
                    <ul aria-label={t("Search suggestions")} className="space-y-1">
                      {searchSuggestions.map((product) => (
                        <li key={product.id}>
                          <button
                            type="button"
                            onClick={() => {
                              navigate("product", { productId: product.id });
                              setSearchOpen(false);
                            }}
                            className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted"
                          >
                            <ImageWithFallback
                              src={product.productImages?.[0]}
                              alt=""
                              className="h-12 w-10 shrink-0 rounded object-cover"
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium">
                                {product.productName}
                              </span>
                              <span className="block text-xs text-muted-foreground">
                                €{product.productSellingPrice.toLocaleString()}
                              </span>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : searchProducts ? (
                    <p className="px-3 py-4 text-sm text-muted-foreground">
                      {t("No products found")}
                    </p>
                  ) : null}
                </div>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
