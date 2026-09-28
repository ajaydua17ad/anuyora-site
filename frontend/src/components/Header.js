import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Wordmark from "@/components/Wordmark";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/how-we-work", label: "How We Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-50"
    >
      <div className="border-b border-hairline bg-paper/90 backdrop-blur-md">
        <div className="wrap flex h-16 items-center justify-between md:h-20">
        <Link to="/" aria-label="ANUYORA — home" data-testid="header-logo-link" className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Primary" data-testid="nav-desktop" className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={({ isActive }) =>
                `group relative text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive ? "text-ink" : "text-inksoft hover:text-ink"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-navy transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            data-testid="header-cta-lets-talk"
            className="btn-primary hidden !px-6 !py-2.5 lg:inline-flex"
          >
            Let’s Talk
          </Link>
          <button
            type="button"
            data-testid="mobile-menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center border border-hairline text-ink transition-colors hover:border-ink/40 lg:hidden"
          >
            {open ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
          </button>
        </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        data-testid="mobile-menu"
        className={`fixed inset-x-0 top-16 md:top-20 bottom-0 z-40 border-t border-hairline bg-paper transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="wrap flex h-full flex-col pt-10 pb-10">
          <ul className="space-y-2">
            {NAV.map((item, i) => (
              <li key={item.to} className="border-b border-hairline">
                <NavLink
                  to={item.to}
                  data-testid={`mobile-nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={({ isActive }) =>
                    `flex items-baseline gap-4 py-5 font-serif text-3xl transition-colors ${
                      isActive ? "text-ink" : "text-inksoft"
                    }`
                  }
                >
                  <span className="text-xs not-italic text-slate-400">0{i + 1}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <Link to="/contact" data-testid="mobile-cta-lets-talk" className="btn-primary w-full">
              Let’s Talk
            </Link>
            <p className="mt-6 text-xs tracking-wide text-slate-400">Your Global Finance Partner.</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
