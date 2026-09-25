import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const IMAGES = [
  "/meeting_gifting.jpg",
  "/celebration_gifting.jpg",
  "/new_employee_kit.jpg"
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] bg-forest text-porcelain overflow-hidden flex items-center">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={IMAGES[currentIndex]}
            alt="Corporate gifting"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 0.45, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 text-brass text-sm font-medium mb-5 border border-brass/30 rounded-full px-4 py-1.5 backdrop-blur-sm bg-forest/30">
            <Sparkles size={14} /> AI-assisted gifting, for teams that mean it
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-semibold leading-[1.05] mb-6 drop-shadow-lg">
            Gifts your people <br /> will actually keep.
          </h1>
          <p className="text-lg md:text-xl text-porcelain/90 mb-9 leading-relaxed max-w-lg drop-shadow-md">
            Find the perfect gifts effortlessly. Describe the occasion and budget, and let our AI curate the best choices for your team.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 bg-brass text-forest font-semibold px-8 py-4 rounded-full hover:bg-brass-light transition-colors shadow-lg hover:shadow-brass/20"
            >
              Find gifts with AI <ArrowRight size={18} />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border-2 border-porcelain/30 bg-forest/40 backdrop-blur-md px-8 py-4 rounded-full hover:border-brass hover:text-brass transition-colors"
            >
              Browse catalogue
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="ribbon-divider absolute bottom-0 left-0 right-0 z-20" />
    </section>
  );
}
