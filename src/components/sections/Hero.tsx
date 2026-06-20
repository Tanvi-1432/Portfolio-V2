"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SmallCap from "@/components/ui/SmallCap";
import FadeIn from "@/components/ui/FadeIn";
import TechChips from "@/components/ui/TechChips";
import MagneticButton from "@/components/ui/MagneticButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gsap } from "@/lib/gsap";

// ── Scramble config (exact from prototype) ───────────────────────────────────
const SCR = {
  PER: 118,
  SCRAMBLE: 420,
  BASE: 180,
  CHURN: 55,
  GLYPHS: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz/\\<>{}[]#*+=01",
};

// Module-level shared clock — persists across remounts, resets on page reload
let scrStart: number | null = null;

interface ScrambleWordProps {
  text: string;
  italic?: boolean;
  color?: string;
  startIndex?: number;
  totalLetters?: number;
  accentTail?: boolean;
}

function ScrambleWord({
  text,
  italic,
  color,
  startIndex = 0,
  totalLetters,
  accentTail = false,
}: ScrambleWordProps) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const prefersReduced = usePrefersReducedMotion();
  const chars = useMemo(
    () => (accentTail ? [...text.split(""), "."] : text.split("")),
    [accentTail, text]
  );
  const total = totalLetters ?? chars.length;

  useEffect(() => {
    const finalColorFor = (i: number) =>
      accentTail && i === chars.length - 1
        ? "var(--accent)"
        : color ?? "var(--cream)";

    const lockSpan = (i: number) => {
      const el = refs.current[i];
      if (!el) return;
      el.textContent = chars[i];
      el.style.minWidth = "0";
      el.style.opacity = "1";
      el.style.color = finalColorFor(i);
      el.dataset.locked = "1";
      if (accentTail && i === chars.length - 1) {
        el.style.animation = "folioBlink 1.1s steps(1, end) infinite";
      }
    };

    if (prefersReduced) {
      chars.forEach((_, i) => lockSpan(i));
      return;
    }

    if (scrStart === null) scrStart = performance.now();

    const lastLockAt =
      SCR.BASE +
      SCR.SCRAMBLE +
      (total - 1 + (accentTail ? 1 : 0)) * SCR.PER +
      300;
    let raf: number;
    let lastChurn = 0;

    const tick = (now: number) => {
      const elapsed = now - scrStart!;
      const churn = now - lastChurn > SCR.CHURN;
      if (churn) lastChurn = now;

      for (let i = 0; i < chars.length; i++) {
        const el = refs.current[i];
        if (!el || el.dataset.locked === "1") continue;
        const gi = startIndex + i;
        const lockAt = SCR.BASE + SCR.SCRAMBLE + gi * SCR.PER;
        const wakeAt = gi * SCR.PER * 0.3;

        if (elapsed >= lockAt) {
          el.textContent = chars[i];
          el.style.minWidth = "0";
          el.style.opacity = "1";
          el.style.transition = "none";
          el.style.color = "var(--accent)";
          el.dataset.locked = "1";
          const fin = finalColorFor(i);
          requestAnimationFrame(() => {
            el.style.transition = "color var(--dur-medium) ease";
            el.style.color = fin;
          });
          if (accentTail && i === chars.length - 1) {
            el.style.animation = "folioBlink 1.1s steps(1, end) infinite";
          }
        } else if (elapsed >= wakeAt) {
          el.style.opacity = "1";
          if (churn) {
            el.textContent =
              SCR.GLYPHS[(Math.random() * SCR.GLYPHS.length) | 0];
          }
        }
      }

      if (elapsed < lastLockAt) {
        raf = requestAnimationFrame(tick);
      } else {
        chars.forEach((_, i) => lockSpan(i));
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [accentTail, chars, color, prefersReduced, startIndex, total]);

  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        whiteSpace: "nowrap",
        fontStyle: italic ? "italic" : "normal",
      }}
    >
      {chars.map((_, i) => (
        <span
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          style={{
            display: "inline-block",
            minWidth: "0.52em",
            textAlign: "center",
            opacity: 0.28,
            color:
              accentTail && i === chars.length - 1
                ? "var(--accent)"
                : "rgba(232,223,211,0.72)",
          }}
        >
          {chars[i]}
        </span>
      ))}
    </span>
  );
}

interface Props {
  onJump: (id: string) => void;
}

