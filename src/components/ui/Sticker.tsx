"use client";

import { motion } from "motion/react";

type Props = {
  children: React.ReactNode;
  color?: string;
  text?: string;
  rotate?: number;
  className?: string;
  /** let the user fling it around */
  draggable?: boolean;
  float?: boolean;
};

/**
 * A slap-on comic sticker (onomatopoeia, tags). Optionally draggable so people
 * can fling them around the hero — the kind of toy detail that gets remembered.
 */
export default function Sticker({
  children,
  color = "var(--color-magenta)",
  text = "var(--color-paper)",
  rotate = -6,
  className = "",
  draggable = false,
  float = false,
}: Props) {
  return (
    <motion.div
      drag={draggable}
      dragMomentum={draggable}
      dragElastic={0.35}
      whileDrag={{ scale: 1.12, cursor: "grabbing", zIndex: 50 }}
      whileHover={draggable ? { scale: 1.08, rotate: rotate + 3 } : undefined}
      initial={{ rotate }}
      style={{ background: color, color: text, ["--r" as string]: `${rotate}deg` }}
      className={`comic-shadow-sm pointer-events-auto inline-flex items-center justify-center rounded-2xl border-[3px] border-ink px-4 py-2 font-display text-sm uppercase leading-none ${
        draggable ? "cursor-grab" : ""
      } ${float ? "animate-float" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
