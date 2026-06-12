# LIVLIVE — "Into the Event-Verse"

A scroll-driven, Spider-Verse / sticker-comic landing page for **LIVLIVE** — the
largest partnership network for hosts. Built to feel like a comic book you fall
*through*, not a corporate SaaS page.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind v4 (CSS-first `@theme` tokens in `globals.css`) |
| Motion | `motion` (Framer Motion) for scroll + micro-interactions |
| Scroll | `lenis` smooth-scroll (powers every scene transition) |
| Type | Bungee (display) · Schibsted Grotesk (body) · Space Mono (labels) · Gloria Hallelujah (marker) |

## Run

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
```

## The scroll (each section = a different "universe")

1. **Hero** — chromatic RGB-split `LIVLIVE` wordmark, draggable comic stickers, sunburst parallax.
2. **Manifesto** (blue) — "ANYONE CAN HOST." with kinetic marquees + torn page-turn edges.
3. **Network** (cream) — *pinned horizontal scroll*: venues · talent · vendors · sponsors slide sideways as you scroll down.
4. **Text → Booking** (ink) — a comic AI console that types a prompt and deals out booked results.
5. **Superpowers** (yellow) — the host AI toolkit as tilt-on-hover power cards.
6. **Finale** (magenta) — CTA, contact chips, giant wordmark.

## Architecture

```
src/
  app/            layout (fonts, providers, overlays) · page (composition) · globals.css (design system)
  components/
    providers/    SmoothScroll (Lenis)
    layout/       Nav · Cursor (spider-reticle) · Grain · ScrollProgress
    ui/           Wordmark · StickerButton · Sticker · Starburst · SpeechBubble · SectionLabel · TornEdge
    sections/     Hero · Manifesto · Network · TextToBooking · Superpowers · Finale
  lib/            site.ts (all copy/brand data) · motion.ts (shared variants)
```

All copy is sourced from the live LivLive site and lives in `src/lib/site.ts`.
CTAs (`#join`) currently scroll to the finale — wire them to a real waitlist when ready.
