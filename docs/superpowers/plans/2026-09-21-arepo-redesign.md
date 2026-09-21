# Arepo Frontend Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace arepo.co.uk's fixed-width 2008-era three-column site with a nine-route, responsive, WCAG-AA marketing site that prerenders to static HTML.

**Architecture:** React Router 8 in framework mode with `ssr: false` and an explicit `prerender` list, so every route emits real HTML at build time. All content lives in typed fixtures under `app/data/`, reached only through async getters in `app/lib/content.ts` and surfaced to routes via React Router `loader` exports — the seam that lets a CMS replace fixtures without touching a component. Styling is Tailwind 4 driven by a hand-authored `@theme` token layer.

**Tech Stack:** Vite 8, React 19.2, TypeScript 6, React Router 8 (framework mode), Tailwind CSS 4, GSAP 3, Fontsource (Archivo Variable, Geist Mono Variable), oxlint.

**Spec:** `docs/superpowers/specs/2026-09-21-arepo-redesign-design.md`

## Global Constraints

These apply to every task. Violations are task failures.

- **Brand hexes are immutable.** Navy `#002D56`, cyan `#00BCE4`. Do not adjust them.
- **Cyan is never text on a light background** unless it is `cyan-700` `#007A94` or darker. Brand `cyan-500` is for fills, rules, borders, and text *on navy* only.
- **No gradients.** Flat fills only, everywhere, including buttons, icons, borders and backgrounds.
- **No glassmorphism.** No frosted-glass blur panels.
- **No all-caps eyebrow/kicker labels.** Section openers use the two-tone sentence device. Uppercase is permitted only for the logo wordmark.
- **No generic SaaS template structure** — no centered hero + three feature cards + logo strip.
- **No tests.** Verification per task is `npm run typecheck`, `npm run lint`, and where stated `npm run build`.
- **No photography is sourced.** Every image slot renders through `<Figure>` against `app/data/images.ts`.
- **Body text is 18px minimum.** The old site's 11px is the thing being fixed.
- **Every interactive control is keyboard reachable** with a visible focus ring using `cyan-500` on dark and `navy-800` on light.
- **All motion is wrapped in `gsap.matchMedia()`** with a `prefers-reduced-motion: reduce` branch that applies final state without animating.
- Commit after every task. End commit messages with `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.

**Environment note.** React Router 8.4 declares `engines.node >= 22.22.0`; the
build machine runs 22.17.1. Every `npm install`, `typegen` and `build` therefore
prints an `EBADENGINE` warning and a *"Oops, Node v22.17.1 detected"* banner.
**These are warnings only** — typegen emits types and the build prerenders all
nine routes correctly. Ignore them, and do not "fix" them by downgrading React
Router. Upgrading Node to 22.22+ silences them and is worth doing before
handing the repo to the client.

## File Structure

| File | Responsibility |
|---|---|
| `react-router.config.ts` | `ssr: false`, explicit nine-path `prerender` array |
| `vite.config.ts` | `tailwindcss()`, `reactRouter()`, optional `babel()` for React Compiler |
| `app/root.tsx` | HTML shell, `<Meta>`/`<Links>`, font imports, `ErrorBoundary` |
| `app/routes.ts` | Route manifest |
| `app/app.css` | Tailwind entry + `@theme` token layer + base element styles |
| `app/data/types.ts` | Every content interface. Single source of truth for shapes. |
| `app/data/*.ts` | Typed fixtures, one file per content kind |
| `app/lib/content.ts` | Async getters. The CMS seam. |
| `app/lib/contact.ts` | `validateContact`, `submitContactForm`. The backend seam. |
| `app/lib/seo.ts` | `meta` builders + JSON-LD |
| `app/lib/motion.ts` | `useReveal` hook wrapping GSAP + matchMedia |
| `app/components/ui/*` | Primitives with no content knowledge |
| `app/components/sections/*` | Composed sections that consume typed content |
| `app/routes/*.tsx` | One file per route; `loader` + `meta` + default component |
| `scripts/check-contrast.mjs` | Asserts shipped token contrast ratios |

---

### Task 1: Migrate the scaffold to React Router framework mode

Converts the Vite starter into framework mode and proves the build emits static HTML. Nothing else can be verified until this works.

**Files:**
- Create: `react-router.config.ts`, `app/root.tsx`, `app/routes.ts`, `app/app.css`, `app/routes/home.tsx`
- Modify: `vite.config.ts`, `package.json`, `tsconfig.app.json`, `tsconfig.node.json`, `.gitignore`
- Delete: `src/App.tsx`, `src/App.css`, `src/main.tsx`, `src/index.css`, `src/assets/`, `public/icons.svg`

**Interfaces:**
- Consumes: nothing.
- Produces: a working `npm run dev` / `npm run build` / `npm run typecheck`, the `~/*` → `./app/*` path alias, and `build/client/*.html` output.

- [ ] **Step 1: Install dependencies**

```bash
npm i react-router@^8.4.0 @react-router/node@^8.4.0
npm i -D @react-router/dev@^8.4.0 tailwindcss@^4.3.3 @tailwindcss/vite@^4.3.3
```

Do not install `@react-router/serve` or `isbot`. They exist for a runtime server; `ssr: false` has none.

- [ ] **Step 2: Write `react-router.config.ts`**

The nine paths are listed explicitly rather than using `prerender: true`, because `/products/:slug` is dynamic and `true` skips dynamic paths.

```ts
import type { Config } from '@react-router/dev/config'

export default {
  ssr: false,
  prerender: [
    '/',
    '/services',
    '/products',
    '/products/tracerit',
    '/products/inkara',
    '/products/goss',
    '/products/cautus',
    '/about',
    '/contact',
  ],
} satisfies Config
```

- [ ] **Step 3: Rewrite `vite.config.ts`**

`reactRouter()` replaces `@vitejs/plugin-react`. The existing `babel()` call is kept as a standalone plugin — this is the React Compiler bet described in the spec.

```ts
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import babel from '@rolldown/plugin-babel'
import { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: { tsconfigPaths: true },
})
```

- [ ] **Step 4: Update `package.json` scripts**

```json
{
  "scripts": {
    "dev": "react-router dev",
    "build": "react-router build",
    "start": "vite preview",
    "typecheck": "react-router typegen && tsc",
    "lint": "oxlint",
    "check:contrast": "node scripts/check-contrast.mjs"
  }
}
```

- [ ] **Step 5: Collapse to a single `tsconfig.json`**

Delete `tsconfig.app.json` and `tsconfig.node.json`. The starter's
project-reference split fights framework mode: plain `tsc` does not build
references (it needs `tsc -b`), and `composite` conflicts with `noEmit`. The
React Router template uses one config; match it.

Do **not** set `baseUrl` — TypeScript 6 deprecates it and errors with TS5101.
`paths` resolves relative to the tsconfig without it.

```json
{
  "include": [
    "app/**/*",
    "scripts/**/*",
    "vite.config.ts",
    "react-router.config.ts",
    ".react-router/types/**/*"
  ],
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "types": ["node", "vite/client"],
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "rootDirs": [".", "./.react-router/types"],
    "paths": { "~/*": ["./app/*"] },
    "verbatimModuleSyntax": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

- [ ] **Step 6: Add `.react-router/` and `build/` to `.gitignore`**

```
.react-router
build
```

- [ ] **Step 7: Write `app/app.css` as a Tailwind entry stub**

Tokens land in Task 2. This is only enough to prove the pipeline.

```css
@import "tailwindcss";
```

- [ ] **Step 8: Write `app/root.tsx`**

No Google Fonts `<link>` tags — fonts are self-hosted in Task 2, per the spec's GDPR note.

```tsx
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import type { Route } from './+types/root'
import './app.css'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const is404 = isRouteErrorResponse(error) && error.status === 404
  return (
    <main>
      <h1>{is404 ? 'Page not found' : 'Something went wrong'}</h1>
      <a href="/">Back to home</a>
    </main>
  )
}
```

- [ ] **Step 9: Write `app/routes.ts` and stub every route**

All six route files must exist now, not later. `prerender` validates its
paths against the route manifest at build time, so listing nine paths against
a single index route fails with *"Unable to prerender path because it does not
match any routes"*. Tasks 8–13 fill these stubs in.

```ts
import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('services', 'routes/services.tsx'),
  route('products', 'routes/products.tsx'),
  route('products/:slug', 'routes/product.tsx'),
  route('about', 'routes/about.tsx'),
  route('contact', 'routes/contact.tsx'),
] satisfies RouteConfig
```

