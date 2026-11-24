"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const LAG = 72;
const SCALE = 0.06;

export function HeroPortrait({ alt }: { alt: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frameEl = frame.current;
    const mediaEl = media.current;
    if (!frameEl || !mediaEl) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px)");
    let frameId = 0;

    const apply = () => {
      frameId = 0;
      if (reduced.matches || !desktop.matches) {
        mediaEl.style.transform = "";
        return;
      }
      const hero = frameEl.closest("section");
      const range = hero?.offsetHeight || frameEl.offsetHeight || 1;
      const progress = Math.min(1, Math.max(0, window.scrollY / range));
      const y = progress * LAG;
      const scale = 1 + progress * SCALE;
      mediaEl.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
    };

    const request = () => {
      if (!frameId) frameId = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    reduced.addEventListener("change", request);
    desktop.addEventListener("change", request);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      reduced.removeEventListener("change", request);
      desktop.removeEventListener("change", request);
    };
  }, []);

  return (
    <div ref={frame} className="mx-auto w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[26rem] lg:max-w-[36rem]">
      <div ref={media} className="portrait-motion origin-top">
        <Image
          src="/images/portrait.jpg"
          alt={alt}
          width={1280}
          height={1600}
          priority
          sizes="(min-width: 1024px) 640px, (min-width: 768px) 480px, 100vw"
          className="portrait-fade h-auto w-full"
        />
      </div>
    </div>
  );
}
