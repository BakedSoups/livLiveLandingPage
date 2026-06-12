type Props = {
  color?: string;
  /** sit at the top or bottom of the parent section */
  position?: "top" | "bottom";
  className?: string;
  teeth?: number;
};

/**
 * A torn / zigzag comic-panel edge. Place inside a section (which is
 * `relative`) so the colour "tears" over the neighbouring universe — turning
 * each colour change into a deliberate page-turn instead of a flat seam.
 */
export default function TornEdge({
  color = "var(--color-paper)",
  position = "top",
  className = "",
  teeth = 28,
}: Props) {
  // Build a zigzag across a 0..100 width box, 0..10 tall.
  const step = 100 / teeth;
  const pts: string[] = [];
  if (position === "top") {
    pts.push("0,10");
    for (let i = 0; i <= teeth; i++) {
      const x = i * step;
      const y = i % 2 === 0 ? 0.5 : 8.5;
      pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }
    pts.push("100,10");
  } else {
    pts.push("0,0");
    for (let i = 0; i <= teeth; i++) {
      const x = i * step;
      const y = i % 2 === 0 ? 9.5 : 1.5;
      pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }
    pts.push("100,0");
  }

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      className={`absolute left-0 z-10 h-5 w-full sm:h-8 ${
        position === "top" ? "-top-px" : "-bottom-px"
      } ${className}`}
    >
      <polygon points={pts.join(" ")} fill={color} />
    </svg>
  );
}
