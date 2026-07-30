import { useState, FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

export function BulkQuote() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // No backend order-management per the brief — this is a lead-capture
    // form only. In production this would POST to a CRM or email service.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="max-w-xl mx-auto px-6 py-24 text-center">
        <CheckCircle2 className="mx-auto mb-4 text-forest" size={48} />
        <h1 className="text-2xl font-display font-semibold mb-2">Request received</h1>
        <p className="text-ink/60">
          Our team will reach out within one business day with a tailored quote.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-display font-semibold mb-2">Request a bulk quote</h1>
      <p className="text-ink/60 mb-10">
        Tell us about your team and occasion — we'll put together a custom proposal.
      </p>

      <form action="https://formspree.io/f/xykrvvop" method="POST" className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Company name" id="companyName" name="companyName" required />
          <Field label="Contact name" id="contactName" name="contactName" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Email" id="email" name="email" type="email" required />
          <Field label="Phone" id="phone" name="phone" type="tel" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Number of employees" id="employeeCount" name="employeeCount" type="number" required />
          <Field label="Budget per gift (₹)" id="budgetPerGift" name="budgetPerGift" type="number" required />
        </div>
        <Field label="Occasion" id="occasion" name="occasion" placeholder="e.g. Diwali, onboarding, client appreciation" required />
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-ink/70 mb-1">
            Additional details
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full border border-forest/20 rounded-lg px-4 py-3 focus:outline-none focus:border-brass"
            placeholder="Anything else we should know?"
          />

          
        </div>
        <button
          type="submit"
          className="bg-forest text-porcelain font-semibold px-8 py-3 rounded-full hover:bg-forest-light transition-colors"
        >
          Submit request
        </button>
      </form>
    </main>
  );
}

function Field({
  label,
  id,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink/70 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full border border-forest/20 rounded-lg px-4 py-3 focus:outline-none focus:border-brass"
      />
    </div>
  );
}
