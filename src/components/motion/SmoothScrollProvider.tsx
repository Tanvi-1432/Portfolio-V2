"use client";

import { createContext, useContext, useEffect, useRef, ReactNode, MutableRefObject } from "react";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Expose the ref directly — consumers read .current outside render
const LenisContext = createContext<MutableRefObject<Lenis | null>>({ current: null });

export function useLenisContext(): Lenis | null {
  return useContext(LenisContext).current;
}

interface Props {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.072,
      wheelMultiplier: 0.95,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}
