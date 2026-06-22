"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MChrome, MMenu, MScrollProgress } from "@/components/mobile/MobileChrome";
import { usePageTransition } from "@/components/motion/PageTransition";
import { MHero, MApproach, MProjects, MCapabilities, MAbout, MContact } from "@/components/mobile/MobileScenes";
import { mobileNavSections } from "@/data/site";
import { projects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SCENE_ORDER = ["intro", "manifesto", "works", "capabilities", "about", "contact"] as const;
type SceneId = typeof SCENE_ORDER[number];

export default function MobileApp() {
  const { triggerTransition } = usePageTransition();
  const prefersReduced = usePrefersReducedMotion();
  const [currentScene, setCurrentScene] = useState<SceneId>("intro");
  const [activated, setActivated] = useState<Record<string, boolean>>({ intro: true });
  const [menuOpen, setMenuOpen] = useState(false);
  const sceneRefs = useRef<Record<string, HTMLElement | null>>({});

  const setRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      sceneRefs.current[id] = el;
    },
    []
  );

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("return-scroll");
      if (saved !== null) {
        sessionStorage.removeItem("return-scroll");
        const y = parseInt(saved, 10);
        if (y > 0) window.scrollTo({ top: y, behavior: "instant" });
      }
    } catch {}
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = e.target.getAttribute("data-scene") as SceneId;
          if (e.isIntersecting && id) {
            setCurrentScene(id);
            setActivated((a) => (a[id] ? a : { ...a, [id]: true }));
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    const timer = setTimeout(() => {
      SCENE_ORDER.forEach((id) => {
        const el = sceneRefs.current[id];
        if (el) obs.observe(el);
      });
    }, 60);

    return () => { clearTimeout(timer); obs.disconnect(); };
  }, []);

  const scrollToScene = (id: string) => {
    const el = sceneRefs.current[id];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
  };

  const jump = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => scrollToScene(id), menuOpen && !prefersReduced ? 360 : 0);
  };

  const openCase = (id: string) => {
    const p = projects[id];
    if (p) triggerTransition(id, p.no, p.title);
  };

  const currentLabel =
    mobileNavSections.find((s) => s.id === currentScene)?.label ?? "Home";

  return (
    <div
      style={{
        background: "var(--ink)",
        color: "var(--text)",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <MScrollProgress />
      <MChrome
        variant="mobile"
        currentLabel={currentLabel}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        inCase={false}
        onCloseCase={() => {}}
      />
      <MMenu
        variant="mobile"
        open={menuOpen}
        sections={mobileNavSections}
        currentScene={currentScene}
        onJump={jump}
        onClose={() => setMenuOpen(false)}
      />

      <main>
        <div ref={setRef("intro")} data-scene="intro">
          <MHero onJump={jump} />
        </div>
        <div ref={setRef("manifesto")} data-scene="manifesto">
          <MApproach active={activated.manifesto ?? false} />
        </div>
        <div ref={setRef("works")} data-scene="works">
          <MProjects active={activated.works ?? false} onOpen={openCase} />
        </div>
        <div ref={setRef("capabilities")} data-scene="capabilities">
          <MCapabilities active={activated.capabilities ?? false} />
        </div>
        <div ref={setRef("about")} data-scene="about">
          <MAbout active={activated.about ?? false} />
        </div>
        <div ref={setRef("contact")} data-scene="contact">
          <MContact active={activated.contact ?? false} onJump={jump} />
        </div>
      </main>
    </div>
  );
}
