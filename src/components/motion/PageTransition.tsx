"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface TransitionState {
  active: boolean;
  id: string;
  title: string;
  no: string;
}

interface ContextValue {
  triggerTransition: (id: string, no: string, title: string) => void;
  triggerRouteTransition: (route: string, no: string, title: string, id?: string) => void;
}

const Ctx = createContext<ContextValue>({
  triggerTransition: () => {},
  triggerRouteTransition: () => {},
});

const TRANSITION_CUES: Record<string, { label: string; cues: string[]; glow: string }> = {
  pocketplan: {
    label: "Dashboard / Budgets / Forecast",
    cues: ["health score", "cash-flow forecast", "local-first state"],
    glow: "radial-gradient(ellipse 760px 580px at 78% 62%, rgba(200,65,43,0.16), transparent 56%)",
  },
  notes: {
    label: "Notes / Folders / Tasks",
    cues: ["rich text", "smart folders", "local-first"],
    glow: "radial-gradient(ellipse 760px 580px at 82% 42%, rgba(200,65,43,0.15), transparent 58%)",
  },
  "little-lemon": {
    label: "Reservation / Validation / Flow",
    cues: ["typed form", "focus choreography", "AA contrast"],
    glow: "radial-gradient(ellipse 760px 580px at 82% 58%, rgba(217,164,82,0.14), transparent 58%)",
  },
  home: {
    label: "Return / Index / Work",
    cues: ["restore scroll", "selected work", "portfolio frame"],
    glow: "radial-gradient(ellipse 760px 580px at 78% 58%, rgba(200,65,43,0.12), transparent 58%)",
  },
};

export function usePageTransition() {
  return useContext(Ctx);
}

interface Props {
  children: ReactNode;
}

