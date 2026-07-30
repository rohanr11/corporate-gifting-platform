import { Link, NavLink } from "react-router-dom";
import { Gift, Heart, ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const navLinks = [
  { to: "/products", label: "Products" },
  { to: "/search", label: "AI Gift Finder" },
  { to: "/bulk-quote", label: "Bulk Quote" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalCount } = useCart();
  const { items } = useWishlist();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-brass ${
      isActive ? "text-brass" : "text-porcelain/90"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-forest/95 backdrop-blur border-b border-brass/20">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-porcelain">
          <Gift size={22} className="text-brass" aria-hidden="true" />
          <span className="font-display text-xl font-semibold tracking-tight">
            Gilded &amp; Grove
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <Link to="/search" aria-label="AI Gift Search" className="text-porcelain hover:text-brass md:hidden">
            <Search size={20} />
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className="relative text-porcelain hover:text-brass">
            <Heart size={20} />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-brass text-forest text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          <Link to="/cart" aria-label="Shopping cart" className="relative text-porcelain hover:text-brass">
            <ShoppingBag size={20} />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brass text-forest text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>
          <button
            className="md:hidden text-porcelain"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-forest-dark px-6 pb-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
