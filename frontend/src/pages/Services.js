import Seo from "@/components/Seo";
import { PageIntro } from "@/components/PageIntro";
import { PageCTA } from "@/components/PageCTA";
import { FadeUp } from "@/components/Reveal";

const SERVICES = [
  {
    id: "monthly-bookkeeping",
    title: "Monthly Bookkeeping",
    copy: "Ongoing recording and organization of your financial activity, kept current and ready for review.",
  },
  {
    title: "Transaction Categorization",
    id: "transaction-categorization",
    copy: "Every transaction classified consistently against your chart of accounts, so your reports carry real meaning.",
  },
  {
    title: "Bank & Credit-Card Reconciliation",
    id: "reconciliation",
    copy: "Accounts matched and aligned against statements, with discrepancies flagged and resolved.",
  },
  {
    title: "Journal Entries",
    id: "journal-entries",
    copy: "Adjusting and recurring entries prepared and documented to support an accurate set of books.",
  },
  {
    title: "Accounts Payable",
    id: "accounts-payable",
    copy: "Bills, payments and supplier records kept organized and up to date.",
  },
  {
    title: "Accounts Receivable",
    id: "accounts-receivable",
    copy: "Invoices, receipts and receivables tracked so nothing is left unrecorded or overlooked.",
  },
  {
    title: "Cleanup & Catch-Up",
    id: "cleanup-catch-up",
    copy: "Backlog and untidy books brought current, ready to move onto a steady monthly rhythm.",
  },
  {
    title: "Month-End Close",
    id: "month-end-close",
    copy: "Structured close support that keeps your monthly cycle on schedule.",
  },
  {
    title: "Financial Reporting",
    id: "financial-reporting",
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

      <PageIntro id="services" label="Services" title={<>Bookkeeping support built <em>around your workflow.</em></>}>
          <p>
            Every business handles its books differently. That’s why ANUYORA starts with the work
            that needs to be done rather than forcing clients into a predefined package.
          </p>
      </PageIntro>

      <section data-testid="services-list" className="wrap pb-4">
        {SERVICES.map((service, i) => (
          <FadeUp key={service.title} delay={0.03 * i} y={18}>
            <div
              id={service.id}
              data-testid={`service-row-${i + 1}`}
              className="grid scroll-mt-32 gap-3 border-t border-hairline py-7 md:grid-cols-12 md:items-baseline md:gap-6 md:py-8"
            >
              <span className="text-xs text-slate-500 md:col-span-1" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 data-testid={`service-title-${i + 1}`} className="font-sans text-base font-semibold text-ink md:col-span-5 md:text-lg">
                {service.title}
              </h2>
              <p className="max-w-xl text-sm leading-7 text-inksoft md:col-span-6">
                {service.copy}
              </p>
            </div>
          </FadeUp>
        ))}
      </section>

      <section data-testid="services-software" className="wrap pb-12 md:pb-16">
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

      <PageCTA id="services" title="The right scope. Not a preset package." label="Discuss Your Requirements">
        Additional delivery capacity for your firm, or recurring bookkeeping for your business. Let’s define what you need.
      </PageCTA>
    </div>
  );
}
