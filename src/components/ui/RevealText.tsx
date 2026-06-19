import { CSSProperties, ElementType, ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  /** Tag for the moving inner element. */
  as?: ElementType;
  /** Block mask for headings/lines; inline (default) for inline runs. */
  block?: boolean;
  style?: CSSProperties;
  className?: string;
}

/**
 * Masked rise reveal. The inner element starts translated below a clipped
 * mask and rises into place when an ancestor carries [data-reveal-state="in"].
 *
 * Best applied to text whose surrounding spacing lives on the parent (the
 * clip establishes a block-formatting context, so the moving element's own
 * vertical margins are trapped inside the mask). Reduced-motion is handled in
 * utilities.css — content simply shows in place.
 */
export default function RevealText({
  children,
  delay = 0,
  as: As = "span",
  block = false,
  style,
  className,
}: Props) {
  return (
    <span
      className="reveal-mask"
      style={{ display: block ? "block" : "inline-block", verticalAlign: "top" }}
    >
      <As
        className={`reveal-rise${className ? ` ${className}` : ""}`}
        style={{ "--delay": `${delay}ms`, ...style } as CSSProperties}
      >
        {children}
      </As>
    </span>
  );
}
