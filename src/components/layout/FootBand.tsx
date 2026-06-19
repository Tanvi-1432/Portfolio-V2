"use client";

import { navSections } from "@/data/site";
import SmallCap from "@/components/ui/SmallCap";

interface Props {
  currentScene: string;
}

export default function FootBand({ currentScene }: Props) {
  const section = navSections.find((s) => s.id === currentScene);
  const idx = section?.idx ?? "—";
  const label = section?.label ?? "";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        zIndex: "var(--z-nav)",
        pointerEvents: "none",
        mixBlendMode: "difference",
      }}
    >
      <SmallCap style={{ color: "var(--text-soft)" }}>
        Section · <span style={{ color: "var(--cream)" }}>{label}</span>
      </SmallCap>

      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          textAlign: "center",
          bottom: 22,
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 14,
          color: "var(--text-soft)",
        }}
      >
        — {idx} —
      </span>

      <SmallCap style={{ color: "var(--text-soft)" }}>
        Scroll <span style={{ color: "var(--accent)" }}>↓</span>
      </SmallCap>
    </div>
  );
}
