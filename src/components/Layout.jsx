import { NavLink, Link, Outlet } from "react-router-dom";
import { Sparkles, HardHat, Hammer } from "lucide-react";

const links = [
  { to: "/features", label: "Features", icon: Sparkles },
  { to: "/for-trades", label: "For Trades", icon: HardHat },
];

function Logo() {
  return (
    <Link to="/features" className="flex items-center gap-2 text-white font-extrabold text-xl">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-navy-900">
        <Hammer size={20} />
      </span>
      TradesDash
    </Link>
  );
}

function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col bg-navy-900 p-5">
      <Logo />
      <nav className="mt-10 flex flex-col gap-1" aria-label="Main">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              "flex items-center gap-3 rounded-lg px-3 min-h-11 text-sm font-medium transition-colors " +
              (isActive
                ? "bg-navy-700 text-white"
                : "text-navy-50/80 hover:bg-navy-700/60 hover:text-white")
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto">
        <p className="mb-3 text-xs text-navy-50/60">Quotes, invoices and certificates, done from your phone.</p>
      </div>
    </aside>
  );
}

function BottomBar() {
  return (
    <nav
      className="lg:hidden fixed inset-x-0 bottom-0 z-20 grid grid-cols-2 bg-navy-900 border-t border-navy-700"
      aria-label="Main"
    >
      {links.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium " +
            (isActive ? "text-accent" : "text-navy-50/80")
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

function MobileTopBar() {
  return (
    <header className="lg:hidden flex items-center justify-between bg-navy-900 px-4 py-3">
      <Logo />
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-50/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 TradesDash. All rights reserved.</p>
        <div className="flex gap-5">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-white">{l.label}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <BottomBar />
      <div className="lg:ml-64 pb-14 lg:pb-0">
        <MobileTopBar />
        <main><Outlet /></main>
        <Footer />
      </div>
    </div>
  );
}