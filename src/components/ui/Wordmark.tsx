import { site } from "@/lib/site";

type Props = {
  /** "hero" = big chromatic RGB-split + jitter. "flat" = compact ink-stroke. */
  tone?: "hero" | "flat";
  text?: string;
  className?: string;
};

/**
 * The LIVLIVE wordmark, rebuilt from CSS (not the low-res render) so it can
 * chromatic-split and glitch. Size is driven entirely by the parent font-size.
 */
export default function Wordmark({
  tone = "hero",
  text = site.name,
  className = "",
}: Props) {
  if (tone === "flat") {
    return (
      <span
        className={`relative inline-block font-display leading-none tracking-tight text-punch ink-stroke-sm ${className}`}
      >
        <span
          aria-hidden
          className="absolute inset-0 -z-10 translate-x-[3px] translate-y-[3px] text-blue"
        >
          {text}
        </span>
        {text}
      </span>
    );
  }

  return (
    <span
      className={`relative inline-block font-display leading-none tracking-tight select-none ${className}`}
    >
      {/* chromatic ghosts — the Spider-Verse RGB-split */}
      <span
        aria-hidden
        className="absolute inset-0 -z-20 translate-x-[10px] translate-y-[10px] text-blue animate-jitter"
      >
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 -z-10 -translate-x-[6px] -translate-y-[3px] text-cyan mix-blend-multiply"
      >
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 -z-10 translate-x-[5px] -translate-y-[4px] text-magenta mix-blend-multiply"
      >
        {text}
      </span>
      {/* front face */}
      <span className="relative text-punch ink-stroke">{text}</span>
    </span>
  );
}
