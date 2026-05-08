import { createContext, useContext, useState, ReactNode } from "react";

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

interface NavigationContextType {
  currentPage: Page;
  navigate: (page: Page, params?: Record<string, any>) => void;
  params: Record<string, any>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [params, setParams] = useState<Record<string, any>>({});

  const navigate = (page: Page, newParams?: Record<string, any>) => {
    setCurrentPage(page);
    setParams(newParams || {});
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigate, params }}>
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
