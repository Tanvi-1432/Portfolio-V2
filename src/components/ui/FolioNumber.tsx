import { CSSProperties, ReactNode } from "react";

interface Props {
  children: ReactNode;
  size?: number;
  style?: CSSProperties;
}

export default function FolioNumber({ children, size = 16, style }: Props) {
  return (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: size,
        color: "var(--text-soft)",
        letterSpacing: "0.04em",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
