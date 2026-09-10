import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { FaqSection } from "@/components/shared/faq-section";
import { SectionGrid } from "@/components/scripture/section-grid";
import { ramayanKands } from "@/lib/data/ramayan";
import {
  buildMetadata,
  breadcrumbSchema,
  absoluteUrl,
  SITE_NAME,
} from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata = buildMetadata({
  title: "Ramayan — 7 Kand, Katha, Shlok & Meaning",
  description:
    "All seven kands of Valmiki's Ramayan, from Bala to Uttara — each with its story, key episodes and shlokas explained in plain language. The Sundara Kand, the Yuddha Kand and the whole of Rama's story in one place.",
  path: "/ramayan",
  keywords: [
    "ramayan",
    "ramayana",
    "valmiki ramayan",
    "sundara kand",
    "ramayan kand",
    "ram katha",
  ],
});

const RAMAYAN_FAQS = [
  {
    q: "How many kands are there in the Ramayan?",
    a: "Valmiki's Ramayan has seven kands — Bala, Ayodhya, Aranya, Kishkindha, Sundara, Yuddha and Uttara. Together they run to roughly 24,000 shlokas, and each kand covers a distinct stage of Rama's life.",
  },
  {
    q: "Why is the Sundara Kand recited so often?",
    a: "The Sundara Kand is the only kand that contains nothing but success — Hanuman leaps the ocean, finds Sita and returns in triumph. There is no defeat or sorrow anywhere in it, which is why it is considered the most auspicious reading for removing troubles and fear.",
  },
  {
    q: "Who wrote the Ramayan?",
    a: "The Ramayan was composed by Maharishi Valmiki, known as the Adi Kavi — the first poet. Tradition holds that his grief at a hunter killing one of a pair of krauncha birds poured out as the world's first shloka, 'ma nishada'.",
  },
  {
    q: "What is the difference between the Ramayan and the Ramcharitmanas?",
    a: "Valmiki composed the Ramayan in Sanskrit. Goswami Tulsidas wrote the Ramcharitmanas in Awadhi around the sixteenth century so that Rama's story could reach ordinary people. Both are arranged in seven kands, but they differ in language, style and some episodes.",
  },
];

const bookSchema = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Ramayan",
  alternateName: ["Ramayana", "Valmiki Ramayana", "Ramayan"],
  author: { "@type": "Person", name: "Valmiki" },
  url: absoluteUrl("/ramayan"),
  inLanguage: ["sa", "en", "hi"],
  about:
    "Hindu epic: the life of Rama — his exile, Sita's abduction, the war in Lanka and the return to Ayodhya.",
  numberOfPages: 24000,
  publisher: { "@type": "Organization", name: SITE_NAME },
};

export default function RamayanPage() {
  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Ramayan", path: "/ramayan" },
          ]),
          bookSchema,
        ]}
      />
      <PageHeader
        title="Ramayan"
        description="The story of Rama — all seven kands, their key episodes, and shlokas with plain meaning."
        icon={<BookOpen className="h-6 w-6" />}
      />

      <p className="-mt-2 mb-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Maharishi Valmiki&rsquo;s Ramayan is an epic of some 24,000 shlokas, arranged
        in seven kands. It is less the story of a king than an answer to a
        question: what does an ideal human being actually look like — as a son,
        a brother, a husband and a ruler? Read each kand&rsquo;s story, follow its key
        episodes, and sit with the verses that carry it.
      </p>

      <h2 className="mb-4 font-display text-xl font-bold tracking-tight sm:text-2xl">
        The Seven Kands
      </h2>
      <SectionGrid
        sections={ramayanKands}
        basePath="/ramayan"
        unitLabel="sargas"
      />

      <div className="mt-12">
        <FaqSection
          subtitle="Common questions about the Ramayan."
          faqs={RAMAYAN_FAQS}
        />
      </div>
    </div>
  );
}
