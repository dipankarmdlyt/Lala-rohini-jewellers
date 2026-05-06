import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(express.json());

  const REVIEWS_FILE = path.join(__dirname, "reviews.json");

  // Ensure reviews file exists
  try {
    await fs.access(REVIEWS_FILE);
  } catch {
    await fs.writeFile(REVIEWS_FILE, JSON.stringify({ reviews: [] }));
  }

  // API Routes
  app.get("/api/reviews/:productId", async (req, res) => {
    try {
      const data = await fs.readFile(REVIEWS_FILE, "utf-8");
      const { reviews } = JSON.parse(data);
      const productReviews = reviews.filter((r: any) => r.productId === parseInt(req.params.productId));
      res.json(productReviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const { productId, user, rating, comment } = req.body;
      if (!productId || !user || !rating || !comment) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const data = await fs.readFile(REVIEWS_FILE, "utf-8");
      const { reviews } = JSON.parse(data);
      
      const newReview = {
        id: Date.now(),
        productId,
        user,
        rating,
        comment,
        date: new Date().toISOString()
      };

      reviews.push(newReview);
      await fs.writeFile(REVIEWS_FILE, JSON.stringify({ reviews }, null, 2));
      
      res.json(newReview);
    } catch (error) {
      res.status(500).json({ error: "Failed to post review" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
