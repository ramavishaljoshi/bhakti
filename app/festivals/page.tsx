import Link from "next/link";
import { Sparkles, CalendarDays, UtensilsCrossed } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { festivals } from "@/lib/data/festivals";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

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
    </div>
  );
}
