import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    icon: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true, maxlength: 60 },
    tagline: { type: String, required: true, trim: true, maxlength: 300 },
    problems: { type: [String], default: [] },
    solutions: { type: [String], default: [] },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

tradeSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret.slug;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Trade", tradeSchema);
