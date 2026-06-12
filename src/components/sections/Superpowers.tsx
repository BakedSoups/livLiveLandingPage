"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useInView,
} from "motion/react";
import TornEdge from "@/components/ui/TornEdge";
import Sticker from "@/components/ui/Sticker";
import SectionLabel from "@/components/ui/SectionLabel";
import { powers, type Power } from "@/lib/site";

function PowerCard({ power, index }: { power: Power; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const rx = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 14);
    rx.set(-py * 14);
  }
  function reset() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, rotate: index % 2 ? 4 : -4 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.08 }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -6 }}
        className="comic-shadow-lg relative h-full overflow-hidden rounded-[28px] border-[4px] border-ink bg-paper p-7 sm:p-8"
      >
        {/* coloured power header */}
        <div
          className="relative -mx-7 -mt-7 mb-6 flex items-center justify-between border-b-[4px] border-ink px-7 py-5 text-paper sm:-mx-8 sm:px-8"
          style={{ background: power.color }}
        >
          <span className="font-display text-2xl uppercase ink-stroke-sm sm:text-3xl">
            {power.title}
          </span>
          <span className="font-display text-3xl text-paper/40">
            0{index + 1}
          </span>
          <div className="pointer-events-none absolute inset-0 text-paper/15 halftone" />
        </div>

        <p className="text-pretty text-base text-ink/85 sm:text-lg">
          {power.blurb}
        </p>

        <div className="mt-6">
          <Sticker
            color={power.color}
            rotate={-5}
            className="text-xs sm:text-sm"
          >
            {power.sound}
          </Sticker>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Superpowers() {
  return (
    <section
      id="superpowers"
      className="relative isolate overflow-hidden bg-sun py-24 text-ink sm:py-32"
    >
      <TornEdge color="var(--color-sun)" position="top" />
      <div className="pointer-events-none absolute inset-0 -z-10 text-ink/[0.06] halftone-lg" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[120vmax] -translate-x-1/2 -translate-y-1/2 rays animate-spin-slow opacity-[0.06]"
        style={{ ["--ray-a" as string]: "var(--color-ink)" }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-5 flex justify-center">
            <SectionLabel color="var(--color-ink)">issue #04 — your superpowers</SectionLabel>
          </div>
          <h2 className="font-display text-[clamp(2.4rem,7.5vw,5.5rem)] leading-[0.9]">
            own the whole
            <br />
            <span className="text-punch ink-stroke-sm">community.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-ink/80">
            Assign roles, approve attendees, measure loyalty and personalise
            targeting — AI tools that let you run the entire experience of your
            audience.
          </p>
        </div>

        <div className="grid gap-7 sm:grid-cols-2">
          {powers.map((p, i) => (
            <PowerCard key={p.key} power={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
