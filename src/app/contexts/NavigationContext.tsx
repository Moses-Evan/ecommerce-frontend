import {
  createContext,
  useContext,
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

    if (initialState?.page) {
      setCurrentPage(initialState.page);
      setParams(initialState.params || {});
    } else {
      window.history.replaceState(defaultNavigationState, "", "#home");
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

  const navigate = (page: Page, newParams?: Record<string, any>) => {
    const nextState: NavigationState = {
      page,
      params: newParams || {},
    };

    setCurrentPage(page);
    setParams(nextState.params);
    window.history.pushState(nextState, "", `#${page}`);
    window.scrollTo(0, 0);
  };

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
