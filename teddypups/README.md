# TeddyPups U.A.E. — Website Clone

A complete frontend clone of [puppy.instabizweb.com](https://puppy.instabizweb.com/) built as a technical assignment for Insta Biz Web.

## Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **next/font** — Figtree, Fraunces, Shantell Sans (matching the reference)

## Pages

| Route | Description |
| --- | --- |
| `/` | Home — hero, pups, journey, trust, families, FAQ teaser, CTA |
| `/puppies` | Available + gone-home listings |
| `/puppies/[slug]` | Puppy detail + enquire form |
| `/happy-families` | Gallery + testimonial |
| `/how-it-works` | Two paths home + delivery |
| `/faq` | Accordion FAQ |
| `/contact` | Letter-style contact form + visit info |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/           # Routes (App Router)
  components/    # Header, Footer, forms, cards
  data/          # Puppies, FAQs, family moments
  lib/           # Site constants / helpers
```

## Notes

- Puppy / family images are stored under `public/media` (mirrored from the reference for visual fidelity).
- Contact form validates client-side and offers a WhatsApp handoff (no backend email service).
- Designed to be responsive across mobile, tablet, and desktop.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com). Framework preset: Next.js.