Each of `home`, `services`, `products`, `about`, `contact` is a one-line
component returning its name in an `<h1>`. `product.tsx` echoes the param:

```tsx
// app/routes/product.tsx
import type { Route } from './+types/product'

export default function Product({ params }: Route.ComponentProps) {
  return <h1>{params.slug}</h1>
}
```

- [ ] **Step 10: Delete the starter files**

```bash
git rm -r src public/icons.svg
```

- [ ] **Step 11: Verify the build and the React Compiler bet**

```bash
npm run typecheck && npm run build
```

Expected: build succeeds, `build/client/index.html` exists and contains `<h1>Arepo</h1>`.

```bash
grep -c "<h1>Arepo</h1>" build/client/index.html
```

Expected: `1`. If it prints `0`, prerendering is not producing content — stop and diagnose before continuing.

Confirm React Compiler survived:

```bash
ls build/client/assets/ | grep -i compiler
```

Expected: a `compiler-runtime-*.js` asset. **Outcome when this plan was
executed: it survived.** Keeping `babel()` as a standalone plugin rather than
nesting it inside `@vitejs/plugin-react` is what made that work.

**If instead the build fails with a Babel/transform error**, the bet has lost. Remove `babel()` and its import from `vite.config.ts`, then:

```bash
npm uninstall @rolldown/plugin-babel babel-plugin-react-compiler @babel/core @types/babel__core
```

Re-run the build, and record the removal in the commit message. The redesign does not depend on React Compiler.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
Migrate scaffold to React Router framework mode

Replaces the Vite SPA starter with React Router 8 framework mode,
configured ssr:false with an explicit nine-path prerender list so every
route emits real HTML at build time.

vite-react-ssg was rejected: it peers on react-router-dom@^6, which
React Router 7 merged away, and its README directs v7+ users here.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Design token layer, typography and the contrast guard

**Files:**
- Modify: `app/app.css`
- Create: `scripts/check-contrast.mjs`

**Interfaces:**
- Consumes: Task 1's Tailwind pipeline.
- Produces: the `--color-*`, `--font-*` and `--text-*` custom properties every later task styles against, and `npm run check:contrast`.

- [ ] **Step 1: Install fonts**

```bash
npm i @fontsource-variable/archivo@^5.3.0 @fontsource-variable/geist-mono@^5.3.0
```

- [ ] **Step 2: Write the token layer into `app/app.css`**

Values come verbatim from spec §3.1. Do not round or adjust them.

```css
@import "tailwindcss";
@import "@fontsource-variable/archivo";
@import "@fontsource-variable/geist-mono";

@theme {
  --color-navy-950: #000F1C;
  --color-navy-900: #00182E;
  --color-navy-800: #002D56;
  --color-navy-700: #003566;
  --color-navy-600: #004B8F;

  --color-cyan-400: #33DBFF;
  --color-cyan-500: #00BCE4;
  --color-cyan-700: #007A94;

  --color-paper: #F6F8FA;

  --font-display: "Archivo Variable", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono Variable", ui-monospace, monospace;

  --text-display: clamp(2.5rem, 1.6rem + 3.6vw, 4rem);
  --text-h1: clamp(2rem, 1.4rem + 2.4vw, 3rem);
  --text-h2: clamp(1.625rem, 1.3rem + 1.4vw, 2.25rem);
  --text-h3: clamp(1.375rem, 1.2rem + 0.7vw, 1.75rem);
  --text-lead: clamp(1.125rem, 1.05rem + 0.3vw, 1.375rem);
  --text-body: 1.125rem;
}

@layer base {
  html { -webkit-text-size-adjust: 100%; }
  body {
    font-family: var(--font-display);
    font-size: var(--text-body);
    line-height: 1.6;
    color: var(--color-navy-800);
    background: #fff;
  }
  h1, h2, h3 { font-weight: 450; letter-spacing: -0.02em; line-height: 1.1; }
  :where(a, button, input, textarea, select, [tabindex]):focus-visible {
    outline: 2px solid var(--color-navy-800);
    outline-offset: 2px;
  }
  .on-dark :where(a, button, input, textarea, select, [tabindex]):focus-visible {
    outline-color: var(--color-cyan-500);
  }
  .prose { max-width: 68ch; }
}
```

Note the heading weight of `450`, not bold. The references set headlines large at regular weight; bold-and-small is the pattern being replaced.

- [ ] **Step 3: Write `scripts/check-contrast.mjs`**

This is the standing guard against the site's original defect. It parses the shipped CSS rather than a duplicated table, so it cannot drift.

```js
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../app/app.css', import.meta.url), 'utf8')
const tokens = Object.fromEntries(
  [...css.matchAll(/--color-([\w-]+):\s*(#[0-9A-Fa-f]{6});/g)].map(m => [m[1], m[2]]),
)
tokens.white = '#FFFFFF'

const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16))
const lum = h => {
  const [r, g, b] = rgb(h).map(v => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

// [foreground, background, minimum, why]
const rules = [
  ['navy-800', 'white', 4.5, 'body text on light'],
  ['navy-600', 'white', 4.5, 'secondary text on light'],
  ['cyan-700', 'white', 4.5, 'the only cyan allowed as text on light'],
  ['cyan-500', 'navy-800', 4.5, 'brand cyan as text on brand navy'],
  ['cyan-400', 'navy-950', 4.5, 'bright accent on deepest ground'],
  ['white', 'navy-800', 4.5, 'reversed text on brand navy'],
  ['navy-800', 'paper', 4.5, 'body text on the light band'],
]

let failed = 0
for (const [fg, bg, min, why] of rules) {
  if (!tokens[fg] || !tokens[bg]) {
    console.error(`MISSING token: ${fg} or ${bg}`)
    failed++
    continue
  }
  const r = ratio(tokens[fg], tokens[bg])
  const ok = r >= min
  if (!ok) failed++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${fg} on ${bg}  ${r.toFixed(2)}:1 (min ${min})  — ${why}`)
}

// The defect this guard exists to prevent regressing.
const brandCyanOnWhite = ratio(tokens['cyan-500'], '#FFFFFF')
console.log(`\nnote  brand cyan-500 on white is ${brandCyanOnWhite.toFixed(2)}:1 — never use as text on light`)

process.exit(failed ? 1 : 0)
```

- [ ] **Step 4: Run the guard**

```bash
npm run check:contrast
```

Expected: every line `PASS`, exit code 0, and the closing note reporting `2.25:1`.

- [ ] **Step 5: Verify and commit**

```bash
npm run typecheck && npm run build && npm run check:contrast
git add -A
git commit -m "$(cat <<'EOF'
Add design token layer, self-hosted fonts and a contrast guard

Brand navy #002D56 and cyan #00BCE4 are preserved exactly. The derived
stops exist so the brand cyan stops being used as body text on white,
which measures 2.25:1 against a 4.5:1 requirement on the live site.

check-contrast.mjs parses the shipped CSS rather than a copied table, so
the assertions cannot drift from the tokens.

Fonts are self-hosted via Fontsource rather than the Google Fonts CDN,
which has been ruled a GDPR violation in the EU.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Content types and fixtures

All site copy, transcribed from the live site. No invented facts.

**Files:**
- Create: `app/data/types.ts`, `company.ts`, `navigation.ts`, `images.ts`, `products.ts`, `sectors.ts`, `clients.ts`, `services.ts`, `testimonials.ts`, `caseStudies.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: every type and fixture array consumed by Task 4.

- [ ] **Step 1: Write `app/data/types.ts`**

```ts
export type ProductSlug = 'tracerit' | 'inkara' | 'goss' | 'cautus'
export type SectorId = 'bus-coach' | 'rail' | 'aviation' | 'parking-enforcement' | 'ip-legal'
export type ImageKey = string

export interface ModuleGroup { id: string; title: string; items: string[] }

export interface Product {
  slug: ProductSlug
  name: string
  tagline: string
  summary: string
  sectors: SectorId[]
  moduleGroups: ModuleGroup[]
  hasMobileApp: boolean
  site: { label: string; href: string }
  image: ImageKey
  caseStudyId?: string
}

export interface Sector {
  id: SectorId
  name: string
  problem: string
  primary: ProductSlug
  secondary?: ProductSlug
}

export interface Client { name: string; note: string }
export interface Guarantee { title: string; detail: string }
export interface Capability { title: string; detail: string }
export interface ProcessStep { n: number; title: string; body: string }

export interface ServicePillar {
  id: string
  title: string
  body: string
  points: string[]
  image: ImageKey
}

