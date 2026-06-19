"use client";

import { useEffect, useRef, useState } from "react";
import { usePageTransition } from "@/components/motion/PageTransition";
import { projects, projectNext, CaseStudyCard } from "@/data/projects";
import SmallCap from "@/components/ui/SmallCap";
import RevealText from "@/components/ui/RevealText";
import FadeIn from "@/components/ui/FadeIn";
import FolioNumber from "@/components/ui/FolioNumber";
import TechChips from "@/components/ui/TechChips";
import Metric from "@/components/ui/Metric";
import MagneticButton from "@/components/ui/MagneticButton";
import ProjectHeroMock from "@/components/mockups/ProjectHeroMock";

interface Props {
  projectId: string;
}

function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;

    let interval = 0;
    let timeout = 0;
    let done = false;
    let observer: IntersectionObserver | null = null;

    const reveal = () => {
      if (done) return;
      done = true;
      setRevealed(true);
      observer?.disconnect();
      if (interval) window.clearInterval(interval);
      if (timeout) window.clearTimeout(timeout);
    };

    const checkVisibility = () => {
      if (done) return;
      const rect = el.getBoundingClientRect();
      const enterLine = window.innerHeight * 0.82;
      const exitLine = window.innerHeight * 0.12;

      if (rect.top <= enterLine && rect.bottom >= exitLine) {
        reveal();
      }
    };

    timeout = window.setTimeout(checkVisibility, 0);
    interval = window.setInterval(checkVisibility, 180);

    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) reveal();
        },
        { rootMargin: "0px 0px -18% 0px", threshold: 0.12 }
      );
      observer.observe(el);
    }

    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);

    return () => {
      done = true;
      observer?.disconnect();
      if (interval) window.clearInterval(interval);
      if (timeout) window.clearTimeout(timeout);
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [revealed]);

  return [ref, revealed] as const;
}

