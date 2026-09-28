import Seo from "@/components/Seo";
import { Eyebrow, CTAButton } from "@/components/Elements";
import { FadeUp } from "@/components/Reveal";

const SERVICES = [
  {
    title: "Monthly Bookkeeping",
    copy: "Ongoing recording and organization of your financial activity, kept current and ready for review.",
  },
  {
    title: "Transaction Categorization",
    copy: "Every transaction classified consistently against your chart of accounts, so your reports carry real meaning.",
  },
  {
    title: "Bank & Credit-Card Reconciliation",
    copy: "Accounts matched and aligned against statements, with discrepancies flagged and resolved.",
  },
  {
    title: "Journal Entries",
    copy: "Adjusting and recurring entries prepared and documented to support an accurate set of books.",
  },
  {
    title: "Accounts Payable",
    copy: "Bills, payments and supplier records kept organized and up to date.",
  },
  {
    title: "Accounts Receivable",
    copy: "Invoices, receipts and receivables tracked so nothing is left unrecorded or overlooked.",
  },
  {
    title: "Cleanup & Catch-Up",
    copy: "Backlog and untidy books brought current, ready to move onto a steady monthly rhythm.",
  },
  {
    title: "Month-End Close",
    copy: "Structured close support that keeps your monthly cycle on schedule.",
  },
  {
    title: "Financial Reporting",
    copy: "Recurring reports prepared from your books, including Profit & Loss statements, Balance Sheets and Cash Flow statements.",
  },
];

export default function Services() {
  return (
    <div data-testid="page-services">
      <Seo
        title="Outsourced Bookkeeping Services | ANUYORA"
        description="ANUYORA provides outsourced bookkeeping services: monthly bookkeeping, reconciliations, AP and AR, journal entries, cleanup and catch-up, month-end close and financial reporting."
        path="/services"
      />

      <section data-testid="services-hero" className="wrap pt-20 pb-16 md:pt-28 md:pb-20">
        <Eyebrow>Services</Eyebrow>
        <FadeUp delay={0.15} y={20}>
          <h1 className="mt-8 max-w-3xl text-balance font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Bookkeeping support built <em className="italic">around your workflow.</em>
          </h1>
        </FadeUp>
        <FadeUp delay={0.3} y={18}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-inksoft md:text-lg">
            Every business handles its books differently. That’s why ANUYORA starts with the work
            that needs to be done rather than forcing clients into a predefined package.
          </p>
        </FadeUp>
      </section>

      <section data-testid="services-list" className="wrap pb-8">
        {SERVICES.map((service, i) => (
          <FadeUp key={service.title} delay={0.03 * i} y={18}>
            <div
              data-testid={`service-row-${i + 1}`}
              className="group grid gap-3 border-t border-hairline py-9 last:border-b md:grid-cols-12 md:items-baseline md:gap-8 md:py-11"
            >
              <span className="font-serif text-sm italic text-slate-500 md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-serif text-2xl tracking-tight text-ink transition-colors duration-300 group-hover:text-navy-mid md:col-span-5 md:text-[1.65rem]">
                {service.title}
              </h2>
              <p className="max-w-xl text-[15px] leading-relaxed text-inksoft md:col-span-6">
                {service.copy}
              </p>
            </div>
          </FadeUp>
        ))}
      </section>

      <section data-testid="services-software" className="wrap pb-8">
        <FadeUp>
          <div className="grid gap-3 border-t border-hairline py-9 md:grid-cols-12 md:items-baseline md:gap-8 md:py-11">
            <p className="eyebrow md:col-span-5 md:col-start-2">Software</p>
            <p className="max-w-xl text-[15px] leading-relaxed text-inksoft md:col-span-6 md:col-start-7">
              QuickBooks is currently supported, with additional accounting and workflow platforms
              considered according to client requirements.
            </p>
          </div>
        </FadeUp>
      </section>

      <section data-testid="services-cta" className="wrap py-24 md:py-32">
        <FadeUp>
          <h2 className="max-w-2xl font-serif text-4xl leading-[1.12] tracking-tight text-ink md:text-5xl">
            Built around the way you work.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-inksoft md:text-lg">
            Whether you are an accounting firm looking for additional delivery capacity or a
            business looking to outsource recurring bookkeeping, we’ll define a scope around what
            you actually need.
          </p>
        </FadeUp>
        <FadeUp delay={0.2} className="mt-10">
          <CTAButton to="/contact" testid="services-cta-button">
            Discuss Your Requirements
          </CTAButton>
        </FadeUp>
      </section>
    </div>
  );
}
