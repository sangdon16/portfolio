"use client";

import { useEffect, useId, useState } from "react";

type Item = { id: string; text: string };

export function OnThisPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState("");
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const root = document.querySelector("[data-case-study]");
    if (!root) return;
    const headings = [...root.querySelectorAll("h2[id]")];
    setItems(
      headings.map((heading) => ({
        id: heading.id,
        text: heading.textContent?.trim() || heading.id,
      })),
    );

    const update = () => {
      const marker = 120;
      let active = headings[0]?.id ?? "";
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= marker) active = heading.id;
      }
      setCurrent(active);
    };
    update();
    setReady(true);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  if (!ready) return <div className="hidden lg:block" />;
  if (items.length === 0) return null;

  function links() {
    return (
      <ul className="grid">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={current === item.id ? "true" : undefined}
              className="flex min-h-11 items-center text-sm leading-snug text-muted aria-[current=true]:font-semibold aria-[current=true]:text-ink"
              onClick={() => setOpen(false)}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <nav className="sticky top-24 hidden self-start lg:block" aria-label="On this page">
        <p className="text-sm font-medium">On this page</p>
        <div className="mt-2">{links()}</div>
      </nav>
      <div className="lg:hidden">
        <button
          type="button"
          className="inline-flex min-h-11 items-center text-sm font-medium"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          On this page
        </button>
        <nav id={menuId} aria-label="On this page" hidden={!open} className="pb-2">
          {links()}
        </nav>
      </div>
    </>
  );
}
