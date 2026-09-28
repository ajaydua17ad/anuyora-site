import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, ArrowLeftRight, Receipt, ChartColumn } from "lucide-react";
import { Eyebrow, ArrowLink } from "@/components/Elements";
import { FadeUp } from "@/components/Reveal";

const SERVICES = [
  { title: "Monthly bookkeeping", copy: "Keep transactions recorded, categorized and ready for review.", anchor: "monthly-bookkeeping", Icon: BookOpen },
  { title: "Reconciliations", copy: "Keep bank and credit-card accounts aligned with your statements.", anchor: "reconciliation", Icon: ArrowLeftRight },
  { title: "Accounts payable & receivable", copy: "Bring structure to bills, invoices, payments and receivables.", anchor: "accounts-payable", Icon: Receipt },
  { title: "Month-end & reporting", copy: "Close the month with organized books and recurring financial reports.", anchor: "month-end-close", Icon: ChartColumn },
];

export const HomeServices = () => (
  <section data-testid="home-services" className="border-t border-hairline bg-[#f3f6f9]">
    <div className="wrap section-space">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Eyebrow n="01">What We Do</Eyebrow>
          <FadeUp><h2 data-testid="home-services-heading" className="section-title mt-6 max-w-lg">The work behind well-maintained books.</h2></FadeUp>
        </div>
        <FadeUp delay={0.08} className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="body-copy">From everyday transactions to month-end reporting, focused support for the financial work that keeps business moving.</p>
        </FadeUp>
      </div>
      <div className="mt-10 grid gap-x-10 md:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-x-7">
        {SERVICES.map((service, i) => <FadeUp key={service.title} delay={i * 0.05}>
          <Link to={`/services#${service.anchor}`} data-testid={`home-service-card-${i + 1}`} className="service-preview group">
            <div className="flex items-center justify-between text-navy-mid"><service.Icon size={24} strokeWidth={1.35} aria-hidden="true" /><ArrowUpRight size={18} className="service-arrow" aria-hidden="true" /></div>
            <h3 className="mt-5 min-h-[56px] font-serif text-xl leading-7 text-ink group-hover:text-navy-mid">{service.title}</h3>
            <p className="mt-3 text-sm leading-7 text-inksoft">{service.copy}</p>
          </Link>
        </FadeUp>)}
      </div>
      <FadeUp className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-hairline pt-6">
        <ArrowLink to="/services" testid="home-services-cta">View All Bookkeeping Services</ArrowLink>
        <p data-testid="home-software-support" className="text-sm leading-6 text-inksoft">Working in QuickBooks? We can fit into your existing setup.</p>
      </FadeUp>
    </div>
  </section>
);