import type { Variants } from "motion/react";

/** Shared spring + easing language so motion feels cohesive across sections. */
export const EASE_POP = [0.34, 1.56, 0.64, 1] as const;
export const EASE_SNAP = [0.85, 0, 0.15, 1] as const;

export const popSpring = {
  type: "spring",
  stiffness: 320,
  damping: 22,
  mass: 0.7,
} as const;

/** Container that staggers its children into view. */
export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

/** A single sticker "slapping" onto the page. */
export const slapIn: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.7, rotate: -8 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 360, damping: 20 },
  },
};

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SNAP },
  },
};
