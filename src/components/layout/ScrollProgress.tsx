"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A web-thread progress bar that fills across the universe palette on scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[90] h-[6px] w-full origin-left border-b-2 border-ink"
    >
      <div className="h-full w-full bg-[linear-gradient(90deg,var(--color-punch),var(--color-sun),var(--color-green),var(--color-cyan),var(--color-blue),var(--color-magenta),var(--color-violet))]" />
    </motion.div>
  );
}
