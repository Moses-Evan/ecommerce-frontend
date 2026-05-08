import { CartProvider } from "./contexts/CartContext";
import { NavigationProvider, useNavigation } from "./contexts/NavigationContext";
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

function AppContent() {
  const { currentPage, params } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "category":
        return <CategoryPage category={params.category} />;
      case "product":
        return <ProductDetailPage productId={params.productId} />;
      case "cart":
        return <CartPage />;
      case "checkout":
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
        {renderPage()}
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </NavigationProvider>
  );
}
