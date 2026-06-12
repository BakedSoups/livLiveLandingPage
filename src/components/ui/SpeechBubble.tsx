type Props = {
  children: React.ReactNode;
  color?: string;
  text?: string;
  className?: string;
  /** which corner the tail points from */
  tail?: "bl" | "br" | "tl" | "tr" | "none";
};

/** A comic speech bubble with an ink-outlined tail. */
export default function SpeechBubble({
  children,
  color = "var(--color-paper-2)",
  text = "var(--color-ink)",
  className = "",
  tail = "bl",
}: Props) {
  const tailPos: Record<string, string> = {
    bl: "left-10 -bottom-3 rotate-[25deg]",
    br: "right-10 -bottom-3 -rotate-[25deg]",
    tl: "left-10 -top-3 rotate-[205deg]",
    tr: "right-10 -top-3 rotate-[155deg]",
  };

  return (
    <div
      style={{ background: color, color: text }}
      className={`comic-shadow relative rounded-[28px] border-[3px] border-ink px-6 py-5 ${className}`}
    >
      {children}
      {tail !== "none" && (
        <span
          aria-hidden
          style={{ background: color }}
          className={`absolute h-6 w-6 border-b-[3px] border-r-[3px] border-ink ${tailPos[tail]}`}
        />
      )}
    </div>
  );
}
