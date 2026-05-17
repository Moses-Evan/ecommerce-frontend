import { ShoppingCart, Search, Menu, Heart, User } from "lucide-react";
import { useNavigation } from "../contexts/NavigationContext";
import { useCart } from "../contexts/CartContext";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./ui/sheet";



export function Header() {
  const { navigate, currentPage } = useNavigation();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-center items-center gap-4">
          <p className="text-sm">
            Free Shipping on Orders Above 200€
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Open menu" className="lg:hidden p-2">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-3 px-4">
                <SheetClose asChild>
                  <button
                    onClick={() => navigate("home")}
                    className={`text-foreground text-left hover:text-primary transition-colors ${currentPage === "home" ? "text-primary" : ""}`}
                  >
                    Home
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button
                    onClick={() => navigate("category", { category: "all" })}
                    className={`text-foreground text-left hover:text-primary transition-colors ${currentPage === "category" ? "text-primary" : ""}`}
                  >
                    Collections
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button
                    onClick={() => navigate("about")}
                    className={`text-foreground text-left hover:text-primary transition-colors ${currentPage === "about" ? "text-primary" : ""}`}
                  >
                    About Us
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button
                    onClick={() => navigate("contact")}
                    className={`text-foreground text-left hover:text-primary transition-colors ${currentPage === "contact" ? "text-primary" : ""}`}
                  >
                    Contact
                  </button>
                </SheetClose>
              </nav>
              <div className="mt-6 border-t border-border px-4 pt-4">
                <SheetClose asChild>
                  <button
                    onClick={() => navigate("account")}
                    className="w-full rounded-md border border-border px-4 py-3 text-left text-foreground hover:bg-muted/80 transition-colors"
                  >
                    Account
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button
                    onClick={() => navigate("cart")}
                    className="mt-3 w-full rounded-md border border-border px-4 py-3 text-left text-foreground hover:bg-muted/80 transition-colors"
                  >
                    Cart
                  </button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <div
            className="flex-1 lg:flex-initial cursor-pointer"
            onClick={() => navigate("home")}
          >
            {/* <h1 className="text-3xl text-primary tracking-tight">Niorra</h1> */}
            <div className="text-3xl text-primary tracking-tight flex items-center gap-2">
              <img src="src\images\logo-icon.png" width={80} alt="" />
              <h1 style={{ color: "#b30220" }}>NIORRA</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            <button
              onClick={() => navigate("home")}
              className={`text-foreground hover:text-primary transition-colors cursor-pointer ${currentPage === "home" ? "text-primary" : ""}`}
            >
              Home
            </button>
            <button
              onClick={() => navigate("category", { category: "womens-collections" })}
              className={`text-foreground hover:text-primary transition-colors cursor-pointer ${currentPage === "category" ? "text-primary" : ""}`}
            >
              Womens Collections
            </button>
            <button
              onClick={() => navigate("category", { category: "all" })}
              className={`text-foreground hover:text-primary transition-colors cursor-pointer ${currentPage === "category" ? "text-primary" : ""}`}
            >
              Mens Collections
            </button>
            <button
              onClick={() => navigate("category", { category: "all" })}
              className={`text-foreground hover:text-primary transition-colors cursor-pointer ${currentPage === "category" ? "text-primary" : ""}`}
            >
              Kids Collections
            </button>
            <button
              onClick={() => navigate("category", { category: "all" })}
              className={`text-foreground hover:text-primary transition-colors cursor-pointer ${currentPage === "category" ? "text-primary" : ""}`}
            >
              Accessories
            </button>
            {/* <button
              onClick={() => navigate("about")}
              className={`text-foreground hover:text-primary transition-colors cursor-pointer ${currentPage === "about" ? "text-primary" : ""}`}
            >
              About Us
            </button> */}
            <button
              onClick={() => navigate("contact")}
              className={`text-foreground hover:text-primary transition-colors cursor-pointer ${currentPage === "contact" ? "text-primary" : ""}`}
            >
              Contact
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block p-2 hover:bg-accent/10 rounded-full transition-colors cursor-pointer">
              <Search className="h-5 w-5" />
            </button>
            <button className="hidden md:block p-2 hover:bg-accent/10 rounded-full transition-colors cursor-pointer">
              <Heart className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate("account")}
              className="hidden md:block p-2 hover:bg-accent/10 rounded-full transition-colors cursor-pointer"
            >
              <User className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate("cart")}
              className="p-2 hover:bg-accent/10 rounded-full transition-colors relative cursor-pointer"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
