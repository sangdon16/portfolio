import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/case-study";
import { ImageViewer } from "@/components/image-viewer";
import { CaseStudyBody } from "@/components/mdx-body";
import { getAllProjects, getChildProject } from "@/lib/content";
import { knownText } from "@/lib/text";

type Params = { slug: string; project: string };

export function generateStaticParams() {
  return getAllProjects()
    .filter((project) => project.parentSlug)
    .map((project) => ({ slug: project.parentSlug as string, project: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug, project: projectSlug } = await params;
  const project = getChildProject(slug, projectSlug);
  if (!project) return {};
  return { title: project.title, description: knownText(project.summary) };
}

export default async function ChildProjectPage({ params }: { params: Promise<Params> }) {
  const { slug, project: projectSlug } = await params;
  const project = getChildProject(slug, projectSlug);
  if (!project || project.kind !== "case-study") notFound();

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
