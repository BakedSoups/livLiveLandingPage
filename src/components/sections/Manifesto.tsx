"use client";

import { motion } from "motion/react";
import TornEdge from "@/components/ui/TornEdge";
import SectionLabel from "@/components/ui/SectionLabel";
import { staggerParent, riseIn } from "@/lib/motion";

const TOP = ["VENUES", "TALENT", "VENDORS", "SPONSORS", "TICKETING", "ANALYTICS"];
const BOTTOM = [
  "#itoocanhost",
  "text → booking",
  "in minutes",
  "no agency",
  "no chaos",
];

function Marquee({
  items,
  reverse,
  className = "",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  const row = [...items, ...items, ...items];
  return (
    <div className={`flex overflow-hidden ${className}`}>
      <div
        className="flex shrink-0 animate-marquee items-center gap-8 pr-8 font-display text-2xl uppercase sm:text-4xl"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          ["--marquee-dur" as string]: "26s",
        }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            {t}
            <span className="text-sun">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Manifesto() {
  return (
    <section className="relative isolate overflow-hidden bg-blue py-24 text-paper sm:py-32">
      <TornEdge color="var(--color-blue)" position="top" />

      {/* faint halftone field */}
      <div className="pointer-events-none absolute inset-0 -z-10 text-paper/[0.08] halftone-lg" />

      <Marquee items={TOP} className="text-paper/90" />

      <div className="mx-auto my-16 max-w-4xl px-6 text-center sm:my-20">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div variants={riseIn} className="mb-8 flex justify-center">
            <SectionLabel color="var(--color-sun)">issue #01 — the big idea</SectionLabel>
          </motion.div>

          <motion.h2
            variants={riseIn}
            className="font-display text-[clamp(2.6rem,9vw,7rem)] leading-[0.92] text-paper ink-stroke"
          >
            ANYONE
            <br />
            CAN HOST.
          </motion.h2>

          <motion.p
            variants={riseIn}
            className="mx-auto mt-8 max-w-2xl text-balance text-lg text-paper/90 sm:text-2xl"
          >
            Type the vibe. LIVLIVE assembles the venue, the talent, the vendors
            and the sponsor — and you&apos;re booked before the group chat even
            replies.
          </motion.p>

          <motion.p
            variants={riseIn}
            className="mt-8 font-marker text-xl text-sun sm:text-2xl"
          >
            powered by AI tools built for hosts ✸
          </motion.p>
        </motion.div>
      </div>

      <Marquee items={BOTTOM} reverse className="text-sun" />
      <TornEdge color="var(--color-paper)" position="bottom" />
    </section>
  );
}
