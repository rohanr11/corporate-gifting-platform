import { useState } from "react";
import { Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-forest text-porcelain py-16" aria-labelledby="newsletter-heading">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Mail className="mx-auto mb-4 text-brass" size={28} aria-hidden="true" />
        <h2 id="newsletter-heading" className="text-2xl font-display font-semibold mb-2">
          Get gifting ideas in your inbox
        </h2>
        <p className="text-porcelain/70 mb-6">
          Seasonal picks and onboarding-kit ideas, once a month — no spam.
        </p>
        {submitted ? (
          <p className="text-brass font-medium">Subscribed! Watch your inbox.</p>
        ) : (
          <form
            className="flex flex-col sm:flex-row gap-3 justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="px-4 py-3 rounded-full text-ink w-full sm:w-80 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-brass text-forest-dark font-semibold px-6 py-3 rounded-full hover:bg-brass-light transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
