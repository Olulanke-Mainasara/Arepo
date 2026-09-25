# Arepo Solutions website

A rebuild of arepo.com. Nine routes, responsive, WCAG AA, prerendered to
static HTML at build time.

Arepo Solutions Ltd builds web-based database software for the UK transport
industry: bus, rail, aviation, parking and enforcement.

## Commands

```bash
npm install
npm run dev          # dev server
npm run build        # prerenders 9 routes + writes sitemap.xml and sw.js
npm run typecheck    # react-router typegen && tsc
npm run lint         # oxlint
npm run check:contrast   # asserts the shipped colour tokens meet WCAG AA
npm run icons        # re-renders the app icons from the logo vector (needs Chrome)
```

`npm run build` emits static files to `build/client`. There is no runtime
server. Deploy the folder to any static host.

## Stack

Vite 8 · React 19 (React Compiler enabled) · TypeScript 6 · React Router 8 in
framework mode (`ssr: false` + `prerender`) · Tailwind CSS 4 · GSAP 3 · oxlint.

### Node version

React Router 8.4 declares `engines.node >= 22.22.0`. On older Node you will see
`EBADENGINE` warnings and an "Oops, Node vX detected" banner during install,
typegen and build. **These are warnings only**; everything works. Upgrade Node
to 22.22+ to silence them.

## Where things live

```text
react-router.config.ts   ssr:false, the nine prerendered paths
app/root.tsx             HTML shell, header/footer, Organization JSON-LD
app/routes.ts            route manifest
app/app.css              Tailwind entry + the @theme design tokens
app/routes/              one file per route (loader + meta + component)
app/data/                all site content, as typed fixtures
app/lib/                 content.ts, contact.ts, seo.ts, motion.ts, serviceWorker.ts
app/sw.js                the service worker; the build fills in its precache list
app/components/ui/       primitives with no content knowledge
app/components/sections/ composed sections
scripts/                 contrast guard, sitemap, service worker and icon builders
```

### Content

All copy lives in `app/data/`. Components never import fixtures directly;
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
after a simulated delay. Replace that one function body with a real POST; the
signature, the validation and the UI do not change.

The form uses a honeypot field plus a minimum fill time instead of a CAPTCHA.
Keep both; they cost nothing and they work server-side too.

## Offline and install (PWA)

The site installs as an app and works offline. `public/manifest.webmanifest`
names it and points at the icons; `app/sw.js` is the service worker.

The Vite PWA plugins can't precache a React Router prerendered build: they
run before the HTML is written. So `npm run build` finishes with
`scripts/build-sw.mjs`, which walks `build/client`, like the sitemap script,
and writes `build/client/sw.js` with every built file in its precache list
and a hash of their contents as its version. A deploy that changes any file
installs a new worker; one that changes nothing does not.

- **Pages and `.data`** are network first, so visitors always get the
  current deploy. Offline, or after 3 seconds without an answer, the worker
  serves the precached copy.
- **Scripts, fonts and images** are served from the cache.
- A new worker takes over as soon as it has precached the new build, and
  deletes the old one's cache.

The worker registers in production only. To try it, `npm run build &&
npm start`, then look under DevTools › Application.

The app icons are the wordmark on brand navy, rendered from
`app/components/ui/logoPaths.ts`. When the original logo SVG arrives (open
question 4), swap it in and run `npm run icons`.

## Deployment note

Because unmatched paths resolve client-side, configure the host to serve
`build/client/index.html` for its 404 so the styled not-found page renders.

Service workers need HTTPS (localhost is exempt). Don't give `sw.js` a
long `Cache-Control` max-age; `no-cache` is safest.

## Open questions for the client

These are gaps in the source material, left empty rather than invented:

1. **Founding year contradicts itself.** Every page says "Formed in London in
   1998"; the footer badge says "25 YEARS / 1999–2024". Both cannot be right,
   and the badge is stale regardless. The site derives everything from
   `foundedYear: 1998` in `app/data/company.ts`. Confirm which is correct.
2. **Image resolution.** Every image is the file the live site serves, saved
   in `public/images`: client logos 109 to 200px wide, home banners 964×324,
   product banners 465×156 with text set into them. They are shown no larger
   than that. Ask for larger originals, and SVGs of the client logos.
4. **Logo vector.** The logo is traced from the live site's 200×80 header
   image (`app/components/ui/logoPaths.ts`, 99.3% pixel match) and its
   tagline is that image's own pixels. Ask for the original SVG and swap it
   into `app/components/ui/Wordmark.tsx`.
5. **Testimonials.** Five quotes are taken from the live testimonials pages,
   some shortened (see `app/data/testimonials.ts`). The full pages have more.

## Out of scope

Deferred from the live site: individual case study pages, news index and
articles, the full Our Clients page (around 70 logos), and the online
database benefit pages (Key Benefits, Value For Money, Revenue Enhancements,
Cost Savings). The legal pages (Disclaimer, Privacy, Terms and Conditions,
Cookie Policy) link out to the live site until they are rebuilt here;
Sitemap renders as unlinked text.

Also out of scope: backend, CMS, email delivery, the Google Translate
widget, and any test suite.
