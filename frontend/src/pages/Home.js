import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Seo from "@/components/Seo";
import Marquee from "@/components/Marquee";
import { Eyebrow, CTAButton, ArrowLink } from "@/components/Elements";
import { FadeUp, MaskLines } from "@/components/Reveal";

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

function HeroMotif() {
  return (
    <svg viewBox="0 0 420 420" fill="none" aria-hidden="true" className="h-auto w-full">
      <rect x="10" y="10" width="400" height="400" stroke="#0F172A" strokeOpacity="0.14" />
      <rect x="58" y="58" width="304" height="304" stroke="#0F172A" strokeOpacity="0.1" />
      <rect x="106" y="106" width="208" height="208" stroke="#0F172A" strokeOpacity="0.07" />
      <path d="M10 410 A 400 400 0 0 1 410 10" stroke="#061224" strokeOpacity="0.22" />
      <path d="M106 410 A 304 304 0 0 1 410 106" stroke="#061224" strokeOpacity="0.14" />
      <rect x="206" y="206" width="8" height="8" fill="#061224" />
      <line x1="410" y1="410" x2="214" y2="214" stroke="#0F172A" strokeOpacity="0.16" />
    </svg>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const motifY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -56]);

  return (
    <div data-testid="page-home">
      <Seo
        title="Outsourced Bookkeeping for Accounting Firms | ANUYORA"
        description="ANUYORA provides outsourced bookkeeping support for accounting firms and growing businesses, from reconciliations and AP/AR to month-end reporting."
        path="/"
      />

      {/* SECTION 1 — HERO */}
      <section
        ref={heroRef}
        data-testid="hero-section"
        className="relative flex min-h-[92vh] items-center overflow-hidden"
      >
        <div className="hero-rules pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="wrap relative grid items-center gap-16 py-24 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-8 flex items-center gap-4 opacity-0 [animation:fade-in_0.8s_ease_0.9s_forwards]">
              <span className="h-px w-10 bg-slate-300" aria-hidden="true" />
              <p className="eyebrow">Your Global Finance Partner</p>
            </div>
            <h1 className="font-serif text-[2.75rem] leading-[1.06] tracking-tight text-ink sm:text-6xl lg:text-[4.6rem]">
              <MaskLines
                baseDelay={0.15}
                lines={[
                  "Bookkeeping that",
                  "works like part of",
                  { text: "your team.", em: true },
                ]}
              />
            </h1>
            <FadeUp delay={0.7} y={18} className="mt-9">
              <p className="max-w-xl text-base leading-relaxed text-inksoft md:text-lg">
                ANUYORA provides dependable bookkeeping support for accounting firms and growing
                businesses. We work within your processes and workflows, giving you the capacity to
                get more done without adding unnecessary complexity.
              </p>
            </FadeUp>
            <FadeUp delay={0.85} y={18} className="mt-10 flex flex-wrap items-center gap-8">
              <CTAButton to="/contact" testid="hero-primary-cta">
                Start a Conversation
              </CTAButton>
              <ArrowLink to="/services" testid="hero-secondary-link">
                Explore Our Services
              </ArrowLink>
            </FadeUp>
            <FadeUp delay={1} y={14} className="mt-16 border-t border-hairline pt-5">
              <p className="text-xs tracking-wide text-slate-400">
                India-based — supporting US accounting firms and growing businesses
              </p>
            </FadeUp>
          </div>

          <div className="hidden lg:col-span-4 lg:block">
            <motion.div style={{ y: motifY }} className="pl-10">
              <HeroMotif />
            </motion.div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* SECTION 2 — SERVICES */}
      <section data-testid="home-services" className="wrap py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow n="01">What We Do</Eyebrow>
            <FadeUp delay={0.05}>
              <h2 className="mt-6 font-serif text-4xl leading-[1.12] tracking-tight text-ink md:text-5xl">
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

        <div className="mt-16 grid gap-x-12 md:mt-20 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <FadeUp
              key={service.title}
              delay={0.05 * i}
              className={`border-t border-hairline py-10 md:py-12 ${i % 2 === 1 ? "md:mt-16" : ""}`}
            >
              <div data-testid={`home-service-card-${i + 1}`} className="group">
                <p className="font-serif text-sm italic text-slate-400">0{i + 1}</p>
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
        <div className="wrap py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow n="02" tone="light">
                Why ANUYORA
              </Eyebrow>
              <FadeUp delay={0.05}>
                <h2 className="mt-6 font-serif text-4xl leading-[1.12] tracking-tight md:text-5xl">
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
      <section data-testid="how-it-works" className="wrap py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow n="03">How It Works</Eyebrow>
              <FadeUp delay={0.05}>
                <h2 className="mt-6 font-serif text-4xl leading-[1.12] tracking-tight text-ink md:text-5xl">
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
                  className="group flex gap-8 border-t border-hairline py-8 transition-colors duration-300 md:gap-12 md:py-10"
                >
                  <span className="font-serif text-sm italic text-slate-400 transition-colors duration-300 group-hover:text-navy-mid">
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
        <div className="wrap py-28 md:py-36">
          <Eyebrow n="04">Start Here</Eyebrow>
          <FadeUp delay={0.05}>
            <h2 className="mt-8 max-w-4xl font-serif text-4xl leading-[1.1] tracking-tight text-ink md:text-6xl">
              Let’s build the right bookkeeping support around your business.
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-inksoft md:text-lg">
              Tell us what you’re managing today, where your team needs additional capacity and how
              you prefer to work.
            </p>
            <p className="mt-3 font-serif text-lg italic text-ink md:text-xl">We’ll start there.</p>
          </FadeUp>
          <FadeUp delay={0.25} className="mt-12">
            <CTAButton to="/contact" testid="final-cta-button">
              Talk to ANUYORA
            </CTAButton>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="mt-20 text-xs uppercase tracking-[0.24em] text-slate-400">
              ANUYORA — Your Global Finance Partner.
            </p>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
