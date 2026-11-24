import type { ReactNode } from "react";
import { ViewerImage } from "@/components/image-viewer";
import {
  Annotation,
  AnnotationList,
  Aside,
  Compare,
  CompareCard,
  ConceptState,
  ConceptStates,
  DecisionCard,
  DecisionGrid,
  FlowStep,
  Journey,
  MoneyFlow,
  Perspective,
  PerspectiveRow,
  PromptBridge,
  Roadmap,
  RoadmapItem,
  ScreenPair,
  SplitSafeStory,
  Stage,
  StoryClose,
  StoryHero,
  StoryMark,
  StoryProse,
  StorySection,
  StoryShot,
  Takeaway,
  Winner,
} from "@/components/splitsafe-story";
import { Screen, ScreenGallery } from "@/components/screen-gallery";
import { StoryFrame, StoryIndex } from "@/components/story-index";
import {
  CampaignArticle,
  CampaignClose,
  CampaignHeader,
  CampaignSection,
  CampaignStory,
  Constraints,
  Copy,
  ExportSlot,
  Fact,
  Facts,
  HeroPair,
  Mark,
  Marks,
  Note as Lens,
  Paths,
  PhoneRow,
  PhoneShot,
  Shot,
  ShotRow,
  Subhead,
} from "@/components/campaign-story";
import { FrameCarousel, StressCarousel, StressSlide } from "@/components/stress-carousel";
import { NavFrames, NavigationGallery, NavNote } from "@/components/navigation-frames";

function headingId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function Section({
  id,
  title,
  toc,
  children,
}: {
  id?: string;
  title: string;
  toc?: string;
  children: ReactNode;
}) {
  const heading = id ?? headingId(title);
  return (
    <section aria-labelledby={heading} className="mt-14 scroll-mt-28">
      <h2 id={heading} data-toc={toc} className="text-[clamp(1.4rem,1.1rem+1vw,1.85rem)] font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 w-full space-y-4 text-base leading-relaxed text-muted [&_p]:m-0">
        {children}
      </div>
    </section>
  );
}

export function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <div className="mt-10">
      <ViewerImage src={src} alt={alt} caption={caption} />
    </div>
  );
}

export function Decision({
  id,
  title,
  toc,
  children,
}: {
  id: string;
  title: string;
  toc?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mt-16 scroll-mt-28 border-t border-line pt-10">
      <h2 id={id} data-toc={toc} className="text-[clamp(1.4rem,1.1rem+1vw,1.85rem)] font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 w-full space-y-4 leading-relaxed text-muted [&_p]:m-0">{children}</div>
    </section>
  );
}

export function Alternatives({ children }: { children: ReactNode }) {
  return <div className="mt-6 grid items-start gap-8 md:grid-cols-2">{children}</div>;
}

export function Alternative({
  src,
  alt,
  caption,
  children,
}: {
  src: string;
  alt: string;
  caption?: string;
  children?: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <ViewerImage src={src} alt={alt} caption={caption} />
      {children ? <div className="mt-3 w-full text-sm leading-relaxed text-muted [&_p]:m-0">{children}</div> : null}
    </div>
  );
}

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-6 w-full">
      <h3 className="text-base font-semibold tracking-tight text-ink">{title}</h3>
      <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted [&_p]:m-0">{children}</div>
    </div>
  );
}

export function Exploration({
  src,
  alt,
  caption,
  children,
}: {
  src: string;
  alt: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby="exploration" className="mt-14 scroll-mt-28">
      <h2 id="exploration" className="text-[clamp(1.4rem,1.1rem+1vw,1.85rem)] font-semibold tracking-tight">
        Exploration
      </h2>
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.8fr)]">
        <ViewerImage src={src} alt={alt} caption={caption} />
        <div className="grid min-w-0 gap-4">{children}</div>
      </div>
    </section>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl bg-soft px-4 py-3 text-sm leading-relaxed text-ink">{children}</p>
  );
}

