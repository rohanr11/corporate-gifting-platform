import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-display font-semibold mb-2">Contact us</h1>
      <p className="text-ink/60 mb-10">Questions about an order or partnership? We'd love to hear from you.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          {submitted ? (
            <div className="bg-forest/5 rounded-2xl p-8 text-center">
              <CheckCircle2 className="mx-auto mb-3 text-forest" size={40} />
              <p className="font-medium">Thanks — we'll reply within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink/70 mb-1">Name</label>
                <input id="name" required className="w-full border border-forest/20 rounded-lg px-4 py-3 focus:outline-none focus:border-brass" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink/70 mb-1">Email</label>
                <input id="email" type="email" required className="w-full border border-forest/20 rounded-lg px-4 py-3 focus:outline-none focus:border-brass" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink/70 mb-1">Message</label>
                <textarea id="message" rows={5} required className="w-full border border-forest/20 rounded-lg px-4 py-3 focus:outline-none focus:border-brass" />
              </div>
              <button type="submit" className="bg-forest text-porcelain font-semibold px-8 py-3 rounded-full hover:bg-forest-light transition-colors">
                Send message
              </button>
            </form>
          )}
        </div>

        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <Mail className="text-brass mt-1" size={18} />
            <div>
              <h2 className="font-semibold text-sm">Email</h2>
              <p className="text-ink/60 text-sm">hello@gildedandgrove.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="text-brass mt-1" size={18} />
            <div>
              <h2 className="font-semibold text-sm">Phone</h2>
              <p className="text-ink/60 text-sm">+91 80 4000 1200</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="text-brass mt-1" size={18} />
            <div>
              <h2 className="font-semibold text-sm">Studio</h2>
              <p className="text-ink/60 text-sm">Bengaluru, Karnataka, India</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
