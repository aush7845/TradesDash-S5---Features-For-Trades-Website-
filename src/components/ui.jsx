import { Link } from "react-router-dom";
import TrialForm from "./TrialForm.jsx";

const tones = {
  grey: "bg-slate-100 text-slate-700",
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  amber: "bg-amber-100 text-amber-800",
  red: "bg-red-100 text-red-800",
  whatsapp: "bg-green-100 text-green-800",
};

// Status badge: light tint background + darker text, slightly squared pill (like the admin panel)
export function Badge({ tone = "grey", children }) {
  return (
    <span className={`inline-block rounded-md px-3 py-1 text-xs font-semibold ${tones[tone] ?? tones.grey}`}>
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
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-line bg-white px-6 text-sm font-bold text-navy-700 hover:bg-navy-50"
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

const tops = {
  navy: "border-t-navy-900",
  accent: "border-t-accent",
  danger: "border-t-danger",
  success: "border-t-success",
};

// White rounded card. Pass accent="navy|accent|danger|success" for the coloured top bar.
export function Card({ accent, className = "", children, ...rest }) {
  return (
    <div
      className={`rounded-xl border border-line bg-white shadow-sm ${
        accent ? `border-t-4 ${tops[accent]}` : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

// Page title block, same look as "Subscription & Billing" in the admin panel
export function PageHeader({ title, text, children }) {
  return (
    <section>
      <h1 className="max-w-3xl text-3xl font-normal leading-tight text-navy-900 sm:text-4xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-base text-muted sm:text-lg">{text}</p>
      {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
    </section>
  );
}

export function CtaBand({ title, text, to, label }) {
  return (
    <section className="rounded-xl border-t-4 border-accent bg-navy-900 px-6 py-12 text-center shadow-sm">
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-navy-50/80">{text}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <AccentButton to={to}>{label}</AccentButton>
      </div>
      <div className="mx-auto mt-8 max-w-xl border-t border-white/10 pt-8">
        <TrialForm />
      </div>
    </section>
  );
}

export function Loading({ text = "Loading..." }) {
  return (
    <Card className="p-8 text-center text-muted" role="status">
      {text}
    </Card>
  );
}

export function ErrorBox({ error, onRetry }) {
  return (
    <Card accent="danger" className="p-8 text-center" role="alert">
      <p className="font-semibold text-danger">Could not load this page.</p>
      <p className="mt-1 text-sm text-muted">{error?.message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-navy-700 px-6 text-sm font-bold text-white hover:bg-navy-900"
        >
          Try again
        </button>
      )}
    </Card>
  );
}
