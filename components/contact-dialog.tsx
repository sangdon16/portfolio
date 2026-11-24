"use client";

import { motion } from "framer-motion";
import { createContext, useContext, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/content/site";

const ContactContext = createContext<() => void>(() => {});

export function useContact() {
  return useContext(ContactContext);
}

export function GetInTouch({ className, children }: { className?: string; children: ReactNode }) {
  const open = useContact();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ContactContext.Provider value={() => setOpen(true)}>
      {children}
      {open ? <ContactDialog onClose={() => setOpen(false)} /> : null}
    </ContactContext.Provider>
  );
}

function ContactDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const onCloseRef = useRef(onClose);
  const allowBackdrop = useRef(false);
  onCloseRef.current = onClose;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const y = window.scrollY;
    if (!dialog.open) dialog.showModal();
    window.scrollTo(0, y);
    allowBackdrop.current = false;
    const arm = window.setTimeout(() => {
      allowBackdrop.current = true;
    }, 0);
    const onCancel = (event: Event) => {
      event.preventDefault();
      onCloseRef.current();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => {
      window.clearTimeout(arm);
      allowBackdrop.current = false;
      dialog.removeEventListener("cancel", onCancel);
      window.scrollTo(0, y);
    };
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Note from ${name || "your site"}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className="contact-dialog m-auto w-[672px] max-w-[calc(100%-2rem)] rounded-[1.5rem] border-0 bg-white p-0 text-ink shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
      onClick={(event) => {
        if (allowBackdrop.current && event.target === ref.current) onCloseRef.current();
      }}
    >
      <motion.form
        onSubmit={submit}
        className="p-6 sm:p-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-semibold tracking-tight">
            Get in touch
          </h2>
          <button type="button" className="inline-flex min-h-11 items-center text-sm" onClick={onClose}>
            Close
          </button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">Your note opens in email, addressed to Don.</p>
        <label className="mt-6 block text-sm font-medium">
          Name
          <input name="name" required autoComplete="name" className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-3 text-base" />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Email
          <input name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-xl border border-line bg-white px-3 py-3 text-base" />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Message
          <textarea name="message" required rows={5} className="mt-2 w-full resize-y rounded-xl border border-line bg-white px-3 py-3 text-base" />
        </label>
        <button type="submit" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-white">
          Send
        </button>
      </motion.form>
    </dialog>
  );
}
