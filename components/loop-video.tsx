"use client";

import { useEffect, useRef } from "react";

export function LoopVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const start = () => {
      if (motion.matches) {
        video.pause();
        return;
      }
      video.muted = true;
      video.play().catch(() => {});
    };
    start();
    video.addEventListener("loadeddata", start);
    motion.addEventListener("change", start);
    return () => {
      video.removeEventListener("loadeddata", start);
      motion.removeEventListener("change", start);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
