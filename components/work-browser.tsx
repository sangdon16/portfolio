"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export type WorkPanel = {
  id: string;
  href: string;
  label: string;
  title: string;
  summary?: string;
  image: string;
  imageAlt: string;
  meta?: string;
};

export type WorkGroupView = {
  label: string;
  single: boolean;
  items: { id: string; label: string }[];
};

export function WorkBrowser({ groups, panels }: { groups: WorkGroupView[]; panels: WorkPanel[] }) {
  const [active, setActive] = useState(panels[0]?.id ?? "");
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const nodes = panels
      .map((panel) => document.getElementById(panel.id))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);
    if (nodes.length === 0) return;

    const fromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (nodes.some((node) => node.id === id)) setActive(id);
    };
    fromHash();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id;
        if (id) setActive(id);
      },
      { rootMargin: "-15% 0px -50% 0px", threshold: [0.2, 0.45, 0.7] },
    );
    for (const node of nodes) observer.observe(node);
    window.addEventListener("hashchange", fromHash);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", fromHash);
    };
  }, [panels]);

  function tree(groupsToShow: WorkGroupView[], onNavigate?: () => void, quiet = false) {
    return groupsToShow.map((group, groupIndex) => (
      <div key={group.label} className="contents">
        <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink ${groupIndex > 0 ? "mt-8" : ""}`}>
          {group.label}
        </p>
        <ul className="mt-4 w-full pl-2">
          {group.items.map((item) => {
            const on = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={on ? "true" : undefined}
                  onClick={onNavigate}
                  className={`relative flex w-full min-h-10 items-center rounded-lg px-3 text-sm leading-snug ${
                    on ? "font-medium text-white" : "text-ink/55 hover:text-ink"
                  } ${on && quiet ? "bg-ink" : ""}`}
                >
                  {on && !quiet ? (
                    <motion.span
                      layoutId="work-index"
                      className="absolute inset-0 rounded-lg bg-ink"
                      transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.7 }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    ));
  }

  return (
    <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start lg:gap-12">
      <div className="mb-8 lg:hidden">
        <button
          type="button"
          className="flex min-h-11 w-full items-center justify-between gap-8 rounded-2xl bg-white px-4 text-sm font-medium"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span>Jump to project</span>
          <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        <nav id={menuId} aria-label="Jump to project" hidden={!open} className="mt-2 max-h-[min(70dvh,32rem)] overflow-auto rounded-2xl bg-white px-4 py-4">
          {tree(groups, () => setOpen(false), true)}
        </nav>
      </div>

      <nav aria-label="Projects" className="sticky top-28 hidden self-start py-1 lg:block">
        <div className="inline-grid">{tree(groups)}</div>
      </nav>

      <div className="grid gap-6">
        {panels.map((panel) => (
          <article id={panel.id} key={panel.id} className="work-panel rise-in">
            <Link href={panel.href} className="card-lift block rounded-[2rem] bg-white px-5 py-12 text-center sm:px-12 sm:py-16">
              {panel.label !== panel.title ? <p className="text-sm text-muted">{panel.label}</p> : null}
              <h2 className="mt-3 w-full text-[clamp(1.7rem,1rem+1.4vw,2.5rem)] font-semibold leading-[1.15] tracking-tight">
                {panel.title}
              </h2>
              {panel.summary ? (
                <p className="mt-5 w-full text-base leading-relaxed text-muted sm:text-lg">{panel.summary}</p>
              ) : null}
              <img
                src={panel.image}
                alt={panel.imageAlt}
                width={1440}
                height={900}
                className="card-art mx-auto mt-10 aspect-[16/9] w-full max-w-3xl rounded-[1.4rem] object-cover"
              />
              <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-between gap-3 rounded-[1.4rem] bg-[#f6f6f6] px-4 py-3 text-left">
                {panel.meta ? <p className="text-sm">{panel.meta}</p> : <span />}
                <span className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-white">
                  View project
                  <span className="card-arrow ml-2" aria-hidden="true">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
