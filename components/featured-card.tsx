import Link from "next/link";
import { LoopVideo } from "@/components/loop-video";
import type { Project } from "@/lib/types";

type Tone = "blue" | "red" | "neutral";

const panels: Record<Tone, { surface: string; well: string; text: string }> = {
  blue: { surface: "bg-[#0174C3]", well: "bg-[#0174C3]", text: "text-white" },
  red: { surface: "bg-[#CA1334]", well: "bg-[#CA1334]", text: "text-white" },
  neutral: { surface: "bg-white", well: "bg-[#f3f3f3]", text: "text-muted" },
};

function Artwork({ slug, tone }: { slug: string; tone: Tone }) {
  const well = panels[tone].well;
  if (slug === "digicert") {
    return (
      <div className="relative h-44 overflow-hidden bg-white sm:h-full sm:min-h-52">
        <img src="/images/digicert/featured-menu.webp" alt="" className="card-still card-art h-full w-full object-cover" />
        <LoopVideo
          src="/images/digicert/featured-menu.m4v"
          poster="/images/digicert/featured-menu.webp"
          className="card-loop card-art absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }
  if (slug === "ugnai-response") {
    return (
      <div className={`relative h-44 overflow-hidden sm:h-full sm:min-h-52 ${well}`}>
        <img
          src="/images/placeholders/ugnai-officer.svg"
          alt=""
          width={1440}
          height={900}
          className="card-art absolute left-[8%] top-[18%] w-[70%] rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
        />
        <img
          src="/images/placeholders/ugnai-mobile.svg"
          alt="Placeholder. UgnAI officer workspace and citizen reporting screens have not been added yet."
          width={780}
          height={1600}
          className="card-art absolute bottom-0 right-[10%] w-[28%] rounded-t-xl shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
        />
      </div>
    );
  }
  return (
    <div className="relative h-44 overflow-hidden bg-[#FEB64D] sm:h-full sm:min-h-52">
      <img
        src="/images/splitsafe.webp"
        alt="SplitSafe interface screens."
        width={1024}
        height={688}
        className="card-art h-full w-full object-cover"
      />
    </div>
  );
}

export function FeaturedCard({
  project,
  label,
  cta,
  tone,
}: {
  project: Project;
  label: string;
  cta: string;
  tone: Tone;
}) {
  const panel = panels[tone];
  const gold = project.slug === "splitsafe";
  return (
    <article className="rise-in">
      <Link
        href={project.href}
        className={`card-lift grid overflow-hidden rounded-[1.75rem] sm:grid-cols-[minmax(0,1.15fr)_minmax(14rem,0.85fr)] sm:min-h-56 ${gold ? "bg-[#FEB64D] text-ink" : `${panel.surface} ${panel.text}`}`}
      >
        <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
          <p className={`text-sm ${gold ? "text-ink" : panel.text}`}>{label}</p>
          <h3 className="mt-3 w-full text-[clamp(1.5rem,1.1rem+0.8vw,2.15rem)] font-semibold leading-[1.15] tracking-tight">
            {project.headline ?? project.title}
          </h3>
          <p className={`mt-3 w-full text-base leading-relaxed ${gold ? "text-ink" : panel.text}`}>{project.summary}</p>
          <span className="mt-4 inline-flex min-h-11 items-center text-sm font-medium">
            {cta}
            <span className="card-arrow ml-2" aria-hidden="true">
              →
            </span>
          </span>
        </div>
        <Artwork slug={project.slug} tone={tone} />
      </Link>
    </article>
  );
}
