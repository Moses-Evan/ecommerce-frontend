import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { initializeAuthFromRedirect } from "./api/auth";
import "./styles/index.css";

const currentUrl = new URL(window.location.href);
const isAndroidBrowser = /Android/i.test(window.navigator.userAgent);
const isNativePayPalReturn =
  currentUrl.searchParams.get("nativeApp") === "true";
const isPayPalReturn =
  currentUrl.pathname.endsWith("/checkout/paypal/return") ||
  currentUrl.pathname.endsWith("/checkout/paypal/cancel");

if (isAndroidBrowser && isNativePayPalReturn && isPayPalReturn) {
  const callbackPath = currentUrl.pathname.endsWith("/cancel")
    ? "cancel"
    : "return";
  window.location.replace(
    `intent://checkout/paypal/${callbackPath}${currentUrl.search}#Intent;scheme=niorra;package=com.niorra.app;end`,
  );
} else {
  initializeAuthFromRedirect();
}

createRoot(document.getElementById("root")!).render(<App />);
