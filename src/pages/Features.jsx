import { Mic, FileText, MessageCircle, ShieldCheck, Check, ArrowRight, Play } from "lucide-react";
import JumpBar from "../components/JumpBar.jsx";
import { Hero, Card, Badge, AccentButton, PrimaryButton, CtaBand } from "../components/ui.jsx";

/* ---- "Screenshots" built from simple cards (dummy data, no images needed) ---- */
function VoiceShot() {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-navy-700">New Voice Quote</p>
        <Badge tone="grey">Draft</Badge>
      </div>
      <div className="my-5 flex items-end justify-center gap-1 h-12" aria-hidden>
        {[20, 36, 24, 44, 30, 40, 18, 34, 26, 42, 22].map((h, i) => (
          <span key={i} className="w-1.5 rounded bg-navy-700" style={{ height: h }} />
        ))}
      </div>
      <div className="flex justify-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-navy-900">
          <Mic size={24} />
        </span>
      </div>
      <p className="mt-4 rounded-lg bg-accent-50 p-3 text-xs text-muted">
        “Replace kitchen tap for Mrs Patel, two hours labour, new mixer tap £85.”
      </p>
    </Card>
  );
}

function InvoiceShot() {
  const rows = [
    ["INV-1042", "Mrs Patel", "£245.00", "Paid", "green"],
    ["INV-1043", "J. Carter", "£1,180.00", "Sent", "blue"],
    ["INV-1044", "Oak Lettings", "£620.00", "Overdue", "red"],
  ];
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-line bg-navy-50 px-5 py-3 text-sm font-semibold text-navy-700">Invoices</div>
      {rows.map(([no, name, amt, st, tone]) => (
        <div key={no} className="flex items-center justify-between border-b border-line px-5 py-3 text-sm last:border-0">
          <div>
            <p className="font-semibold">{no}</p>
            <p className="text-xs text-muted">{name}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold">{amt}</span>
            <Badge tone={tone}>{st}</Badge>
          </div>
        </div>
      ))}
    </Card>
  );
}

function WhatsAppShot() {
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy-700">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-whatsapp text-white">
          <MessageCircle size={14} />
        </span>
        Mrs Patel
        <span className="ml-auto"><Badge tone="whatsapp">WhatsApp</Badge></span>
      </div>
      <div className="space-y-2 text-sm">
        <p className="max-w-[80%] rounded-lg rounded-tl-none bg-navy-50 p-3">Hi, your quote for £245 is ready. Tap to view.</p>
        <p className="ml-auto max-w-[80%] rounded-lg rounded-tr-none bg-green-100 p-3 text-green-900">Approved, thanks!</p>
      </div>
    </Card>
  );
}

function CertShot() {
  const rows = [
    ["CP12 · 14 Elm Road", "Valid", "green"],
    ["EICR · 3 Mill Lane", "Expiring soon", "amber"],
    ["CP12 · 9 High Street", "Expired", "red"],
  ];
  return (
    <Card className="p-5">
      <p className="mb-3 text-sm font-semibold text-navy-700">Certificate Vault</p>
      <div className="space-y-2">
        {rows.map(([name, st, tone]) => (
          <div key={name} className="flex items-center justify-between rounded-lg border border-line px-3 py-2.5 text-sm">
            {name}
            <Badge tone={tone}>{st}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}

const features = [
  {
    id: "voice-quote",
    icon: Mic,
    name: "Voice Quote",
    title: "Say it. Quote it. Send it.",
    text: "Record what the job needs while you are still on site. TradesDash turns your voice into a clean, itemised quote with VAT worked out for you.",
    points: ["Record hands-free with one big button", "AI picks out customer, items and prices", "Edit line items before you send"],
    shot: VoiceShot,
  },
  {
    id: "invoicing",
    icon: FileText,
    name: "Invoicing",
    title: "Get paid faster, chase less.",
    text: "Turn a finished job into an invoice in seconds and see exactly who has paid, who is waiting and who is overdue.",
    points: ["Pre-filled from the job and its quote", "Automatic reminders on Day 3, 7 and 14", "Download as PDF or send a payment link"],
    shot: InvoiceShot,
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    name: "WhatsApp",
    title: "Talk to customers where they already are.",
    text: "Send quotes, invoices and review requests by WhatsApp and keep every conversation in one inbox.",
    points: ["Customers approve quotes with one tap", "Ready-made message templates", "See delivered and read status"],
    shot: WhatsAppShot,
  },
  {
    id: "certificates",
    icon: ShieldCheck,
    name: "Certificates",
    title: "Safety paperwork, never missed.",
    text: "Create CP12 and EICR certificates, store them safely and get warned before they expire.",
    points: ["Fill in CP12 and EICR forms on your phone", "Colour-coded expiry calendar", "Share with landlords by secure link"],
    shot: CertShot,
  },
];

export default function Features() {
  return (
    <>
      <Hero
        eyebrow="Features"
        title="Everything a tradesperson needs, in one app."
        text="From the first voice note to the final payment, TradesDash handles the paperwork so you can get on with the work."
      >
        <AccentButton to="/for-trades"><Play size={14} /> See it for your trade</AccentButton>
      </Hero>

      {/* quick jump chips */}
      <JumpBar items={features} />

      <div className="mx-auto max-w-6xl space-y-16 px-6 py-14 sm:space-y-24 sm:py-20">
        {features.map(({ id, icon: Icon, name, title, text, points, shot: Shot }, i) => (
          <section key={id} id={id} className="grid scroll-mt-6 items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className={i % 2 ? "lg:order-2" : ""}>
              <span className="inline-flex items-center gap-2 rounded-full bg-navy-50 px-3 py-1 text-xs font-bold text-navy-700">
                <Icon size={14} /> {name}
              </span>
              <h2 className="mt-4 text-2xl font-extrabold text-navy-700 sm:text-3xl">{title}</h2>
              <p className="mt-3 text-muted">{text}</p>
              <ul className="mt-5 space-y-2.5">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm">
                    <Check size={18} className="mt-0.5 shrink-0 text-success" /> {p}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <PrimaryButton to="/for-trades">See who it is for</PrimaryButton>
              </div>
            </div>
            <div className="rounded-lg bg-navy-50 p-5 sm:p-8">
              <Shot />
            </div>
          </section>
        ))}
      </div>

      <CtaBand
        title="Built for the way you work."
        text="Voice quotes, invoices, WhatsApp and certificates, all in one place."
        to="/for-trades"
        label="See it for your trade"
      />
    </>
  );
}