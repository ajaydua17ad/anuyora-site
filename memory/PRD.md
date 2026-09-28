# ANUYORA — Product Requirements & Current State

## Original Problem Statement
Build a polished, production-ready B2B website for ANUYORA, a finance outsourcing brand serving US accounting firms, CPA practices, bookkeeping firms and growing SMBs. Required pages: Home, Services, How We Work, About, Contact. Responsive typography, spacing, navigation, interactions, SEO and accessible mobile layouts. Contact enquiries must save to MongoDB and trigger an email alert. Professional, credible advisory-firm feel rather than cheap BPO or generic SaaS styling; deep navy, refined blue, white/off-white and generous but purposeful whitespace.

## Non-negotiable User Choices
- Actual service scope is bookkeeping: monthly books, categorization, reconciliations, journal entries, AP/AR, cleanup/catch-up, month-end close and reporting. Do not invent tax/payroll/CFO/audit services.
- Preserve the user's processed transparent logo and favicon. Do not overwrite these with raw uploads.
- Add a small top-right **™**, not ®: trademark registration is pending and the user explicitly agreed that ™ makes sense.
- Do not restore the removed chatbot, marquee or curved squiggle; no fabricated statistics, certifications, testimonials, staff profiles or client logos.
- No empty legal links or placeholder copy. Legal pages await real copy.
- Public email: **contact@anuyora.com**. Phone: **+919968941798** (display +91 99689 41798). Location: **Delhi, India**.
- **Owner notifications intentionally go to anuyora@gmail.com.** The provider rejected contact@anuyora.com as undeliverable; user explicitly said: “Yes keep anuyora@gmail.com for now and we will activate contact@anuyora later.” Do not change the recipient until activation is confirmed.

## Latest Approved Design Direction (2026-09-28)
- User requested an overall professional design audit and smooth animations.
- Hero right-hand audience list felt detached; first replaced with workspace photography and audience links beneath.
- User rejected the rectangular placement as abrupt, then supplied https://www.globalfpo.com/ as a competitor reference.
- User explicitly approved: an integrated photographic hero, clearer paths for accounting/CPA firms vs SMBs, scannable services/process/consultation CTAs, and preservation of ANUYORA's brand and true bookkeeping scope.
- Current hero uses a full-width photographic composition with a white reading surface, NOT the earlier detached or feathered image. Desktop photograph is integrated behind the section; at widths <=1100px it stacks edge-to-edge below copy. Three explanatory audience pathways sit beneath it.
- Global FPO is a structural reference only; no competitor assets, copy, metrics, credentials or team claims were reused. Photography is independently sourced illustrative Unsplash imagery, not ANUYORA employees.

## Architecture
- Frontend: React 19 / CRA + Tailwind + react-router-dom, Playfair Display headings / Manrope body, lucide icons, Framer Motion restrained reveals, Lenis smooth wheel scrolling with native touch scrolling and live reduced-motion support.
- Shared components: Header, Footer, Wordmark, ContactDetails, PageIntro, PageCTA, Elements, Reveal, Seo, Radix/shadcn FAQ and mobile Sheet.
- Home split into small components under `src/components/home/`: HomeHero, HeroAudiences, HomeServices, HomeApproach, HomeProcess.
- Contact logic in `src/hooks/useEnquiry.js`, components under `src/components/contact/`, choices in `src/constants/enquiry.js`, public contact/nav constants in `src/constants/site.js`.
- Backend: FastAPI on existing port 8001, MongoDB via protected MONGO_URL/DB_NAME, managed Resend integration. Frontend requests use REACT_APP_BACKEND_URL only.
- Email proxy uses existing server-side managed credentials and required EMAIL_FROM_NAME. Delivery is asynchronous within the request; failed notifications do not discard enquiries.
- `backend/rate_limit.py`: atomic Mongo sliding-window limiter, max 5 valid contact requests/600 seconds per client. TTL index on expires_at. Trusted-proxy XFF traversal from right to left, configured by TRUSTED_PROXY_CIDRS; ignore untrusted caller-supplied leftmost hops.
- No login/admin accounts, payments, chat or AI integration.

## Pages & Flows Implemented
1. **Home**: integrated photo-led hero and two main CTAs; three audience links that preselect enquiry type; four icon-led service groups linked to exact Services anchors; QuickBooks support note; navy working-principles section; five-stage process; final consultation CTA. Five main sections preserved.
2. **Services**: nine anchored services, clear editorial rows, accurate software note, consistent final CTA.
3. **How We Work**: five expanded steps, full-width dedicated-support band, six accessible animated FAQ items.
4. **About**: confident but factual focused-bookkeeping positioning, Delhi/US audience context, firm/business distinction, no fabricated team credentials.
5. **Contact**: accessible required fields, optional website, native radio/checkbox choices, limits aligned with backend, first-invalid focus, disabled pending state, timeout and error recovery, success/reference/reset state, direct contact details, next steps.
- Header/footer trademark and responsive logos, tablet navigation, keyboard skip link, per-route focus handling, responsive 404, unique interactive test IDs, accurate Organization contact metadata.
- Source logos/favicons unchanged. Current photo: `public/images/advisory-workspace.webp` (1800px) and `advisory-workspace-small.webp` (900px), with source notes in `public/images/credits.md`.

