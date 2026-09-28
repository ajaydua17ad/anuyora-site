import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const AUDIENCES = [
  { label: "Accounting & CPA firms", type: "CPA / Accounting Firm", copy: "Extend your delivery team, behind the scenes." },
  { label: "Bookkeeping firms", type: "Bookkeeping Firm", copy: "Add support for your recurring client workload." },
  { label: "Small & mid-sized businesses", type: "Business", copy: "Keep up with your books as your business grows." },
];

export const HeroAudiences = () => (
  <div className="border-y border-hairline bg-white">
    <nav aria-label="Bookkeeping support for your business" data-testid="hero-audiences" className="wrap grid md:grid-cols-3">
      {AUDIENCES.map((audience, i) => (
        <Link key={audience.type} to={`/contact?type=${encodeURIComponent(audience.type)}`}
          className="audience-path group" data-testid={`hero-audience-${i + 1}`}>
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-sans text-base font-semibold leading-6 text-ink">{audience.label}</h2>
            <ArrowUpRight size={19} strokeWidth={1.5} aria-hidden="true" className="shrink-0 text-navy-mid transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
          <p className="mt-2 text-sm leading-6 text-inksoft">{audience.copy}</p>
        </Link>
      ))}
    </nav>
  </div>
);