import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "@shared/types";
import { api } from "../lib/api";
import { ProductCard } from "./ProductCard";

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.getProducts().then((all) => setProducts(all.slice(0, 8))).catch(() => setProducts([]));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16" aria-labelledby="featured-heading">
      <div className="flex items-end justify-between mb-8">
        <h2 id="featured-heading" className="text-2xl md:text-3xl font-display font-semibold">
          Featured gifts
        </h2>
        <Link to="/products" className="text-sm font-medium text-forest hover:text-brass">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
