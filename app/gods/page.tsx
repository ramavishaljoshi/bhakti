import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { GodCard } from "@/components/cards/god-card";
import { FaqSection } from "@/components/shared/faq-section";
import { gods } from "@/lib/data/gods";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata = buildMetadata({
  title: "Hindu Gods & Goddesses — Stories, Mantras & Significance",
  description:
    "Explore Hindu gods and goddesses — Shiva, Krishna, Hanuman, Durga, Lakshmi, Ganesha & Ram. Har devta ki katha, symbols, mantra aur festivals ek jagah.",
  path: "/gods",
  keywords: [
    "hindu gods",
    "hindu goddesses",
    "hindu deities",
    "shiva krishna hanuman",
    "god stories",
    "devi devta",
  ],
});

const GOD_FAQS = [
  {
    q: "Who are the main Hindu gods?",
    a: "Hindu dharm mein anek devi-devta hain. Sabse pramukh hain — Brahma, Vishnu aur Shiva (Trimurti), aur unke avatar jaise Krishna aur Ram. Saath hi Hanuman, Ganesha, Durga, Lakshmi aur Saraswati jaise devta bhi vyapak roop se pooje jaate hain.",
  },
  {
    q: "What is the Trimurti?",
    a: "Trimurti ka matlab hai teen pramukh devta — Brahma (srishti/creator), Vishnu (paalak/preserver) aur Shiva (sanharak/destroyer). Yeh teenon milkar srishti ke chakra — utpatti, paalan aur vinaash — ko darshaate hain.",
  },
  {
    q: "Why do Hindu gods have many forms and symbols?",
    a: "Har devta ke roop aur symbols ek gehra arth rakhte hain — jaise Shiva ka trishul, Krishna ki bansuri ya Hanuman ki gada. Yeh prateek (symbols) un gunon aur shaktiyon ko darshaate hain jinki devta pratinidhitva karte hain.",
  },
];

export default function GodsPage() {
  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gods", path: "/gods" },
        ])}
      />
      <PageHeader
        title="Hindu Gods & Goddesses"
        description="The stories, symbols, mantras and festivals of the deities at the heart of Hindu devotion."
        icon={<Sparkles className="h-6 w-6" />}
      />

      <p className="-mt-2 mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Hindu tradition honours the divine in countless forms. Yahan aapko har
        devi-devta ki katha (story), unke prateek (symbols), unse jude mantra,
        temples aur festivals milte hain — taaki aap har devta ko gehraai se
        jaan aur samajh sakein.
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {gods.map((god) => (
          <GodCard key={god.id} god={god} />
        ))}
      </div>

      <div className="mt-12">
        <FaqSection
          subtitle="Hindu devi-devtaon ke baare mein aksar pooche jaane waale sawaal."
          faqs={GOD_FAQS}
        />
      </div>
    </div>
  );
}
