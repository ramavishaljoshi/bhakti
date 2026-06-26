import Image from "next/image";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Sparkles,
  ListChecks,
  Music,
  UtensilsCrossed,
  HelpCircle,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { festivals, getFestivalBySlug } from "@/lib/data/festivals";

export function generateStaticParams() {
  return festivals.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const f = getFestivalBySlug(params.slug);
  return { title: f ? `${f.name} — Bhakti` : "Festival — Bhakti" };
}

export default function FestivalDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const festival = getFestivalBySlug(params.slug);
  if (!festival) notFound();

  return (
    <div className="container py-6 lg:py-10">
      <PageHeader title={festival.name} backHref="/festivals" />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Hero image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-4xl border border-border shadow-soft lg:sticky lg:top-6 lg:self-start">
          <Image
            src={festival.image}
            alt={festival.name}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute right-4 top-4">
            <FavoriteButton
              item={{
                type: "festival",
                id: festival.id,
                title: festival.name,
                href: `/festivals/${festival.slug}`,
              }}
            />
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <p className="flex items-center gap-1.5 text-white/90">
              <CalendarDays className="h-4 w-4" /> {festival.date}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <Section title="The Story" icon={<Sparkles className="h-4 w-4" />}>
            <p className="leading-relaxed text-muted-foreground">
              {festival.story}
            </p>
          </Section>

          <Section title="Why We Celebrate">
            <p className="rounded-2xl bg-secondary/50 px-4 py-3 leading-relaxed text-muted-foreground">
              {festival.whyCelebrate}
            </p>
          </Section>

          {festival.pujaVidhi?.length > 0 && (
            <Section title="Puja Vidhi" icon={<ListChecks className="h-4 w-4" />}>
              <ol className="space-y-2">
                {festival.pujaVidhi.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-saffron-100 text-xs font-bold text-saffron-700 dark:bg-saffron-900/30 dark:text-saffron-300">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Section>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            {festival.bhajans?.length > 0 && (
              <InfoTile
                icon={<Music className="h-4 w-4" />}
                label="Bhajans"
                value={festival.bhajans.join(", ")}
              />
            )}
            {festival.food?.length > 0 && (
              <InfoTile
                icon={<UtensilsCrossed className="h-4 w-4" />}
                label="Festive Food"
                value={festival.food.join(", ")}
              />
            )}
          </div>
        </div>
      </div>

      {/* FAQs */}
      {festival.faqs?.length > 0 && (
        <div className="mt-12 max-w-3xl">
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold">
            <HelpCircle className="h-5 w-5 text-saffron-500" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {festival.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-3xl border border-border bg-card p-5 shadow-soft"
              >
                <p className="font-semibold">{faq.q}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-2 flex items-center gap-2 font-display text-lg font-semibold">
        {icon && <span className="text-saffron-500">{icon}</span>}
        {title}
      </h2>
      {children}
    </div>
  );
}

function InfoTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-saffron-600 dark:text-saffron-400">
        {icon} {label}
      </p>
      <p className="text-sm">{value}</p>
    </div>
  );
}
