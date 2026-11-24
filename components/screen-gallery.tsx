"use client";

import { Children, isValidElement, useId, useState, type CSSProperties, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { Container } from "@/components/container";
import { ViewerImage } from "@/components/image-viewer";

export type ScreenProps = {
  src: string;
  alt: string;
  caption: string;
  phone?: boolean;
};

export function Screen(_props: ScreenProps) {
  return null;
}

function readScreens(children: ReactNode): ScreenProps[] {
  return Children.toArray(children).flatMap((child) => {
    if (!isValidElement<ScreenProps>(child)) return [];
    const { src, alt, caption, phone } = child.props;
    if (!src || !alt) return [];
    return [{ src, alt, caption: caption || alt, phone }];
  });
}

export function ScreenGallery({
  title = "Explore the screens",
  kicker,
  toc = "Screens",
  intro = "A closer look at SplitSafe’s interface, from creating an agreement to managing payments.",
  speed = 80,
  presentation = "default",
  children,
}: {
  title?: string;
  kicker?: string;
  toc?: string;
  intro?: string;
  speed?: number;
  presentation?: "default" | "states";
  children?: ReactNode;
}) {
  const screens = readScreens(children);
  const [paused, setPaused] = useState(false);
  const headingId = useId();
  const viewportId = useId();
  const duration = Number(speed) > 0 ? Number(speed) : 80;

  if (screens.length === 0) return null;

  if (presentation === "states") {
    return (
      <section className="screen-board rise-in mt-16 scroll-mt-28 sm:mt-24" aria-labelledby={headingId}>
        <Container>
          <h2 id={headingId} data-toc={toc} className="w-full scroll-mt-28 text-[clamp(1.7rem,1rem+1.4vw,2.5rem)] font-semibold leading-[1.15] tracking-tight">
            {title}
          </h2>
          <p className="mt-5 w-full text-lg leading-relaxed text-muted">{intro}</p>
        </Container>
        <div className="screen-board-frame">
          {screens.map((screen) => (
            <ViewerImage key={screen.src} src={screen.src} alt={screen.alt} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={`screen-marquee rise-in mt-16 scroll-mt-28 sm:mt-24 ${presentation === "states" ? "screen-marquee-states" : ""}`} aria-labelledby={headingId}>
      <Container>
        {kicker ? <p className="text-sm font-medium text-[#9a6b12]">{kicker}</p> : null}
        <h2 id={headingId} data-toc={toc} className={`w-full scroll-mt-28 text-[clamp(1.7rem,1rem+1.4vw,2.5rem)] font-semibold leading-[1.15] tracking-tight ${kicker ? "mt-3" : ""}`}>
          {title}
        </h2>
        <div className="mt-5 flex items-center justify-between gap-6">
          <p className="min-w-0 text-lg leading-relaxed text-muted">{intro}</p>
          <button
            type="button"
            className="screen-marquee-control inline-flex h-11 w-11 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-ink"
            aria-pressed={paused}
            aria-label={paused ? "Play" : "Pause"}
            aria-controls={viewportId}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? (
              <Play className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Pause className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>
      <div id={viewportId} className="screen-marquee-viewport mt-8">
        <div
          className="screen-marquee-track"
          data-paused={paused ? "true" : "false"}
          style={{ "--screen-marquee-duration": `${duration}s` } as CSSProperties}
        >
          <ul className="screen-marquee-set screen-marquee-copy" aria-hidden="true" inert>
            {screens.map((screen) => (
              <li key={screen.src}>
                <figure className="screen-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={screen.src} alt="" className={screen.phone ? "screen-card-image screen-card-phone" : "screen-card-image"} />
                  <figcaption className="screen-card-caption">{screen.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <ul className="screen-marquee-set">
            {screens.map((screen) => (
              <li key={screen.src}>
                <ViewerImage
                  src={screen.src}
                  alt={screen.alt}
                  caption={screen.caption}
                  frame={screen.phone ? "marquee-phone" : "marquee"}
                  onOpen={() => setPaused(true)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
