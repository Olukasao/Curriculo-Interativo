export type Lang = "pt" | "en";

/** Localized string. Every visible sentence on the site exists in both languages. */
export type L = { pt: string; en: string };

export type Aspect = "16/9" | "9/16" | "4/5" | "1/1" | "4/3";

/**
 * Media is declared by intent, not by file. A `video` points at a folder in
 * /public/media/<slug>/ produced by `npm run media` (preview.mp4, full.mp4, poster.webp).
 * A `placeholder` renders a labelled stand-in and lists what has to be supplied.
 */
export type Media =
  | { kind: "video"; slug: string; aspect: Aspect; alt: L }
  | { kind: "image"; src: string; aspect: Aspect; alt: L }
  | { kind: "placeholder"; aspect: Aspect; label: L; todo: string };

export type Link = { label: L; href: string };

export type CaseSection = { heading: L; body: L };

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: L;
  /** One line that sits under the title everywhere the project is listed. */
  line: L;
  summary: L;
  problem: L;
  solution: L;
  role: L;
  tech: string[];
  features?: L[];
  /** Project-specific accent. Used sparingly inside the case study only. */
  tone: { ink: string; field: string };
  hero: Media;
  gallery: Media[];
  links?: Link[];
  keywords: string[];
};

export type LabCategory =
  | "motion"
  | "kinetic"
  | "campaign"
  | "identity"
  | "logo"
  | "vector"
  | "social"
  | "composition"
  | "direction";

export type LabItem = {
  id: string;
  title: string;
  client?: string;
  categories: LabCategory[];
  media: Media;
  description: L;
  tools?: string[];
  project?: string;
};

export type Experience = {
  company: string;
  role: L;
  period?: L;
  engagement?: L;
  summary: L;
  points?: L[];
  current?: boolean;
};

export type Universe = {
  id: "engineering" | "intelligence" | "creative";
  name: string;
  thesis: L;
  skills: { name: string; note?: L }[];
};
