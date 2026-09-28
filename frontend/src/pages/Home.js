import Seo from "@/components/Seo";
import { Eyebrow, CTAButton, ArrowLink } from "@/components/Elements";
import { FadeUp } from "@/components/Reveal";

const SERVICES = [
  {
    title: "Monthly Bookkeeping",
    copy: "Ongoing recording and organization of financial activity.",
  },
  {
    title: "Reconciliations",
    copy: "Bank and credit-card reconciliations to keep accounts aligned.",
  },
  {
    title: "Accounts Payable & Receivable",
    copy: "Support for bills, invoices, payments and receivables.",
  },
  {
    title: "Month-End & Reporting",
    copy: "Close support and preparation of recurring financial reports.",
  },
];

const STEPS = [
  { n: "01", title: "Understand", copy: "We learn about your requirements, workload and current processes." },
  { n: "02", title: "Define", copy: "We agree on scope, responsibilities and ways of working." },
  { n: "03", title: "Integrate", copy: "We align with your accounting systems, documentation and workflow." },
  { n: "04", title: "Deliver", copy: "Your agreed bookkeeping work moves into recurring delivery." },
  { n: "05", title: "Evolve", copy: "As requirements change, the scope and level of support can change with them." },
];

export default function Home() {
  return (
    <div data-testid="page-home">
      <Seo
        title="Outsourced Bookkeeping for Accounting Firms | ANUYORA"
        description="ANUYORA provides outsourced bookkeeping support for accounting firms and growing businesses, from reconciliations and AP/AR to month-end reporting."
        path="/"
      />

      {/* SECTION 1 — HERO */}
      <section data-testid="hero-section" className="relative overflow-hidden">
        <div className="wrap py-12 md:py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <FadeUp delay={0.05} y={14}>
                <div className="mb-8 flex items-center gap-4">
                  <span className="h-px w-10 bg-slate-300" aria-hidden="true" />
                  <p className="eyebrow">Your Global Finance Partner</p>
                </div>
              </FadeUp>
              <FadeUp delay={0.15} y={22}>
                <h1 className="text-balance font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  Bookkeeping that works like part of <em className="italic">your team.</em>
                </h1>
              </FadeUp>
              <FadeUp delay={0.3} y={18}>
                <p className="mt-8 max-w-xl text-base leading-relaxed text-inksoft md:text-lg">
                  ANUYORA provides dependable bookkeeping support for accounting firms and growing
                  businesses. We work within your existing processes and workflows, giving your team
                  additional capacity where it’s needed.
                </p>
              </FadeUp>
              <FadeUp delay={0.4} y={18}>
                <div className="mt-10 flex flex-wrap items-center gap-8">
                  <CTAButton to="/contact" testid="hero-primary-cta">
                    Start a Conversation
                  </CTAButton>
                  <ArrowLink to="/services" testid="hero-secondary-link">
                    Explore Our Services
                  </ArrowLink>
                </div>
              </FadeUp>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <FadeUp delay={0.5} y={16}>
                <div data-testid="hero-audiences">
                  <p className="eyebrow">Who We Support</p>
                  <ul className="mt-5 divide-y divide-hairline border-y border-hairline">
                    <li className="py-3.5 text-[15px] text-inksoft">Accounting & CPA Firms</li>
                    <li className="py-3.5 text-[15px] text-inksoft">Bookkeeping Firms</li>
                    <li className="py-3.5 text-[15px] text-inksoft">Growing Businesses</li>
                  </ul>
                </div>
              </FadeUp>
            </div>
          </div>

          <FadeUp delay={0.6} y={14}>
            <div className="mt-10 border-t border-hairline pt-5">
              <p className="text-xs font-medium tracking-wide text-slate-500">
                India-based — supporting US accounting firms and growing businesses
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SECTION 2 — SERVICES */}
      <section data-testid="home-services" className="wrap border-t border-hairline py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow n="01">What We Do</Eyebrow>
            <FadeUp delay={0.05}>
              <h2 className="mt-6 text-balance font-serif text-4xl leading-[1.12] tracking-tight text-ink md:text-5xl">
                The bookkeeping work that keeps business moving.
              </h2>
            </FadeUp>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-2">
            <FadeUp delay={0.1}>
              <p className="max-w-md text-base leading-relaxed text-inksoft">
                From everyday transactions to month-end reporting, ANUYORA supports the recurring
                financial work behind well-maintained books.
              </p>
            </FadeUp>
          </div>
        </div>

        <div className="mt-14 grid gap-x-12 md:mt-16 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <FadeUp
              key={service.title}
              delay={0.05 * i}
              className={`border-t border-hairline py-10 md:py-12 ${i % 2 === 1 ? "md:mt-16" : ""}`}
            >
              <div data-testid={`home-service-card-${i + 1}`} className="group">
                <p className="font-serif text-sm italic text-slate-500">0{i + 1}</p>
                <h3 className="mt-4 font-serif text-2xl tracking-tight text-ink transition-colors duration-300 group-hover:text-navy-mid md:text-[1.7rem]">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-inksoft">{service.copy}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-4 border-t border-hairline pt-10 md:pt-12">
          <p className="max-w-xl font-serif text-lg italic leading-relaxed text-inksoft md:text-xl">
            We also support transaction categorization, journal entries, and cleanup and catch-up
            bookkeeping.
          </p>
          <ArrowLink to="/services" testid="home-services-cta" className="mt-8">
            Explore Our Services
          </ArrowLink>
        </FadeUp>
      </section>

      {/* SECTION 3 — WHY ANUYORA */}
      <section data-testid="why-anuyora" className="bg-navy-deep text-navy-text">
        <div className="wrap py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow n="02" tone="light">
                Why ANUYORA
              </Eyebrow>
              <FadeUp delay={0.05}>
                <h2 className="mt-6 text-balance font-serif text-4xl leading-[1.12] tracking-tight md:text-5xl">
                  Your team, extended.
                </h2>
              </FadeUp>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-slate-300 lg:col-span-6 lg:col-start-7 lg:pt-2">
              <FadeUp delay={0.1}>
                <p>
                  Outsourcing should make your operation easier to manage—not create another layer
                  of complexity.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p>
                  We start with your existing workflow. Together, we define what ANUYORA will
                  handle, how work moves between teams and how communication should happen.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p>
                  For accounting firms, we can operate as an extension of your delivery team. For
                  businesses, we can take ownership of an agreed bookkeeping scope while working
                  within your existing accounting environment.
                </p>
              </FadeUp>
              <FadeUp delay={0.25}>
                <p className="border-t border-navy-border pt-8 font-serif text-2xl italic leading-snug text-navy-text md:text-3xl">
                  Your business. Your systems. Your requirements.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW IT WORKS */}
      <section data-testid="how-it-works" className="wrap py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow n="03">How It Works</Eyebrow>
              <FadeUp delay={0.05}>
                <h2 className="mt-6 text-balance font-serif text-4xl leading-[1.12] tracking-tight text-ink md:text-5xl">
                  Simple to start. Built to scale.
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <ArrowLink to="/how-we-work" testid="how-it-works-link" className="mt-8">
                  See How We Work
                </ArrowLink>
              </FadeUp>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {STEPS.map((step, i) => (
              <FadeUp key={step.n} delay={0.04 * i}>
                <div
                  data-testid={`how-it-works-step-${i + 1}`}
                  className="group flex gap-8 border-t border-hairline py-8 md:gap-12 md:py-10"
                >
                  <span className="font-serif text-sm italic text-slate-500 transition-colors duration-300 group-hover:text-navy-mid">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl tracking-tight text-ink">{step.title}</h3>
                    <p className="mt-2 max-w-md text-[15px] leading-relaxed text-inksoft">{step.copy}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — FINAL CTA */}
      <section data-testid="final-cta" className="border-t border-hairline">
        <div className="wrap py-16 md:py-24">
          <Eyebrow n="04">Start Here</Eyebrow>
          <FadeUp delay={0.05}>
            <h2 className="mt-8 max-w-3xl text-balance font-serif text-4xl leading-[1.1] tracking-tight text-ink md:text-5xl">
              Let’s build the right bookkeeping support around your business.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-inksoft md:text-lg">
              Tell us what you’re managing today and where your team needs additional capacity.
              We’ll start there.
            </p>
          </FadeUp>
          <FadeUp delay={0.25} className="mt-10">
            <CTAButton to="/contact" testid="final-cta-button">
              Talk to ANUYORA
            </CTAButton>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
