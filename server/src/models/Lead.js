import mongoose from "mongoose";

// Someone who clicked "Start free trial" on the marketing site
const leadSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 254 },
    trade: { type: String, trim: true, maxlength: 50 },
    source: { type: String, trim: true, maxlength: 50, default: "website" },
    status: { type: String, enum: ["new", "contacted", "converted"], default: "new" },
  },
  { timestamps: true }
);

leadSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("Lead", leadSchema);
