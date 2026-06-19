"use client";

import { CSSProperties, Fragment, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import SmallCap from "@/components/ui/SmallCap";
import FadeIn from "@/components/ui/FadeIn";
import TechChips from "@/components/ui/TechChips";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { email, socials } from "@/data/site";
import { projects } from "@/data/projects";
import PocketPlanPhone from "@/components/mockups/PocketPlanPhone";
import ProjectHeroMock from "@/components/mockups/ProjectHeroMock";

// ── Shared scramble clock ─────────────────────────────────────────────────────
const SCR = { PER: 95, SCRAMBLE: 300, BASE: 180, CHURN: 45, GLYPHS: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz/\\<>{}[]#*+=01" };
let mScrStart: number | null = null;

function MScrambleWord({ text, italic, accentTail = false, startIndex = 0, totalLetters }: { text: string; italic?: boolean; accentTail?: boolean; startIndex?: number; totalLetters?: number }) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const prefersReduced = usePrefersReducedMotion();
  const chars = useMemo(
    () => (accentTail ? [...text.split(""), "."] : text.split("")),
    [accentTail, text]
  );
  const total = totalLetters ?? chars.length;

  useEffect(() => {
    const finalColor = (i: number) => accentTail && i === chars.length - 1 ? "var(--accent)" : "var(--cream)";
    const lockSpan = (i: number) => {
      const el = refs.current[i]; if (!el) return;
      el.textContent = chars[i]; el.style.minWidth = "0"; el.style.opacity = "1";
      el.style.color = finalColor(i); el.dataset.locked = "1";
      if (accentTail && i === chars.length - 1) el.style.animation = "folioBlink 1.1s steps(1, end) infinite";
    };
    if (prefersReduced) { chars.forEach((_, i) => lockSpan(i)); return; }
    if (mScrStart === null) mScrStart = performance.now();
    const lastLockAt = SCR.BASE + SCR.SCRAMBLE + (total - 1 + (accentTail ? 1 : 0)) * SCR.PER + 300;
    let raf: number, lastChurn = 0;
    const tick = (now: number) => {
      const elapsed = now - mScrStart!;
      const churn = now - lastChurn > SCR.CHURN; if (churn) lastChurn = now;
      for (let i = 0; i < chars.length; i++) {
        const el = refs.current[i]; if (!el || el.dataset.locked === "1") continue;
        const gi = startIndex + i;
        const lockAt = SCR.BASE + SCR.SCRAMBLE + gi * SCR.PER;
        const wakeAt = gi * SCR.PER * 0.3;
        if (elapsed >= lockAt) {
          el.textContent = chars[i]; el.style.minWidth = "0"; el.style.opacity = "1";
          el.style.transition = "none"; el.style.color = "var(--accent)"; el.dataset.locked = "1";
          const fin = finalColor(i);
          requestAnimationFrame(() => { el.style.transition = "color var(--dur-medium) ease"; el.style.color = fin; });
          if (accentTail && i === chars.length - 1) el.style.animation = "folioBlink 1.1s steps(1, end) infinite";
        } else if (elapsed >= wakeAt) {
          el.style.opacity = "1";
          if (churn) el.textContent = SCR.GLYPHS[(Math.random() * SCR.GLYPHS.length) | 0];
        }
      }
      if (elapsed < lastLockAt) raf = requestAnimationFrame(tick);
      else chars.forEach((_, i) => lockSpan(i));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [accentTail, chars, prefersReduced, startIndex, total]);

  return (
    <span aria-hidden="true" style={{ display: "inline-block", whiteSpace: "nowrap", fontStyle: italic ? "italic" : "normal" }}>
      {chars.map((_, i) => (
        <span key={i} ref={(el) => { refs.current[i] = el; }} style={{ display: "inline-block", minWidth: "0.52em", textAlign: "center", opacity: 0, color: accentTail && i === chars.length - 1 ? "var(--accent)" : "rgba(232,223,211,0.72)" }}>{" "}</span>
      ))}
    </span>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
export function MHero({ onJump }: { onJump: (id: string) => void }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setRevealed(true), 160); return () => clearTimeout(t); }, []);
  const line1 = "Creative", line2 = "Engineer", total = line1.length + line2.length;

  return (
    <section id="intro" data-scene="intro" data-reveal-state={revealed ? "in" : "out"} aria-label="Introduction"
      style={{ position: "relative", minHeight: "100svh", background: "var(--ink)", color: "var(--cream)", overflow: "hidden", padding: "92px 22px 30px", display: "flex", flexDirection: "column" }}>
      <div aria-hidden="true" className="grain" />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 560px 520px at 110% 8%, rgba(200,65,43,0.16), transparent 60%)" }} />

      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 14, borderBottom: "1px solid var(--rule)" }}>
        <FadeIn delay={700}><SmallCap color="var(--accent)">Frontend Engineer</SmallCap></FadeIn>
        <FadeIn delay={820}><SmallCap>MMXXVI</SmallCap></FadeIn>
      </div>

      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 18 }}>
        <FadeIn delay={120}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <span style={{ width: 30, height: 1, background: "var(--accent)" }} />
            <SmallCap size={11} style={{ color: "var(--text)" }}>Tanvi Chowdhury</SmallCap>
          </div>
        </FadeIn>

        <h1 aria-label="Creative Engineer" style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(54px, 16.5vw, 88px)", lineHeight: 0.86, letterSpacing: "-0.035em", color: "var(--cream)" }}>
          <span style={{ display: "block" }}><MScrambleWord text={line1} italic startIndex={0} totalLetters={total} /></span>
          <span style={{ display: "block", marginTop: 2 }}><MScrambleWord text={line2} startIndex={line1.length} totalLetters={total} accentTail /></span>
        </h1>

        <FadeIn delay={720} y={16}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.5, color: "var(--text)", margin: "26px 0 0" }}>
            I design and build interactive web products — motion, interaction, and the craft of software that feels <em>considered, responsive, and alive.</em>
          </p>
        </FadeIn>

        <FadeIn delay={820}>
          <div style={{ marginTop: 22 }}>
            <SmallCap style={{ display: "block", marginBottom: 12 }}>Working in</SmallCap>
            <TechChips items={["React", "TypeScript", "Next.js", "Motion"]} dim />
          </div>
        </FadeIn>
      </div>

      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 26, paddingTop: 16, borderTop: "1px solid var(--rule)" }}>
        <FadeIn delay={920}>
          <button type="button" onClick={() => onJump("works")} style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--cream)", display: "flex", alignItems: "center", gap: 10 }}>
            <span className="m-bounce" style={{ color: "var(--accent)" }}>↓</span> View work
          </button>
        </FadeIn>
        <FadeIn delay={920}>
          <SmallCap style={{ textAlign: "right" }}>Open to roles · 2026</SmallCap>
        </FadeIn>
      </div>
    </section>
  );
}

