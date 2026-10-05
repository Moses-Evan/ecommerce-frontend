import { useEffect, useState } from "react";
import {
  Package,
  Heart,
  MapPin,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { AddressBook } from "../components/AddressBook";
import { ProfileInformation } from "../components/ProfileInformation";
import { getAllProducts } from "../../api/productApi";
import {
  getOrderById,
  getOrdersByCustomerEmail,
  OrderResponse,
} from "../../api/orderApi";
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
  { id: "profile", label: "Profile", icon: User },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
];

const ORDERS_PER_PAGE = 4;

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
  }).format(amount);

const orderStatusClass = (status: string) => {
  const normalizedStatus = status.toUpperCase();
  if (normalizedStatus.includes("DELIVER"))
    return "bg-green-100 text-green-700";
  if (normalizedStatus.includes("CANCEL") || normalizedStatus.includes("FAIL"))
    return "bg-red-100 text-red-700";
  if (normalizedStatus.includes("SHIP") || normalizedStatus.includes("TRANSIT"))
    return "bg-blue-100 text-blue-700";
  return "bg-yellow-100 text-yellow-700";
};

const paymentStatusClass = (status: string) => {
  const normalizedStatus = status.toUpperCase();
  if (normalizedStatus === "PAID") return "bg-green-100 text-green-700";
  if (normalizedStatus.includes("FAIL") || normalizedStatus.includes("REFUND"))
    return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
};

