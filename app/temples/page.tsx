import Link from "next/link";
import { Landmark, MapPin, Clock, CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { temples } from "@/lib/data/temples";

export const metadata = { title: "Sacred Temples — Bhakti" };

export default function TemplesPage() {
  return (
    <div className="container py-6 lg:py-10">
      <PageHeader
        title="Sacred Temples"
        description="Discover India's most revered temples — their deities, history, timings and how to visit."
        icon={<Landmark className="h-6 w-6" />}
      />

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
    </div>
  );
}
