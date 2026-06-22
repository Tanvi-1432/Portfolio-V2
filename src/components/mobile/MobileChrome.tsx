"use client";

import { useEffect, useRef } from "react";
import SmallCap from "@/components/ui/SmallCap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { email } from "@/data/site";

function TriggerMark({ open }: { open: boolean }) {
  const prefersReduced = usePrefersReducedMotion();
  const base = {
    position: "absolute" as const,
    left: 0,
    width: 20,
    height: 1.4,
    background: "var(--cream)",
    borderRadius: 2,
    transition: prefersReduced
      ? "none"
      : "transform var(--dur-medium) var(--ease-menu), top var(--dur-hover) var(--ease-menu)",
  };
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        width: 20,
        height: 12,
      }}
    >
      <span
        style={{
          ...base,
          top: open ? 5.5 : 1,
          transform: open ? "rotate(45deg)" : "none",
        }}
      />
      <span
        style={{
          ...base,
          top: open ? 5.5 : 10,
          transform: open ? "rotate(-45deg)" : "none",
        }}
      />
    </span>
  );
}

export function MScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    let raf: number;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = (doc.scrollHeight - doc.clientHeight) || 1;
        const p = Math.max(0, Math.min(1, (window.scrollY || doc.scrollTop) / max));
        if (ref.current) ref.current.style.transform = `scaleX(${p})`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 130,
        pointerEvents: "none",
      }}
    >
      <div
        ref={ref}
        style={{
          height: "100%",
          width: "100%",
          background: "var(--accent)",
          transform: "scaleX(0)",
          transformOrigin: "left",
          transition: prefersReduced ? "none" : "transform var(--dur-press) linear",
        }}
      />
    </div>
  );
}

interface ChromeProps {
  currentLabel: string;
  menuOpen: boolean;
  setMenuOpen: (fn: (o: boolean) => boolean) => void;
  inCase: boolean;
  onCloseCase: () => void;
  variant?: "mobile" | "tablet";
}

export function MChrome({
  currentLabel,
  menuOpen,
  setMenuOpen,
  inCase,
  onCloseCase,
  variant = "mobile",
}: ChromeProps) {
  const isTablet = variant === "tablet";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 140,
        padding: isTablet ? "24px 40px" : "20px 22px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pointerEvents: "none",
        /* difference blend inverts: #fff reads white on dark, black on light */
        mixBlendMode: menuOpen ? "normal" : "difference",
      }}
    >
      <div
        style={{
          pointerEvents: "auto",
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: isTablet ? 24 : 21,
            lineHeight: 1,
            color: "#fff",
          }}
        >
          Tanvi
        </span>
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: isTablet ? 10 : 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#fff",
            opacity: 0.72,
            whiteSpace: "nowrap",
          }}
        >
          {inCase ? (
            "Case study"
          ) : (
            <>
              <span style={{ color: "var(--accent)" }}>●</span> {currentLabel}
            </>
          )}
        </span>
      </div>

      {inCase ? (
        <button
          type="button"
          onClick={onCloseCase}
          style={{
            pointerEvents: "auto",
            fontFamily: "var(--font-ui)",
            fontSize: isTablet ? 11 : 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 9,
          }}
        >
          <span style={{ color: "var(--accent)", fontSize: 14, lineHeight: 1 }}>
            ×
          </span>{" "}
          Close
        </button>
      ) : (
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            pointerEvents: "auto",
            fontFamily: "var(--font-ui)",
            fontSize: isTablet ? 11 : 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: menuOpen ? "var(--cream)" : "#fff",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <TriggerMark open={menuOpen} />
        </button>
      )}
    </header>
  );
}

interface MenuProps {
  open: boolean;
  sections: { id: string; label: string; idx: string }[];
  currentScene: string;
  onJump: (id: string) => void;
  onClose: () => void;
  variant?: "mobile" | "tablet";
}

