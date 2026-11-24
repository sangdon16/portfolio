import Link from "next/link";
import type { ReactNode } from "react";
import { ComingSoon } from "@/components/coming-soon";
import { Reveal } from "@/components/reveal";
import { Container } from "@/components/container";
import { ImageViewer, ViewerImage } from "@/components/image-viewer";
import { WorkChrome } from "@/components/work-chrome";
import { getCollectionProjects, getTopLevelProject } from "@/lib/content";
import { knownList, knownText } from "@/lib/text";
import type { Project } from "@/lib/types";

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 text-pretty leading-relaxed">{children}</dd>
    </div>
  );
}

export function CaseStudy({ project, children }: { project: Project; children: ReactNode }) {
  const parent = project.parentSlug ? getTopLevelProject(project.parentSlug) : undefined;
  const siblings = project.parentSlug ? getCollectionProjects(project.parentSlug) : [];
  const index = siblings.findIndex((item) => item.slug === project.slug);
  const next = index >= 0 ? siblings[index + 1] : undefined;
  const back = parent
    ? { href: parent.href, label: parent.slug === "digicert" ? "DigiCert work" : parent.title }
    : { href: "/work", label: "Work" };

  const summary = knownText(project.summary);
  const caption = knownText(project.coverCaption);
  const facts = [
    knownText(project.role) ? { label: "Role", value: knownText(project.role) as string } : null,
    knownText(project.scope) ? { label: "Scope", value: knownText(project.scope) as string } : null,
    knownList(project.collaborators) ? { label: "Collaborators", value: knownList(project.collaborators) as string[] } : null,
    knownText(project.timeframe) ? { label: "Timeframe", value: knownText(project.timeframe) as string } : null,
    knownText(project.status) ? { label: "Status", value: knownText(project.status) as string } : null,
  ].filter((fact): fact is { label: string; value: string | string[] } => fact !== null);

  const pending = project.body.trim().length === 0;

  return (
    <ImageViewer>
      <article data-work-page className="story-page pb-20 sm:pb-28">
        <WorkChrome back={back}>
          <Container>
            <header className="pt-4 min-[1680px]:pt-14">
              {project.context ? <p className="text-sm text-muted">{project.context}</p> : null}
              {project.label ? <p className={`${project.context ? "mt-2" : ""} text-sm text-muted`}>{project.label}</p> : null}
              <h1 className="mt-2 w-full text-[clamp(2rem,1.2rem+2.4vw,3.5rem)] font-semibold leading-[1.08] tracking-tight">
                {project.title}
              </h1>
              {summary ? <p className="mt-5 w-full text-lg leading-relaxed text-muted sm:text-xl">{summary}</p> : null}
            </header>

            {pending ? (
              <Reveal>
                <ComingSoon />
              </Reveal>
            ) : (
              <>
                <Reveal className="mt-8" delay={0.08}>
                  <ViewerImage src={project.cover} alt={project.coverAlt} caption={caption} />
                </Reveal>

                {facts.length > 0 ? (
                  <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
                    {facts.map((fact) => (
                      <Fact key={fact.label} label={fact.label}>
                        {Array.isArray(fact.value) ? (
                          <ul className="space-y-1">
                            {fact.value.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          fact.value
                        )}
                      </Fact>
                    ))}
                  </dl>
                ) : null}

                <div className="mt-16 sm:mt-24 [&>section:first-child]:mt-0 [&>section:first-child]:border-t-0 [&>section:first-child]:pt-0">
                  {children}
                </div>
                <nav className="mt-16 flex flex-col gap-2 border-t border-line pt-6" aria-label="Case study">
                  <Link href={back.href} className="inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline">
                    {back.label}
                  </Link>
                  {next ? (
                    <Link href={next.href} className="inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline">
                      Next: {next.title}
                    </Link>
                  ) : null}
                </nav>
              </>
            )}
          </Container>
        </WorkChrome>
      </article>
    </ImageViewer>
  );
}
