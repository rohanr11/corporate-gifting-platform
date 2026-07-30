// Shared TypeScript types used by BOTH frontend and backend.
// Keeping these in one place means the shape of a "Product" (for example)
// can never silently drift between the API and the UI.

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number; // in INR, paise-free (whole rupees)
  imageUrl: string;
  categoryId: number;
  category?: Category;
  tags: string; // comma-separated, e.g. "eco-friendly,premium,diwali"
  minOrderQty: number;
  inStock: boolean;
  rating: number; // 0-5
}

export interface CartItem {
  id: number;
  sessionId: string;
  productId: number;
  quantity: number;
  product?: Product;
}

export interface WishlistItem {
  id: number;
  sessionId: string;
  productId: number;
  product?: Product;
}

export interface AISearchRecommendation {
  productId: number;
  reason: string;
}

export interface AISearchResponse {
  summary: string;
  recommendations: AISearchRecommendation[];
}

export interface BulkQuoteRequest {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  employeeCount: number;
  budgetPerGift: number;
  occasion: string;
  message: string;
}
