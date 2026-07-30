import type { Product } from "@shared/types";
import { ProductCard } from "./ProductCard";

export function RecommendationSection({
  title,
  icon,
  products,
}: {
  title: string;
  icon: string;
  products: (Product & { reason?: string })[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="mt-12" aria-label={title}>
      <h2 className="text-xl font-display font-semibold mb-5">
        <span aria-hidden="true">{icon}</span> {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} reason={p.reason} />
        ))}
      </div>
    </section>
  );
}
