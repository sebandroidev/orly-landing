# Orly — Landing Page

Waitlist landing page for [Orly](https://orly.app), a community platform for discovering and recommending local services.

## Stack

- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **UI**: React 19, TypeScript, Tailwind CSS v4
- **Animations**: Framer Motion 12
- **Font**: Bricolage Grotesque (Google Fonts)
- **Icons**: HugeIcons (`@hugeicons/react`)
- **Confetti**: `canvas-confetti` (dynamic import)

## Features

- **Waitlist form** — Two-step flow: email → first/last name → success with confetti
- **Bilingual** — French / English toggle, persists across page loads
- **Dark / light theme** — Toggle with flash-free SSR (inline script in `<head>`)
- **Animated logo scene** — Framer Motion entrance animations
- **FAQ page** — Accordion layout at `/faq`
- **SEO** — JSON-LD structured data (SoftwareApplication + Organization), Open Graph, Twitter card, dynamic OG image (edge runtime), sitemap, robots.txt, Google Search Console verification, smart app banners

## Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Landing page + waitlist form |
| `/faq` | Static | FAQ accordion |
| `/opengraph-image` | Dynamic (edge) | Auto-generated OG image |
| `/sitemap.xml` | Static | XML sitemap |
| `/robots.txt` | Static | Crawl rules |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.local.example` and fill in the values (or create `.env.local` directly):

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | No | Waitlist API endpoint. Defaults to `https://api.orly.app/api/v1/join` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | No | Instagram URL — enables Instagram icon in footer |
| `NEXT_PUBLIC_LINKEDIN_URL` | No | LinkedIn URL — enables LinkedIn icon in footer |
| `NEXT_PUBLIC_APPLE_APP_ID` | No | App Store app ID — enables Apple smart app banner |
| `NEXT_PUBLIC_GOOGLE_PLAY_APP_ID` | No | Play Store app ID — enables Android smart app banner |
| `GOOGLE_SITE_VERIFICATION` | No | Google Search Console verification token |

## Project Structure

```
app/
├── components/
│   ├── Landing.tsx         # Main page layout; owns lang + theme state
│   ├── EmailForm.tsx       # Waitlist form (idle → dialog → loading → success)
│   ├── LogoScene.tsx       # Animated logo entrance
│   ├── Logo.tsx            # SVG logo component
│   ├── FaqPage.tsx         # Full FAQ page content
│   ├── FaqAccordion.tsx    # Reusable accordion section
│   ├── LanguageToggle.tsx  # FR/EN dropdown
│   ├── ThemeToggle.tsx     # Dark/light icon button
│   └── Footer.tsx          # Social links, FAQ link, copyright
├── faq/
│   └── page.tsx            # /faq route
├── globals.css             # Tailwind v4, CSS vars (dark + light), base resets
├── layout.tsx              # Root layout: font, metadata, theme flash-prevention script
├── opengraph-image.tsx     # Edge OG image (1200×630)
├── page.tsx                # Home route with JSON-LD structured data
├── robots.ts               # robots.txt generation
└── sitemap.ts              # sitemap.xml generation
public/
├── logo-orly.svg
└── logo-background-orly.svg
```

## Scripts

```bash
npm run dev     # Start dev server (Turbopack)
npm run build   # Production build
npm run start   # Start production server
npm run lint    # ESLint
```

## Changelog

### 2026-02-25

- **feat**: `FAQPage` JSON-LD structured data on `/faq` — 10 Q&A items, enables Google FAQ rich results in SERPs
- **feat**: Dedicated OG image for `/faq` route (`app/faq/opengraph-image.tsx`, edge runtime, 1200×630)
- **feat**: Language preference persisted to `localStorage` (`orly-lang`) and restored before hydration via inline `<head>` script — `document.documentElement.lang` stays in sync on toggle
- **feat**: Security response headers — `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `X-DNS-Prefetch-Control`, `Permissions-Policy`; `X-Powered-By` header removed
- **fix**: FAQ page title was rendered as "FAQ — Orly | Orly" due to root layout `title.template` — changed to `{ absolute: "FAQ | Orly" }`
- **fix**: `Footer` imported inside `Landing` (client component) was silently bundled client-side — now passed as a `ReactNode` prop from `app/page.tsx` (server component), keeping `Footer` server-only
- **fix**: LCP penalty from `<h1>` starting at `opacity: 0` — added `initial={false}` to `AnimatePresence` wrappers so headline and sub-headline render immediately on page load; language-switch animations unaffected
- **fix**: `SoftwareApplication` JSON-LD schema missing `image` property — added `https://orly.app/opengraph-image`
- **fix**: `Organization` JSON-LD description inconsistent with site copy ("in Africa") — aligned to "around you"
- **fix**: Sitemap `lastModified` was hardcoded to `2026-02-24` — changed to `new Date()` to reflect each build
- **chore**: Canonical URLs added to both `/` and `/faq` metadata
- **chore**: `openGraph` and `twitter` metadata added to FAQ route
- **chore**: `viewport` export with `themeColor` (dark/light) — replaces deprecated `themeColor` in `metadata`
- **chore**: `poweredByHeader: false` in `next.config.ts`

### 2026-02-24

- **feat**: Build out full landing page — animated `LogoScene`, bilingual hero (FR/EN), `EmailForm` two-step waitlist flow with confetti, `LanguageToggle`, `ThemeToggle`, `Footer`
- **feat**: `FaqPage` and `FaqAccordion` — bilingual FAQ with users and merchants sections, accessible accordion (ARIA)
- **feat**: SEO — OG image (edge runtime), `robots.ts`, `sitemap.ts`, JSON-LD structured data, Open Graph, Twitter card, smart app banners, GSC verification
- **feat**: Bricolage Grotesque font, dark/light theme with flash-free SSR, CSS vars for both modes
- **fix**: Escape `<` as `\u003c` in JSON-LD serialization (`app/page.tsx`) to prevent `</script>` injection
- **fix**: Add `/faq` to sitemap with `changeFrequency: "monthly"` and `priority: 0.5`
- **fix**: Remove global `overflow: hidden` from `html/body` — FAQ page now uses natural document scroll; landing page retains its own `overflow-hidden` on `<main>`
- **fix**: Reduce Bricolage Grotesque to weights `600` and `800` only — `400`, `500`, `700` were never applied via the font variable
- **fix**: Pin sitemap `lastModified` to `2026-02-24` to avoid unnecessary re-crawls on every build
- **fix**: Replace French-only FAQ metadata description with English
- **chore**: Bump `@types/node` from `^20` to `^25`
