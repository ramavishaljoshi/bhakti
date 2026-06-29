import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { GreetingHero } from "@/components/home/greeting-hero";
import { Ticker } from "@/components/home/ticker";
import { JapProgressCard } from "@/components/home/jap-progress-card";
import { StatsPanel } from "@/components/home/stats-panel";
import { IntentionsRow } from "@/components/home/intentions-row";
import { RecommendedMantra } from "@/components/home/recommended-mantra";
import { DailyShortcutsPanel } from "@/components/home/shortcuts-grid";
import { PanchangCard, QuoteCard } from "@/components/home/panchang-card";
import { ArticleVerse } from "@/components/home/article-verse";
import { AIGuruBanner } from "@/components/home/ai-guru-card";
import { TempleCard } from "@/components/cards/temple-card";
import { FestivalCard } from "@/components/cards/festival-card";
import { SectionHeader } from "@/components/shared/section-header";
import { mantras } from "@/lib/data/mantras";
import { temples } from "@/lib/data/temples";
import { festivals } from "@/lib/data/festivals";
import { states } from "@/lib/data/misc";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata = buildMetadata({
  title: "Bhakti by Agentic Vani — Your Spiritual Companion",
  description:
    "Chant mantras with a digital jap counter, explore gods, temples, festivals & the Bhagavad Gita. Roz ki bhakti ko banaiye simple, shaant aur premium.",
  path: "/",
  keywords: [
    "online jap counter",
    "mantra jap app",
    "hanuman chalisa",
    "hindu mantras",
    "bhagavad gita",
    "daily spiritual routine",
  ],
});

const HOME_FAQS = [
  {
    q: "What is Bhakti by Agentic Vani?",
    a: "Bhakti by Agentic Vani is a free, modern Hindu spirituality app with a digital jap (mantra) counter, a mantra library, gods, temples, festivals and the Bhagavad Gita — designed to make your daily spiritual practice calm and effortless.",
  },
  {
    q: "Is the online mantra jap counter free to use?",
    a: "Yes. The digital jap counter is completely free. You can chant any mantra, track your daily count and streak, and continue across devices when you sign in.",
  },
  {
    q: "Which mantras can I chant on Bhakti?",
    a: "You can chant popular mantras such as Om Namah Shivaya, the Hare Krishna Maha Mantra, Hanuman Chalisa, the Gayatri Mantra and many more, each with meaning, pronunciation and traditional significance.",
  },
  {
    q: "Can I use Bhakti in Hindi and Hinglish?",
    a: "Bhakti is written for an English and Hinglish audience, so the mantras, meanings and guidance feel natural whether you read in English or Hinglish.",
  },
];

export default function HomePage() {
  const todayMantra = mantras[0];
  const exploreTemples = temples.slice(0, 4);
  const featuredFestivals = festivals.slice(0, 4);

  return (
    <div className="container space-y-10 py-6 lg:py-8">
      <JsonLd data={faqSchema(HOME_FAQS)} />
      {/* Greeting hero */}
      <GreetingHero />

      {/* Ticker */}
      <Ticker />

      {/* Today's Progress: Jap card + Today's Panchang */}
      <section className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <JapProgressCard mantraName={todayMantra.name} />
        <PanchangCard />
      </section>

      {/* Intentions */}
      <section>
        <SectionHeader
          title="What are you seeking today?"
          subtitle="Choose an intention to discover guiding mantras"
          href="/intentions"
          actionLabel="See all"
        />
        <IntentionsRow />
      </section>

      {/* Recommended mantra + shortcuts */}
      <section className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <RecommendedMantra mantra={todayMantra} recommendedFor="Peace" />
        <DailyShortcutsPanel />
      </section>

      {/* Search + stats + quote */}
      <section className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <StatsPanel />
        <QuoteCard
          text="Set thy heart upon thy work, but never on its reward."
          source="Bhagavad Gita 2.47"
        />
      </section>

      {/* Explore temples */}
      <section>
        <SectionHeader
          title="Explore temples"
          subtitle="Sacred places across India"
          href="/temples"
          actionLabel="View all"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {exploreTemples.map((temple) => (
            <TempleCard key={temple.id} temple={temple} />
          ))}
        </div>
      </section>

      {/* Festivals */}
      <section>
        <SectionHeader
          title="Festivals"
          subtitle="Celebrate the year's sacred days"
          href="/festivals"
          actionLabel="View all"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredFestivals.map((festival) => (
            <FestivalCard key={festival.id} festival={festival} />
          ))}
        </div>
      </section>

      {/* Explore by state */}
      <section>
        <SectionHeader
          title="Explore by state"
          subtitle="Find temples by region"
          href="/temples"
          actionLabel="View all"
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {states.map((state) => (
            <Link
              key={state.name}
              href={`/temples?state=${encodeURIComponent(state.name)}`}
              className="group relative overflow-hidden rounded-3xl border border-border shadow-soft transition-shadow hover:shadow-soft-lg"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={state.image}
                  alt={state.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 12vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-2.5">
                <p className="truncate text-xs font-semibold text-white">
                  {state.name}
                </p>
                <p className="flex items-center gap-0.5 text-[10px] text-white/80">
                  <MapPin className="h-2.5 w-2.5" />
                  Discover temples
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Article + Gita verse */}
      <ArticleVerse />

      {/* AI Guru */}
      <AIGuruBanner />
    </div>
  );
}
