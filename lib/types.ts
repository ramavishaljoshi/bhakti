export interface Mantra {
  id: string;
  slug: string;
  name: string;
  sanskrit: string;
  transliteration: string;
  deity: string;
  category: string;
  meaning: string;
  pronunciation: string;
  benefits: string[];
  whenToChant: string;
  relatedFestival?: string;
  relatedTemple?: string;
  intentions: string[];
  image: string;
  count?: number;
  /** Optional URL of a downloadable PDF (e.g. full lyrics) — shows a "Read PDF" button on the detail page. */
  pdf?: string;
  /** Full recitation text, rendered on the detail page. The PDF stays as a takeaway. */
  fullText?: RecitationVerse[];
  /** Optional URL of an audio recording for the "Listen" button. */
  audio?: string;
  /** Optional related aarti — shows a "Listen to Aarti" button on the detail page. */
  aarti?: {
    title: string;
    audio?: string;
  };
}

export interface God {
  id: string;
  slug: string;
  name: string;
  title: string;
  introduction: string;
  story: string;
  symbols: string[];
  festivals: string[];
  temples: string[];
  mantras: string[];
  faqs: { q: string; a: string }[];
  color: string;
  image: string;
}

export interface Temple {
  id: string;
  slug: string;
  name: string;
  deity: string;
  state: string;
  city: string;
  history: string;
  timings: string;
  dressCode: string;
  bestTime: string;
  howToReach: string;
  image: string;
  gallery: string[];
  festivals: string[];
}

export interface Festival {
  id: string;
  slug: string;
  name: string;
  /** Human-readable date label, e.g. "October / November". */
  date: string;
  /** Machine-readable date of this year's observance (YYYY-MM-DD), for Event schema. */
  isoDate?: string;
  story: string;
  whyCelebrate: string;
  pujaVidhi: string[];
  mantras: string[];
  bhajans: string[];
  food: string[];
  faqs: { q: string; a: string }[];
  image: string;
}

export interface Verse {
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  meaning: string;
}

/**
 * One line of a long-form recitation (a chalisa's doha/chaupai, an aarti verse).
 * Lives on `Mantra.fullText` so a devotee can do paath on the page instead of
 * opening the PDF.
 */
export interface RecitationVerse {
  kind: "doha" | "chaupai";
  /** 1–40 for a chalisa's chaupais; framing dohas are unnumbered. */
  number?: number;
  text: string;
  transliteration: string;
  meaning: string;
}

export interface Chapter {
  number: number;
  name: string;
  translation: string;
  versesCount: number;
  summary: string;
  verses: Verse[];
}

/**
 * A quoted shloka from a narrative scripture (Ramayan / Mahabharat).
 * Unlike `Verse`, the citation is a free string and deliberately stays at
 * kand/parva level — recensions disagree on sarga and adhyaya numbering, so a
 * precise "5.33" would imply an accuracy we cannot honestly claim.
 */
export interface ScriptureVerse {
  /** Section-level citation, e.g. "Sundara Kand" or "Vana Parva". */
  ref: string;
  sanskrit: string;
  transliteration: string;
  meaning: string;
}

/** One book of a narrative scripture — a Ramayan kand or a Mahabharat parva. */
export interface ScriptureSection {
  number: number;
  slug: string;
  name: string;
  translation: string;
  /** Sargas (Ramayan) or adhyayas (Mahabharat) this section contains. */
  unitsCount: number;
  summary: string;
  /** Mukhya prasang — the key episodes, as short bullets. */
  highlights: string[];
  verses: ScriptureVerse[];
  /** Optional internal cross-link, e.g. Bhishma Parva → /gita. */
  crossLink?: { label: string; href: string };
}

export interface Intention {
  id: string;
  label: string;
  emoji: string;
  description: string;
  color: string;
  mantraIds: string[];
  /**
   * 2–3 sentence definition / traditional context. Rendered as the page intro
   * and used verbatim in the AEO "summary box" and speakable/AI-overview text.
   */
  intro?: string;
  /** Purpose-phrased search label, e.g. "Mantras for Peace of Mind". */
  seoTitle?: string;
  /** Page-specific FAQ — rendered on the page and emitted as FAQPage schema. */
  faqs?: { q: string; a: string }[];
  /** Extra long-tail keywords for this purpose. */
  keywords?: string[];
}

export interface StateInfo {
  name: string;
  templesCount: number;
  emoji: string;
  image: string;
}
