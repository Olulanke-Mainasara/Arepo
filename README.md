# Arepo Solutions — website

A rebuild of arepo.co.uk. Nine routes, responsive, WCAG AA, prerendered to
static HTML at build time.

Arepo Solutions Ltd builds web-based database software for the UK transport
industry — bus, rail, aviation, parking and enforcement.

## Commands

```bash
npm install
npm run dev          # dev server
npm run build        # prerenders 9 routes + writes sitemap.xml
npm run typecheck    # react-router typegen && tsc
npm run lint         # oxlint
npm run check:contrast   # asserts the shipped colour tokens meet WCAG AA
```

`npm run build` emits static files to `build/client`. There is no runtime
server — deploy the folder to any static host.

## Stack

Vite 8 · React 19 (React Compiler enabled) · TypeScript 6 · React Router 8 in
framework mode (`ssr: false` + `prerender`) · Tailwind CSS 4 · GSAP 3 · oxlint.

### Node version

React Router 8.4 declares `engines.node >= 22.22.0`. On older Node you will see
`EBADENGINE` warnings and an "Oops, Node vX detected" banner during install,
typegen and build. **These are warnings only** — everything works. Upgrade Node
to 22.22+ to silence them.

## Where things live

```text
react-router.config.ts   ssr:false, the nine prerendered paths
app/root.tsx             HTML shell, header/footer, Organization JSON-LD
app/routes.ts            route manifest
app/app.css              Tailwind entry + the @theme design tokens
app/routes/              one file per route (loader + meta + component)
app/data/                all site content, as typed fixtures
app/lib/                 content.ts, contact.ts, seo.ts, motion.ts
app/components/ui/       primitives with no content knowledge
app/components/sections/ composed sections
scripts/                 contrast guard, sitemap generator
```

### Content

All copy lives in `app/data/`. Components never import fixtures directly —
they go through the async getters in `app/lib/content.ts`, which is the seam a
CMS would replace. Route `loader`s call those getters, and because every route
is prerendered, loaders run at build time and the HTML ships with real content.

### Design tokens

`app/app.css` defines the palette under `@theme`. Brand navy `#002D56` and
brand cyan `#00BCE4` are the client's exact hexes and must not change.

**The one rule that matters:** brand cyan measures 2.25:1 on white, against a
WCAG AA requirement of 4.5:1. It is never used as text on a light background.
Use `cyan-700` `#007A94` (4.99:1) for that; brand cyan is for fills, rules,
borders and text on navy. `npm run check:contrast` enforces this.

## Adding real photography

No photography has been sourced. Every image slot is declared in
`app/data/images.ts` with its aspect ratio, the subject a real photo should
show, and its alt text. `<Figure>` renders a flat navy placeholder at the
declared ratio until a file exists.

To add one: drop the file in `app/assets/`, import it, and set `src` on the
matching slot. Nothing else changes and no layout shifts.

## Wiring up a real contact form

`app/lib/contact.ts` exports `submitContactForm`, which currently resolves
after a simulated delay. Replace that one function body with a real POST — the
signature, the validation and the UI do not change.

The form uses a honeypot field plus a minimum fill time instead of a CAPTCHA.
Keep both; they cost nothing and they work server-side too.

## Deployment note

Because unmatched paths resolve client-side, configure the host to serve
`build/client/index.html` for its 404 so the styled not-found page renders.

## Open questions for the client

These are gaps in the source material, left empty rather than invented:

1. **Founding year contradicts itself.** Every page says "Formed in London in
   1998"; the footer badge says "25 YEARS / 1999–2024". Both cannot be right,
   and the badge is stale regardless. The site derives everything from
   `foundedYear: 1998` in `app/data/company.ts`. Confirm which is correct.
2. **Testimonials.** The live site links to a testimonials page, but none of
   its copy was available. `app/data/testimonials.ts` is an empty array and the
   carousel renders nothing. Supply the quotes and it appears.
3. **Client logos.** No logo files were supplied, so the logo wall and client
   grid set names as type. This is Arepo's strongest asset — SVGs would make a
   real difference.
4. **Logo vector.** The `arepo.` wordmark is reproduced in Archivo as an
   approximation. Ask for the original SVG; it is a one-component swap in
   `app/components/ui/Wordmark.tsx`.
5. **Per-product deployment.** The live site describes deployment only in
   general terms ("deployed on your servers or provided as hosted solutions"),
   never per product, so the comparison table has no deployment column. If the
   detail exists, it is one field in `app/data/products.ts`.

## Out of scope

Deferred from the live site: individual case study pages, news index and
articles, and standalone Our Clients / Development Tools / Our Approach /
Careers / Support pages, plus the legal pages (Disclaimer, Terms and
Conditions, Cookie Policy, Sitemap). These render as unlinked text in the
footer rather than pointing somewhere misleading. Privacy links out to the
live site, because the contact form's consent checkbox must reference a real
policy.

Also out of scope: backend, CMS, email delivery, photography, the Google
Translate widget, and any test suite.
