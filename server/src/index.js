import mongoose from "mongoose";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { createApp } from "./app.js";

try {
  await connectDB();
} catch (err) {
  console.error("Could not connect to MongoDB:", err.message);
  console.error("Is MongoDB running, and is MONGODB_URI in server/.env correct?");
  process.exit(1);
}

const server = createApp().listen(env.port, () => {
  console.log(`API running on http://localhost:${env.port}`);
});

const shutdown = async () => {
  server.close();
  await mongoose.disconnect();
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
