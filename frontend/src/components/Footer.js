import { Link } from "react-router-dom";
import Wordmark from "@/components/Wordmark";
import { ContactDetails } from "@/components/ContactDetails";
import { NAV } from "@/constants/site";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-navy text-navy-text">
      <div className="wrap pt-14 pb-7 md:pt-16 md:pb-8">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="md:col-span-2 lg:col-span-5">
            <Link to="/" data-testid="footer-logo-link" aria-label="ANUYORA — home" className="inline-block">
              <Wordmark tone="light" id="footer" />
            </Link>
            <p className="mt-5 font-serif text-xl italic text-slate-200">Your Global Finance Partner.</p>
            <p className="mt-3 max-w-xs text-sm leading-7 text-slate-400">Bookkeeping support for US accounting firms and growing businesses.</p>
          </div>
          <nav aria-label="Footer" data-testid="footer-nav" className="lg:col-span-3">
            <p className="eyebrow !text-slate-400">Explore</p>
            <ul className="mt-5 space-y-2">
              {NAV.map((item) => <li key={item.to}>
                <Link to={item.to} data-testid={`footer-link-${item.id}`} className="inline-block py-1 text-sm text-slate-300 transition-colors duration-200 hover:text-white">{item.label}</Link>
              </li>)}
            </ul>
          </nav>
          <div className="lg:col-span-4">
            <p className="eyebrow mb-6 !text-slate-400">Get in Touch</p>
            <ContactDetails id="footer" light />
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-white/15 pt-6">
          <p data-testid="footer-copyright" className="text-xs text-slate-400">© {new Date().getFullYear()} ANUYORA. All rights reserved.</p>
          <p className="text-xs text-slate-400">Based in India. Working with US firms & businesses.</p>
        </div>
      </div>
    </footer>
  );
}