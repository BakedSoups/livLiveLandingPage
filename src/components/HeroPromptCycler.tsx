"use client";

import { useEffect, useMemo, useState } from "react";

const prompts = [
  "Rooftop AI mixer",
  "Founder poker night",
  "Demo day dinner",
  "F1 watch party",
  "Warehouse launch",
  "Hackathon afterparty",
  "Creator pop-up",
  "Robotics showcase",
  "Investor brunch",
  "Live podcast night",
  "Gaming tournament",
  "Product hunt party",
  "Jazz bar meetup",
  "Sports car rally",
  "Coffee crawl",
  "Pitch practice night",
  "Warehouse rave",
  "Hardware demo fair",
  "Supper club",
  "AI agent meetup",
  "Founder karaoke",
  "Demo night live",
  "Builder basketball",
  "Street market launch",
];

const TYPE_MS = 34;
const DELETE_MS = 16;
const HOLD_MS = 1050;
const SUBMIT_MS = 520;

type Phase = "typing" | "holding" | "submitting" | "deleting";

export default function HeroPromptCycler() {
  const [promptIndex, setPromptIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const currentPrompt = prompts[promptIndex];

  const typed = useMemo(
    () => currentPrompt.slice(0, typedLength),
    [currentPrompt, typedLength],
  );

  useEffect(() => {
    if (phase === "typing") {
      if (typedLength < currentPrompt.length) {
        const id = window.setTimeout(
          () => setTypedLength((length) => length + 1),
          TYPE_MS,
        );
        return () => window.clearTimeout(id);
      }

      const id = window.setTimeout(() => setPhase("holding"), HOLD_MS);
      return () => window.clearTimeout(id);
    }

    if (phase === "holding") {
      const id = window.setTimeout(() => setPhase("submitting"), SUBMIT_MS);
      return () => window.clearTimeout(id);
    }

    if (phase === "submitting") {
      const id = window.setTimeout(() => setPhase("deleting"), 360);
      return () => window.clearTimeout(id);
    }

    if (typedLength > 0) {
      const id = window.setTimeout(
        () => setTypedLength((length) => length - 1),
        DELETE_MS,
      );
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(() => {
      setPromptIndex((index) => (index + 1) % prompts.length);
      setPhase("typing");
    }, 120);
    return () => window.clearTimeout(id);
  }, [currentPrompt.length, phase, typedLength]);

  return (
    <p
      aria-label={`Example event prompt: ${typed}`}
      className="typed-prompt mx-auto mt-7 flex min-h-14 w-full max-w-4xl select-none items-center justify-center px-3 font-mono text-lg text-white/90 sm:text-2xl lg:text-3xl"
    >
      <span className="typed-prompt-shell" data-submitting={phase === "submitting"}>
        <span className="mr-3 text-[#4ade80]">&gt;</span>
        <span className="typed-prompt-text">{typed}</span>
        <span className="quote-caret ml-1 inline-block h-[1.1em] w-0.5 translate-y-0.5 bg-[#4ade80]" />
        <span className="typed-prompt-key" data-visible={phase === "holding" || phase === "submitting"}>
          ENTER
        </span>
      </span>
    </p>
  );
}
