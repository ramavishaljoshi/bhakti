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
import { computePanchang } from "@/lib/panchang";

export default function HomePage() {
  const todayMantra = mantras[0];
  const exploreTemples = temples.slice(0, 4);
  const featuredFestivals = festivals.slice(0, 4);
  // Computed on the server at build time so `mhah-panchang` stays out of the
  // client bundle; the card refines it from Supabase on the client if present.
  const panchang = computePanchang(new Date());

  return (
    <div className="container space-y-10 py-6 lg:py-8">
      {/* Greeting hero */}
      <GreetingHero />

      {/* Ticker */}
      <Ticker />

      {/* Today's Progress: Jap card + Today's Panchang */}
      <section className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <JapProgressCard mantraName={todayMantra.name} />
        <PanchangCard initial={panchang} />
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
