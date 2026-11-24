import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Project, ProjectKind } from "@/lib/types";

const projectsDir = path.join(process.cwd(), "content/projects");

let cache: Project[] | null = null;

function asString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function asStringList(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length > 0 ? items : undefined;
}

function required(file: string, field: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`${file} is missing required frontmatter "${field}".`);
  }
  return value;
}

function loadFile(filePath: string, parentSlug: string | null): Project {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = path.basename(filePath, ".mdx");
  const relative = path.relative(projectsDir, filePath);

  const declaredParent = asString(data.collection);
  if (parentSlug && declaredParent && declaredParent !== parentSlug) {
    throw new Error(
      `${relative}: collection "${declaredParent}" does not match folder "${parentSlug}".`,
    );
  }
  if (!parentSlug && declaredParent) {
    throw new Error(
      `${relative}: move this file into content/projects/${declaredParent}/ or remove "collection".`,
    );
  }

  const kindValue = asString(data.kind);
  if (kindValue !== "collection" && kindValue !== "case-study") {
    throw new Error(`${relative}: kind must be "collection" or "case-study".`);
  }
  const kind: ProjectKind = kindValue;

  if (kind === "collection" && parentSlug) {
    throw new Error(`${relative}: a collection file has to live in content/projects/, not in a subfolder.`);
  }

  const title = required(relative, "title", asString(data.title));
  const summary = required(relative, "summary", asString(data.summary));
  const cover = required(relative, "cover", asString(data.cover));
  const coverAlt = required(relative, "coverAlt", asString(data.coverAlt));
  const href = parentSlug ? `/work/${parentSlug}/${slug}` : `/work/${slug}`;

  return {
    slug,
    parentSlug,
    kind,
    title,
    summary,
    headline: asString(data.headline),
    label: asString(data.label),
    context: asString(data.context),
    client: asString(data.client),
    year: asString(data.year),
    role: asString(data.role),
    scope: asString(data.scope),
    collaborators: asStringList(data.collaborators),
    constraints: asStringList(data.constraints),
    timeframe: asString(data.timeframe),
    status: asString(data.status),
    cover,
    coverAlt,
    coverCaption: asString(data.coverCaption),
    featured: data.featured === true,
    order: typeof data.order === "number" ? data.order : 100,
    placeholder: data.placeholder === true,
    href,
    body: content.trim(),
    filePath: relative,
    layout: asString(data.layout),
  };
}

function walk(dir: string, parentSlug: string | null, found: Project[]) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, entry.name, found);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      found.push(loadFile(full, parentSlug));
    }
  }
}

export function getAllProjects(): Project[] {
  if (process.env.NODE_ENV === "production" && cache) return cache;
  const found: Project[] = [];
  walk(projectsDir, null, found);
  found.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
  cache = found;
  return found;
}

export function getTopLevelProjects() {
  return getAllProjects().filter((project) => project.parentSlug === null);
}

export function getFeaturedProjects() {
  return getTopLevelProjects().filter((project) => project.featured);
}

export function getTopLevelProject(slug: string) {
  return getTopLevelProjects().find((project) => project.slug === slug);
}

export function getCollectionProjects(parentSlug: string) {
  return getAllProjects().filter((project) => project.parentSlug === parentSlug);
}

export function getChildProject(parentSlug: string, slug: string) {
  return getCollectionProjects(parentSlug).find((project) => project.slug === slug);
}

export function readMdx(filePath: string) {
  const absolute = path.join(process.cwd(), "content", filePath);
  const raw = fs.readFileSync(absolute, "utf8");
  return matter(raw);
}
