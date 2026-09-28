import Seo from "@/components/Seo";
import { Eyebrow } from "@/components/Elements";
import { FadeUp, MaskLines } from "@/components/Reveal";

export default function About() {
  return (
    <div data-testid="page-about">
      <Seo
        title="About ANUYORA | Your Global Finance Partner"
        description="ANUYORA is an India-based finance outsourcing business supporting accounting firms and growing businesses with a focused bookkeeping operation."
        path="/about"
      />

      <section data-testid="about-hero" className="wrap pt-20 pb-16 md:pt-28 md:pb-20">
        <Eyebrow>About</Eyebrow>
        <h1 className="mt-8 max-w-3xl font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          <MaskLines lines={["A focused approach to", { text: "finance outsourcing.", em: true }]} />
        </h1>
        <div className="mt-10 max-w-2xl space-y-5 text-base leading-relaxed text-inksoft md:text-lg">
          <FadeUp delay={0.5} y={16}>
            <p>
              ANUYORA is an India-based finance outsourcing business supporting accounting firms
              and growing businesses.
            </p>
          </FadeUp>
          <FadeUp delay={0.6} y={16}>
            <p className="font-serif text-xl italic text-ink md:text-2xl">
              We’re beginning with bookkeeping for a reason.
            </p>
          </FadeUp>
          <FadeUp delay={0.7} y={16}>
            <p>
              It’s recurring, operationally important work that many accounting firms and
              businesses need additional capacity to manage well.
            </p>
          </FadeUp>
          <FadeUp delay={0.8} y={16}>
            <p>
              Instead of launching with a long list of unrelated services, we’re building ANUYORA
              around a focused bookkeeping operation—from transaction processing and reconciliations
              through month-end and financial reporting.
            </p>
          </FadeUp>
        </div>
      </section>

      <section data-testid="about-statement" className="bg-navy-deep text-navy-text">
        <div className="wrap py-24 md:py-32">
          <FadeUp>
            <p className="eyebrow !text-slate-400">What We Believe</p>
          </FadeUp>
          <div className="mt-10 space-y-2 font-serif text-3xl leading-[1.2] tracking-tight md:text-5xl">
            <FadeUp delay={0.05} y={22}>
              <p>Understand how you work.</p>
            </FadeUp>
            <FadeUp delay={0.15} y={22}>
              <p className="italic text-slate-300">Define where we can help.</p>
            </FadeUp>
            <FadeUp delay={0.25} y={22}>
              <p>Become a dependable extension of the operation.</p>
            </FadeUp>
          </div>
          <div className="mt-16 grid gap-8 border-t border-navy-border pt-10 md:grid-cols-2">
            <FadeUp delay={0.1}>
              <p className="max-w-md text-base leading-relaxed text-slate-300">
                For accounting firms, that can mean additional capacity behind the scenes.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="max-w-md text-base leading-relaxed text-slate-300">
                For businesses, it can mean a bookkeeping function that doesn’t have to be built
                entirely in-house.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      <section data-testid="about-close" className="wrap py-24 md:py-32">
        <FadeUp>
          <p className="font-serif text-4xl tracking-tight text-ink md:text-5xl">ANUYORA</p>
          <p className="mt-4 font-serif text-2xl italic text-inksoft md:text-3xl">
            Your Global Finance Partner.
          </p>
        </FadeUp>
      </section>
    </div>
  );
}
