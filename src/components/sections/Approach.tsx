"use client";

import { useEffect, useRef, useState } from "react";
import SmallCap from "@/components/ui/SmallCap";
import FadeIn from "@/components/ui/FadeIn";
import RevealText from "@/components/ui/RevealText";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ScrollTrigger } from "@/lib/gsap";

// [word, italic, glue(no-space before)]
const TOKENS: [string, number, number?][] = [
  ["work", 0], ["at", 0], ["the", 0], ["seam", 0], ["between", 0], ["design", 0], ["and", 0], ["engineering", 0],
  ["—", 0], ["where", 0], ["a", 0], ["product", 0], ["is", 0], ["decided", 0], ["by", 0], ["the", 0],
  ["details", 1],
  ["most", 0], ["people", 0], ["never", 0], ["see:", 0], ["the", 0], ["easing", 0], ["on", 0], ["a", 0],
  ["transition,", 0], ["the", 0], ["80ms", 0], ["of", 0], ["latency", 0], ["that", 0], ["makes", 0], ["an", 0],
  ["interface", 0], ["feel", 0],
  ["cheap", 1],
  [",", 0, 1],
  ["the", 0], ["state", 0], ["you", 0], ["forgot", 0], ["to", 0], ["handle.", 0],
];

function ManifestoStatement() {
  const ref = useRef<HTMLHeadingElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const [fill, setFill] = useState(() => prefersReduced ? 1 : 0);

  useEffect(() => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      end: "bottom 30%",
      scrub: 0.6,
      onUpdate: (self) => {
        const f = self.progress;
        setFill((prev) => Math.abs(f - prev) > 0.004 ? f : prev);
      },
    });

    return () => st.kill();
  }, [prefersReduced]);

  const total = TOKENS.length;

  return (
    <h2
      ref={ref}
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 400,
        margin: 0,
        fontSize: "clamp(44px, 6vw, 88px)",
        lineHeight: 1.06,
        letterSpacing: "-0.022em",
        color: "var(--cream)",
      }}
    >
      {/* drop cap "I" */}
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(110px, 14vw, 200px)",
          float: "left",
          lineHeight: 0.78,
          marginRight: 22,
          marginTop: 8,
          color: "var(--accent)",
          fontStyle: "italic",
        }}
      >
        I
      </span>
      {TOKENS.map((tk, i) => {
        const [word, italic, glue] = tk;
        const filled = fill >= (i + 0.6) / total;
        return (
          <span key={i}>
            {i > 0 && !glue ? " " : ""}
            <span
              style={{
                fontStyle: italic ? "italic" : "normal",
                color: filled ? "var(--cream)" : "transparent",
                WebkitTextStrokeWidth: "1.1px",
                WebkitTextStrokeColor: filled
                  ? "rgba(232,223,211,0)"
                  : "rgba(232,223,211,0.34)",
                transition:
                  "color var(--dur-fade) ease, -webkit-text-stroke-color var(--dur-fade) ease",
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </h2>
  );
}

interface Props {
  active: boolean;
}

const PRINCIPLES = [
  ["Product first", "Start from the decision the user is making, not the screen."],
  ["Built for real", "Typed, tested, accessible, performant — not a throwaway mock."],
  ["Felt, not just functional", "Motion and detail are part of the spec, not an afterthought."],
] as const;

export default function Approach({ active }: Props) {
  return (
    <section
      id="manifesto"
      data-scene="manifesto"
      data-reveal-state={active ? "in" : "out"}
      aria-label="Approach"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--ink)",
        color: "var(--text)",
        padding: "160px var(--gutter) 140px",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "var(--read-w)", margin: "0 auto" }}>
        {/* kicker */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 96,
          }}
        >
          <FadeIn>
            <SmallCap color="var(--accent)">Approach · 01</SmallCap>
          </FadeIn>
          <FadeIn delay={80}>
            <SmallCap>How I work</SmallCap>
          </FadeIn>
        </div>

        <FadeIn delay={40}>
          <ManifestoStatement />
        </FadeIn>

        <FadeIn delay={200}>
          <div
            style={{
              width: 80,
              height: 1,
              background: "var(--text-dim)",
              margin: "72px 0 56px",
            }}
          />
        </FadeIn>

        <div
          style={{
            columnCount: 2,
            columnGap: 56,
            fontFamily: "var(--font-body)",
            fontSize: 18,
            lineHeight: 1.65,
            color: "var(--text-soft)",
            maxWidth: 980,
          }}
        >
          <FadeIn delay={240} as="p" style={{ margin: "0 0 1em" }}>
            I write production React and TypeScript, but I care most about the things that don&apos;t show up in a diff. Product thinking comes first — who is this for, what decision are they making, what can I remove. Then I build it for real: typed end to end, accessible, and fast on a mid-range phone.
          </FadeIn>
          <FadeIn delay={320} as="p" style={{ margin: 0 }}>
            Motion is not decoration; it is the punctuation that tells the eye when to pause. Performance is not a checkbox; it is the difference between a demo and a product. I treat polish as evidence — proof that someone cared enough to sweat the last ten percent. That someone is usually me, late, happy.
          </FadeIn>
        </div>

        {/* principles grid */}
        <FadeIn delay={200} y={0}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 40,
              marginTop: 88,
              paddingTop: 40,
              borderTop: "1px solid var(--rule)",
            }}
          >
            {PRINCIPLES.map(([title, desc], i) => (
              <div key={title}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--text-dim)",
                    marginBottom: 14,
                  }}
                >
                  0{i + 1}
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: 26,
                    color: "var(--cream)",
                    margin: "0 0 10px",
                  }}
                >
                  <RevealText block delay={240 + i * 90}>{title}</RevealText>
                </h4>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "var(--text-soft)",
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={420}>
          <div
            style={{
              marginTop: 72,
              display: "flex",
              alignItems: "baseline",
              gap: 18,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 32,
                color: "var(--cream)",
              }}
            >
              — Tanvi
            </span>
            <SmallCap>Engineer who designs</SmallCap>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
