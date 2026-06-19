import { CSSProperties } from "react";

interface Props {
  width?: string | number;
  color?: string;
  vertical?: boolean;
  style?: CSSProperties;
}

export default function Hairline({ width = "100%", color, vertical, style }: Props) {
  return (
    <span
      style={{
        display: "block",
        background: color ?? "var(--rule)",
        width: vertical ? 1 : width,
        height: vertical ? width : 1,
        flexShrink: 0,
        ...style,
      }}
    />
  );
}
