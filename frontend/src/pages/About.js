import Seo from "@/components/Seo";
import { PageIntro } from "@/components/PageIntro";
import { PageCTA } from "@/components/PageCTA";
import { Eyebrow } from "@/components/Elements";
import { FadeUp } from "@/components/Reveal";

export default function About() {
  return (
    <div data-testid="page-about">
      <Seo title="About ANUYORA | Your Global Finance Partner" description="Based in Delhi, India, ANUYORA provides focused bookkeeping support for US accounting firms, CPA practices and growing businesses." path="/about" />
      <PageIntro id="about" label="About ANUYORA" title={<>A focused approach to <em>finance outsourcing.</em></>}>
        <p>Based in Delhi, India, ANUYORA supports US accounting firms and growing businesses with the recurring bookkeeping work behind a well-run finance operation.</p>
      </PageIntro>
      <section data-testid="about-focus" className="wrap pb-16 md:pb-20">
        <div className="grid gap-6 border-t border-hairline pt-8 lg:grid-cols-12 lg:gap-12">
          <FadeUp className="lg:col-span-5"><h2 data-testid="about-focus-heading" className="section-title max-w-sm">Bookkeeping.<br /><em className="text-navy-mid">With a clear purpose.</em></h2></FadeUp>
          <FadeUp delay={0.08} className="space-y-5 body-copy lg:col-span-6 lg:col-start-7">
            <p>Accurate, organized books are operationally important. They’re also recurring work that many firms and businesses need additional capacity to manage well.</p>
            <p>That’s our focus: transaction processing, reconciliations, accounts payable and receivable, month-end close and financial reporting. A defined scope of work, built around the processes you already use.</p>
          </FadeUp>
        </div>
      </section>
      <section data-testid="about-statement" className="bg-navy-deep text-navy-text">
        <div className="wrap section-space">
          <Eyebrow tone="light">What We Believe</Eyebrow>
          <FadeUp><h2 data-testid="about-belief-heading" className="section-title mt-7 max-w-3xl">Understand the work.<br /><em className="text-slate-300">Build the support around it.</em></h2></FadeUp>
          <div className="mt-10 grid gap-8 border-t border-white/20 pt-8 md:grid-cols-2 md:gap-16">
            <FadeUp>
              <h3 className="font-sans text-base font-semibold">For accounting firms</h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">Additional delivery capacity behind the scenes, working with your internal team and following your existing workflows.</p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h3 className="font-sans text-base font-semibold">For growing businesses</h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">Support for an agreed bookkeeping scope, without having to build the entire function in-house.</p>
            </FadeUp>
          </div>
        </div>
      </section>
      <PageCTA id="about" title="Let’s talk about the work you’re managing.">A conversation about your business is the best place to start.</PageCTA>
    </div>
  );
}