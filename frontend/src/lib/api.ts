import type {
  Product,
  Category,
  CartItem,
  WishlistItem,
  AISearchResponse,
} from "@shared/types";

// All frontend <-> backend communication goes through this one file.
// Components never call fetch() directly — this keeps API shape changes
// isolated to a single place.
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  getProducts: (params?: { category?: string; search?: string }) => {
    const qs = new URLSearchParams(params as Record<string, string>).toString();
    return request<Product[]>(`/products${qs ? `?${qs}` : ""}`);
  },
  getProduct: (slug: string) => request<Product>(`/products/${slug}`),
  getCategories: () => request<Category[]>("/categories"),

  getCart: (sessionId: string) => request<CartItem[]>(`/cart?sessionId=${sessionId}`),
  addToCart: (sessionId: string, productId: number, quantity = 1) =>
    request<CartItem>("/cart", {
      method: "POST",
      body: JSON.stringify({ sessionId, productId, quantity }),
    }),
  updateCartItem: (id: number, quantity: number) =>
    request<CartItem>(`/cart/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    }),
  removeCartItem: (id: number) => request<void>(`/cart/${id}`, { method: "DELETE" }),

  getWishlist: (sessionId: string) =>
    request<WishlistItem[]>(`/wishlist?sessionId=${sessionId}`),
  addToWishlist: (sessionId: string, productId: number) =>
    request<WishlistItem>("/wishlist", {
      method: "POST",
      body: JSON.stringify({ sessionId, productId }),
    }),
  removeWishlistItem: (id: number) =>
    request<void>(`/wishlist/${id}`, { method: "DELETE" }),

  aiSearch: (query: string) =>
    request<AISearchResponse>("/ai-search", {
      method: "POST",
      body: JSON.stringify({ query }),
    }),

  getRecommendations: (productId: number) =>
    request<{
      similar: Product[];
      frequentlyBoughtTogether: Product[];
      aiPicks: { productId: number; reason: string; product: Product }[];
    }>(`/recommendations/${productId}`),
};
