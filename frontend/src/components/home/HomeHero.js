import { CTAButton, ArrowLink } from "@/components/Elements";
import { FadeUp } from "@/components/Reveal";
import { HeroAudiences } from "@/components/home/HeroAudiences";

export const HomeHero = () => (
  <section data-testid="hero-section">
    <div className="hero-stage" data-testid="hero-photographic-section">
      <picture className="hero-photograph" data-testid="hero-workspace-photo">
        <source media="(max-width: 767px)" srcSet="/images/advisory-workspace-small.webp" />
        <img src="/images/advisory-workspace.webp" width={1800} height={1013}
          alt="Professionals discussing documents in a bright business workspace"
          fetchPriority="high" decoding="async" data-testid="hero-workspace-image" />
      </picture>
      <div className="hero-reading-surface" aria-hidden="true" />
      <div className="wrap hero-layout">
        <div className="hero-copy">
          <FadeUp y={12}>
            <p data-testid="hero-brand" className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-bold text-navy">ANUYORA</span><span aria-hidden="true" className="h-px w-6 bg-slate-300" />Your Global Finance Partner
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 data-testid="hero-heading" className="page-heading mt-6">
              Bookkeeping that works like part of <em>your team.</em>
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p data-testid="hero-description" className="body-copy mt-6 max-w-xl">
              Outsourced bookkeeping for US accounting firms, CPA practices and growing businesses.
              More capacity for the work that matters, within the systems and processes you already use.
            </p>
          </FadeUp>
          <FadeUp delay={0.24} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <CTAButton to="/contact" testid="hero-primary-cta">Start a Conversation</CTAButton>
            <ArrowLink to="/services" testid="hero-secondary-link">Explore Our Services</ArrowLink>
          </FadeUp>
        </div>
      </div>
    </div>
    <HeroAudiences />
  </section>
);