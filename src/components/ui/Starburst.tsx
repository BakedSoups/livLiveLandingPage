type Props = {
  children: React.ReactNode;
  /** number of spikes */
  spikes?: number;
  color?: string;
  stroke?: string;
  className?: string;
  rotate?: number;
};

/** A spiky comic price-burst badge ("in 10 mins!", "EST. 2026", etc). */
export default function Starburst({
  children,
  spikes = 14,
  color = "var(--color-sun)",
  stroke = "var(--color-ink)",
  className = "",
  rotate = 0,
}: Props) {
  const pts: string[] = [];
  const cx = 50;
  const cy = 50;
  const outer = 49;
  const inner = 39;
  const total = spikes * 2;
  for (let i = 0; i < total; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / spikes) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }

  return (
    <div
      className={`relative grid aspect-square place-items-center ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full drop-shadow-[5px_5px_0_var(--color-ink)]"
        aria-hidden
      >
        <polygon
          points={pts.join(" ")}
          fill={color}
          stroke={stroke}
          strokeWidth={3}
          strokeLinejoin="round"
        />
      </svg>
      <div className="relative z-10 px-2 text-center font-display leading-none text-ink">
        {children}
      </div>
    </div>
  );
}
