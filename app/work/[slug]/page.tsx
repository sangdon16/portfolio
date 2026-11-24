import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/coming-soon";
import { CaseStudy } from "@/components/case-study";
import { Container } from "@/components/container";
import { ImageViewer } from "@/components/image-viewer";
import { CaseStudyBody, ProseBody } from "@/components/mdx-body";
import { ProjectRow } from "@/components/project-row";
import { Reveal } from "@/components/reveal";
import { WorkChrome } from "@/components/work-chrome";
import {
  getCollectionProjects,
  getTopLevelProject,
  getTopLevelProjects,
} from "@/lib/content";
import { knownText } from "@/lib/text";

type Params = { slug: string };

export function generateStaticParams() {
  return getTopLevelProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getTopLevelProject(slug);
  if (!project) return {};
  return { title: project.title, description: knownText(project.summary) };
}

export default async function WorkSlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getTopLevelProject(slug);
  if (!project) notFound();

  if (project.kind === "collection") {
    const children = getCollectionProjects(project.slug);
    return (
      <article data-work-page className="story-page pb-[max(7rem,calc(100svh-20rem))]">
        <WorkChrome back={{ href: "/work", label: "Work" }}>
          <Container>
            <header className="pt-4 min-[1680px]:pt-14">
              {project.context ? <p className="text-sm text-muted">{project.context}</p> : null}
              <h1 className="mt-2 w-full text-[clamp(1.75rem,0.7rem+1.9vw,2.55rem)] font-semibold leading-[1.08] tracking-tight">
                {project.headline || project.title}
              </h1>
            </header>
            <ProseBody source={project.body} wide />
            {project.role || project.collaborators ? (
              <dl className="mt-10 grid gap-6 border-t border-line pt-8">
                {project.role ? (
                  <div>
                    <dt className="text-sm text-muted">Role</dt>
                    <dd className="mt-1 leading-relaxed">{project.role}</dd>
                  </div>
                ) : null}
                {project.collaborators ? (
                  <div>
                    <dt className="text-sm text-muted">Collaborators</dt>
                    <dd className="mt-1 leading-relaxed">
                      <ul className="flex flex-wrap gap-x-6 gap-y-1">
                        {project.collaborators.map((person) => (
                          <li key={person}>{person}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
            {children.length > 0 ? (
              <div className="mt-16 grid gap-20 sm:mt-24 sm:gap-28">
                {children.map((child, index) => (
                  <Reveal key={child.href}>
                    <ProjectRow project={child} reverse={index % 2 === 1} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <ComingSoon />
            )}
          </Container>
        </WorkChrome>
      </article>
    );
  }

  if (project.layout === "story") {
    return (
      <ImageViewer>
        <CaseStudyBody source={project.body} />
      </ImageViewer>
    );
  }

  return (
    <CaseStudy project={project}>
      <CaseStudyBody source={project.body} />
    </CaseStudy>
  );
}
