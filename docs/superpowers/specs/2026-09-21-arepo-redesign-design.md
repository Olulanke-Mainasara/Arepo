# Arepo Solutions — frontend redesign

**Date:** 2026-09-21
**Status:** approved, ready for implementation planning

## 1. What this is

A complete frontend rebuild of arepo.co.uk. The existing site is a fixed-width
three-column layout (sidebar nav + body + dark right rail) with no responsive
behaviour, 11px body type, and cyan link text that fails WCAG contrast. All
content is being carried over; none of the markup is.

The repository is a bare Vite + React 19 starter, so this is a build from
scratch against content recovered from five full-page screenshots of the live
site.

### Decisions taken

| Decision | Choice |
|---|---|
| Build mode | UI-only, backend-ready. Typed fixtures, async content getters, mock form submit. No DB or infra. |
| Brand scope | Straight modernisation. Wordmark and both brand hexes unchanged; only their *roles* change. |
| Page scope | 9 routes: 5 original pages + a detail page per product. |
| Stack | Stay in the existing Vite 8 / React 19 repo. React Router 8 in **framework mode** (`@react-router/dev`) with `ssr: false` + `prerender`, for per-route static HTML. |
| Styling | Tailwind 4 with a hand-authored `@theme` token layer. |
| Direction | "Infrastructure software" — minimalistic/saas, after Neon, Supabase, Conntour. |
| IA | Sector-led entry, platform-backed proof. |
| Imagery | Typed placeholder figures plus an image manifest. No stock sourcing. |
| Tests | None. Verification is typecheck + oxlint + production build. |

## 2. Why the current site needs replacing

Three problems, in priority order.

**Accessibility.** Brand cyan `#00BCE4` on white measures 2.25:1. WCAG AA
requires 4.5:1 for body text. The live site uses that cyan for every link,
every product heading, "Get in touch" and "Sales & Support". The contact page
additionally gates its only conversion point behind a distorted-text CAPTCHA
with no audio or non-visual alternative, failing WCAG 1.1.1. Arepo supplies the
Metropolitan Police and public-sector transport bodies; UK public sector
procurement leans on WCAG 2.2 AA.

**No responsive behaviour.** The layout is fixed-width with three columns. On a
phone it renders as a zoomed-out desktop page.

**Buried assets.** Arepo's credibility rests on a blue-chip client list (First
Bus, Go-Ahead, Arriva, Stagecoach, Metropolitan Police, LNER, Metroline,
Transport UK London Bus, Saba, Briffa, Dor&Co), nearly three decades of trading
since 1998, ISO 9001:2015 registration, and four named products. All of it currently sits below
the fold, at small sizes, or inside a right rail that repeats the same phone
number three times per page.

## 3. Design system

### 3.1 Colour

Both brand hexes are preserved exactly. The derived stops exist to make them
usable.

| Token | Hex | Contrast | Role |
|---|---|---|---|
| `navy-950` | `#000F1C` | 19.35 : white | Deepest ground — hero, footer, final CTA |
| `navy-900` | `#00182E` | 17.95 : white | Section bands, cards on dark |
| `navy-800` | `#002D56` | 13.91 : white | **Brand navy.** Body text on light; primary dark surface |
| `navy-700` | `#003566` | 12.34 : white | Hover states, borders on dark |
| `navy-600` | `#004B8F` | 8.74 : white | Secondary text on light |
| `cyan-400` | `#33DBFF` | 8.42 on navy-800 | Bright accent, dark backgrounds only |
| `cyan-500` | `#00BCE4` | 6.17 on navy-800 | **Brand cyan.** Fills, rules, borders, text *on navy* |
| `cyan-700` | `#007A94` | 4.99 : white | The only cyan permitted as text on light |
| `paper` | `#F6F8FA` | — | Light band ground |
| `white` | `#FFFFFF` | — | Card surfaces on light bands |

**Binding rule:** cyan below `cyan-700` never appears as text on a light
background. Brand `cyan-500` expresses itself as fills, rules, borders and
on-navy text.

No gradients anywhere — flat fills only. No glassmorphism.

### 3.2 Typography

Two families, self-hosted via Fontsource. Self-hosting rather than the Google
Fonts CDN is deliberate: CDN font loading has been ruled a GDPR violation in
the EU, and Arepo sells to UK public bodies.

- **Archivo Variable** (`@fontsource-variable/archivo`) — display and body.
  Headlines set large at regular/medium weight, not bold-and-small. Tracking
  `-0.02em` above 32px.
