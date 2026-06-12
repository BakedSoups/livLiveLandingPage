type Props = {
  children: React.ReactNode;
  color?: string;
  className?: string;
};

/** Small mono "issue tag" that headers each section like a comic panel number. */
export default function SectionLabel({
  children,
  color = "var(--color-ink)",
  className = "",
}: Props) {
  return (
    <span
      style={{ borderColor: color, color }}
      className={`inline-flex items-center gap-2 rounded-full border-2 bg-paper/50 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] ${className}`}
    >
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{ background: color }}
      />
      {children}
    </span>
  );
}
