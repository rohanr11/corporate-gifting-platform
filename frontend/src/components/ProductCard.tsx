import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@shared/types";
import { useWishlist } from "../context/WishlistContext";

export function ProductCard({ product, reason }: { product: Product; reason?: string }) {
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="gift-tag bg-white rounded-2xl overflow-hidden shadow-tag border border-forest/5 flex flex-col"
    >
      <Link to={`/products/${product.slug}`} className="block">
        <div className="aspect-square overflow-hidden bg-porcelain">
          <img
            src={product.imageUrl}
            alt={`${product.name} — ${product.shortDescription}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/products/${product.slug}`}>
            <h3 className="font-display text-base font-semibold leading-snug hover:text-forest-light">
              {product.name}
            </h3>
          </Link>
          <button
            onClick={() => toggle(product.id)}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wishlisted}
            className="shrink-0 text-forest/40 hover:text-burgundy transition-colors"
          >
            <Heart size={18} fill={wishlisted ? "currentColor" : "none"} className={wishlisted ? "text-burgundy" : ""} />
          </button>
        </div>

        <p className="text-sm text-ink/60 mt-1 line-clamp-2">{product.shortDescription}</p>

        {reason && (
          <p className="text-xs text-forest-light mt-2 italic border-l-2 border-brass pl-2">
            {reason}
          </p>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="font-mono font-semibold text-forest">₹{product.price.toLocaleString("en-IN")}</span>
          <span className="flex items-center gap-1 text-xs text-ink/50">
            <Star size={13} className="text-brass" fill="currentColor" />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <p className="text-xs text-ink/40 mt-1">Min. order: {product.minOrderQty} units</p>
      </div>
    </motion.div>
  );
}