export function Comparison({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="comparison" className="mt-14 scroll-mt-28">
      <h2 id="comparison" className="text-[clamp(1.4rem,1.1rem+1vw,1.85rem)] font-semibold tracking-tight">
        Comparison
      </h2>
      <div className="mt-6 grid items-start gap-10 md:grid-cols-2">{children}</div>
    </section>
  );
}

export function Option({
  label,
  src,
  alt,
  children,
}: {
  label: string;
  src: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <ViewerImage src={src} alt={alt} />
      <h3 className="mt-4 text-lg font-semibold tracking-tight">{label}</h3>
      <div className="mt-2 w-full space-y-3 text-sm leading-relaxed text-muted [&_p]:m-0">
        {children}
      </div>
    </div>
  );
}

export function Tradeoffs({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="trade-offs" className="mt-14 scroll-mt-28">
      <h2 id="trade-offs" className="text-[clamp(1.4rem,1.1rem+1vw,1.85rem)] font-semibold tracking-tight">
        Trade-offs
      </h2>
      <div className="mt-6 grid gap-6">{children}</div>
    </section>
  );
}

export function Decisions({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="decisions" className="mt-14 scroll-mt-28">
      <h2 id="decisions" className="text-[clamp(1.4rem,1.1rem+1vw,1.85rem)] font-semibold tracking-tight">
        Decisions
      </h2>
      <div className="mt-6 grid gap-6">{children}</div>
    </section>
  );
}

export function Item({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="min-w-0 border-t border-line pt-4">
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <div className="mt-2 w-full space-y-3 text-sm leading-relaxed text-muted [&_p]:m-0">
        {children}
      </div>
    </article>
  );
}

export function Outcomes({
  title = "Outcomes",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  const id = headingId(title);
  return (
    <section aria-labelledby={id} className="mt-14 scroll-mt-28">
      <h2 id={id} className="text-[clamp(1.4rem,1.1rem+1vw,1.85rem)] font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 w-full space-y-4 leading-relaxed text-muted [&_p]:m-0">
        {children}
      </div>
    </section>
  );
}

export const proseComponents = {
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="w-full text-base leading-relaxed text-muted" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="font-medium text-ink underline decoration-ink/30 underline-offset-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-muted" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-10 scroll-mt-28 text-[clamp(1.4rem,1.1rem+1vw,1.85rem)] font-semibold tracking-tight text-ink"
      {...props}
    />
  ),
};

export const caseStudyComponents = {
  ...proseComponents,
  Section,
  Figure,
  Decision,
  Alternatives,
  Alternative,
  Callout,
  Exploration,
  Note,
  Comparison,
  Option,
  Tradeoffs,
  Decisions,
  Item,
  Outcomes,
  SplitSafeStory,
  StoryHero,
  StorySection,
  StoryShot,
  PerspectiveRow,
  Perspective,
  Journey,
  Stage,
  AnnotationList,
  Annotation,
  Aside,
  MoneyFlow,
  FlowStep,
  ScreenPair,
  Compare,
  CompareCard,
  DecisionGrid,
  DecisionCard,
  PromptBridge,
  Roadmap,
  RoadmapItem,
  Takeaway,
  StoryClose,
  StoryFrame,
  StoryIndex,
  StoryMark,
  StoryProse,
  ConceptState,
  ConceptStates,
  Winner,
  Screen,
  ScreenGallery,
  Lens,
  CampaignStory,
  CampaignArticle,
  CampaignHeader,
  CampaignSection,
  CampaignClose,
  Facts,
  Fact,
  Copy,
  Subhead,
  Constraints,
  HeroPair,
  ShotRow,
  Shot,
  PhoneRow,
  PhoneShot,
  FrameCarousel,
  StressCarousel,
  StressSlide,
  ExportSlot,
  Marks,
  Mark,
  Paths,
  NavFrames,
  NavNote,
  NavigationGallery,
};