- **Geist Mono Variable** (`@fontsource-variable/geist-mono`) — operational
  metadata only: stat figures, ISO certificate number, company number, phone
  number, sector tags, comparison-table data.

Fluid scale via `clamp()`: 64 / 48 / 36 / 28 / 22 / 18 / 16 / 14 / 12.
Body is 18px. Measure capped at 68ch.

**No all-caps eyebrow labels.** Section openers use a two-tone sentence: the
first clause in `navy-800`, the continuation in `navy-600`. One sentence, two
weights of emphasis. This replaces the kicker pattern used by the Conntour and
Supabase references.

### 3.3 Motion

GSAP 3 with ScrollTrigger, every timeline built inside `gsap.matchMedia()` so
`prefers-reduced-motion: reduce` receives a no-op rather than a disabled
animation.

Permitted: section reveal on scroll (12px rise + fade, 0.5s, 60ms stagger),
logo wall marquee, stat counter, testimonial carousel. Not permitted: pinning,
scroll-jacking, parallax. Procurement buyers skim.

### 3.4 Components

`Button` (solid navy / outline / cyan-on-navy), `Link`, `SectionHeading`
(two-tone), `StatFigure`, `ProductCard`, `SectorCard`, `LogoWall`, `FeatureRow`,
`Accordion`, `TestimonialCarousel`, `Breadcrumb`, `Field`, `Figure`
(placeholder-aware), `Nav` (desktop + mobile drawer), `Footer`.

No `<Seo>` component: React Router framework mode supplies per-route `meta`
exports, rendered by `<Meta />` in `root.tsx`. `lib/seo.ts` provides the
builders those exports call.

## 4. Information architecture

Sector-led entry, platform-backed proof. Visitors arrive identifying by mode of
operation, not by product name — "Tracerit" and "Inkara" mean nothing cold.

Nav stays: Home · Services · Products · About Us · Contact Us.

### Sector → product mapping

| Sector | Primary product | Secondary |
|---|---|---|
| Bus & Coach | Tracerit | Inkara (revenue protection) |
| Rail | Inkara (revenue protection) | Tracerit |
| Aviation | GOSS | — |
| Parking & Enforcement | Inkara | — |
| IP & Legal | Cautus | — |

Five sectors over four products; Inkara legitimately serves two.

### Routes

```text
/                       Home
/services               Services
/products               Products index
/products/tracerit      Tracerit®
/products/inkara        Inkara
/products/goss          GOSS
/products/cautus        Cautus
/about                  About Us
/contact                Contact Us
*                       404
```

## 5. Page structures

### 5.1 Home

1. **Hero** — full-bleed darkened transport photography, left-aligned headline
   at regular weight. Contains one live element: a sector selector ("I run…")
   with five options routing into the matching product page. This is the
   Conntour hero-input device applied to something functional.
2. **Logo wall** — greyscale marquee of the eleven named clients.
3. **Sectors** — five cards, each naming the operational problem, routing to
   its product.
4. **The Arepo Platform** — two-tone heading, the RAD story, and the six
   guarantees as a dense 6-up row on navy: Rapid Development (auto-generated
   database applications), Reliable & Flexible (automated development
   processes), Scalable & Robust (easily manages changes in your business
   requirements), Efficiently Evolve (designed and built for change), Optimised
   For Growth (new features added regularly), No Unforeseen Costs (fixed price
   confidence).
5. **Stats** — mono figures: founded 1998 · ISO 9001:2015 · 11 named clients ·
   4 products in service.

   Note: the live site carries a "25 YEARS / 1999–2024" badge. Founded 1998,
   that reads 28 years as of 2026, and the badge is two years stale either way.
   The redesign states "Founded 1998" and derives any year count at runtime,
   so it cannot go stale again. Flag the discrepancy to the client — 1998 and
   1999 cannot both be right.
6. **Products** — asymmetric bento, Tracerit and Inkara large, GOSS and Cautus
   small.
7. **Capabilities** — bespoke software solutions, business rules analysis,
   integration and migration, data security and encryption, legacy system
   upgrades, disaster recovery.
8. **Testimonials** — carousel with peeking neighbours.
9. **Final CTA** on `navy-950`.
10. **Footer** — nav, legal links, address, ISO line.

### 5.2 Services