export function AccountPage() {
  const { navigate, params } = useNavigation();
  const { productIds } = useWishlist();
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(
    null,
  );
  const [orderDetailLoading, setOrderDetailLoading] = useState(false);
  const [orderDetailError, setOrderDetailError] = useState("");
  const [activeSection, setActiveSection] = useState<AccountSection>(
    params.section ?? params.tab ?? "profile",
  );
  const isAuthenticated = Boolean(getAccessToken());
  const customerEmail = getAuthenticatedProfile().email;

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

  useEffect(() => {
    if (activeSection !== "orders") return;
    if (!customerEmail) {
      setOrders([]);
      setOrdersError(
        t("Your account email is unavailable. Please sign in again."),
      );
      return;
    }

    let cancelled = false;
    setOrdersLoading(true);
    setOrdersError("");
    getOrdersByCustomerEmail(customerEmail)
      .then((customerOrders) => {
        if (!cancelled) {
          setOrders(customerOrders);
          setOrdersPage(1);
        }
      })
      .catch((error: unknown) => {
        console.error("Error loading customer orders:", error);
        if (!cancelled) setOrdersError(t("Unable to load your orders"));
      })
      .finally(() => {
        if (!cancelled) setOrdersLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [activeSection, customerEmail, t]);

  useEffect(() => {
    if (selectedOrderId === null) return;

    let cancelled = false;
    setSelectedOrder(null);
    setOrderDetailLoading(true);
    setOrderDetailError("");
    getOrderById(selectedOrderId)
      .then((order) => {
        if (!cancelled) setSelectedOrder(order);
      })
      .catch((error: unknown) => {
        console.error("Error loading order details:", error);
        if (!cancelled) setOrderDetailError(t("Unable to load order details"));
      })
      .finally(() => {
        if (!cancelled) setOrderDetailLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedOrderId, t]);

  if (!isAuthenticated) return null;

  const wishlistProducts = products.filter((product) =>
    productIds.includes(String(product.id)),
  );
  const orderPageCount = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const pageOrders = orders.slice(
    (ordersPage - 1) * ORDERS_PER_PAGE,
    ordersPage * ORDERS_PER_PAGE,
  );

  const handleLogout = () => {
    clearAccessToken();
    navigate("login");
  };

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
                  className={`relative w-full flex items-center gap-3 p-3 rounded-md transition-colors text-left cursor-pointer ${activeSection === id ? "text-primary-foreground" : "hover:bg-muted/60"}`}
                >
                  {activeSection === id && (
                    <motion.span
                      layoutId="account-active-tab"
                      className="absolute inset-0 rounded-md bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <Icon className="relative z-10 h-5 w-5" />
                  <span className="relative z-10">{t(label)}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors text-left cursor-pointer"
              >
                <LogOut className="h-5 w-5" />
                <span>{t("Logout")}</span>
              </button>
            </nav>
          </aside>

          <main className="lg:col-span-3 min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                {activeSection === "profile" && <ProfileInformation />}

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
                        onClick={() =>
                          navigate("category", {
                            category: "all-women-collections",
                          })
                        }
                        variant="outline"
                        className="mt-4"
                      >
                        {t("Browse Products")}
                      </Button>
                    </div>
                  ))}

                {activeSection === "orders" && (
                  <div className="space-y-4">
                    {ordersLoading ? (
                      <p
                        role="status"
                        className="py-8 text-center text-muted-foreground"
                      >
                        {t("Loading orders")}
                      </p>
                    ) : ordersError ? (
                      <p
                        role="alert"
                        className="py-8 text-center text-destructive"
                      >
                        {ordersError}
                      </p>
                    ) : orders.length === 0 ? (
                      <p className="py-8 text-center text-muted-foreground">
                        {t("You have no orders yet")}
                      </p>
                    ) : (
                      <>
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={ordersPage}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-4"
                          >
                            {pageOrders.map((order, index) => (
                              <motion.article
                                key={order.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.2,
                                  delay: index * 0.045,
                                }}
                                className="bg-card border border-border rounded-lg p-6"
                              >
                                <div className="flex justify-between items-start mb-4 gap-4">
                                  <div>
                                    <h2 className="text-lg mb-1">
                                      Order #{order.orderNumber}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                      {new Date(
                                        order.createdAt,
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div className="flex flex-wrap justify-end gap-2">
                                    <span
                                      className={`px-3 py-1 rounded-full text-sm ${orderStatusClass(order.orderStatus)}`}
                                    >
                                      {t("Order Status")}: {order.orderStatus}
                                    </span>
                                    <span
                                      className={`px-3 py-1 rounded-full text-sm ${paymentStatusClass(order.paymentStatus)}`}
                                    >
                                      {t("Payment")}: {order.paymentStatus}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      {order.items.length} {t("item(s)")}
                                    </p>
                                    <p className="text-primary mt-1">
                                      {formatCurrency(order.totalAmount)}
                                    </p>
                                  </div>
                                  <Button
                                    variant="outline"
                                    onClick={() => setSelectedOrderId(order.id)}
                                  >
                                    {t("View Details")}
                                  </Button>
                                </div>
                              </motion.article>
                            ))}
                          </motion.div>
                        </AnimatePresence>
                        {orderPageCount > 1 && (
                          <nav
                            aria-label={t("Orders pagination")}
                            className="flex items-center justify-center gap-4 pt-4"
                          >
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              aria-label={t("Previous page")}
                              disabled={ordersPage === 1}
                              onClick={() => setOrdersPage((page) => page - 1)}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span
                              className="min-w-24 text-center text-sm text-muted-foreground"
                              aria-live="polite"
                            >
                              {t("Page")} {ordersPage} {t("of")}{" "}
                              {orderPageCount}
                            </span>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              aria-label={t("Next page")}
                              disabled={ordersPage === orderPageCount}
                              onClick={() => setOrdersPage((page) => page + 1)}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </nav>
                        )}
                      </>
                    )}
                  </div>
                )}

                <Dialog
                  open={selectedOrderId !== null}
                  onOpenChange={(open) => {
                    if (!open) setSelectedOrderId(null);
                  }}
                >
                  <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        {selectedOrder
                          ? `${t("Order")} #${selectedOrder.orderNumber}`
                          : t("Order Details")}
                      </DialogTitle>
                      <DialogDescription>
                        {selectedOrder
                          ? new Date(selectedOrder.createdAt).toLocaleString()
                          : t("View your order information")}
                      </DialogDescription>
                    </DialogHeader>
                    {orderDetailLoading ? (
                      <p
                        role="status"
                        className="py-6 text-center text-muted-foreground"
                      >
                        {t("Loading order details")}
                      </p>
                    ) : orderDetailError ? (
                      <p
                        role="alert"
                        className="py-6 text-center text-destructive"
                      >
                        {orderDetailError}
                      </p>
                    ) : selectedOrder ? (
                      <div className="space-y-6 text-sm">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <h3 className="font-medium mb-2">
                              {t("Order Status")}
                            </h3>
                            <span
                              className={`inline-flex rounded-full px-3 py-1 ${orderStatusClass(selectedOrder.orderStatus)}`}
                            >
                              {selectedOrder.orderStatus}
                            </span>
                            <h3 className="font-medium mb-2 mt-4">
                              {t("Payment Status")}
                            </h3>
                            <span
                              className={`inline-flex rounded-full px-3 py-1 ${paymentStatusClass(selectedOrder.paymentStatus)}`}
                            >
                              {selectedOrder.paymentStatus}
                            </span>
                            <p className="text-muted-foreground mt-2">
                              {t("Payment Method")}:{" "}
                              {selectedOrder.paymentMethod}
                            </p>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">
                              {t("Shipping Address")}
                            </h3>
                            <p>{selectedOrder.customerName}</p>
                            <p>{selectedOrder.shippingAddress}</p>
                            <p>
                              {[
                                selectedOrder.shippingCity,
                                selectedOrder.shippingState,
                                selectedOrder.shippingZip,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                            <p>{selectedOrder.shippingCountry}</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-3">{t("Items")}</h3>
                          <div className="divide-y border-y">
                            {selectedOrder.items.map((item) => (
                              <div
                                key={item.productId}
                                className="flex items-center justify-between gap-4 py-3"
                              >
                                <div className="flex min-w-0 items-center gap-3">
                                  <img
                                    src={item.productImage}
                                    alt={item.productName}
                                    className="aspect-[3/4] w-14 shrink-0 rounded-md object-cover"
                                  />
                                  <span className="min-w-0">
                                    {item.productName} × {item.quantity}
                                  </span>
                                </div>
                                <span className="shrink-0">
                                  {formatCurrency(item.subtotal)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <dl className="ml-auto grid max-w-xs grid-cols-2 gap-x-6 gap-y-2">
                          <dt>{t("Subtotal")}</dt>
                          <dd className="text-right">
                            {formatCurrency(selectedOrder.subtotal)}
                          </dd>
                          <dt>{t("Discount")}</dt>
                          <dd className="text-right">
                            −{formatCurrency(selectedOrder.discount)}
                          </dd>
                          <dt>{t("Shipping")}</dt>
                          <dd className="text-right">
                            {formatCurrency(selectedOrder.shippingCharge)}
                          </dd>
                          <dt>{t("Tax")}</dt>
                          <dd className="text-right">
                            {formatCurrency(selectedOrder.tax)}
                          </dd>
                          <dt className="font-medium">{t("Total")}</dt>
                          <dd className="text-right font-medium">
                            {formatCurrency(selectedOrder.totalAmount)}
                          </dd>
                        </dl>
                      </div>
                    ) : null}
                  </DialogContent>
                </Dialog>

                {activeSection === "addresses" && <AddressBook mode="manage" />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
