"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A "spider-sense" reticle cursor. Uses mix-blend-difference so it stays
 * visible over every universe colour. Snaps bigger over interactive elements.
 * Disabled entirely on touch devices (where body keeps its native cursor).
 */
export default function Cursor() {
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 30, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setActive(!!t?.closest?.("a, button, [data-cursor='grab']"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    >
      <motion.div
        animate={{ scale: active ? 1.9 : 1, rotate: active ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="relative grid h-8 w-8 place-items-center"
      >
        <span className="absolute inset-0 rounded-full border-2 border-white" />
        <span className="absolute h-3 w-[2px] bg-white" />
        <span className="absolute h-[2px] w-3 bg-white" />
      </motion.div>
    </motion.div>
  );
}
