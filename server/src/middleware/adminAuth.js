import crypto from "node:crypto";
import { env } from "../config/env.js";

// Admin routes need the header:  x-api-key: <ADMIN_API_KEY>
export function requireAdmin(req, res, next) {
  if (!env.adminApiKey) {
    return res.status(503).json({ error: "Admin API is disabled. Set ADMIN_API_KEY in .env" });
  }
  const given = Buffer.from(req.get("x-api-key") ?? "");
  const expected = Buffer.from(env.adminApiKey);
  const ok = given.length === expected.length && crypto.timingSafeEqual(given, expected);
  if (!ok) return res.status(401).json({ error: "Unauthorized" });
  next();
}
