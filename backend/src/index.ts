import "dotenv/config";
import express from "express";
import cors from "cors";
import { productsRouter } from "./routes/products";
import { categoriesRouter } from "./routes/categories";
import { cartRouter } from "./routes/cart";
import { wishlistRouter } from "./routes/wishlist";
import { aiSearchRouter } from "./routes/aiSearch";
import { recommendationsRouter } from "./routes/recommendations";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/ai-search", aiSearchRouter);
app.use("/api/recommendations", recommendationsRouter);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