export interface Testimonial { quote: string; attribution: string; organisation: string }
export interface CaseStudy { id: string; title: string; summary: string; sector: SectorId; image: ImageKey }

export interface NavItem { label: string; to: string; status: 'live' | 'deferred' | 'external' }

export interface ImageSlot {
  key: ImageKey
  ratio: string
  subject: string
  alt: string
  src?: string
}

export interface Company {
  name: string
  legalName: string
  tagline: string
  foundedYear: number
  phone: string
  phoneHref: string
  address: { street: string; locality: string; region: string; postcode: string; country: string }
  nearestStation: string
  accreditation: { standard: string; certificateNumber: string }
  privacyPolicyHref: string
}
```

- [ ] **Step 2: Write `app/data/company.ts`**

`foundedYear` is 1998 per the live site's About page. The footer's "1999–2024" badge contradicts it; the spec flags this for the client. Year counts are derived, never hardcoded.

```ts
import type { Company } from './types'

export const company: Company = {
  name: 'Arepo',
  legalName: 'Arepo Solutions Ltd',
  tagline: 'online database solutions',
  foundedYear: 1998,
  phone: '+44 (0)20 7280 4390',
  phoneHref: 'tel:+442072804390',
  address: {
    street: 'Unit W107, Vox Studios, 1–45 Durham Street',
    locality: 'Vauxhall',
    region: 'London',
    postcode: 'SE11 5JH',
    country: 'United Kingdom',
  },
  nearestStation: 'Vauxhall',
  accreditation: { standard: 'ISO 9001:2015', certificateNumber: '20042411' },
  privacyPolicyHref: 'https://www.arepo.co.uk/privacy',
}

export const yearsTrading = (now = new Date()) => now.getFullYear() - company.foundedYear
```

- [ ] **Step 3: Write `app/data/products.ts`**

Every bullet below is transcribed from the live Products page. Do not paraphrase or add.

```ts
import type { Product } from './types'

export const products: Product[] = [
  {
    slug: 'tracerit',
    name: 'Tracerit®',
    tagline: 'Transport Operations Database',
    summary: 'Software for public transport providers, helping daily operations.',
    sectors: ['bus-coach', 'rail'],
    hasMobileApp: false,
    site: { label: 'tracerit.com', href: 'https://www.tracerit.com' },
    image: 'product.tracerit',
    moduleGroups: [
      {
        id: 'operations',
        title: 'Daily operations',
        items: [
          'Incident and Accident management',
          'CCTV incident recording and tracking',
          'Asset management of on-vehicle hardware',
          'Driver Risk Assessment and Analysis',
          'Automated driving licence management to assist compliance',
          'Integration with customer service solutions',
        ],
      },
    ],
  },
  {
    slug: 'inkara',
    name: 'Inkara',
    tagline: 'Parking, Environmental Enforcement and Revenue Protection Software',
    summary: 'One enforcement platform serving car park operators, local authority environmental teams, and train and bus revenue protection.',
    sectors: ['parking-enforcement', 'rail', 'bus-coach'],
    hasMobileApp: true,
    site: { label: 'inkara.com', href: 'https://www.inkara.com' },
    image: 'product.inkara',
    moduleGroups: [
      {
        id: 'car-park-operators',
        title: 'Software for Car Park Operators',
        items: [
          'Car park pre-booking',
          'Online Sales for E-tickets and Season tickets',
          'Parking Charge Notices and Enforcement',
          'Proof of Presence Staff patrols',
          'Equipment and Estate fault management',
        ],
      },
      {
        id: 'environmental-enforcement',
        title: 'Software for Environmental Enforcement',
        items: [
          'Mobile app to issue Fixed Penalty Notices',
          'Flexible configuration providing FPN management of littering, dog fouling, fly tipping and commercial waste',
          'Back office suite for management and reporting',
          'Escalation of unpaid fines to magistrates courts',
          'Generation of Single Justice Packs and collation of evidence',
          'Integration with Google Maps for hotspot reporting',
        ],
      },
      {
        id: 'revenue-protection',
        title: 'Software for Train and Bus Revenue Protection',
        items: [
          'Mobile app to issue Unpaid Fare Notices and Travel Irregularities',
          'Integrated postcode and electoral role validation service',
          'Back office suite for management and reporting',
          'Escalation of unpaid fines to magistrates courts',
          'Generation of Single Justice Packs and collation of evidence',
        ],
      },
    ],
  },
  {
    slug: 'goss',
    name: 'GOSS',
    tagline: 'The Ground Operations Software System',
    summary: 'Software for aviation ground services providers.',
    sectors: ['aviation'],
    hasMobileApp: false,
    site: { label: 'ground-ops.com', href: 'https://www.ground-ops.com' },
    image: 'product.goss',
    caseStudyId: 'dnata-uk',
    moduleGroups: [
      {
        id: 'ground-operations',
        title: 'Ground operations',
        items: [
          'Incident recording for ISAGO',
          'Ramp and Flight Watch audits',
          'Centralised Standard Operating Procedures repository',
          'Operational Delay recording',
          'Airside passenger and crew transport',
        ],
      },
    ],
  },
  {
    slug: 'cautus',
    name: 'Cautus',
    tagline: 'Online Trade Mark (TM) Management',
    summary: 'Software for Trade Mark (TM) Attorneys.',
    sectors: ['ip-legal'],
    hasMobileApp: false,
    site: { label: 'cautus.co.uk', href: 'https://www.cautus.co.uk' },
    image: 'product.cautus',
    moduleGroups: [
      {
        id: 'portfolio',
        title: 'Portfolio management',
        items: [
          'Trade Mark management',
          'Design Registrations',
          'Domain Name management',
          'Patents',
        ],
      },
    ],
  },
]
```

- [ ] **Step 4: Write `app/data/sectors.ts`**

```ts
import type { Sector } from './types'

export const sectors: Sector[] = [
  { id: 'bus-coach', name: 'Bus & Coach', problem: 'Incidents, CCTV requests and driver licence compliance across a live fleet.', primary: 'tracerit', secondary: 'inkara' },
  { id: 'rail', name: 'Rail', problem: 'Unpaid fare notices, evidence packs and escalation to magistrates courts.', primary: 'inkara', secondary: 'tracerit' },
  { id: 'aviation', name: 'Aviation', problem: 'ISAGO accreditation, ramp audits and operational delay recording.', primary: 'goss' },
  { id: 'parking-enforcement', name: 'Parking & Enforcement', problem: 'Charge notices, patrols, fixed penalties and estate faults.', primary: 'inkara' },
  { id: 'ip-legal', name: 'IP & Legal', problem: 'Trade mark, design, domain and patent portfolios in one register.', primary: 'cautus' },
]
```

- [ ] **Step 5: Write `app/data/clients.ts`**

Eleven clients, exactly as the live logo wall lists them.

```ts
import type { Client } from './types'

export const clients: Client[] = [
  { name: 'First Bus', note: 'Bus operator' },
  { name: 'Go-Ahead', note: 'Transport group' },
  { name: 'Arriva', note: 'Transport group' },
  { name: 'Stagecoach', note: 'Transport group' },
  { name: 'Metropolitan Police', note: 'Police force' },
  { name: 'Transport UK London Bus', note: 'Bus operator' },
  { name: 'Metroline', note: 'Bus operator' },
  { name: 'Saba', note: 'Car park operator' },
  { name: 'LNER', note: 'Train operator' },
  { name: 'Briffa', note: 'IP law firm' },
  { name: 'Dor&Co', note: 'Restaurants, hotels, lounges and catering' },
]
```

- [ ] **Step 6: Write `app/data/services.ts`**

Guarantees and capabilities are transcribed verbatim from the live Services page panel and the home page's third column.

```ts
import type { Capability, Guarantee, ProcessStep, ServicePillar } from './types'

export const guarantees: Guarantee[] = [
  { title: 'Rapid Development', detail: 'Auto-generated database applications' },
  { title: 'Reliable & Flexible', detail: 'Automated development processes' },
  { title: 'Scalable & Robust', detail: 'Easily manages changes in your business requirements' },
  { title: 'Efficiently Evolve', detail: 'Designed and built for change' },
  { title: 'Optimised For Growth', detail: 'New features added regularly' },
  { title: 'No Unforeseen Costs', detail: 'Fixed price confidence' },
]

export const capabilities: Capability[] = [
  { title: 'Bespoke software solutions', detail: 'Built to your operation, not adapted to it' },
  { title: 'Business rules analysis', detail: 'Your process, encoded and enforced' },
  { title: 'Integration and migration', detail: 'Moving data off the systems you are leaving' },
  { title: 'Data security and encryption', detail: 'Appropriate to the data you hold' },
  { title: 'Legacy system upgrades', detail: 'Replacing what has outlasted its support' },
  { title: 'Disaster recovery', detail: 'Centralised data you can restore' },
]

