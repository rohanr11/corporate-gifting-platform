import { Link } from "react-router-dom";
import { Gift, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-forest-dark text-porcelain/80 mt-24">
      <div className="ribbon-divider" />
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Gift size={20} className="text-brass" aria-hidden="true" />
            <span className="font-display text-lg font-semibold text-porcelain">Gilded &amp; Grove</span>
          </div>
          <p className="text-sm leading-relaxed">
            Considered corporate gifting — onboarding kits, executive gifts, and festive
            hampers, matched to your team by our AI Gift Finder.
          </p>
        </div>

        <nav aria-label="Shop">
          <h2 className="text-porcelain font-semibold mb-3 text-sm uppercase tracking-wide">Shop</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="hover:text-brass">All Products</Link></li>
            <li><Link to="/search" className="hover:text-brass">AI Gift Finder</Link></li>
            <li><Link to="/bulk-quote" className="hover:text-brass">Bulk Quote</Link></li>
            <li><Link to="/wishlist" className="hover:text-brass">Wishlist</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="text-porcelain font-semibold mb-3 text-sm uppercase tracking-wide">Company</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-brass">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-brass">Contact</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-porcelain font-semibold mb-3 text-sm uppercase tracking-wide">Get in touch</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail size={15} /> hello@gildedandgrove.com</li>
            <li className="flex items-center gap-2"><Phone size={15} /> +91 9148494633</li>
            <li className="flex items-center gap-2"><MapPin size={15} /> Bengaluru, India</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs py-4 border-t border-porcelain/10">
        © {new Date().getFullYear()} Gilded &amp; Grove. All rights reserved.
      </div>
    </footer>
  );
}
