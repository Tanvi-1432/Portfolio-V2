"use client";

import SmallCap from "@/components/ui/SmallCap";
import FadeIn from "@/components/ui/FadeIn";
import RevealText from "@/components/ui/RevealText";

interface Props {
  active: boolean;
}

const FOCUS_ITEMS = [
  ["Frontend engineering", "Production React & TypeScript — typed, accessible, and fast on any device."],
  ["Interaction & motion", "Motion systems and micro-interactions, choreographed not sprinkled."],
  ["Product thinking", "Start from the decision someone is making; remove the rest."],
  ["Design systems", "Tokens, components, and timing that keep a product coherent at scale."],
] as const;

export default function About({ active }: Props) {
  return (
    <section
      className="scene-shell"
      id="about"
      data-scene="about"
      data-reveal-state={active ? "in" : "out"}
      aria-label="About"
      style={{
        position: "relative",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, rgba(20,17,14,0.96) 0%, var(--ink) 16%, var(--ink) 86%, rgba(17,14,12,0.98) 100%)",
        color: "var(--cream)",
        padding: "var(--section-pad-lg) var(--gutter) var(--section-pad-md)",
        overflow: "hidden",
      }}
    >
      <div aria-hidden="true" className="grain" />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 900px 700px at 80% 30%, rgba(200,65,43,0.07), transparent 55%)",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "var(--content-w)",
          margin: "0 auto",
        }}
      >
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
            <SmallCap color="var(--accent)">About · 04</SmallCap>
          </FadeIn>
          <FadeIn delay={120}>
            <SmallCap style={{ color: "var(--text-soft)" }}>
              How I build
            </SmallCap>
          </FadeIn>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.92fr 1.08fr",
            gap: 72,
            alignItems: "start",
          }}
        >
          {/* LEFT — interaction layer schematic */}
          <FadeIn delay={80}>
            <figure style={{ margin: 0 }} aria-label="Interaction layer diagram">
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4 / 4.55",
                  background:
                    "linear-gradient(160deg, rgba(232,223,211,0.08), rgba(200,65,43,0.10) 42%, rgba(20,17,14,0.92))",
                  border: "1px solid var(--rule)",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.38)",
                  padding: 24,
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
                  <SmallCap color="var(--accent)">Interaction Layer</SmallCap>
                  <SmallCap>State · Motion · Feel</SmallCap>
                </div>

                <div
                  style={{
                    marginTop: 26,
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: 14,
                  }}
                >
                  {[
                    ["01", "input state",      "empty → focused → resolving → error"],
                    ["02", "state transition",  "content resolves before viewport shifts"],
                    ["03", "feedback timing",   "motion responds before data is visible"],
                    ["04", "reduced motion",    "same hierarchy, no movement"],
                  ].map(([n, label, detail]) => (
                    <div
                      key={n}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "42px 1fr",
                        gap: 18,
                        padding: "15px 0",
                        borderBottom: "1px solid rgba(232,223,211,0.11)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          color: "var(--accent)",
                        }}
                      >
                        {n}
                      </span>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-ui)",
                            fontSize: 11,
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "var(--cream)",
                            marginBottom: 6,
                          }}
                        >
                          {label}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 12,
                            color: "var(--text-soft)",
                          }}
                        >
                          {detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    position: "absolute",
                    left: 24,
                    right: 24,
                    bottom: 24,
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 1,
                    background: "var(--rule)",
                    border: "1px solid var(--rule)",
                  }}
                >
                  {[
                    ["0 CLS", "layout shift"],
                    ["AA", "contrast"],
                    ["✓", "reduced motion"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      style={{
                        background: "var(--surface-overlay)",
                        padding: "15px 12px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 28,
                          lineHeight: 1,
                          color: "var(--cream)",
                        }}
                      >
                        {value}
                      </div>
                      <SmallCap style={{ display: "block", marginTop: 8 }}>
                        {label}
                      </SmallCap>
                    </div>
                  ))}
                </div>

                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse at 70% 20%, rgba(200,65,43,0.24), transparent 48%), radial-gradient(ellipse at center, transparent 48%, rgba(0,0,0,0.58) 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
              <figcaption
                style={{
                  marginTop: 16,
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "var(--text-soft)",
                }}
              >
                The layer I care about most: state, motion, accessibility, and feel.
              </figcaption>
            </figure>
          </FadeIn>

          {/* RIGHT — engineering focus */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(40px, 5.5vw, 88px)",
                lineHeight: 0.94,
                color: "var(--cream)",
                margin: 0,
                letterSpacing: "-0.025em",
              }}
            >
              <RevealText block delay={120}>
                I build the{" "}
                <em style={{ color: "var(--accent)" }}>front</em> of the
              </RevealText>
              <RevealText block delay={220}>
                product — the part people
              </RevealText>
              <RevealText block delay={320} style={{ color: "var(--text-soft)" }}>
                actually touch.
              </RevealText>
            </h2>

            <FadeIn delay={200}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 19,
                  lineHeight: 1.6,
                  color: "var(--text)",
                  margin: "36px 0 22px",
                  maxWidth: 560,
                }}
              >
                I&apos;m a frontend engineer focused on interaction. I care most
                about the layer most teams treat as the finish — the transitions,
                the latency, the empty states — because that&apos;s the layer a
                person actually <em>feels</em>.
              </p>
            </FadeIn>

            <FadeIn delay={280}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontStyle: "italic",
                  fontSize: 19,
                  lineHeight: 1.5,
                  color: "var(--cream)",
                  margin: "0 0 48px",
                  maxWidth: 560,
                }}
              >
                What excites me is making software feel alive — interfaces that
                respond, anticipate, and reward attention.
              </p>
            </FadeIn>

            {/* focus list */}
            <FadeIn delay={340}>
              <div style={{ borderTop: "1px solid var(--rule)" }}>
                {FOCUS_ITEMS.map(([title, desc], i) => (
                  <div
                    key={title}
                    style={{
                      padding: "20px 0",
                      borderBottom: "1px solid var(--rule)",
                      display: "grid",
                      gridTemplateColumns: "30px 1fr",
                      gap: 16,
                      alignItems: "baseline",
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
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontStyle: "italic",
                          fontWeight: 400,
                          fontSize: 22,
                          color: "var(--cream)",
                          marginBottom: 5,
                        }}
                      >
                        {title}
                      </div>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 15,
                          lineHeight: 1.5,
                          color: "var(--text-soft)",
                          margin: 0,
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* facts table */}
            <FadeIn delay={440}>
              <dl
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1fr",
                  rowGap: 14,
                  columnGap: 24,
                  margin: "40px 0 0",
                  paddingTop: 32,
                  borderTop: "1px solid var(--rule)",
                  fontFamily: "var(--font-ui)",
                  fontSize: 13,
                  color: "var(--text)",
                }}
              >
                <dt
                  style={{
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--text-soft)",
                    fontSize: 11,
                  }}
                >
                  Stack
                </dt>
                <dd style={{ margin: 0 }}>
                  React · TypeScript · Next.js · GSAP · Lenis
                </dd>

                <dt
                  style={{
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--text-soft)",
                    fontSize: 11,
                  }}
                >
                  Open to
                </dt>
                <dd style={{ margin: 0 }}>
                  Frontend &amp; product engineering roles, 2026.
                </dd>
              </dl>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
