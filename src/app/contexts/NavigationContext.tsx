import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Page =
  | "home"
  | "category"
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
        (hasPayPalReturn && sessionStorage.getItem("pendingPayPalOrderId"))
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

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
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
