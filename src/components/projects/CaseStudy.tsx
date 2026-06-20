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
import PocketPlanPhone from "@/components/mockups/PocketPlanPhone";

interface ProductStage {
  label: string;
  title: string;
  body: string;
  stat: string;
}

interface ProductChapterConfig {
  kicker: string;
  title: string;
  body: string;
  systemLabel: string;
  stages: ProductStage[];
  artifacts: string[];
}

interface InteractionStepConfig {
  label: string;
  title: string;
  system: string;
  signal: string;
  feedback: string;
}

interface InteractionModelConfig {
  eyebrow: string;
  title: string;
  body: string;
  resultLabel: string;
  resultValue: string;
  laneLabels: string[];
  steps: InteractionStepConfig[];
}

const PRODUCT_CHAPTERS: Record<string, ProductChapterConfig> = {
  pocketplan: {
    kicker: "i. Product system",
    title: "The money engine behind the calm.",
    body:
      "PocketPlan is framed as a calm finance surface, but the case needs to show the machinery: normalized transactions move through scoring, forecasting, and subscription detection before the UI decides what to emphasize.",
    systemLabel: "Finance model",
    stages: [
      {
        label: "01 Input",
        title: "Transaction stream",
        body:
          "Twelve months of local demo data becomes the raw material for category totals, merchant patterns, recurring charges, and month-over-month behavior.",
        stat: "12M data",
      },
      {
        label: "02 Compute",
        title: "Health and forecast",
        body:
          "Pure TypeScript utilities calculate savings rate, budget adherence, emergency-fund progress, spending consistency, and safe-to-spend projections.",
        stat: "5 factors",
      },
      {
        label: "03 Surface",
        title: "One calm answer",
        body:
          "The interface compresses the analysis into a legible dashboard: balance, risk, forecast, and recurring costs without making the user read the engine.",
        stat: "0 backend",
      },
    ],
    artifacts: ["Score weighting", "Forecast line", "Recurring detector"],
  },
  notes: {
    kicker: "i. Product system",
    title: "A playful board with serious local-first logic.",
    body:
      "Notes looks tactile, but the important product story is underneath: editor documents, reducer actions, IndexedDB persistence, and ranked retrieval all keep the board useful as it grows.",
    systemLabel: "Local-first loop",
    stages: [
      {
        label: "01 Capture",
        title: "Rich note document",
        body:
          "TipTap content stays expressive enough for headings, lists, checklists, code, clips, and tags without flattening into plain text too early.",
        stat: "TipTap",
      },
      {
        label: "02 Extract",
        title: "Tasks and search signals",
        body:
          "Helpers parse the editor tree into structured tasks, smart-folder membership, clip metadata, and ranked search fields.",
        stat: "6 folders",
      },
      {
        label: "03 Persist",
        title: "Private browser memory",
        body:
          "IndexedDB stores the working board locally, with migration logic protecting older saved notes as the product model evolves.",
        stat: "0 backend",
      },
    ],
    artifacts: ["Reducer events", "IndexedDB store", "Ranked search"],
  },
  "little-lemon": {
    kicker: "i. Product system",
    title: "A reservation flow that behaves like a product.",
    body:
      "Little Lemon is small by design, so the case has to prove care at the interaction level: availability, validation, focus order, and confirmation all work together in one calm booking path.",
    systemLabel: "Booking contract",
    stages: [
      {
        label: "01 Choose",
        title: "Date, time, party",
        body:
          "The user makes one clear decision at a time while the layout keeps the booking task stable across phone and desktop.",
        stat: "1 path",
      },
      {
        label: "02 Validate",
        title: "Helpful constraints",
        body:
          "React Hook Form and Zod keep inputs typed, constrained, and explained inline instead of waiting for a hostile submit wall.",
        stat: "Zod",
      },
      {
        label: "03 Confirm",
        title: "Accessible closure",
        body:
          "The flow lands on a reassuring confirmation state with focus choreography so keyboard and screen-reader users are not left behind.",
        stat: "AA",
      },
    ],
    artifacts: ["Schema contract", "Inline errors", "Focus handoff"],
  },
};

