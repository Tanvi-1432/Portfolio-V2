"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SmallCap from "@/components/ui/SmallCap";
import FadeIn from "@/components/ui/FadeIn";
import FolioNumber from "@/components/ui/FolioNumber";
import Hairline from "@/components/ui/Hairline";
import TechChips from "@/components/ui/TechChips";
import MagneticButton from "@/components/ui/MagneticButton";
import PocketPlanPhone from "@/components/mockups/PocketPlanPhone";
import ProjectHeroMock from "@/components/mockups/ProjectHeroMock";
import { projects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// ── PocketPlan pinned showcase ───────────────────────────────────────────────

const FRAMES = [
  {
    tag: "01 — Dashboard",
    screen: "balance" as const,
    title: "Your whole\npicture, scored.",
    body: "The dashboard opens on a five-factor financial health score, net worth across cash and debt, and the insights the engine surfaced from this month's spending. One read, not a wall of widgets.",
    features: ["5-factor health score", "Net worth", "Smart insights"],
  },
  {
    tag: "02 — Budgets",
    screen: "budget" as const,
    title: "Every category,\ntracked.",
    body: "Monthly budgets track progress per category and warn in amber before red, while savings goals pace contributions toward a deadline — the planning half of personal finance, made legible.",
    features: ["Category budgets", "Amber before red", "Savings goals"],
  },
  {
    tag: "03 — Forecast",
    screen: "forecast" as const,
    title: "Cash flow,\nprojected.",
    body: "A custom TypeScript engine projects upcoming cash flow and derives a safe-to-spend-per-day figure — computed client-side from real recurring patterns, not a static chart.",
    features: ["Cash-flow forecast", "Safe to spend / day", "Subscription detection"],
  },
] as const;

type PocketFrame = (typeof FRAMES)[number];

function PocketFrameText({ frame }: { frame: PocketFrame }) {
  return (
    <>
      <SmallCap style={{ color: "var(--text-dim)" }}>{frame.tag}</SmallCap>
      <h4
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 36,
          lineHeight: 1.02,
          color: "var(--cream)",
          margin: "16px 0 14px",
          whiteSpace: "pre-line",
          letterSpacing: "-0.01em",
        }}
      >
        {frame.title}
      </h4>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 17,
          lineHeight: 1.6,
          color: "var(--text-soft)",
          maxWidth: 460,
          margin: "0 0 20px",
        }}
      >
        {frame.body}
      </p>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 22px",
        }}
      >
        {frame.features.map((ft) => (
          <li
            key={ft}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-ui)",
              fontSize: 12,
              color: "var(--text)",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "var(--accent)",
              }}
            />
            {ft}
          </li>
        ))}
      </ul>
    </>
  );
}

interface ShowcaseProps {
  onOpen: (id: string) => void;
}

