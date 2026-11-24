"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Container } from "@/components/container";

type Item = { id: string; text: string };

function usePageHeadings(root: string) {
  const [items, setItems] = useState<Item[]>([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const scope = document.querySelector(root);
    if (!scope) return;
    const headings = [...scope.querySelectorAll("h2[id]")];
    setItems(
      headings.map((heading) => ({
        id: heading.id,
        text: heading.getAttribute("data-toc") || heading.textContent?.trim() || heading.id,
      })),
    );

    const update = () => {
      const marker = 260;
      let active = headings[0]?.id ?? "";
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= marker) active = heading.id;
      }
      const bottomGap = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
      if (bottomGap <= 4) {
        const lastVisible = [...headings].reverse().find((heading) => heading.getBoundingClientRect().top < window.innerHeight);
        if (lastVisible) active = lastVisible.id;
      }
      setCurrent(active);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
    };
  }, [root]);

  return { items, current };
}

function BackLink({ href, label, className = "" }: { href: string; label: string; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline ${className}`}>
      <ArrowLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
      {label}
    </Link>
  );
}

function Links({ items, current, compact, onNavigate }: { items: Item[]; current: string; compact: boolean; onNavigate?: () => void }) {
  return (
    <ol>
      {items.map((item, index) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={current === item.id ? "true" : undefined}
            className={`flex items-start gap-3 text-sm leading-snug text-muted hover:text-ink aria-[current=true]:font-semibold aria-[current=true]:text-ink ${compact ? "min-h-11 py-3" : "py-1.5"}`}
            onClick={onNavigate}
          >
            <span className="mt-0.5 shrink-0 text-[#9a6b12]">{String(index + 1).padStart(2, "0")}</span>
            <span>{item.text}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

export function WorkChrome({
  back,
  root = "[data-work-page]",
  children,
}: {
  back: { href: string; label: string };
  root?: string;
  children: ReactNode;
}) {
  const { items, current } = usePageHeadings(root);
  const [open, setOpen] = useState(false);
  const menuId = useId();

  return (
    <div className="story-frame">
      <div className="story-index">
        <div className="story-index-list">
          <BackLink href={back.href} label={back.label} />
          {items.length > 0 ? (
            <nav aria-label="On this page" className="story-index-card">
              <p className="text-sm font-medium">On this page</p>
              <div className="mt-3">
                <Links items={items} current={current} compact={false} />
              </div>
            </nav>
          ) : null}
        </div>
      </div>
      <div className="story-main">
        <div className="story-index-compact">
          <Container>
            <BackLink href={back.href} label={back.label} className={items.length > 0 ? "mb-2" : ""} />
            {items.length > 0 ? (
              <>
                <button
                  type="button"
                  className="flex min-h-11 w-full items-center justify-between gap-8 rounded-2xl bg-white px-4 text-sm font-medium"
                  aria-expanded={open}
                  aria-controls={menuId}
                  onClick={() => setOpen((value) => !value)}
                >
                  <span>On this page</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                <nav id={menuId} aria-label="On this page" hidden={!open} className="mt-2 max-h-[min(70dvh,32rem)] overflow-auto rounded-2xl bg-white px-4 py-2">
                  <Links items={items} current={current} compact onNavigate={() => setOpen(false)} />
                </nav>
              </>
            ) : null}
          </Container>
        </div>
        {children}
      </div>
    </div>
  );
}
