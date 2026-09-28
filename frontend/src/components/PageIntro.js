import { Eyebrow } from "@/components/Elements";
import { FadeUp } from "@/components/Reveal";

export const PageIntro = ({ id, label, title, children }) => (
  <section data-testid={`${id}-hero`} className="wrap page-intro">
    <FadeUp y={12}><Eyebrow>{label}</Eyebrow></FadeUp>
    <FadeUp delay={0.08}><h1 data-testid={`${id}-heading`} className="page-heading">{title}</h1></FadeUp>
    {children && <FadeUp delay={0.16} className="mt-6 max-w-2xl body-copy">{children}</FadeUp>}
  </section>
);