## API / Database
- `GET /api/`: basic API identity.
- `GET /api/status`, `POST /api/status`: legacy platform status routes.
- `POST /api/contact`: Pydantic validation, persistent rate limit, honeypot, Mongo insertion and owner notification. Typed response excludes Mongo ObjectIds.
- `enquiries`: enquiry_id, name, email, company, website, client_type, services[], message, created_at, email_notification, email_id, notification_recipient; internal Mongo _id is not returned.
- `rate_limits`: hashed client key, at most five accepted timestamps, allowed flag, expires_at TTL datetime.
- Notification state `sent` means provider accepted the request, not independent confirmation of inbox placement.

## Audit Fixes Completed (2026-09-28)
- Unified page spacing/type hierarchy, reduced oversized empty sections, clearer scan patterns and consultation routes.
- Upgraded contact visibility and all header/footer/mobile logo marks to ™.
- Replaced inaccessible button-based radio/checkbox patterns with native controls; improved field contrast, focus, validation, sending/error/success states.
- Added live reduced-motion handling and cleaned up Lenis lifecycle.
- Fixed mobile Sheet background scroll, Escape, focus handling, same-route navigation and rapid reopening.
  - Final root cause: passive route-close effect plus retained closing overlay could intercept quick reopen taps.
  - Final implementation: synchronous useLayoutEffect route-close, SheetContent mounted only while open, closing overlay pointer-events none, opacity-only entrance. Do not restore stale exit overlays or slide-out transforms without testing rapid reopen.
- Restored Gmail alerts with explicit user permission after new mailbox rejection; persisted provider ID/status and recipient.
- Replaced volatile in-memory rate limiting with atomic shared Mongo state and trusted ingress identity parsing.

## Verification
- Optimized frontend build passed after the integrated hero update; Python compilation/API health passed.
- Iteration 1: found new-mailbox failure and volatile rate limiting; both addressed.
- Iteration 2: verified real Gmail notification acceptance + DB persistence. Verified enquiry `2309770a-b74d-45b2-8d04-9bb1a4d58aab`, nonempty provider email_id, recipient Gmail. Do not resend unnecessarily.
- Iteration 3: proxy identity tests, page layouts, forms, FAQ, reduced motion and menu coverage. Backend suite 9 passed / 5 skipped due shared preview rate-limit saturation. Browser-only response interception tested success/error/reset states; **no mocked app API**.
- Iteration 4: current integrated hero, images, three audience preselects, service anchors and contact details passed across 320/390/768/1024/1440/1920; reported tablet/menu follow-ups.
- Iteration 5: tablet stacking <=1100px, no overflow, FAQ keyboard and reduced motion passed; rapid menu reopening still flaky.
- **Iteration 6: final mobile fix passed all 5 repeated open → Services → immediate reopen → same-route close cycles, plus Escape/X/focus return. Dialog and overlay unmount consistently. No remaining product bug reported.**
- Reports: `/app/test_reports/iteration_1.json` through `iteration_6.json`; backend tests in `/app/backend/tests/`.
- Last menu fix verified live through testing agent after the most recent compiled build; no dependencies changed.

## Prioritized Remaining Work
### P0
- None identified in the completed scope. Public business mailbox remains intentionally inactive; Gmail alerts and database capture work.
### P1 — Owner Input / Next Actions
- Activate contact@anuyora.com, verify mail receipt, then explicitly approve switching OWNER_EMAIL away from Gmail.
- Supply real leadership/working-hours/security-process details if they should appear. Do not invent them.
- Confirm final public site domain for canonical URLs/sitemap; current canonical follows site origin.
### P2 — Future / Backlog
- Privacy Policy and Terms once legal copy is provided.
- Genuine client case study/testimonial with permission to strengthen US-buyer trust.
- Additional accounting platforms only when actual support is confirmed.
- Insights/blog and additional service lines remain deferred; do not add by default.

## Handoff Notes
- Respond in English. Current preview must always be read from frontend/.env; never reuse a stale preview URL.
- `/app/memory/test_credentials.md` documents public test access and the correct temporary owner inbox (no auth credentials exist).
- Keep existing supervisor service ports/configuration and protected .env keys. TRUSTED_PROXY_CIDRS is environment-specific and must reflect trusted ingress, not arbitrary public clients.
- User has not yet confirmed the final integrated hero visually. Offer further adjustments if requested; do not revert to the detached/airbrushed rectangle.