function PocketPlanShowcase({ onOpen }: ShowcaseProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const copyFrameRefs = useRef<Array<HTMLDivElement | null>>([]);
  const phoneFrameRefs = useRef<Array<HTMLDivElement | null>>([]);
  const railFillRef = useRef<HTMLSpanElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const proj = projects.pocketplan;

  const N = FRAMES.length;

  useEffect(() => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    const applyProgress = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const progress = total > 0 ? Math.max(0, Math.min(1, scrolled / total)) : 0;
      const raw = progress * (N - 1);
      const nextIndex = Math.min(N - 1, Math.max(0, Math.round(raw)));

      copyFrameRefs.current.forEach((node, i) => {
        if (!node) return;
        const distance = Math.abs(raw - i);
        const frameOpacity = Math.max(0, 1 - distance * 1.35);
        const frameY = (i - raw) * 28;
        node.style.opacity = String(frameOpacity);
        node.style.transform = `translateY(${frameY}px)`;
        node.style.pointerEvents = nextIndex === i ? "auto" : "none";
      });

      phoneFrameRefs.current.forEach((node, i) => {
        if (!node) return;
        const distance = i - raw;
        const opacity = Math.max(0, 1 - Math.abs(distance) * 0.9);
        const scale = 0.9 + 0.1 * opacity;
        const x = distance * 42;
        const y = Math.abs(distance) * 22;
        const rotate = distance * -2.4;
        node.style.opacity = String(opacity);
        node.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`;
        node.style.pointerEvents = nextIndex === i ? "auto" : "none";
      });

      if (railFillRef.current) {
        railFillRef.current.style.transform = `scaleX(${Math.max(0.04, progress)})`;
      }

      if (nextIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const queueProgress = () => {
      if (raf) return;
      raf = requestAnimationFrame(applyProgress);
    };

    queueProgress();
    window.addEventListener("scroll", queueProgress, { passive: true });
    window.addEventListener("resize", queueProgress);

    return () => {
      window.removeEventListener("scroll", queueProgress);
      window.removeEventListener("resize", queueProgress);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [N, prefersReduced]);

  if (prefersReduced) {
    return (
      <section
        ref={ref}
        aria-label="PocketPlan showcase"
        data-pocket-reduced="true"
        style={{
          position: "relative",
          padding: "120px var(--gutter)",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 900px 700px at 70% 24%, rgba(200,65,43,0.08), transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: "var(--max-w)",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
              gap: 32,
              paddingBottom: 44,
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <div>
              <SmallCap>Featured build</SmallCap>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "clamp(48px, 6vw, 96px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.03em",
                  color: "var(--cream)",
                  margin: "16px 0 10px",
                }}
              >
                PocketPlan
                <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
                  .
                </span>
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontStyle: "italic",
                  fontSize: 20,
                  color: "var(--text-soft)",
                  margin: 0,
                }}
              >
                {proj.tagline}
              </p>
            </div>
            <MagneticButton
              as={Link}
              href="/projects/pocketplan"
              onClick={(event) => {
                event.preventDefault();
                onOpen("pocketplan");
              }}
              data-cursor-label="open case"
              aria-label="Open PocketPlan case study"
              style={{
                border: "1px solid var(--rule)",
                borderRadius: 999,
                padding: "11px 20px",
                fontFamily: "var(--font-ui)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--cream)",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                flexShrink: 0,
              }}
            >
              Open full case <span style={{ color: "var(--accent)" }}>→</span>
            </MagneticButton>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 28,
              marginTop: 56,
            }}
          >
            {FRAMES.map((frame, i) => (
              <article
                key={frame.tag}
                data-pocket-copy-frame={i}
                style={{
                  border: "1px solid var(--rule)",
                  background: "rgba(232,223,211,0.025)",
                  padding: 28,
                  minHeight: 620,
                  display: "flex",
                  flexDirection: "column",
                  gap: 28,
                }}
              >
                <div>
                  <PocketFrameText frame={frame} />
                </div>
                <div
                  data-pocket-phone-frame={i}
                  style={{
                    position: "relative",
                    minHeight: 340,
                    overflow: "hidden",
                    marginTop: "auto",
                  }}
                >
                  <PocketPlanPhone screen={frame.screen} variant="thumbnail" />
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 34 }}>
            <TechChips items={proj.stack} dim />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      aria-label="PocketPlan showcase"
      style={{ position: "relative", height: "360vh" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 900px 700px at 70% 50%, rgba(200,65,43,0.10), transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "var(--max-w)",
            margin: "0 auto",
            padding: "0 var(--gutter)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* LEFT — copy */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 28,
              }}
            >
              <FolioNumber size={30}>01</FolioNumber>
              <SmallCap>Featured build</SmallCap>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(48px, 6vw, 96px)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                color: "var(--cream)",
                margin: "0 0 10px",
              }}
            >
              PocketPlan
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>.</span>
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: 20,
                color: "var(--text-soft)",
                margin: "0 0 36px",
              }}
            >
              {proj.tagline}
            </p>

            {/* swapping frame copy */}
            <div style={{ position: "relative", minHeight: 230 }}>
              {FRAMES.map((fr, i) => {
                const distance = Math.abs(i);
                const frameOpacity = Math.max(0, 1 - distance * 1.35);
                const frameY = i * 28;

                return (
                  <div
                    key={i}
                    data-pocket-copy-frame={i}
                    ref={(node) => {
                      copyFrameRefs.current[i] = node;
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: frameOpacity,
                      transform: `translateY(${frameY}px)`,
                      transition:
                        "opacity var(--dur-medium) var(--ease-reveal), transform var(--dur-fade) var(--ease-inspect)",
                      pointerEvents: i === 0 ? "auto" : "none",
                    }}
                  >
                    <PocketFrameText frame={fr} />
                  </div>
                );
              })}
            </div>

            {/* progress rail + CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                marginTop: 44,
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  gap: 8,
                  paddingBottom: 10,
                }}
              >
                {FRAMES.map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: activeIndex === i ? 28 : 10,
                      height: 3,
                      borderRadius: 3,
                      background:
                        activeIndex === i ? "var(--accent)" : "var(--rule)",
                      transition:
                        "width var(--dur-fade) var(--ease-reveal), background var(--dur-micro) ease",
                    }}
                  />
                ))}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 1,
                    background: "rgba(232,223,211,0.14)",
                  }}
                />
                <span
                  ref={railFillRef}
                  data-pocket-rail-fill
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    height: 1,
                    background: "var(--accent)",
                    transform: "scaleX(0.04)",
                    transformOrigin: "left center",
                    transition: "transform var(--dur-press) linear",
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                color: "var(--text-soft)",
                }}
              >
                {String(activeIndex + 1).padStart(2, "0")} / 0{N}
              </span>
              <span style={{ flex: 1 }} />
              <MagneticButton
                type="button"
                onClick={() => onOpen("pocketplan")}
                data-cursor-label="open case"
                style={{
                  border: "1px solid var(--rule)",
                  borderRadius: 999,
                  padding: "11px 20px",
                  fontFamily: "var(--font-ui)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--cream)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                Open full case{" "}
                <span style={{ color: "var(--accent)" }}>→</span>
              </MagneticButton>
            </div>

            <div style={{ marginTop: 28 }}>
              <TechChips items={proj.stack} dim />
            </div>
          </div>

          {/* RIGHT — phone frames */}
          <div style={{ position: "relative", height: "78vh", minHeight: 560 }}>
            {FRAMES.map((fr, i) => {
              const distance = i;
              const op = Math.max(0, 1 - Math.abs(distance) * 0.9);
              const scale = 0.9 + 0.1 * op;
              const x = distance * 42;
              const y = Math.abs(distance) * 22;
              const rotate = distance * -2.4;
              return (
                <div
                  key={i}
                  data-pocket-phone-frame={i}
                  ref={(node) => {
                    phoneFrameRefs.current[i] = node;
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: op,
                    transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`,
                    transition: "opacity var(--dur-fast) linear, transform var(--dur-medium) var(--ease-inspect)",
                    pointerEvents: i === 0 ? "auto" : "none",
                  }}
                >
                  <PocketPlanPhone screen={fr.screen} />
                </div>
              );
            })}
          </div>
        </div>

        {/* scroll hint */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <SmallCap>Scroll to explore PocketPlan</SmallCap>
        </div>
      </div>
    </section>
  );
}

