"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import TornEdge from "@/components/ui/TornEdge";
import Sticker from "@/components/ui/Sticker";
import { universes } from "@/lib/site";

/**
 * Pinned horizontal scroll: the page sticks and the "multiverse of partners"
 * slides sideways as you scroll down. Distance is measured from the real DOM so
 * the math survives any number of panels / viewport size.
 */
export default function Network() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0.08, 0.95], [0, -distance]);

  return (
    <section
      id="network"
      ref={sectionRef}
      className="relative bg-paper"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <TornEdge color="var(--color-paper)" position="top" />

      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* heading */}
        <div className="z-20 px-6 pt-20 sm:px-12 sm:pt-24">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-ink/60">
            issue #02 — the multiverse of partners
          </p>
          <h2 className="mt-2 max-w-3xl font-display text-[clamp(1.8rem,5vw,3.6rem)] leading-[0.95] text-ink">
            the largest partnership
            <br />
            network, in one tap
            <span className="text-punch">.</span>
          </h2>
        </div>

        {/* horizontal track */}
        <div className="flex flex-1 items-center">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 px-6 will-transform sm:gap-10 sm:px-12"
          >
            {universes.map((u, i) => (
              <article
                key={u.key}
                style={{ background: u.color }}
                className="comic-shadow-lg relative flex h-[58vh] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-[32px] border-[4px] border-ink p-7 text-paper sm:w-[440px] sm:p-9"
              >
                {/* halftone wash */}
                <div className="pointer-events-none absolute inset-0 text-paper/15 halftone-lg" />

                <div className="relative flex items-start justify-between">
                  <span className="font-display text-6xl text-paper/30">
                    0{i + 1}
                  </span>
                  <Sticker
                    color="var(--color-sun)"
                    text="var(--color-ink)"
                    rotate={8}
                    className="text-xs sm:text-sm"
                  >
                    {u.sound}
                  </Sticker>
                </div>

                <div className="relative">
                  <div className="comic-shadow-sm mb-6 grid h-24 w-24 place-items-center rounded-2xl border-[3px] border-ink bg-paper text-5xl">
                    <span>{u.glyph}</span>
                  </div>
                  <h3 className="font-display text-4xl uppercase text-paper ink-stroke-sm sm:text-5xl">
                    {u.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-pretty text-base text-paper/95 sm:text-lg">
                    {u.blurb}
                  </p>
                </div>
              </article>
            ))}

            {/* tail card → CTA into next scene */}
            <div className="grid h-[58vh] w-[70vw] shrink-0 place-items-center sm:w-[360px]">
              <div className="text-center">
                <p className="font-display text-[clamp(2rem,6vw,4rem)] leading-none text-ink">
                  + everything
                  <br />
                  else.
                </p>
                <p className="mt-4 font-marker text-xl text-punch">
                  go from text to booking ↓
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* scroll hint */}
        <div className="z-20 px-6 pb-6 sm:px-12">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ink/50">
            keep scrolling — the network slides →
          </p>
        </div>
      </div>
    </section>
  );
}
