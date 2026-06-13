"use client";

import { useEffect, useMemo, useState } from "react";

const prompts = [
  "I want a Porsche racing founder event",
  "Host a rooftop AI mixer for 200 builders",
  "Plan a VC dinner after demo day",
  "Throw a fintech founder poker night",
  "Find a warehouse for an underground launch",
  "Book DJs for a late-night product party",
  "Create a Formula 1 watch party for founders",
  "Set up a climate tech salon by the beach",
  "Build a wellness morning for startup teams",
  "Organize a private chef dinner for investors",
  "Launch a fashion pop-up with creators",
  "Host a robotics showcase in a garage",
  "Plan a women in tech brunch this Sunday",
  "Throw a crypto art gallery night",
  "Find sponsors for a hackathon afterparty",
  "Book a speakeasy for 80 operators",
  "Create a tequila tasting for SaaS founders",
  "Host a live podcast with angel investors",
  "Plan a college founder pitch night",
  "Throw a gaming tournament for creators",
  "Book security for a 500-person launch",
  "Set up a founder run club breakfast",
  "Host a product hunt launch party",
  "Create a biotech investor roundtable",
  "Plan a Miami boat party for founders",
  "Find a jazz bar for a networking night",
  "Throw a creator economy dinner",
  "Host a design critique night downtown",
  "Plan a sports car rally for operators",
  "Book photographers for a brand activation",
  "Create a coffee crawl for early-stage founders",
  "Host a pitch practice night with mentors",
  "Throw a warehouse rave for developers",
  "Plan a luxury wellness retreat for CEOs",
  "Find vendors for a hardware demo fair",
  "Host a film screening for media founders",
  "Create a supper club for fintech teams",
  "Plan a charity race event with sponsors",
  "Book a rooftop for an AI agent meetup",
  "Throw a launch party with Red Bull vibes",
  "Host a sneaker pop-up for local creators",
  "Create a private networking night in SoHo",
  "Plan a motorsport fundraiser for founders",
  "Book a gallery for a startup art night",
  "Host a cybersecurity war room meetup",
  "Throw a founder karaoke afterparty",
  "Plan a champagne brunch for investors",
  "Create a demo night with live music",
  "Host a basketball tournament for builders",
  "Find permits for a street market launch",
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
      className="typed-prompt mx-auto mt-5 flex min-h-10 select-none items-center justify-center font-mono text-xs text-white/78 sm:text-base"
    >
      <span className="typed-prompt-shell" data-submitting={phase === "submitting"}>
        <span className="mr-2 text-white/42">&gt;</span>
        <span className="typed-prompt-text">{typed}</span>
        <span className="quote-caret ml-1 inline-block h-[1.1em] w-px translate-y-0.5 bg-current" />
        <span className="typed-prompt-key" data-visible={phase === "holding" || phase === "submitting"}>
          ENTER
        </span>
      </span>
    </p>
  );
}