// ── APPROACH ─────────────────────────────────────────────────────────────────
const M_TOKENS: [string, number][] = [
  ["I", 1], ["work", 0], ["at", 0], ["the", 0], ["seam", 0], ["between", 0], ["design", 1], ["and", 0], ["engineering", 1],
  ["—", 0], ["where", 0], ["a", 0], ["product", 0], ["is", 0], ["decided", 0], ["by", 0], ["the", 0], ["details", 1],
  ["most", 0], ["people", 0], ["never", 0], ["see.", 0],
];

export function MApproach({ active }: { active: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const [fill, setFill] = useState(() => prefersReduced ? 1 : 0);

  useEffect(() => {
    if (prefersReduced) return;
    const el = ref.current; if (!el) return;
    let raf: number, lastF = -1;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect(), vh = window.innerHeight || 800;
        let f = (vh * 0.84 - r.top) / (vh * 0.55);
        f = Math.max(0, Math.min(1, f));
        if (Math.abs(f - lastF) > 0.004) { lastF = f; setFill(f); }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [prefersReduced]);

  const total = M_TOKENS.length;

  return (
    <section data-scene="manifesto" data-reveal-state={active ? "in" : "out"} aria-label="Approach"
      style={{ position: "relative", background: "var(--ink)", color: "var(--text)", padding: "110px 22px 96px", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 56 }}>
        <FadeIn><SmallCap color="var(--accent)">Approach · 01</SmallCap></FadeIn>
        <FadeIn delay={120}><SmallCap>How I work</SmallCap></FadeIn>
      </div>

      <h2 ref={ref} style={{ fontFamily: "var(--font-display)", fontWeight: 400, margin: 0, fontSize: "clamp(34px, 9vw, 50px)", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
        {M_TOKENS.map((tk, i) => {
          const [word, italic] = tk;
          const filled = fill >= (i + 0.6) / total;
          return (
            <span key={i}>
              {i > 0 ? " " : ""}
              <span style={{ fontStyle: italic ? "italic" : "normal", color: filled ? "var(--cream)" : "transparent", WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: filled ? "rgba(232,223,211,0)" : "rgba(232,223,211,0.32)", transition: "color var(--dur-fade) ease, -webkit-text-stroke-color var(--dur-fade) ease" }}>
                {word}
              </span>
            </span>
          );
        })}
      </h2>

      <FadeIn delay={200}><div style={{ width: 60, height: 1, background: "var(--accent)", margin: "48px 0 36px" }} /></FadeIn>
      <FadeIn delay={260} as="p" style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.62, color: "var(--text-soft)", margin: 0 }}>
        I write production React and TypeScript, but I care most about what doesn&apos;t show up in a diff. Product thinking first — who it&apos;s for, what to remove. Then I build it for real: typed, accessible, fast on a mid-range phone.
      </FadeIn>

      <div style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 0, borderTop: "1px solid var(--rule)" }}>
        {[["Product first", "Start from the decision the user is making, not the screen."], ["Built for real", "Typed, tested, accessible, performant — not a throwaway mock."], ["Felt, not just functional", "Motion and detail are part of the spec, not an afterthought."]].map(([t, d], i) => (
          <FadeIn key={t} delay={120 + i * 110}>
            <div style={{ padding: "24px 0", borderBottom: "1px solid var(--rule)", display: "grid", gridTemplateColumns: "28px 1fr", gap: 16, alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)" }}>0{i + 1}</span>
              <div>
                <h4 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: 25, color: "var(--cream)", margin: "0 0 7px" }}>{t}</h4>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.5, color: "var(--text-soft)", margin: 0 }}>{d}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── PROJECTS ─────────────────────────────────────────────────────────────────
const pocketPlanMobileScreens = [
  { screen: "balance", label: "Dashboard" },
  { screen: "budget", label: "Budgets" },
  { screen: "forecast", label: "Forecast" },
] as const;

function MPocketPlanFeature({ onOpen }: { onOpen: (id: string, ev?: React.MouseEvent) => void }) {
  const p = projects.pocketplan;
  const prefersReduced = usePrefersReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const activeScreenRef = useRef(0);
  const scrollRaf = useRef<number | null>(null);
  const [activeScreen, setActiveScreen] = useState(0);
  const [pressed, setPressed] = useState(false);

  const updateActiveScreen = () => {
    const el = scrollerRef.current;
    if (!el) return;
    if (scrollRaf.current !== null) cancelAnimationFrame(scrollRaf.current);
    scrollRaf.current = requestAnimationFrame(() => {
      const slide = el.querySelector<HTMLElement>("[data-pocket-slide]");
      if (!slide) return;
      const styles = window.getComputedStyle(el);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
      const step = slide.offsetWidth + gap;
      const next = Math.max(0, Math.min(pocketPlanMobileScreens.length - 1, Math.round(el.scrollLeft / Math.max(step, 1))));
      if (next !== activeScreenRef.current) {
        activeScreenRef.current = next;
        setActiveScreen(next);
      }
    });
  };

  useEffect(() => () => {
    if (scrollRaf.current !== null) cancelAnimationFrame(scrollRaf.current);
  }, []);

  return (
    <article
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{ borderBottom: "1px solid var(--rule)", padding: "32px 0" }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)" }}>{p.no}</span>
        <SmallCap>{p.role.split(" · ")[0]}</SmallCap>
      </div>

      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(54px, 17vw, 82px)", lineHeight: 0.9, letterSpacing: "-0.035em", color: "var(--cream)", margin: "0 0 8px" }}>
        {p.title}<span style={{ color: "var(--accent)", fontStyle: "italic" }}>,</span>
      </h3>
      <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 19, color: "var(--text-soft)", margin: "0 0 28px" }}>{p.tagline}</p>

      <div
        ref={scrollerRef}
        className="m-pocket-carousel"
        aria-label="PocketPlan screens"
        onScroll={updateActiveScreen}
        style={{
          display: "flex",
          gap: 18,
          width: "calc(100% + 44px)",
          marginLeft: -22,
          marginRight: -22,
          padding: "0 22px",
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          scrollPaddingInline: 22,
          WebkitOverflowScrolling: "touch",
        }}
      >
        {pocketPlanMobileScreens.map((item, idx) => {
          const active = idx === activeScreen;

          return (
            <div
              key={item.screen}
              data-pocket-slide
              style={{
                position: "relative",
                flex: "0 0 min(296px, calc(100vw - 44px))",
                height: 578,
                scrollSnapAlign: "center",
                scrollSnapStop: "always",
                opacity: prefersReduced || active ? 1 : 0.56,
                transform: prefersReduced || active ? "scale(1)" : "scale(0.94)",
                transition: prefersReduced
                  ? "none"
                  : "opacity var(--dur-medium) var(--ease-reveal), transform var(--dur-fade) var(--ease-inspect)",
                willChange: prefersReduced ? "auto" : "opacity, transform",
              }}
            >
              <PocketPlanPhone screen={item.screen} />
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "16px 0 28px" }}>
        <div aria-hidden="true" style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {pocketPlanMobileScreens.map((item, idx) => (
            <span
              key={item.screen}
              style={{
                width: idx === activeScreen ? 52 : 18,
                height: 5,
                borderRadius: 999,
                background: idx === activeScreen ? "var(--accent)" : "rgba(232,223,211,0.2)",
                transition: prefersReduced ? "none" : "width var(--dur-fast) ease, background var(--dur-fast) ease",
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--cream)", letterSpacing: "0.08em" }}>
            {String(activeScreen + 1).padStart(2, "0")} / 03
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <SmallCap>Swipe</SmallCap>
          <span className="m-swipe" aria-hidden="true" style={{ color: "var(--accent)", fontSize: 18 }}>→</span>
        </div>
      </div>

      <SmallCap color="var(--accent)" style={{ display: "block", marginBottom: 22 }}>
        {String(activeScreen + 1).padStart(2, "0")} — {pocketPlanMobileScreens[activeScreen].label}
      </SmallCap>

      <p style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.55, color: "var(--text-soft)", margin: "0 0 20px" }}>{p.summary}</p>

      <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
        {p.metrics.slice(0, 3).map((m) => (
          <div key={m.label}>
            <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 24, color: "var(--cream)", lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-soft)", marginTop: 4 }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TechChips items={p.stack.slice(0, 4)} dim />
        <Link
          href="/projects/pocketplan"
          onClick={(e) => {
            e.preventDefault();
            onOpen("pocketplan", e);
          }}
          data-cursor-label="open"
          aria-label="Open PocketPlan case study"
          style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", textDecoration: "none", transform: !prefersReduced && pressed ? "translateX(4px)" : "translateX(0)", transition: prefersReduced ? "none" : "transform var(--dur-micro) var(--ease-inspect)" }}
        >
          View →
        </Link>
      </div>
    </article>
  );
}

function MProjectPreviewCard({
  id,
  onOpen,
}: {
  id: "notes" | "little-lemon";
  onOpen: (id: string, ev?: React.MouseEvent) => void;
}) {
  const p = projects[id];
  const prefersReduced = usePrefersReducedMotion();
  const [pressed, setPressed] = useState(false);
  const inspection =
    id === "notes"
      ? {
          label: "Note model",
          items: ["Edit", "Persist", "Search"],
        }
      : {
          label: "Reservation states",
          items: ["Input", "Check", "Done"],
        };

  return (
    <article
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{ borderBottom: "1px solid var(--rule)", padding: "32px 0" }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)" }}>{p.no}</span>
        <SmallCap>{p.role.split(" · ")[0]}</SmallCap>
      </div>

      <div
        className="motion-press"
        style={{
          position: "relative",
          height: 236,
          marginBottom: 24,
          borderRadius: 8,
          overflow: "hidden",
          background: "linear-gradient(160deg, rgba(232,223,211,0.04), rgba(20,17,14,0.92))",
          border: "1px solid var(--rule)",
          boxShadow: "0 22px 60px rgba(0,0,0,0.28)",
          transform: !prefersReduced && pressed ? "scale(0.985)" : "scale(1)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: id === "notes" ? "-10px -130px -18px -18px" : "-6px -168px -24px -18px",
            transform: !prefersReduced && pressed ? "scale(1.025)" : "scale(1)",
            transition: prefersReduced ? "none" : "transform var(--dur-micro) var(--ease-inspect)",
          }}
        >
          <ProjectHeroMock id={id} />
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 54%, rgba(20,17,14,0.78)), radial-gradient(ellipse at 20% 20%, rgba(200,65,43,0.14), transparent 58%)",
            pointerEvents: "none",
          }}
        />
        <SmallCap
          color="var(--cream)"
          style={{
            position: "absolute",
            left: 16,
            bottom: 16,
          }}
        >
          {id === "notes" ? "Sticky notes" : "Reservation flow"}
        </SmallCap>
        <div
          aria-hidden="true"
          data-mobile-inspection={id}
          style={{
            position: "absolute",
            right: 14,
            top: 14,
            width: 152,
            border: "1px solid rgba(232,223,211,0.2)",
            background: "rgba(20,17,14,0.76)",
            backdropFilter: "blur(12px)",
            padding: "10px 11px",
            opacity: pressed ? 1 : 0.78,
            transform:
              !prefersReduced && pressed ? "translateY(-3px)" : "translateY(0)",
            transition: prefersReduced
              ? "none"
              : "opacity var(--dur-micro) ease, transform var(--dur-micro) var(--ease-inspect)",
          }}
        >
          <SmallCap color="var(--accent)" style={{ fontSize: 8.5 }}>
            {inspection.label}
          </SmallCap>
          <div style={{ display: "flex", gap: 7, marginTop: 8 }}>
            {inspection.items.map((item, i) => (
              <span
                key={item}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontFamily: "var(--font-ui)",
                  fontSize: 8.5,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: i === 0 || pressed ? "var(--cream)" : "var(--text-soft)",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background:
                      i === 0 || pressed
                        ? "var(--accent)"
                        : "rgba(232,223,211,0.34)",
                  }}
                />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(38px, 11vw, 52px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "var(--cream)", margin: "0 0 6px" }}>
        {p.title}<span style={{ color: "var(--accent)", fontStyle: "italic" }}>,</span>
      </h3>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.45, color: "var(--text-soft)", margin: "0 0 16px" }}>{p.tagline}</p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.55, color: "var(--text-soft)", margin: "0 0 20px" }}>{p.summary}</p>

      <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
        {p.metrics.slice(0, 3).map((m) => (
          <div key={m.label}>
            <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 24, color: "var(--cream)", lineHeight: 1 }}>{m.value}</div>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-soft)", marginTop: 4 }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TechChips items={p.stack.slice(0, 4)} dim />
        <Link
          href={`/projects/${id}`}
          onClick={(e) => {
            e.preventDefault();
            onOpen(id, e);
          }}
          data-cursor-label="open"
          aria-label={`Open ${p.title} case study`}
          style={{ fontFamily: "var(--font-ui)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", textDecoration: "none", transform: !prefersReduced && pressed ? "translateX(4px)" : "translateX(0)", transition: prefersReduced ? "none" : "transform var(--dur-micro) var(--ease-inspect)" }}
        >
          View →
        </Link>
      </div>
    </article>
  );
}

