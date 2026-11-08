import { z } from "zod";

const slug = z.string().trim().toLowerCase().regex(/^[a-z0-9-]+$/, "Use only letters, numbers and dashes");
const lines = z.array(z.string().trim().min(1).max(200)).max(10);

export const featureSchema = z.object({
  slug,
  icon: z.string().trim().min(1).max(40),
  name: z.string().trim().min(1).max(60),
  title: z.string().trim().min(1).max(160),
  text: z.string().trim().min(1).max(600),
  points: lines.default([]),
  shot: z.string().trim().max(40).optional(),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const tradeSchema = z.object({
  slug,
  icon: z.string().trim().min(1).max(40),
  name: z.string().trim().min(1).max(60),
  tagline: z.string().trim().min(1).max(300),
  problems: lines.default([]),
  solutions: lines.default([]),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const leadSchema = z.object({
  name: z.string().trim().max(100).optional(),
  email: z.string().trim().toLowerCase().email("Enter a valid email").max(254),
  trade: z.string().trim().max(50).optional(),
  source: z.string().trim().max(50).optional(),
});

export const leadStatusSchema = z.object({
  status: z.enum(["new", "contacted", "converted"]),
});
