import { Router } from "express";
import { prisma } from "../lib/prisma";

export const wishlistRouter = Router();

// GET /api/wishlist?sessionId=xxx
wishlistRouter.get("/", async (req, res) => {
  const sessionId = String(req.query.sessionId || "");
  if (!sessionId) return res.status(400).json({ error: "sessionId is required" });

  const items = await prisma.wishlistItem.findMany({
    where: { sessionId },
    include: { product: true },
  });
  res.json(items);
});

// POST /api/wishlist  { sessionId, productId }
wishlistRouter.post("/", async (req, res) => {
  const { sessionId, productId } = req.body;
  if (!sessionId || !productId) {
    return res.status(400).json({ error: "sessionId and productId are required" });
  }

  const item = await prisma.wishlistItem.upsert({
    where: { sessionId_productId: { sessionId, productId } },
    update: {},
    create: { sessionId, productId },
    include: { product: true },
  });

  res.json(item);
});

// DELETE /api/wishlist/:id
wishlistRouter.delete("/:id", async (req, res) => {
  await prisma.wishlistItem.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});
