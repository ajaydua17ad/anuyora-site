import Seo from "@/components/Seo";
import Faq from "@/components/Faq";
import { Eyebrow, CTAButton } from "@/components/Elements";
import { FadeUp } from "@/components/Reveal";
import { PageIntro } from "@/components/PageIntro";

const STEPS = [
  {
    n: "01",
    title: "Understand",
    copy: "We start by learning about your business, your requirements, your workload and the processes you already follow. Before anything begins, we make sure we understand how work actually moves through your team.",
  },
  {
    n: "02",
    title: "Define",
    copy: "We agree on the scope of work, responsibilities and ways of working. This includes what ANUYORA handles, what stays with your team and how communication happens between us.",
  },
  {
    n: "03",
    title: "Integrate",
    copy: "We align with your accounting systems, documentation and workflow. QuickBooks is currently supported, with additional accounting and workflow platforms considered according to client requirements.",
  },
  {
    n: "04",
    title: "Deliver",
    copy: "Your agreed bookkeeping work moves into recurring delivery. Work is completed to the agreed scope and structure, with communication staying within the channels we have defined together.",
  },
  {
    n: "05",
    title: "Evolve",
    copy: "As your requirements change, the scope and level of support can change with them. Support can scale up or down as your volume and priorities shift.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What bookkeeping services does ANUYORA provide?",
    a: "ANUYORA provides monthly bookkeeping, transaction recording and categorization, bank and credit-card reconciliations, journal entries, accounts payable and receivable support, cleanup and catch-up bookkeeping, month-end close support and financial reporting, including Profit & Loss, Balance Sheet and Cash Flow statements.",
  },
  {
    q: "Who does ANUYORA work with?",
    a: "US accounting firms, CPA practices, bookkeeping firms and growing small and mid-sized businesses that want dependable outsourced bookkeeping support.",
  },
  {
    q: "Can ANUYORA work as an extension of our accounting firm?",
    a: "Yes. We can work behind the scenes as part of your firm’s delivery operation, communicating primarily with your internal team and following your existing processes and workflows.",
  },
  {
    q: "Will you communicate directly with our clients?",
    a: "Not unless it is agreed as part of the engagement. By default, we work with your firm’s internal team and follow the communication structure you define.",
  },
  {
    q: "What accounting software does ANUYORA work with?",
    a: "QuickBooks is currently supported, with additional accounting and workflow platforms considered according to client requirements.",
  },
  {
    q: "How do we get started?",
    a: "Start with a conversation. Tell us about your business, your current setup and the work you’re considering outsourcing. From there, we’ll define scope and ways of working before delivery begins.",
  },
];

export default function HowWeWork() {
  return (
    <div data-testid="page-how-we-work">
      <Seo
        title="How ANUYORA Works | Bookkeeping Outsourcing"
        description="ANUYORA takes a structured approach to outsourced bookkeeping: understand, define, integrate, deliver and evolve — working within your existing systems and workflow."
        path="/how-we-work"
      />

      <PageIntro id="hww" label="How We Work" title={<>Your workflow.<br /><em>Our starting point.</em></>}>
        <p>Good outsourcing starts with clear responsibilities. We take the time to understand your team, define the scope and agree on how we’ll work together—before recurring delivery begins.</p>
      </PageIntro>

      <section data-testid="hww-steps" className="wrap pb-16 md:pb-20">
        {STEPS.map((step, i) => (
          <FadeUp key={step.n} delay={0.03 * i} y={18}>
            <div
              data-testid={`hww-step-${i + 1}`}
              className="grid gap-3 border-t border-hairline py-7 md:grid-cols-12 md:gap-8 md:py-9"
            >
              <span className="font-serif text-2xl text-slate-500 md:col-span-2" aria-hidden="true">
                {step.n}
              </span>
              <h2 data-testid={`hww-step-title-${i + 1}`} className="font-sans text-base font-semibold text-ink md:col-span-4 md:text-lg">
                {step.title}
              </h2>
              <p className="max-w-xl text-sm leading-7 text-inksoft md:col-span-6">
                {step.copy}
              </p>
            </div>
          </FadeUp>
        ))}
      </section>

      <section data-testid="hww-dedicated" className="bg-navy-deep text-navy-text">
        <div className="wrap section-space grid gap-8 lg:grid-cols-12 lg:items-end">
          <FadeUp className="lg:col-span-7">
            <p className="eyebrow !text-slate-300">Extended Support</p>
            <h2 data-testid="hww-dedicated-heading" className="section-title mt-6 max-w-xl">
              Need dedicated capacity?
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300">
              Accounting firms with recurring volume can discuss a dedicated bookkeeping-support
              model designed to work within the firm’s existing processes.
            </p>
          </FadeUp>
            <FadeUp delay={0.1} className="lg:col-span-5 lg:justify-self-end">
              <CTAButton to="/contact" tone="light" testid="hww-dedicated-cta">
                Talk About Your Workflow
              </CTAButton>
            </FadeUp>
        </div>
      </section>

      <section data-testid="hww-faq" className="wrap section-space grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
        <Eyebrow>FAQ</Eyebrow>
        <FadeUp delay={0.05}>
          <h2 data-testid="faq-heading" className="section-title mt-6">
            Common questions.
          </h2>
        </FadeUp>
        </div>
        <FadeUp delay={0.1} className="lg:col-span-8">
          <Faq items={FAQ_ITEMS} />
        </FadeUp>
      </section>
    </div>
  );
}