// ── Generic project spread (Notes, Little Lemon) ─────────────────────────────

interface SpreadProps {
  id: string;
  align?: "left" | "right";
  mockH?: number;
  onOpen: (id: string) => void;
}

const INSPECTION_CUES: Record<string, { label: string; items: string[] }> = {
  notes: {
    label: "Note model",
    items: ["Rich text", "Smart folders", "Task extraction"],
  },
  "little-lemon": {
    label: "Reservation states",
    items: ["Input", "Validate", "Confirm"],
  },
};

function ProjectInspectionOverlay({
  id,
  active,
  reduced,
}: {
  id: string;
  active: boolean;
  reduced: boolean;
}) {
  const cue = INSPECTION_CUES[id] ?? {
    label: "Product system",
    items: ["State", "Motion", "Feedback"],
  };

  return (
    <div
      aria-hidden="true"
      data-project-inspection={id}
      style={{
        position: "absolute",
        top: 22,
        right: 22,
        width: 210,
        border: "1px solid rgba(232,223,211,0.2)",
        background: "rgba(20,17,14,0.72)",
        backdropFilter: "blur(16px)",
        padding: "16px 16px 14px",
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(12px)",
        transition: reduced
          ? "none"
          : "opacity var(--dur-micro) ease, transform var(--dur-micro) var(--ease-inspect)",
        pointerEvents: "none",
      }}
    >
      <SmallCap color="var(--accent)">{cue.label}</SmallCap>
      <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
        {cue.items.map((item, i) => (
          <div
            key={item}
            style={{
              display: "grid",
              gridTemplateColumns: "12px 1fr",
              gap: 10,
              alignItems: "center",
              opacity: active ? 1 : 0.35,
              transform: active ? "translateX(0)" : "translateX(8px)",
              transition: reduced
                ? "none"
                : `opacity var(--dur-medium) ease ${80 + i * 55}ms, transform var(--dur-medium) var(--ease-inspect) ${80 + i * 55}ms`,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: i === 0 ? "var(--accent)" : "rgba(232,223,211,0.46)",
                boxShadow:
                  active && i === 0
                    ? "0 0 18px rgba(200,65,43,0.42)"
                    : "none",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--cream)",
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectSpread({ id, align = "left", mockH = 460, onOpen }: SpreadProps) {
  const p = projects[id];
  const mockOnLeft = align === "left";
  const prefersReduced = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);
  const previewLabel = id === "notes" ? "Inspect note model" : "Inspect reservation flow";

  const Mock = (
    <div
      className="motion-inspect"
      style={{
        position: "relative",
        width: "100%",
        height: mockH,
        order: mockOnLeft ? 0 : 1,
        transform:
          !prefersReduced && hovered
            ? "translateY(-10px) scale(1.015)"
            : "translateY(0) scale(1)",
        willChange: prefersReduced ? "auto" : "transform",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform:
            !prefersReduced && hovered ? "scale(1.025)" : "scale(1)",
          transition: prefersReduced
            ? "none"
            : "transform var(--dur-inspect) var(--ease-inspect)",
          willChange: prefersReduced ? "auto" : "transform",
        }}
      >
        <ProjectHeroMock id={id} />
      </div>
      <ProjectInspectionOverlay
        id={id}
        active={hovered}
        reduced={prefersReduced}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 24,
          right: 24,
          bottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 18,
          opacity: hovered ? 1 : 0,
          transform:
            !prefersReduced && hovered ? "translateY(0)" : "translateY(10px)",
          transition: prefersReduced
            ? "none"
            : "opacity var(--dur-micro) ease, transform var(--dur-micro) var(--ease-inspect)",
          pointerEvents: "none",
        }}
      >
        <SmallCap color="var(--cream)">{previewLabel}</SmallCap>
        <span
          style={{
            height: 1,
            flex: 1,
            background: "rgba(232,223,211,0.28)",
            transform: hovered ? "scaleX(1)" : "scaleX(0.25)",
            transformOrigin: "right center",
            transition: prefersReduced
              ? "none"
              : "transform var(--dur-inspect) var(--ease-inspect)",
          }}
        />
        <SmallCap color="var(--accent)">Open</SmallCap>
      </div>
    </div>
  );

  const categoryLabel = id === "notes" ? "Local-first product" : "Frontend craft";

  const Text = (
    <div
      style={{
        order: mockOnLeft ? 1 : 0,
        paddingLeft: mockOnLeft ? 16 : 0,
        paddingRight: mockOnLeft ? 0 : 16,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <FolioNumber size={24}>{p.no}</FolioNumber>
        <SmallCap style={{ color: "var(--text-dim)" }}>{categoryLabel}</SmallCap>
        <Hairline width={48} />
        <SmallCap>{p.year}</SmallCap>
      </div>

      <h4
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "clamp(48px, 6vw, 88px)",
          lineHeight: 1.0,
          letterSpacing: "-0.025em",
          color: "var(--cream)",
        }}
      >
        {p.title}
        <span style={{ color: "var(--accent)", fontStyle: "italic" }}>,</span>
        <span
          style={{
            display: "block",
            fontStyle: "italic",
            fontSize: "0.6em",
            lineHeight: 1.08,
            color: "var(--text-soft)",
            marginTop: 8,
          }}
        >
          {p.tagline}
        </span>
      </h4>

      <p
        style={{
          margin: "36px 0 0",
          maxWidth: 460,
          fontFamily: "var(--font-body)",
          fontSize: 18,
          lineHeight: 1.6,
          color: "var(--text-soft)",
        }}
      >
        {p.summary}
      </p>

      {/* metrics */}
      <div style={{ display: "flex", gap: 40, margin: "32px 0 0" }}>
        {p.metrics.slice(0, 3).map((m) => (
          <div key={m.label}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 30,
                color: "var(--cream)",
                lineHeight: 1,
              }}
            >
              {m.value}
            </div>
            <div
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 9.5,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--text-soft)",
                marginTop: 6,
              }}
            >
              {m.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ margin: "32px 0 0" }}>
        <TechChips items={p.stack.slice(0, 5)} dim />
      </div>

      <MagneticButton
        as={Link}
        href={`/projects/${id}`}
        onClick={(event) => {
          event.preventDefault();
          onOpen(id);
        }}
        data-cursor-label="open case"
        aria-label={`Open ${p.title} case study`}
        style={{
          marginTop: 36,
          border: "1px solid var(--rule)",
          borderRadius: 999,
          padding: "11px 20px",
          fontFamily: "var(--font-ui)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--cream)",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          transform:
            !prefersReduced && hovered ? "translateX(4px)" : "translateX(0)",
          transition: prefersReduced
            ? "none"
            : "transform var(--dur-micro) var(--ease-inspect), border-color var(--dur-micro) ease",
          borderColor: hovered ? "rgba(200,65,43,0.55)" : "var(--rule)",
        }}
      >
        Read the case <span style={{ color: "var(--accent)" }}>→</span>
      </MagneticButton>
    </div>
  );

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      data-cursor-variant="text"
      style={{
        display: "grid",
        gridTemplateColumns: mockOnLeft ? "1.1fr 0.9fr" : "0.9fr 1.1fr",
        gap: 72,
        alignItems: "center",
      }}
    >
      {mockOnLeft ? (
        <>
          {Mock}
          {Text}
        </>
      ) : (
        <>
          {Text}
          {Mock}
        </>
      )}
    </article>
  );
}

