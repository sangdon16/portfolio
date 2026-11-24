import Link from "next/link";
import { ContactSection } from "@/components/contact-section";
import { Container } from "@/components/container";
import { FeaturedCard } from "@/components/featured-card";
import { HomeHero } from "@/components/home-hero";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";
import { getTopLevelProject } from "@/lib/content";
import { knownText } from "@/lib/text";

export default function HomePage() {
  const cards = site.featured.cards.flatMap((card) => {
    const project = getTopLevelProject(card.slug);
    return project ? [{ ...card, project }] : [];
  });
  const more = site.more.slugs.flatMap((slug) => {
    const project = getTopLevelProject(slug);
    return project ? [project] : [];
  });

  return (
    <>
      <HomeHero />

      <section id="featured" aria-labelledby="featured-heading" className="py-16 sm:py-24">
        <Container>
          <p className="text-sm font-medium">{site.featured.label}</p>
          <h2
            id="featured-heading"
            className="mt-3 w-full text-[clamp(1.75rem,0.85rem+1.7vw,2.7rem)] font-semibold leading-[1.15] tracking-tight"
          >
            {site.featured.heading}
          </h2>
          <p className="mt-5 w-full text-lg leading-relaxed text-muted">{site.featured.intro}</p>
          <div className="mt-12 grid gap-5">
            {cards.map((card) => (
              <FeaturedCard key={card.slug} project={card.project} label={card.label} cta={card.cta} tone={card.tone} />
            ))}
          </div>
        </Container>
      </section>

      <section id="more-work" aria-labelledby="more-heading" className="pb-16 sm:pb-24">
        <Container>
          <h2
            id="more-heading"
            className="w-full text-[clamp(1.75rem,0.85rem+1.7vw,2.7rem)] font-semibold leading-[1.15] tracking-tight"
          >
            {site.more.heading}
          </h2>
          <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-x-6">
            <p className="text-lg leading-relaxed text-muted">{site.more.intro}</p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {more.map((project, index) => {
              const summary = knownText(project.summary);
              return (
                <li key={project.slug}>
                  <Reveal delay={index * 0.06} lift>
                  <Link href={project.href} className="flex min-h-11 items-center gap-4 rounded-[1.4rem] bg-white p-3">
                    <img
                      src={project.cover}
                      alt=""
                      width={1200}
                      height={800}
                      className="h-20 w-28 shrink-0 rounded-2xl object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block text-xl font-semibold tracking-tight">{project.title}</span>
                      {summary ? <span className="mt-1 block text-sm text-muted">{summary}</span> : null}
                    </span>
                  </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center justify-self-start text-sm font-medium underline-offset-4 hover:underline lg:col-start-2 lg:row-start-1 lg:justify-self-end"
            >
              {site.more.cta}
            </Link>
          </div>
        </Container>
      </section>

      <section aria-labelledby="practice-heading" className="py-16 sm:py-24">
        <Container>
          <h2
            id="practice-heading"
            className="w-full text-[clamp(1.75rem,0.85rem+1.7vw,2.7rem)] font-semibold leading-[1.15] tracking-tight"
          >
            {site.practice.heading}
          </h2>
          <p className="mt-4 w-full text-lg leading-relaxed text-muted">{site.practice.intro}</p>
          <div className="mt-10 rounded-[1.75rem] bg-white p-6 sm:p-8 lg:p-10">
            <ol className="grid gap-8 md:grid-cols-3">
              {site.practice.items.map((item, index) => (
                <li key={item.title}>
                  <Reveal delay={index * 0.08}>
                    <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{item.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
