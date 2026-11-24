import type { Metadata } from "next";
import { Container } from "@/components/container";
import { WorkBrowser, type WorkGroupView, type WorkPanel } from "@/components/work-browser";
import { site, workGroups } from "@/content/site";
import { getChildProject, getTopLevelProject } from "@/lib/content";
import { knownText } from "@/lib/text";

export const metadata: Metadata = {
  title: "Work",
  description: site.work.intro,
};

function projectFromPath(path: string) {
  const [parent, child] = path.split("/");
  if (!parent) return undefined;
  return child ? getChildProject(parent, child) : getTopLevelProject(parent);
}

export default function WorkPage() {
  const groups: WorkGroupView[] = [];
  const panels: WorkPanel[] = [];

  for (const group of workGroups) {
    const items: WorkGroupView["items"] = [];
    for (const path of group.items) {
      const project = projectFromPath(path);
      if (!project) continue;
      const id = path.replaceAll("/", "-");
      const rawLabel = knownText(project.label);
      const indexLabel = rawLabel?.includes("·") ? rawLabel.split("·")[0].trim() : (rawLabel ?? project.title);
      items.push({ id, label: indexLabel });
      const role = knownText(project.role);
      const status = knownText(project.status);
      const meta = [role, status].filter(Boolean).join(" · ");
      panels.push({
        id,
        href: project.href,
        label: knownText(project.label) ?? group.label,
        title: project.headline ?? project.title,
        summary: knownText(project.summary),
        image: project.cover,
        imageAlt: project.coverAlt,
        meta: meta || undefined,
      });
    }
    if (items.length > 0) groups.push({ label: group.label, single: items.length === 1, items });
  }

  return (
    <Container className="py-8 sm:py-12">
      <h1 className="w-full text-[clamp(2.2rem,1rem+2.4vw,3.5rem)] font-semibold leading-[1.1] tracking-tight">
        {site.work.heading}
      </h1>
      <p className="mt-5 w-full text-lg leading-relaxed text-muted">{site.work.intro}</p>
      <div className="mt-12">
        <WorkBrowser groups={groups} panels={panels} />
      </div>
    </Container>
  );
}
