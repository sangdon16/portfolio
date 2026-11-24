import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ContactProvider } from "@/components/contact-dialog";
import { MotionRoot } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: "%s - Don",
  },
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.className} flex min-h-screen flex-col bg-white text-ink antialiased`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionRoot>
          <ContactProvider>
            <SiteHeader />
            <main id="main" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <SiteFooter />
          </ContactProvider>
        </MotionRoot>
      </body>
    </html>
  );
}