Compact navy hero → five pillars as alternating full-bleed image/text bands
(Online Databases, Bespoke Software, Legacy Systems, CMS Integration, Key
Benefits covering Value For Money / Revenue Enhancements / Cost Savings) → the
six guarantees → process as numbered steps with oversized mono numerals
(consultancy → system development → installation → training → support) → CTA.

### 5.3 Products index

Hero → bento of four with sector tags → comparison table in mono → CTA.

Comparison table columns: **product · sectors served · module groups · mobile
app · live site**. Every one of these is derivable from content the live site
already publishes. Deliberately *not* included: deployment model, pricing and
integration lists — the live site states deployment only in general terms
("deployed on your servers or provided as hosted solutions") and never
per-product, so a per-product column there would be invented. If the client
confirms the per-product detail, the column is a one-line addition to
`data/products.ts`.

The comparison table is new. It is what a procurement officer wants and the
current site never provides.

### 5.4 Product detail (one template, four instances)

Breadcrumb → hero (name, positioning line, sector tags, link to the live
product site) → full-bleed photography band → **modules as a grouped
accordion** → who it's for → related case study → cross-sell → CTA.

The accordion is the substantive fix. Inkara currently presents roughly twenty
bullets from three unrelated audiences as one undifferentiated list. Grouped,
it becomes three collapsible sections.

Product content:

- **Tracerit®** — `tracerit.com`. Transport Operations Database. Software for
  public transport providers: incident and accident management; CCTV incident
  recording and tracking; asset management of on-vehicle hardware; driver risk
  assessment and analysis; automated driving licence management for compliance;
  integration with customer service solutions.
- **Inkara** — `inkara.com`. Parking, Environmental Enforcement and Revenue
  Protection. Three module groups:
  - *Car Park Operators*: pre-booking; online sales for e-tickets and season
    tickets; Parking Charge Notices and enforcement; proof-of-presence staff
    patrols; equipment and estate fault management.
  - *Environmental Enforcement*: mobile app to issue Fixed Penalty Notices;
    configurable FPN management (littering, dog fouling, fly tipping,
    commercial waste); back office suite for management and reporting;
    escalation of unpaid fines to magistrates courts; generation of Single
    Justice Packs and collation of evidence; Google Maps integration for
    hotspot reporting.
  - *Train & Bus Revenue Protection*: mobile app to issue Unpaid Fare Notices
    and travel irregularities; integrated postcode and electoral roll
    validation; back office suite; escalation to magistrates courts;
    Single Justice Pack generation.
- **GOSS** — `ground-ops.com`. The Ground Operations Software System, for
  aviation ground services providers: incident recording for ISAGO; ramp and
  flight watch audits; centralised SOP repository; operational delay recording;
  airside passenger and crew transport. Related case study: dnata UK.
- **Cautus** — `cautus.co.uk`. Online Trade Mark management, for TM attorneys:
  trade mark management; design registrations; domain name management; patents.

### 5.5 About Us

Hero → the story (formed in London 1998; solutions for clients from individuals
and start-ups to blue-chip multinationals; refined RAD process via the Arepo
Platform; browser-based database solutions at a fraction of traditional bespoke
time and cost) → stats → Our Approach (numbered) → Development Tools / the
Platform → full client logo grid → three case study cards (Bespoke Software,
Legacy Software Upgrade, Aviation Services) → accreditation block with ISO
9001:2015 and company number 20042411 in mono → careers teaser → CTA.

### 5.6 Contact Us

Split layout: form on the paper band, contact details and a static map on navy.

Fields: Name (required), Telephone, Email (required), Message, privacy policy
consent (required), marketing opt-in.

**The CAPTCHA is removed.** Replaced by a honeypot field plus a
time-to-submit threshold — invisible, requires no backend, and is what survives
when a real endpoint is added.

Validation is inline on blur, with `aria-invalid` and `aria-describedby` on each
field and an error summary that receives focus on submit failure.

Contact data: +44 (0)20 7280 4390 · Unit W107, Vox Studios, 1–45 Durham Street,
Vauxhall, London SE11 5JH · nearest station Vauxhall.

## 6. Architecture

React Router framework mode dictates the top-level shape: an `app/` directory,
`app/root.tsx` as the HTML shell, and `app/routes.ts` as the route manifest.

```text
react-router.config.ts    ssr: false, prerender: [9 paths]
vite.config.ts            tailwindcss() + reactRouter() + babel()
app/
  root.tsx                html shell, <Meta>/<Links>, ErrorBoundary
  routes.ts               route manifest
  app.css                 tailwind entry + @theme token layer
  routes/                 home services products product about contact
  data/                   products sectors clients services testimonials
                          caseStudies company navigation images types
  lib/                    content.ts  getProducts/getProductBySlug — async
                          contact.ts  submitContactForm(): Promise<Result>
                          seo.ts
  components/             ui/  sections/
```

