import fs from "node:fs";
import path from "node:path";
import { Screen, ScreenGallery } from "@/components/screen-gallery";
import { FrameCarousel } from "@/components/stress-carousel";
import { ViewerImage } from "@/components/image-viewer";
import {
  galleryFrames,
  getNavGroup,
  getNavNote,
  navigationNotes,
  type NavFrame,
  type NavStatus,
} from "@/content/projects/digicert/navigation";

const statusLabel: Record<NavStatus, string> = {
  reference: "Reference material",
  exploration: "Exploration",
  approved: "Approved design",
  candidate: "Current candidate",
};

const layouts = {
  hero: "mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)]",
  pair: "mt-8 grid items-start gap-6 md:grid-cols-2",
  three: "mt-8 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3",
  grid: "mt-8 grid items-start gap-6 md:grid-cols-2",
  phones: "campaign-phones mt-8",
  stack: "mt-8 grid items-start gap-8",
} as const;

function frameCaption(frame: NavFrame) {
  return `${frame.phase}. ${statusLabel[frame.status]}. ${frame.caption}`;
}

function uploadedSrc(frame: NavFrame) {
  const dir = path.join(process.cwd(), "public/images/digicert/navigation");
  for (const ext of [".png", ".jpg", ".jpeg", ".webp"]) {
    const name = `${frame.file}${ext}`;
    if (fs.existsSync(path.join(dir, name))) return `/images/digicert/navigation/${name}`;
  }
  return null;
}

function wrap(value: string, width: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of value.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > width && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function placeholderSrc(frame: NavFrame) {
  const phone = Boolean(frame.phone);
  const width = phone ? 360 : 880;
  const lineWidth = phone ? 26 : 46;
  const blocks = [
    ...wrap(`Upload. ${frame.upload}`, lineWidth),
    "",
    ...wrap(`Why. ${frame.why}`, lineWidth),
    "",
    `${frame.file}.png`,
  ];
  const lineHeight = 28;
  const height = Math.max(phone ? 640 : 520, 160 + blocks.length * lineHeight);
  const body = blocks
    .map((line, index) => {
      const y = 132 + index * lineHeight;
      return `<text x="40" y="${y}" fill="${line ? "#5e5e5e" : "transparent"}" font-size="16" font-family="ui-sans-serif, system-ui, sans-serif">${escapeXml(line)}</text>`;
    })
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#f7f7f7"/><rect x="12" y="12" width="${width - 24}" height="${height - 24}" rx="24" fill="#ffffff" stroke="#d5d5d5" stroke-dasharray="6 6"/><text x="40" y="72" fill="#161616" font-size="13" font-family="ui-sans-serif, system-ui, sans-serif" letter-spacing="1.5">PLACEHOLDER</text><text x="40" y="104" fill="#161616" font-size="18" font-family="ui-sans-serif, system-ui, sans-serif">${escapeXml(frame.phase)}</text>${body}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function FrameView({ frame, plain = false }: { frame: NavFrame; plain?: boolean }) {
  const src = uploadedSrc(frame);
  return (
    <figure className="min-w-0">
      {frame.kicker ? <p className="mb-3 text-sm font-semibold tracking-tight">{frame.kicker}</p> : null}
      {src ? (
        <ViewerImage src={src} alt={frame.alt} />
      ) : (
        <div className={`flex flex-col justify-center rounded-2xl border border-dashed border-[#d5d5d5] bg-white px-5 py-8 sm:px-6 ${frame.phone ? "min-h-[28rem]" : "min-h-64"}`}>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em]">Placeholder</p>
          <p className="mt-4 text-sm leading-relaxed">
            <span className="font-semibold">Upload. </span>
            {frame.upload}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            <span className="font-semibold text-ink">Why. </span>
            {frame.why}
          </p>
          <p className="mt-4 font-mono text-xs text-muted">{frame.file}.png</p>
        </div>
      )}
      <figcaption className="mt-3 text-sm leading-relaxed text-muted">{plain ? frame.caption : frameCaption(frame)}</figcaption>
      {frame.annotations?.length ? (
        <ul className="mt-3 space-y-1 text-sm leading-snug">
          {frame.annotations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </figure>
  );
}

export function NavFrames({ group }: { group: string }) {
  const spec = getNavGroup(group);
  if (!spec) return null;
  if (spec.layout === "carousel") {
    return (
      <FrameCarousel>
        {spec.frames.map((frame) => (
          <FrameView key={frame.id} frame={frame} plain />
        ))}
      </FrameCarousel>
    );
  }
  if (spec.layout === "compare") {
    if (!spec.clusters) return null;
    return (
      <div className="mt-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-6">
          {spec.clusters.map((cluster, index) => (
            <div
              key={cluster.heading}
              className={`min-w-0 ${cluster.frames.length > 1 ? "lg:flex-[2]" : "lg:flex-1"} ${index > 0 ? "border-t border-line pt-8 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0" : ""}`}
            >
              <h3 className="text-sm font-semibold tracking-tight">{cluster.heading}</h3>
              <div className={`mt-4 grid items-start gap-6 ${cluster.frames.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {cluster.frames.map((frame) => (
                  <FrameView key={frame.id} frame={frame} plain />
                ))}
              </div>
            </div>
          ))}
        </div>
        {spec.caption ? <p className="mt-4 text-sm leading-relaxed text-muted">{spec.caption}</p> : null}
      </div>
    );
  }
  return (
    <div>
      <div className={layouts[spec.layout]}>
        {spec.frames.map((frame) => (
          <div key={frame.id} className={spec.layout === "phones" ? "campaign-phone" : "min-w-0"}>
            <FrameView frame={frame} plain={Boolean(frame.kicker) || spec.plain} />
          </div>
        ))}
      </div>
      {spec.caption ? <p className="mt-4 text-sm leading-relaxed text-muted">{spec.caption}</p> : null}
    </div>
  );
}

export function NavNote({ id }: { id: keyof typeof navigationNotes }) {
  const note = getNavNote(id);
  return (
    <div className="mt-8 border-t border-line pt-6">
      <p className="text-sm font-semibold">{note.title}</p>
      <p className="mt-2 text-lg leading-relaxed text-muted">{note.body}</p>
    </div>
  );
}

export function NavigationGallery() {
  const screens = galleryFrames().map((frame) => ({
    id: frame.id,
    src: uploadedSrc(frame) ?? placeholderSrc(frame),
    alt: frame.alt,
    caption: frameCaption(frame),
    phone: frame.phone,
  }));

  return (
    <ScreenGallery
      title="Explore the designs"
      intro="From the legacy navigation to layout rules, platform hierarchy, and the latest promotional explorations."
      speed={110}
    >
      {screens.map((screen) => (
        <Screen key={screen.id} src={screen.src} alt={screen.alt} caption={screen.caption} phone={screen.phone} />
      ))}
    </ScreenGallery>
  );
}
