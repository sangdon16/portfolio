"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { useContact } from "@/components/contact-dialog";
import { site } from "@/content/site";

function NavMark() {
  return (
    <motion.span
      layoutId="nav-mark"
      className="absolute inset-x-1 inset-y-1.5 rounded-full bg-black/[0.06]"
      transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.7 }}
    />
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const rest = site.nav.filter((item) => item.id !== "top");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") {
      setSection(null);
      return;
    }
    const featured = document.getElementById("featured");
    const contact = document.getElementById("contact");
    const update = () => {
      const line = window.innerHeight * 0.42;
      const contactTop = contact?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const featuredTop = featured?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      if (contact && contactTop < line) setSection("contact");
      else if (featured && featuredTop < line) setSection("featured");
      else setSection(null);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
    };
  }, [pathname]);

  function currentId() {
    if (pathname.startsWith("/work")) return "work";
    if (pathname.startsWith("/about")) return "about";
    if (pathname.startsWith("/contact")) return "contact";
    return section ?? "top";
  }

  const current = currentId();
  const openContact = useContact();

  function itemClass(active: boolean) {
    return `relative inline-flex min-h-11 items-center rounded-full px-3 text-sm ${
      active ? "font-semibold text-ink" : "text-ink/75"
    }`;
  }

  return (
    <>
      <div className={`sticky top-0 z-50 border-b border-black/5 lg:hidden ${pathname === "/" ? "bg-white" : "bg-[#f4f4f4]"}`}>
        <div className="flex items-center justify-between px-4">
          <Link href="/" className="inline-flex min-h-11 items-center text-base font-semibold">
            Don
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-sm"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
        <nav id={menuId} aria-label="Pages" hidden={!open} className="border-t border-line px-4 pb-3">
          <ul>
            {rest.map((item) => (
              <li key={item.id}>
                {item.id === "contact" ? (
                  <button
                    type="button"
                    className={`flex min-h-11 items-center text-base ${current === item.id ? "font-semibold" : ""}`}
                    onClick={() => {
                      setOpen(false);
                      openContact();
                    }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={current === item.id ? "page" : undefined}
                    className={`flex min-h-11 items-center text-base ${current === item.id ? "font-semibold" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 hidden justify-center px-4 lg:flex">
        <nav aria-label="Pages" className="pointer-events-auto rounded-full bg-white px-3 py-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
          <ul className="flex items-center">
            {site.nav.map((item, index) => (
              <li key={item.id} className="flex items-center">
                {index > 0 ? (
                  <span aria-hidden="true" className="px-0.5 text-sm text-muted">
                    ·
                  </span>
                ) : null}
                {item.id === "contact" ? (
                  <button type="button" className={itemClass(current === item.id)} onClick={openContact}>
                    {current === item.id ? <NavMark /> : null}
                    <span className="relative">{item.label}</span>
                  </button>
                ) : (
                  <Link href={item.href} aria-current={current === item.id ? "page" : undefined} className={itemClass(current === item.id)}>
                    {current === item.id ? <NavMark /> : null}
                    <span className="relative">{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={`hidden h-24 lg:block ${pathname === "/" ? "bg-white" : ""}`} aria-hidden="true" />
    </>
  );
}
