import { useEffect, useRef, useState } from "react";
import { Address } from "../../api/addressApi";
import {
  getAccessToken,
  getAuthenticatedProfile,
  setPostLoginDestination,
} from "../../api/auth";
import {
  cancelPayPalOrder,
  capturePayPalOrder,
  createOrder,
  startPayPalApproval,
} from "../../api/orderApi";
import { useCart } from "../contexts/CartContext";
import { useNavigation } from "../contexts/NavigationContext";
import { AddressBook } from "../components/AddressBook";
import { ProfileInformation } from "../components/ProfileInformation";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Wallet, CheckCircle, LoaderCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";

const confettiPieces = Array.from({ length: 110 }, (_, index) => ({
  left: (index * 47) % 100,
  drift: ((index * 83) % 281) - 140,
  rotate: ((index * 97) % 1080) - 540,
  delay: (index % 12) * 0.045,
  duration: 2.5 + (index % 5) * 0.12,
  color: [
    "#f04438",
    "#ff8a00",
    "#f4c430",
    "#20a464",
    "#00a6d6",
    "#4361ee",
    "#9b5de5",
    "#f15bb5",
  ][index % 8],
  width: index % 3 === 0 ? 6 : 9,
  height: index % 3 === 0 ? 12 : 7,
}));

export function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { navigate } = useNavigation();
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = useState<"info" | "payment" | "success">("info");
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [paymentError, setPaymentError] = useState("");
  const [cancelStatus, setCancelStatus] = useState<
    "processing" | "cancelled" | "error" | "unavailable"
  >( "processing");
  const [cancelRetryCount, setCancelRetryCount] = useState(0);
  const [isStartingPayment, setIsStartingPayment] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addressSelectionError, setAddressSelectionError] = useState("");
  const captureStarted = useRef(false);
  const cancelStarted = useRef(false);
  const isAuthenticated = Boolean(getAccessToken());

  // const shipping = totalPrice > 2999 ? 0 : 200;
  const shipping = 0;
  const finalTotal = totalPrice + shipping;
  const hashRoute = window.location.hash.slice(1).split("?")[0];
  const urlParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(
    window.location.hash.includes("?")
      ? window.location.hash.slice(window.location.hash.indexOf("?") + 1)
      : "",
  );
  const isPayPalCancel = window.location.pathname.endsWith(
    "/checkout/paypal/cancel",
  );
  const isPayPalReturn =
    window.location.pathname.endsWith("/checkout/paypal/return") ||
    isPayPalCancel ||
    window.location.pathname.endsWith("/paypal-return") ||
    hashRoute === "paypal-return" ||
    urlParams.has("token") ||
    urlParams.has("PayerID") ||
    hashParams.has("token") ||
    hashParams.has("PayerID");

  useEffect(() => {
    if (!isAuthenticated && !isPayPalReturn) {
      setPostLoginDestination("checkout");
      navigate("login");
    }
  }, [isAuthenticated, isPayPalReturn, navigate]);

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!getAccessToken()) {
      setPostLoginDestination("checkout");
      navigate("login");
      return;
    }
    if (!selectedAddress) {
      setAddressSelectionError(t("Choose a delivery address to continue"));
      return;
    }
    setStep("payment");
  };

  const handlePaymentSuccess = () => {
    setPaymentError("");
    setStep("success");
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  useEffect(() => {
    if (!isPayPalCancel || cancelStarted.current) return;

    const pendingOrderId = sessionStorage.getItem("pendingPayPalOrderId");
    if (!pendingOrderId || !getAccessToken()) {
      setCancelStatus("unavailable");
      return;
    }

    cancelStarted.current = true;
    setCancelStatus("processing");
    cancelPayPalOrder(pendingOrderId)
      .then(() => {
        if (
          sessionStorage.getItem("pendingPayPalOrderId") === pendingOrderId
        ) {
          sessionStorage.removeItem("pendingPayPalOrderId");
        }
        setCancelStatus("cancelled");
      })
      .catch((error: unknown) => {
        console.error("PayPal cancellation failed:", error);
        cancelStarted.current = false;
        setCancelStatus("error");
      });
  }, [cancelRetryCount, isPayPalCancel]);

  useEffect(() => {
    const pendingOrderId = sessionStorage.getItem("pendingPayPalOrderId");
    if (
      !isPayPalReturn ||
      isPayPalCancel ||
      !pendingOrderId ||
      captureStarted.current
    )
      return;

    captureStarted.current = true;
    setPaymentError("");
    capturePayPalOrder(pendingOrderId)
      .then((result) => {
        if (result.paymentStatus !== "PAID") {
          setPaymentError("PayPal has not confirmed payment for this order.");
          return;
        }

        setCompletedOrderId(pendingOrderId);
        sessionStorage.removeItem("pendingPayPalOrderId");
        window.history.replaceState(
          { page: "checkout", params: {} },
          "",
          `${window.location.origin}/#checkout`,
        );
        handlePaymentSuccess();
      })
      .catch((error: unknown) => {
        console.error("PayPal capture failed:", error);
        setPaymentError(
          "We could not confirm your PayPal payment. Please try again or contact support.",
        );
      });
  }, [isPayPalCancel, isPayPalReturn]);

  const handleStartPayPal = async () => {
    if (!getAccessToken()) {
      setPostLoginDestination("checkout");
      navigate("login");
      return;
    }
    if (!selectedAddress) {
      setAddressSelectionError(t("Choose a delivery address to continue"));
      setStep("info");
      return;
    }

    const profile = getAuthenticatedProfile();
    if (!profile.email) {
      setPaymentError(
        "Your account email is unavailable. Please sign in again.",
      );
      return;
    }

    const orderItems = items.map((item) => ({
      productId: Number(item.id),
      quantity: item.quantity,
    }));
    if (
      orderItems.some(
        (item) => !Number.isInteger(item.productId) || item.productId <= 0,
      )
    ) {
      setPaymentError(
        "One or more products have an invalid ID. Please refresh your cart.",
      );
      return;
    }

    setIsStartingPayment(true);
    setPaymentError("");
    try {
      const order = await createOrder({
        customerName: profile.name || selectedAddress.name,
        customerEmail: profile.email,
        customerPhone: selectedAddress.contactNumber,
        shippingAddress: selectedAddress.address,
        shippingCity: selectedAddress.city,
        shippingState: selectedAddress.state,
        shippingZip: selectedAddress.zip,
        shippingCountry: selectedAddress.country,
        paymentMethod: "PAYPAL",
        items: orderItems,
      });
      if (order.id === undefined || order.id === null) {
        throw new Error("The order service did not return an order ID.");
      }

      const paypal = await startPayPalApproval(order.id);
      if (!paypal.approvalUrl) {
        throw new Error("The PayPal service did not return an approval URL.");
      }

      sessionStorage.setItem("pendingPayPalOrderId", String(order.id));
      window.location.assign(paypal.approvalUrl);
    } catch (error: unknown) {
      console.error("Could not start PayPal checkout:", error);
      const details =
        error instanceof Error ? error.message : "Please try again.";
      setPaymentError(`Could not start PayPal checkout: ${details}`);
      setIsStartingPayment(false);
    }
  };

  if (!isAuthenticated && !isPayPalReturn) return null;

  if (items.length === 0 && step !== "success" && !isPayPalReturn) {
    navigate("cart");
    return null;
  }

  if (isPayPalCancel) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto max-w-xl space-y-6 px-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <CheckCircle className="h-9 w-9 text-muted-foreground" />
          </div>
          <div>
            <h1 className="mb-3 text-3xl">PayPal payment cancelled</h1>
            <p className="text-muted-foreground">
              PayPal did not complete this payment. You can return to checkout
              and try again.
            </p>
          </div>
          <p
            className={
              cancelStatus === "error" ? "text-sm text-destructive" : "text-sm text-muted-foreground"
            }
            role={cancelStatus === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {cancelStatus === "processing" &&
              "Updating your order status..."}
            {cancelStatus === "cancelled" &&
              "Your order cancellation has been recorded."}
            {cancelStatus === "error" &&
              "We could not update the order status. Please retry."}
            {cancelStatus === "unavailable" &&
              "We could not find the pending order or your sign-in session. The order status was not updated."}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            {isAuthenticated ? (
              <Button
                variant="outline"
                onClick={() =>
                  window.location.assign(`${window.location.origin}/#checkout`)
                }
              >
                Return to Checkout
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() =>
                  window.location.assign(`${window.location.origin}/#login`)
                }
              >
                Sign In
              </Button>
            )}
            <Button
              onClick={() =>
                window.location.assign(`${window.location.origin}/#home`)
              }
            >
              Continue Shopping
            </Button>
          </div>
          {cancelStatus === "error" && (
            <Button
              variant="outline"
              onClick={() => {
                cancelStarted.current = false;
                setCancelRetryCount((count) => count + 1);
              }}
            >
              Retry cancellation
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <motion.div
        className="relative min-h-screen overflow-hidden py-20"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      >
        {!prefersReducedMotion &&
          createPortal(
            <div
              className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
              aria-hidden="true"
            >
              {confettiPieces.map((piece, index) => (
                <motion.span
                  key={index}
                  className="absolute top-0 rounded-[1px]"
                  style={{
                    left: `${piece.left}%`,
                    width: piece.width,
                    height: piece.height,
                    backgroundColor: piece.color,
                  }}
                  initial={{ opacity: 0, y: -24, x: 0, rotate: 0, scale: 0.6 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: window.innerHeight + 100,
                    x: piece.drift,
                    rotate: piece.rotate,
                    scale: [0.6, 1, 0.85],
                  }}
                  transition={{
                    duration: piece.duration,
                    delay: piece.delay,
                    ease: "easeIn",
                  }}
                />
              ))}
            </div>,
            document.body,
          )}
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              className="mb-6 flex justify-center"
              initial={{
                scale: prefersReducedMotion ? 1 : 0.65,
                opacity: 0,
                rotate: prefersReducedMotion ? 0 : -12,
              }}
              animate={{ scale: [0.85, 1.08, 1], opacity: 1, rotate: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.65,
                delay: prefersReducedMotion ? 0 : 0.12,
                ease: "backOut",
              }}
            >
              <div className="rounded-full bg-green-100 p-6 shadow-[0_0_0_10px_rgba(22,163,74,0.08)]">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </motion.div>
            <motion.h2
              className="mb-4 text-3xl"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : 0.25,
              }}
            >
              {t("Order Placed Successfully!")}
            </motion.h2>
            <motion.p
              className="mb-8 text-muted-foreground"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : 0.36,
              }}
            >
              {t(
                "Thank you for your purchase. Your order confirmation has been sent to your email.",
              )}
            </motion.p>
            <motion.div
              className="mb-8 rounded-lg bg-muted/30 p-6"
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.35,
                delay: prefersReducedMotion ? 0 : 0.45,
              }}
            >
              <p className="text-sm text-muted-foreground mb-2">
                {t("Order Number")}
              </p>
              <p className="text-2xl">#{completedOrderId || "-"}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.35,
                delay: prefersReducedMotion ? 0 : 0.55,
              }}
            >
              <Button
                onClick={() => navigate("home")}
                size="lg"
                className="w-full"
              >
                {t("Continue Shopping")}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (isPayPalReturn) {
    const pendingOrderId = sessionStorage.getItem("pendingPayPalOrderId");
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl mb-4">
              {paymentError
                ? "Payment Not Completed"
                : pendingOrderId
                  ? "Confirming your payment"
                  : "Payment Status Unavailable"}
            </h1>
            {pendingOrderId && !paymentError && (
              <div
                className="mb-8 flex flex-col items-center gap-3 text-muted-foreground"
                role="status"
                aria-live="polite"
              >
                <LoaderCircle className="h-9 w-9 animate-spin text-primary" />
                <p>Please wait while we confirm your PayPal payment.</p>
              </div>
            )}
            {(paymentError || !pendingOrderId) && (
              <p
                className="mb-8 text-muted-foreground"
                role={paymentError ? "alert" : undefined}
              >
                {paymentError ||
                  "No pending PayPal order was found for this return."}
              </p>
            )}
            {paymentError && pendingOrderId ? (
              <Button onClick={() => window.location.reload()} size="lg">
                Retry confirmation
              </Button>
            ) : !pendingOrderId ? (
              <Button
                onClick={() =>
                  window.location.assign(`${window.location.origin}/#home`)
                }
                size="lg"
              >
                Continue Shopping
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl mb-8">{t("Checkout")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="flex items-center mb-8">
              <div
                className={`flex-1 flex items-center ${step === "info" ? "text-primary" : "text-muted-foreground"}`}
              >
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step === "info" ? "border-primary bg-primary text-white" : "border-muted-foreground"}`}
                >
                  1
                </div>
                <div className="ml-2">{t("Shipping Info")}</div>
              </div>
              <div className="flex-1 h-0.5 bg-border mx-4" />
              <div
                className={`flex-1 flex items-center ${step === "payment" ? "text-primary" : "text-muted-foreground"}`}
              >
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step === "payment" ? "border-primary bg-primary text-white" : "border-muted-foreground"}`}
                >
                  2
                </div>
                <div className="ml-2">{t("Payment")}</div>
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {step === "info" && (
                <motion.div
                  key="shipping-info"
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -8 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
                  className="space-y-6"
                >
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-xl mb-4">{t("Shipping Address")}</h3>
                    <AddressBook
                      mode="select"
                      selectedAddress={selectedAddress ?? undefined}
                      onSelect={(address) => {
                        setSelectedAddress(address);
                        setAddressSelectionError("");
                      }}
                    />
                    {addressSelectionError && (
                      <p className="mt-3 text-sm text-destructive" role="alert">
                        {addressSelectionError}
                      </p>
                    )}
                  </div>

                  <form onSubmit={handleSubmitInfo} className="space-y-6">
                    <ProfileInformation title="Contact Information" />
                    <Button type="submit" size="lg" className="w-full">
                      {t("Continue to Payment")}
                    </Button>
                  </form>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: prefersReducedMotion ? 0 : 8 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
                  className="space-y-6"
                >
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-xl mb-4">{t("Payment Method")}</h3>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <div className="space-y-3">
                        {/* <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/30">
                        <RadioGroupItem value="card" id="card" />
                        <Label
                          htmlFor="card"
                          className="flex items-center gap-2 cursor-pointer flex-1"
                        >
                          <CreditCard className="h-5 w-5" />
                          Credit / Debit Card
                        </Label>
                      </div> */}
                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/30">
                          <RadioGroupItem value="paypal" id="paypal-method" />
                          <Label
                            htmlFor="paypal-method"
                            className="flex items-center gap-2 cursor-pointer flex-1"
                          >
                            <Wallet className="h-5 w-5" />
                            Paypal
                          </Label>
                        </div>
                        {/* <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/30">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label
                          htmlFor="cod"
                          className="flex items-center gap-2 cursor-pointer flex-1"
                        >
                          <Banknote className="h-5 w-5" />
                          Cash on Delivery
                        </Label>
                      </div> */}
                      </div>
                    </RadioGroup>

                    {paymentMethod === "paypal" && (
                      <div className="mt-6 border-t border-border pt-6">
                        <Button
                          type="button"
                          size="lg"
                          className="w-full"
                          onClick={handleStartPayPal}
                          disabled={isStartingPayment}
                        >
                          <Wallet className="mr-2 h-5 w-5" />
                          {isStartingPayment
                            ? "Connecting to PayPal..."
                            : "Continue to PayPal"}
                        </Button>
                        {paymentError && (
                          <p
                            className="mt-3 text-sm text-destructive"
                            role="alert"
                          >
                            {paymentError}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep("info")}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <div className="flex-1" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h3 className="text-xl mb-4">{t("Order Summary")}</h3>

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.2,
                      delay: prefersReducedMotion ? 0 : 0.04,
                    }}
                    className="flex gap-3 text-sm"
                  >
                    <span className="text-muted-foreground">
                      {item.quantity}x
                    </span>
                    <span className="flex-1 line-clamp-1">{item.name}</span>
                    <span>
                      €{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>€{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `€${shipping}`}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-2xl text-primary">
                    €{finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
