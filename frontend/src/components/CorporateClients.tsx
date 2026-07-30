const clients = ["Northwind Tech", "Vantage Capital", "Orbit Logistics", "Meridian Health", "Solace Retail", "Cobalt Systems"];

export function CorporateClients() {
  return (
    <section className="bg-forest/5 py-14" aria-labelledby="clients-heading">
      <div className="max-w-7xl mx-auto px-6">
        <h2 id="clients-heading" className="text-center text-sm uppercase tracking-widest text-ink/50 mb-8">
          Trusted by teams at
        </h2>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
          {clients.map((c) => (
            <span key={c} className="font-display text-lg text-ink/40">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
