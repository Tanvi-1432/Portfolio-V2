"use client";

import { CSSProperties, useEffect, useRef } from "react";
import SmallCap from "@/components/ui/SmallCap";
import FadeIn from "@/components/ui/FadeIn";
import RevealText from "@/components/ui/RevealText";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const ITEMS = [
  { verb: "design interfaces",  detail: "Interaction and UI design with a system behind every decision." },
  { verb: "engineer products",  detail: "Production React & TypeScript — typed, tested, accessible, fast." },
  { verb: "craft interactions", detail: "Motion and micro-interaction systems that punctuate, never decorate." },
  { verb: "prototype fast",     detail: "High-fidelity, interactive prototypes in days — built to be felt." },
  { verb: "solve problems",     detail: "Product thinking first: who it's for, why, and what to remove." },
  { verb: "ship thoughtfully",  detail: "Real products, real users — performance and polish to the last detail." },
] as const;

interface Props {
  active: boolean;
}

export default function Capabilities({ active }: Props) {
  const listRef = useRef<HTMLOListElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReduced) return;

    const verbs = list.querySelectorAll<HTMLElement>("[data-verb]");
    if (!verbs.length) return;

    // Set initial state — clipped below overflow:hidden parent
    gsap.set(verbs, { y: "110%", opacity: 0 });

    const ctx = gsap.context(() => {
      verbs.forEach((verb, i) => {
        ScrollTrigger.create({
          trigger: verb.parentElement!,
          start: "top 85%",
          onEnter: () => {
            gsap.to(verb, {
              y: 0,
              opacity: 1,
              duration: 1.1,
              delay: i * 0.06,
              ease: "power3.out",
            });
          },
          once: true,
        });
      });
    }, list);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="capabilities"
      data-scene="capabilities"
      data-reveal-state={active ? "in" : "out"}
      aria-label="Capabilities"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--ink-2)",
        color: "var(--text)",
        padding: "160px var(--gutter) 160px",
        overflow: "hidden",
      }}
    >
      {/* kicker */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 96,
          maxWidth: "var(--max-w)",
          margin: "0 auto 96px",
        }}
      >
        <FadeIn>
          <div>
            <SmallCap color="var(--accent)">Capabilities · 03</SmallCap>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(40px, 5vw, 72px)",
                lineHeight: 1,
                color: "var(--cream)",
                margin: "14px 0 0",
                letterSpacing: "-0.02em",
              }}
            >
              <RevealText block delay={80}>What I do, plainly.</RevealText>
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={160}>
          <SmallCap>Six verbs · one practice</SmallCap>
        </FadeIn>
      </div>

      {/* list */}
      <ol
        ref={listRef}
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 auto",
          maxWidth: "var(--max-w)",
          borderTop: "1px solid var(--rule)",
        }}
      >
        {ITEMS.map((it, i) => (
          <li
            key={it.verb}
            data-cursor-variant="text"
            style={{
              borderBottom: "1px solid var(--rule)",
              padding: "36px 0",
              display: "grid",
              gridTemplateColumns: "80px 1fr 420px",
              gap: 40,
              alignItems: "baseline",
            }}
          >
            <FadeIn delay={i * 60 + 40}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--text-dim)",
                  letterSpacing: "0.16em",
                }}
              >
                0{i + 1}
              </span>
            </FadeIn>

            {/* kinetic verb — GSAP ScrollTrigger reveal per item */}
            <div style={{ overflow: "hidden" }}>
              <h3
                data-verb
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(38px, 5.2vw, 84px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.025em",
                  color: "var(--cream)",
                  willChange: "transform",
                } as CSSProperties}
              >
                {it.verb}
                <span style={{ color: "var(--accent)", fontStyle: "normal" }}>.</span>
              </h3>
            </div>

            <FadeIn delay={i * 60 + 120}>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-body)",
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "var(--text-soft)",
                }}
              >
                {it.detail}
              </p>
            </FadeIn>
          </li>
        ))}
      </ol>

      {/* footer marginalia */}
      <div
        style={{
          maxWidth: "var(--max-w)",
          margin: "64px auto 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <FadeIn delay={300}>
          <SmallCap>
            Tools · React · TypeScript · Motion · WebGL · Figma · Rust (learning)
          </SmallCap>
        </FadeIn>
        <FadeIn delay={360}>
          <SmallCap>
            Currently · Building things slowly, on purpose.
          </SmallCap>
        </FadeIn>
      </div>
    </section>
  );
}
