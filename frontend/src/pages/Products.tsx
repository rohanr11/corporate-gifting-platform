import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import type { Product, Category } from "@shared/types";
import { api } from "../lib/api";
import { ProductCard } from "../components/ProductCard";

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .getProducts(category ? { category } : undefined)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-display font-semibold mb-2">
        Corporate Gift Catalogue
      </h1>
      <p className="text-ink/60 mb-8">
        {products.length} gift{products.length === 1 ? "" : "s"} available
        {category ? ` in ${category.replace("-", " ")}` : ""}.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="flex items-center gap-1 text-sm text-ink/50 mr-2">
          <SlidersHorizontal size={14} /> Filter:
        </span>
        <button
          onClick={() => setSearchParams({})}
          className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
            !category ? "bg-forest text-porcelain" : "bg-forest/5 hover:bg-forest/10"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSearchParams({ category: c.slug })}
            className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
              category === c.slug ? "bg-forest text-porcelain" : "bg-forest/5 hover:bg-forest/10"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-ink/50">Loading products…</p>
      ) : products.length === 0 ? (
        <p className="text-ink/50">No products found. Try a different category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
