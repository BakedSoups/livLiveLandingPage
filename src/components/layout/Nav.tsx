"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Wordmark from "@/components/ui/Wordmark";
import StickerButton from "@/components/ui/StickerButton";
import { nav, site } from "@/lib/site";

/** Fixed nav that drops in once you leave the hero, styled as a comic toolbar. */
export default function Nav() {
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    if (typeof window !== "undefined") setShown(v > window.innerHeight * 0.7);
  });

  return (
    <motion.header
      initial={{ y: -120 }}
      animate={{ y: shown ? 0 : -120 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="fixed inset-x-0 top-3 z-[80] mx-auto flex w-[min(1100px,94vw)] items-center justify-between rounded-full border-[3px] border-ink bg-paper/85 px-5 py-2.5 backdrop-blur-md comic-shadow-sm"
    >
      <a href="#top" className="text-2xl">
        <Wordmark tone="flat" />
      </a>

      <nav className="hidden items-center gap-7 md:flex">
        {nav.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className="font-mono text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:text-punch"
          >
            {n.label}
          </a>
        ))}
      </nav>

      <StickerButton
        href={site.cta.primary.href}
        color="var(--color-green)"
        className="!px-5 !py-2 !text-xs"
      >
        {site.cta.primary.label}
      </StickerButton>
    </motion.header>
  );
}
