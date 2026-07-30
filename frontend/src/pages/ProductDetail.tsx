import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingBag, Star, ChevronRight } from "lucide-react";
import type { Product } from "@shared/types";
import { api } from "../lib/api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { RecommendationSection } from "../components/RecommendationSection";

export function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [recs, setRecs] = useState<{
    similar: Product[];
    frequentlyBoughtTogether: Product[];
    aiPicks: { productId: number; reason: string; product: Product }[];
  } | null>(null);

  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();

  useEffect(() => {
    if (!slug) return;
    api
      .getProduct(slug)
      .then((p) => {
        setProduct(p);
        setQuantity(p.minOrderQty);
        api.getRecommendations(p.id).then(setRecs).catch(() => setRecs(null));
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-display font-semibold mb-2">Product not found</h1>
        <p className="text-ink/60 mb-6">This gift may have been renamed or removed.</p>
        <Link to="/products" className="text-forest font-medium hover:text-brass">
          ← Back to catalogue
        </Link>
      </main>
    );
  }

  if (!product) {
    return <main className="max-w-7xl mx-auto px-6 py-24 text-ink/50">Loading…</main>;
  }

  const wishlisted = isWishlisted(product.id);

  // Breadcrumb + Product JSON-LD, built from real product data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: 24,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Products", item: "https://www.gildedandgrove.com/products" },
      { "@type": "ListItem", position: 2, name: product.category?.name, item: `https://www.gildedandgrove.com/products?category=${product.category?.slug}` },
      { "@type": "ListItem", position: 3, name: product.name },
    ],
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>

      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-ink/50 mb-6">
        <Link to="/products" className="hover:text-forest">Products</Link>
        <ChevronRight size={14} />
        <Link to={`/products?category=${product.category?.slug}`} className="hover:text-forest">
          {product.category?.name}
        </Link>
        <ChevronRight size={14} />
        <span className="text-ink/80">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden bg-porcelain aspect-square">
          <img
            src={product.imageUrl}
            alt={`${product.name} — ${product.shortDescription}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-display font-semibold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 text-sm text-ink/50 mb-4">
            <Star size={15} className="text-brass" fill="currentColor" />
            {product.rating.toFixed(1)} rating · Min. order {product.minOrderQty} units
          </div>
          <p className="text-ink/70 leading-relaxed mb-6">{product.description}</p>
          <p className="font-mono text-2xl font-semibold text-forest mb-6">
            ₹{product.price.toLocaleString("en-IN")} <span className="text-sm text-ink/40 font-body">/ unit</span>
          </p>

          <div className="flex items-center gap-3 mb-6">
            <label htmlFor="quantity" className="text-sm text-ink/60">Quantity</label>
            <input
              id="quantity"
              type="number"
              min={product.minOrderQty}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24 border border-forest/20 rounded-lg px-3 py-2 focus:outline-none focus:border-brass"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={async () => {
                await addItem(product.id, quantity);
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
              }}
              className="inline-flex items-center gap-2 bg-forest text-porcelain font-semibold px-6 py-3 rounded-full hover:bg-forest-light transition-colors"
            >
              <ShoppingBag size={18} /> {added ? "Added!" : "Add to cart"}
            </button>
            <button
              onClick={() => toggle(product.id)}
              aria-pressed={wishlisted}
              className="inline-flex items-center gap-2 border border-forest/20 px-6 py-3 rounded-full hover:border-burgundy hover:text-burgundy transition-colors"
            >
              <Heart size={18} fill={wishlisted ? "currentColor" : "none"} className={wishlisted ? "text-burgundy" : ""} />
              {wishlisted ? "Wishlisted" : "Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {recs && (
        <>
          <RecommendationSection title="Similar products" icon="✨" products={recs.similar} />
          <RecommendationSection
            title="AI recommendations"
            icon="✨"
            products={recs.aiPicks.map((r) => ({ ...r.product, reason: r.reason }))}
          />
          <RecommendationSection
            title="Frequently bought together"
            icon="✨"
            products={recs.frequentlyBoughtTogether}
          />
        </>
      )}
    </main>
  );
}
