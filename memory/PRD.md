# ANUYORA — Product Requirements Document

## Original Problem Statement
Build a polished, production-ready B2B website for ANUYORA, an India-based finance outsourcing brand launching with a focused bookkeeping offering ("Your Global Finance Partner."). Audience: US accounting firms, CPA practices, bookkeeping firms, and growing SMBs. Position as a dependable extension of the client's finance team — not cheap offshore labor. No fabricated claims (no stats, testimonials, certifications, client logos, years in business). Deep navy/white/light neutral palette, premium editorial typography, restraint over busyness. Five homepage sections max; supporting pages for Services, How We Work, About, Contact; FAQ; minimal footer with clearly-marked contact placeholders; full SEO metadata; responsive at desktop/tablet/mobile; accessible; restrained animation.

## User Choices (from conversation)
- Contact form: store submissions in backend database + email notification via Emergent-managed Resend. Notification recipient (OWNER_EMAIL) intentionally deferred — enquiries save with `email_notification: "skipped"` until the owner supplies an inbox.
- Logo: typographic wordmark approved (no logo file was found in the workspace; user asked to use uploaded logo unaltered — swap in when provided).
- ChatGPT integration: "Ask ANUYORA" AI concierge answering visitor questions grounded strictly in site content (GPT-5.4 via Emergent LLM key, streaming SSE).
- PayPal: skipped (nothing to buy yet).

## Architecture
- Frontend: React (CRA) + Tailwind, react-router-dom (5 routes + 404), framer-motion (masked line reveals, FadeUp), lenis smooth scroll, Seo component (title/description/OG/canonical per route), Editorial form styles, FAQ via native details/summary, slow editorial marquee, sticky header with mobile overlay menu, concierge widget.
- Backend: FastAPI on :8001 (/api prefix). POST /api/contact (Pydantic validation, honeypot, per-IP rate limit, MongoDB `enquiries` collection, Resend email when OWNER_EMAIL set). POST /api/chat (grounded system prompt, GPT-5.4 streaming SSE, per-IP rate limit, messages persisted in `chat_messages`). Legacy /api/status kept for platform probes.
- Design system: Playfair Display (headings) + Manrope (body); paper #FDFDFC, navy #061224 / #0A192F, accent blue #1E3A8A; hairline dividers; sharp corners; grain overlay; ledger-line hero motif; reduced-motion respected.

## Implemented (2026-09-28)
- Home: hero (masked line reveal, parallax geometric motif), service-terms marquee, 4-service asymmetric grid, navy "Your team, extended." section, 5-step process list, final CTA.
- Services: 9-row editorial service list incl. reporting sub-items, QuickBooks note, "Built around the way you work." CTA.
- How We Work: 5 expanded steps, "Need dedicated capacity?" navy panel, 6-question FAQ.
- About: brief copy + navy belief statement block + close.
- Contact: validated form (name/email/company/website optional/client-type pills/9 multi-select pills/message), honeypot, success + error states, sensitive-info note, "What happens next" aside.
- Header/footer/nav/mobile menu, SEO per-page titles/descriptions/OG, favicon.svg monogram, robots.txt, sitemap.xml (placeholder domain), JSON-LD Organization schema.
- Concierge widget with streaming answers; backend verified via curl; all pages verified via screenshots (desktop 1440 + mobile 390).

## Refinement pass (2026-09-28, user-directed)
- Removed "Ask ANUYORA" concierge widget (UI + /api/chat backend route + related imports).
- Removed scrolling service marquee; removed faint hero line-art, ledger rules and parallax.
- Hero rebuilt as balanced single-column editorial composition; subtle brand wave motif (echoes logo) above the meta line.
- Final CTA trimmed to headline + one invite line + button (no repeated positioning copy).
- Footer: all placeholder contact/legal copy removed; minimal logo + tagline + nav + copyright only.
- Navigation: full nav + Let's Talk CTA visible from 768px up; hamburger only below 768px.
- Headings now use text-wrap: balance (no hard-coded line breaks; MaskLines removed).
- Services page: Software note integrated as editorial row (card removed); 01–09 list unchanged.
- About page: redundant sign-off removed; closing CTA ("Let's talk about the work you're managing.") added.
- Small text raised to slate-500+ on light backgrounds (WCAG AA); contact form: aria-describedby errors, role=alert, radiogroup/group roles, role=status success panel.
- Verified at 1440 / 768 / 390 across all five pages; no horizontal overflow; backend contact endpoint re-verified after chat removal.

## Personas
- US CPA firm owner: wants behind-the-scenes delivery capacity, communicates with internal team only.
- SMB owner: wants a bookkeeping function without building it in-house.
- Bookkeeping firm with recurring volume: dedicated support model.

## Backlog
- P0: Set OWNER_EMAIL (enquiry email alerts); logo: exact uploaded ANUYORA logo now live in header/footer and used (cropped mark) as favicon.
- P1: Real contact details in footer (email/phone/address); Privacy Policy + Terms pages; final domain in sitemap/canonicals.
- P1: Additional accounting platform integrations as clients require.
- P2: Future service lines (tax, payroll, advisory) — architecture allows adding, do not activate now.
- P2: Insights/blog — explicitly deferred by brief.