export function MProjects({ active, onOpen }: { active: boolean; onOpen: (id: string, ev?: React.MouseEvent) => void }) {
  return (
    <section data-scene="works" data-reveal-state={active ? "in" : "out"} aria-label="Projects"
      style={{ position: "relative", background: "var(--ink)", color: "var(--text)", padding: "110px 22px 96px", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 48, paddingBottom: 14, borderBottom: "1px solid var(--rule)" }}>
        <FadeIn><SmallCap color="var(--accent)">Projects · 02</SmallCap></FadeIn>
        <FadeIn delay={120}><SmallCap>2025–26</SmallCap></FadeIn>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {(["pocketplan", "notes", "little-lemon"] as const).map((id, i) => {
          if (id === "pocketplan") {
            return (
              <FadeIn key={id} delay={i * 100 + 80}>
                <MPocketPlanFeature onOpen={onOpen} />
              </FadeIn>
            );
          }

          return (
            <FadeIn key={id} delay={i * 100 + 80}>
              <MProjectPreviewCard id={id} onOpen={onOpen} />
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

// ── CAPABILITIES ─────────────────────────────────────────────────────────────
const M_CAP_ITEMS = [
  { verb: "design interfaces",  detail: "Interaction and UI design with a system behind every decision." },
  { verb: "engineer products",  detail: "Production React & TypeScript — typed, tested, accessible, fast." },
  { verb: "craft interactions", detail: "Motion systems that punctuate, never decorate." },
  { verb: "prototype fast",     detail: "High-fidelity, interactive prototypes in days — built to be felt." },
  { verb: "solve problems",     detail: "Product thinking first: who it's for, why, and what to remove." },
  { verb: "ship thoughtfully",  detail: "Real products, real users — polish to the last detail." },
];

export function MCapabilities({ active }: { active: boolean }) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section data-scene="capabilities" data-reveal-state={active ? "in" : "out"} aria-label="Capabilities"
      style={{ position: "relative", background: "var(--ink-2)", color: "var(--text)", padding: "110px 22px 100px", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <FadeIn><SmallCap color="var(--accent)">Capabilities · 03</SmallCap></FadeIn>
        <FadeIn delay={120}><SmallCap>Six verbs</SmallCap></FadeIn>
      </div>
      <FadeIn delay={80}>
        <h2 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(40px, 12vw, 60px)", lineHeight: 1, color: "var(--cream)", margin: "0 0 48px", letterSpacing: "-0.02em" }}>What I do, plainly.</h2>
      </FadeIn>

      <ol style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--rule)" }}>
        {M_CAP_ITEMS.map((it, i) => (
          <li key={it.verb} style={{ borderBottom: "1px solid var(--rule)", padding: "26px 0", display: "grid", gridTemplateColumns: "30px 1fr", gap: 14, alignItems: "baseline" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)", letterSpacing: "0.1em" }}>0{i + 1}</span>
            <div>
              <div style={{ overflow: "hidden" }}>
                <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(32px, 9vw, 46px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "var(--cream)", transform: prefersReduced || active ? "translateY(0)" : "translateY(110%)", transition: prefersReduced ? "none" : `transform var(--dur-page) var(--ease-inspect) ${i * 90 + 60}ms`, willChange: prefersReduced ? "auto" : "transform" } as CSSProperties}>
                  {it.verb}<span style={{ color: "var(--accent)", fontStyle: "normal" }}>.</span>
                </h3>
              </div>
              <FadeIn delay={i * 80 + 140}>
                <p style={{ margin: "10px 0 0", fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.5, color: "var(--text-soft)" }}>{it.detail}</p>
              </FadeIn>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ── ABOUT ────────────────────────────────────────────────────────────────────
const FOCUS_ITEMS = [
  ["Frontend engineering", "Production React & TypeScript — typed, accessible, fast."],
  ["Interaction & motion", "Motion systems and micro-interactions, choreographed not sprinkled."],
  ["Product thinking", "Start from the decision someone is making; remove the rest."],
  ["Design systems", "Tokens, components, and timing that keep a product coherent."],
];

export function MAbout({ active }: { active: boolean }) {
  return (
    <section data-scene="about" data-reveal-state={active ? "in" : "out"} aria-label="About"
      style={{ position: "relative", background: "var(--ink)", color: "var(--text)", padding: "104px 22px 96px", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 170, pointerEvents: "none", background: "linear-gradient(var(--ink-2), rgba(20,17,14,0))" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 560px 520px at 0% 32%, rgba(200,65,43,0.10), transparent 60%)" }} />

      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 36, paddingBottom: 14, borderBottom: "1px solid var(--rule)" }}>
          <FadeIn><SmallCap color="var(--accent)">About · 04</SmallCap></FadeIn>
          <FadeIn delay={120}><SmallCap>How I build</SmallCap></FadeIn>
        </div>

        <FadeIn delay={160}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(38px, 10.5vw, 56px)", lineHeight: 0.98, color: "var(--cream)", margin: 0, letterSpacing: "-0.025em" }}>
            I build the <span style={{ fontStyle: "italic", color: "var(--accent)" }}>front</span> of the product — <span style={{ color: "var(--cream)" }}>the part people actually touch.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={260} as="p" style={{ fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.62, color: "var(--text-soft)", margin: "28px 0 18px" }}>
          I&apos;m a frontend engineer focused on interaction. I care most about the layer most teams treat as the finish — the transitions, the latency, the empty states — because that&apos;s the layer a person actually <em>feels</em>.
        </FadeIn>
        <FadeIn delay={360} as="p" style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 19, lineHeight: 1.5, color: "var(--cream)", margin: 0 }}>
          What excites me is making software feel alive — interfaces that respond, anticipate, and reward attention.
        </FadeIn>

        <div style={{ margin: "48px 0 0", borderTop: "1px solid var(--rule)" }}>
          {FOCUS_ITEMS.map(([t, d], i) => (
            <FadeIn key={t} delay={120 + i * 90}>
              <div style={{ padding: "22px 0", borderBottom: "1px solid var(--rule)", display: "grid", gridTemplateColumns: "30px 1fr", gap: 14, alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)" }}>0{i + 1}</span>
                <div>
                  <h4 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400, fontSize: 23, color: "var(--cream)", margin: "0 0 6px" }}>{t}</h4>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.5, color: "var(--text-soft)", margin: 0 }}>{d}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={200}>
          <dl style={{ display: "grid", gridTemplateColumns: "96px 1fr", rowGap: 12, columnGap: 16, margin: "36px 0 0", paddingTop: 26, borderTop: "1px solid var(--rule)", fontFamily: "var(--font-ui)", fontSize: 13.5, color: "var(--text)" }}>
            {[["Focus", "Frontend & interaction engineering."], ["Stack", "React · TypeScript · Motion · WebGL · Node."], ["Open to", "Frontend & product engineering roles, 2026."]].map(([k, v]) => (
              <Fragment key={k}>
                <dt key={`dt-${k}`} style={{ letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-dim)", fontSize: 10 }}>{k}</dt>
                <dd key={`dd-${k}`} style={{ margin: 0 }}>{v}</dd>
              </Fragment>
            ))}
          </dl>
        </FadeIn>
      </div>
    </section>
  );
}

// ── CONTACT ──────────────────────────────────────────────────────────────────
export function MContact({ active, onJump }: { active: boolean; onJump: (id: string) => void }) {
  return (
    <section data-scene="contact" data-reveal-state={active ? "in" : "out"} aria-label="Contact"
      style={{ position: "relative", minHeight: "100svh", background: "var(--ink)", color: "var(--cream)", padding: "104px 22px 40px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 620px 560px at 120% 120%, rgba(200,65,43,0.2), transparent 60%)" }} />

      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 52 }}>
          <FadeIn><SmallCap color="var(--accent)">Contact · 05</SmallCap></FadeIn>
          <FadeIn delay={120}><SmallCap>Open to roles · 2026</SmallCap></FadeIn>
        </div>
        <FadeIn delay={200} as="p" style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 19, lineHeight: 1.45, color: "var(--text-soft)", maxWidth: 420, margin: "0 0 36px" }}>
          Looking for a frontend engineer who sweats interaction and product detail? Let&apos;s talk.
        </FadeIn>
      </div>

      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <FadeIn delay={300}>
          <a href={`mailto:${email}`} style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(24px, 7vw, 40px)", lineHeight: 1.0, letterSpacing: "-0.025em", color: "var(--cream)", textDecoration: "none", display: "inline-block" }}>
            <span style={{ position: "relative" }}>
              {email}
              <span style={{ position: "absolute", left: 0, right: 0, bottom: "0.06em", height: 2, background: "var(--accent)" }} />
            </span>
          </a>
        </FadeIn>
      </div>

      <FadeIn delay={420}>
        <ul style={{ position: "relative", listStyle: "none", padding: 0, margin: "40px 0 0", borderTop: "1px solid var(--rule)" }}>
          {socials.map((s) => (
            <li key={s.label} style={{ borderBottom: "1px solid var(--rule)" }}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "15px 0", textDecoration: "none", color: "var(--cream)" }}>
                <SmallCap>{s.label}</SmallCap>
                <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 22, color: "var(--cream)" }}>{s.handle}<span style={{ color: "var(--accent)", fontStyle: "normal" }}> ↗</span></span>
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 36, paddingTop: 16, borderTop: "1px solid var(--rule)" }}>
        <SmallCap style={{ maxWidth: 200, lineHeight: 1.6 }}>Built with Next.js · Vercel</SmallCap>
        <button type="button" onClick={() => onJump("intro")} style={{ fontFamily: "var(--font-ui)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cream)", display: "inline-flex", alignItems: "center", gap: 9 }}>
          <span style={{ color: "var(--accent)" }}>↑</span> Top
        </button>
      </div>
    </section>
  );
}
