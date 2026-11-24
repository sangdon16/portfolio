"use client";

import { useEffect, useId, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  caption?: string;
};

export function EnlargeableImage({ src, alt, caption }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dialogRef.current?.close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  function open() {
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  return (
    <figure className="min-w-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-auto w-full rounded-2xl bg-[#ececec] object-contain" />
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={open}
          className="inline-flex min-h-11 items-center rounded-full bg-soft px-4 text-sm"
        >
          Enlarge
        </button>
      </div>
      {caption ? <figcaption className="mt-3 max-w-[68ch] text-sm leading-relaxed text-muted">{caption}</figcaption> : null}

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="w-[calc(100vw-2rem)] max-w-5xl rounded-2xl border-0 bg-white p-4 text-ink sm:p-6"
      >
        <div className="flex items-center justify-between gap-4">
          <p id={titleId} className="text-sm font-medium">
            Enlarged image
          </p>
          <button
            type="button"
            onClick={close}
            className="inline-flex min-h-11 items-center rounded-full bg-soft px-4 text-sm"
            autoFocus
          >
            Close
          </button>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="mt-4 max-h-[75vh] w-full object-contain" />
        {caption ? <p className="mt-3 text-sm leading-relaxed text-muted">{caption}</p> : null}
      </dialog>
    </figure>
  );
}
