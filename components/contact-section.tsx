import { site } from "@/content/site";
import { Container } from "@/components/container";
import { GetInTouch } from "@/components/contact-dialog";
import { Reveal } from "@/components/reveal";

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="contact-band bg-ink py-20 text-white sm:py-28">
      <Container>
        <Reveal>
        <h2
          id="contact-heading"
          className="w-full text-[clamp(1.75rem,0.85rem+1.7vw,2.7rem)] font-semibold leading-[1.15] tracking-tight"
        >
          {site.contact.heading}
        </h2>
        <p className="mt-6 w-full text-lg leading-relaxed text-white/75">{site.contact.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <GetInTouch className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-medium text-ink">
            {site.contact.primary}
          </GetInTouch>
          {site.linkedinUrl ? (
            <a
              href={site.linkedinUrl}
              className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-5 text-sm font-medium text-white"
            >
              {site.contact.secondary}
            </a>
          ) : null}
        </div>
        </Reveal>
      </Container>
    </section>
  );
}
