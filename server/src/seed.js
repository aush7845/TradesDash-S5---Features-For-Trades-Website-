// npm run seed          -> adds the starter content (keeps anything already in the DB)
// npm run seed:reset    -> wipes features + trades and re-adds the starter content
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import Feature from "./models/Feature.js";
import Trade from "./models/Trade.js";

const features = [
  {
    slug: "voice-quote", icon: "Mic", name: "Voice Quote", shot: "voice",
    title: "Say it. Quote it. Send it.",
    text: "Record what the job needs while you are still on site. TradesDash turns your voice into a clean, itemised quote with VAT worked out for you.",
    points: ["Record hands-free with one big button", "AI picks out customer, items and prices", "Edit line items before you send"],
  },
  {
    slug: "invoicing", icon: "FileText", name: "Invoicing", shot: "invoice",
    title: "Get paid faster, chase less.",
    text: "Turn a finished job into an invoice in seconds and see exactly who has paid, who is waiting and who is overdue.",
    points: ["Pre-filled from the job and its quote", "Automatic reminders on Day 3, 7 and 14", "Download as PDF or send a payment link"],
  },
  {
    slug: "whatsapp", icon: "MessageCircle", name: "WhatsApp", shot: "whatsapp",
    title: "Talk to customers where they already are.",
    text: "Send quotes, invoices and review requests by WhatsApp and keep every conversation in one inbox.",
    points: ["Customers approve quotes with one tap", "Ready-made message templates", "See delivered and read status"],
  },
  {
    slug: "certificates", icon: "ShieldCheck", name: "Certificates", shot: "certificate",
    title: "Safety paperwork, never missed.",
    text: "Create CP12 and EICR certificates, store them safely and get warned before they expire.",
    points: ["Fill in CP12 and EICR forms on your phone", "Colour-coded expiry calendar", "Share with landlords by secure link"],
  },
].map((f, i) => ({ ...f, order: i }));

const trades = [
  {
    slug: "plumbers", icon: "Wrench", name: "Plumbers",
    tagline: "Emergency call-outs and quick repairs, quoted before you leave the driveway.",
    problems: ["Quotes written up late at night", "Customers forget to pay small jobs", "Photos of work lost in your phone"],
    solutions: ["Voice quote on site in under a minute", "Automatic WhatsApp payment reminders", "Before and after photos saved to each job"],
  },
  {
    slug: "electricians", icon: "Zap", name: "Electricians",
    tagline: "EICR reports and certificates done properly, stored safely and never lost.",
    problems: ["Paper EICR forms take hours to type up", "Landlords chasing copies of certificates", "No warning when a report is about to expire"],
    solutions: ["EICR generator that works on your phone", "Share certificates by secure landlord link", "Expiry calendar with colour-coded warnings"],
  },
  {
    slug: "gas-engineers", icon: "Flame", name: "Gas engineers",
    tagline: "Annual gas safety checks and CP12 records, ready to send the same day.",
    problems: ["Repeat CP12 visits are easy to forget", "Handwritten records get damaged or lost", "Late invoices after a busy week"],
    solutions: ["CP12 generator with required-field checks", "Renewal reminders before expiry", "Invoice created from the job in seconds"],
  },
  {
    slug: "roofers", icon: "Home", name: "Roofers",
    tagline: "Big jobs, weather delays and lots of customer questions, all in one place.",
    problems: ["Jobs move around when the weather turns", "Customers want proof of the finished work", "Large quotes need quick approval"],
    solutions: ["Drag-and-drop schedule and route planner", "Photo capture with captions for every job", "One-tap quote approval on WhatsApp"],
  },
].map((t, i) => ({ ...t, order: i }));

const upsertAll = (Model, items) =>
  Model.bulkWrite(
    items.map((item) => ({
      updateOne: { filter: { slug: item.slug }, update: { $setOnInsert: item }, upsert: true },
    }))
  );

await connectDB();
if (process.argv.includes("--reset")) {
  await Promise.all([Feature.deleteMany({}), Trade.deleteMany({})]);
  console.log("Cleared features and trades");
}
const [f, t] = await Promise.all([upsertAll(Feature, features), upsertAll(Trade, trades)]);
console.log(`Features added: ${f.upsertedCount}, Trades added: ${t.upsertedCount}`);
await mongoose.disconnect();
