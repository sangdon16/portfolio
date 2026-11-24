import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { Children, type ReactNode } from "react";
import { Crown } from "lucide-react";
import { Container } from "@/components/container";
import { ViewerImage } from "@/components/image-viewer";
import { getTopLevelProjects } from "@/lib/content";
import { StoryIcon, type StoryIconName } from "@/components/splitsafe-icons";

const liveHref = "https://thesplitsafe.com/login";

function LiveAppLink({ prominent = false }: { prominent?: boolean }) {
  return (
    <a
      href={liveHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-medium ${
        prominent ? "bg-[#e0a23a] text-[#1a1a1a]" : "bg-ink text-white"
      }`}
    >
      View live app
      <span aria-hidden="true" className="ml-2">
        ↗
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function StoryShot({
  src,
  alt,
  caption,
}: {
  src?: string;
  alt: string;
  caption?: string;
}) {
  if (!src || !src.startsWith("/")) return null;
  const file = path.join(process.cwd(), "public", src);
  if (!fs.existsSync(file)) return null;
  return (
    <div className="story-shot min-w-0">
      <ViewerImage src={src} alt={alt} caption={caption} />
    </div>
  );
}

export function SplitSafeStory({ children }: { children: ReactNode }) {
  return <article className="story-page pb-20 sm:pb-28">{children}</article>;
}

export function StoryHero({
  label,
  title,
  summary,
  badge,
  image,
  alt,
  caption,
}: {
  label: string;
  title: string;
  summary: string;
  badge: string;
  image?: string;
  alt: string;
  caption?: string;
}) {
  return (
    <header className="rise-in pt-10 sm:pt-14">
      <Container>
        <p className="text-sm font-medium text-[#9a6b12]">{label}</p>
        <h1 className="mt-3 w-full text-[clamp(2.2rem,1rem+2.6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">
          {title}
        </h1>
        <p className="mt-5 w-full text-lg leading-relaxed text-muted">{summary}</p>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <LiveAppLink prominent />
          <p className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink">
            <StoryIcon name="achievement" />
            {badge}
          </p>
        </div>
        <p className="mt-3 text-sm text-muted">Opens the SplitSafe sign-in page.</p>
        <div className="mt-10">
          <StoryShot src={image} alt={alt} caption={caption} />
        </div>
      </Container>
    </header>
  );
}

export function StorySection({
  id,
  kicker,
  title,
  toc,
  intro,
  tint = false,
  children,
}: {
  id: string;
  kicker?: string;
  title: string;
  toc?: string;
  intro?: string;
  tint?: boolean;
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`rise-in mt-16 scroll-mt-28 sm:mt-24 ${tint ? "bg-[#f6efe2] py-10 sm:py-14" : ""}`}
    >
      <Container>
        {kicker ? <p className="text-sm font-medium text-[#9a6b12]">{kicker}</p> : null}
        <h2 id={`${id}-title`} data-toc={toc} className={`w-full scroll-mt-28 text-[clamp(1.7rem,1rem+1.4vw,2.5rem)] font-semibold leading-[1.15] tracking-tight ${kicker ? "mt-3" : ""}`}>
          {title}
        </h2>
        {intro ? <p className="mt-5 w-full text-lg leading-relaxed text-muted">{intro}</p> : null}
        {children}
      </Container>
    </section>
  );
}

export function PerspectiveRow({ note, children }: { note: string; children: ReactNode }) {
  return (
    <div className="mt-8">
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
      <p className="mt-4 text-sm text-muted">{note}</p>
    </div>
  );
}

function ClientSketch() {
  return (
    <svg viewBox="8 10 184 120" className="mx-auto h-32 w-full max-w-sm" aria-hidden="true" fill="none" stroke="#161616" strokeWidth="1.5">
      <rect x="16" y="18" width="168" height="104" rx="10" />
      <path d="M16 40h168" />
      <circle cx="30" cy="29" r="2" fill="#161616" stroke="none" />
      <circle cx="40" cy="29" r="2" fill="#161616" stroke="none" />
      <rect x="32" y="56" width="14" height="14" rx="2" />
      <path d="M35 63.5 38 66.5 43 60" />
      <path d="M54 63h70" />
      <rect x="32" y="82" width="14" height="14" rx="2" strokeDasharray="3 2" />
      <path d="M54 89h54" stroke="#9a9a9a" />
    </svg>
  );
}

function FreelancerSketch() {
  return (
    <svg viewBox="8 16 166 112" className="mx-auto h-32 w-full max-w-sm" aria-hidden="true" fill="none" stroke="#161616" strokeWidth="1.5">
      <rect x="16" y="28" width="150" height="88" rx="10" />
      <path d="M32 52h70" />
      <rect x="32" y="68" width="118" height="28" rx="6" strokeDasharray="4 3" />
      <path d="M48 82h28" stroke="#9a9a9a" />
    </svg>
  );
}

export function Perspective({
  sketch,
  role,
  children,
}: {
  sketch: "client" | "freelancer";
  role: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-[1.5rem] bg-white p-6">
      {sketch === "client" ? <ClientSketch /> : <FreelancerSketch />}
      <p className="mt-4 text-sm font-medium text-muted">{role}</p>
      <div className="mt-1 text-xl font-semibold leading-snug tracking-tight [&_p]:m-0">{children}</div>
    </article>
  );
}

export function Journey({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="journey" className="rise-in mt-16 scroll-mt-28 sm:mt-20">
      <Container>
        <h2 id="journey" className="w-full scroll-mt-28 text-[clamp(1.7rem,1rem+1.4vw,2.5rem)] font-semibold leading-[1.15] tracking-tight">
          Four stages
        </h2>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{children}</ol>
      </Container>
    </section>
  );
}

export function Stage({
  n,
  title,
  href,
  active = false,
  children,
}: {
  n: string;
  title: string;
  href?: string;
  active?: boolean;
  children: ReactNode;
}) {
  const body = (
    <>
      <div className="flex items-center justify-between gap-3">
        <p className={`text-sm font-semibold ${active ? "text-ink" : "text-[#9a6b12]"}`}>{n}</p>
        {active ? <Crown className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" /> : null}
      </div>
      <h3 className="mt-2 text-lg font-semibold tracking-tight">{title}</h3>
      <div className={`mt-2 text-sm leading-relaxed [&_p]:m-0 ${active ? "text-ink" : "text-muted"}`}>{children}</div>
    </>
  );
  return (
    <li className={`story-step rounded-[1.4rem] ${active ? "bg-[#FEB64D] text-ink" : "bg-white"}`}>
      {href ? <a href={href} className="block p-5">{body}</a> : <div className="p-5">{body}</div>}
    </li>
  );
}

export function StoryProse({ children }: { children: ReactNode }) {
  return <div className="story-prose mt-6">{children}</div>;
}

export function StoryMark({ children }: { children: ReactNode }) {
  return <p className="mt-10 text-sm font-medium text-[#9a6b12]">{children}</p>;
}

export function AnnotationList({ children }: { children: ReactNode }) {
  return <ol className="mt-6 grid gap-3 md:grid-cols-3">{children}</ol>;
}

export function Annotation({
  n,
  icon,
  title,
  children,
}: {
  n: string;
  icon: StoryIconName;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="rounded-[1.4rem] bg-white p-5">
      <p className="flex items-center gap-2 text-sm font-semibold text-[#9a6b12]">
        <StoryIcon name={icon} />
        {n}
      </p>
      <h3 className="mt-3 text-base font-semibold tracking-tight">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-muted [&_p]:m-0">{children}</div>
    </li>
  );
}

export function Aside({ icon, title, children }: { icon?: StoryIconName; title: string; children?: ReactNode }) {
  return (
    <div className="mt-8 w-full rounded-[1.4rem] bg-[#f6efe2] p-5 sm:p-6">
      <h3 className="flex items-start gap-2 text-lg font-semibold leading-snug tracking-tight">
        {icon ? <StoryIcon name={icon} /> : null}
        {title}
      </h3>
      {children ? <div className="mt-2 text-base leading-relaxed text-muted [&_p]:m-0">{children}</div> : null}
    </div>
  );
}

export function ConceptStates({
  label,
  note,
  children,
}: {
  label: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-8">
      <p className="text-sm font-medium text-[#9a6b12]">{label}</p>
      <ol className="mt-4 grid gap-3 md:grid-cols-3">{children}</ol>
      <p className="mt-4 w-full text-sm leading-relaxed text-muted">{note}</p>
    </div>
  );
}

export function ConceptState({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="rounded-[1.4rem] bg-white p-5">
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-muted [&_p]:m-0">{children}</div>
    </li>
  );
}

export function MoneyFlow({ children }: { children: ReactNode }) {
  return <ol className="mt-8 flex flex-col gap-3 md:flex-row md:items-stretch md:gap-2">{children}</ol>;
}

export function FlowStep({ icon, children }: { icon: StoryIconName; children: ReactNode }) {
  return (
    <li className="flex min-h-11 flex-1 items-center gap-2 rounded-[1.2rem] bg-white px-3 py-3 text-sm leading-snug md:flex-col md:justify-center md:px-3 md:py-4 md:text-center [&_p]:m-0">
      <StoryIcon name={icon} />
      <div>{children}</div>
    </li>
  );
}

export function ScreenPair({ children }: { children: ReactNode }) {
  return <div className="mt-8 grid items-start gap-6 md:grid-cols-2">{children}</div>;
}

export function Compare({ children }: { children: ReactNode }) {
  return <div className="mt-8 grid items-stretch gap-4 md:grid-cols-2">{children}</div>;
}

export function CompareCard({
  label,
  title,
  note,
  children,
}: {
  label: string;
  title: string;
  note: string;
  children?: ReactNode;
}) {
  return (
    <article className="flex flex-col rounded-[1.5rem] bg-white p-6">
      <p className="text-sm text-muted">{label}</p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{note}</p>
      {children ? <div className="mt-4 text-base leading-relaxed">{children}</div> : null}
    </article>
  );
}

export function DecisionGrid({ question, children }: { question: string; children: ReactNode }) {
  return (
    <div className="mt-8 rounded-[1.6rem] bg-white p-5 sm:p-8">
      <h3 className="text-xl font-semibold tracking-tight">{question}</h3>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">{children}</div>
    </div>
  );
}

export function DecisionCard({
  label,
  preferred = false,
  children,
}: {
  label: string;
  preferred?: boolean;
  children: ReactNode;
}) {
  return (
    <article className={`rounded-[1.2rem] p-5 ${preferred ? "bg-[#f8f1e4] ring-1 ring-[#e0a23a]" : "bg-[#f6f6f6]"}`}>
      <h4 className="text-sm font-semibold">{label}</h4>
      <div className="mt-3 text-base leading-relaxed [&_p]:m-0">{children}</div>
    </article>
  );
}

export function PromptBridge({ from, to, children }: { from: string; to: string; children?: ReactNode }) {
  const shots = Children.toArray(children);
  return (
    <div className="mt-8">
      <div className={`${shots.length > 0 ? "hidden md:grid" : "grid"} items-center gap-3 md:grid-cols-[1fr_auto_1fr]`}>
        <p className="rounded-[1.2rem] bg-white px-5 py-4 text-base font-medium">{from}</p>
        <p className="text-center text-sm text-muted" aria-hidden="true">
          →
        </p>
        <p className="rounded-[1.2rem] bg-white px-5 py-4 text-base font-medium">{to}</p>
      </div>
      {shots.length > 0 ? (
        <div className="grid items-start gap-6 md:mt-8 md:grid-cols-2">
          {shots.map((shot, index) => (
            <div key={index}>
              <p className="mb-3 rounded-[1.2rem] bg-white px-5 py-4 text-base font-medium md:hidden">
                {index === 0 ? from : to}
              </p>
              {shot}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

const roadmapSpots = [
  "lg:absolute lg:left-[18%] lg:top-[16%] lg:-translate-x-1/2 lg:-translate-y-1/2",
  "lg:absolute lg:left-[82%] lg:top-[16%] lg:-translate-x-1/2 lg:-translate-y-1/2",
  "lg:absolute lg:left-[18%] lg:top-[84%] lg:-translate-x-1/2 lg:-translate-y-1/2",
  "lg:absolute lg:left-[82%] lg:top-[84%] lg:-translate-x-1/2 lg:-translate-y-1/2",
];

export function Roadmap({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  return (
    <div className="relative mt-10">
      <div className="lg:hidden">
        <p className="relative z-10 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white">
          SplitSafe
        </p>
        <ul className="relative -mt-5 ml-[3.15rem] pt-8">
          {items.map((item, index) => (
            <li key={index} className="relative flex min-h-14 items-center py-1.5 pl-4">
              <span
                aria-hidden="true"
                className={`absolute left-0 w-px bg-ink ${index === items.length - 1 ? "top-0 h-1/2" : "top-0 -bottom-3"}`}
              />
              {index === 0 ? <span aria-hidden="true" className="absolute -top-6 left-0 h-6 w-px bg-ink" /> : null}
              <span aria-hidden="true" className="absolute top-1/2 left-0 w-4 -translate-y-1/2 border-t border-ink" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative hidden lg:block lg:h-[22rem]">
        <p className="absolute top-1/2 left-1/2 z-10 inline-flex min-h-11 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white">
          SplitSafe
        </p>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full text-ink" aria-hidden="true" fill="none">
          <path d="M50 50 L18 16" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
          <path d="M50 50 L82 16" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
          <path d="M50 50 L18 84" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
          <path d="M50 50 L82 84" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        </svg>
        <ul className="relative h-full">
          {items.map((item, index) => (
            <li key={index} className={`absolute flex items-center ${roadmapSpots[index] ?? ""}`}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function RoadmapItem({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex min-h-11 items-center rounded-[1.2rem] bg-white px-4 text-sm font-medium [&_p]:m-0">
      {children}
    </span>
  );
}

export function Winner({ children }: { children: ReactNode }) {
  return (
    <div className="relative mt-8 overflow-hidden rounded-[2rem] border-2 border-[#FEB64D] bg-white px-6 py-10 text-ink sm:px-12 sm:py-14">
      <div className="grid items-center gap-8 md:grid-cols-[auto_minmax(0,1fr)]">
        <img src="/images/splitsafe/trophy.png" alt="" aria-hidden="true" className="mx-auto h-40 w-auto" />
        <div className="winner-copy">{children}</div>
      </div>
    </div>
  );
}

export function Takeaway({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 w-full text-[clamp(1.6rem,1rem+1.2vw,2.2rem)] font-semibold leading-[1.2] tracking-tight [&_p]:m-0">
      {children}
    </div>
  );
}

export function StoryClose() {
  const projects = getTopLevelProjects();
  const index = projects.findIndex((project) => project.slug === "splitsafe");
  const next = index >= 0 ? projects[index + 1] : undefined;

  return (
    <footer className="mt-16 sm:mt-24">
      <Container>
        <div className="flex flex-col items-start gap-3 border-t border-line pt-8">
          <LiveAppLink />
          <p className="text-sm text-muted">Opens the SplitSafe sign-in page.</p>
          <nav aria-label="Case study" className="mt-4 flex flex-col">
            <Link href="/work" className="inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline">
              Work
            </Link>
            {next ? (
              <Link href={next.href} className="inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline">
                Next: {next.title}
              </Link>
            ) : null}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
