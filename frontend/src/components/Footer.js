import { Link } from "react-router-dom";
import Wordmark from "@/components/Wordmark";

const NAV = [
  { to: "/services", label: "Services" },
  { to: "/how-we-work", label: "How We Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-testid="site-footer" className="bg-navy text-navy-text">
      <div className="wrap py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Wordmark tone="light" />
            <p className="mt-5 font-serif text-2xl italic text-slate-300">Your Global Finance Partner.</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Bookkeeping support for accounting firms and growing businesses.
            </p>
          </div>

          <nav aria-label="Footer" data-testid="footer-nav" className="md:col-span-4 md:col-start-9">
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
        </div>

        <div className="mt-16 border-t border-navy-border pt-8">
          <p className="text-xs text-slate-400">© {year} ANUYORA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
