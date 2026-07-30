import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { CartItem } from "@shared/types";
import { api } from "../lib/api";
import { getSessionId } from "../lib/session";

interface CartContextValue {
  items: CartItem[];
  loading: boolean;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  updateItem: (id: number, quantity: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  totalCount: number;
  totalPrice: number;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const sessionId = getSessionId();
    const data = await api.getCart(sessionId);
    setItems(data);
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  const addItem = async (productId: number, quantity = 1) => {
    const sessionId = getSessionId();
    await api.addToCart(sessionId, productId, quantity);
    await refresh();
  };

  const updateItem = async (id: number, quantity: number) => {
    if (quantity <= 0) return removeItem(id);
    await api.updateCartItem(id, quantity);
    await refresh();
  };

  const removeItem = async (id: number) => {
    await api.removeCartItem(id);
    await refresh();
  };

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + (i.product?.price ?? 0) * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, loading, addItem, updateItem, removeItem, totalCount, totalPrice, refresh }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
