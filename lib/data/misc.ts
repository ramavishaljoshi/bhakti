import { StateInfo } from "@/lib/types";

export const quotes = [
  { text: "Change is the law of the universe. You can be a millionaire or a pauper in an instant.", source: "Bhagavad Gita" },
  { text: "The mind is restless and difficult to restrain, but it is subdued by practice.", source: "Bhagavad Gita 6.35" },
  { text: "Set thy heart upon thy work, but never on its reward.", source: "Bhagavad Gita 2.47" },
  { text: "You came empty handed, and you will leave empty handed.", source: "Bhagavad Gita" },
  { text: "A person can rise through the efforts of his own mind; or draw himself down, for the mind is his friend and also his enemy.", source: "Bhagavad Gita 6.5" },
];

export const states: StateInfo[] = [
  { name: "Punjab", templesCount: 12, emoji: "🌾", image: "/assets/state-punjab.jpg" },
  { name: "Himachal Pradesh", templesCount: 18, emoji: "🏔️", image: "/assets/state-himachal.jpg" },
  { name: "Uttarakhand", templesCount: 16, emoji: "⛰️", image: "/assets/state-uttarakhand.jpg" },
  { name: "Rajasthan", templesCount: 27, emoji: "🐫", image: "/assets/state-rajasthan.jpg" },
  { name: "Gujarat", templesCount: 24, emoji: "🦁", image: "/assets/state-gujarat.jpg" },
  { name: "Tamil Nadu", templesCount: 38, emoji: "🛕", image: "/assets/state-tamilnadu.jpg" },
  { name: "Kerala", templesCount: 21, emoji: "🌴", image: "/assets/state-kerala.jpg" },
  { name: "Maharashtra", templesCount: 29, emoji: "🚩", image: "/assets/state-maharashtra.jpg" },
];

export const tickerItems = [
  "🪔 Ganga Dussehra Today",
  "✨ Live Aarti at 6:30 PM",
  "🕉 108 mantra challenge — Day 12",
  "🌸 Sawan begins July 22",
  "🎉 New: AI Guru in 8 languages",
  "🛕 Char Dham Yatra guide live",
];

export const dailyArticle = {
  slug: "power-of-daily-jap",
  tag: "Daily Article · 5 min read",
  title: "The quiet power of morning sadhana",
  excerpt:
    "How fifteen minutes before sunrise can reshape your nervous system, your focus, and your relationship with the day ahead.",
  image: "/assets/article-feature.jpg",
};

export interface PanchangItem {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export const panchang: PanchangItem[] = [
  { label: "Tithi", value: "Ekadashi", icon: "Moon", color: "text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30" },
  { label: "Nakshatra", value: "Shravana", icon: "Star", color: "text-sky-500 bg-sky-100 dark:bg-sky-900/30" },
  { label: "Rahu Kaal", value: "09:00 – 10:30 AM", icon: "Clock", color: "text-rose-500 bg-rose-100 dark:bg-rose-900/30" },
  { label: "Sunrise", value: "05:31 AM", icon: "Sunrise", color: "text-amber-500 bg-amber-100 dark:bg-amber-900/30" },
  { label: "Sunset", value: "07:14 PM", icon: "Sunset", color: "text-orange-500 bg-orange-100 dark:bg-orange-900/30" },
];

export interface Shortcut {
  label: string;
  icon: string;
  href: string;
}

export const shortcuts: Shortcut[] = [
  { label: "Jap Counter", icon: "CircleDot", href: "/jap" },
  { label: "Mantras", icon: "BookOpen", href: "/mantras" },
  { label: "Encyclopedia", icon: "Library", href: "/gods" },
  { label: "Temples", icon: "Landmark", href: "/temples" },
  { label: "Festivals", icon: "PartyPopper", href: "/festivals" },
  { label: "Chalisa", icon: "ScrollText", href: "/mantras" },
  { label: "Bhagavad Gita", icon: "BookText", href: "/gita" },
  { label: "Ramayan", icon: "Bow", href: "/ramayan" },
  { label: "Mahabharat", icon: "Chakra", href: "/mahabharat" },
  { label: "Articles", icon: "Newspaper", href: "/articles" },
  { label: "Favorites", icon: "Heart", href: "/favorites" },
  { label: "AI Guru", icon: "Bot", href: "/ai-guru" },
  { label: "Journal", icon: "NotebookPen", href: "/journal" },
];

export const shortcutTints = [
  "text-saffron-600 bg-tint-saffron",
  "text-rose-500 bg-tint-rose",
  "text-violet-500 bg-tint-lavender",
  "text-emerald-500 bg-tint-mint",
  "text-amber-500 bg-tint-sand",
  "text-orange-500 bg-tint-peach",
  "text-sky-500 bg-tint-sky",
  "text-pink-500 bg-tint-rose",
  "text-rose-500 bg-tint-rose",
  "text-violet-500 bg-tint-lavender",
  "text-teal-500 bg-tint-mint",
];

// Articles now live in lib/data/articles.ts (richer structure + Hinglish
// intent targeting). dailyArticle above links to one of those slugs.
