import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-forest text-porcelain overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_20%_20%,_theme(colors.brass.DEFAULT)_0,_transparent_45%)]" />
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 text-brass text-sm font-medium mb-5 border border-brass/30 rounded-full px-3 py-1">
            <Sparkles size={14} /> AI-assisted gifting, for teams that mean it
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-semibold leading-[1.05] mb-6">
            Gifts your people will actually keep.
          </h1>
          <p className="text-lg text-porcelain/75 mb-9 leading-relaxed">
            Describe the occasion, the budget, and the headcount — our AI Gift Finder reads
            your brief and hands back the exact products from our catalogue that fit, no
            guesswork required.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 bg-brass text-forest-dark font-semibold px-6 py-3 rounded-full hover:bg-brass-light transition-colors"
            >
              Find gifts with AI <ArrowRight size={18} />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border border-porcelain/30 px-6 py-3 rounded-full hover:border-brass hover:text-brass transition-colors"
            >
              Browse catalogue
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="ribbon-divider" />
    </section>
  );
}
