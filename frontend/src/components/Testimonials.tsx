const testimonials = [
  {
    quote: "We onboarded 300 engineers in one quarter and every kit arrived on time, perfectly packed.",
    name: "Priya Nair",
    role: "Head of People, Northwind Tech",
  },
  {
    quote: "The AI Gift Finder saved us hours — we typed our budget and it just worked.",
    name: "Arjun Mehta",
    role: "Procurement Lead, Vantage Capital",
  },
  {
    quote: "Our leadership gifts finally look as considered as the people receiving them.",
    name: "Sana Kapoor",
    role: "Executive Assistant, Meridian Health",
  },
];

export function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16" aria-labelledby="testimonials-heading">
      <h2 id="testimonials-heading" className="text-2xl md:text-3xl font-display font-semibold mb-8">
        What teams say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <figure key={t.name} className="bg-white rounded-2xl p-6 shadow-tag border border-forest/5">
            <blockquote className="text-ink/80 leading-relaxed mb-4">"{t.quote}"</blockquote>
            <figcaption className="text-sm">
              <span className="font-semibold">{t.name}</span>
              <span className="text-ink/50"> — {t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
