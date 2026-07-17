import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { FaqSection } from "@/components/shared/faq-section";
import { SectionGrid } from "@/components/scripture/section-grid";
import { mahabharatParvas } from "@/lib/data/mahabharat";
import {
  buildMetadata,
  breadcrumbSchema,
  absoluteUrl,
  SITE_NAME,
} from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata = buildMetadata({
  title: "Mahabharat — 18 Parva, Katha, Shlok & Meaning",
  description:
    "All eighteen parvas of Vyasa's Mahabharat, from Adi to Svargarohana — each with its story, key episodes and shlokas explained in plain language. The Bhagavad Gita is part of it too.",
  path: "/mahabharat",
  keywords: [
    "mahabharat",
    "mahabharata",
    "mahabharat parva",
    "kurukshetra",
    "vyasa mahabharata",
    "mahabharat katha",
  ],
});

const MAHABHARAT_FAQS = [
  {
    q: "How many parvas are there in the Mahabharat?",
    a: "The Mahabharat has eighteen parvas, from the Adi Parva to the Svargarohana Parva. It runs to roughly one hundred thousand shlokas, which makes it the longest epic in the world — about four times the Iliad and the Odyssey combined.",
  },
  {
    q: "Which parva of the Mahabharat contains the Bhagavad Gita?",
    a: "The Bhagavad Gita sits in the Bhishma Parva, the sixth book. When Arjuna looks across at his own kinsmen and lets the Gandiva fall, Krishna gives him the teaching of 700 shlokas that later came to be known as the Gita.",
  },
  {
    q: "Who wrote the Mahabharat?",
    a: "The Mahabharat was composed by Maharishi Ved Vyasa, who is also a character within his own story. Tradition holds that Vyasa recited it and Lord Ganesha wrote it down, on the condition that Vyasa never pause.",
  },
  {
    q: "What is the central message of the Mahabharat?",
    a: "The Mahabharat argues that dharma is not a simple rule but a hard choice, and that its consequences fall on everyone. It says so of itself: 'yad ihasti tad anyatra, yan nehasti na tat kvachit' — whatever is here is found elsewhere; what is not here exists nowhere.",
  },
];

const bookSchema = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Mahabharat",
  alternateName: ["Mahabharata", "Mahabharatam", "Mahabharat"],
  author: { "@type": "Person", name: "Vyasa" },
  url: absoluteUrl("/mahabharat"),
  inLanguage: ["sa", "en", "hi"],
  about:
    "Hindu epic: the struggle between the Pandavas and Kauravas, the war at Kurukshetra, and the nature of dharma.",
  numberOfPages: 100000,
  hasPart: {
    "@type": "Book",
    name: "Bhagavad Gita",
    url: absoluteUrl("/gita"),
  },
  publisher: { "@type": "Organization", name: SITE_NAME },
};

export default function MahabharatPage() {
  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Mahabharat", path: "/mahabharat" },
          ]),
          bookSchema,
        ]}
      />
      <PageHeader
        title="Mahabharat"
        description="The longest epic in the world — all eighteen parvas, their key episodes, and shlokas with plain meaning."
        icon={<BookOpen className="h-6 w-6" />}
      />

      <p className="-mt-2 mb-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Ved Vyasa's Mahabharat runs to some one hundred thousand shlokas,
        arranged in eighteen parvas. It is not simply the story of a war — it is
        the story of dharma in its hardest form, where the line between right
        and wrong is never clean. The Bhagavad Gita belongs to its Bhishma
        Parva. Read each parva's story and sit with the verses that carry it.
      </p>

      <h2 className="mb-4 font-display text-xl font-bold tracking-tight sm:text-2xl">
        The Eighteen Parvas
      </h2>
      <SectionGrid
        sections={mahabharatParvas}
        basePath="/mahabharat"
        unitLabel="adhyayas"
      />

      <div className="mt-12">
        <FaqSection
          subtitle="Common questions about the Mahabharat."
          faqs={MAHABHARAT_FAQS}
        />
      </div>
    </div>
  );
}
