import { useEffect, useLayoutEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Wordmark from "@/components/Wordmark";
import { NAV, CONTACT } from "@/constants/site";

export const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useLayoutEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const close = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", close);
    return () => desktop.removeEventListener("change", close);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button data-testid="mobile-menu-toggle" aria-label="Open navigation" className="icon-button md:hidden">
          <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </SheetTrigger>
      {open && <SheetContent data-testid="mobile-menu" aria-describedby={undefined}
        onEscapeKeyDown={() => setOpen(false)}
        onKeyDownCapture={(event) => { if (event.key === "Escape") setOpen(false); }}
        className="flex h-[100dvh] w-full max-w-[420px] flex-col overflow-y-auto border-hairline bg-paper p-6 sm:max-w-[420px]" data-lenis-prevent>
        <SheetTitle className="sr-only" data-testid="mobile-menu-title">ANUYORA navigation</SheetTitle>
        <Link to="/" onClick={() => setOpen(false)} data-testid="mobile-logo-link" aria-label="ANUYORA — home" className="mt-2 w-fit">
          <Wordmark id="mobile" />
        </Link>
        <nav aria-label="Mobile" className="mt-12">
          {NAV.map((item, i) => (
            <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}
              data-testid={`mobile-nav-link-${item.id}`}
              className={({ isActive }) => `flex items-center gap-5 border-b border-hairline py-5 font-serif text-2xl transition-colors ${isActive ? "text-navy-mid" : "text-ink"}`}>
              <span className="font-sans text-xs text-slate-500" aria-hidden="true">0{i + 1}</span>
              {item.label}<ArrowUpRight className="ml-auto" size={18} aria-hidden="true" />
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto pt-10">
          <Link to="/contact" onClick={() => setOpen(false)} data-testid="mobile-cta-lets-talk" className="btn-primary w-full">Start a Conversation</Link>
          <a href={`mailto:${CONTACT.email}`} data-testid="mobile-contact-email" className="mt-6 block w-fit text-sm text-inksoft hover:text-navy-mid">{CONTACT.email}</a>
          <p data-testid="mobile-contact-address" className="mt-2 text-xs text-slate-500">{CONTACT.address} · Supporting US firms & businesses</p>
        </div>
      </SheetContent>}
    </Sheet>
  );
};