import mongoose from "mongoose";

const featureSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    icon: { type: String, required: true, trim: true }, // lucide icon name, e.g. "Mic"
    name: { type: String, required: true, trim: true, maxlength: 60 },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    text: { type: String, required: true, trim: true, maxlength: 600 },
    points: { type: [String], default: [] },
    shot: { type: String, trim: true }, // which mock screenshot the frontend shows
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

featureSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret.slug; // frontend uses `id` as the page anchor
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Feature", featureSchema);
