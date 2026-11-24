"use client";

import { Children, isValidElement, useId, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { StageFrameContext } from "@/components/image-viewer";

export function StressSlide({
  label,
  columns = 2,
  children,
}: {
  label: string;
  columns?: 2 | 3;
  children: ReactNode;
}) {
  const cols = columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <div>
      <p className="text-sm font-medium">{label}</p>
      <div className={`mt-4 grid items-start gap-4 ${cols}`}>{children}</div>
    </div>
  );
}

export function FrameCarousel({ children, framed = false }: { children: ReactNode; framed?: boolean }) {
  const slides = Children.toArray(children).filter(isValidElement);
  const [index, setIndex] = useState(0);
  const group = useId();
  const count = slides.length;
  const current = Math.min(index, Math.max(count - 1, 0));
  const reduceMotion = useReducedMotion();

  if (count === 0) return null;

  function go(next: number) {
    setIndex(Math.min(count - 1, Math.max(0, next)));
  }

  return (
    <div
      className={framed ? "mt-8 rounded-[1.75rem] bg-[#e2e2e2] px-4 py-5 sm:px-6 sm:py-6" : "mt-8"}
      role="region"
      aria-roledescription="carousel"
      aria-label="Screens"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(current + 1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(current - 1);
        }
      }}
    >
      <StageFrameContext.Provider value={{ group, fixed: framed }}>
        <div className={`relative overflow-hidden ${framed ? "frame-stage" : ""}`} aria-live="polite">
          {slides.map((slide, slideIndex) => {
            const active = slideIndex === current;
            return (
              <motion.div
                key={slideIndex}
                aria-hidden={active ? undefined : true}
                inert={active ? undefined : true}
                initial={false}
                animate={{
                  opacity: active ? 1 : 0,
                  x: reduceMotion || active ? 0 : slideIndex < current ? -48 : 48,
                }}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={
                  active
                    ? framed
                      ? "relative z-10 flex h-full min-h-0 flex-col"
                      : "relative z-10"
                    : "pointer-events-none absolute inset-0 z-0"
                }
              >
                {slide}
              </motion.div>
            );
          })}
        </div>
      </StageFrameContext.Provider>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          className="inline-flex min-h-11 items-center rounded-full bg-soft px-4 text-sm disabled:opacity-40"
          onClick={() => go(current - 1)}
          disabled={current === 0}
        >
          Previous
        </button>
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            type="button"
            className={`inline-flex size-11 items-center justify-center rounded-full text-sm ${slideIndex === current ? "bg-ink text-white" : "bg-soft"}`}
            aria-label={`Screen ${slideIndex + 1} of ${count}`}
            aria-current={slideIndex === current ? "true" : undefined}
            onClick={() => go(slideIndex)}
          >
            {slideIndex + 1}
          </button>
        ))}
        <button
          type="button"
          className="inline-flex min-h-11 items-center rounded-full bg-soft px-4 text-sm disabled:opacity-40"
          onClick={() => go(current + 1)}
          disabled={current === count - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function StressCarousel({ children }: { children: ReactNode }) {
  const slides = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const current = Math.min(index, Math.max(count - 1, 0));

  if (count === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {current + 1} of {count}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm disabled:opacity-40"
            onClick={() => setIndex((value) => Math.max(0, value - 1))}
            disabled={current === 0}
          >
            Previous
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm disabled:opacity-40"
            onClick={() => setIndex((value) => Math.min(count - 1, value + 1))}
            disabled={current === count - 1}
          >
            Next
          </button>
        </div>
      </div>
      <div className="mt-4" aria-live="polite">
        {slides[current]}
      </div>
    </div>
  );
}
