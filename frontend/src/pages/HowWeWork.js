import Seo from "@/components/Seo";
import Faq from "@/components/Faq";
import { Eyebrow, CTAButton } from "@/components/Elements";
import { FadeUp, MaskLines } from "@/components/Reveal";

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

      <section data-testid="hww-hero" className="wrap pt-20 pb-16 md:pt-28 md:pb-20">
        <Eyebrow>How We Work</Eyebrow>
        <h1 className="mt-8 max-w-3xl font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          <MaskLines
            lines={["We fit into your workflow—", { text: "not the other way around.", em: true }]}
          />
        </h1>
        <FadeUp delay={0.5} y={18}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-inksoft md:text-lg">
            Outsourcing works best when responsibilities are clear from the beginning.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-inksoft md:text-lg">
            ANUYORA takes a structured approach to understanding how your team works before
            recurring delivery begins.
          </p>
        </FadeUp>
      </section>

      <section data-testid="hww-steps" className="wrap pb-8">
        {STEPS.map((step, i) => (
          <FadeUp key={step.n} delay={0.03 * i} y={18}>
            <div
              data-testid={`hww-step-${i + 1}`}
              className="grid gap-3 border-t border-hairline py-9 last:border-b md:grid-cols-12 md:gap-8 md:py-12"
            >
              <span className="font-serif text-3xl italic text-slate-300 md:col-span-2 md:text-4xl">
                {step.n}
              </span>
              <h2 className="font-serif text-2xl tracking-tight text-ink md:col-span-4 md:text-[1.65rem]">
                {step.title}
              </h2>
              <p className="max-w-xl text-[15px] leading-relaxed text-inksoft md:col-span-6">
                {step.copy}
              </p>
            </div>
          </FadeUp>
        ))}
      </section>

      <section data-testid="hww-dedicated" className="wrap py-20 md:py-28">
        <FadeUp>
          <div className="bg-navy-deep px-8 py-14 text-navy-text md:px-16 md:py-20">
            <p className="eyebrow !text-slate-400">Extended Support</p>
            <h2 className="mt-6 max-w-xl font-serif text-3xl leading-[1.15] tracking-tight md:text-4xl">
              Need dedicated capacity?
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300">
              Accounting firms with recurring volume can discuss a dedicated bookkeeping-support
              model designed to work within the firm’s existing processes.
            </p>
            <div className="mt-10">
              <CTAButton to="/contact" tone="light" testid="hww-dedicated-cta">
                Talk About Your Workflow
              </CTAButton>
            </div>
          </div>
        </FadeUp>
      </section>

      <section data-testid="hww-faq" className="wrap pb-24 md:pb-32">
        <Eyebrow>FAQ</Eyebrow>
        <FadeUp delay={0.05}>
          <h2 className="mt-6 font-serif text-3xl tracking-tight text-ink md:text-4xl">
            Common questions.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1} className="mt-10">
          <Faq items={FAQ_ITEMS} />
        </FadeUp>
      </section>
    </div>
  );
}
