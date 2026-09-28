import { Eyebrow, ArrowLink } from "@/components/Elements";
import { FadeUp } from "@/components/Reveal";

const STEPS = [
  ["Understand", "Your requirements, workload and existing processes."],
  ["Define", "An agreed scope, responsibilities and communication plan."],
  ["Integrate", "Support aligned with your accounting systems and workflow."],
  ["Deliver", "Recurring bookkeeping, within the structure we’ve agreed."],
  ["Evolve", "A level of support that can adapt as your needs change."],
];

export const HomeProcess = () => (
  <section data-testid="how-it-works" className="wrap section-space">
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <Eyebrow n="03">How It Works</Eyebrow>
          <FadeUp><h2 data-testid="home-process-heading" className="section-title mt-6">Simple to start.<br />Built around you.</h2></FadeUp>
          <FadeUp delay={0.08}><ArrowLink to="/how-we-work" testid="how-it-works-link" className="mt-7">See How We Work</ArrowLink></FadeUp>
        </div>
      </div>
      <div className="lg:col-span-7">
        {STEPS.map(([title, copy], i) => <FadeUp key={title} delay={i * 0.03}>
          <div data-testid={`how-it-works-step-${i + 1}`} className="flex gap-6 border-t border-hairline py-6 md:gap-8">
            <span className="pt-1 text-xs text-slate-500" aria-hidden="true">0{i + 1}</span>
            <div><h3 className="font-serif text-xl text-ink">{title}</h3><p className="mt-2 text-sm leading-7 text-inksoft">{copy}</p></div>
          </div>
        </FadeUp>)}
      </div>
    </div>
  </section>
);