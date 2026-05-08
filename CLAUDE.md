# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

KD-CAR is a German car-detailing & inventory marketing site (Next.js 14 App Router, React 18, Tailwind v3, Framer Motion, Lucide). All UI copy is German — keep new strings German unless asked otherwise. There is no test runner configured; verify changes manually in `npm run dev`.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` / `npm start` — production bundle and serve
- `npm run lint` — `next lint` (extends `next/core-web-vitals` + `next/typescript`)
- `npx tsc --noEmit` — strict type-check (not wired into a script)

## Architecture

### Inventory data layer (`lib/carms.ts`)

This is the most important non-obvious piece. Inventory pages do **not** read `data/cars.json` directly — they go through `getInventoryCars()` / `getInventoryCar(slug)`, which:

1. Try the CARMS API (`CARMS_BASE_URL` + optional `CARMS_API_KEY` sent as `x-api-key`).
2. On any failure (missing config, network error, non-2xx, `success: false`), **silently fall back to `data/cars.json`** and return `source: "local"` plus an `error` string. Callers should surface `error` for debugging but still render `cars`.
3. Run every record (CARMS or local) through `normalizeCar()`, which coerces messy inputs (string numbers, `"true"/"ja"`, comma-separated features, JSON-encoded image arrays) into the strongly-typed `InventoryCar` shape.

`InventoryCar` carries a large set of optional mobile.de-derived fields (`firstRegistration`, `cubicCapacity`, `accidentFree`, `consumptionCombined`, `emissionClass`, etc.). Local fallback rows usually don't have them — always treat these fields as optional in UI code.

### Display helpers (`lib/format.ts`)

- `formatPrice` / `formatMileage` / `formatNumber` / `formatDecimal` — `de-DE` Intl formatters; use these instead of hand-rolling locale logic.
- `humanLabel(value)` — maps mobile.de uppercase enum keys (`PETROL`, `MANUAL_GEAR`, `EURO6`, `FULL_LEATHER`, `EMISSIONSSTICKER_GREEN`, …) to German display strings; falls through to title-case for unknown keys, and splits comma-joined multi-values. **Always run raw enum-style fields through `humanLabel` before rendering.**
- `parseDescriptionParagraphs` — mobile.de descriptions arrive with `\n` / `\\` placeholders and `**heading**` markers; this splits them into `{heading?, lines[]}` blocks rendered as plain text (no `dangerouslySetInnerHTML`).

### Routes

- `app/page.tsx` — home page assembling Hero / Services / About / Contact sections.
- `app/inventory/page.tsx` — list view; `<InventorySection>` is client-side and fetches `/api/cars`.
- `app/fahrzeuge/[slug]/page.tsx` — **server-rendered** mobile.de-style detail page. Calls `getInventoryCar(slug)` directly (no /api hop), generates per-car `Metadata`, renders `CarGallery`, `CarSpecsGrid` (multiple titled sections), `CarPriceCard`. Uses `notFound()` when the slug yields no car. `params` is `Promise<{slug: string}>` — Next 14 async dynamic params.
- `app/impressum/page.tsx` — German legal imprint (required by law).
- `app/api/cars/route.ts` — thin GET proxy over `getInventoryCars()` for the client list view.
- `app/api/carms-image/route.ts` — proxies CARMS-relative image paths server-side so the `x-api-key` stays out of the browser. `normalizeImages()` rewrites relative URLs to `/api/carms-image?path=…` whenever a CARMS base URL is configured. Cached `public, max-age=31536000, immutable`.
- `app/api/contact/route.ts` — Gmail-based contact form; see Email below.
- `app/api/test-env/route.ts` — debug endpoint; do not link from prod UI.

### Components

Client components in `components/` use Framer Motion for animations. Detail-page building blocks: `CarGallery`, `CarSpecsGrid`, `CarPriceCard`, `CarCard`. List view: `InventorySection` (search/filter/grid-list toggle). The `Header` does scroll-vs-route navigation: on `/` it `scrollIntoView`s the section; elsewhere it routes to `/#section`.

### Styling

Tailwind v3 with custom `primary` (sky blue, `#0ea5e9`), `accent` (yellow, `#eab308`), `dark` (slate) scales and `fade-in` / `slide-up` / `float` keyframes in `tailwind.config.js`. Display font uses `var(--font-poppins)` (loaded via `next/font` in the root layout).

### Path alias

`@/*` resolves to the **project root** (e.g. `@/lib/carms`, `@/components/Header`, `@/data/cars.json`). Set in `tsconfig.json`.

### Images

`next.config.js` allows arbitrary remote hosts (`hostname: '**'` for both http and https) plus Vercel Blob, with `dangerouslyAllowSVG: true`. AVIF/WebP formats are enabled. CARMS-relative paths are rewritten to the `/api/carms-image` proxy by `normalizeImages()`.

## Environment

`.env.local` (copy from `env.example`):

- **Email (contact form):** `EMAIL_USER`, `EMAIL_PASS` — Gmail address + app password (2FA required).
  - ⚠️ `env.example` lists `SMTP_*` and `CONTACT_EMAIL` variables, but `app/api/contact/route.ts` actually reads `EMAIL_USER` / `EMAIL_PASS` and hard-codes `to: 'info@kd-car.de'` and `service: 'gmail'`. The error message mentions Strato but the transport is Gmail — leave as-is unless explicitly migrating. If you change auth/recipient, update both the route and `env.example`.
- **Inventory (optional):** `CARMS_BASE_URL`, `CARMS_API_KEY`. Without these, the site runs entirely off `data/cars.json` and logs a one-time warning.

Restart `npm run dev` after env changes — Next.js does not hot-reload `.env.local`.

## Code style (from AGENTS.md)

Two-space indent, single quotes, **no semicolons** in TS/TSX. Functional components with explicit prop interfaces. `PascalCase.tsx` for components, camelCase for hooks/helpers. Tailwind classes ordered layout → color. Reusable logic goes in `lib/` or `components/`, not nested under route folders.
