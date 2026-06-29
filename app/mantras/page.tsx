import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { MantraLibrary } from "@/components/mantras/mantra-library";
import { FaqSection } from "@/components/shared/faq-section";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

const MANTRA_FAQS = [
  {
    q: "What is a mantra?",
    a: "A mantra is a sacred sound, word or phrase — often in Sanskrit — that is chanted with focus and devotion. Maana jaata hai ki repetition (jap) se mann shaant hota hai aur dhyan gehra hota hai. Bhakti par har mantra ke saath uska meaning aur significance diya gaya hai.",
  },
  {
    q: "How many times should I chant a mantra?",
    a: "Traditionally a mantra is chanted 108 times — ek poori mala. Aap apni suvidha ke hisaab se 11, 21, 51 ya 108 baar bhi kar sakte hain. The number matters less than chanting regularly with a calm, present mind.",
  },
  {
    q: "Which mantra should I chant daily?",
    a: "Shuruaat ke liye Om Namah Shivaya, the Gayatri Mantra ya Hanuman Chalisa achhe options hain. Aap apni intention ke hisaab se bhi chun sakte hain — peace, focus, health ya gratitude — har intention ke liye sujhaaye gaye mantra app mein diye gaye hain.",
  },
  {
    q: "When is the best time to chant mantras?",
    a: "Brahma muhurat (early morning, before sunrise) ko traditionally sabse shubh maana jaata hai, lekin aap kisi bhi shaant samay chant kar sakte hain. Consistency is what matters most — roz thoda sa abhyas hi kaafi hai.",
  },
  {
    q: "Do I need to pronounce Sanskrit perfectly?",
    a: "No. Bhaav aur shraddha (sincerity) sabse zaroori hai. Har mantra ke saath simple pronunciation guide hai, isliye aap dheere-dheere sahi uchcharan seekh sakte hain — galti ka koi dar nahi.",
  },
];

export const metadata = buildMetadata({
  title: "Mantra Library — Sacred Hindu Mantras with Meaning",
  description:
    "Explore Hindu mantras with meaning, pronunciation and benefits — Om Namah Shivaya, Hanuman Chalisa, Gayatri Mantra & more. Har deity aur intention ke liye mantra.",
  path: "/mantras",
  keywords: [
    "hindu mantras",
    "mantra library",
    "mantra meaning",
    "om namah shivaya",
    "gayatri mantra",
    "powerful mantras",
  ],
});

export default function MantrasPage() {
  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Mantras", path: "/mantras" },
        ])}
      />
      <PageHeader
        title="Mantra Library"
        description="Sacred sounds for every deity and intention. Explore meanings, pronunciation and benefits."
        icon={<BookOpen className="h-6 w-6" />}
      />

      <p className="-mt-2 mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Mantras are sacred sounds traditionally chanted to calm the mind and
        deepen devotion. Yahan aapko har deity aur intention ke liye mantra
        milenge — meaning, sahi pronunciation aur unke paramparik mahatva ke
        saath. Apne pasand ka mantra chuniye aur jap counter par shuruaat
        kijiye.
      </p>

      <MantraLibrary />

      <div className="mt-12">
        <FaqSection
          subtitle="Mantra jap se jude common sawaalon ke saral jawaab."
          faqs={MANTRA_FAQS}
        />
      </div>
    </div>
  );
}
