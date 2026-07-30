import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Cart() {
  const { items, loading, updateItem, removeItem, totalPrice } = useCart();

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-display font-semibold mb-2">Your Cart</h1>
      <p className="text-ink/60 mb-8">Review your gifts before requesting a bulk quote.</p>

      {loading ? (
        <p className="text-ink/50">Loading…</p>
      ) : items.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="mx-auto mb-4 text-forest/20" size={48} />
          <p className="text-ink/60 mb-4">Your cart is empty.</p>
          <Link to="/products" className="text-forest font-medium hover:text-brass">
            Browse the catalogue →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 flex flex-col gap-4">
            {items.map(
              (item) =>
                item.product && (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-white rounded-xl border border-forest/5 p-4 shadow-tag"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1">
                      <Link to={`/products/${item.product.slug}`} className="font-display font-semibold hover:text-forest-light">
                        {item.product.name}
                      </Link>
                      <p className="font-mono text-sm text-forest mt-1">
                        ₹{item.product.price.toLocaleString("en-IN")} / unit
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateItem(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 rounded-full border border-forest/20 flex items-center justify-center hover:border-brass"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateItem(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 rounded-full border border-forest/20 flex items-center justify-center hover:border-brass"
                        >
                          <Plus size={13} />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                          className="ml-4 text-ink/40 hover:text-burgundy"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>

          <aside className="bg-forest text-porcelain rounded-2xl p-6 h-fit">
            <h2 className="font-display text-lg font-semibold mb-4">Order summary</h2>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-porcelain/70">Estimated total</span>
              <span className="font-mono">₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>
            <p className="text-xs text-porcelain/50 mb-6">
              Final pricing depends on customization and shipping — no payment is collected here.
            </p>
            <Link
              to="/bulk-quote"
              className="block text-center bg-brass text-forest-dark font-semibold px-6 py-3 rounded-full hover:bg-brass-light transition-colors"
            >
              Request a bulk quote
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
