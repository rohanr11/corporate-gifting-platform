import { Router } from "express";
import { prisma } from "../lib/prisma";
import { askGeminiForJSON } from "../lib/gemini";

export const recommendationsRouter = Router();

interface GeminiRecsResult {
  similar: number[];
  frequentlyBoughtTogether: number[];
  aiPicks: { productId: number; reason: string }[];
}

// GET /api/recommendations/:productId
// Powers the "Similar products / AI recommendations / Frequently bought
// together" sections on a product detail page.
recommendationsRouter.get("/:productId", async (req, res) => {
  const productId = Number(req.params.productId);

  try {
    const target = await prisma.product.findUnique({
      where: { id: productId },
      include: { category: true },
    });
    if (!target) return res.status(404).json({ error: "Product not found" });

    const others = await prisma.product.findMany({
      where: { id: { not: productId } },
      include: { category: true },
    });

    // Cheap, deterministic fallback (no API cost) used if Gemini isn't
    // configured yet, so this feature still works out of the box.
    const sameCategory = others.filter((p) => p.categoryId === target.categoryId);
    const fallback = {
      similar: sameCategory.slice(0, 4).map((p) => p.id),
      frequentlyBoughtTogether: others.slice(0, 3).map((p) => p.id),
      aiPicks: others.slice(3, 6).map((p) => ({
        productId: p.id,
        reason: `Popular alongside ${target.name}.`,
      })),
    };

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
      return res.json(withProducts(fallback, others));
    }

    const catalogueForPrompt = others.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category.name,
      price: p.price,
      tags: p.tags,
    }));

    const prompt = `
You are recommending related products for a corporate gifting website.

TARGET PRODUCT:
${JSON.stringify({ id: target.id, name: target.name, category: target.category.name, tags: target.tags, price: target.price })}

CATALOGUE (all other products, choose ONLY from these ids):
${JSON.stringify(catalogueForPrompt)}

Return ONLY valid JSON in exactly this shape:
{
  "similar": [id, id, id],
  "frequentlyBoughtTogether": [id, id],
  "aiPicks": [{ "productId": id, "reason": "short reason" }]
}
Pick at most 4 "similar", 3 "frequentlyBoughtTogether", and 3 "aiPicks".
`.trim();

    const result = await askGeminiForJSON<GeminiRecsResult>(prompt);
    res.json(withProducts(result, others));
  } catch (err: any) {
    console.error("Recommendations error:", err.message);
    res.status(500).json({ error: "Failed to generate recommendations", details: err.message });
  }
});

function withProducts(
  result: { similar: number[]; frequentlyBoughtTogether: number[]; aiPicks: { productId: number; reason: string }[] },
  pool: any[]
) {
  const find = (id: number) => pool.find((p) => p.id === id);
  return {
    similar: result.similar.map(find).filter(Boolean),
    frequentlyBoughtTogether: result.frequentlyBoughtTogether.map(find).filter(Boolean),
    aiPicks: result.aiPicks
      .map((r) => ({ ...r, product: find(r.productId) }))
      .filter((r) => r.product),
  };
}
