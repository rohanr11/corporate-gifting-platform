import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Category } from "@shared/types";
import { api } from "../lib/api";

export function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16" aria-labelledby="categories-heading">
      <h2 id="categories-heading" className="text-2xl md:text-3xl font-display font-semibold mb-8">
        Shop by occasion
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.slug}`}
            className="group relative rounded-xl overflow-hidden aspect-square"
          >
            <img
              src={cat.imageUrl}
              alt={cat.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-forest/50 group-hover:bg-forest/60 transition-colors" />
            <span className="absolute bottom-3 left-3 right-3 text-porcelain font-display font-semibold text-sm">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