export function MMenu({
  open,
  sections,
  currentScene,
  onJump,
  onClose,
  variant = "mobile",
}: MenuProps) {
  const prefersReduced = usePrefersReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const isTablet = variant === "tablet";

  // Lock body scroll and manage inert + initial focus when open
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      nav.removeAttribute("inert");
      // Move focus to first nav button after the transition starts
      const t = setTimeout(() => {
        const first = nav.querySelector<HTMLElement>("button, a");
        first?.focus();
      }, 80);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = prev;
      };
    } else {
      nav.setAttribute("inert", "");
    }
  }, [open]);

  // Escape to close + focus trap
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nav = navRef.current;
      if (!nav) return;
      const focusable = Array.from(
        nav.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.closest("[inert]"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <nav
      ref={navRef}
      aria-label="Site navigation"
      aria-hidden={!open}
      // inert is set via ref so TypeScript doesn't need a custom declaration
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 135,
        background: "var(--ink)",
        color: "var(--cream)",
        transform: open ? "translateY(0)" : "translateY(-101%)",
        transition: prefersReduced
          ? "none"
          : "transform var(--dur-menu) var(--ease-cinema)",
        pointerEvents: open ? "auto" : "none",
        display: "flex",
        flexDirection: "column",
        padding: isTablet ? "104px 40px 40px" : "88px 22px 32px",
        overflowY: "auto",
      }}
    >
      <div aria-hidden="true" className="grain" />

      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          paddingBottom: 14,
          borderBottom: "1px solid var(--rule)",
        }}
      >
        <SmallCap color="var(--accent)">Navigation</SmallCap>
        <SmallCap>2026</SmallCap>
      </div>

      <ol
        style={{
          position: "relative",
          listStyle: "none",
          margin: isTablet ? "4vh 0 0" : "5vh 0 0",
          padding: 0,
          flex: "0 0 auto",
        }}
      >
        {sections.map((s, i) => {
          const activeS = currentScene === s.id;
          return (
            <li key={s.id} style={{ borderBottom: "1px solid var(--rule)" }}>
              <button
                type="button"
                onClick={() => onJump(s.id)}
                style={{
                  width: "100%",
                  padding: "13px 0",
                  display: "flex",
                  alignItems: "baseline",
                  gap: 18,
                  textAlign: "left",
                  transform: open ? "translateY(0)" : "translateY(120%)",
                  opacity: open ? 1 : 0,
                  transition: prefersReduced
                    ? "none"
                    : `transform var(--dur-stagger) var(--ease-reveal) ${120 + i * 70}ms, opacity var(--dur-fade) ease ${120 + i * 70}ms`,
                  color: "inherit",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: activeS ? "var(--accent)" : "var(--text-dim)",
                    letterSpacing: "0.1em",
                    width: 22,
                    flexShrink: 0,
                  }}
                >
                  {s.idx}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                  fontSize: isTablet ? "clamp(46px, 7vw, 68px)" : "clamp(38px, 11vw, 56px)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.02em",
                    color: activeS ? "var(--cream)" : "var(--text-soft)",
                  }}
                >
                  {s.label}
                  {activeS && (
                    <span
                      style={{ color: "var(--accent)", fontStyle: "normal" }}
                    >
                      .
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* contact footer */}
      <div
        style={{
          position: "relative",
          marginTop: "auto",
          paddingTop: 30,
          borderTop: "1px solid var(--rule)",
          transform: open ? "translateY(0)" : "translateY(20px)",
          opacity: open ? 1 : 0,
          transition: prefersReduced
            ? "none"
            : "transform var(--dur-inspect) var(--ease-reveal) 620ms, opacity var(--dur-fade) ease 620ms",
        }}
      >
        <SmallCap color="var(--accent)">Get in touch</SmallCap>
        <a
          href={`mailto:${email}`}
          style={{
            display: "block",
            margin: "12px 0 20px",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: isTablet ? "clamp(30px, 4vw, 40px)" : "clamp(20px, 6vw, 32px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "var(--cream)",
            textDecoration: "none",
          }}
        >
          {email}
        </a>
      </div>
    </nav>
  );
}
