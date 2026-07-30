import { Router } from "express";
import { prisma } from "../lib/prisma";

export const categoriesRouter = Router();

// GET /api/categories
categoriesRouter.get("/", async (_req, res) => {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
  });
  res.json(categories);
});
