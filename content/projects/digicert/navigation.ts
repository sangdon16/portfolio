export type NavStatus = "reference" | "exploration" | "approved" | "candidate" | "selected";

export type NavFrame = {
  id: string;
  file: string;
  alt: string;
  caption: string;
  phase: string;
  status: NavStatus;
  upload: string;
  why: string;
  phone?: boolean;
  kicker?: string;
  annotations?: string[];
  gallery?: boolean;
  galleryOrder?: number;
  galleryCaption?: string;
};

export type NavCluster = {
  heading: string;
  frames: string[];
};

export type NavGroup = {
  id: string;
  layout: "hero" | "pair" | "three" | "grid" | "phones" | "stack" | "carousel" | "compare";
  frames: string[];
  clusters?: NavCluster[];
  caption?: string;
  plain?: boolean;
  kicker?: string;
};

export const navigationNotes = {
  "hit-area": {
    title: "Implementation note",
    body: "Confirm the intended hit area for the descriptive heading. The approved treatment is a heading with an up-right arrow. That cue means the heading leads to another page. It does not establish whether the heading alone or a larger region receives the click, and it does not establish the hover or focus behavior. The arrow is also not evidence of a new browser tab or of leaving the DigiCert website.",
  },
} as const;

export const navigationFrames: NavFrame[] = [
  {
    id: "legacy-promo",
    file: "01-legacy-navigation",
    alt: "DigiCert Platform menu. Product links sit in a white column beside a blue promotional area for managing PKI risk and a software supply chain guide.",
    caption: "Legacy panel with promotional material beside the links.",
    phase: "Legacy reference",
    status: "reference",
    upload: "One archived legacy panel showing the side promotional area.",
    why: "The starting point was a large menu with prominent promotion next to the links.",
    gallery: true,
    galleryOrder: 10,
  },
  {
    id: "legacy-columns",
    file: "01-legacy-navigation-columns",
    alt: "DigiCert Solutions menu. Links sit on a dark blue column beside a different blue promotional treatment for certificate lifecycle management.",
    caption: "Another legacy panel, with a different column treatment.",
    phase: "Legacy reference",
    status: "reference",
    upload: "A second archived legacy panel showing a different column or background treatment.",
    why: "Legacy panels did not all share one layout. This frame keeps that difference visible.",
    gallery: true,
    galleryOrder: 20,
  },
  {
    id: "align-one",
    file: "03-heading-alignment-cases",
    alt: "Navigation panel with a heading on one column. The other columns have no heading.",
    caption: "One column heading, with the other columns unheaded.",
    phase: "Phase one",
    status: "exploration",
    upload: "A panel with one headed column and the other columns unheaded. Include Figma alignment annotations if they exist.",
    why: "Tests alignment when a heading is optional rather than required in every column.",
    gallery: true,
    galleryOrder: 40,
  },
  {
    id: "align-none",
    file: "03-heading-alignment-cases-none",
    alt: "Navigation panel with no column headings.",
    caption: "No column headings.",
    phase: "Phase one",
    status: "exploration",
    upload: "A panel with no column headings. Include Figma alignment annotations if they exist.",
    why: "Checks whether the links still align when the heading row is absent.",
    gallery: true,
    galleryOrder: 50,
  },
  {
    id: "align-outer",
    file: "03-heading-alignment-cases-outer",
    alt: "Navigation panel with headings on the outer columns and no heading in the center column.",
    caption: "Headed outer columns, with an unheaded center.",
    phase: "Phase one",
    status: "exploration",
    upload: "A panel with headed outer columns and an unheaded center column. Include Figma alignment annotations if they exist.",
    why: "Checks the gap that appears when the center column has no heading.",
    gallery: true,
    galleryOrder: 60,
  },
  {
    id: "align-center",
    file: "03-heading-alignment-cases-center",
    alt: "Navigation panel with a heading only in the center column.",
    caption: "A heading only in the center column.",
    phase: "Phase one",
    status: "exploration",
    upload: "A panel with a heading only in the center column.",
    why: "Checks alignment when only the middle column has a heading.",
    gallery: true,
    galleryOrder: 55,
  },
  {
    id: "align-later",
    file: "03-heading-alignment-cases-later",
    alt: "Navigation panel with no heading on the first column and headings on the second and third columns.",
    caption: "No heading on the first column. Headings on the second and third.",
    phase: "Phase one",
    status: "exploration",
    upload: "A panel with the first column unheaded and the second and third columns headed.",
    why: "Checks alignment when the heading row starts after the first column.",
    gallery: true,
    galleryOrder: 58,
  },
  {
    id: "mobile-board",
    file: "04-mobile-board",
    alt: "A row of DigiCert mobile navigation screens, from the top-level menu through opened sections.",
    caption: "Mobile navigation across the main sections.",
    phase: "Mobile exploration",
    status: "exploration",
    upload: "The mobile navigation board.",
    why: "Shows how the menu sections read on a small screen.",
    gallery: true,
    galleryOrder: 160,
  },
  {
    id: "approved-overview",
    file: "02-initial-redesign",
    alt: "Redesigned platform panel with Platform overview, Enterprise trust, and Integrations, and no large promotional area.",
    caption: "Approved redesigned panel.",
    phase: "Phase one",
    status: "approved",
    upload: "The approved initial navigation overview. Individual panels can live in this image so they can be enlarged.",
    why: "Records the approved phase-one foundation before the later hierarchy and layout work.",
    kicker: "Phase one — Approved redesign.",
    gallery: true,
    galleryOrder: 30,
  },
  {
    id: "platform-desktop",
    file: "05-platform-umbrella-desktop",
    alt: "Explore DigiCert ONE Platform, with product destinations in two columns and an integrations row underneath.",
    caption: "Desktop version.",
    phase: "Phase two",
    status: "exploration",
    upload: "The desktop platform umbrella.",
    why: "Shows the parent destination, the product items beneath it, and integrations grouped below.",
    gallery: true,
    galleryOrder: 70,
  },
  {
    id: "platform-mobile",
    file: "06-platform-umbrella-mobile",
    alt: "Mobile screen for Explore DigiCert ONE Platform, with product destinations in a list and an integrations group below.",
    caption: "Mobile version.",
    phase: "Phase two",
    status: "exploration",
    upload: "The mobile platform umbrella.",
    why: "Shows the same parent, product destinations, and integrations in a single column.",
    phone: true,
    gallery: true,
    galleryOrder: 80,
  },
  {
    id: "col-2",
    file: "07-two-column-test",
    alt: "Two-column navigation tests labeled With column header, Missing column header, and No column header. Each includes a mobile menu and desktop panels.",
    caption: "Two columns. With a column header, a missing column header, and no column header.",
    phase: "Phase two",
    status: "exploration",
    upload: "The two-column capacity exploration.",
    why: "Fewer columns give each group more width and can lengthen the list.",
    gallery: true,
    galleryOrder: 90,
  },
  {
    id: "col-3",
    file: "08-three-column-test",
    alt: "Three-column navigation tests labeled With column header, Missing column header, and No column header. Each includes a mobile menu and desktop panels.",
    caption: "Three columns. With a column header, a missing column header, and no column header.",
    phase: "Phase two",
    status: "exploration",
    upload: "The three-column capacity exploration.",
    why: "A middle count between the wider two-column lists and the narrower four-column panel.",
    gallery: true,
    galleryOrder: 100,
  },
  {
    id: "col-4",
    file: "09-four-column-test",
    alt: "Four-column navigation tests labeled With column header, Missing column header, and No column header. Each includes a mobile menu and desktop panels.",
    caption: "Four columns. With a column header, a missing column header, and no column header.",
    phase: "Phase two",
    status: "exploration",
    upload: "The four-column capacity exploration.",
    why: "More columns spread the links across the panel and narrow each group.",
    gallery: true,
    galleryOrder: 110,
  },
  {
    id: "link-explore",
    file: "10-descriptive-column-explorations",
    alt: "Four desktop candidates for a descriptive column heading: a subtle click hint on the header, a header that is not clickable with a button inside the container, the integrations treatment with a learn-more button, and a headed container with a title, details, and a button link.",
    caption: "Alternative layouts for a descriptive column heading.",
    phase: "Phase two",
    status: "exploration",
    upload: "The alternative descriptive-column layouts.",
    why: "These were the options for signaling that a descriptive heading is also a destination.",
    gallery: true,
    galleryOrder: 130,
  },
  {
    id: "link-approved",
    file: "11-approved-heading-arrow",
    alt: "Resource Center column with an up-right arrow on the heading, a short description, and Additional Resources and Quick Links beside it.",
    caption: "Desktop version.",
    phase: "Phase two",
    status: "approved",
    upload: "The approved desktop heading-and-arrow treatment.",
    why: "Shows the approved cue on a descriptive column heading.",
    gallery: true,
    galleryOrder: 140,
  },
  {
    id: "link-approved-mobile",
    file: "11-approved-heading-arrow-mobile",
    alt: "Mobile Resource Center screen with an up-right arrow on the heading, the description, then Additional Resources and Quick Links.",
    caption: "Mobile version.",
    phase: "Phase two",
    status: "approved",
    upload: "The approved mobile heading-and-arrow treatment.",
    why: "Shows the same heading cue in the mobile menu.",
    phone: true,
    gallery: true,
    galleryOrder: 145,
  },
  {
    id: "banner-overview",
    file: "12-promo-overview",
    alt: "Four selected promotional banners in the DigiCert navigation: image-led, decorative background, icon-led, and text-led. Each appears in a desktop panel and a mobile menu. The image-led treatment also includes a larger mobile banner.",
    caption: "Selected authorable banner options.",
    phase: "Phase three",
    status: "selected",
    upload: "The overview board of the four selected authorable banners.",
    why: "Shows the selected set together. Individual crops are still needed for a readable comparison.",
    gallery: true,
    galleryOrder: 200,
    galleryCaption: "Selected authorable banner options.",
  },
  {
    id: "promo-image-desktop",
    file: "12-promo-image-desktop",
    alt: "Desktop image-led banner: a blue treatment with campaign artwork, supporting copy, and a call to action.",
    caption: "Image-led banner.",
    phase: "Phase three",
    status: "selected",
    upload: "A readable crop of the image-led desktop banner.",
    why: "The overview is too small to compare this treatment on its own.",
    gallery: true,
    galleryOrder: 201,
    galleryCaption: "Selected authorable banner options.",
  },
  {
    id: "promo-image-mobile",
    file: "12-promo-image-mobile",
    alt: "Larger mobile image-led banner, with the artwork above the message.",
    caption: "Image-led banner, larger mobile presentation.",
    phase: "Phase three",
    status: "selected",
    upload: "The image-led banner inside the mobile navigation.",
    why: "Shows how the image-led option uses vertical space on a small screen.",
    phone: true,
    gallery: true,
    galleryOrder: 202,
    galleryCaption: "Selected authorable banner options.",
  },
  {
    id: "promo-image-mobile-large",
    file: "12-promo-image-mobile-large",
    alt: "Larger image-led mobile banner, with campaign artwork above the message and a call to action.",
    caption: "Image-led banner, larger mobile presentation.",
    phase: "Phase three",
    status: "selected",
    upload: "The larger image-led mobile banner.",
    why: "Compares the larger image-led mobile presentation with the compact one.",
    phone: false,
    gallery: true,
    galleryOrder: 203,
    galleryCaption: "Selected authorable banner options.",
  },
  {
    id: "promo-image-mobile-compact",
    file: "12-promo-image-mobile-compact",
    alt: "Compact image-led mobile banner, with smaller campaign artwork, the message, and a call to action.",
    caption: "Image-led banner, compact mobile presentation.",
    phase: "Phase three",
    status: "selected",
    upload: "The compact image-led mobile banner.",
    why: "Shows the smaller vertical footprint of the same option.",
    phone: false,
    gallery: true,
    galleryOrder: 203.5,
    galleryCaption: "Selected authorable banner options.",
  },
  {
    id: "promo-background-desktop",
    file: "12-promo-background-desktop",
    alt: "Desktop decorative-background banner: a light treatment with background artwork, campaign text, and a call to action.",
    caption: "Decorative-background banner.",
    phase: "Phase three",
    status: "selected",
    upload: "A readable crop of the decorative-background desktop banner.",
    why: "The overview is too small to compare this treatment on its own.",
    gallery: true,
    galleryOrder: 204,
    galleryCaption: "Selected authorable banner options.",
  },
  {
    id: "promo-background-mobile",
    file: "12-promo-background-mobile",
    alt: "Mobile decorative-background banner inside the navigation.",
    caption: "Decorative-background banner on a small screen.",
    phase: "Phase three",
    status: "selected",
    upload: "The decorative-background banner inside the mobile navigation.",
    why: "Shows that treatment within the narrower menu.",
    phone: true,
    gallery: true,
    galleryOrder: 205,
    galleryCaption: "Selected authorable banner options.",
  },
  {
    id: "promo-icon-desktop",
    file: "12-promo-icon-desktop",
    alt: "Desktop icon-led banner: a neutral treatment with an icon, campaign text, and a call to action.",
    caption: "Icon-led banner.",
    phase: "Phase three",
    status: "selected",
    upload: "A readable crop of the icon-led desktop banner.",
    why: "The overview is too small to compare this treatment on its own.",
    gallery: true,
    galleryOrder: 206,
    galleryCaption: "Selected authorable banner options.",
  },
  {
    id: "promo-icon-mobile",
    file: "12-promo-icon-mobile",
    alt: "Mobile icon-led banner inside the navigation.",
    caption: "Icon-led banner on a small screen.",
    phase: "Phase three",
    status: "selected",
    upload: "The icon-led banner inside the mobile navigation.",
    why: "Shows that treatment within the narrower menu.",
    phone: true,
    gallery: true,
    galleryOrder: 207,
    galleryCaption: "Selected authorable banner options.",
  },
  {
    id: "promo-text-desktop",
    file: "12-promo-text-desktop",
    alt: "Desktop text-led banner: a blue treatment with the message and a call to action, and no separate illustration.",
    caption: "Text-led banner.",
    phase: "Phase three",
    status: "selected",
    upload: "A readable crop of the text-led desktop banner.",
    why: "The overview is too small to compare this treatment on its own.",
    gallery: true,
    galleryOrder: 208,
    galleryCaption: "Selected authorable banner options.",
  },
  {
    id: "promo-text-mobile",
    file: "12-promo-text-mobile",
    alt: "Mobile text-led banner inside the navigation.",
    caption: "Text-led banner on a small screen.",
    phase: "Phase three",
    status: "selected",
    upload: "The text-led banner inside the mobile navigation.",
    why: "Shows that treatment within the narrower menu.",
    phone: true,
    gallery: true,
    galleryOrder: 209,
    galleryCaption: "Selected authorable banner options.",
  },
];

