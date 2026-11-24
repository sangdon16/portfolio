import Link from "next/link";
import { GetInTouch } from "@/components/contact-dialog";
import { site } from "@/content/site";
import { Container } from "@/components/container";

export function SiteFooter() {
  return (
    <footer className="footer-surface border-t border-white/15 bg-ink text-white">
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5">
        <Link href="/" className="inline-flex min-h-11 items-center text-sm font-semibold">
          Don
        </Link>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center">
            {site.nav
              .filter((item) => item.id !== "top")
              .map((item) => (
                <li key={item.id}>
                  {item.id === "contact" ? (
                    <GetInTouch className="inline-flex min-h-11 items-center px-3 text-sm text-white/75">{item.label}</GetInTouch>
                  ) : (
                    <Link href={item.href} className="inline-flex min-h-11 items-center px-3 text-sm text-white/75">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
