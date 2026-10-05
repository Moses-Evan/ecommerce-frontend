import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

function AppContent() {
  const { currentPage, params } = useNavigation();
  const prefersReducedMotion = useReducedMotion();

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
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
      <Footer />
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
