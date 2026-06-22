"use client";

import { RefObject, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function useMagnetic(
  strength = 0.28,
  max = 36
): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    el.style.willChange = "translate";

    let raf: number;

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      let x = (e.clientX - (r.left + r.width / 2)) * strength;
      let y = (e.clientY - (r.top + r.height / 2)) * strength;
      x = Math.max(-max, Math.min(max, x));
      y = Math.max(-max, Math.min(max, y));
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("translate", `${x}px ${y}px`);
      });
    };

    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("translate", "0px 0px");
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);

    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
      el.style.removeProperty("translate");
      el.style.willChange = "";
    };
  }, [prefersReduced, strength, max]);

  return ref;
}
