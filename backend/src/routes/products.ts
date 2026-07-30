import { Router } from "express";
import { prisma } from "../lib/prisma";

export const productsRouter = Router();

// GET /api/products?category=eco-friendly&search=bamboo
productsRouter.get("/", async (req, res) => {
  const { category, search } = req.query;

  const products = await prisma.product.findMany({
    where: {
      ...(category
        ? { category: { slug: String(category) } }
        : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: String(search) } },
              { description: { contains: String(search) } },
              { tags: { contains: String(search) } },
            ],
          }
        : {}),
    },
    include: { category: true },
    orderBy: { id: "asc" },
  });

  res.json(products);
});

// GET /api/products/:slug
productsRouter.get("/:slug", async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { slug: req.params.slug },
    include: { category: true },
  });

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});
