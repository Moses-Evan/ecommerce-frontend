import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { App as CapacitorApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import {
  getPendingPayPalOrderId,
  initializeAuthFromRedirect,
} from "../../api/auth";

type Page =
  | "home"
  | "category"
  | "search"
  | "product"
  | "cart"
  | "checkout"
  | "paypal-return"
  | "login"
  | "signup"
  | "account"
  | "about"
  | "contact";

interface NavigationState {
  page: Page;
  params: Record<string, any>;
}

interface NavigationContextType extends NavigationState {
  navigate: (page: Page, params?: Record<string, any>) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

const defaultNavigationState: NavigationState = {
  page: "home",
  params: {},
};

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>(
    defaultNavigationState.page,
  );
  const [params, setParams] = useState<Record<string, any>>(
    defaultNavigationState.params,
  );

  useEffect(() => {
    const initialState = window.history.state as NavigationState | null;
    const isPayPalReturn =
      window.location.pathname.endsWith("/checkout/paypal/return") ||
      window.location.pathname.endsWith("/checkout/paypal/cancel") ||
      window.location.pathname.endsWith("/paypal-return");

    if (isPayPalReturn) {
      const paypalReturnState: NavigationState = {
        page: "paypal-return",
        params: {},
      };
      setCurrentPage(paypalReturnState.page);
      setParams(paypalReturnState.params);
      window.history.replaceState(paypalReturnState, "", window.location.href);
    } else if (initialState?.page) {
      setCurrentPage(initialState.page);
      setParams(initialState.params || {});
    } else {
      const hash = window.location.hash.slice(1);
      const requestedPage = hash.split("?")[0] as Page;
      const hashParams = new URLSearchParams(hash.split("?")[1] || "");
      const urlParams = new URLSearchParams(window.location.search);
      const hasPayPalReturn =
        window.location.pathname.endsWith("/paypal-return") ||
        urlParams.has("token") ||
        urlParams.has("PayerID") ||
        hashParams.has("token") ||
        hashParams.has("PayerID");
      const pages: Page[] = [
        "home",
        "category",
        "search",
        "product",
        "cart",
        "checkout",
        "paypal-return",
        "login",
        "signup",
        "account",
        "about",
        "contact",
      ];
      const page =
        requestedPage === "paypal-return" ||
        (hasPayPalReturn && getPendingPayPalOrderId())
          ? "paypal-return"
          : pages.includes(requestedPage)
            ? requestedPage
            : defaultNavigationState.page;
      const initialRoute: NavigationState = { page, params: {} };
      setCurrentPage(page);
      setParams(initialRoute.params);
      window.history.replaceState(initialRoute, "", window.location.href);
    }

    const handlePopState = (event: PopStateEvent) => {
      const state =
        (event.state as NavigationState | null) ?? defaultNavigationState;
      setCurrentPage(state.page);
      setParams(state.params || {});
    };

    const isNativeApp = Boolean(
      (window as any)?.Capacitor?.isNativePlatform?.(),
    );
    const handleAppUrl = (callbackUrl: string) => {
      const callback = new URL(callbackUrl);
      const callbackHash = callback.hash.slice(1);
      const callbackParams = [
        callback.searchParams,
        new URLSearchParams(
          callbackHash.includes("?")
            ? callbackHash.slice(callbackHash.indexOf("?") + 1)
            : callbackHash,
        ),
      ];
      const hasPayPalId = callbackParams.some(
        (searchParams) => searchParams.has("PayerID"),
      );
      const paypalLocation = `${callback.hostname}${callback.pathname}`.toLowerCase();
      const isPayPalPath = paypalLocation.includes("paypal");
      const isCancelCallback =
        isPayPalPath && paypalLocation.includes("cancel");
      const callbackToken = callbackParams
        .map((searchParams) => searchParams.get("token"))
        .find(Boolean);
      const isPayPalToken =
        Boolean(getPendingPayPalOrderId()) &&
        Boolean(callbackToken) &&
        callbackToken?.split(".").length !== 3;

      if (isPayPalPath || hasPayPalId || isPayPalToken) {
        const paypalState = isCancelCallback ? "cancel" : "return";
        const nextUrl = `/#checkout?paypal=${paypalState}`;
        window.history.replaceState(
          { page: "checkout", params: {} },
          "",
          nextUrl,
        );
        setCurrentPage("checkout");
        setParams({});
        void Browser.close().catch((error: unknown) => {
          console.error("Unable to close the PayPal browser:", error);
        });
        return;
      }

      const destination = initializeAuthFromRedirect(callbackUrl);
      if (!destination) return;

      setCurrentPage(destination);
      setParams({});
      void Browser.close().catch((error: unknown) => {
        console.error("Unable to close the sign-in browser:", error);
      });
    };

    let isMounted = true;
    const nativeBackHook = isNativeApp
      ? CapacitorApp.addListener("backButton", ({ canGoBack }) => {
          if (canGoBack && window.history.length > 1) {
            window.history.back();
          }
        })
      : null;
    const appUrlOpenHook = isNativeApp
      ? CapacitorApp.addListener("appUrlOpen", ({ url }) => {
          handleAppUrl(url);
        })
      : null;

    if (isNativeApp) {
      void CapacitorApp.getLaunchUrl()
        .then((launchUrl) => {
          if (!isMounted || !launchUrl?.url) return;
          handleAppUrl(launchUrl.url);
        })
        .catch((error: unknown) => {
          console.error("Unable to read the app launch URL:", error);
        });
    }

    window.addEventListener("popstate", handlePopState);
    return () => {
      isMounted = false;
      window.removeEventListener("popstate", handlePopState);
      void nativeBackHook
        ?.then((listener) => listener.remove())
        .catch((error: unknown) => {
          console.error("Unable to remove the native back listener:", error);
        });
      void appUrlOpenHook
        ?.then((listener) => listener.remove())
        .catch((error: unknown) => {
          console.error("Unable to remove the app URL listener:", error);
        });
    };
  }, []);

  const navigate = useCallback(
    (page: Page, newParams?: Record<string, any>) => {
      const nextState: NavigationState = { page, params: newParams || {} };
      setCurrentPage(page);
      setParams(nextState.params);
      window.history.pushState(nextState, "", `#${page}`);
      window.scrollTo(0, 0);
    },
    [],
  );

  return (
    <NavigationContext.Provider value={{ currentPage, params, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}