export const servicePillars: ServicePillar[] = [
  {
    id: 'online-databases',
    title: 'Online Databases',
    body: 'Browser-based database solutions at a fraction of the time and cost traditionally associated with bespoke development, built on the Arepo Platform.',
    points: ['Value for money', 'Revenue enhancements', 'Cost savings'],
    image: 'service.databases',
  },
  {
    id: 'bespoke-software',
    title: 'Bespoke Software',
    body: 'Tailor-made solutions delivered on time and within budget using tried and tested rapid application development techniques.',
    points: ['Initial consultancy', 'System development', 'Installation, training and support'],
    image: 'service.bespoke',
  },
  {
    id: 'legacy-systems',
    title: 'Legacy Systems',
    body: 'Replacing business spreadsheets, local databases and systems that have outlasted their support, without losing the data or the process.',
    points: ['Back office applications', 'Data centralisation', 'Improved disaster recovery'],
    image: 'service.legacy',
  },
  {
    id: 'cms-integration',
    title: 'CMS Integration',
    body: 'Managing content across intranets and public-facing web sites, combined with the database and back office processes behind them.',
    points: ['Intranets', 'Public web sites', 'E-commerce and call centre sales'],
    image: 'service.cms',
  },
]

export const processSteps: ProcessStep[] = [
  { n: 1, title: 'Consultancy', body: 'We map the operation and the business rules before anything is built.' },
  { n: 2, title: 'System development', body: 'Rapid application development on the Arepo Platform, with working software early.' },
  { n: 3, title: 'Installation', body: 'Deployed on your servers or provided as a hosted solution.' },
  { n: 4, title: 'Training', body: 'Your team is trained on the system they will actually use.' },
  { n: 5, title: 'Support', body: 'Ongoing maintenance, with future development simply and cost-effectively managed.' },
]
```

- [ ] **Step 7: Write `app/data/testimonials.ts` and `app/data/caseStudies.ts`**

The live site links to testimonials but the captured pages do not show their text. Rather than invent quotes, the fixture ships empty and the section is conditional.

```ts
// app/data/testimonials.ts
import type { Testimonial } from './types'

// Intentionally empty: the live site references testimonials but none were
// captured. Sections consuming this must render nothing when it is empty.
// Populate from the client's testimonials page before launch.
export const testimonials: Testimonial[] = []
```

```ts
// app/data/caseStudies.ts
import type { CaseStudy } from './types'

export const caseStudies: CaseStudy[] = [
  { id: 'bespoke-software', title: 'Bespoke software', summary: 'A tailor-made database system built around an operator’s own business rules.', sector: 'bus-coach', image: 'case.bespoke' },
  { id: 'legacy-upgrade', title: 'Legacy software upgrade', summary: 'Replacing an unsupported legacy system without losing the data or the process behind it.', sector: 'rail', image: 'case.legacy' },
  { id: 'dnata-uk', title: 'Aviation services — dnata UK', summary: 'Ground operations software supporting ISAGO accreditation across a UK ground handling operation.', sector: 'aviation', image: 'case.aviation' },
]
```

- [ ] **Step 8: Write `app/data/navigation.ts`**

Deferred destinations carry `status: 'deferred'` and render as unlinked text, per spec §9.

```ts
import type { NavItem } from './types'

export const primaryNav: NavItem[] = [
  { label: 'Services', to: '/services', status: 'live' },
  { label: 'Products', to: '/products', status: 'live' },
  { label: 'About Us', to: '/about', status: 'live' },
  { label: 'Contact Us', to: '/contact', status: 'live' },
]

export const footerCompany: NavItem[] = [
  { label: 'About Us', to: '/about', status: 'live' },
  { label: 'Contact Us', to: '/contact', status: 'live' },
  { label: 'Careers', to: '/about', status: 'live' },
  { label: 'Sitemap', to: '', status: 'deferred' },
]

export const footerLegal: NavItem[] = [
  { label: 'Disclaimer', to: '', status: 'deferred' },
  { label: 'Privacy', to: 'https://www.arepo.co.uk/privacy', status: 'external' },
  { label: 'Terms and Conditions', to: '', status: 'deferred' },
  { label: 'Cookie Policy', to: '', status: 'deferred' },
]
```

- [ ] **Step 9: Write `app/data/images.ts`**

One entry per slot. `src` stays undefined until real photography arrives; `<Figure>` renders a placeholder at the declared ratio, so adding `src` later causes no layout shift.

```ts
import type { ImageSlot } from './types'

export const imageSlots: Record<string, ImageSlot> = {
  'home.hero': { key: 'home.hero', ratio: '16/9', subject: 'Bus depot at dusk, vehicles parked in rows, interior lights on', alt: 'A bus depot at dusk' },
  'home.platform': { key: 'home.platform', ratio: '4/3', subject: 'Operations control room, staff at multi-screen workstations', alt: 'An operations control room' },
  'product.tracerit': { key: 'product.tracerit', ratio: '21/9', subject: 'Double-decker buses in city traffic', alt: 'Buses in city traffic' },
  'product.inkara': { key: 'product.inkara', ratio: '21/9', subject: 'Multi-storey car park deck, marked bays', alt: 'A multi-storey car park deck' },
  'product.goss': { key: 'product.goss', ratio: '21/9', subject: 'Airport apron, ground crew loading baggage beside an aircraft', alt: 'Ground crew working on an airport apron' },
  'product.cautus': { key: 'product.cautus', ratio: '21/9', subject: 'Law office desk with document files and a laptop', alt: 'Documents on a law office desk' },
  'service.databases': { key: 'service.databases', ratio: '3/2', subject: 'Close-up of a database schema on a monitor', alt: 'A database schema on screen' },
  'service.bespoke': { key: 'service.bespoke', ratio: '3/2', subject: 'Two people reviewing a process diagram on a whiteboard', alt: 'Two people reviewing a process diagram' },
  'service.legacy': { key: 'service.legacy', ratio: '3/2', subject: 'Server rack in a small comms room', alt: 'A server rack' },
  'service.cms': { key: 'service.cms', ratio: '3/2', subject: 'A public transport information web page on a tablet', alt: 'A transport web page on a tablet' },
  'about.story': { key: 'about.story', ratio: '4/3', subject: 'Exterior of a London office building in Vauxhall', alt: 'A London office building' },
  'case.bespoke': { key: 'case.bespoke', ratio: '3/2', subject: 'Depot office with staff at desks', alt: 'A depot office' },
  'case.legacy': { key: 'case.legacy', ratio: '3/2', subject: 'Railway platform with a departure board', alt: 'A railway platform' },
  'case.aviation': { key: 'case.aviation', ratio: '3/2', subject: 'Baggage handling belt loader beside an aircraft', alt: 'A belt loader beside an aircraft' },
  'contact.location': { key: 'contact.location', ratio: '4/3', subject: 'Street map of the Vauxhall area of London', alt: 'Map of Vauxhall, London' },
}
```

- [ ] **Step 10: Verify and commit**

```bash
npm run typecheck && npm run lint
git add -A
git commit -m "$(cat <<'EOF'
Add typed content fixtures transcribed from the live site

Product module lists, guarantees and capabilities are transcribed verbatim
rather than paraphrased. Two deliberate omissions:

- testimonials.ts ships empty. The live site links to testimonials but
  none were captured, and inventing client quotes is not acceptable.
- No per-product deployment model. The live site states deployment only
  in general terms and never per product.

foundedYear is 1998 per the About page; year counts derive from it so the
footer's stale "25 YEARS / 1999-2024" badge cannot recur.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Content, contact and SEO libraries

The three seams that make the build backend-ready.

**Files:**
- Create: `app/lib/content.ts`, `app/lib/contact.ts`, `app/lib/seo.ts`

**Interfaces:**
- Consumes: every fixture and type from Task 3.
- Produces:
  - `getProducts(): Promise<Product[]>`, `getProductBySlug(slug: string): Promise<Product | null>`, `getSectors()`, `getClients()`, `getServicePillars()`, `getGuarantees()`, `getCapabilities()`, `getProcessSteps()`, `getTestimonials()`, `getCaseStudies()`, `getCaseStudyById(id: string)`, `getCompany()`
  - `validateContact(input: ContactInput): ContactErrors`, `submitContactForm(input: ContactInput): Promise<ContactResult>`
  - `buildMeta(args: PageMeta)`, `organizationJsonLd()`, `softwareApplicationJsonLd(product: Product)`

