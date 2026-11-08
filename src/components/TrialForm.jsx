import { useState } from "react";
import { api } from "../lib/api.js";

const trades = ["Plumber", "Electrician", "Gas engineer", "Roofer", "Other"];

const field =
  "min-h-11 w-full rounded-lg border border-white/20 bg-white px-4 text-sm text-ink placeholder:text-muted focus:outline-2 focus:outline-accent";

export default function TrialForm() {
  const [form, setForm] = useState({ name: "", email: "", trade: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await api("/leads", { method: "POST", body: JSON.stringify({ ...form, source: "cta-band" }) });
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className="rounded-lg bg-white/10 p-4 text-center font-semibold text-white">
        Thanks! We will be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-3 text-left sm:grid-cols-2">
      <p className="text-center text-sm font-semibold text-white sm:col-span-2">Start your free trial</p>
      <div>
        <label htmlFor="trial-name" className="sr-only">Your name</label>
        <input id="trial-name" className={field} placeholder="Your name" value={form.name} onChange={set("name")} maxLength={100} autoComplete="name" />
      </div>
      <div>
        <label htmlFor="trial-trade" className="sr-only">Your trade</label>
        <select id="trial-trade" className={field} value={form.trade} onChange={set("trade")}>
          <option value="">Your trade</option>
          {trades.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="trial-email" className="sr-only">Email</label>
        <input id="trial-email" type="email" required className={field} placeholder="Email address" value={form.email} onChange={set("email")} maxLength={254} autoComplete="email" />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-11 cursor-pointer rounded-lg bg-accent px-6 text-sm font-bold text-navy-900 shadow-sm hover:brightness-95 disabled:cursor-wait disabled:opacity-70 sm:col-span-2"
      >
        {status === "sending" ? "Sending..." : "Start free trial"}
      </button>
      {status === "error" && (
        <p role="alert" className="text-center text-sm text-red-200 sm:col-span-2">{error}</p>
      )}
    </form>
  );
}
