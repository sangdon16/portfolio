import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Get in touch",
  description: site.contact.body,
};

export default function ContactPage() {
  return <ContactSection />;
}