const INTERACTION_MODELS: Record<string, InteractionModelConfig> = {
  pocketplan: {
    eyebrow: "Finance intelligence",
    title: "Every calm screen is backed by a computed answer.",
    body:
      "The interaction model is not just dashboard motion. User actions expose a chain of typed calculations, confidence signals, and UI emphasis rules.",
    resultLabel: "Surface",
    resultValue: "one financial recommendation",
    laneLabels: ["User asks", "Model computes", "Interface responds"],
    steps: [
      {
        label: "01 Health",
        title: "Financial health score",
        system: "5-factor weighting",
        signal: "savings + budget adherence + emergency buffer",
        feedback: "Score, risk tone, and priority copy update together.",
      },
      {
        label: "02 Forecast",
        title: "Cash-flow forecast",
        system: "safe-to-spend projection",
        signal: "known income, upcoming bills, current burn rate",
        feedback: "The chart, daily allowance, and warning state share one source.",
      },
      {
        label: "03 Recurring",
        title: "Subscription detection",
        system: "merchant normalization",
        signal: "monthly cadence, fuzzy merchant names, duplicates",
        feedback: "Recurring charges surface without asking for manual tagging.",
      },
    ],
  },
  notes: {
    eyebrow: "Local-first interaction",
    title: "Small gestures become durable browser state.",
    body:
      "The board should feel playful, but the case needs to reveal the machinery that turns writing, searching, and clipping into predictable product behavior.",
    resultLabel: "Surface",
    resultValue: "a private, searchable workspace",
    laneLabels: ["Gesture", "Reducer action", "Persistent result"],
    steps: [
      {
        label: "01 Extract",
        title: "Task extraction",
        system: "TipTap document parser",
        signal: "checkbox nodes, due dates, archived status",
        feedback: "A free-form note becomes task progress on the card.",
      },
      {
        label: "02 Retrieve",
        title: "Ranked search",
        system: "weighted local index",
        signal: "title, tags, body, tasks, clip metadata",
        feedback: "Search feels instant while still respecting the note structure.",
      },
      {
        label: "03 Clip",
        title: "Web clipping",
        system: "metadata fallback path",
        signal: "URL, title, domain, Open Graph response",
        feedback: "The app enriches links when possible and degrades cleanly.",
      },
    ],
  },
  "little-lemon": {
    eyebrow: "Reservation behavior",
    title: "A small form can still prove product discipline.",
    body:
      "The experience is strongest when each interaction has a visible contract: typed input, helpful validation, optimistic feedback, and accessible closure.",
    resultLabel: "Surface",
    resultValue: "one confident booking path",
    laneLabels: ["Customer action", "Validation contract", "Booking response"],
    steps: [
      {
        label: "01 Validate",
        title: "Inline validation",
        system: "Zod schema",
        signal: "blurred field, invalid shape, helper text",
        feedback: "Errors appear near the cause instead of after the task fails.",
      },
      {
        label: "02 Confirm",
        title: "Optimistic confirm",
        system: "submit state machine",
        signal: "pending request, success state, rollback path",
        feedback: "The booking feels fast without pretending failure cannot happen.",
      },
      {
        label: "03 Focus",
        title: "Focus choreography",
        system: "keyboard route",
        signal: "field order, error target, confirmation handoff",
        feedback: "Keyboard and screen-reader users land in the right place.",
      },
    ],
  },
};

const POCKETPLAN_PRODUCT_STATES = [
  {
    label: "01 Balance",
    screen: "balance" as const,
    title: "Start with the answer, not the ledger.",
    body:
      "The first state compresses the user's financial reality into a balance, daily movement, upcoming bills, and a visible trend. It gives a calm read before asking the user to inspect detail.",
    stat: "$4,210.06",
    signal: "balance + upcoming obligations",
  },
  {
    label: "02 Budget",
    screen: "budget" as const,
    title: "Turn categories into decisions.",
    body:
      "Budget progress is treated as a decision surface: categories, remaining room, and safe pacing are visible without making the user decode a spreadsheet.",
    stat: "74%",
    signal: "category usage + goal pressure",
  },
  {
    label: "03 Forecast",
    screen: "forecast" as const,
    title: "Forecast the next move before it hurts.",
    body:
      "The forecast state links the analytics engine to a human next step: safe-to-spend, recurring charges, and near-term risk become visible before the month gets away.",
    stat: "$86/day",
    signal: "projected cash flow",
  },
];

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
            marginBottom: 56,
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

