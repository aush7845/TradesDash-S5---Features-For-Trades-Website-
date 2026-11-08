import { Router } from "express";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import Lead from "../models/Lead.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { validate } from "../middleware/validate.js";
import { leadSchema, leadStatusSchema } from "../schemas.js";

const router = Router();

// Max 10 signups per IP every 15 minutes (stops spam)
const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

// PUBLIC: "Start free trial" form.
// Same email twice just updates the record. The reply is identical either way,
// so nobody can use this form to check which emails are registered.
router.post("/", signupLimiter, validate(leadSchema), async (req, res) => {
  const { email, ...rest } = req.body;
  const fields = Object.fromEntries(Object.entries(rest).filter(([, v]) => v));
  fields.source ??= "website";
  await Lead.findOneAndUpdate(
    { email },
    { $set: fields },
    { upsert: true, setDefaultsOnInsert: true, runValidators: true }
  );
  res.status(201).json({ ok: true, message: "Thanks! We'll be in touch soon." });
});

// ADMIN: list leads (?status=new&page=1&limit=20)
router.get("/", requireAdmin, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
  const filter = ["new", "contacted", "converted"].includes(req.query.status)
    ? { status: req.query.status }
    : {};
  const [items, total] = await Promise.all([
    Lead.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Lead.countDocuments(filter),
  ]);
  res.json({ items, total, page, pages: Math.ceil(total / limit) });
});

// ADMIN: change status
router.patch("/:id", requireAdmin, validate(leadStatusSchema), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ error: "Not found" });
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!lead) return res.status(404).json({ error: "Not found" });
  res.json(lead);
});

// ADMIN: delete
router.delete("/:id", requireAdmin, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ error: "Not found" });
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) return res.status(404).json({ error: "Not found" });
  res.status(204).end();
});

export default router;
