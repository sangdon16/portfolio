import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { ProseBody } from "@/components/mdx-body";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";
import { readMdx } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "I’m a UX designer at DigiCert, working across marketing web experiences and reusable components.",
};

export default function AboutPage() {
  const { content, data } = readMdx("about.mdx");
  const title = typeof data.title === "string" ? data.title : "About";

  return (
    <Container className="py-8 sm:py-14">
      <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-stretch xl:gap-14">
        <div className="min-w-0">
          <h1 className="w-full text-[clamp(1.75rem,0.85rem+1.7vw,2.7rem)] font-semibold leading-[1.15] tracking-tight">{title}</h1>
          <ProseBody source={content} />
          <ul className="mt-8 flex flex-wrap gap-x-2">
            {site.aboutLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center pr-4 text-sm font-medium underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="w-full max-w-xs xl:h-full xl:min-h-0 xl:w-auto xl:max-w-none" delay={0.12}>
          <div className="relative h-full w-full" style={{ aspectRatio: "659 / 1024" }}>
            <img
              src="/images/about-portrait.webp"
              alt="Portrait of Don wearing a conical hat and sunglasses."
              width={659}
              height={1024}
              className="h-full w-full object-contain object-top xl:absolute xl:inset-0"
            />
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
