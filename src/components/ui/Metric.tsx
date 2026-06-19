interface Props {
  value: string;
  label: string;
  accent?: boolean;
}

export default function Metric({ value, label, accent }: Props) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "clamp(44px, 5.5vw, 84px)",
          lineHeight: 0.92,
          letterSpacing: "-0.02em",
          color: accent ? "var(--accent)" : "var(--cream)",
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 12,
          fontFamily: "var(--font-ui)",
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--text-soft)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
