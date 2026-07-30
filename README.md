# Gilded & Grove — AI Corporate Gifting Platform

A full-stack corporate gifting site with an AI-powered gift search, built with:

- **Frontend:** React + Vite + TypeScript + Tailwind CSS + React Router + Framer Motion + Lucide icons
- **Backend:** Node.js + Express + Prisma ORM + SQLite
- **AI:** Google Gemini 2.5 Flash (product recommendations, driven only by your real catalogue)

```
corporate-gifting-platform/
├── backend/    Express API + Prisma + SQLite
├── frontend/   React app
└── shared/     TypeScript types shared by both
```

---

## 1. Prerequisites

- Node.js 18+ and npm installed ([nodejs.org](https://nodejs.org))
- A free Gemini API key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

---

## 2. Backend setup

```bash
cd backend
npm install

# Copy the example env file, then open .env and paste in your Gemini key
cp .env.example .env

# Create the SQLite database and tables
npx prisma migrate dev --name init

# Fill it with realistic sample products
npm run seed

# Start the API server (http://localhost:4000)
npm run dev
```

Leave this terminal running. You should see:
`Backend running at http://localhost:4000`

### If `npx prisma migrate dev` fails
Make sure you're in the `backend` folder and that `.env` contains a line like:
`DATABASE_URL="file:./dev.db"` (already included in `.env.example`).

---

## 3. Frontend setup

Open a **second terminal**:

```bash
cd frontend
npm install

# Optional: only needed if your backend runs on a different port
cp .env.example .env

npm run dev
```

Visit **http://localhost:5173** in your browser.

---

## 4. Using the AI Gift Finder

Go to the "AI Gift Finder" page in the nav (or `/search`), and try:

- "Need gifts under ₹1500 for 200 employees"
- "Luxury gifts for CEOs"
- "Eco-friendly welcome kits"

The backend sends your request **plus the entire real product catalogue** to Gemini,
and Gemini is instructed to only recommend products that actually exist — the backend
also double-checks this and silently drops anything invalid before it reaches you.

If you see an error mentioning `GEMINI_API_KEY`, double check `backend/.env` has your
real key (not the placeholder text).

---

## 5. What's implemented vs. simplified

To keep this runnable in one pass, a few things from a "full production" spec were
scoped down — flag these if you want me to build them out further:

- **SEO:** meta tags, Open Graph/Twitter cards, robots.txt, sitemap.xml, and
  Product/Breadcrumb/Organization JSON-LD are all in place. FAQ schema and a
  Lighthouse/axe audit pass are not yet done.
- **Auth:** there's no real login — each visitor gets an anonymous session ID
  (stored in `localStorage`) that scopes their cart/wishlist, per the brief's
  "mock authentication only if needed."
- **Bulk quote / contact forms:** these are lead-capture forms (no email service
  wired up yet) — submitting shows a confirmation but doesn't send an email.
- **Recommendations:** if `GEMINI_API_KEY` isn't set, the "similar / frequently
  bought together / AI picks" sections fall back to simple category-matching so
  the feature still works without an API key.

---

## 6. Switching from SQLite to PostgreSQL later

In `backend/prisma/schema.prisma`, change:
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```
to `provider = "postgresql"`, then update `DATABASE_URL` in `.env` to your Postgres
connection string, and re-run `npx prisma migrate dev`. No frontend or route code
needs to change — Prisma handles the SQL dialect differences.
