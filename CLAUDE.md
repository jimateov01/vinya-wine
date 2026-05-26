# Vinya.wine — Project Context

## What this is

Premium wine tourism marketplace for Catalunya, Spain. Two audiences:
- **Tourists** who discover and book wine experiences
- **Wineries** who list experiences for free (12% fee per booking)

## Stack

- **Framework**: Next.js 16 App Router — read `node_modules/next/dist/docs/` before writing any Next.js code; APIs and conventions may differ from training data
- **Language**: TypeScript — never use `any`
- **Styling**: Tailwind CSS only — no inline styles, no CSS modules
- **Animation**: Framer Motion
- **i18n**: next-intl — three locales: `es` (default), `en`, `ca`

## Design system

Editorial, Mediterranean, warm earth tones.

| Token | Value | Use |
|---|---|---|
| Terracotta | `#C4622D` | Primary CTA, accents |
| Deep green | `#2C4A3E` | Headers, nav, footer |
| Off-white | `#FAF8F5` | Page background |

Typography: serif for headings, clean sans-serif for body. Generous whitespace. No rounded corners on cards (sharp, editorial).

## Regions

Penedès · Priorat · Empordà · Alella · Bages

## Landing page structure

Sections in this exact order:

1. **Hero** — full-viewport, headline + CTA to browse experiences
2. **Regions** — 4 cards (pick 4 of the 5 regions), each with photo and region name
3. **Featured experiences** — 3 tour cards, each showing title, winery name, duration, and price
4. **How it works** — 3-step explainer for tourists
5. **Winery signup form** — free listing pitch + lead capture form
6. **Footer** — links, language switcher (ES / EN / CA)

## File conventions

- Components: `/src/components/`
- Pages and layouts: `/src/app/[locale]/`
- Translations: `/src/messages/{es,en,ca}.json`
- Types: co-locate with the component or in `/src/types/` for shared types

## Rules

- TypeScript everywhere, `any` is forbidden
- Tailwind only — no other styling approach
- All user-facing strings go through next-intl (`useTranslations` / `getTranslations`)
- Framer Motion for all animations; keep them subtle and purposeful
- Mobile-first responsive design
