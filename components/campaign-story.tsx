import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { ViewerImage } from "@/components/image-viewer";
import { WorkChrome } from "@/components/work-chrome";
import { getCollectionProjects } from "@/lib/content";

export function CampaignStory({ children }: { children: ReactNode }) {
  return <div className="story-page pb-20 sm:pb-28">{children}</div>;
}

export function CampaignArticle({ children }: { children: ReactNode }) {
  return (
    <WorkChrome back={{ href: "/work/digicert", label: "DigiCert work" }} root="[data-campaign-article]">
      <div data-campaign-article>{children}</div>
    </WorkChrome>
  );
}

export function CampaignHeader({
  label,
  title,
  summary,
  children,
}: {
  label: string;
  title: string;
  summary: string;
  children?: ReactNode;
}) {
  return (
    <header className="pt-4 min-[1680px]:pt-14">
      <Container>
        <p className="text-sm text-muted">{label}</p>
        <h1 className="mt-3 w-full text-[clamp(2rem,1.2rem+2.4vw,3.5rem)] font-semibold leading-[1.08] tracking-tight">
          {title}
        </h1>
        <p className="mt-5 w-full text-lg leading-relaxed text-muted">{summary}</p>
        {children ? <Reveal delay={0.08}>{children}</Reveal> : null}
      </Container>
    </header>
  );
}

export function Facts({ children }: { children: ReactNode }) {
  return <dl className="mt-8 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">{children}</dl>;
}

export function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 leading-relaxed">{children}</dd>
    </div>
  );
}

export function CampaignSection({
  id,
  title,
  toc,
  children,
}: {
  id: string;
  title: string;
  toc: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mt-16 scroll-mt-28 sm:mt-24">
      <Container>
        <h2 id={id} data-toc={toc} className="w-full scroll-mt-28 text-[clamp(1.7rem,1rem+1.4vw,2.5rem)] font-semibold leading-[1.15] tracking-tight">
          {title}
        </h2>
        {children}
      </Container>
    </section>
  );
}

export function Copy({ children }: { children: ReactNode }) {
  return <div className="campaign-copy mt-6">{children}</div>;
}

export function Subhead({ children }: { children: ReactNode }) {
  return <h3 className="mt-14 w-full text-[clamp(1.35rem,1rem+0.7vw,1.75rem)] font-semibold leading-snug tracking-tight">{children}</h3>;
}

function NoteIcon({ kind }: { kind: "question" | "tradeoff" | "decision" | "time" | "action" }) {
  const common = {
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
    className: "mt-0.5 h-5 w-5 shrink-0",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (kind === "question") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.7.3-1.2.9-1.2 1.6" />
        <path d="M12 17h.01" />
      </svg>
    );
  }
  if (kind === "tradeoff") {
    return (
      <svg {...common}>
        <path d="M12 4v16" />
        <path d="M7 7h10" />
        <path d="M5 7 7 13h4L9 7" />
        <path d="M15 7l2 6h-4l2-6" />
      </svg>
    );
  }
  if (kind === "time") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    );
  }
  if (kind === "action") {
    return (
      <svg {...common}>
        <path d="M8 6h11" />
        <path d="M8 12h11" />
        <path d="M8 18h7" />
        <path d="M4 6h.01" />
        <path d="M4 12h.01" />
        <path d="M4 18h.01" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="8" />
      <path d="M8.5 12.2 11 14.6l4.5-5" />
    </svg>
  );
}

export function Note({
  kind,
  title,
  children,
}: {
  kind: "question" | "tradeoff" | "decision" | "time" | "action";
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="campaign-note mt-8 flex w-full gap-3">
      <NoteIcon kind={kind} />
      <div className="min-w-0">
        <h3 className="text-base font-semibold leading-snug tracking-tight">{title}</h3>
        {children ? <div className="mt-2">{children}</div> : null}
      </div>
    </div>
  );
}

export function Constraints({ children }: { children: ReactNode }) {
  return <ul className="campaign-constraints">{children}</ul>;
}

export function HeroPair({ children }: { children: ReactNode }) {
  return <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">{children}</div>;
}

export function ShotRow({
  columns = 2,
  children,
}: {
  columns?: 2 | 3;
  children: ReactNode;
}) {
  const cols = columns === 3 ? "lg:grid-cols-3" : "md:grid-cols-2";
  return <div className={`mt-8 grid items-start gap-6 ${cols}`}>{children}</div>;
}

export function Shot({
  src,
  alt,
  caption,
  group,
  stage,
}: {
  src: string;
  alt: string;
  caption?: string;
  group?: string;
  stage?: boolean;
}) {
  return (
    <div className="min-w-0">
      <ViewerImage src={src} alt={alt} caption={caption} group={group} frame={stage ? "stage" : "default"} />
    </div>
  );
}

export function PhoneShot({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <div className="campaign-phone">
      <ViewerImage src={src} alt={alt} caption={caption} />
    </div>
  );
}

export function PhoneRow({ children }: { children: ReactNode }) {
  return <div className="campaign-phones mt-8">{children}</div>;
}

export function ExportSlot({ title, caption }: { title: string; caption: string }) {
  return (
    <figure className="min-w-0">
      <div className="flex min-h-44 items-center justify-center rounded-2xl border border-dashed border-line bg-white px-5 py-8 text-center">
        <p className="max-w-xs text-sm leading-relaxed text-muted">{title}</p>
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  );
}

export function Marks({ children }: { children: ReactNode }) {
  return <ol className="mt-6 grid gap-3 sm:grid-cols-2">{children}</ol>;
}

export function Mark({ n, children }: { n: string; children: ReactNode }) {
  return (
    <li className="flex gap-3 text-base leading-relaxed">
      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
        {n}
      </span>
      <span>{children}</span>
    </li>
  );
}

export function Paths() {
  return (
    <div className="campaign-flow">
      <p className="campaign-flow-start">Enter business email</p>
      <div className="campaign-flow-lanes">
        <section className="campaign-flow-lane" aria-labelledby="path-direct">
          <h3 id="path-direct">Information sufficient</h3>
          <ol>
            <li>Processing</li>
            <li>Download started</li>
          </ol>
          <span className="campaign-flow-stem" aria-hidden="true" />
        </section>
        <p className="campaign-flow-or">or</p>
        <section className="campaign-flow-lane" aria-labelledby="path-more">
          <h3 id="path-more">Additional information needed</h3>
          <ol>
            <li>Complete additional fields</li>
            <li>Finish download</li>
            <li>Processing</li>
            <li>Download started</li>
          </ol>
          <span className="campaign-flow-stem" aria-hidden="true" />
        </section>
      </div>
      <p className="campaign-flow-end">Open PDF or Download again</p>
    </div>
  );
}

export function CampaignClose({ slug = "balancing-content-and-conversion" }: { slug?: string }) {
  const siblings = getCollectionProjects("digicert");
  const index = siblings.findIndex((item) => item.slug === slug);
  const next = index >= 0 ? siblings[index + 1] : undefined;

  return (
    <footer className="mt-16 sm:mt-24">
      <Container>
        <nav aria-label="Case study" className="flex flex-col border-t border-line pt-6">
          <Link href="/work/digicert" className="inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline">
            DigiCert work
          </Link>
          {next ? (
            <Link href={next.href} className="inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline">
              Next: {next.title}
            </Link>
          ) : null}
        </nav>
      </Container>
    </footer>
  );
}
