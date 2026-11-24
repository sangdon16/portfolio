import Link from "next/link";
import { knownText } from "@/lib/text";
import type { Project } from "@/lib/types";

export function ProjectRow({
  project,
  reverse = false,
  kicker,
}: {
  project: Project;
  reverse?: boolean;
  kicker?: string;
}) {
  const label = kicker || knownText(project.label);
  const summary = knownText(project.summary);

  return (
    <article>
      <Link
        href={project.href}
        className="group grid items-center gap-6 rounded-2xl sm:gap-8 lg:grid-cols-2 lg:gap-16"
      >
        <div className={`min-w-0 ${reverse ? "lg:order-2" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.cover}
            alt=""
            className="aspect-[4/3] w-full rounded-2xl bg-[#ececec] object-contain shadow-[0_0_0_rgba(22,22,22,0)] transition duration-300 ease-out group-hover:shadow-[0_18px_40px_rgba(22,22,22,0.14)]"
          />
        </div>
        <div className={`min-w-0 ${reverse ? "lg:order-1" : ""}`}>
          {label ? <p className="text-sm text-muted">{label}</p> : null}
          <h2 id={project.slug} data-toc={label || project.title} className="mt-2 scroll-mt-28 text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-semibold leading-tight tracking-tight">
            {project.title}
          </h2>
          {summary ? <p className="mt-4 max-w-full text-pretty leading-relaxed text-muted">{summary}</p> : null}
          <span className="mt-5 inline-flex min-h-11 items-center text-sm font-medium underline decoration-ink/30 underline-offset-4 transition-colors group-hover:decoration-ink">
            View project
          </span>
        </div>
      </Link>
    </article>
  );
}
