import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-20">
      <h1 className="text-[clamp(2rem,1.2rem+2.4vw,3.2rem)] font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-[46ch] text-muted">That page is not on this site.</p>
      <Link href="/" className="mt-8 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm text-white">
        Back home
      </Link>
    </Container>
  );
}
