"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Container } from "@/components/container";

type Item = { id: string; text: string };

function useStoryHeadings() {
  const [items, setItems] = useState<Item[]>([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const root = document.querySelector(".story-page");
    if (!root) return;
    const headings = [...root.querySelectorAll("h2[id]")];
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
      setCurrent(active);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  return { items, current };
}

function BackToWork({ className = "" }: { className?: string }) {
  return (
    <Link href="/work" className={`group inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline ${className}`}>
      <ArrowLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
      Work
    </Link>
  );
}

function StorySide({ items, current }: { items: Item[]; current: string }) {
  if (items.length === 0) return <div className="story-index" hidden />;

  return (
    <nav aria-label="On this page" className="story-index">
      <div className="story-index-list">
        <BackToWork />
        <div className="story-index-card">
          <p className="text-sm font-medium">On this page</p>
          <div className="mt-3">
            <ol>
              {items.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={current === item.id ? "true" : undefined}
                    className="flex items-start gap-3 py-1.5 text-sm leading-snug text-muted hover:text-ink aria-[current=true]:font-semibold aria-[current=true]:text-ink"
                  >
                    <span className="mt-0.5 shrink-0 text-[#9a6b12]">{String(index + 1).padStart(2, "0")}</span>
                    <span>{item.text}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function StoryFrame({ children }: { children: ReactNode }) {
  const { items, current } = useStoryHeadings();

  return (
    <div className="story-frame">
      <StorySide items={items} current={current} />
      <div className="story-main">{children}</div>
    </div>
  );
}

export function StoryIndex() {
  const { items, current } = useStoryHeadings();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  if (items.length === 0) return null;

  function links(compact: boolean) {
    return (
      <ol>
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={current === item.id ? "true" : undefined}
              className={`flex items-start gap-3 text-sm leading-snug text-muted hover:text-ink aria-[current=true]:font-semibold aria-[current=true]:text-ink ${compact ? "min-h-11 py-3" : "py-1.5"}`}
              onClick={() => {
                if (compact) setOpen(false);
              }}
            >
              <span className="mt-0.5 shrink-0 text-[#9a6b12]">{String(index + 1).padStart(2, "0")}</span>
              <span>{item.text}</span>
            </a>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <>
      <div className="story-index-compact">
        <Container>
          <BackToWork className="mb-2" />
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
            {links(true)}
          </nav>
        </Container>
      </div>
    </>
  );
}