export const navigationGroups: NavGroup[] = [
  {
    id: "start",
    layout: "compare",
    frames: ["legacy-promo", "legacy-columns"],
    clusters: [{ heading: "Legacy reference", frames: ["legacy-promo", "legacy-columns"] }],
    caption: "Legacy navigation, with different column treatments.",
  },
  {
    id: "alignment",
    layout: "carousel",
    frames: ["align-one", "align-center", "align-later", "align-outer", "align-none"],
  },
  {
    id: "mobile",
    layout: "stack",
    frames: ["mobile-board"],
    plain: true,
  },
  {
    id: "approval",
    layout: "stack",
    frames: ["approved-overview"],
  },
  {
    id: "platform",
    layout: "hero",
    frames: ["platform-desktop", "platform-mobile"],
    plain: true,
  },
  {
    id: "columns",
    layout: "carousel",
    frames: ["col-2", "col-3", "col-4"],
  },
  {
    id: "links",
    layout: "stack",
    frames: ["link-explore"],
    plain: true,
  },
  {
    id: "link-approved",
    layout: "hero",
    frames: ["link-approved", "link-approved-mobile"],
    kicker: "Approved visual treatment.",
    plain: true,
  },
  {
    id: "banner-overview",
    layout: "stack",
    frames: ["banner-overview"],
    plain: true,
  },
  {
    id: "banner-image",
    layout: "hero",
    frames: ["promo-image-desktop", "promo-image-mobile"],
    plain: true,
  },
  {
    id: "banner-background",
    layout: "hero",
    frames: ["promo-background-desktop", "promo-background-mobile"],
    plain: true,
  },
  {
    id: "banner-icon",
    layout: "hero",
    frames: ["promo-icon-desktop", "promo-icon-mobile"],
    plain: true,
  },
  {
    id: "banner-text",
    layout: "hero",
    frames: ["promo-text-desktop", "promo-text-mobile"],
    plain: true,
  },
  {
    id: "banner-image-scale",
    layout: "pair",
    frames: ["promo-image-mobile-large", "promo-image-mobile-compact"],
    plain: true,
  },
];

const frameById = new Map(navigationFrames.map((frame) => [frame.id, frame]));

function framesFor(ids: string[]) {
  return ids.map((frameId) => frameById.get(frameId)).filter((frame): frame is NavFrame => Boolean(frame));
}

export function getNavGroup(id: string) {
  const group = navigationGroups.find((item) => item.id === id);
  if (!group) return null;
  return {
    ...group,
    frames: framesFor(group.frames),
    clusters: group.clusters?.map((cluster) => ({
      heading: cluster.heading,
      frames: framesFor(cluster.frames),
    })),
  };
}

export function getNavNote(id: keyof typeof navigationNotes) {
  return navigationNotes[id];
}

export function galleryFrames() {
  return navigationFrames
    .filter((frame) => frame.gallery)
    .sort((a, b) => (a.galleryOrder ?? 0) - (b.galleryOrder ?? 0));
}
