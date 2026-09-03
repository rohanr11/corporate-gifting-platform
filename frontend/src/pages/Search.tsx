import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../lib/api";
import { AISearchBar } from "../components/AISearchBar";
import { ProductCard } from "../components/ProductCard";
import type { AISearchResponse } from "@shared/types";

export function Search() {
  const [result, setResult] = useState<AISearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastQuery, setLastQuery] = useState("");

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError("");
    setLastQuery(query);
    try {
      const res = await api.aiSearch(query);
      setResult(res);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-semibold mb-3">AI Gift Finder</h1>
        <p className="text-ink/60 max-w-xl mx-auto">
          Tell us the occasion, budget, and headcount — we'll match you to real products from
          our catalogue, not generic suggestions.
        </p>
      </div>

      <AISearchBar onSearch={handleSearch} loading={loading} />

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-burgundy text-center"
          >
            {error}
          </motion.p>
        )}

        {result && !error && (
          <motion.div
            key={lastQuery}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10"
          >
            <p className="text-lg text-ink/80 bg-forest/5 rounded-2xl p-5 mb-8 leading-relaxed">
              {result.summary}
            </p>

            {result.recommendations.length === 0 ? (
              <p className="text-ink/50 text-center">
                No matching products found. Try rephrasing your request.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {result.recommendations.map((r) => (
                  <ProductCard key={r.productId} product={(r as any).product} reason={r.reason} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
