import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API route to proxy football-data.org
  app.get("/api/matches", async (req, res) => {
    try {
      const apiKey = process.env.FOOTBALL_DATA_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "API Key not configured" });
      }

      // Default competitions: BSA (Brasileirão), CL (Champions League), CLI (Libertadores), EC (Euro)
      // Note: football-data.org free tier has specific competitions
      const competitions = req.query.competitions || "BSA,CL,CLI,EC,WC";
      const dateFrom = req.query.dateFrom;
      const dateTo = req.query.dateTo;

      let url = `https://api.football-data.org/v4/matches?competitions=${competitions}`;
      if (dateFrom && dateTo) {
        url += `&dateFrom=${dateFrom}&dateTo=${dateTo}`;
      }

      const response = await fetch(url, {
        headers: {
          "X-Auth-Token": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error proxying football data:", error);
      res.status(500).json({ error: "Failed to fetch matches" });
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
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
