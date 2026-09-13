import { ShoppingCart, Search, Menu, Heart, User } from "lucide-react";
import { useState } from "react";
import { useNavigation } from "../contexts/NavigationContext";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useLanguage } from "../contexts/LanguageContext";
import { CollectionGroupDropdown } from "./CategoryDropdown";
import { categories } from "../data/categories";
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
  const { productIds } = useWishlist();
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button aria-label={t("Menu")} className="lg:hidden p-2">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>{t("Menu")}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-3 px-4">
                <SheetClose asChild>
                  <button
                    onClick={() => navigate("home")}
                    className={`text-foreground text-left hover:text-primary transition-colors ${page === "home" ? "text-primary" : ""}`}
                  >
                    {t("Home")}
                  </button>
                </SheetClose>

                {/* Mobile Collections Dropdown */}
                <div className="border-t border-border pt-3">
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className={`text-foreground text-left hover:text-primary transition-colors flex items-center justify-between w-full ${page === "category" ? "text-primary" : ""}`}
                  >
                    {t("Collections")}
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
                            {t(group.name)}
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
                                  {t(item.name)}
                                </button>
                              </SheetClose>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* <SheetClose asChild>
                  <button
                    onClick={() =>
                      navigate("category", { category: "accessories" })
                    }
                    className={`text-foreground text-left hover:text-primary transition-colors ${page === "category" ? "text-primary" : ""}`}
                  >
                    Accessories
                  </button>
                </SheetClose> */}
                <SheetClose asChild>
                  <button
                    onClick={() => navigate("contact")}
                    className={`text-foreground text-left hover:text-primary transition-colors ${page === "contact" ? "text-primary" : ""}`}
                  >
                    {t("Contact")}
                  </button>
                </SheetClose>
              </nav>
              <div className="mt-6 border-t border-border px-4 pt-4">
                <SheetClose asChild>
                  <button
                    onClick={() => navigate("account")}
                    className="w-full rounded-md border border-border px-4 py-3 text-left text-foreground hover:bg-muted/80 transition-colors"
                  >
                    {t("Account")}
                  </button>
                </SheetClose>
                <SheetClose asChild>
                  <button
                    onClick={() => navigate("cart")}
                    className="mt-3 w-full rounded-md border border-border px-4 py-3 text-left text-foreground hover:bg-muted/80 transition-colors"
                  >
                    {t("Cart")}
                  </button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <div
            className="flex-1 shrink-0 lg:flex-initial cursor-pointer"
            onClick={() => navigate("home")}
          >
            {/* <h1 className="text-3xl text-primary tracking-tight">Niorra</h1> */}
            <div className="text-3xl text-primary tracking-tight flex items-center gap-2">
              <img src="src\images\logo-icon.png" width={80} alt="" />
              <h1 className="text-niorra-red">NIORRA</h1>
            </div>
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
          <div className="flex items-center gap-4">
            <div
              className="flex items-center rounded-full border border-border p-1 text-xs font-semibold"
              aria-label="Language"
            >
              <button
                type="button"
                onClick={() => setLanguage("de")}
                className={`rounded-full px-2 py-1 transition-colors ${language === "de" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-2 py-1 transition-colors ${language === "en" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                EN
              </button>
            </div>
            {/* <button
              aria-label="Search products"
              className="relative hidden md:block p-2 hover:bg-accent/10 rounded-full transition-colors cursor-pointer"
            >
              <Search className="h-5 w-5" />
            </button> */}
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
              onClick={() => navigate("account")}
              aria-label={t("View account")}
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