Route data arrives through React Router `loader` exports rather than
component-level fetching. This is load-bearing: under `ssr: false` a `loader`
is only permitted on a route that is pre-rendered — which all nine are — and it
runs **at build time**, so the emitted HTML contains real content rather than a
loading state. Component-level `await` would have prerendered nine pages of
spinners.

### The backend-ready seam

Every content getter in `lib/content.ts` is `async` despite resolving a local
array. Components `await` them. Swapping in a CMS later changes that one file
and touches no component.

`submitContactForm` has the same shape: it currently resolves after a simulated
800ms delay and returns a discriminated `Result`. Pointing it at a real endpoint
is a single-file change.

### Images

No photography is sourced. `data/images.ts` is a typed manifest — one entry per
slot, carrying aspect ratio, subject description and alt text. `<Figure>` reads
the manifest and renders a flat `navy-900` placeholder at the correct aspect
ratio with the subject description visible in development. When real files
arrive, they are added to the manifest entry and `<Figure>` renders them with no
layout shift.

### Dependencies added

Runtime: `react-router@8`, `@react-router/node@8`, `gsap@3`,
`@fontsource-variable/archivo@5`, `@fontsource-variable/geist-mono@5`.
Build: `@react-router/dev@8`, `tailwindcss@4`, `@tailwindcss/vite@4`.

Not added: `@react-router/serve` and `isbot`, which the official template
carries only for a runtime server. With `ssr: false` there is no server.

`vite-react-ssg` was evaluated and rejected — it peers on
`react-router-dom@^6.14.1`, a package React Router 7 merged away, and its own
README directs v7+ users to React Router's built-in pre-rendering.

**React Compiler is at risk.** `reactRouter()` performs its own JSX transform
and exposes no Babel escape hatch, so the compiler cannot be configured through
it. The repo's existing `@rolldown/plugin-babel` runs as a *standalone* plugin
rather than nested inside `@vitejs/plugin-react`, so it may continue to work
alongside `reactRouter()`. Task 1 verifies this empirically. If the two
conflict, React Compiler is dropped, `@rolldown/plugin-babel`,
`babel-plugin-react-compiler` and `@babel/core` are removed, and that is
recorded — the redesign does not depend on it.

oxlint and the TypeScript config stay, with tsconfig extended for the
`.react-router/types` generated directory and the `~/*` path alias.

## 7. SEO

All nine routes prerender to static HTML. Per-route title, description,
canonical and Open Graph tags come from each route's `meta` export, built by
helpers in `lib/seo.ts`. JSON-LD: `Organization` sitewide, `SoftwareApplication`
per product page. `sitemap.xml` and `robots.txt` are emitted into `public/`.

The current site carries a Google Translate widget on every page, indicating
international search matters to Arepo. Static HTML per route serves that; a
client-rendered SPA would not.

## 8. Verification

No test suite. Each stage verified by:

- `npm run typecheck` (`react-router typegen && tsc`) — clean
- `npm run lint` (oxlint) — clean
- `npm run build` (`react-router build`) — succeeds and emits nine `.html`
  files under `build/client`, each containing real rendered copy rather than a
  loading state. Verified by grepping the built HTML for page-specific text.
- Contrast ratios in §3.1 recomputed and asserted against the shipped token
  values
- Manual check at 375px, 768px, 1440px

## 9. Out of scope

Deferred sub-pages from the live site's sidebars: individual case study pages,
news index and articles, dedicated Our Clients / Development Tools / Our
Approach / Careers / Support pages, and legal pages (Disclaimer, Privacy, Terms
and Conditions, Cookie Policy, Sitemap).

Deferred destinations are **not** linked to `/` — a link that silently goes
somewhere else is worse than no link. Each deferred item is listed in
`data/navigation.ts` with `status: 'deferred'`, and the footer renders those as
plain unlinked text. The one exception is the privacy policy, which the contact
form's consent checkbox must reference for the consent to mean anything: that
link points at the live site's existing privacy page until a local route
exists. The careers teaser on About links to `/contact` rather than a careers
page.

Also out of scope: real backend, CMS, email delivery, photography sourcing,
the Google Translate widget, and any test suite.