export default function Hero({ onJump }: Props) {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Parallax planes — background glow drifts fastest, headline slower, bottom barely moves
  useEffect(() => {
    if (prefersReduced) return;
    const section = sectionRef.current;
    const glow = glowRef.current;
    const headline = headlineRef.current;
    const bottom = bottomRef.current;
    if (!section || !glow || !headline || !bottom) return;

    const ctx = gsap.context(() => {
      const trigger = { trigger: section, start: "top top", end: "bottom top", scrub: true };
      gsap.to(glow,    { y: -80, ease: "none", scrollTrigger: trigger });
      gsap.to(headline, { y: -44, ease: "none", scrollTrigger: trigger });
      gsap.to(bottom,  { y: -18, ease: "none", scrollTrigger: trigger });
    }, section);

    return () => ctx.revert();
  }, [prefersReduced]);

  const line1 = "Creative";
  const line2 = "Engineer";
  const totalLetters = line1.length + line2.length;

  return (
    <section
      ref={sectionRef}
      id="intro"
      data-scene="intro"
      data-reveal-state={revealed ? "in" : "out"}
      aria-label="Introduction"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--ink)",
        color: "var(--cream)",
        overflow: "hidden",
        padding: "var(--chrome-safe-top) var(--gutter) var(--chrome-safe-bottom)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* grain */}
      <div aria-hidden="true" className="grain" />
      {/* parallax glow layer — drifts at its own rate */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 900px 700px at 85% 90%, rgba(200,65,43,0.14), transparent 55%)",
          willChange: "transform",
        }}
      />
      {/* secondary atmospheric glow — top-left, drifts slower */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 600px 500px at 10% 15%, rgba(200,65,43,0.06), transparent 60%)",
        }}
      />

      {/* TOP — masthead */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          paddingBottom: 16,
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <FadeIn delay={80}>
          <SmallCap>Frontend Engineer · Creative Technologist</SmallCap>
        </FadeIn>
        <FadeIn delay={160}>
          <SmallCap>tanvichowdhury.com</SmallCap>
        </FadeIn>
      </div>

      {/* CENTER — headline — parallax layer 2 */}
      <div
        ref={headlineRef}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          width: "100%",
          willChange: "transform",
        }}
      >
        {/* byline */}
        <FadeIn delay={60}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <span
              style={{ width: 40, height: 1, background: "var(--text-dim)" }}
            />
            <SmallCap size={13} style={{ color: "var(--text)" }}>
              Tanvi Chowdhury &nbsp;—&nbsp; Frontend Engineer
            </SmallCap>
          </div>
        </FadeIn>

        {/* kinetic headline — scramble entrance */}
        <h1
          aria-label="Creative Engineer"
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(88px, 15vw, 250px)",
            lineHeight: 0.84,
            letterSpacing: "-0.035em",
            color: "var(--cream)",
          }}
        >
          <span style={{ display: "block" }}>
            <ScrambleWord
              text={line1}
              italic
              color="var(--cream)"
              startIndex={0}
              totalLetters={totalLetters}
            />
          </span>
          <span style={{ display: "block", marginTop: 2 }}>
            <ScrambleWord
              text={line2}
              startIndex={line1.length}
              totalLetters={totalLetters}
              accentTail
            />
          </span>
        </h1>

        {/* standfirst */}
        <FadeIn delay={240} y={20}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: 64,
              marginTop: 48,
              alignItems: "end",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(19px, 1.5vw, 24px)",
                lineHeight: 1.5,
                color: "var(--text)",
                maxWidth: 680,
                margin: 0,
              }}
            >
              I design and build interactive web products — focused on motion,
              interaction design, and the craft of shipping software that feels{" "}
              <em>considered, responsive, and alive.</em>
            </p>
            <div>
              <SmallCap style={{ display: "block", marginBottom: 14 }}>
                Working in
              </SmallCap>
              <TechChips
                items={["React", "TypeScript", "Next.js", "WebGL", "Motion", "Node"]}
                dim
              />
            </div>
          </div>
        </FadeIn>
      </div>

      {/* BOTTOM — parallax layer 3 (subtlest movement) */}
      <div
        ref={bottomRef}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          willChange: "transform",
        }}
      >
        <FadeIn delay={320}>
          <MagneticButton
            type="button"
            onClick={() => onJump("works")}
            data-cursor-label="view work"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--cream)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ color: "var(--accent)" }}>↓</span> View selected work
          </MagneticButton>
        </FadeIn>
        <FadeIn delay={360}>
          <SmallCap>
            Currently building{" "}
            <span style={{ color: "var(--cream)" }}>PocketPlan</span>
          </SmallCap>
        </FadeIn>
      </div>
    </section>
  );
}
