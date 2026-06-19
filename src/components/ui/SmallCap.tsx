import { CSSProperties, ReactNode } from "react";

interface Props {
  children: ReactNode;
  color?: string;
  size?: number;
  style?: CSSProperties;
  className?: string;
}

export default function SmallCap({ children, color, size = 11, style, className }: Props) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-ui)",
        fontSize: size,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: color ?? "var(--text-soft)",
        lineHeight: 1,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
