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
You are an AI shopping assistant for a corporate gifting website.

Below is the ENTIRE product catalogue as JSON. You may ONLY recommend
products that appear in this list, using their exact "id" field. Never
invent a product, name, or id that is not in the catalogue.

CATALOGUE:
${JSON.stringify(catalogueForPrompt)}

USER REQUEST:
"${query}"

INSTRUCTIONS:
1. For straightforward searches (e.g., "flower vase", "notebook"), return ONLY exact or highly relevant matches. Do not pad the list with irrelevant products.
2. For constraint-based queries (e.g., "under 4000", "minimum 50 qty"):
   - Strictly adhere to the constraints (e.g., filter out products that exceed the budget).
   - Sort the returned products from highest 'rating' to lowest 'rating'.
   - Highlight 1 or 2 top products by setting "isHighlyRecommended": true.
3. Select up to 6 products overall that best match the user's request.

Respond with ONLY valid JSON in exactly this shape, nothing else:
{
  "summary": "a short 1-2 sentence summary of what you recommend and why",
  "recommendations": [
    { 
      "productId": 1, 
      "reason": "a short reason this product fits",
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
