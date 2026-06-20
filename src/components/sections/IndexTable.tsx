"use client";

import SmallCap from "@/components/ui/SmallCap";
import FadeIn from "@/components/ui/FadeIn";
import RevealText from "@/components/ui/RevealText";
import FolioNumber from "@/components/ui/FolioNumber";

interface Entry {
  kind: "section" | "feature" | "preview";
  no: string;
  title: string;
  kicker: string;
  page: string;
  scene?: string;
  project?: string;
  disabled?: boolean;
}

const ENTRIES: Entry[] = [
  { kind: "section", no: "00", title: "Home",         kicker: "Positioning & intent",              page: "03", scene: "intro" },
  { kind: "section", no: "01", title: "Approach",     kicker: "How I think and build",             page: "07", scene: "manifesto" },
  { kind: "section", no: "02", title: "Projects",     kicker: "Three products, built end to end",  page: "14", scene: "works" },
  { kind: "feature", no: "02·i",   title: "PocketPlan",   kicker: "A local-first finance dashboard",     page: "14", project: "pocketplan" },
  { kind: "feature", no: "02·ii",  title: "Notes",        kicker: "A local-first sticky-notes app",       page: "22", project: "notes" },
  { kind: "feature", no: "02·iii", title: "Little Lemon", kicker: "A restaurant, engineered",            page: "28", project: "little-lemon" },
  { kind: "section", no: "03", title: "Capabilities", kicker: "What I do, plainly",                page: "32", scene: "capabilities" },
  { kind: "section", no: "04", title: "About",        kicker: "Engineering, interaction, product",  page: "38", scene: "about" },
  { kind: "section", no: "05", title: "Index",        kicker: "This page",                         page: "44", scene: "index" },
  { kind: "section", no: "06", title: "Contact",      kicker: "How to reach me",                   page: "48", scene: "contact" },
  { kind: "preview", no: "—",  title: "Coming next",  kicker: "A note on rendering type at 60fps", page: "—",  disabled: true },
];

interface Props {
  active: boolean;
  onJump: (id: string) => void;
  onOpen: (id: string) => void;
}

export default function IndexTable({ active, onJump, onOpen }: Props) {
  return (
    <section
      id="index"
      data-scene="index"
      data-reveal-state={active ? "in" : "out"}
      aria-label="Site index"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--ink)",
        color: "var(--text)",
        padding: "var(--section-pad-lg) var(--gutter) var(--section-pad-md)",
        overflow: "hidden",
      }}
    >
      <style>{`
        .toc-row {
          position: relative;
          transition: padding var(--dur-hover) var(--ease-reveal);
        }
        .toc-row:hover:not([disabled]) {
          padding-left: 18px;
        }
        .toc-row::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(-12px, -50%) scale(0);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          transition: transform var(--dur-hover) var(--ease-reveal);
        }
        .toc-row:hover:not([disabled])::before {
          transform: translate(0, -50%) scale(1);
        }
      `}</style>

      <div style={{ maxWidth: "var(--content-w)", margin: "0 auto" }}>
        {/* kicker */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 64,
            paddingBottom: 18,
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <FadeIn>
            <div>
              <SmallCap color="var(--accent)">Index · 05</SmallCap>
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
                <RevealText block delay={80}>Site contents.</RevealText>
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={140}>
            <div style={{ textAlign: "right" }}>
              <SmallCap>{ENTRIES.length - 1} entries</SmallCap>
              <div style={{ marginTop: 8 }}>
                <FolioNumber size={14}>MMXXVI</FolioNumber>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* TOC list */}
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {ENTRIES.map((e) => {
            const isFeature = e.kind === "feature";
            const isPreview = e.kind === "preview";

            const handleClick = () => {
              if (e.disabled) return;
              if (e.project) onOpen(e.project);
              else if (e.scene) onJump(e.scene);
            };

            return (
              <li
                key={e.no + e.title}
                style={{
                  borderBottom: "1px solid var(--rule)",
                  paddingLeft: isFeature ? 80 : 0,
                }}
              >
                <button
                  type="button"
                  onClick={handleClick}
                  disabled={e.disabled}
                  data-cursor-label={
                    e.disabled ? undefined : e.project ? "open case" : "jump"
                  }
                  className="toc-row"
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "22px 0",
                    width: "100%",
                    textAlign: "left",
                    cursor: e.disabled ? "default" : "pointer",
                    display: "grid",
                    gridTemplateColumns: "90px 1fr auto 80px",
                    gap: 24,
                    alignItems: "baseline",
                    color: isPreview ? "var(--text-dim)" : "var(--text)",
                    opacity: isPreview ? 0.55 : 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--text-dim)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {e.no}
                  </span>

                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: isFeature ? "italic" : "normal",
                      fontSize: isFeature ? 32 : 44,
                      lineHeight: 1.1,
                      color: "var(--cream)",
                      letterSpacing: "-0.018em",
                    }}
                  >
                    {e.title}
                  </span>

                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontStyle: "italic",
                      fontSize: 16,
                      color: "var(--text-soft)",
                      letterSpacing: "0.005em",
                    }}
                  >
                    {e.kicker}
                  </span>

                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--text-soft)",
                      textAlign: "right",
                    }}
                  >
                    p. {e.page}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* footer */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <FadeIn delay={300}>
            <SmallCap>End of Index</SmallCap>
          </FadeIn>
          <FadeIn delay={360}>
            <SmallCap>
              Turn the page → Contact
            </SmallCap>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
