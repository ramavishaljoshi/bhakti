import Link from "next/link";
import { Sparkles, CalendarDays, UtensilsCrossed } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { festivals } from "@/lib/data/festivals";
import { FaqSection } from "@/components/shared/faq-section";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

const FESTIVAL_FAQS = [
  {
    q: "How many Hindu festivals are there in a year?",
    a: "India mein saal bhar saikdon tyohar manaaye jaate hain — kuch poore desh mein, kuch sirf kisi rajya ya samuday mein. Bhakti par aapko sabse pramukh festivals milte hain — Diwali, Holi, Navratri, Janmashtami, Maha Shivaratri aur kai aur — har ek ki katha, mahatva aur puja vidhi ke saath.",
  },
  {
    q: "How are Hindu festival dates decided?",
    a: "Zyadaatar Hindu tyoharon ki tithi Hindu panchang (lunar calendar) ke hisaab se tay hoti hai, isliye English calendar par inki date har saal badal jaati hai. Har festival page par uski expected date aur mahatva diya gaya hai.",
  },
  {
    q: "What is puja vidhi?",
    a: "Puja vidhi ka matlab hai kisi tyohar ya devta ki pooja karne ka paramparik tareeka — kaun si samagri chahiye, kaun se mantra bole jaate hain, aur kis kram (step-by-step) mein pooja ki jaati hai. Har festival ke saath ek simple puja vidhi guide di gayi hai.",
  },
  {
    q: "Which is the biggest Hindu festival?",
    a: "Diwali (Deepavali) ko aam taur par sabse bada aur vyapak roop se manaaya jaane wala Hindu festival maana jaata hai, lekin alag-alag kshetron mein Navratri, Durga Puja, Pongal ya Onam jaise tyohar bhi utne hi mahatvapurn hote hain.",
  },
];

export const metadata = buildMetadata({
  title: "Hindu Festivals — Dates, Stories & Puja Vidhi",
  description:
    "Hindu festival guide with dates, stories, significance and puja vidhi — Diwali, Holi, Janmashtami, Navratri & more. Har tyohar ki katha aur vidhi ek jagah.",
  path: "/festivals",
  keywords: [
    "hindu festivals",
    "festival calendar",
    "puja vidhi",
    "diwali",
    "holi",
    "janmashtami",
    "navratri",
  ],
});

export default function FestivalsPage() {
  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Festivals", path: "/festivals" },
        ])}
      />
      <PageHeader
        title="Festivals"
        description="The stories, significance and rituals behind India's most beloved spiritual festivals."
        icon={<Sparkles className="h-6 w-6" />}
      />

      <p className="-mt-2 mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Hindu festivals carry deep stories, devotion and joy. Yahan har tyohar
        ki katha (story), uska mahatva (significance), puja vidhi aur paramparik
        bhojan ek hi jagah par milta hai — taaki aap har celebration ko
        shraddha aur samajh ke saath mana sakein.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {festivals.map((f) => (
          <Link
            key={f.id}
            href={`/festivals/${f.slug}`}
            className="group block overflow-hidden rounded-4xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg"
          >
            <div className="relative aspect-[16/11] overflow-hidden bg-secondary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.image}
                alt={f.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-saffron-700 shadow-sm backdrop-blur dark:bg-black/50 dark:text-saffron-300">
                <CalendarDays className="h-3.5 w-3.5" />
                {f.date}
              </span>
            </div>

            <div className="space-y-3 p-5">
              <h2 className="font-display text-lg font-bold tracking-tight">
                {f.name}
              </h2>

              <p className="line-clamp-3 text-sm text-muted-foreground">
                {f.story}
              </p>

              <p className="rounded-2xl bg-secondary/50 px-3 py-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">
                  Why we celebrate:{" "}
                </span>
                {f.whyCelebrate}
              </p>

              {f.food?.length > 0 && (
                <p className="flex items-start gap-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
                  <UtensilsCrossed className="mt-0.5 h-3.5 w-3.5 shrink-0 text-saffron-500" />
                  {f.food.join(", ")}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <FaqSection
          subtitle="Hindu tyohaaron, tithi aur puja vidhi se jude common sawaal."
          faqs={FESTIVAL_FAQS}
        />
      </div>
    </div>
  );
}
