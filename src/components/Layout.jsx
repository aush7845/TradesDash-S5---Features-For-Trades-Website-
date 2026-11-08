import { NavLink, Link, Outlet } from "react-router-dom";
import { Sparkles, HardHat } from "lucide-react";

const links = [
  { to: "/features", label: "Features", icon: Sparkles },
  { to: "/for-trades", label: "For Trades", icon: HardHat },
];

function Logo() {
  return (
    <Link to="/features" className="text-2xl font-extrabold tracking-tight text-white">
      Trades<span className="text-accent">Dash</span>
    </Link>
  );
}

function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col bg-navy-900">
      <div className="px-6 pt-7">
        <Logo />
        <p className="mt-9 text-xs font-semibold tracking-widest text-navy-50/70">MARKETING SITE</p>
      </div>
      <nav className="mt-4 flex flex-col gap-1.5 px-4" aria-label="Main">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              "flex items-center gap-3 rounded-lg px-4 min-h-11 text-[15px] font-medium transition-colors " +
              (isActive
                ? "bg-accent text-white"
                : "text-navy-50/90 hover:bg-navy-700/60 hover:text-white")
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto border-t border-white/10 px-6 py-5">
        <p className="text-xs text-navy-50/60">TradesDash marketing site</p>
      </div>
    </aside>
  );
}

function BottomBar() {
  return (
    <nav
      className="lg:hidden fixed inset-x-0 bottom-0 z-20 grid grid-cols-2 border-t border-navy-700 bg-navy-900"
      aria-label="Main"
    >
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
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

// White bar at the top of the content area (desktop only)
function DesktopHeader() {
  return (
    <header className="hidden lg:block border-b border-line bg-white px-8 py-5">
      <p className="text-xl font-bold text-navy-900">TradesDash Website</p>
      <p className="text-sm text-muted">See what TradesDash does for your trade</p>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 TradesDash. All rights reserved.</p>
        <div className="flex gap-5">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-accent">{l.label}</Link>
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
        <DesktopHeader />
        <main className="mx-auto max-w-6xl space-y-8 px-6 py-8 sm:py-10">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
