import { CSSProperties, ElementType, ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  style?: CSSProperties;
  as?: ElementType;
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  y = 16,
  style,
  as: As = "div",
  className,
}: Props) {
  return (
    <As
      className={`folio-fade${className ? ` ${className}` : ""}`}
      style={
        {
          "--delay": `${delay}ms`,
          "--fade-y": `${y}px`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </As>
  );
}
