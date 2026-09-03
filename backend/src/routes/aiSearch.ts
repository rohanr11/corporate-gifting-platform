import { Router } from "express";
import { prisma } from "../lib/prisma";
import { askGeminiForJSON } from "../lib/gemini";

export const aiSearchRouter = Router();

interface GeminiSearchResult {
  summary: string;
  recommendations: { productId: number; reason: string; isHighlyRecommended?: boolean }[];
}

// POST /api/ai-search  { query: "Need gifts under ₹1500 for 200 employees" }
aiSearchRouter.post("/", async (req, res) => {
  const { query } = req.body;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "A 'query' string is required" });
  }

  try {
    // 1. Pull the full catalogue — Gemini is only ever allowed to choose from this list.
    const products = await prisma.product.findMany({ include: { category: true } });

    // 2. Build a compact catalogue representation to keep the prompt small.
    const catalogueForPrompt = products.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category.name,
      price: p.price,
      tags: p.tags,
      minOrderQty: p.minOrderQty,
      rating: p.rating,
      description: p.shortDescription,
    }));

    const prompt = `
You are an expert corporate gifting consultant for an online gifting platform.
Your job is to deeply understand the user's intent and return ONLY the most relevant products.

RULES (follow strictly):
- You may ONLY recommend products from the catalogue below using their exact "id".
- NEVER invent products, names, or IDs not in the catalogue.
- NEVER pad results with loosely related products to fill the list.

CATALOGUE:
${JSON.stringify(catalogueForPrompt)}

USER REQUEST:
"${query}"

HOW TO RESPOND:

A) SPECIFIC PRODUCT SEARCH (e.g. "pen", "mug", "hoodie", "notebook"):
   - Return ONLY products that ARE or CONTAIN that exact item type.
   - If a user asks for "pen", return pens — not notebooks, not portfolios, not random desk items.
   - Return 1-4 results maximum. Fewer is better if only a few are truly relevant.
   - If NOTHING in the catalogue matches, return an empty recommendations array and explain what's available instead in the summary.

B) BROAD / OCCASION-BASED SEARCH (e.g. "gifts under ₹1500 for 200 employees", "Diwali gifts", "welcome kits for new hires"):
   - Apply ALL constraints strictly (budget, quantity, occasion, audience).
   - Filter out products that violate constraints (e.g. over budget, min order qty too high).
   - Return up to 6 products, sorted by relevance and rating.
   - Mark 1-2 top picks with "isHighlyRecommended": true.

C) VAGUE / EXPLORATORY SEARCH (e.g. "something nice", "gift ideas", "what do you have"):
   - Return a curated selection of 4-6 bestseller-style products spanning different categories.
   - Highlight variety in the summary.

SUMMARY GUIDELINES:
- Write the summary as a DIRECT answer to the user's question — not a generic "here are some options".
- Be specific: mention product names, prices, and why they fit.
- If nothing matches, be honest: "We don't currently carry [X], but here's what's closest..."

Respond with ONLY valid JSON in exactly this shape, nothing else:
{
  "summary": "a direct, helpful 1-2 sentence answer to the user's question",
  "recommendations": [
    {
      "productId": 1,
      "reason": "a concise reason this specific product fits the request",
      "isHighlyRecommended": true
    }
  ]
}
`.trim();

    const result = await askGeminiForJSON<GeminiSearchResult>(prompt);

    // 3. Defensive filtering: even though we asked nicely, never trust the
    // model blindly — drop any productId that doesn't actually exist.
    const validIds = new Set(products.map((p) => p.id));
    const safeRecommendations = result.recommendations.filter((r) =>
      validIds.has(r.productId)
    );

    // 4. Attach full product data so the frontend can render cards directly.
    const enriched = safeRecommendations.map((r) => ({
      ...r,
      product: products.find((p) => p.id === r.productId),
    }));

    res.json({ summary: result.summary, recommendations: enriched });
  } catch (err: any) {
    console.error("AI search error:", err.message);
    res.status(500).json({
      error: `AI search failed: ${err.message || "Unknown error"}`,
      details: err.message,
    });
  }
});
