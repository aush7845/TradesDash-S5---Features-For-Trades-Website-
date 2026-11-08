import { ZodError } from "zod";
import mongoose from "mongoose";

export function notFound(_req, res) {
  res.status(404).json({ error: "Not found" });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Invalid data",
      details: err.issues.map((i) => ({ field: i.path.join("."), message: i.message })),
    });
  }
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ error: err.message });
  }
  if (err?.code === 11000) {
    return res.status(409).json({ error: "Already exists" });
  }
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
}
