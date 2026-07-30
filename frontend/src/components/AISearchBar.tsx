import { useState, FormEvent } from "react";
import { Sparkles, Send, Loader2 } from "lucide-react";

const examplePrompts = [
  "Need gifts under ₹1500 for 200 employees",
  "Luxury gifts for CEOs",
  "Eco-friendly welcome kits",
  "Diwali gifts",
  "Employee onboarding kits",
];

export function AISearchBar({
  onSearch,
  loading,
}: {
  onSearch: (query: string) => void;
  loading: boolean;
}) {
  const [query, setQuery] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <div>
      <form onSubmit={submit} className="relative">
        <label htmlFor="ai-search-input" className="sr-only">
          Describe your gifting needs
        </label>
        <Sparkles
          className="absolute left-5 top-1/2 -translate-y-1/2 text-brass"
          size={20}
          aria-hidden="true"
        />
        <input
          id="ai-search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your gifting needs..."
          className="w-full pl-14 pr-32 py-5 rounded-full border-2 border-forest/10 bg-white text-ink placeholder:text-ink/40 focus:border-brass focus:outline-none text-base shadow-tag"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-forest text-porcelain font-medium px-5 py-3 rounded-full hover:bg-forest-light transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {loading ? "Thinking..." : "Search"}
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mt-4">
        {examplePrompts.map((p) => (
          <button
            key={p}
            onClick={() => {
              setQuery(p);
              onSearch(p);
            }}
            className="text-xs bg-forest/5 hover:bg-brass/20 text-forest px-3 py-1.5 rounded-full transition-colors"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
