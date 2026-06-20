"use client";

import SmallCap from "@/components/ui/SmallCap";
import FadeIn from "@/components/ui/FadeIn";
import MagneticButton from "@/components/ui/MagneticButton";
import { email, socials } from "@/data/site";

interface Props {
  active: boolean;
  onJump: (id: string) => void;
}

export default function Contact({ active, onJump }: Props) {
  return (
    <section
      id="contact"
      data-scene="contact"
      data-reveal-state={active ? "in" : "out"}
      aria-label="Contact"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--ink)",
        color: "var(--cream)",
        padding: "var(--section-pad-lg) var(--gutter) var(--section-pad-xl)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* warm halo */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 900px 700px at 110% 110%, rgba(200,65,43,0.18), transparent 60%)",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "var(--content-w)",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* kicker */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 120,
          }}
        >
          <FadeIn>
            <SmallCap color="var(--accent)">Contact · 06</SmallCap>
          </FadeIn>
          <FadeIn delay={120}>
            <SmallCap>Open to roles · 2026</SmallCap>
          </FadeIn>
        </div>

        {/* intro */}
        <FadeIn delay={160}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: 22,
              lineHeight: 1.4,
              color: "var(--text-soft)",
              maxWidth: 540,
              margin: "0 0 56px",
            }}
          >
            Available for frontend engineering roles in 2026. Let&apos;s talk.
          </p>
        </FadeIn>

        {/* oversized email */}
        <FadeIn delay={220}>
          <MagneticButton
            as="a"
            strength={0.18}
            href={`mailto:${email}`}
            data-cursor-label="write"
            aria-label={`Send email to ${email}`}
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "clamp(36px, 7vw, 120px)",
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              color: "var(--cream)",
              textDecoration: "none",
              display: "inline-block",
              position: "relative",
            }}
          >
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ position: "relative", zIndex: 1 }}>{email}</span>
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: "0.08em",
                  height: "0.04em",
                  background: "var(--accent)",
                  transformOrigin: "left",
                }}
              />
            </span>
          </MagneticButton>
        </FadeIn>

        {/* socials */}
        <FadeIn delay={300}>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "88px 0 0",
              display: "flex",
              flexWrap: "wrap",
              gap: 40,
              borderTop: "1px solid var(--rule)",
              paddingTop: 28,
            }}
          >
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="open"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    textDecoration: "none",
                    color: "var(--cream)",
                  }}
                >
                  <SmallCap>{s.label}</SmallCap>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontSize: 32,
                      color: "var(--cream)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.handle}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--text-dim)",
                    }}
                  >
                    Open
                    <span
                      style={{
                        width: 34,
                        height: 1,
                        background: "var(--accent)",
                        transform: "translateY(1px)",
                      }}
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>

      {/* colophon */}
      <div
        style={{
          position: "relative",
          maxWidth: "var(--content-w)",
          margin: "120px auto 0",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr",
          gap: 40,
          paddingTop: 28,
          borderTop: "1px solid var(--rule)",
          color: "var(--text-soft)",
        }}
      >
        <FadeIn delay={240}>
          <div>
            <SmallCap>Colophon</SmallCap>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: 1.6,
                margin: "12px 0 0",
                color: "var(--text-soft)",
              }}
            >
              Set in Instrument Serif &amp; Newsreader. Built with Next.js, deployed on Vercel.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={300}>
          <div>
            <SmallCap>Stack</SmallCap>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: 1.6,
                margin: "12px 0 0",
                color: "var(--text-soft)",
              }}
            >
              Next.js 16 · TypeScript · CSS custom properties · GSAP · Lenis
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={360}>
          <div style={{ textAlign: "right" }}>
            <button
              type="button"
              onClick={() => onJump("intro")}
              data-cursor-label="top"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--cream)",
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ color: "var(--accent)" }}>↑</span> Back to top
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
