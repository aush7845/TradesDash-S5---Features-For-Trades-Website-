import { Link } from "react-router-dom";

const tones = {
  grey: "bg-slate-100 text-slate-700",
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  amber: "bg-amber-100 text-amber-800",
  red: "bg-red-100 text-red-800",
};

// Status badge: light tint background + darker text (handout 7.4)
export function Badge({ tone = "grey", children }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

// Accent button = orange with DARK NAVY text (handout 7.4)
export function AccentButton({ to, children }) {
  const cls =
    "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-bold text-navy-900 shadow-sm hover:brightness-95";
  return to ? (
    <Link to={to} className={cls}>{children}</Link>
  ) : (
    <button type="button" className={cls}>{children}</button>
  );
}

export function GhostButton({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/30 px-6 text-sm font-bold text-white hover:bg-navy-700"
    >
      {children}
    </Link>
  );
}

export function PrimaryButton({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-navy-700 px-6 text-sm font-bold text-white hover:bg-navy-900"
    >
      {children}
    </Link>
  );
}

export function Card({ className = "", children }) {
  return (
    <div className={`rounded-lg border border-line bg-white shadow-sm ${className}`}>{children}</div>
  );
}

export function Hero({ eyebrow, title, text, children }) {
  return (
    <section className="bg-navy-900 px-6 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-bold text-navy-900">{eyebrow}</span>
        <h1 className="mt-5 max-w-3xl text-3xl font-extrabold text-white sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base text-navy-50/80 sm:text-lg">{text}</p>
        <div className="mt-8 flex flex-wrap gap-3">{children}</div>
      </div>
    </section>
  );
}

export function CtaBand({ title, text, to, label }) {
  return (
    <section className="bg-navy-700 px-6 py-14 text-center">
      <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-navy-50/80">{text}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <AccentButton to={to}>{label}</AccentButton>
      </div>
    </section>
  );
}