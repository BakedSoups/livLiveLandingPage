"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Wordmark from "@/components/ui/Wordmark";
import Starburst from "@/components/ui/Starburst";
import Sticker from "@/components/ui/Sticker";
import StickerButton from "@/components/ui/StickerButton";
import { posters, site } from "@/lib/site";

const posterLayout = [
  "left-[2%] top-[2%] z-[1] w-[33%]",
  "left-[26%] top-[8%] z-[2] w-[34%]",
  "right-[4%] top-[1%] z-[1] w-[31%]",
  "left-[13%] bottom-[0%] z-[4] w-[34%]",
  "right-[12%] bottom-[4%] z-[3] w-[32%]",
] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Hero parallax: the wordmark drifts up + scales, decorations leave faster.
  const wordY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const wordScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const decoY = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const raysRot = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-28"
    >
      {/* ---- background: rotating ray burst + halftone ---- */}
      <motion.div
        style={{ rotate: raysRot }}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-20 aspect-square w-[160vmax] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-full w-full rays animate-spin-slow opacity-[0.12]"
          style={{
            ["--ray-a" as string]: "var(--color-punch)",
            ["--ray-b" as string]: "transparent",
          }}
        />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 text-ink/[0.07] halftone-lg"
      />
      {/* soft vignette so the centre pops */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-paper)_92%)]"
      />

      {/* ---- floating draggable comic stickers ---- */}
      <motion.div
        style={{ y: decoY, opacity: fade }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="pointer-events-none absolute inset-0 mx-auto max-w-6xl">
          <Sticker
            draggable
            float
            color="var(--color-magenta)"
            rotate={-10}
            className="!absolute left-[6%] top-[20%] text-lg sm:text-2xl"
          >
            POW!
          </Sticker>
          <Sticker
            draggable
            float
            color="var(--color-cyan)"
            text="var(--color-ink)"
            rotate={9}
            className="!absolute right-[8%] top-[16%] text-lg sm:text-2xl"
          >
            THWIP!
          </Sticker>
          <Sticker
            draggable
            color="var(--color-blue)"
            rotate={-6}
            className="!absolute left-[12%] bottom-[24%] text-sm max-sm:!hidden sm:text-lg"
          >
            no agency
          </Sticker>
          <Sticker
            draggable
            color="var(--color-green)"
            text="var(--color-ink)"
            rotate={7}
            className="!absolute right-[10%] bottom-[26%] text-sm max-sm:!hidden sm:text-lg"
          >
            zero spreadsheets
          </Sticker>
        </div>
      </motion.div>

      {/* ---- centre stack ---- */}
      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1fr)]"
      >
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-6 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-ink/70 sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-punch" />
            {site.est}
            <span className="hidden sm:inline">· the largest partner network for hosts</span>
          </div>

          <motion.div
            style={{ y: wordY, scale: wordScale }}
            className="origin-center lg:origin-left"
          >
            <Wordmark
              tone="hero"
              className="text-[clamp(3.3rem,13vw,9rem)]"
            />
          </motion.div>

          {/* tagline row with starburst */}
          <div className="relative mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start">
            <h1 className="font-display text-[clamp(1.3rem,4.4vw,3rem)] leading-none text-ink">
              host IRL events
            </h1>
            <Starburst
              color="var(--color-blue)"
              spikes={16}
              rotate={-8}
              className="w-28 text-paper sm:w-36"
            >
              <span className="text-[clamp(0.9rem,2.4vw,1.5rem)] text-paper">
                in 10
                <br />
                mins!
              </span>
            </Starburst>
          </div>

          <p className="mt-7 max-w-xl text-balance font-sans text-base text-ink/80 sm:text-lg">
            The largest partnership network for people who throw real-world events.
            Venues, talent, vendors &amp; sponsors — go from text to booking in
            minutes.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <StickerButton href={site.cta.primary.href} color="var(--color-green)">
              {site.cta.primary.label}
            </StickerButton>
            <StickerButton
              href={site.cta.secondary.href}
              color="var(--color-paper-2)"
            >
              {site.cta.secondary.label}
            </StickerButton>
          </div>

          <p className="mt-6 font-marker text-lg text-punch">{site.hashtag} :)</p>
        </div>

        <div className="relative mx-auto hidden aspect-[1.05/1] w-full max-w-[620px] perspective lg:block">
          <div className="absolute inset-0 rounded-[36px] border-[4px] border-ink bg-paper-2 comic-shadow-lg" />
          <div className="absolute inset-0 overflow-hidden rounded-[36px] text-ink/[0.08] halftone-lg" />
          <Sticker
            color="var(--color-punch)"
            rotate={-6}
            className="!absolute -left-6 top-10 z-10 text-sm"
          >
            live posters
          </Sticker>
          {posters.map((poster, index) => (
            <motion.figure
              key={poster.src}
              drag
              dragElastic={0.12}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
              style={{ rotate: poster.rotate }}
              className={`comic-shadow-sm absolute rounded-[24px] border-[4px] border-ink p-2 pb-7 ${
                posterLayout[index] ?? ""
              }`}
            >
              <div
                className="absolute inset-0 rounded-[19px]"
                style={{ background: poster.color }}
              />
              <Image
                src={poster.src}
                alt={poster.alt}
                width={660}
                height={880}
                className="relative aspect-[3/4] w-full rounded-[14px] object-cover"
              />
            </motion.figure>
          ))}
        </div>
      </motion.div>

      {/* ---- scroll cue ---- */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ink/60">
          scroll into the event-verse
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto mt-2 text-2xl"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
