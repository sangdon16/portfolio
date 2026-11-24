export const site = {
  name: "Don",
  title: "Don is a UX designer.",
  description:
    "I’m a UX designer at DigiCert, shaping web journeys and reusable components.",
  email: "inno.carljohndon@gmail.com",
  // Add a full LinkedIn URL to show the link. Leave blank to hide it.
  linkedinUrl: "",
  coffeeUrl: "",
  // scale and objectPosition set the crop.
  portrait: {
    src: "/images/portrait.png",
    alt: "Line drawing of Don wearing glasses.",
    scale: 1,
    objectPosition: "center top",
  },
  nav: [
    { href: "/", label: "Don", id: "top" },
    { href: "/#featured", label: "Featured", id: "featured" },
    { href: "/work", label: "Work", id: "work" },
    { href: "/about", label: "About", id: "about" },
    { href: "/#contact", label: "Get in touch", id: "contact" },
  ],
  hero: {
    eyebrow: "Don is a UX designer.",
    lines: ["Clear experiences.", "Thoughtful decisions."],
    supporting:
      "I’m a UX designer at DigiCert, shaping web journeys and reusable components. I work through complex requirements, explore alternatives, and collaborate with content and development teams to turn ideas into clear design directions.",
    primary: "Explore my work",
    secondary: "About me",
    cue: "Scroll to explore",
  },
  featured: {
    label: "Featured",
    heading: "The work, and the thinking behind it.",
    intro:
      "A selection of web experiences, independent products, and challenges that pushed my thinking.",
    cards: [
      {
        slug: "digicert",
        label: "DigiCert · Web experience",
        cta: "Explore DigiCert work",
        tone: "blue",
      },
      {
        slug: "splitsafe",
        label: "SplitSafe · Hackathon project",
        cta: "Explore SplitSafe",
        tone: "neutral",
      },
    ],
  },
  more: {
    heading: "More from my practice.",
    intro: "Earlier work and other projects across my design journey.",
    cta: "View all work",
    slugs: ["ugnai-response", "octonomy", "witricity", "tivian", "kinematician"],
  },
  practice: {
    heading: "The decisions matter as much as the design.",
    intro:
      "My work involves making competing needs visible, exploring credible alternatives, and explaining why a direction makes sense.",
    items: [
      {
        title: "Explore the alternatives",
        body: "I compare approaches to understand what each makes easier and what it asks us to give up.",
      },
      {
        title: "Design within real constraints",
        body: "I work with existing components, content requirements, authoring needs, and responsive behavior.",
      },
      {
        title: "Make the reasoning clear",
        body: "I bring explorations and recommendations into conversations with marketing, content, and development.",
      },
    ],
  },
  contact: {
    heading: "Have a complex experience to untangle?",
    body: "Let’s talk about the challenge, the possibilities, and what we could make clearer.",
    primary: "Get in touch",
    secondary: "LinkedIn",
  },
  work: {
    heading: "Selected work",
    intro: "A closer look at the experiences I’ve designed and the decisions that shaped them.",
  },
  aboutLinks: [
    { href: "/work/digicert", label: "DigiCert" },
    { href: "/work/splitsafe", label: "SplitSafe" },
    { href: "/work/ugnai-response", label: "UgnAI Response" },
  ],
} as const;

export const workGroups = [
  {
    label: "DigiCert",
    items: [
      "digicert/balancing-content-and-conversion",
      "digicert/designing-a-calendar",
      "digicert/platform-navigation",
    ],
  },
  {
    label: "Personal Project",
    items: ["splitsafe", "ugnai-response"],
  },
  {
    label: "Earlier work",
    items: ["octonomy", "witricity", "tivian", "kinematician"],
  },
] as const;

export function mailHref(subject?: string) {
  const base = `mailto:${site.email}`;
  if (!subject) return base;
  return `${base}?subject=${encodeURIComponent(subject)}`;
}

export function coffeeHref() {
  return site.coffeeUrl || mailHref("Coffee");
}
