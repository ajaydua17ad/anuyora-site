import { Eyebrow, CTAButton } from "@/components/Elements";
import { FadeUp } from "@/components/Reveal";

const PRINCIPLES = [
  ["Your workflow comes first", "We align with your systems, documentation and ways of working—not a one-size-fits-all package."],
  ["Clear scope. Clear responsibilities.", "We agree on what we handle, what stays with your team and how work moves between us."],
  ["Support behind the scenes", "For accounting firms, communication stays with your internal team unless we agree otherwise."],
];

export const HomeApproach = () => (
  <section data-testid="why-anuyora" className="bg-navy-deep text-navy-text">
    <div className="wrap section-space grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Eyebrow n="02" tone="light">Why ANUYORA</Eyebrow>
        <FadeUp><h2 data-testid="home-approach-heading" className="section-title mt-6">Your team,<br /><em className="text-slate-300">extended.</em></h2></FadeUp>
        <FadeUp delay={0.08}>
          <p className="mt-6 max-w-sm text-sm leading-7 text-slate-300 md:text-base">Outsourcing should make your operation easier to manage—not add another layer of complexity.</p>
          <CTAButton to="/how-we-work" tone="light" testid="home-approach-link" className="mt-8">Our Approach</CTAButton>
        </FadeUp>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        {PRINCIPLES.map(([title, copy], i) => <FadeUp key={title} delay={i * 0.06}>
          <div data-testid={`home-principle-${i + 1}`} className="border-t border-white/20 py-6">
            <h3 className="font-sans text-base font-medium text-white md:text-lg">{title}</h3>
            <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300">{copy}</p>
          </div>
        </FadeUp>)}
      </div>
    </div>
  </section>
);