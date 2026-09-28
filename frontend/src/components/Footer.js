import { Link } from "react-router-dom";
import Wordmark from "@/components/Wordmark";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/how-we-work", label: "How We Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const PLACEHOLDERS = [
  { label: "Email", value: "Details to be added" },
  { label: "Phone", value: "Details to be added" },
  { label: "Address", value: "Details to be added" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-testid="site-footer" className="bg-navy text-navy-text">
      <div className="wrap py-16 md:py-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <Wordmark tone="light" />
            <p className="mt-5 font-serif text-2xl italic text-slate-300">Your Global Finance Partner.</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Bookkeeping support for accounting firms and growing businesses.
            </p>
          </div>

          <nav aria-label="Footer" data-testid="footer-nav" className="md:col-span-3">
            <p className="eyebrow !text-slate-400">Navigate</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    data-testid={`footer-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-slate-300 transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div data-testid="footer-contact" className="md:col-span-3">
            <p className="eyebrow !text-slate-400">Contact</p>
            <ul className="mt-5 space-y-3">
              {PLACEHOLDERS.map((item) => (
                <li key={item.label} className="text-sm">
                  <span className="text-slate-300">{item.label}</span>
                  <span className="text-slate-500"> — {item.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Placeholder entries. Final contact details will be added before launch.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-navy-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-500">© {year} ANUYORA. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-slate-500">Privacy Policy — to be added</span>
            <span className="text-xs text-slate-500">Terms — to be added</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
