import type { HTMLAttributes } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { caseStudyComponents, proseComponents } from "@/components/mdx";

const wideProseComponents = {
  ...proseComponents,
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="w-full text-lg leading-relaxed text-muted sm:text-xl" {...props} />
  ),
};

export function CaseStudyBody({ source }: { source: string }) {
  if (!source) return null;
  return <MDXRemote source={source} components={caseStudyComponents} />;
}

export function ProseBody({ source, wide = false }: { source: string; wide?: boolean }) {
  if (!source) return null;
  return (
    <div className="mt-6 grid gap-4">
      <MDXRemote source={source} components={wide ? wideProseComponents : proseComponents} />
    </div>
  );
}
