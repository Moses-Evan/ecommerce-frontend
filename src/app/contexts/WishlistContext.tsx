import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface WishlistContextType {
  productIds: string[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);
const WISHLIST_STORAGE_KEY = "niorra_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        if (Array.isArray(parsedWishlist)) {
          setProductIds(
            parsedWishlist
              .filter((id) => typeof id === "string" || typeof id === "number")
              .map(String),
          );
        }
      }
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(productIds));
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error);
    }
  }, [productIds, isHydrated]);

  const isInWishlist = (productId: string) =>
    productIds.includes(String(productId));

  const toggleWishlist = (productId: string) => {
    const normalizedProductId = String(productId);
    setProductIds((previousIds) =>
      previousIds.includes(normalizedProductId)
        ? previousIds.filter((id) => id !== normalizedProductId)
        : [...previousIds, normalizedProductId],
    );
  };

  const removeFromWishlist = (productId: string) => {
    const normalizedProductId = String(productId);
    setProductIds((previousIds) =>
      previousIds.filter((id) => id !== normalizedProductId),
    );
  };

  const clearWishlist = () => setProductIds([]);

  return (
    <WishlistContext.Provider
      value={{
        productIds,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