function ProductSystemVisual({
  projectId,
  stage,
  artifacts,
  systemLabel,
}: {
  projectId: string;
  stage: ProductStage;
  artifacts: string[];
  systemLabel: string;
}) {
  const accent =
    projectId === "little-lemon" ? "rgba(217,164,82,0.72)" : "var(--accent)";
  const rows =
    projectId === "pocketplan"
      ? ["income + expenses", "merchant pattern", "budget envelope"]
      : projectId === "notes"
      ? ["editor document", "task tokens", "clip metadata"]
      : ["date / time", "party size", "contact fields"];

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        minHeight: "var(--case-system-visual-height, 560px)",
        border: "1px solid var(--rule)",
        background:
          projectId === "little-lemon"
            ? "linear-gradient(145deg, rgba(217,164,82,0.08), rgba(20,17,14,0.92))"
            : "linear-gradient(145deg, rgba(200,65,43,0.10), rgba(20,17,14,0.92))",
        overflow: "hidden",
        padding: "var(--case-system-visual-pad, 34px)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-20% -24% auto auto",
          width: "70%",
          aspectRatio: "1 / 1",
          borderRadius: "50%",
          background:
            projectId === "little-lemon"
              ? "radial-gradient(circle, rgba(217,164,82,0.22), transparent 64%)"
              : "radial-gradient(circle, rgba(200,65,43,0.24), transparent 64%)",
          filter: "blur(8px)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          gap: 28,
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
          <SmallCap color="var(--accent)">{systemLabel}</SmallCap>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-dim)",
            }}
          >
            {stage.stat}
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "var(--case-system-grid, minmax(0, 0.82fr) minmax(0, 1.18fr))",
            gap: 26,
            alignItems: "center",
          }}
        >
          <div style={{ display: "grid", gap: 12 }}>
            {rows.map((row, i) => (
              <div
                key={row}
                style={{
                  border: "1px solid rgba(232,223,211,0.14)",
                  background: "rgba(232,223,211,0.035)",
                  padding: "14px 16px",
                  transform:
                    i === 1 ? "translateX(var(--case-system-row-offset, 18px))" : "translateX(0)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 14,
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: 10,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: i === 0 ? "var(--cream)" : "var(--text-soft)",
                    }}
                  >
                    {row}
                  </span>
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: i === 0 ? accent : "rgba(232,223,211,0.28)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              minHeight: 270,
              borderLeft: "1px solid var(--rule)",
              paddingLeft: "var(--case-system-node-pad, 30px)",
              display: "grid",
              alignContent: "center",
              gap: 22,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(44px, 7vw, 92px)",
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
                color: "var(--cream)",
              }}
            >
              {stage.stat}
            </div>
            <div
              style={{
                height: 94,
                position: "relative",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${i * 26}%`,
                    bottom: `${18 + i * 14}%`,
                    width: "28%",
                    height: 2,
                    background: i === 3 ? accent : "rgba(232,223,211,0.24)",
                    transform: `rotate(${projectId === "little-lemon" ? -6 + i * 4 : 8 - i * 3}deg)`,
                    transformOrigin: "left center",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {artifacts.map((artifact, i) => (
                <span
                  key={artifact}
                  style={{
                    border: "1px solid rgba(232,223,211,0.16)",
                    color: i === 0 ? "var(--cream)" : "var(--text-soft)",
                    fontFamily: "var(--font-ui)",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "8px 10px",
                  }}
                >
                  {artifact}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 18,
            borderTop: "1px solid var(--rule)",
            paddingTop: 18,
          }}
        >
          <SmallCap>{stage.title}</SmallCap>
          <SmallCap color="var(--text-dim)">Product state</SmallCap>
        </div>
      </div>
    </div>
  );
}

function ProductSystemChapter({ projectId }: { projectId: string }) {
  const config = PRODUCT_CHAPTERS[projectId] ?? PRODUCT_CHAPTERS.pocketplan;
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, revealed] = useRevealOnce<HTMLElement>();
  const active = config.stages[activeIndex] ?? config.stages[0];

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
          "linear-gradient(180deg, rgba(232,223,211,0.018), rgba(20,17,14,0))",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "var(--case-product-columns, minmax(320px, 0.74fr) minmax(0, 1.26fr))",
          gap: "var(--case-prose-gap, 80px)",
          alignItems: "start",
        }}
      >
        <div>
          <FadeIn y={12}>
            <SmallCap style={{ color: "var(--text-dim)" }}>
              {config.kicker}
            </SmallCap>
            <div style={{ marginTop: 22 }}>
              <FolioNumber size={44}>01</FolioNumber>
            </div>
            <h2
              style={{
                margin: "28px 0 0",
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(38px, 5vw, 78px)",
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                color: "var(--cream)",
              }}
            >
              <RevealText block delay={80}>
                {config.title}
              </RevealText>
            </h2>
          </FadeIn>

          <FadeIn
            as="p"
            delay={180}
            y={22}
            style={{
              margin: "26px 0 0",
              fontFamily: "var(--font-body)",
              fontSize: 18,
              lineHeight: 1.65,
              color: "var(--text-soft)",
              maxWidth: 520,
            }}
          >
            {config.body}
          </FadeIn>

          <div style={{ display: "grid", gap: 1, marginTop: 36 }}>
            {config.stages.map((stage, i) => {
              const selected = i === activeIndex;
              return (
                <FadeIn key={stage.label} delay={240 + i * 70} y={18}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className="motion-inspect"
                    data-cursor-label="inspect"
                    style={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "74px 1fr auto",
                      gap: 18,
                      alignItems: "center",
                      textAlign: "left",
                      border: "1px solid var(--rule)",
                      background: selected
                        ? "rgba(232,223,211,0.06)"
                        : "rgba(232,223,211,0.018)",
                      padding: "18px 18px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        color: selected ? "var(--accent)" : "var(--text-dim)",
                      }}
                    >
                      {stage.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: 12,
                        letterSpacing: "0.13em",
                        textTransform: "uppercase",
                        color: selected ? "var(--cream)" : "var(--text-soft)",
                      }}
                    >
                      {stage.title}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        color: selected ? "var(--accent)" : "var(--text-dim)",
                        transform: selected ? "translateX(0)" : "translateX(-5px)",
                        transition:
                          "transform var(--dur-micro) var(--ease-inspect), color var(--dur-micro) ease",
                      }}
                    >
                      →
                    </span>
                  </button>
                </FadeIn>
              );
            })}
          </div>
        </div>

        <FadeIn delay={220} y={28}>
          <ProductSystemVisual
            projectId={projectId}
            stage={active}
            artifacts={config.artifacts}
            systemLabel={config.systemLabel}
          />
          <p
            style={{
              margin: "22px 0 0",
              fontFamily: "var(--font-body)",
              fontSize: 18,
              lineHeight: 1.55,
              color: "var(--text-soft)",
              maxWidth: 760,
            }}
          >
            {active.body}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function PocketPlanStateShowcase() {
  const [ref, revealed] = useRevealOnce<HTMLElement>();
  const railRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = POCKETPLAN_PRODUCT_STATES[activeIndex];

  const selectState = (index: number) => {
    setActiveIndex(index);
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handleRailScroll = () => {
    const rail = railRef.current;
    if (!rail) return;

    const railCenter = rail.getBoundingClientRect().left + rail.clientWidth / 2;
    let nextIndex = activeIndex;
    let minDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - railCenter);
      if (distance < minDistance) {
        minDistance = distance;
        nextIndex = index;
      }
    });

    if (nextIndex !== activeIndex) setActiveIndex(nextIndex);
  };

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
          "linear-gradient(180deg, var(--ink), rgba(27,23,20,0.72) 52%, var(--ink))",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns:
            "var(--case-pocket-state-columns, minmax(280px, 0.72fr) minmax(0, 1.28fr))",
          gap: "var(--case-pocket-state-gap, 76px)",
          alignItems: "start",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: "var(--case-pocket-state-copy-top, 116px)",
          }}
        >
          <FadeIn y={12}>
            <SmallCap style={{ color: "var(--text-dim)" }}>
              ii. Product states
            </SmallCap>
            <div style={{ marginTop: 22 }}>
              <FolioNumber size={44}>02</FolioNumber>
            </div>
            <h2
              style={{
                margin: "28px 0 0",
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(38px, 5vw, 76px)",
                lineHeight: 0.98,
                color: "var(--cream)",
              }}
            >
              Three screens, one financial answer.
            </h2>
          </FadeIn>

          <FadeIn
            as="p"
            delay={140}
            y={18}
            style={{
              margin: "26px 0 0",
              fontFamily: "var(--font-body)",
              fontSize: 18,
              lineHeight: 1.65,
              color: "var(--text-soft)",
              maxWidth: 520,
            }}
          >
            PocketPlan should feel calm because each screen is doing a distinct
            job: read the current state, understand the budget pressure, then
            forecast the next decision.
          </FadeIn>

          <div
            role="list"
            aria-label="PocketPlan product states"
            style={{
              display: "grid",
              gap: 1,
              marginTop: 36,
              maxWidth: 520,
            }}
          >
            {POCKETPLAN_PRODUCT_STATES.map((state, index) => {
              const selected = index === activeIndex;

              return (
                <FadeIn key={state.label} delay={220 + index * 70} y={14}>
                  <div role="listitem">
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => selectState(index)}
                      className="motion-inspect"
                      data-cursor-label="view"
                      style={{
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "92px 1fr auto",
                        gap: 18,
                        alignItems: "center",
                        textAlign: "left",
                        border: "1px solid var(--rule)",
                        background: selected
                          ? "rgba(232,223,211,0.065)"
                          : "rgba(232,223,211,0.018)",
                        color: selected ? "var(--cream)" : "var(--text-soft)",
                        padding: "18px",
                        transition:
                          "background var(--dur-micro) ease, color var(--dur-micro) ease",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          color: selected ? "var(--accent)" : "var(--text-dim)",
                        }}
                      >
                        {state.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: 12,
                          letterSpacing: "0.13em",
                          textTransform: "uppercase",
                        }}
                      >
                        {state.signal}
                      </span>
                      <span
                        aria-hidden="true"
                        style={{
                          color: selected ? "var(--accent)" : "var(--text-dim)",
                        }}
                      >
                        →
                      </span>
                    </button>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        <FadeIn delay={180} y={28}>
          <div
            style={{
              border: "1px solid var(--rule)",
              background:
                "linear-gradient(145deg, rgba(200,65,43,0.10), rgba(15,13,11,0.94))",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 18,
                alignItems: "center",
                padding: "22px var(--case-pocket-state-pad, 30px)",
                borderBottom: "1px solid var(--rule)",
              }}
            >
              <SmallCap color="var(--accent)">{active.label}</SmallCap>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                }}
              >
                swipe / inspect
              </span>
            </div>

            <div
              ref={railRef}
              onScroll={handleRailScroll}
              data-lenis-prevent
              style={{
                display: "flex",
                gap: "var(--case-pocket-phone-gap, 28px)",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                scrollPaddingInline: "var(--case-pocket-state-pad, 30px)",
                padding:
                  "28px var(--case-pocket-state-pad, 30px) 28px",
                scrollbarWidth: "none",
              }}
            >
              {POCKETPLAN_PRODUCT_STATES.map((state, index) => (
                <div
                  key={state.screen}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  style={{
                    position: "relative",
                    flex: "0 0 var(--case-pocket-phone-card-w, min(360px, 76vw))",
                    height: "var(--case-pocket-phone-card-h, 680px)",
                    scrollSnapAlign: "center",
                    border: "1px solid var(--rule)",
                    background:
                      index === activeIndex
                        ? "rgba(232,223,211,0.055)"
                        : "rgba(232,223,211,0.022)",
                    overflow: "hidden",
                  }}
                >
                  <PocketPlanPhone screen={state.screen} />
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "var(--case-pocket-state-detail-columns, 0.42fr 1fr)",
                gap: 1,
                background: "var(--rule)",
                borderTop: "1px solid var(--rule)",
              }}
            >
              <div
                style={{
                  background: "var(--ink)",
                  padding: "28px",
                }}
              >
                <SmallCap color="var(--text-dim)">Live read</SmallCap>
                <div
                  style={{
                    marginTop: 18,
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(42px, 6vw, 74px)",
                    lineHeight: 0.92,
                    color: "var(--cream)",
                  }}
                >
                  {active.stat}
                </div>
              </div>
              <div
                style={{
                  background: "var(--ink)",
                  padding: "28px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(30px, 4vw, 46px)",
                    lineHeight: 1.02,
                    color: "var(--cream)",
                  }}
                >
                  {active.title}
                </h3>
                <p
                  style={{
                    margin: "18px 0 0",
                    fontFamily: "var(--font-body)",
                    fontSize: 17,
                    lineHeight: 1.6,
                    color: "var(--text-soft)",
                    maxWidth: 620,
                  }}
                >
                  {active.body}
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function InteractionStateVisual({
  projectId,
  config,
  activeIndex,
}: {
  projectId: string;
  config: InteractionModelConfig;
  activeIndex: number;
}) {
  const active = config.steps[activeIndex];
  const accent =
    projectId === "little-lemon" ? "rgba(217,164,82,0.74)" : "var(--accent)";

  return (
    <div
      aria-hidden="true"
      style={{
        minHeight: "var(--case-interaction-visual-height, 520px)",
        border: "1px solid var(--rule)",
        background:
          projectId === "little-lemon"
            ? "linear-gradient(145deg, rgba(217,164,82,0.08), rgba(20,17,14,0.94))"
            : "linear-gradient(145deg, rgba(200,65,43,0.10), rgba(20,17,14,0.94))",
        padding: "var(--case-interaction-visual-pad, 34px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-28% auto auto 38%",
          width: "70%",
          height: "70%",
          background:
            projectId === "little-lemon"
              ? "radial-gradient(circle, rgba(217,164,82,0.14), transparent 62%)"
              : "radial-gradient(circle, rgba(200,65,43,0.16), transparent 62%)",
          filter: "blur(12px)",
          opacity: 0.9,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 18,
            alignItems: "center",
            marginBottom: 34,
          }}
        >
          <SmallCap color="var(--accent)">{config.eyebrow}</SmallCap>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-dim)",
            }}
          >
            active / 0{activeIndex + 1}
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "var(--case-state-columns, 1fr 1.15fr)",
            gap: "var(--case-state-gap, 28px)",
            alignItems: "stretch",
          }}
        >
          <div style={{ display: "grid", gap: 1, background: "var(--rule)" }}>
            {config.laneLabels.map((lane, i) => (
              <div
                key={lane}
                style={{
                  background: "rgba(15,13,11,0.92)",
                  padding: "22px 20px",
                  display: "grid",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: i === activeIndex ? accent : "var(--text-dim)",
                  }}
                >
                  0{i + 1}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--text-soft)",
                  }}
                >
                  {lane}
                </span>
                <div
                  style={{
                    height: 1,
                    background:
                      i <= activeIndex
                        ? `linear-gradient(90deg, ${accent}, transparent)`
                        : "var(--rule)",
                  }}
                />
              </div>
            ))}
          </div>

          <div
            style={{
              border: "1px solid var(--rule)",
              background: "rgba(232,223,211,0.035)",
              padding: "var(--case-state-card-pad, 30px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 310,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 18,
                  marginBottom: 34,
                }}
              >
                <SmallCap>{active.label}</SmallCap>
                <SmallCap color="var(--text-dim)">Selected state</SmallCap>
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(34px, 5vw, 64px)",
                  lineHeight: 0.96,
                  color: "var(--cream)",
                }}
              >
                {active.title}
              </h3>
              <div
                style={{
                  marginTop: 32,
                  display: "grid",
                  gap: 12,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  lineHeight: 1.5,
                  color: "var(--text-soft)",
                }}
              >
                <span>{active.system}</span>
                <span style={{ color: "var(--text-dim)" }}>
                  signal: {active.signal}
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: 40,
                borderTop: "1px solid var(--rule)",
                paddingTop: 22,
                display: "flex",
                justifyContent: "space-between",
                gap: 20,
                alignItems: "flex-end",
              }}
            >
              <div>
                <SmallCap color="var(--text-dim)">
                  {config.resultLabel}
                </SmallCap>
                <p
                  style={{
                    margin: "10px 0 0",
                    fontFamily: "var(--font-body)",
                    fontSize: 17,
                    lineHeight: 1.45,
                    color: "var(--text-soft)",
                    maxWidth: 340,
                  }}
                >
                  {active.feedback}
                </p>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: accent,
                  textAlign: "right",
                }}
              >
                {config.resultValue}
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns: "var(--case-state-step-columns, repeat(3, 1fr))",
            gap: 1,
            background: "var(--rule)",
          }}
        >
          {config.steps.map((step, i) => (
            <div
              key={step.label}
              style={{
                minHeight: 74,
                background:
                  i === activeIndex
                    ? "rgba(232,223,211,0.07)"
                    : "rgba(15,13,11,0.8)",
                padding: "16px",
                color: i === activeIndex ? "var(--cream)" : "var(--text-dim)",
              }}
            >
              <div
                style={{
                  height: 2,
                  marginBottom: 14,
                  background:
                    i <= activeIndex
                      ? `linear-gradient(90deg, ${accent}, transparent)`
                      : "var(--rule)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 10,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                }}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InteractionBand({
  items,
  projectId,
  kicker,
}: {
  items: CaseStudyCard[];
  projectId: string;
  kicker: string;
}) {
  const config = INTERACTION_MODELS[projectId] ?? INTERACTION_MODELS.pocketplan;
  const [activeIndex, setActiveIndex] = useState(0);
  const [ref, revealed] = useRevealOnce<HTMLElement>();
  const active = config.steps[activeIndex];
  const activeCopy = items[activeIndex] ?? items[0];

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
              {kicker}
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
              {config.title}
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
              minHeight: "var(--case-interaction-panel-height, 520px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <SmallCap color="var(--accent)">State sequence</SmallCap>
              <p
                style={{
                  margin: "28px 0 0",
                  fontFamily: "var(--font-body)",
                  fontSize: 18,
                  lineHeight: 1.58,
                  color: "var(--text-soft)",
                }}
              >
                {config.body}
              </p>
              <div
                role="list"
                aria-label={`${projectId} interaction states`}
                style={{ marginTop: 34, display: "grid", gap: 12 }}
              >
                {config.steps.map((step, i) => {
                  const selected = i === activeIndex;

                  return (
                    <FadeIn key={step.label} delay={120 + i * 80} y={14}>
                      <div role="listitem">
                        <button
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setActiveIndex(i)}
                          onMouseEnter={() => setActiveIndex(i)}
                          className="motion-inspect"
                          data-cursor-label="inspect"
                          style={{
                            width: "100%",
                            border: "1px solid var(--rule)",
                            background: selected
                              ? "rgba(232,223,211,0.065)"
                              : "rgba(232,223,211,0.018)",
                            color: selected
                              ? "var(--cream)"
                              : "var(--text-soft)",
                            padding: "18px",
                            display: "grid",
                            gridTemplateColumns: "auto 1fr auto",
                            gap: 16,
                            alignItems: "center",
                            textAlign: "left",
                            transition:
                              "background var(--dur-micro) ease, color var(--dur-micro) ease",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: 11,
                              color: selected
                                ? "var(--accent)"
                                : "var(--text-dim)",
                            }}
                          >
                            {step.label.slice(0, 2)}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-ui)",
                              fontSize: 12,
                              letterSpacing: "0.13em",
                              textTransform: "uppercase",
                            }}
                          >
                            {step.title}
                          </span>
                          <span
                            aria-hidden="true"
                            style={{
                              color: selected
                                ? "var(--accent)"
                                : "var(--text-dim)",
                            }}
                          >
                            →
                          </span>
                        </button>
                      </div>
                    </FadeIn>
                  );
                })}
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
              {active.feedback}
            </p>
          </FadeIn>

          <FadeIn delay={140} y={30}>
            <InteractionStateVisual
              projectId={projectId}
              config={config}
              activeIndex={activeIndex}
            />
            <div
              style={{
                marginTop: 1,
                display: "grid",
                gridTemplateColumns: "var(--case-interaction-detail-columns, 0.82fr 1.18fr)",
                gap: 1,
                background: "var(--rule)",
                border: "1px solid var(--rule)",
                borderTop: 0,
              }}
            >
              <div
                style={{
                  background: "var(--ink)",
                  padding: "28px",
                  minHeight: 190,
                }}
              >
                <SmallCap color="var(--accent)">{active.system}</SmallCap>
                <p
                  style={{
                    margin: "20px 0 0",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    lineHeight: 1.65,
                    color: "var(--text-soft)",
                  }}
                >
                  {active.signal}
                </p>
              </div>
              <div
                style={{
                  background: "var(--ink)",
                  padding: "28px",
                  minHeight: 190,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 34,
                    lineHeight: 1.02,
                    color: "var(--cream)",
                  }}
                >
                  {activeCopy.title}
                </h3>
                <p
                  style={{
                    margin: "16px 0 0",
                    fontFamily: "var(--font-body)",
                    fontSize: 17,
                    lineHeight: 1.6,
                    color: "var(--text-soft)",
                  }}
                >
                  {activeCopy.body}
                </p>
              </div>
            </div>
          </FadeIn>
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
  const hasPocketPlanStateShowcase = projectId === "pocketplan";
  const chapterShift = hasPocketPlanStateShowcase ? 1 : 0;
  const roman = [
    "",
    "i",
    "ii",
    "iii",
    "iv",
    "v",
    "vi",
    "vii",
    "viii",
    "ix",
    "x",
  ];
  const chapterKicker = (base: number, label: string) =>
    `${roman[base + chapterShift]}. ${label}`;
  const chapterNumber = (base: number) =>
    String(base + chapterShift).padStart(2, "0");

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
          padding: `0 var(--gutter) var(--section-pad-sm)`,
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

      <ProductSystemChapter projectId={projectId} />

      {hasPocketPlanStateShowcase && <PocketPlanStateShowcase />}

      {/* PROSE SECTIONS */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <ProseSection
          kicker={chapterKicker(2, "Overview")}
          n={chapterNumber(2)}
          heading="What it is."
          body={S.overview}
        />
        <ProseSection
          kicker={chapterKicker(3, "The challenge")}
          n={chapterNumber(3)}
          heading="The problem worth solving."
          body={S.challenge}
        />
        <ProseSection
          kicker={chapterKicker(4, "Design thinking")}
          n={chapterNumber(4)}
          heading="How I approached it."
          body={S.designThinking}
        />
      </div>

      <InteractionBand
        items={S.interactionDetails}
        projectId={projectId}
        kicker={chapterKicker(5, "Interaction model")}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <CardGrid
          kicker={chapterKicker(6, "Key features")}
          n={chapterNumber(6)}
          heading="What I built."
          items={S.keyFeatures}
        />
        <CardGrid
          kicker={chapterKicker(7, "Technical decisions")}
          n={chapterNumber(7)}
          heading="How it's built."
          items={S.technicalDecisions}
        />
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
            <SmallCap style={{ color: "var(--text-dim)" }}>
              {chapterKicker(8, "Outcome")}
            </SmallCap>
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
            <SmallCap style={{ color: "var(--text-dim)" }}>
              {chapterKicker(9, "Lessons")}
            </SmallCap>
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
