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
  /** Optional URL of an audio recording for the "Listen" button. */
  audio?: string;
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

export interface Chapter {
  number: number;
  name: string;
  translation: string;
  versesCount: number;
  summary: string;
  verses: Verse[];
}

export interface Intention {
  id: string;
  label: string;
  emoji: string;
  description: string;
  color: string;
  mantraIds: string[];
}

export interface StateInfo {
  name: string;
  templesCount: number;
  emoji: string;
  image: string;
}