function ProseSection({
  kicker,
  n,
  heading,
  body,
}: {
  kicker: string;
  n: string;
  heading: string;
  body: string;
}) {
  const [ref, revealed] = useRevealOnce<HTMLElement>();

  return (
    <section
      ref={ref}
      className="case-section case-chapter"
      data-reveal-state={revealed ? "in" : "out"}
      style={{
        position: "relative",
        padding: "var(--case-section-pad, 110px var(--gutter))",
        borderTop: "1px solid var(--rule)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "var(--case-prose-columns, 200px 1fr)",
          gap: "var(--case-prose-gap, 80px)",
        }}
      >
        <div>
          <FadeIn y={10}>
            <SmallCap style={{ color: "var(--text-dim)" }}>{kicker}</SmallCap>
            <div style={{ marginTop: 20 }}>
              <FolioNumber size={44}>{n}</FolioNumber>
            </div>
          </FadeIn>
        </div>
        <div>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(34px, 4vw, 60px)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: "var(--cream)",
            }}
          >
            <RevealText block delay={80}>
              {heading}
            </RevealText>
          </h2>
          <FadeIn
            as="p"
            delay={180}
            y={22}
            style={{
              margin: "32px 0 0",
              fontFamily: "var(--font-body)",
              fontSize: 19,
              lineHeight: 1.65,
              color: "var(--text-soft)",
              maxWidth: 660,
            }}
          >
            {body}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function CardGrid({
  kicker,
  n,
  heading,
  items,
}: {
  kicker: string;
  n: string;
  heading: string;
  items: CaseStudyCard[];
}) {
  const [ref, revealed] = useRevealOnce<HTMLElement>();

  return (
    <section
      ref={ref}
      className="case-section case-chapter"
      data-reveal-state={revealed ? "in" : "out"}
      style={{
        position: "relative",
        padding: "var(--case-section-pad, 110px var(--gutter))",
        borderTop: "1px solid var(--rule)",
      }}
    >
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 64,
          }}
        >
          <FadeIn y={12}>
            <SmallCap style={{ color: "var(--text-dim)" }}>{kicker}</SmallCap>
            <h2
              style={{
                margin: "16px 0 0",
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(34px, 4vw, 60px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "var(--cream)",
              }}
            >
              <RevealText block delay={80}>
                {heading}
              </RevealText>
            </h2>
          </FadeIn>
          <FadeIn delay={120} y={10}>
            <FolioNumber size={40}>{n}</FolioNumber>
          </FadeIn>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "var(--case-card-columns, repeat(3, 1fr))",
            gap: 1,
            background: "var(--rule)",
            border: "1px solid var(--rule)",
          }}
        >
          {items.map((it, i) => (
            <FadeIn
              key={i}
              delay={140 + i * 70}
              y={26}
              style={{
                background: "var(--ink)",
                padding: "40px 36px",
                minHeight: 240,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--text-dim)",
                  marginBottom: 28,
                }}
              >
                0{i + 1}
              </span>
              <h4
                style={{
                  margin: "0 0 14px",
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 28,
                  lineHeight: 1.05,
                  color: "var(--cream)",
                }}
              >
                {it.title}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "var(--text-soft)",
                }}
              >
                {it.body}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function InteractionBand({
  items,
  projectId,
}: {
  items: CaseStudyCard[];
  projectId: string;
}) {
  const labels =
    projectId === "pocketplan"
      ? ["Input", "Motion", "State"]
      : projectId === "notes"
      ? ["Edit", "Persist", "Search"]
      : ["Form", "Validate", "Confirm"];
  const [ref, revealed] = useRevealOnce<HTMLElement>();

  return (
    <section
      ref={ref}
      className="case-section case-chapter"
      data-reveal-state={revealed ? "in" : "out"}
      style={{
        position: "relative",
        zIndex: 2,
        padding: "var(--case-section-pad, 120px var(--gutter))",
        borderTop: "1px solid var(--rule)",
        background:
          "linear-gradient(180deg, rgba(27,23,20,0.5), var(--ink))",
      }}
    >
      <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 52,
          }}
        >
          <div>
            <SmallCap style={{ color: "var(--text-dim)" }}>
              iv. Interaction model
            </SmallCap>
            <h2
              style={{
                margin: "16px 0 0",
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(36px, 5vw, 78px)",
                lineHeight: 0.98,
                color: "var(--cream)",
              }}
            >
              Product logic, made visible.
            </h2>
          </div>
          <SmallCap>Engineered feel</SmallCap>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "var(--case-interaction-columns, 0.8fr 1.2fr)",
            gap: "var(--case-prose-gap, 80px)",
            alignItems: "stretch",
          }}
        >
          <FadeIn
            y={24}
            style={{
              border: "1px solid var(--rule)",
              background: "rgba(232,223,211,0.025)",
              padding: "34px",
              minHeight: 360,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <SmallCap color="var(--accent)">Sequence</SmallCap>
              <div style={{ marginTop: 34, display: "grid", gap: 16 }}>
                {labels.map((label, i) => (
                  <FadeIn
                    key={label}
                    delay={120 + i * 80}
                    y={14}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "42px 1fr",
                      gap: 16,
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        border: "1px solid var(--accent)",
                        display: "grid",
                        placeItems: "center",
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        color: "var(--accent)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: 11,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--cream)",
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          height: 1,
                          marginTop: 10,
                          background:
                            i === labels.length - 1
                              ? "var(--accent)"
                              : "var(--rule)",
                        }}
                      />
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
            <p
              style={{
                margin: "44px 0 0",
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: 18,
                lineHeight: 1.5,
                color: "var(--text-soft)",
              }}
            >
              The case should not just describe polish; it should let the reader
              see how the interface reacts under pressure.
            </p>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "var(--case-card-columns, repeat(3, 1fr))",
              gap: 1,
              background: "var(--rule)",
              border: "1px solid var(--rule)",
            }}
          >
            {items.map((it, i) => (
              <FadeIn
                key={it.title}
                delay={180 + i * 90}
                y={30}
                style={{
                  background: "var(--ink)",
                  padding: "38px 34px",
                  minHeight: 360,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--accent)",
                  }}
                >
                  0{i + 1}
                </span>
                <div>
                  <h3
                    style={{
                      margin: "0 0 16px",
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: 34,
                      lineHeight: 1.02,
                      color: "var(--cream)",
                    }}
                  >
                    {it.title}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-body)",
                      fontSize: 17,
                      lineHeight: 1.6,
                      color: "var(--text-soft)",
                    }}
                  >
                    {it.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CaseStudy({ projectId }: Props) {
  const { triggerTransition, triggerRouteTransition } = usePageTransition();
  const p = projects[projectId];
  const next = projectNext[projectId];
  const [revealed, setRevealed] = useState(false);
  const [outcomeRef, outcomeRevealed] = useRevealOnce<HTMLElement>();
  const [lessonsRef, lessonsRevealed] = useRevealOnce<HTMLElement>();
  const [closeRef, closeRevealed] = useRevealOnce<HTMLElement>();

  // Reveal the opening heading once mounted (this route has no scroll-state)
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Escape key to go back
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") triggerRouteTransition("/", "00", "Home", "home");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [triggerRouteTransition]);

  if (!p) return null;
  const S = p.sections;

  return (
    <div
      className="case-study"
      data-project={projectId}
      data-reveal-state={revealed ? "in" : "out"}
      style={{
        background: "var(--ink)",
        color: "var(--text)",
        minHeight: "100vh",
      }}
    >
      {/* Grain */}
      <div
        aria-hidden="true"
        className="grain"
        style={{ position: "fixed", zIndex: 1, pointerEvents: "none" }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            projectId === "little-lemon"
                ? "radial-gradient(ellipse 760px 580px at 88% 18%, rgba(217,164,82,0.08), transparent 58%)"
                : "radial-gradient(ellipse 760px 580px at 88% 18%, rgba(200,65,43,0.10), transparent 58%)",
        }}
      />

      {/* Placeholder banner for incomplete case studies */}
      {S.placeholder && (
        <div
          style={{
            position: "relative",
            zIndex: 2,
            background: "rgba(200,65,43,0.1)",
            borderBottom: "1px solid rgba(200,65,43,0.33)",
            padding: "12px var(--gutter)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.06em",
            color: "var(--cream)",
          }}
        >
          ⚑ Sample case study — content and metrics are illustrative.
        </div>
      )}

      {/* Back link */}
      <div
        style={{
          position: "fixed",
          top: 28,
          left: 40,
          zIndex: 100,
          mixBlendMode: "difference",
        }}
      >
        <button
          type="button"
          onClick={() => triggerRouteTransition("/", "00", "Home", "home")}
          data-cursor-label="back"
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--cream)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "transparent",
            border: 0,
            padding: 0,
            cursor: "pointer",
          }}
        >
          <span style={{ color: "var(--accent)" }}>←</span> Back
        </button>
      </div>

      {/* OPENING HERO */}
      <article
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          padding: "var(--case-hero-pad, 120px var(--gutter) 100px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingBottom: 18,
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <SmallCap color="var(--accent)">Case Study · No. {p.no}</SmallCap>
          <SmallCap>{p.timeframe}</SmallCap>
        </div>

        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto", width: "100%" }}>
          <div
            style={{
              display: "flex",
              gap: 24,
              alignItems: "baseline",
              marginBottom: 36,
            }}
          >
            <FolioNumber size={28}>{p.no}</FolioNumber>
            <SmallCap style={{ color: "var(--text-dim)" }}>{p.role}</SmallCap>
          </div>

          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(72px, 12vw, 200px)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: "var(--cream)",
            }}
          >
            <RevealText block delay={120}>
              <span style={{ fontStyle: "italic" }}>{p.title}</span>
              <span style={{ color: "var(--accent)" }}>,</span>
            </RevealText>
            <RevealText
              block
              delay={220}
              style={{
                fontSize: "0.5em",
                fontStyle: "italic",
                color: "var(--text-soft)",
              }}
            >
              {p.tagline}
            </RevealText>
          </h1>

          <FadeIn delay={340}>
            <div
              style={{
                width: 80,
                height: 1,
                background: "var(--accent)",
                margin: "56px 0 32px",
              }}
            />
          </FadeIn>

          <FadeIn delay={430} as="p" y={22}
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: "clamp(20px, 2vw, 26px)",
              lineHeight: 1.45,
              color: "var(--text-soft)",
              maxWidth: 760,
              margin: 0,
            }}
          >
            {p.pull}
          </FadeIn>

          <FadeIn delay={520}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "var(--case-meta-columns, repeat(3, auto))",
                gap: "var(--case-meta-gap, 56px)",
                margin: "64px 0 0",
                justifyContent: "start",
              }}
            >
              {[["Role", p.role], ["Timeframe", p.timeframe], ["Year", p.year]].map(
                ([k, v]) => (
                  <div key={k}>
                    <div
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: 10,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--text-dim)",
                        marginBottom: 8,
                      }}
                    >
                      {k}
                    </div>
                    <div
                      style={{ fontFamily: "var(--font-ui)", fontSize: 14, color: "var(--text)" }}
                    >
                      {v}
                    </div>
                  </div>
                )
              )}
            </div>
          </FadeIn>

          <FadeIn delay={610}>
            <div style={{ marginTop: 36 }}>
              <TechChips items={p.stack} dim />
            </div>
          </FadeIn>

          {p.liveUrl && (
            <FadeIn delay={680}>
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-label="view live"
                style={{
                  marginTop: 32,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: "var(--font-ui)",
                  fontSize: 12,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--cream)",
                  textDecoration: "none",
                  paddingBottom: 6,
                  borderBottom: "1px solid var(--accent)",
                }}
              >
                <span style={{ color: "var(--accent)" }}>●</span>
                View live demo
                <span style={{ color: "var(--accent)" }}>↗</span>
              </a>
            </FadeIn>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <SmallCap>
            Scroll <span style={{ color: "var(--accent)" }}>↓</span> to read
          </SmallCap>
          <SmallCap>Case study</SmallCap>
        </div>
      </article>

      {/* HERO MOCKUP */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          padding: `0 var(--gutter) 110px`,
        }}
      >
        <div
          style={{
            maxWidth: "var(--max-w)",
            margin: "0 auto",
            position: "relative",
            height:
              projectId === "pocketplan"
                ? "var(--case-mock-height, 620px)"
                : "var(--case-mock-height, 540px)",
            background:
              projectId === "pocketplan"
                ? "linear-gradient(160deg,#221C17,var(--ink-screen))"
                : "transparent",
            border:
              projectId === "pocketplan" ? "1px solid var(--rule)" : "none",
            overflow: "hidden",
          }}
          className="motion-case-media"
        >
          <ProjectHeroMock id={p.id} />
        </div>
        <div
          style={{
            maxWidth: "var(--max-w)",
            margin: "16px auto 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: 14,
              color: "var(--text-soft)",
            }}
          >
            {p.title}, principal view.
          </span>
          <SmallCap>Live product UI</SmallCap>
        </div>
      </section>

      {/* PROSE SECTIONS */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <ProseSection kicker="i. Overview" n="01" heading="What it is." body={S.overview} />
        <ProseSection kicker="ii. The challenge" n="02" heading="The problem worth solving." body={S.challenge} />
        <ProseSection kicker="iii. Design thinking" n="03" heading="How I approached it." body={S.designThinking} />
      </div>

      <InteractionBand items={S.interactionDetails} projectId={projectId} />

      <div style={{ position: "relative", zIndex: 2 }}>
        <CardGrid kicker="v. Key features" n="05" heading="What I built." items={S.keyFeatures} />
        <CardGrid kicker="vi. Technical decisions" n="06" heading="How it's built." items={S.technicalDecisions} />
      </div>

      {/* OUTCOME */}
      <section
        ref={outcomeRef}
        className="case-chapter"
        data-reveal-state={outcomeRevealed ? "in" : "out"}
        style={{
          position: "relative",
          zIndex: 2,
          padding: "var(--case-section-pad, 120px var(--gutter))",
          borderTop: "1px solid var(--rule)",
          background: "var(--ink-2)",
        }}
      >
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <FadeIn y={12}>
            <SmallCap style={{ color: "var(--text-dim)" }}>vii. Outcome</SmallCap>
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "var(--case-metric-columns, repeat(4, 1fr))",
              gap: 40,
              margin: "48px 0 64px",
            }}
          >
            {p.metrics.map((m, i) => (
              <FadeIn key={m.label} delay={110 + i * 80} y={28}>
                <Metric value={m.value} label={m.label} accent={i === 0} />
              </FadeIn>
            ))}
          </div>
          <FadeIn
            as="p"
            delay={420}
            y={24}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 20,
              lineHeight: 1.6,
              color: "var(--text)",
              maxWidth: 820,
              margin: 0,
            }}
          >
            {S.outcome}
          </FadeIn>
        </div>
      </section>

      {/* LESSONS */}
      <section
        ref={lessonsRef}
        className="case-chapter"
        data-reveal-state={lessonsRevealed ? "in" : "out"}
        style={{
          position: "relative",
          zIndex: 2,
          padding: "var(--case-section-pad, 120px var(--gutter))",
          borderTop: "1px solid var(--rule)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <FadeIn y={12}>
            <SmallCap style={{ color: "var(--text-dim)" }}>viii. Lessons</SmallCap>
          </FadeIn>
          <FadeIn
            as="p"
            delay={120}
            y={28}
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(30px, 3.6vw, 52px)",
              lineHeight: 1.2,
              letterSpacing: "-0.015em",
              color: "var(--cream)",
              margin: "32px 0 0",
            }}
          >
            &ldquo;{S.lessons}&rdquo;
          </FadeIn>
        </div>
      </section>

      {/* CLOSE / NEXT */}
      <section
        ref={closeRef}
        className="case-chapter"
        data-reveal-state={closeRevealed ? "in" : "out"}
        style={{
          position: "relative",
          zIndex: 2,
          padding: "var(--case-close-pad, 140px var(--gutter) 120px)",
          borderTop: "1px solid var(--rule)",
        }}
      >
        <div style={{ maxWidth: "var(--max-w)", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              paddingBottom: 24,
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <FadeIn y={10}>
              <SmallCap>End of case · {p.title}</SmallCap>
            </FadeIn>
            <FadeIn delay={90} y={10}>
              <SmallCap>MMXXVI</SmallCap>
            </FadeIn>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "var(--case-close-columns, 1fr 1fr)",
              gap: "var(--case-prose-gap, 80px)",
              marginTop: 72,
            }}
          >
            <FadeIn delay={140} y={28}>
              <SmallCap style={{ color: "var(--text-dim)" }}>Return</SmallCap>
              <MagneticButton
                type="button"
                onClick={() => triggerRouteTransition("/", "00", "Home", "home")}
                data-cursor-label="back"
                style={{
                  marginTop: 18,
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontSize: "clamp(36px, 4.5vw, 64px)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "var(--cream)",
                  textAlign: "left",
                }}
              >
                ← Back home
              </MagneticButton>
            </FadeIn>
            {next && (
              <FadeIn delay={230} y={28} style={{ textAlign: "right" }}>
                <SmallCap style={{ color: "var(--text-dim)" }}>
                  Read next · Case {next.no}
                </SmallCap>
                <MagneticButton
                  type="button"
                  onClick={() => triggerTransition(next.id, next.no, next.title)}
                  data-cursor-label="open case"
                  style={{
                    marginTop: 18,
                    display: "block",
                    marginLeft: "auto",
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: "clamp(36px, 4.5vw, 64px)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "var(--cream)",
                    textAlign: "right",
                  }}
                >
                  {next.title} →
                </MagneticButton>
              </FadeIn>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
