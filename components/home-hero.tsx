"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { Container } from "@/components/container";

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || document.documentElement.classList.contains("hero-played")) return;
    const timer = window.setTimeout(() => {
      document.documentElement.classList.add("hero-played");
      try {
        sessionStorage.setItem("don-hero-played", "1");
      } catch {
        // Storage can be unavailable. The class still stops a replay in this tab.
      }
    }, 1600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const portrait = portraitRef.current;
    if (!section || !heading || !portrait) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 767px)");
    let frame = 0;

    const apply = () => {
      frame = 0;
      if (reduce.matches || small.matches) {
        heading.style.transform = "";
        portrait.style.transform = "";
        return;
      }
      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      heading.style.transform = `translate3d(0, ${(-18 * progress).toFixed(2)}px, 0)`;
      portrait.style.transform = `translate3d(0, ${(-42 * progress).toFixed(2)}px, 0) scale(${(1 + 0.05 * progress).toFixed(3)})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduce.addEventListener("change", onScroll);
    small.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduce.removeEventListener("change", onScroll);
      small.removeEventListener("change", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-white pb-2">
      <Container className="pt-8 text-center sm:pt-14">
        <p className="hero-follow text-sm font-medium">{site.hero.eyebrow}</p>
        <div ref={headingRef} className="mt-5">
          <h1 className="text-[clamp(2.7rem,1rem+6.4vw,6.75rem)] font-semibold tracking-tight">
            {site.hero.lines.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.28em]">
                <span className={`block leading-[1.02] ${index === 0 ? "hero-line" : "hero-line hero-line-2"}`}>{line}</span>
              </span>
            ))}
          </h1>
        </div>
        <p className="hero-follow mx-auto mt-6 max-w-[38rem] text-base leading-relaxed text-muted sm:text-lg">
          {site.hero.supporting}
        </p>
        <div className="hero-follow mt-7 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#featured"
            className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-white"
          >
            {site.hero.primary}
          </a>
          <Link
            href="/about"
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-5 text-sm font-medium"
          >
            {site.hero.secondary}
          </Link>
        </div>
        <a href="#featured" className="hero-follow mt-6 inline-flex min-h-11 items-center text-sm text-muted">
          {site.hero.cue}
        </a>
        <div ref={portraitRef} className="portrait-scroll pointer-events-none relative z-0 mx-auto mt-2 w-[min(22rem,70vw)]">
        <div className="hero-portrait-in">
            <img
              src={site.portrait.src}
              alt={site.portrait.alt}
              width={768}
              height={1024}
              className="mx-auto h-auto max-h-[42vh] w-auto object-contain"
              style={{
                objectPosition: site.portrait.objectPosition,
                transform: `scale(${site.portrait.scale})`,
                transformOrigin: "center top",
              }}
            />
        </div>
        </div>
      </Container>
    </section>
  );
}
