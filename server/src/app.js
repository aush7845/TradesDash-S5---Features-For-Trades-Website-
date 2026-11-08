import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { env } from "./config/env.js";
import Feature from "./models/Feature.js";
import Trade from "./models/Trade.js";
import { contentRouter } from "./routes/content.js";
import leadsRouter from "./routes/leads.js";
import { featureSchema, tradeSchema } from "./schemas.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.clientOrigins }));
  app.use(express.json({ limit: "50kb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, db: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
  });

  app.use("/api/features", contentRouter(Feature, featureSchema));
  app.use("/api/trades", contentRouter(Trade, tradeSchema));
  app.use("/api/leads", leadsRouter);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
