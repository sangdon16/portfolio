"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";

type ViewerItem = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  group?: string;
};

type ViewerContextValue = {
  register: (item: ViewerItem) => () => void;
  open: (id: string) => void;
};

const ViewerContext = createContext<ViewerContextValue | null>(null);

export const StageFrameContext = createContext<{ group: string; fixed?: boolean } | null>(null);

export function ImageViewer({ children }: { children: ReactNode }) {
  const itemsRef = useRef(new Map<string, ViewerItem>());
  const [order, setOrder] = useState<string[]>([]);
  const orderRef = useRef<string[]>([]);
  const [index, setIndex] = useState(-1);
  const [scope, setScope] = useState<string[]>([]);
  const scopeRef = useRef<string[]>([]);
  orderRef.current = order;
  scopeRef.current = scope;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const captionId = useId();

  const register = useCallback((item: ViewerItem) => {
    itemsRef.current.set(item.id, item);
    setOrder((current) => (current.includes(item.id) ? current : [...current, item.id]));
    return () => {
      itemsRef.current.delete(item.id);
      setOrder((current) => current.filter((id) => id !== item.id));
    };
  }, []);

  const open = useCallback((id: string) => {
    const item = itemsRef.current.get(id);
    const ids = orderRef.current.filter((itemId) => {
      const grouped = itemsRef.current.get(itemId)?.group;
      return item?.group ? grouped === item.group : !grouped;
    });
    const nextIndex = ids.indexOf(id);
    if (nextIndex < 0) return;
    setScope(ids);
    setIndex(nextIndex);
    dialogRef.current?.showModal();
    requestAnimationFrame(() => closeRef.current?.focus());
  }, []);

  const current = index >= 0 ? itemsRef.current.get(scope[index]) : undefined;

  function close() {
    dialogRef.current?.close();
    setIndex(-1);
  }

  function step(direction: -1 | 1) {
    setIndex((currentIndex) => {
      const next = currentIndex + direction;
      if (next < 0 || next >= scopeRef.current.length) return currentIndex;
      return next;
    });
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (event: KeyboardEvent) => {
      if (!dialog.open) return;
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        setIndex((currentIndex) => {
          const next = currentIndex + direction;
          if (next < 0 || next >= scopeRef.current.length) return currentIndex;
          return next;
        });
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(() => ({ register, open }), [register, open]);

  return (
    <ViewerContext.Provider value={value}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={current?.caption ? captionId : undefined}
        className="w-[calc(100vw-2rem)] max-w-5xl rounded-2xl border-0 bg-white p-4 text-ink sm:p-6"
        onClose={() => setIndex(-1)}
      >
        <div className="flex items-center justify-between gap-3">
          <p id={titleId} className="text-sm font-medium">
            Image viewer
          </p>
          <button
            ref={closeRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full bg-ink text-white"
            onClick={close}
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {current ? (
          <figure className="mt-4" aria-live="polite">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.src} alt={current.alt} className="max-h-[70vh] w-full object-contain" />
            {current.caption ? (
              <figcaption id={captionId} className="mt-3 text-sm leading-relaxed text-muted">
                {current.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-full bg-soft px-4 text-sm disabled:opacity-40"
            onClick={() => step(-1)}
            disabled={index <= 0}
          >
            Previous
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 items-center rounded-full bg-soft px-4 text-sm disabled:opacity-40"
            onClick={() => step(1)}
            disabled={index < 0 || index >= scope.length - 1}
          >
            Next
          </button>
        </div>
      </dialog>
    </ViewerContext.Provider>
  );
}

export function ViewerImage({
  src,
  alt,
  caption,
  frame = "default",
  group,
  onOpen,
}: {
  src: string;
  alt: string;
  caption?: string;
  frame?: "default" | "stage" | "marquee" | "marquee-phone";
  group?: string;
  onOpen?: () => void;
}) {
  const context = useContext(ViewerContext);
  const stageFrame = useContext(StageFrameContext);
  const id = useId();
  const resolvedGroup = group ?? stageFrame?.group;

  useEffect(() => {
    if (!context) return;
    return context.register({ id, src, alt, caption, group: resolvedGroup });
  }, [context, id, src, alt, caption, resolvedGroup]);

  const marquee = frame === "marquee" || frame === "marquee-phone";
  const imageClass = frame === "marquee-phone"
    ? "screen-card-image screen-card-phone"
    : marquee
      ? "screen-card-image"
      : "h-auto w-full rounded-2xl bg-[#ececec] object-contain";

  const image = context ? (
    <button
      type="button"
      className={marquee ? "screen-card-hit" : "block w-full rounded-2xl"}
      aria-label={alt}
      aria-haspopup="dialog"
      onClick={() => {
        onOpen?.();
        context.open(id);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className={imageClass} />
    </button>
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={imageClass} />
  );

  return (
    <figure className={marquee ? "screen-card" : "min-w-0"}>
      {image}
      {caption ? (
        <figcaption className={marquee ? "screen-card-caption" : "mt-3 w-full text-sm leading-relaxed text-muted"}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
