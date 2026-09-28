import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Eyebrow({ n, tone = "dark", children, className = "" }) {
  const num = tone === "light" ? "text-slate-400" : "text-slate-500";
  const rule = tone === "light" ? "bg-navy-border" : "bg-slate-300";
  const label = tone === "light" ? "text-slate-300" : "text-inksoft";
  return (
    <div className={`flex items-center gap-3 ${className}`} data-testid={`eyebrow-${String(children).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
      {n && <span className={`font-serif text-sm italic ${num}`}>{n}</span>}
      <span className={`h-px w-10 ${rule}`} aria-hidden="true" />
      <span className={`eyebrow ${label}`}>{children}</span>
    </div>
  );
}

export function CTAButton({ to, children, tone = "dark", testid, className = "" }) {
  const cls = tone === "light" ? "btn-light" : "btn-primary";
  return (
    <Link to={to} className={`${cls} group ${className}`} data-testid={testid}>
      {children}
      <ArrowRight size={15} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

export function ArrowLink({ to, children, testid, className = "" }) {
  return (
    <Link to={to} className={`arrow-link group ${className}`} data-testid={testid}>
      {children}
      <ArrowRight size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}
