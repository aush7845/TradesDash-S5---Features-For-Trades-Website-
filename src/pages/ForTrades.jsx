import { Wrench, Zap, Flame, Home, ArrowRight, X, Check } from "lucide-react";
import JumpBar from "../components/JumpBar.jsx";
import { Hero, Card, AccentButton, CtaBand } from "../components/ui.jsx";

const trades = [
  {
    id: "plumbers",
    icon: Wrench,
    name: "Plumbers",
    tagline: "Emergency call-outs and quick repairs, quoted before you leave the driveway.",
    problems: ["Quotes written up late at night", "Customers forget to pay small jobs", "Photos of work lost in your phone"],
    solutions: ["Voice quote on site in under a minute", "Automatic WhatsApp payment reminders", "Before and after photos saved to each job"],
  },
  {
    id: "electricians",
    icon: Zap,
    name: "Electricians",
    tagline: "EICR reports and certificates done properly, stored safely and never lost.",
    problems: ["Paper EICR forms take hours to type up", "Landlords chasing copies of certificates", "No warning when a report is about to expire"],
    solutions: ["EICR generator that works on your phone", "Share certificates by secure landlord link", "Expiry calendar with colour-coded warnings"],
  },
  {
    id: "gas-engineers",
    icon: Flame,
    name: "Gas engineers",
    tagline: "Annual gas safety checks and CP12 records, ready to send the same day.",
    problems: ["Repeat CP12 visits are easy to forget", "Handwritten records get damaged or lost", "Late invoices after a busy week"],
    solutions: ["CP12 generator with required-field checks", "Renewal reminders before expiry", "Invoice created from the job in seconds"],
  },
  {
    id: "roofers",
    icon: Home,
    name: "Roofers",
    tagline: "Big jobs, weather delays and lots of customer questions, all in one place.",
    problems: ["Jobs move around when the weather turns", "Customers want proof of the finished work", "Large quotes need quick approval"],
    solutions: ["Drag-and-drop schedule and route planner", "Photo capture with captions for every job", "One-tap quote approval on WhatsApp"],
  },
];

export default function ForTrades() {
  return (
    <>
      <Hero
        eyebrow="For Trades"
        title="Built for the way you actually work."
        text="Whatever your trade, TradesDash cuts the paperwork so you spend more time on the tools and less time on the laptop."
      >
        <AccentButton to="/features">Explore features <ArrowRight size={16} /></AccentButton>
      </Hero>
      <JumpBar items={trades} />

      <div className="mx-auto max-w-6xl space-y-10 px-6 py-14 sm:py-20">
        {trades.map(({ id, icon: Icon, name, tagline, problems, solutions }) => (
          <section key={id} id={id} className="scroll-mt-6">
            <Card className="overflow-hidden">
              <div className="flex items-center gap-4 border-b border-line bg-navy-50 p-5 sm:p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-navy-700 text-white">
                  <Icon size={24} />
                </span>
                <div>
                  <h2 className="text-xl font-extrabold text-navy-700 sm:text-2xl">{name}</h2>
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
      </div>

      <CtaBand
        title="One app for every trade."
        text="Quotes, invoices and certificates for plumbers, electricians, gas engineers and roofers."
        to="/features"
        label="Explore features"
      />
    </>
    
  );
} 