- [ ] **Step 1: Write `app/lib/content.ts`**

Every getter is `async` despite resolving a local array. That is the seam: replacing fixtures with a CMS changes this file only.

```ts
import { caseStudies } from '~/data/caseStudies'
import { clients } from '~/data/clients'
import { company } from '~/data/company'
import { products } from '~/data/products'
import { sectors } from '~/data/sectors'
import { capabilities, guarantees, processSteps, servicePillars } from '~/data/services'
import { testimonials } from '~/data/testimonials'
import type { CaseStudy, Company, Product, Sector } from '~/data/types'

export async function getProducts(): Promise<Product[]> { return products }
export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find(p => p.slug === slug) ?? null
}
export async function getSectors(): Promise<Sector[]> { return sectors }
export async function getClients() { return clients }
export async function getServicePillars() { return servicePillars }
export async function getGuarantees() { return guarantees }
export async function getCapabilities() { return capabilities }
export async function getProcessSteps() { return processSteps }
export async function getTestimonials() { return testimonials }
export async function getCaseStudies(): Promise<CaseStudy[]> { return caseStudies }
export async function getCaseStudyById(id: string): Promise<CaseStudy | null> {
  return caseStudies.find(c => c.id === id) ?? null
}
export async function getCompany(): Promise<Company> { return company }
```

- [ ] **Step 2: Write `app/lib/contact.ts`**

The CAPTCHA replacement lives here: a honeypot field plus a minimum time-to-submit. Both work without a backend and both survive the move to a real endpoint.

```ts
export interface ContactInput {
  name: string
  telephone: string
  email: string
  message: string
  consent: boolean
  marketing: boolean
  /** Honeypot. Must stay empty; bots fill it. */
  website: string
  /** Epoch ms when the form mounted. */
  startedAt: number
}

export type ContactErrors = Partial<Record<keyof ContactInput | 'form', string>>
export type ContactResult = { ok: true } | { ok: false; errors: ContactErrors }

/** Minimum time a genuine person takes to complete the form. */
export const MIN_FILL_MS = 3000

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {}
  if (!input.name.trim()) errors.name = 'Enter your name'
  if (!input.email.trim()) errors.email = 'Enter your email address'
  else if (!EMAIL.test(input.email.trim())) errors.email = 'Enter an email address in the format name@example.com'
  if (!input.message.trim()) errors.message = 'Enter your message'
  if (!input.consent) errors.consent = 'Confirm you have read the privacy policy'
  return errors
}

export async function submitContactForm(input: ContactInput): Promise<ContactResult> {
  const errors = validateContact(input)
  if (Object.keys(errors).length > 0) return { ok: false, errors }

  // Honeypot and timing checks replace the live site's inaccessible CAPTCHA.
  // Both fail silently as a generic error so a bot learns nothing.
  if (input.website.trim() !== '') return { ok: false, errors: { form: 'Your message could not be sent. Please call us on +44 (0)20 7280 4390.' } }
  if (Date.now() - input.startedAt < MIN_FILL_MS) return { ok: false, errors: { form: 'Your message could not be sent. Please call us on +44 (0)20 7280 4390.' } }

  // MOCK. Replace this body with a real POST; the signature does not change.
  await new Promise(resolve => setTimeout(resolve, 800))
  return { ok: true }
}
```

- [ ] **Step 3: Write `app/lib/seo.ts`**

```ts
import { company } from '~/data/company'
import type { Product } from '~/data/types'

export const SITE_URL = 'https://www.arepo.co.uk'

export interface PageMeta { title: string; description: string; path: string }

export function buildMeta({ title, description, path }: PageMeta) {
  const url = `${SITE_URL}${path}`
  const full = path === '/' ? `${company.legalName} — ${company.tagline}` : `${title} — ${company.name}`
  return [
    { title: full },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:title', content: full },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'en_GB' },
  ]
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.legalName,
    url: SITE_URL,
    telephone: company.phone,
    foundingDate: String(company.foundedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.region,
      postalCode: company.address.postcode,
      addressCountry: 'GB',
    },
  }
}

export function softwareApplicationJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    applicationCategory: 'BusinessApplication',
    description: product.summary,
    url: `${SITE_URL}/products/${product.slug}`,
    publisher: { '@type': 'Organization', name: company.legalName },
  }
}
```

- [ ] **Step 4: Verify and commit**

```bash
npm run typecheck && npm run lint
git add -A
git commit -m "$(cat <<'EOF'
Add content, contact and SEO libraries

Content getters are async despite resolving local arrays; that is the
seam that lets a CMS replace the fixtures without touching a component.

submitContactForm replaces the live site's distorted-text CAPTCHA, which
has no non-visual alternative and fails WCAG 1.1.1, with a honeypot field
and a minimum fill time. Both work with no backend and both survive the
move to a real endpoint.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: UI primitives

Content-agnostic building blocks. No fixture imports in this task.

**Files:**
- Create: `app/components/ui/Button.tsx`, `SectionHeading.tsx`, `StatFigure.tsx`, `Figure.tsx`, `Accordion.tsx`, `Breadcrumb.tsx`, `Field.tsx`, `Container.tsx`

**Interfaces:**
- Consumes: tokens from Task 2, `imageSlots` from Task 3 (in `Figure` only).
- Produces:
  - `<Button variant="solid" | "outline" | "on-navy" to?={string} href?={string}>`
  - `<SectionHeading lead={string} rest={string} tone="light" | "dark" />`
  - `<StatFigure value={string} label={string} tone?="light" | "dark" />`
  - `<Figure slot={string} className?={string} priority?={boolean} />`
  - `<Accordion items={{ id, title, children }[]} defaultOpenId?={string} />`
  - `<Breadcrumb trail={{ label, to? }[]} />`
  - `<Field id label type hint error required children />`
  - `<Container size?="default" | "wide" | "prose">`

- [ ] **Step 1: Write `SectionHeading.tsx`**

This is the device replacing all-caps kicker labels. One sentence, two tones.

```tsx
interface Props { lead: string; rest: string; tone?: 'light' | 'dark'; as?: 'h1' | 'h2' }

export function SectionHeading({ lead, rest, tone = 'light', as: Tag = 'h2' }: Props) {
  const leadColor = tone === 'dark' ? 'text-white' : 'text-navy-800'
  const restColor = tone === 'dark' ? 'text-cyan-500' : 'text-navy-600'
  return (
    <Tag className="text-(length:--text-h2) max-w-[22ch] text-balance">
      <span className={leadColor}>{lead}</span>{' '}
      <span className={restColor}>{rest}</span>
    </Tag>
  )
}
```

Note `text-cyan-500` is used here only under `tone="dark"`, i.e. on navy. That satisfies the global constraint.

- [ ] **Step 2: Write `Figure.tsx`**

Reserves the declared ratio whether or not a `src` exists, so adding photography later causes zero layout shift.

```tsx
import { imageSlots } from '~/data/images'

interface Props { slot: string; className?: string; priority?: boolean }

