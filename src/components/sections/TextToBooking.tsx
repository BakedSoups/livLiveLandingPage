"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import TornEdge from "@/components/ui/TornEdge";
import Starburst from "@/components/ui/Starburst";
import SectionLabel from "@/components/ui/SectionLabel";
import { bookingDemo } from "@/lib/site";

export default function TextToBooking() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const full = bookingDemo.prompt;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(id);
        setTimeout(() => setDone(true), 350);
      }
    }, 38);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section
      id="how"
      className="relative isolate overflow-hidden bg-ink py-24 text-paper sm:py-32"
    >
      <TornEdge color="var(--color-ink)" position="top" />
      <div className="pointer-events-none absolute inset-0 -z-10 text-paper/[0.06] halftone-lg" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        {/* copy */}
        <div>
          <SectionLabel color="var(--color-cyan)">issue #03 — how it works</SectionLabel>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,7vw,5rem)] leading-[0.92]">
            type the
            <br />
            <span className="text-cyan">vibe.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-paper/80">
            Describe the event in plain words. LIVLIVE&apos;s AI pulls the venue,
            the talent, the vendors and a sponsor that fits — and hands you a
            booking. Minutes, not weeks.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-widest text-paper/60">
            <span>text</span>
            <span className="text-cyan">→</span>
            <span>match</span>
            <span className="text-cyan">→</span>
            <span>book</span>
            <span className="text-cyan">→</span>
            <span className="text-sun">done</span>
          </div>
        </div>

        {/* the comic AI console */}
        <div ref={ref} className="relative">
          <div className="comic-shadow-lg rounded-[26px] border-[4px] border-ink bg-paper p-5 text-ink sm:p-7">
            {/* title bar */}
            <div className="mb-5 flex items-center gap-2 border-b-[3px] border-ink/15 pb-4">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-punch" />
              <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-sun" />
              <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-green" />
              <span className="ml-3 font-mono text-xs font-bold uppercase tracking-widest text-ink/50">
                livlive.ai
              </span>
            </div>

            {/* prompt */}
            <div className="min-h-[3.5rem] font-mono text-base leading-relaxed sm:text-lg">
              <span className="text-punch">&rsaquo;&nbsp;</span>
              {typed}
              {!done && <span className="animate-caret text-ink">▍</span>}
            </div>

            {/* results */}
            <motion.div
              initial="hidden"
              animate={done ? "show" : "hidden"}
              variants={{ show: { transition: { staggerChildren: 0.12 } } }}
              className="mt-5 space-y-3"
            >
              {bookingDemo.results.map((r) => (
                <motion.div
                  key={r.tag}
                  variants={{
                    hidden: { opacity: 0, x: -24, scale: 0.96 },
                    show: {
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: { type: "spring", stiffness: 380, damping: 22 },
                    },
                  }}
                  className="flex items-center gap-3 rounded-2xl border-[3px] border-ink bg-paper-2 px-4 py-3 comic-shadow-sm"
                >
                  <span
                    className="rounded-full border-2 border-ink px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-paper"
                    style={{ background: r.color }}
                  >
                    {r.tag}
                  </span>
                  <span className="font-sans text-sm font-semibold sm:text-base">
                    {r.label}
                  </span>
                  <span className="ml-auto font-display text-green">✓</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* booked stamp */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={done ? { scale: 1, rotate: -14 } : {}}
            transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.4 }}
            className="absolute -bottom-7 -right-3 w-28 sm:-right-7 sm:w-36"
          >
            <Starburst color="var(--color-green)" spikes={18}>
              <span className="text-sm leading-none text-ink sm:text-base">
                BOOKED!
              </span>
            </Starburst>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
