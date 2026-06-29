import Link from "next/link";
import { BookOpen, ArrowRight, Quote } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { FaqSection } from "@/components/shared/faq-section";
import { gitaChapters, dailyVerse } from "@/lib/data/gita";
import {
  buildMetadata,
  breadcrumbSchema,
  absoluteUrl,
  SITE_NAME,
} from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata = buildMetadata({
  title: "Bhagavad Gita — Chapters, Verses, Meaning & Daily Shloka",
  description:
    "Read the Bhagavad Gita chapter by chapter — Sanskrit shlokas with transliteration and simple meaning. Geeta saar, har adhyay ki summary aur daily verse ek jagah.",
  path: "/gita",
  keywords: [
    "bhagavad gita",
    "geeta",
    "bhagavad gita chapters",
    "gita shlok meaning",
    "gita saar",
    "karma yoga",
  ],
});

const GITA_FAQS = [
  {
    q: "What is the Bhagavad Gita?",
    a: "The Bhagavad Gita ek 700-shlok ka pavitra granth hai, jo Mahabharat ka hissa hai. Ismein Bhagwan Krishna, Arjun ko Kurukshetra ke yuddh-bhoomi par jeevan, kartavya (duty) aur bhakti ka gyaan dete hain.",
  },
  {
    q: "How many chapters and verses are in the Gita?",
    a: "Bhagavad Gita mein 18 adhyay (chapters) aur lagbhag 700 shlok (verses) hain. Har adhyay ek alag 'yoga' — jaise Karma Yoga, Bhakti Yoga aur Jnana Yoga — par kendrit hai.",
  },
  {
    q: "What is the main message of the Gita?",
    a: "Gita ka saar hai — apna kartavya nishkaam bhaav se karo, phal ki chinta kiye bina (BG 2.47). Yeh nishkaam karma, gyaan aur bhakti ke maarg se mann ki shanti aur mukti ka raasta dikhaati hai.",
  },
  {
    q: "Can I read the Gita daily?",
    a: "Bilkul. Roz ek shlok padhna bhi ek sundar abhyas hai. Is page par ek daily verse diya gaya hai, aur aap kisi bhi adhyay ko uske saral arth ke saath padh sakte hain.",
  },
];

const bookSchema = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Bhagavad Gita",
  alternateName: "Geeta",
  url: absoluteUrl("/gita"),
  inLanguage: ["sa", "en", "hi"],
  about: "Hindu scripture: dialogue between Krishna and Arjuna on duty, devotion and the self.",
  numberOfPages: 700,
  publisher: { "@type": "Organization", name: SITE_NAME },
};

export default function GitaPage() {
  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Bhagavad Gita", path: "/gita" },
          ]),
          bookSchema,
        ]}
      />
      <PageHeader
        title="Bhagavad Gita"
        description="Krishna's timeless wisdom — chapter by chapter, with Sanskrit, transliteration and simple meaning."
        icon={<BookOpen className="h-6 w-6" />}
      />

      <p className="-mt-2 mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        The Bhagavad Gita is a 700-verse dialogue between Bhagwan Krishna and
        Arjuna on the battlefield of Kurukshetra. Ismein jeevan, kartavya
        (duty), gyaan aur bhakti ka saar diya gaya hai — har adhyay ko uske
        saral arth ke saath padhiye aur roz ek shlok apne jeevan mein utariye.
      </p>

      {/* Daily verse */}
      <div className="mb-10 rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-saffron-600 dark:text-saffron-400">
          <Quote className="h-4 w-4" /> Verse of the Day
        </p>
        <p className="font-display text-xl font-semibold leading-relaxed text-foreground">
          {dailyVerse.sanskrit}
        </p>
        <p className="mt-2 text-sm italic text-muted-foreground">
          {dailyVerse.transliteration}
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {dailyVerse.meaning}
        </p>
        <Link
          href={`/gita/${dailyVerse.chapter}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-600 hover:underline dark:text-saffron-400"
        >
          Read Chapter {dailyVerse.chapter} (BG {dailyVerse.chapter}.
          {dailyVerse.verse}) <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Chapters */}
      <h2 className="mb-4 font-display text-xl font-bold tracking-tight sm:text-2xl">
        Chapters
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gitaChapters.map((c) => (
          <Link
            key={c.number}
            href={`/gita/${c.number}`}
            className="group flex flex-col rounded-3xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-soft-lg"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-saffron-gradient font-display font-bold text-white">
                {c.number}
              </span>
              <div className="min-w-0">
                <h3 className="truncate font-display font-bold tracking-tight">
                  {c.name}
                </h3>
                <p className="truncate text-xs text-muted-foreground">
                  {c.translation}
                </p>
              </div>
            </div>
            <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">
              {c.summary}
            </p>
            <p className="mt-3 text-xs font-medium text-saffron-600 dark:text-saffron-400">
              {c.versesCount} verses →
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <FaqSection
          subtitle="Bhagavad Gita ke baare mein aksar pooche jaane waale sawaal."
          faqs={GITA_FAQS}
        />
      </div>
    </div>
  );
}
