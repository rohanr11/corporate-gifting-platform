import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { ProductCard } from "../components/ProductCard";

export function Wishlist() {
  const { items, loading } = useWishlist();

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-display font-semibold mb-2">Your Wishlist</h1>
      <p className="text-ink/60 mb-8">Gifts you've saved for later.</p>

      {loading ? (
        <p className="text-ink/50">Loading…</p>
      ) : items.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="mx-auto mb-4 text-forest/20" size={48} />
          <p className="text-ink/60 mb-4">Your wishlist is empty.</p>
          <Link to="/products" className="text-forest font-medium hover:text-brass">
            Browse the catalogue →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(
            (item) => item.product && <ProductCard key={item.id} product={item.product} />
          )}
        </div>
      )}
    </main>
  );
}
