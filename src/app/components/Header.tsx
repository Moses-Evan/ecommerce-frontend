import { ShoppingCart, Search, Menu, Heart, User } from "lucide-react";
import { useState } from "react";
import { useNavigation } from "../contexts/NavigationContext";
import { useCart } from "../contexts/CartContext";
import { CollectionGroupDropdown } from "./CategoryDropdown";
import { categories } from "../../data/categories";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./ui/sheet";

export function Header() {
  const { navigate, page } = useNavigation();
  const { totalItems } = useCart();
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-center items-center gap-4">
          <p className="text-sm">Free Shipping on Orders Above 200€</p>
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
                    className={`text-foreground text-left hover:text-primary transition-colors ${page === "home" ? "text-primary" : ""}`}
                  >
                    Home
                  </button>
                </SheetClose>

                {/* Mobile Collections Dropdown */}
                <div className="border-t border-border pt-3">
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className={`text-foreground text-left hover:text-primary transition-colors flex items-center justify-between w-full ${page === "category" ? "text-primary" : ""}`}
                  >
                    Collections
                    <span
                      className={`transform transition-transform ${mobileDropdownOpen ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </button>

                  {mobileDropdownOpen && (
                    <div className="mt-3 ml-4 space-y-4 pb-3 border-b border-border">
                      {categories.map((group: any) => (
                        <div key={group.name}>
                          <h4 className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
                            {group.name}
                          </h4>
                          <div className="space-y-2">
                            {group.items.map((item: any) => (
                              <SheetClose key={item.id} asChild>
                                <button
                                  onClick={() =>
                                    navigate("category", { category: item.id })
                                  }
                                  className="block text-sm text-foreground/80 hover:text-primary transition-colors"
                                >
                                  {item.name}
                                </button>
                              </SheetClose>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <SheetClose asChild>
                  <button
                    onClick={() =>
                      navigate("category", { category: "accessories" })
                    }
                    className={`text-foreground text-left hover:text-primary transition-colors ${page === "category" ? "text-primary" : ""}`}
                  >
                    Accessories
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button
                    onClick={() => navigate("contact")}
                    className={`text-foreground text-left hover:text-primary transition-colors ${page === "contact" ? "text-primary" : ""}`}
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
              <h1 className="text-niorra-red">NIORRA</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            <button
              onClick={() => navigate("home")}
              className={`text-foreground hover:text-primary transition-colors cursor-pointer ${page === "home" ? "text-primary" : ""}`}
            >
              Home
            </button>
            {categories.map((group: any) => (
              <CollectionGroupDropdown
                key={group.name}
                groupName={group.name}
                items={group.items}
              />
            ))}
            <button
              onClick={() => navigate("category", { category: "accessories" })}
              className={`text-foreground hover:text-primary transition-colors cursor-pointer ${page === "category" ? "text-primary" : ""}`}
            >
              Accessories
            </button>
            <button
              onClick={() => navigate("contact")}
              className={`text-foreground hover:text-primary transition-colors cursor-pointer ${page === "contact" ? "text-primary" : ""}`}
            >
              Contact
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Search products"
              className="hidden md:block p-2 hover:bg-accent/10 rounded-full transition-colors cursor-pointer"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              aria-label="View wishlist"
              className="hidden md:block p-2 hover:bg-accent/10 rounded-full transition-colors cursor-pointer"
            >
              <Heart className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate("account")}
              aria-label="View account"
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
