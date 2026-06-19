"use client";

import SmallCap from "@/components/ui/SmallCap";
import FadeIn from "@/components/ui/FadeIn";
import RevealText from "@/components/ui/RevealText";

interface Props {
  active: boolean;
}

export default function About({ active }: Props) {
  return (
    <section
      id="about"
      data-scene="about"
      data-reveal-state={active ? "in" : "out"}
      aria-label="About"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, var(--ink) 0%, #1C1610 120px, #1A1510 100%)",
        color: "var(--cream)",
        padding: "160px var(--gutter) 140px",
        overflow: "hidden",
      }}
    >
      {/* warm grain — same dark-mode grain as rest of site */}
      <div aria-hidden="true" className="grain" />
      {/* ambient glow — ties section to site's accent language */}
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
            marginBottom: 80,
            paddingBottom: 18,
            borderBottom: "1px solid var(--rule)",
          }}
        >
          <FadeIn>
            <SmallCap color="var(--accent)">About · 04</SmallCap>
          </FadeIn>
          <FadeIn delay={120}>
            <SmallCap style={{ color: "var(--text-soft)" }}>
              The engineer
            </SmallCap>
          </FadeIn>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          {/* LEFT — craft/workbench artifact */}
          <FadeIn delay={80}>
            <figure style={{ margin: 0 }} aria-label="Interaction engineering workbench">
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4 / 5",
                  background:
                    "linear-gradient(160deg, rgba(232,223,211,0.08), rgba(200,65,43,0.10) 42%, rgba(20,17,14,0.92))",
                  border: "1px solid var(--rule)",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
                  padding: 28,
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
                  <SmallCap color="var(--accent)">PocketPlan Layer</SmallCap>
                  <SmallCap>State · Motion · UX</SmallCap>
                </div>

                <div
                  style={{
                    marginTop: 34,
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: 14,
                  }}
                >
                  {[
                    ["01", "input state", "empty / focused / resolving / error"],
                    ["02", "screen shift", "balance to forecast in 640ms"],
                    ["03", "data feeling", "cash-flow line resolves before detail"],
                    ["04", "fallback path", "same hierarchy with reduced motion"],
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
                    left: 28,
                    right: 28,
                    bottom: 28,
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 1,
                    background: "var(--rule)",
                    border: "1px solid var(--rule)",
                  }}
                >
                  {[
                    ["3", "states"],
                    ["0 CLS", "frame"],
                    ["AA", "contrast"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      style={{
                        background: "var(--surface-overlay)",
                        padding: "18px 14px",
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
                A product-facing map of the layer I care about most: state, motion, accessibility, and feel.
              </figcaption>
            </figure>
          </FadeIn>

          {/* RIGHT — bio */}
          <div>
            {/* large opener */}
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(56px, 7vw, 120px)",
                lineHeight: 0.88,
                color: "var(--accent)",
                marginBottom: 24,
                letterSpacing: "-0.03em",
              }}
            >
              <RevealText block delay={120}>Building software</RevealText>
              <RevealText block delay={220} style={{ color: "var(--cream)" }}>
                at the seam.
              </RevealText>
            </div>

            <FadeIn delay={180}>
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
                I&apos;m a frontend engineer focused on the craft of interactive
                products — where motion, engineering, and product thinking meet.
              </p>
            </FadeIn>

            <FadeIn delay={260}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 19,
                  lineHeight: 1.6,
                  color: "var(--text)",
                  margin: "0 0 22px",
                  maxWidth: 560,
                }}
              >
                I build in React and TypeScript, with a motion system behind
                every animation and a real component behind every UI. I care about
                the details that don&apos;t show up in a diff: the easing on a
                transition, the 80ms that makes an interface feel{" "}
                <em>cheap</em>, the state you forgot to handle.
              </p>
            </FadeIn>

            <FadeIn delay={340}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 19,
                  lineHeight: 1.6,
                  color: "var(--text)",
                  margin: "0 0 32px",
                  maxWidth: 560,
                }}
              >
                <em>PocketPlan</em> is where this came together: product decisions,
                interface states, motion timing, accessibility, and the engineering
                needed to make the whole thing hold.
              </p>
            </FadeIn>

            {/* facts table */}
            <FadeIn delay={420}>
              <dl
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1fr",
                  rowGap: 14,
                  columnGap: 24,
                  margin: "48px 0 0",
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
                  Now
                </dt>
                <dd style={{ margin: 0 }}>
                  Software Engineering, final year. Building <em>PocketPlan</em>.
                </dd>

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
                  React · TypeScript · Next.js · GSAP · accessibility
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
