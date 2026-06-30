import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Clock, Shirt, CalendarDays, Route, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/shared/favorite-button";
import {
  temples,
  getTempleBySlug,
  getTemplesByState,
} from "@/lib/data/temples";
import { getGodByName } from "@/lib/data/gods";
import { getFestivalByName } from "@/lib/data/festivals";
import { mantras } from "@/lib/data/mantras";
import {
  RelatedLinks,
  type RelatedGroup,
} from "@/components/shared/related-links";
import { QuickAnswer } from "@/components/shared/quick-answer";
import { EditorialNote } from "@/components/shared/editorial-note";
import {
  buildMetadata,
  breadcrumbSchema,
  absoluteUrl,
  speakableSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export function generateStaticParams() {
  return temples.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const t = getTempleBySlug(params.slug);
  if (!t)
    return buildMetadata({
      title: "Temple",
      description: "Hindu temple — history, timings and how to reach.",
      path: `/temples/${params.slug}`,
    });
  return buildMetadata({
    title: `${t.name}, ${t.city} — History, Timings & Darshan`,
    description: `${t.name} in ${t.city}, ${t.state} — ${t.history}`.slice(0, 155),
    path: `/temples/${t.slug}`,
    image: t.image,
    type: "article",
    keywords: [
      t.name.toLowerCase(),
      `${t.name.toLowerCase()} timings`,
      `${t.name.toLowerCase()} history`,
      `${t.deity.toLowerCase()} temple`,
      `temples in ${t.state.toLowerCase()}`,
    ],
  });
}

function templeSchema(t: NonNullable<ReturnType<typeof getTempleBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: t.name,
    description: t.history,
    image: absoluteUrl(t.image),
    url: absoluteUrl(`/temples/${t.slug}`),
    address: {
      "@type": "PostalAddress",
      addressLocality: t.city,
      addressRegion: t.state,
      addressCountry: "IN",
    },
    openingHours: t.timings,
    isAccessibleForFree: true,
  };
}

export default function TempleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const temple = getTempleBySlug(params.slug);
  if (!temple) notFound();

  // Cross-entity related graph for this temple.
  const god = getGodByName(temple.deity);
  const relatedGroups: RelatedGroup[] = [
    {
      title: "God",
      items: god ? [{ label: god.name, href: `/gods/${god.slug}` }] : [],
    },
    {
      title: "Festivals",
      items: (temple.festivals ?? [])
        .map((name) => ({ name, f: getFestivalByName(name) }))
        .filter((x) => x.f)
        .map((x) => ({ label: x.name, href: `/festivals/${x.f!.slug}` })),
    },
    {
      title: "Mantras",
      items: mantras
        .filter((m) => m.deity.toLowerCase() === temple.deity.toLowerCase())
        .slice(0, 5)
        .map((m) => ({ label: m.name, href: `/mantras/${m.slug}` })),
    },
    {
      title: `More in ${temple.state}`,
      items: getTemplesByState(temple.state)
        .filter((t) => t.slug !== temple.slug)
        .slice(0, 5)
        .map((t) => ({ label: t.name, href: `/temples/${t.slug}` })),
    },
  ];

  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Temples", path: "/temples" },
            { name: temple.name, path: `/temples/${temple.slug}` },
          ]),
          templeSchema(temple),
          speakableSchema(`/temples/${temple.slug}`),
        ]}
      />
      <PageHeader title={temple.name} backHref="/temples" />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Hero image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-4xl border border-border shadow-soft lg:sticky lg:top-6 lg:self-start">
          <Image
            src={temple.image}
            alt={temple.name}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute right-4 top-4">
            <FavoriteButton
              item={{
                type: "temple",
                id: temple.id,
                title: temple.name,
                href: `/temples/${temple.slug}`,
              }}
            />
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <p className="flex items-center gap-1.5 text-white/90">
              <MapPin className="h-4 w-4" /> {temple.city}, {temple.state}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge>{temple.deity}</Badge>
            <Badge variant="muted">{temple.state}</Badge>
          </div>

          <QuickAnswer label={`About ${temple.name}`}>
            {temple.name} is a revered Hindu temple dedicated to {temple.deity},
            located in {temple.city}, {temple.state}. It is open {temple.timings}
            .
          </QuickAnswer>

          <Section title="History" icon={<Sparkles className="h-4 w-4" />}>
            <p className="leading-relaxed text-muted-foreground">
              {temple.history}
            </p>
          </Section>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoTile
              icon={<Clock className="h-4 w-4" />}
              label="Timings"
              value={temple.timings}
            />
            <InfoTile
              icon={<Shirt className="h-4 w-4" />}
              label="Dress Code"
              value={temple.dressCode}
            />
            <InfoTile
              icon={<CalendarDays className="h-4 w-4" />}
              label="Best Time to Visit"
              value={temple.bestTime}
            />
            <InfoTile
              icon={<Route className="h-4 w-4" />}
              label="How to Reach"
              value={temple.howToReach}
            />
          </div>

          {temple.festivals?.length > 0 && (
            <Section
              title="Festivals"
              icon={<CalendarDays className="h-4 w-4" />}
            >
              <div className="flex flex-wrap gap-2">
                {temple.festivals.map((f) => (
                  <Badge key={f} variant="muted">
                    {f}
                  </Badge>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>

      {/* Gallery */}
      {temple.gallery?.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 font-display text-xl font-bold">Gallery</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {temple.gallery.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-3xl border border-border"
              >
                <Image
                  src={src}
                  alt={`${temple.name}, ${temple.city} — view ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <RelatedLinks groups={relatedGroups} />

      <EditorialNote sources="temple records and traditional Hindu accounts" />
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
