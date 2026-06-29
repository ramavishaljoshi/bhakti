import Link from "next/link";
import { Landmark, MapPin, Clock, CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { temples } from "@/lib/data/temples";
import { FaqSection } from "@/components/shared/faq-section";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

const TEMPLE_FAQS = [
  {
    q: "Which are the most famous temples in India?",
    a: "Bharat mein hazaaron pavitra mandir hain. Kuch sabse prasiddh hain — Kedarnath aur Badrinath (Uttarakhand), Kashi Vishwanath (Varanasi), Tirupati Balaji (Andhra Pradesh), Vaishno Devi (Jammu), Somnath (Gujarat) aur Meenakshi Temple (Madurai). Har mandir ki apni alag katha aur mahatva hai.",
  },
  {
    q: "What are the 12 Jyotirlingas?",
    a: "12 Jyotirlinga Bhagwan Shiv ke sabse pavitra dhaam maane jaate hain, jaise Somnath, Mahakaleshwar, Kashi Vishwanath aur Kedarnath. Maana jaata hai ki in sthaanon par Shiv jyoti (prakash) ke roop mein prakat hue the.",
  },
  {
    q: "What should I know before visiting a temple?",
    a: "Darshan se pehle mandir ka samay (timings), dress code aur kisi vishesh niyam ki jaankari le lena achha rehta hai. Har temple page par timings, dress code, best time to visit aur 'how to reach' di gayi hai taaki aapki yatra aasaan ho.",
  },
  {
    q: "What is the dress code for Hindu temples?",
    a: "Zyadaatar mandiron mein sangit (modest) aur saaf kapde pehnne ki salah di jaati hai — purush dhoti/kurta ya full-length kapde, aur mahilaayein saree ya salwar-suit. Kuch mandiron ke apne vishesh niyam hote hain, jo har temple page par diye gaye hain.",
  },
];

export const metadata = buildMetadata({
  title: "Sacred Temples of India — History, Timings & Darshan Guide",
  description:
    "Discover famous Hindu temples across India — deities, history, timings, dress code and how to reach. Kedarnath se Tirupati tak, har mandir ki poori jaankari.",
  path: "/temples",
  keywords: [
    "temples in india",
    "famous hindu temples",
    "temple timings",
    "darshan guide",
    "kedarnath",
    "char dham",
  ],
});

export default function TemplesPage() {
  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Temples", path: "/temples" },
        ])}
      />
      <PageHeader
        title="Sacred Temples"
        description="Discover India's most revered temples — their deities, history, timings and how to visit."
        icon={<Landmark className="h-6 w-6" />}
      />

      <p className="-mt-2 mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        India&apos;s temples are living centres of faith, history and
        architecture. Yahan aapko har mandir ke devta, itihaas (history),
        darshan timings, dress code aur kaise pahunchein — sabki poori jaankari
        milti hai, taaki aap apni teerth yatra shraddha aur aaram se plan kar
        sakein.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {temples.map((t) => (
          <Link
            key={t.id}
            href={`/temples/${t.slug}`}
            className="group block overflow-hidden rounded-4xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg"
          >
            <div className="relative aspect-[16/11] overflow-hidden bg-secondary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.image}
                alt={t.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-saffron-700 shadow-sm backdrop-blur dark:bg-black/50 dark:text-saffron-300">
                {t.deity}
              </span>
            </div>

            <div className="space-y-3 p-5">
              <div>
                <h2 className="font-display text-lg font-bold tracking-tight">
                  {t.name}
                </h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-saffron-500" />
                  {t.city}, {t.state}
                </p>
              </div>

              <p className="line-clamp-3 text-sm text-muted-foreground">
                {t.history}
              </p>

              <div className="space-y-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
                <p className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-saffron-500" />
                  {t.timings}
                </p>
                {t.festivals?.length > 0 && (
                  <p className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 shrink-0 text-saffron-500" />
                    {t.festivals.join(", ")}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <FaqSection
          subtitle="Mandir darshan, timings aur teerth yatra se jude common sawaal."
          faqs={TEMPLE_FAQS}
        />
      </div>
    </div>
  );
}