export function Figure({ slot, className = '', priority = false }: Props) {
  const spec = imageSlots[slot]
  if (!spec) throw new Error(`Unknown image slot: ${slot}`)

  if (spec.src) {
    return (
      <img
        src={spec.src}
        alt={spec.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`w-full object-cover ${className}`}
        style={{ aspectRatio: spec.ratio }}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={spec.alt}
      className={`w-full bg-navy-900 flex items-end p-4 ${className}`}
      style={{ aspectRatio: spec.ratio }}
    >
      <span className="font-mono text-xs text-cyan-500" data-image-placeholder={spec.key}>
        {spec.subject}
      </span>
    </div>
  )
}
```

- [ ] **Step 3: Write `Accordion.tsx`**

Native `<details>`/`<summary>`: keyboard and screen-reader behaviour comes free, and it still renders open content into the prerendered HTML so the product module lists are indexable.

```tsx
import type { ReactNode } from 'react'

interface Item { id: string; title: string; children: ReactNode }
interface Props { items: Item[]; defaultOpenId?: string }

export function Accordion({ items, defaultOpenId }: Props) {
  return (
    <div className="divide-y divide-navy-700/30">
      {items.map(item => (
        <details key={item.id} name="modules" open={item.id === defaultOpenId} className="group py-4">
          <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-(length:--text-h3)">
            {item.title}
            <span aria-hidden="true" className="font-mono text-cyan-700 group-open:rotate-45 transition-transform">+</span>
          </summary>
          <div className="pt-4">{item.children}</div>
        </details>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Write `Field.tsx`**

Carries the accessibility contract for the contact form: programmatic label, hint and error association.

```tsx
import type { ReactNode } from 'react'

interface Props {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: (a11y: { id: string; 'aria-invalid': boolean; 'aria-describedby': string | undefined; required: boolean }) => ReactNode
}

export function Field({ id, label, error, hint, required = false, children }: Props) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-base">
        {label}
        {required && <span className="text-cyan-700 ml-1" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {hint && <p id={hintId} className="text-sm text-navy-600">{hint}</p>}
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy, required })}
      {error && <p id={errorId} className="text-sm text-navy-800 font-medium">{error}</p>}
    </div>
  )
}
```

- [ ] **Step 5: Write `Button.tsx`, `StatFigure.tsx`, `Breadcrumb.tsx`, `Container.tsx`**

`Button` renders `<Link>` when given `to`, `<a>` when given `href`, `<button>` otherwise. Variants are flat fills only — `solid` is `bg-navy-800 text-white`, `outline` is `border border-navy-800 text-navy-800`, `on-navy` is `bg-cyan-500 text-navy-950`. No gradient, no shadow.

`StatFigure` renders `value` in `font-mono` at `--text-h2` and `label` beneath at `text-base`.

`Breadcrumb` renders an `<nav aria-label="Breadcrumb">` with an ordered list; the final item has `aria-current="page"` and is not a link.

`Container` applies `mx-auto w-full px-4 sm:px-6 lg:px-8` with `max-w-[1200px]` default, `max-w-[1400px]` wide, `max-w-[68ch]` prose.

- [ ] **Step 6: Verify and commit**

```bash
npm run typecheck && npm run lint && npm run build
git add -A
git commit -m "$(cat <<'EOF'
Add content-agnostic UI primitives

SectionHeading implements the two-tone sentence device that replaces
all-caps kicker labels throughout.

Figure reserves each slot's declared aspect ratio whether or not real
photography exists, so dropping in images later causes no layout shift.

Accordion uses native details/summary so keyboard and screen-reader
behaviour is free and content still prerenders into the HTML.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Site chrome — Nav, Footer, root layout

**Files:**
- Create: `app/components/ui/Wordmark.tsx`, `app/components/sections/SiteHeader.tsx`, `app/components/sections/SiteFooter.tsx`
- Modify: `app/root.tsx`

**Interfaces:**
- Consumes: `primaryNav`, `footerCompany`, `footerLegal`, `company`, `yearsTrading`, `Container`, `Button`.
- Produces: `<SiteHeader />`, `<SiteFooter />`, both rendered from `root.tsx` around `<Outlet />`.

- [ ] **Step 1: Write `Wordmark.tsx`**

Inline SVG reproducing the existing `arepo.` wordmark — lowercase Archivo at heavy weight in `navy-800`, with the full stop rendered as a solid `cyan-500` square, matching the original mark. Accepts `tone="light" | "dark"` to swap the lettering to white on navy grounds. The tagline `online database solutions` renders beneath at `text-sm` in `navy-600` (light) or `white/70` (dark), and is hidden below `sm`.

This reproduces an existing brand mark; it is not a new logo.

- [ ] **Step 2: Write `SiteHeader.tsx`**

Sticky, `bg-white/100` (no blur, no glass), `border-b border-navy-800/10`. Desktop: wordmark left, `primaryNav` centre-right, a `solid` "Get in touch" button far right. Mobile below `lg`: wordmark plus a disclosure button toggling a full-height drawer.

The drawer must: trap focus, close on `Escape`, close on route change, set `aria-expanded` on the trigger, and restore focus to the trigger on close. Render the phone number in the drawer as a `tel:` link — on mobile, calling is the likely action.

- [ ] **Step 3: Write `SiteFooter.tsx`**

`bg-navy-950`, class `on-dark` so the focus ring switches to cyan. Four columns collapsing to one below `md`: wordmark + tagline + phone; `footerCompany`; `footerLegal`; address block.

Deferred items render as `<span className="text-white/40">` rather than links. External items render as `<a>` with `rel="noreferrer"`.

Bottom rule carries, in `font-mono text-xs`:

```
© {new Date().getFullYear()} Arepo Solutions Ltd · ISO 9001:2015 · Certificate 20042411 · Trading since 1998
```

Derive the year and "since 1998" from `company`; never hardcode a year count.

- [ ] **Step 4: Wire both into `root.tsx`**

Wrap `<Outlet />` between `<SiteHeader />` and `<SiteFooter />`, with `<main id="main">` around the outlet and a skip link as the first focusable element in `<body>`:

```tsx
<a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:text-navy-800 focus:p-3">
  Skip to content
</a>
```

- [ ] **Step 5: Verify and commit**

```bash
npm run typecheck && npm run lint && npm run build
grep -o "Certificate 20042411" build/client/index.html
```

Expected: the certificate line appears in the prerendered HTML.

```bash
git add -A
git commit -m "Add site header, footer and root layout chrome

Deferred destinations render as plain text rather than links to '/', so
no navigation silently goes somewhere other than its label.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 7: Motion utilities

**Files:**
- Create: `app/lib/motion.ts`

**Interfaces:**
- Consumes: `gsap`.
- Produces: `useReveal(ref: RefObject<HTMLElement | null>, options?: { stagger?: number; y?: number })`, and `useCountUp(ref, to: number)`.

- [ ] **Step 1: Install GSAP**

```bash
npm i gsap@^3.15.0
```

- [ ] **Step 2: Write `app/lib/motion.ts`**

The reduced-motion branch applies the final state immediately rather than disabling the effect, so content is never left invisible.

```ts
import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useReveal(ref: RefObject<HTMLElement | null>, { stagger = 0.06, y = 12 } = {}) {
  useEffect(() => {
    const root = ref.current
    if (!root) return

    const mm = gsap.matchMedia()
    const targets = root.querySelectorAll<HTMLElement>('[data-reveal]')
    if (targets.length === 0) return

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(targets, { opacity: 1, y: 0 })
    })

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1, y: 0, duration: 0.5, stagger, ease: 'power2.out',
          scrollTrigger: { trigger: root, start: 'top 85%', once: true },
        },
      )
    })

    return () => mm.revert()
  }, [ref, stagger, y])
}
```

Because routes prerender, elements marked `data-reveal` must be visible in the static HTML by default and only animated from a hidden state once GSAP mounts. Set no `opacity: 0` in CSS — the `fromTo` supplies it.

- [ ] **Step 3: Add `useCountUp`**

Same `matchMedia` structure; the reduce branch writes the final number directly.

- [ ] **Step 4: Verify and commit**

```bash
npm run typecheck && npm run lint && npm run build
git add -A
git commit -m "Add GSAP motion utilities with a reduced-motion branch

The reduce branch applies final state rather than disabling the effect,
so content is never left invisible. Initial opacity comes from GSAP's
fromTo rather than CSS, so prerendered HTML is readable without JS.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 8: Home route

**Files:**
- Create: `app/routes/home.tsx` (replace the Task 1 placeholder), `app/components/sections/Hero.tsx`, `SectorSelector.tsx`, `LogoWall.tsx`, `SectorGrid.tsx`, `PlatformSection.tsx`, `StatBand.tsx`, `ProductBento.tsx`, `CapabilityGrid.tsx`, `TestimonialCarousel.tsx`, `FinalCta.tsx`
- Modify: `app/routes.ts`

**Interfaces:**
- Consumes: all Task 4 getters, all Task 5 primitives, `useReveal`.
- Produces: `loader` returning `{ sectors, products, clients, guarantees, capabilities, testimonials }`; sections reused by later routes (`FinalCta`, `LogoWall`, `StatBand`, `PlatformSection`).

- [ ] **Step 1: Write the loader and meta**

```tsx
import type { Route } from './+types/home'
import { getCapabilities, getClients, getGuarantees, getProducts, getSectors, getTestimonials } from '~/lib/content'
import { buildMeta } from '~/lib/seo'

export async function loader() {
  const [sectors, products, clients, guarantees, capabilities, testimonials] = await Promise.all([
    getSectors(), getProducts(), getClients(), getGuarantees(), getCapabilities(), getTestimonials(),
  ])
  return { sectors, products, clients, guarantees, capabilities, testimonials }
}

export const meta: Route.MetaFunction = () => buildMeta({
  title: 'Online database solutions',
  description: 'Arepo Solutions builds web-based database software for the UK transport industry — bus, rail, aviation, parking and enforcement. Trading since 1998, ISO 9001:2015 registered.',
  path: '/',
})
```

- [ ] **Step 2: Build the hero with the sector selector**

Full-bleed `Figure slot="home.hero"` with a `bg-navy-950/70` overlay (flat, not a gradient). Headline left-aligned at `--text-display`, regular weight, white, max `18ch`. Supporting line in `white/80` at `--text-lead`, max `52ch`.

Below it, the live element: a labelled row of five sector buttons.

```tsx
<div>
  <p id="sector-label" className="text-(length:--text-lead) text-white/80">I run…</p>
  <div role="group" aria-labelledby="sector-label" className="flex flex-wrap gap-2 mt-4">
    {sectors.map(s => (
      <Link
        key={s.id}
        to={`/products/${s.primary}`}
        className="border border-cyan-500 text-cyan-500 px-4 py-2 hover:bg-cyan-500 hover:text-navy-950 transition-colors"
      >
        {s.name}
      </Link>
    ))}
  </div>
</div>
```

These are `<Link>`s, not JS-only buttons, so they work in the prerendered HTML before hydration.

- [ ] **Step 3: Build `LogoWall`**

Client names set in `font-mono text-sm` in `white/60`, in a marquee duplicated twice for seamless looping, `aria-hidden` on the duplicate. The accessible copy is a visually-hidden list of all eleven names. Marquee pauses on hover and does not run under reduced motion.

There are no logo image files, so names are set as type. Note this in the commit.

- [ ] **Step 4: Build the remaining sections**

- `SectorGrid` — five cards on `paper`; each shows `name` at `--text-h3`, `problem` as body, and a link reading "See {primary product name}".
- `PlatformSection` — `bg-navy-900`, class `on-dark`. `SectionHeading` tone dark, the Arepo Platform paragraph, `Figure slot="home.platform"`, and the six `guarantees` in a 3-col / 2-col / 1-col grid with title in `cyan-500` and detail in `white/80`.
- `StatBand` — four `StatFigure`s: `{yearsTrading()}` / "Years trading", `ISO 9001:2015` / "Quality management", `11` / "Named clients", `4` / "Products in service".
- `ProductBento` — asymmetric grid after the Supabase reference: Tracerit and Inkara span two columns each on a 4-col grid, GOSS and Cautus one each. Each card is flat with `border border-navy-800/15`, showing name, tagline, sector tags in `font-mono text-xs`, and a link.
- `CapabilityGrid` — the six capabilities, 3/2/1 columns, title then detail. No icons.
- `TestimonialCarousel` — **renders `null` when `testimonials.length === 0`.** It will, until the client supplies quotes.
- `FinalCta` — `bg-navy-950`, class `on-dark`, heading, phone as a `tel:` link in `font-mono` at `--text-h3`, and an `on-navy` button to `/contact`.

- [ ] **Step 5: Register the route and verify**

```bash
npm run typecheck && npm run lint && npm run build
grep -o "Years trading" build/client/index.html
grep -o "Metropolitan Police" build/client/index.html
```

Expected: both appear, confirming loader data is prerendered rather than client-fetched.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Build the home route

Sector-led entry: the hero's selector is five real links, so it works in
the prerendered HTML before hydration.

The logo wall sets client names as type because no logo files exist. The
marquee duplicate is aria-hidden and an accessible list carries the names.

TestimonialCarousel renders null while testimonials.length is 0.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 9: Services route

**Files:**
- Create: `app/routes/services.tsx`, `app/components/sections/PageHero.tsx`, `FeatureRow.tsx`, `ProcessSteps.tsx`
- Modify: `app/routes.ts`

**Interfaces:**
- Consumes: `getServicePillars`, `getGuarantees`, `getProcessSteps`, `PlatformSection`, `FinalCta`.
- Produces: `<PageHero title lead />` and `<FeatureRow pillar index />`, both reused by Tasks 10–13.

- [ ] **Step 1: Write `PageHero`**

`bg-navy-900`, class `on-dark`, compact vertical rhythm. `<h1>` at `--text-h1` in white, lead paragraph in `white/80` capped at `56ch`. Used by every route except home.

- [ ] **Step 2: Write the route**

`loader` returns `{ pillars, guarantees, steps }`. `meta` describes the service range.

Body copy, transcribed from the live Services page:

> Whatever IT solution your business needs, Arepo provides a complete range of software development services from initial consultancy and system development through to installation, training and support. Many of the solutions we deliver combine an online database with back office processes and public-facing web sites.

- [ ] **Step 3: Build `FeatureRow`**

Alternating two-column band: `Figure` on one side, text on the other, flipping on odd `index` via `lg:[&>*:first-child]:order-2`. Below `lg`, image then text. Title at `--text-h2`, body, then `points` as a plain list with a `cyan-700` rule between items.

- [ ] **Step 4: Build `ProcessSteps`**

Five rows, each with the step number in `font-mono` at `--text-display` in `cyan-700`, title at `--text-h3`, body alongside. Oversized numerals come from the Fuel X reference; the mono face makes them read as operational rather than decorative.

- [ ] **Step 5: Verify and commit**

```bash
npm run typecheck && npm run lint && npm run build
grep -o "initial consultancy and system development" build/client/services/index.html
git add -A
git commit -m "Build the services route

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 10: Products index route

**Files:**
- Create: `app/routes/products.tsx`, `app/components/sections/ProductComparison.tsx`
- Modify: `app/routes.ts`

**Interfaces:**
- Consumes: `getProducts`, `getSectors`, `ProductBento`, `PageHero`, `FinalCta`.
- Produces: `<ProductComparison products sectors />`.

- [ ] **Step 1: Write the route**

Lead copy, transcribed:

> Arepo Solutions deliver flexible subscription-based online applications for various types of businesses.

- [ ] **Step 2: Build `ProductComparison`**

A real `<table>` with `<caption className="sr-only">`, `<th scope="col">` and `<th scope="row">`. Columns: Product · Sectors served · Module groups · Mobile app · Live site. Data cells in `font-mono text-sm`.

Do not add a deployment column — the live site never states deployment per product, and inventing it is out of scope per spec §5.3.

Below `md` the table scrolls horizontally inside a `<div role="region" aria-label="Product comparison" tabIndex={0}>` so keyboard users can reach the overflow.

- [ ] **Step 3: Verify and commit**

```bash
npm run typecheck && npm run lint && npm run build
grep -o "Module groups" build/client/products/index.html
git add -A
git commit -m "Build the products index with a comparison table

Columns carry only what the live site publishes. No deployment column:
deployment is stated in general terms and never per product, so the data
does not exist to fill it.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 11: Product detail route

**Files:**
- Create: `app/routes/product.tsx`
- Modify: `app/routes.ts`

**Interfaces:**
- Consumes: `getProductBySlug`, `getSectors`, `getCaseStudyById`, `getProducts`, `Accordion`, `Breadcrumb`, `Figure`, `FinalCta`.
- Produces: the four prerendered product pages.

- [ ] **Step 1: Register the dynamic route**

```ts
route('products/:slug', 'routes/product.tsx'),
```

All four slugs are already in the `prerender` array from Task 1.

- [ ] **Step 2: Write the loader with a real 404**

```tsx
export async function loader({ params }: Route.LoaderArgs) {
  const product = await getProductBySlug(params.slug)
  if (!product) throw new Response('Not Found', { status: 404 })
  const [sectors, all] = await Promise.all([getSectors(), getProducts()])
  const caseStudy = product.caseStudyId ? await getCaseStudyById(product.caseStudyId) : null
  return { product, sectors, caseStudy, others: all.filter(p => p.slug !== product.slug) }
}
```

- [ ] **Step 3: Build the page**

Breadcrumb (Home → Products → product name) → hero with `name` as `<h1>`, `tagline` as lead, sector tags in `font-mono text-xs`, an `outline` button to `site.href` with `rel="noreferrer"` labelled "Visit {site.label}" → full-bleed `Figure slot={product.image}` → `summary` → `<Accordion>` over `moduleGroups` with `defaultOpenId` set to the first group → sector row → case study card when present → cross-sell cards for `others` → `FinalCta`.

For single-group products (Tracerit, GOSS, Cautus) the accordion renders one group, open. For Inkara it renders three. This is the section that unpicks the twenty-bullet wall.

- [ ] **Step 4: Add per-product JSON-LD**

Render `softwareApplicationJsonLd(product)` in a `<script type="application/ld+json">` inside the component.

- [ ] **Step 5: Verify all four pages prerender**

```bash
npm run typecheck && npm run lint && npm run build
for s in tracerit inkara goss cautus; do
  test -f "build/client/products/$s/index.html" && echo "$s OK" || echo "$s MISSING"
done
grep -c "Software for Train and Bus Revenue Protection" build/client/products/inkara/index.html
```

Expected: four `OK` lines, and the Inkara grep prints at least `1`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Build the product detail template

Module lists become a grouped accordion. Inkara's twenty bullets from
three unrelated audiences were previously one undifferentiated list;
they are now three collapsible groups. Native details/summary keeps the
content in the prerendered HTML.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 12: About route

**Files:**
- Create: `app/routes/about.tsx`, `app/components/sections/ClientGrid.tsx`, `CaseStudyCards.tsx`, `AccreditationBlock.tsx`
- Modify: `app/routes.ts`

**Interfaces:**
- Consumes: `getCompany`, `getClients`, `getCaseStudies`, `getProcessSteps`, `PageHero`, `StatBand`, `FinalCta`.
- Produces: `<ClientGrid>`, `<CaseStudyCards>`, `<AccreditationBlock>`.

- [ ] **Step 1: Write the route with transcribed copy**

Four paragraphs, verbatim from the live About page — formed in London in 1998; refined the process of designing and deploying database solutions through the Arepo Platform; browser-based solutions at a fraction of traditional time and cost; customers can outsource everything from initial development through ongoing maintenance and support.

- [ ] **Step 2: Build `ClientGrid`**

All eleven clients as a grid of flat bordered cards: name at `--text-h3`, `note` beneath in `font-mono text-xs` in `navy-600`. Unlike the home marquee, this is static and complete.

- [ ] **Step 3: Build `CaseStudyCards` and `AccreditationBlock`**

Three case study cards with `Figure`, title, summary and sector tag. The accreditation block sits on `navy-900` with `on-dark`, setting `ISO 9001:2015` and `Certificate 20042411` in `font-mono`.

- [ ] **Step 4: Add the careers teaser**

A short band linking to `/contact`, not to a careers route — that page is out of scope per spec §9.

- [ ] **Step 5: Verify and commit**

```bash
npm run typecheck && npm run lint && npm run build
grep -o "Formed in London in 1998" build/client/about/index.html
git add -A
git commit -m "Build the about route

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 13: Contact route

**Files:**
- Create: `app/routes/contact.tsx`, `app/components/sections/ContactForm.tsx`, `ContactDetails.tsx`
- Modify: `app/routes.ts`

**Interfaces:**
- Consumes: `validateContact`, `submitContactForm`, `MIN_FILL_MS`, `Field`, `Button`, `Figure`, `getCompany`.
- Produces: the working mock-submit contact form.

- [ ] **Step 1: Build `ContactForm` state**

Controlled inputs for every `ContactInput` field. `startedAt` is captured once on mount via `useState(() => Date.now())`. The honeypot is a real input, visually hidden with `className="sr-only"`, `tabIndex={-1}`, `autoComplete="off"` and `aria-hidden="true"` — never `display: none`, which some bots detect.

- [ ] **Step 2: Implement validation behaviour**

- Validate a field on `blur` once it has been touched.
- On submit, run `validateContact`; if it returns errors, render an error summary above the form, move focus to it, and do not call `submitContactForm`.

```tsx
{summaryErrors.length > 0 && (
  <div ref={summaryRef} tabIndex={-1} role="alert" className="border-2 border-navy-800 p-4">
    <h2 className="text-(length:--text-h3)">There is a problem</h2>
    <ul className="mt-2 list-disc pl-5">
      {summaryErrors.map(([field, message]) => (
        <li key={field}><a href={`#${field}`} className="underline">{message}</a></li>
      ))}
    </ul>
  </div>
)}
```

- [ ] **Step 3: Implement submit**

Disable the submit button and set `aria-busy` while pending. On `{ ok: true }`, replace the form with a success panel containing an `<h2>` that receives focus, so screen reader users are told it worked. On `{ ok: false }` with a `form` error, render it in the summary.

- [ ] **Step 4: Build `ContactDetails`**

`bg-navy-800`, class `on-dark`. Address as a `<address>` element, phone as a `tel:` link in `font-mono` at `--text-h3`, nearest station line, and `Figure slot="contact.location"`. A static figure, not an embedded map — no Google Maps key and no third-party script.

- [ ] **Step 5: Wire the privacy consent link**

The consent checkbox label links to `company.privacyPolicyHref`, which points at the live site's existing privacy page. A consent checkbox that links nowhere is not consent.

- [ ] **Step 6: Verify and commit**

```bash
npm run typecheck && npm run lint && npm run build
grep -o 'name="website"' build/client/contact/index.html && echo "honeypot present"
grep -c "captcha" build/client/contact/index.html
```

Expected: honeypot present; captcha count `0`.

```bash
git add -A
git commit -m "Build the contact route with an accessible form

Replaces the distorted-text CAPTCHA, which has no non-visual alternative
and fails WCAG 1.1.1, with a honeypot and a minimum fill time. The
honeypot is sr-only rather than display:none, which bots detect.

Errors are announced through a focusable summary; the consent checkbox
links to a real privacy policy.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 14: 404, sitemap, robots, and final verification

**Files:**
- Create: `app/routes/not-found.tsx`, `public/robots.txt`, `scripts/build-sitemap.mjs`
- Modify: `app/routes.ts`, `package.json`, `app/root.tsx`

**Interfaces:**
- Consumes: the `prerender` path list.
- Produces: `build/client/sitemap.xml`, `robots.txt`, a styled 404.

- [ ] **Step 1: Add the splat route**

```ts
route('*', 'routes/not-found.tsx'),
```

Renders `PageHero` with "Page not found", a short line, and links to `/` and `/products`. Because `ssr: false` emits an SPA fallback, unmatched paths resolve client-side; note in the README that the host should map its 404 to `/index.html`.

- [ ] **Step 2: Write `scripts/build-sitemap.mjs`**

Imports the `prerender` array from `react-router.config.ts` so the sitemap cannot drift from what is actually built, and writes `build/client/sitemap.xml`. Wire it as a `postbuild` script.

- [ ] **Step 3: Write `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://www.arepo.co.uk/sitemap.xml
```

- [ ] **Step 4: Add sitewide JSON-LD**

Render `organizationJsonLd()` once in `root.tsx`.

- [ ] **Step 5: Full verification sweep**

```bash
npm run typecheck && npm run lint && npm run check:contrast && npm run build
find build/client -name 'index.html' | wc -l                  # expect 9
test -f build/client/sitemap.xml && echo "sitemap OK"
grep -rl "loading\.\.\." build/client --include=*.html || echo "no loading states prerendered"
```

- [ ] **Step 6: Manual responsive check**

Run `npm run dev` and check every route at 375px, 768px and 1440px. Confirm: no horizontal scroll at 375px; the mobile drawer traps focus and closes on Escape; every focus ring is visible on both light and dark grounds.

- [ ] **Step 7: Update `README.md`**

Replace the Vite template boilerplate with: what the project is, the commands, where content lives, how to add real photography via `app/data/images.ts`, how to swap `submitContactForm` for a real endpoint, the host-level 404 mapping note, and the open questions for the client (the 1998-vs-1999 founding date, missing testimonials, missing client logo files, per-product deployment detail).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
Add 404, sitemap, robots and sitewide JSON-LD

The sitemap generator reads the prerender array directly so it cannot
drift from what is actually built.

README records the four open questions for the client: the contradictory
1998/1999 founding date, missing testimonial copy, missing client logo
files, and per-product deployment detail.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

## Self-Review

**Spec coverage.** §3.1 colour → Task 2 plus the standing guard. §3.2 typography → Task 2. §3.3 motion → Task 7. §3.4 components → Tasks 5, 6. §4 IA → Tasks 1, 8. §5.1–5.6 pages → Tasks 8–13. §6 architecture → Tasks 1, 3, 4. §7 SEO → Tasks 4, 11, 14. §8 verification → every task's final step. §9 out of scope → Tasks 6, 12, 14.

**Type consistency.** `ProductSlug`, `SectorId` and `ImageKey` are defined once in Task 3 and referenced unchanged thereafter. `getProductBySlug` returns `Product | null` in both Task 4 and Task 11. `ContactInput`, `ContactErrors` and `ContactResult` are defined in Task 4 and consumed unchanged in Task 13. `<Figure slot=…>` takes the string key used in `imageSlots` throughout.

**Known open items**, carried deliberately rather than invented: testimonial copy, client logo files, per-product deployment detail, and the contradictory founding date. Each is surfaced in the README by Task 14.
