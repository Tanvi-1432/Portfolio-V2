"use client";

import { navSections } from "@/data/site";
import SmallCap from "@/components/ui/SmallCap";

interface Props {
  currentScene: string;
  onJump: (id: string) => void;
  openCase?: { id: string; title: string } | null;
  onCloseCase?: () => void;
}

export default function Header({ currentScene, onJump, openCase, onCloseCase }: Props) {
  const inCase = !!openCase;
  const activeSection = navSections.find((s) => s.id === currentScene);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "28px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        zIndex: "var(--z-nav)",
        pointerEvents: "none",
        mixBlendMode: "difference",
      }}
    >
      {/* Left — identity */}
      <div style={{ pointerEvents: "auto", display: "flex", alignItems: "baseline", gap: 14 }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 22,
            lineHeight: 1,
            color: "var(--cream)",
            letterSpacing: "-0.01em",
          }}
        >
          Tanvi
        </span>
        <SmallCap style={{ color: "var(--text-soft)" }}>
          {inCase ? (
            <>Case · {openCase!.title}</>
          ) : (
            <>
              Portfolio &nbsp;·&nbsp;{" "}
              <span style={{ color: "var(--accent)" }}>●</span>{" "}
              {activeSection?.label ?? "Home"}
            </>
          )}
        </SmallCap>
      </div>

      {/* Right — nav or close */}
      {inCase ? (
        <button
          type="button"
          onClick={onCloseCase}
          data-cursor-label="close"
          style={{
            pointerEvents: "auto",
            fontFamily: "var(--font-ui)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--cream)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ color: "var(--accent)", fontSize: 14, lineHeight: 1 }}>×</span>{" "}
          Close
        </button>
      ) : (
        <nav
          aria-label="Site sections"
          style={{ pointerEvents: "auto", display: "flex", gap: 22 }}
        >
          {navSections.map((s) => {
            const active = currentScene === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onJump(s.id)}
                data-cursor-label={s.label.toLowerCase()}
                aria-current={active ? "page" : undefined}
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: active ? "var(--cream)" : "var(--text-soft)",
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  transition: "color var(--dur-hover) ease",
                }}
              >
                <span
                  style={{
                    color: active ? "var(--accent)" : "var(--text-dim)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                  }}
                >
                  {s.idx}
                </span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
