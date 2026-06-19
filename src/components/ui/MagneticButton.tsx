"use client";

import { CSSProperties, ElementType, MouseEvent, ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

interface Props {
  children: ReactNode;
  as?: ElementType;
  strength?: number;
  style?: CSSProperties;
  className?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  "data-cursor-label"?: string;
  "aria-label"?: string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  as: As = "button",
  children,
  strength = 0.3,
  style,
  className,
  ...rest
}: Props) {
  const magneticRef = useMagnetic(strength);

  return (
    <As
      ref={magneticRef}
      className={`magnetic-button${className ? ` ${className}` : ""}`}
      style={style}
      {...rest}
    >
      {children}
    </As>
  );
}
