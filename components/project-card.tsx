import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="min-w-0">
      <Link href={project.href} className="group block rounded-2xl">
        <div className="overflow-hidden rounded-2xl bg-[#ececec]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.cover}
            alt={project.coverAlt}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        <h3 className="mt-5 text-[clamp(1.05rem,0.95rem+0.4vw,1.3rem)] font-semibold leading-snug tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-muted">{project.summary}</p>
      </Link>
    </article>
  );
}