// ── Works scene ───────────────────────────────────────────────────────────────

interface Props {
  active: boolean;
  onOpen: (id: string) => void;
}

export default function Works({ active, onOpen }: Props) {
  return (
    <section
      id="works"
      data-scene="works"
      data-reveal-state={active ? "in" : "out"}
      aria-label="Selected work"
      style={{
        position: "relative",
        background: "var(--ink)",
        color: "var(--text)",
      }}
    >
      {/* kicker */}
      <div style={{ padding: "160px var(--gutter) 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            maxWidth: "var(--max-w)",
            margin: "0 auto",
            paddingBottom: 40,
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <FadeIn>
            <div>
              <SmallCap color="var(--accent)">Projects · 02</SmallCap>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(40px, 5vw, 76px)",
                  lineHeight: 1,
                  color: "var(--cream)",
                  margin: "14px 0 0",
                  letterSpacing: "-0.02em",
                }}
              >
                Three products, built end&nbsp;to&nbsp;end.
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={140}>
            <SmallCap>Designed &amp; engineered · 2025–26</SmallCap>
          </FadeIn>
        </div>
      </div>

      {/* PocketPlan pinned showcase */}
      <PocketPlanShowcase onOpen={onOpen} />

      {/* Notes + Little Lemon spreads */}
      <div
        style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          padding: "40px var(--gutter) 0",
          display: "flex",
          flexDirection: "column",
          gap: 180,
        }}
      >
        <ProjectSpread id="notes" align="left" mockH={460} onOpen={onOpen} />
        <ProjectSpread id="little-lemon" align="right" mockH={420} onOpen={onOpen} />
      </div>

      <div
        style={{
          maxWidth: "var(--max-w)",
          margin: "160px auto 0",
          padding: "0 var(--gutter)",
          textAlign: "center",
        }}
      >
        <div style={{ paddingTop: 28, borderTop: "1px solid var(--rule)" }}>
          <SmallCap>End of Projects · Capabilities follow</SmallCap>
        </div>
      </div>
      <div style={{ height: 160 }} />
    </section>
  );
}
