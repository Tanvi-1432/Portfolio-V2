interface Props {
  items: string[];
  dim?: boolean;
  color?: string;
}

export default function TechChips({ items, dim, color }: Props) {
  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      {items.map((item) => (
        <li
          key={item}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.04em",
            color: dim ? "var(--text-soft)" : (color ?? "var(--text)"),
            border: "1px solid var(--rule)",
            padding: "6px 12px",
            borderRadius: 999,
            whiteSpace: "nowrap",
            background: "rgba(232,223,211,0.02)",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
