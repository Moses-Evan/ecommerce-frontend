import { useEffect, useState } from "react";
import { Package, Heart, MapPin, User, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { getAllProducts } from "../../api/productApi";
import { Product } from "../../types/Product";
import { useNavigation } from "../contexts/NavigationContext";
import { useWishlist } from "../contexts/WishlistContext";
import { useLanguage } from "../contexts/LanguageContext";
import {
  clearAccessToken,
  getAccessToken,
  getAuthenticatedProfile,
} from "../../api/auth";

type AccountSection = "orders" | "wishlist" | "addresses" | "profile";

const sections: {
  id: AccountSection;
  label: string;
  icon: typeof Package;
}[] = [
  { id: "orders", label: "My Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "profile", label: "Profile", icon: User },
];

export function AccountPage() {
  const { navigate, params } = useNavigation();
  const { productIds } = useWishlist();
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeSection, setActiveSection] = useState<AccountSection>(
    params.section ?? params.tab ?? "orders",
  );
  const isAuthenticated = Boolean(getAccessToken());
  const profile = getAuthenticatedProfile();

  useEffect(() => {
    if (!isAuthenticated) navigate("login");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch((error) =>
        console.error("Error loading wishlist products:", error),
      );
  }, []);

  if (!isAuthenticated) return null;

  const wishlistProducts = products.filter((product) =>
    productIds.includes(String(product.id)),
  );

  const orders = [
    {
      id: "DV12345",
      date: "March 15, 2025",
      status: "Delivered",
      total: 8999,
      items: 1,
    },
    {
      id: "DV12344",
      date: "March 10, 2025",
      status: "In Transit",
      total: 15999,
      items: 2,
    },
    {
      id: "DV12343",
      date: "March 5, 2025",
      status: "Processing",
      total: 4999,
      items: 1,
    },
  ];

  const handleLogout = () => {
    clearAccessToken();
    navigate("login");
  };

  const profileValue = (value?: string) => value || t("Not provided");

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">{t("My Account")}</h1>
          <p className="text-muted-foreground">
            {t("Manage your orders and account settings")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <nav aria-label={t("Account menu")} className="space-y-1">
              {sections.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  aria-current={activeSection === id ? "page" : undefined}
                  onClick={() => setActiveSection(id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-md transition-colors text-left ${activeSection === id ? "bg-primary text-primary-foreground" : "hover:bg-muted/60"}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{t(label)}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors text-left"
              >
                <LogOut className="h-5 w-5" />
                <span>{t("Logout")}</span>
              </button>
            </nav>
          </aside>

          <main className="lg:col-span-3 min-w-0">
            {activeSection === "orders" && (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-card border border-border rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <div>
                        <h2 className="text-lg mb-1">Order #{order.id}</h2>
                        <p className="text-sm text-muted-foreground">
                          {order.date}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "In Transit"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {order.items} item(s)
                        </p>
                        <p className="text-primary mt-1">
                          €{order.total.toLocaleString()}
                        </p>
                      </div>
                      <Button variant="outline">{t("View Details")}</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === "wishlist" &&
              (wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistProducts.map((product) => (
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
              ) : (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    {t("Your wishlist is empty")}
                  </p>
                  <Button
                    onClick={() => navigate("category", { category: "all" })}
                    variant="outline"
                    className="mt-4"
                  >
                    {t("Browse Products")}
                  </Button>
                </div>
              ))}

            {activeSection === "addresses" && (
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg">Home</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm">
                    123 Silk Street
                    <br />
                    Mumbai, Maharashtra 400001
                    <br />
                    Phone: +91 98765 43210
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  + Add New Address
                </Button>
              </div>
            )}

            {activeSection === "profile" && (
              <section className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg mb-6">{t("Profile Information")}</h2>
                <div className="flex items-center gap-4 mb-6">
                  {profile.picture ? (
                    <img
                      src={profile.picture}
                      alt={profile.name || t("Profile")}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">
                      {profileValue(profile.name)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {profileValue(profile.email)}
                    </p>
                  </div>
                </div>
                <dl className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm text-muted-foreground">
                      {t("First Name")}
                    </dt>
                    <dd className="mt-1">{profileValue(profile.givenName)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">
                      {t("Last Name")}
                    </dt>
                    <dd className="mt-1">{profileValue(profile.familyName)}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm text-muted-foreground">
                      {t("Email")}
                    </dt>
                    <dd className="mt-1 break-all">
                      {profileValue(profile.email)}
                    </dd>
                  </div>
                </dl>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
