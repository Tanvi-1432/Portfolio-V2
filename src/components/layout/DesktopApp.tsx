"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/layout/Header";
import FootBand from "@/components/layout/FootBand";
import { usePageTransition } from "@/components/motion/PageTransition";
import Hero from "@/components/sections/Hero";
import Approach from "@/components/sections/Approach";
import Works from "@/components/sections/Works";
import Capabilities from "@/components/sections/Capabilities";
import About from "@/components/sections/About";
import IndexTable from "@/components/sections/IndexTable";
import Contact from "@/components/sections/Contact";
import { projects } from "@/data/projects";

const SCENE_ORDER = ["intro", "manifesto", "works", "capabilities", "about", "index", "contact"] as const;
type SceneId = typeof SCENE_ORDER[number];

export default function DesktopApp() {
  const { triggerTransition } = usePageTransition();
  const [currentScene, setCurrentScene] = useState<SceneId>("intro");
  const [activated, setActivated] = useState<Record<string, boolean>>({ intro: true });
  const sceneRefs = useRef<Record<string, HTMLElement | null>>({});

  // Callback refs — writing to ref.current inside a callback ref is correct
  const setRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      sceneRefs.current[id] = el;
    },
    []
  );

  // Restore scroll position when returning from a case study
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
    const opts = { rootMargin: "-35% 0px -35% 0px", threshold: 0 };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const id = e.target.getAttribute("data-scene") as SceneId;
        if (e.isIntersecting && id) {
          setCurrentScene(id);
          setActivated((a) => (a[id] ? a : { ...a, [id]: true }));
        }
      });
    }, opts);

    const timer = setTimeout(() => {
      SCENE_ORDER.forEach((id) => {
        const el = sceneRefs.current[id];
        if (el) obs.observe(el);
      });
    }, 60);

    return () => { clearTimeout(timer); obs.disconnect(); };
  }, []);

  const jump = (id: string) => {
    const el = sceneRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openCase = (id: string) => {
    const p = projects[id];
    if (p) {
      triggerTransition(id, p.no, p.title);
    }
  };

  return (
      <div style={{ background: "var(--ink)", color: "var(--text)", minHeight: "100vh" }}>
      <Header currentScene={currentScene} onJump={jump} />
      <FootBand currentScene={currentScene} />

      <main>
        <div ref={setRef("intro")} data-scene="intro">
          <Hero onJump={jump} />
        </div>
        <div ref={setRef("manifesto")} data-scene="manifesto">
          <Approach active={activated.manifesto ?? false} />
        </div>
        <div ref={setRef("works")} data-scene="works">
          <Works active={activated.works ?? false} onOpen={openCase} />
        </div>
        <div ref={setRef("capabilities")} data-scene="capabilities">
          <Capabilities active={activated.capabilities ?? false} />
        </div>
        <div ref={setRef("about")} data-scene="about">
          <About active={activated.about ?? false} />
        </div>
        <div ref={setRef("index")} data-scene="index">
          <IndexTable active={activated.index ?? false} onJump={jump} onOpen={openCase} />
        </div>
        <div ref={setRef("contact")} data-scene="contact">
          <Contact active={activated.contact ?? false} onJump={jump} />
        </div>
      </main>
    </div>
  );
}
