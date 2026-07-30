import { Router } from "express";
import { prisma } from "../lib/prisma";

export const cartRouter = Router();

// GET /api/cart  (requires ?sessionId=xxx)
cartRouter.get("/", async (req, res) => {
  const sessionId = String(req.query.sessionId || "");
  if (!sessionId) return res.status(400).json({ error: "sessionId is required" });

  const items = await prisma.cartItem.findMany({
    where: { sessionId },
    include: { product: true },
  });
  res.json(items);
});

// POST /api/cart  { sessionId, productId, quantity }
cartRouter.post("/", async (req, res) => {
  const { sessionId, productId, quantity } = req.body;
  if (!sessionId || !productId) {
    return res.status(400).json({ error: "sessionId and productId are required" });
  }

  const item = await prisma.cartItem.upsert({
    where: { sessionId_productId: { sessionId, productId } },
    update: { quantity: { increment: quantity ?? 1 } },
    create: { sessionId, productId, quantity: quantity ?? 1 },
    include: { product: true },
  });

  res.json(item);
});

// PATCH /api/cart/:id  { quantity }
cartRouter.patch("/:id", async (req, res) => {
  const { quantity } = req.body;
  const item = await prisma.cartItem.update({
    where: { id: Number(req.params.id) },
    data: { quantity },
    include: { product: true },
  });
  res.json(item);
});

// DELETE /api/cart/:id
cartRouter.delete("/:id", async (req, res) => {
  await prisma.cartItem.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});
