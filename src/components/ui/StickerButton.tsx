"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type Props = {
  href: string;
  children: React.ReactNode;
  color?: string; // css token, e.g. var(--color-green)
  text?: string; // css token for label
  className?: string;
  magnetic?: boolean;
};

/**
 * The chunky die-cut sticker button: thick ink border, hard offset shadow,
 * a magnetic pull toward the cursor, and a "press" that slams the shadow shut.
 */
export default function StickerButton({
  href,
  children,
  color = "var(--color-sun)",
  text = "var(--color-ink)",
  className = "",
  magnetic = true,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 250, damping: 15 });
  const y = useSpring(my, { stiffness: 250, damping: 15 });

  function onMove(e: React.MouseEvent) {
    if (!magnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 18);
    my.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 18);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x, y, background: color, color: text }}
      whileHover={{ boxShadow: "9px 9px 0 0 var(--color-ink)" }}
      whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0 0 var(--color-ink)" }}
      className={`comic-shadow group relative inline-flex items-center gap-2 rounded-full border-[3px] border-ink px-7 py-3.5 font-display text-sm uppercase tracking-wide sm:text-base ${className}`}
    >
      {children}
    </motion.a>
  );
}
