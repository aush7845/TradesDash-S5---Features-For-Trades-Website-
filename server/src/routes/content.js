import { Router } from "express";
import { requireAdmin } from "../middleware/adminAuth.js";
import { validate } from "../middleware/validate.js";

// Same CRUD for Features and Trades.
// Public: GET (published items only). Admin (x-api-key): POST, PUT, DELETE.
export function contentRouter(Model, schema) {
  const router = Router();

  router.get("/", async (_req, res) => {
    const items = await Model.find({ published: true }).sort({ order: 1, createdAt: 1 });
    res.json(items);
  });

  router.get("/:slug", async (req, res) => {
    const item = await Model.findOne({ slug: req.params.slug, published: true });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  });

  router.post("/", requireAdmin, validate(schema), async (req, res) => {
    const item = await Model.create(req.body);
    res.status(201).json(item);
  });

  router.put("/:slug", requireAdmin, validate(schema.partial()), async (req, res) => {
    const item = await Model.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  });

  router.delete("/:slug", requireAdmin, async (req, res) => {
    const item = await Model.findOneAndDelete({ slug: req.params.slug });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  });

  return router;
}
