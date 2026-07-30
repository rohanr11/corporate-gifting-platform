import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { WishlistItem } from "@shared/types";
import { api } from "../lib/api";
import { getSessionId } from "../lib/session";

interface WishlistContextValue {
  items: WishlistItem[];
  loading: boolean;
  isWishlisted: (productId: number) => boolean;
  toggle: (productId: number) => Promise<void>;
  refresh: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const sessionId = getSessionId();
    const data = await api.getWishlist(sessionId);
    setItems(data);
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  const isWishlisted = (productId: number) => items.some((i) => i.productId === productId);

  const toggle = async (productId: number) => {
    const sessionId = getSessionId();
    const existing = items.find((i) => i.productId === productId);
    if (existing) {
      await api.removeWishlistItem(existing.id);
    } else {
      await api.addToWishlist(sessionId, productId);
    }
    await refresh();
  };

  return (
    <WishlistContext.Provider value={{ items, loading, isWishlisted, toggle, refresh }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
