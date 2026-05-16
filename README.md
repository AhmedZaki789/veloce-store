# VELOCE — Performance & Style

A racing-inspired car-accessories ecommerce storefront, built with Next.js 14 (App Router) and React 18. Engineered in Milano, deployed to the edge.

## Features

- **Cinematic homepage** — animated hero with scanning beam, mouse-tracking reticle, live µm readout, marquee ticker, count-up stats, scroll reveals.
- **Full purchase flow** — Home → Shop → Product → Cart → Checkout (3-step) → Confirmation, all client-side state.
- **Cart context** with `localStorage` persistence and a slide-in mini-cart drawer.
- **Custom SVG products** — every product has a hand-drawn racing-themed silhouette (no image assets needed).
- **Filterable catalog** — 21 SKUs across 5 categories (Exterior, Interior, Detailing, Tech, Lifestyle). Filter by category, price, material; sort by price/newest; grid or list view.
- **Multi-spec product page** with variants, fitment selector, view rotator, spec/fitment/warranty tabs.
- **Multi-step checkout** with express-pay buttons, live credit-card preview, payment-method tabs (Card / PayPal / Klarna / Crypto).
- **Order confirmation** with checkered-flag stepper and tracking timeline.
- **Authentication UI** (sign-in / join) with social providers — UI only, no backend yet.

## Stack

- **Next.js 14** App Router + React 18
- **TypeScript** (strict)
- All styling inline + CSS variables (no Tailwind, no UI lib)
- Fonts: Anton, Space Grotesk, JetBrains Mono, Bodoni Moda (via Google Fonts)

## Local dev

```bash
cd veloce-store
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel

The fastest path:

1. Push this repo (already on branch `claude/build-commerce-website-WFTC0`).
2. Go to [vercel.com/new](https://vercel.com/new) and import `ahmedzaki789/atrees-erp`.
3. **Set the root directory to `veloce-store`** in the Vercel project settings.
4. Vercel auto-detects Next.js — keep the defaults and click **Deploy**.

Or, with the Vercel CLI installed locally:

```bash
cd veloce-store
npx vercel --prod
```

No environment variables are required for the demo.

## Project structure

```
veloce-store/
├── app/                       # Next.js App Router pages
│   ├── layout.tsx             # Root layout (cart provider, header, footer, fonts)
│   ├── page.tsx               # Home
│   ├── globals.css            # Theme tokens + keyframes
│   ├── shop/page.tsx          # Catalog with filters
│   ├── product/[id]/page.tsx  # Product detail
│   ├── cart/page.tsx          # Cart
│   ├── checkout/page.tsx      # 3-step checkout
│   ├── confirmation/page.tsx  # Post-purchase
│   └── account/page.tsx       # Sign in / join
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── MiniCart.tsx           # Slide-in drawer + flash toast
│   ├── ProductCard.tsx        # 3 styles: minimal / editorial / racing
│   ├── Icon.tsx               # Inline SVG icon set + Badge
│   ├── Visuals.tsx            # CarSVG, HeroStage, ProductShape, PaintPen
│   └── Effects.tsx            # Reveal/CountUp/TypeOn/Glitch/DataStream/ScanBeam
└── lib/
    ├── data.ts                # Products, categories, copy
    └── cart-context.tsx       # Cart state + localStorage persistence
```

## What's mocked

- Login does not authenticate — it just navigates home.
- Checkout does not charge anything — `Place Order` clears the cart and routes to a fake confirmation.
- Promo codes and the newsletter form are inert.
- The catalogue lives in `lib/data.ts`; swap it for an API call when you wire a backend.

## Customisation

- **Accent colour** — change the `--v-red` CSS variable in `app/globals.css`, or `ACCENT` in each page.
- **Catalogue** — edit `lib/data.ts`.
- **Brand name** — search/replace `VELOCE` and update the logo in `components/Header.tsx`.
