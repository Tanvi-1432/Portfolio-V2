"use client";

import { useLenisContext } from "@/components/motion/SmoothScrollProvider";
import type Lenis from "lenis";

export function useLenis(): Lenis | null {
  return useLenisContext();
}