export function PageTransitionProvider({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const prefersReduced = usePrefersReducedMotion();
  const [state, setState] = useState<TransitionState>({
    active: false,
    id: "",
    title: "",
    no: "",
  });
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const pendingRoute = useRef<string>("");
  const originPath = useRef<string>("");

  const triggerRouteTransition = useCallback(
    (route: string, no: string, title: string, id = "") => {
      pendingRoute.current = route;
      originPath.current = pathname;
      if (route.startsWith("/projects/")) {
        try { sessionStorage.setItem("return-scroll", String(window.scrollY)); } catch {}
      }
      if (prefersReduced) {
        router.push(pendingRoute.current);
        return;
      }
      setState({ active: true, id, title, no });
    },
    [pathname, prefersReduced, router]
  );

  const triggerTransition = useCallback(
    (id: string, no: string, title: string) => {
      triggerRouteTransition(`/projects/${id}`, no, title, id);
    },
    [triggerRouteTransition]
  );

  // Phase 1: animate panel in, then push route
  useEffect(() => {
    if (!state.active) return;
    const overlay = overlayRef.current;
    const titleEl = titleRef.current;
    const noEl = noRef.current;
    const line = lineRef.current;
    const cue = cueRef.current;
    const preview = previewRef.current;
    if (!overlay || !titleEl || !noEl || !line) return;

    let pushed = false;
    const pushPendingRoute = () => {
      if (pushed || !pendingRoute.current) return;
      pushed = true;
      router.push(pendingRoute.current);
    };
    const fallbackTimer = window.setTimeout(pushPendingRoute, 1300);

    const tl = gsap.timeline({
      onComplete: () => {
        window.clearTimeout(fallbackTimer);
        pushPendingRoute();
      },
    });

    tl.fromTo(
      overlay,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.56, ease: "power4.inOut" }
    )
    .fromTo(
      line,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.36, ease: "power2.out" },
      "-=0.16"
    )
    .fromTo(
      noEl,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.38, ease: "power2.out" },
      "-=0.20"
    )
    .fromTo(
      titleEl,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.56, ease: "power3.out" },
      "-=0.24"
    );

    if (cue) {
      tl.fromTo(
        cue.children,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.42, stagger: 0.055, ease: "power2.out" },
        "-=0.28"
      );
    }

    if (preview) {
      tl.fromTo(
        preview,
        { opacity: 0, x: 46, scale: 0.975 },
        { opacity: 1, x: 0, scale: 1, duration: 0.58, ease: "power3.out" },
        "-=0.46"
      );
    }

    return () => {
      window.clearTimeout(fallbackTimer);
      tl.kill();
    };
  }, [state.active, router]);

  // Phase 2: once pathname differs from where we started, dissolve the overlay upward
  useEffect(() => {
    if (!state.active) return;
    if (pathname === originPath.current) return;

    const overlay = overlayRef.current;
    if (!overlay) { setState({ active: false, id: "", title: "", no: "" }); return; }

    gsap.to(overlay, {
      yPercent: -100,
      duration: 0.74,
      delay: 0.05,
      ease: "power4.inOut",
      onComplete: () => setState({ active: false, id: "", title: "", no: "" }),
    });
  }, [pathname, state.active]);

  const transitionProject = TRANSITION_CUES[state.id] ?? {
    label: "Case study",
    cues: ["interaction", "engineering", "polish"],
    glow: "radial-gradient(ellipse 800px 600px at 80% 60%, rgba(200,65,43,0.10), transparent 55%)",
  };
  const isReturnHome = state.id === "home";

  return (
    <Ctx.Provider value={{ triggerTransition, triggerRouteTransition }}>
      {children}

      {state.active && (
        <div
          ref={overlayRef}
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9000,
            background: "var(--ink)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "0 var(--gutter)",
            overflow: "hidden",
          }}
        >
          <div className="grain" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: transitionProject.glow,
            }}
          />

          <div className="transition-content" style={{ position: "relative", maxWidth: "var(--max-w)", width: "100%" }}>
            <div>
              <div
                ref={lineRef}
                style={{
                  width: 64,
                  height: 1,
                  background: "var(--accent)",
                  transformOrigin: "left center",
                  marginBottom: 24,
                }}
              />
              <div
                ref={noRef}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: 20,
                }}
              >
                {isReturnHome ? "Return · Index" : `Case Study · No. ${state.no}`}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--text-dim)",
                  marginBottom: 18,
                }}
              >
                {transitionProject.label}
              </div>
              <div
                ref={titleRef}
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(72px, 11vw, 180px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.035em",
                  color: "var(--cream)",
                }}
              >
                {state.title}
                <span style={{ color: "var(--accent)" }}>.</span>
              </div>
              <div
                ref={cueRef}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px 24px",
                  marginTop: 34,
                  color: "var(--text-soft)",
                }}
              >
                {transitionProject.cues.map((cue) => (
                  <span
                    key={cue}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      fontFamily: "var(--font-ui)",
                      fontSize: 11,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "var(--accent)",
                      }}
                    />
                    {cue}
                  </span>
                ))}
              </div>
            </div>

            <div
              ref={previewRef}
              className="transition-preview"
              data-transition-preview={state.id}
              style={{
                border: "1px solid var(--rule)",
                background: "rgba(232,223,211,0.026)",
                boxShadow: "0 28px 90px rgba(0,0,0,0.28)",
                padding: 22,
                minHeight: 330,
                alignSelf: "center",
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
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--text-dim)",
                  }}
                >
                  {isReturnHome ? "Index frame" : "Selected system"}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: "var(--accent)",
                  }}
                >
                  {state.no || "00"}
                </span>
              </div>

              <div style={{ display: "grid", gap: 12, marginTop: 22 }}>
                {transitionProject.cues.map((cue, i) => (
                  <div
                    key={cue}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "34px 1fr",
                      gap: 14,
                      alignItems: "start",
                    }}
                  >
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        border: "1px solid rgba(232,223,211,0.2)",
                        display: "grid",
                        placeItems: "center",
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        color: i === 0 ? "var(--accent)" : "var(--text-soft)",
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span>
                      <span
                        style={{
                          display: "block",
                          fontFamily: "var(--font-ui)",
                          fontSize: 11,
                          letterSpacing: "0.13em",
                          textTransform: "uppercase",
                          color: i === 0 ? "var(--cream)" : "var(--text-soft)",
                          marginTop: 2,
                        }}
                      >
                        {cue}
                      </span>
                      <span
                        style={{
                          display: "block",
                          height: 1,
                          marginTop: 10,
                          background:
                            i === 0
                              ? "var(--accent)"
                              : "rgba(232,223,211,0.2)",
                          transformOrigin: "left center",
                        }}
                      />
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 30,
                  minHeight: 112,
                  border: "1px solid rgba(232,223,211,0.14)",
                  background:
                    "linear-gradient(140deg, rgba(232,223,211,0.055), rgba(20,17,14,0.15))",
                  display: "grid",
                  alignContent: "end",
                  gap: 10,
                  padding: 16,
                }}
              >
                <span
                  style={{
                    width: "62%",
                    height: 5,
                    borderRadius: 999,
                    background: "var(--accent)",
                  }}
                />
                <span
                  style={{
                    width: "86%",
                    height: 1,
                    background: "rgba(232,223,211,0.22)",
                  }}
                />
                <span
                  style={{
                    width: "48%",
                    height: 1,
                    background: "rgba(232,223,211,0.16)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
