import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import { MobileMenu } from "@/components/MobileMenu";
import { NAV } from "@/constants/site";

export default function Header() {
  return (
    <header data-testid="site-header" className="site-header sticky top-0 z-40">
      <div className="wrap flex h-20 items-center justify-between gap-5 lg:h-24">
        <Link to="/" aria-label="ANUYORA — home" data-testid="header-logo-link" className="shrink-0">
          <Wordmark />
        </Link>
        <nav aria-label="Primary" data-testid="nav-desktop" className="hidden items-center gap-5 md:flex lg:gap-8">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} data-testid={`nav-link-${item.id}`}
              className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/contact" data-testid="header-cta-lets-talk" className="btn-primary hidden !px-4 !py-3 md:inline-flex lg:!px-5">
          Let’s Talk <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}