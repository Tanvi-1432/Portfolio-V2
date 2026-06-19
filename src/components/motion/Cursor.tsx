"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<"default" | "hover" | "text">("default");
  const visibleRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    let raf: number;
    let mx = -100, my = -100;
    let cx = -100, cy = -100;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visibleRef.current) { visibleRef.current = true; setVisible(true); }

      const el = document.elementFromPoint(mx, my) as HTMLElement | null;
      const withLabel = el?.closest?.("[data-cursor-label]") as HTMLElement | null;

      if (withLabel) {
        const next = withLabel.getAttribute("data-cursor-label") ?? "";
        setLabel((prev) => (prev === next ? prev : next));
        setVariant("hover");
      } else {
        const isText = !!el?.closest?.("[data-cursor-variant='text']");
        setVariant(isText ? "text" : "default");
        setLabel("");
      }
    };

    const tick = () => {
      cx += (mx - cx) * 0.22;
      cy += (my - cy) * 0.22;
      if (dotRef.current) dotRef.current.style.transform = `translate(${cx}px, ${cy}px)`;
      if (labelRef.current) labelRef.current.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(tick);
    };

    const leave = () => { visibleRef.current = false; setVisible(false); };
    const enter = () => { visibleRef.current = true; setVisible(true); };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseenter", enter);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseenter", enter);
      cancelAnimationFrame(raf);
    };
  }, []);

  const isHover = variant === "hover";
  const isText = variant === "text";

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: isText ? 2 : isHover ? 56 : 8,
          height: isText ? 22 : isHover ? 56 : 8,
          marginLeft: isText ? -1 : isHover ? -28 : -4,
          marginTop: isText ? -11 : isHover ? -28 : -4,
          borderRadius: isText ? 0 : 999,
          background: isText
            ? "var(--accent)"
            : isHover
            ? "transparent"
            : "var(--cream)",
          border: isHover ? "1px solid var(--accent)" : "none",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: "var(--z-cursor)",
          opacity: visible ? 1 : 0,
          transition:
            "width var(--dur-hover) var(--ease-reveal), height var(--dur-hover) var(--ease-reveal), margin var(--dur-hover) var(--ease-reveal), background var(--dur-fast) ease, border var(--dur-fast) ease, opacity var(--dur-hover) ease",
        }}
      />
      <div
        ref={labelRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          marginLeft: 38,
          marginTop: -6,
          pointerEvents: "none",
          zIndex: "var(--z-cursor)",
          fontFamily: "var(--font-ui)",
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--cream)",
          mixBlendMode: "difference",
          opacity: visible && label ? 1 : 0,
          transition: "opacity var(--dur-fast) ease",
        }}
      >
        {label}
      </div>
    </>
  );
}
