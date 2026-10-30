import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Heart,
  Home,
  LayoutGrid,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CartProvider } from "./contexts/CartContext";
import {
  NavigationProvider,
  useNavigation,
} from "./contexts/NavigationContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { CategoryPage } from "./pages/CategoryPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { LoginPage } from "./pages/LoginPage";
import { AccountPage } from "./pages/AccountPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { WishlistProvider } from "./contexts/WishlistContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Toaster } from "./components/ui/sonner";

function AppContent() {
  const { currentPage, params, navigate } = useNavigation();
  const prefersReducedMotion = useReducedMotion();
  const [isMobileApp, setIsMobileApp] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleResize = () => setIsMobileApp(mediaQuery.matches);

    handleResize();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleResize);
      return () => mediaQuery.removeEventListener("change", handleResize);
    }

    mediaQuery.addListener(handleResize);
    return () => mediaQuery.removeListener(handleResize);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsAppLoading(false), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "category":
        return (
          <CategoryPage
            category={params.category}
            occasion={params.occasion}
            priceMin={params.priceMin}
            priceMax={params.priceMax}
          />
        );
      case "product":
        return <ProductDetailPage productId={params.productId} />;
      case "cart":
        return <CartPage />;
      case "checkout":
      case "paypal-return":
        return <CheckoutPage />;
      case "login":
      case "signup":
        return <LoginPage />;
      case "account":
        return <AccountPage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  const mobileTabs = [
    { key: "home", label: "Home", icon: Home },
    { key: "category", label: "Shop", icon: LayoutGrid },
    { key: "wishlist", label: "Saved", icon: Heart },
    { key: "cart", label: "Cart", icon: ShoppingBag },
    { key: "account", label: "Me", icon: UserRound },
  ] as const;

  const handleMobileTab = (tab: (typeof mobileTabs)[number]["key"]) => {
    if (tab === "wishlist") {
      navigate("account", { tab: "wishlist" });
      return;
    }

    if (tab === "category") {
      navigate("category", { category: "sarees" });
      return;
    }

    navigate(tab as "home" | "cart" | "account");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnimatePresence>
        {isAppLoading && (
          <motion.div
            key="startup-loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#fff8f0]"
          >
            <div className="flex flex-col items-center gap-5 rounded-[2rem] border border-[#8f0d1d]/10 bg-white/80 px-8 py-8 shadow-[0_20px_50px_rgba(90,21,27,0.12)] backdrop-blur-sm">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#8f0d1d]/10 bg-[#8f0d1d] shadow-[0_12px_30px_rgba(143,13,29,0.28)]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#8f0d1d]/70">
                  Niorra
                </p>
                <h2 className="mt-2 text-2xl text-[#4a0f1d]">Starting up</h2>
                <p className="mt-2 text-sm text-[#6b5d4f]">
                  Preparing your curated collection...
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />
      <div className="flex-1 overflow-x-hidden pb-24 md:pb-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            key={`${currentPage}-${JSON.stringify(params)}`}
            className="min-h-full"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.18,
              ease: "easeOut",
            }}
          >
            {renderPage()}
          </motion.main>
        </AnimatePresence>
      </div>
      {isMobileApp && (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[calc(env(safe-area-inset-bottom)+0.65rem)] pt-2 shadow-[0_-18px_30px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
          <div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-2">
            {mobileTabs.map(({ key, label, icon: Icon }) => {
              const isActive =
                key === "home"
                  ? currentPage === "home"
                  : key === "category"
                    ? currentPage === "category"
                    : key === "cart"
                      ? currentPage === "cart"
                      : key === "account"
                        ? currentPage === "account"
                        : false;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleMobileTab(key)}
                  className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-medium transition-all ${
                    isActive
                      ? "bg-[#fff3d8] text-[#6e1120]"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}
      {!isMobileApp && <Footer />}
      <Toaster
        position="bottom-center"
        className="niorra-toaster"
        toastOptions={{
          classNames: {
            toast: "niorra-toast",
            title: "niorra-toast-title",
            description: "niorra-toast-description",
            actionButton: "niorra-toast-action",
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <LanguageProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </LanguageProvider>
    </NavigationProvider>
  );
}
