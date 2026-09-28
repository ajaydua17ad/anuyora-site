import { CTAButton, Eyebrow } from "@/components/Elements";
import { FadeUp } from "@/components/Reveal";

export const PageCTA = ({ id, title, children, label = "Start a Conversation" }) => (
  <section data-testid={`${id}-cta`} className="border-t border-hairline bg-[#f3f6f9]">
    <div className="wrap section-space">
      <Eyebrow>Let’s Talk</Eyebrow>
      <div className="mt-6 grid items-end gap-8 lg:grid-cols-12">
        <FadeUp className="lg:col-span-8">
          <h2 data-testid={`${id}-cta-heading`} className="section-title max-w-2xl text-ink">{title}</h2>
          {children && <p className="body-copy mt-5 max-w-xl">{children}</p>}
        </FadeUp>
        <FadeUp delay={0.1} className="lg:col-span-4 lg:justify-self-end">
          <CTAButton to="/contact" testid={`${id}-cta-button`}>{label}</CTAButton>
        </FadeUp>
      </div>
    </div>
  </section>
);