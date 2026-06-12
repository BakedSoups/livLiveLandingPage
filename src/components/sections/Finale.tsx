"use client";

import { motion } from "motion/react";
import TornEdge from "@/components/ui/TornEdge";
import Wordmark from "@/components/ui/Wordmark";
import StickerButton from "@/components/ui/StickerButton";
import Sticker from "@/components/ui/Sticker";
import { site } from "@/lib/site";

const contacts = [
  site.contact.instagram,
  site.contact.phone,
  site.contact.email,
];

export default function Finale() {
  return (
    <footer
      id="join"
      className="relative isolate overflow-hidden bg-magenta px-6 pb-12 pt-28 text-paper sm:pt-36"
    >
      <TornEdge color="var(--color-magenta)" position="top" />

      {/* rays + halftone */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 aspect-square w-[140vmax] -translate-x-1/2 rays animate-spin-slow opacity-[0.1]"
        style={{ ["--ray-a" as string]: "var(--color-paper)" }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 text-paper/[0.08] halftone-lg" />

      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-paper/80"
        >
          issue #05 — your move, host
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="mt-5 font-display text-[clamp(2.6rem,9vw,6.5rem)] leading-[0.9] ink-stroke"
        >
          enter the
          <br />
          event-verse
        </motion.h2>

        <p className="mx-auto mt-7 max-w-lg text-balance text-lg text-paper/90">
          Early access is opening for hosts who want to throw something
          legendary. {site.hashtag} :)
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <StickerButton href={site.cta.primary.href} color="var(--color-green)">
            {site.cta.primary.label}
          </StickerButton>
          <StickerButton href={site.cta.secondary.href} color="var(--color-cyan)">
            {site.cta.secondary.label}
          </StickerButton>
        </div>

        {/* contact chips */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {contacts.map((c, i) => (
            <a key={c.href} href={c.href} target="_blank" rel="noreferrer">
              <Sticker
                color="var(--color-paper)"
                text="var(--color-ink)"
                rotate={i % 2 ? 3 : -3}
                className="!normal-case font-mono !text-xs sm:!text-sm"
              >
                {c.label}
              </Sticker>
            </a>
          ))}
        </div>
      </div>

      {/* giant wordmark baseline */}
      <div className="relative mt-20 flex flex-col items-center">
        <Wordmark tone="hero" className="text-[clamp(3rem,18vw,16rem)]" />
        <div className="mt-6 flex w-full max-w-5xl flex-col items-center justify-between gap-3 border-t-[3px] border-ink/30 pt-6 font-mono text-xs uppercase tracking-widest text-paper/80 sm:flex-row">
          <span>{site.est}</span>
          <span>built for hosts, not corporates ♥</span>
          <span>© {site.name}</span>
        </div>
      </div>
    </footer>
  );
}
