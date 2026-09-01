import { Router } from "express";
import { prisma } from "../lib/prisma";
import { askGeminiForJSON } from "../lib/gemini";

export const aiSearchRouter = Router();

interface GeminiSearchResult {
  summary: string;
  recommendations: { productId: number; reason: string }[];
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

Select up to 6 products from the catalogue that best match the user's
request (consider budget, quantity/minOrderQty, occasion, and tags).

Respond with ONLY valid JSON in exactly this shape, nothing else:
{
  "summary": "a short 1-2 sentence summary of what you recommend and why",
  "recommendations": [
    { "productId": 1, "reason": "a short reason this product fits" }
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
