import { ArrowRight, X, Check } from "lucide-react";
import JumpBar from "../components/JumpBar.jsx";
import { PageHeader, Card, AccentButton, CtaBand, Loading, ErrorBox } from "../components/ui.jsx";
import { useApi } from "../lib/useApi.js";
import { getIcon } from "../lib/icons.js";

export default function ForTrades() {
  const { data, loading, error, reload } = useApi("/trades");
  const trades = (data ?? []).map((t) => ({ ...t, icon: getIcon(t.icon) }));

  return (
    <>
      <PageHeader
        title="Built for the way you actually work."
        text="Whatever your trade, TradesDash cuts the paperwork so you spend more time on the tools and less time on the laptop."
      >
        <AccentButton to="/features">Explore features <ArrowRight size={16} /></AccentButton>
      </PageHeader>
      {loading && <Loading />}
      {error && <ErrorBox error={error} onRetry={reload} />}
      {trades.length > 0 && <JumpBar items={trades} />}

      {trades.map(({ id, icon: Icon, name, tagline, problems, solutions }) => (
          <section key={id} id={id} className="scroll-mt-6">
            <Card accent="navy" className="overflow-hidden">
              <div className="flex items-center gap-4 border-b border-line bg-navy-50 p-5 sm:p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-accent text-white">
                  <Icon size={24} />
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-navy-900 sm:text-2xl">{name}</h2>
                  <p className="text-sm text-muted">{tagline}</p>
                </div>
              </div>

              <div className="grid gap-0 md:grid-cols-2 md:divide-x md:divide-line">
                <div className="p-5 sm:p-6">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-danger">Daily problems</h3>
                  <ul className="space-y-3">
                    {problems.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm">
                        <X size={18} className="mt-0.5 shrink-0 text-danger" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-line p-5 sm:p-6 md:border-t-0">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-success">How TradesDash helps</h3>
                  <ul className="space-y-3">
                    {solutions.map((s) => (
                      <li key={s} className="flex items-start gap-2.5 text-sm">
                        <Check size={18} className="mt-0.5 shrink-0 text-success" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-accent-50 px-5 py-4 sm:px-6">
                <p className="text-sm text-ink">Tip: record your first {name.toLowerCase()} quote by voice in under a minute.</p>
              </div>
            </Card>
          </section>
      ))}

      <CtaBand
        title="One app for every trade."
        text="Quotes, invoices and certificates for plumbers, electricians, gas engineers and roofers."
        to="/features"
        label="Explore features"
      />
    </>
    
  );
} 