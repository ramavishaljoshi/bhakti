import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Play,
  Sparkles,
  Clock,
  CalendarDays,
  Landmark,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { MantraListenButton } from "@/components/shared/mantra-listen-button";
import { MantraCard } from "@/components/cards/mantra-card";
import { mantras, getMantraBySlug, getMantrasByCategory } from "@/lib/data/mantras";
import { getGodByName } from "@/lib/data/gods";
import { getFestivalByName } from "@/lib/data/festivals";
import { getTempleByName } from "@/lib/data/temples";
import { getIntentionById } from "@/lib/data/intentions";
import {
  RelatedLinks,
  type RelatedGroup,
} from "@/components/shared/related-links";
import { QuickAnswer } from "@/components/shared/quick-answer";
import { KeyFacts } from "@/components/shared/key-facts";
import { EditorialNote } from "@/components/shared/editorial-note";
import {
  buildMetadata,
  breadcrumbSchema,
  articleSchema,
  speakableSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export function generateStaticParams() {
  return mantras.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const m = getMantraBySlug(params.slug);
  if (!m) return buildMetadata({ title: "Mantra", description: "Hindu mantra with meaning and pronunciation.", path: `/mantras/${params.slug}` });
  return buildMetadata({
    title: `${m.name} — Meaning, Pronunciation & Benefits`,
    description: `${m.name} (${m.transliteration}): ${m.meaning}`.slice(0, 155),
    path: `/mantras/${m.slug}`,
    image: m.image,
    type: "article",
    keywords: [
      m.name.toLowerCase(),
      `${m.deity.toLowerCase()} mantra`,
      `${m.name.toLowerCase()} meaning`,
      `${m.name.toLowerCase()} benefits`,
      "mantra jap",
    ],
  });
}

export default function MantraDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const mantra = getMantraBySlug(params.slug);
  if (!mantra) notFound();

  const related = getMantrasByCategory(mantra.category)
    .filter((m) => m.id !== mantra.id)
    .slice(0, 4);

  // Build the cross-entity related graph from this mantra's relation fields.
  const god = getGodByName(mantra.deity);
  const festival = mantra.relatedFestival
    ? getFestivalByName(mantra.relatedFestival)
    : undefined;
  const temple = mantra.relatedTemple
    ? getTempleByName(mantra.relatedTemple)
    : undefined;
  const relatedGroups: RelatedGroup[] = [
    {
      title: "God",
      items: god ? [{ label: god.name, href: `/gods/${god.slug}` }] : [],
    },
    {
      title: "Festival",
      items: festival
        ? [{ label: festival.name, href: `/festivals/${festival.slug}` }]
        : [],
    },
    {
      title: "Temple",
      items: temple
        ? [{ label: temple.name, href: `/temples/${temple.slug}` }]
        : [],
    },
    {
      title: "Intentions",
      items: mantra.intentions
        .map((id) => getIntentionById(id))
        .filter((i): i is NonNullable<typeof i> => Boolean(i))
        .map((i) => ({ label: i.label, href: `/intentions/${i.id}` })),
    },
  ];

  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Mantras", path: "/mantras" },
            { name: mantra.name, path: `/mantras/${mantra.slug}` },
          ]),
          articleSchema({
            headline: `${mantra.name} — Meaning, Pronunciation & Benefits`,
            description: mantra.meaning,
            path: `/mantras/${mantra.slug}`,
            image: mantra.image,
          }),
          speakableSchema(`/mantras/${mantra.slug}`),
        ]}
      />
      <PageHeader title={mantra.name} backHref="/mantras" />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Hero image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-4xl border border-border shadow-soft lg:sticky lg:top-6 lg:self-start">
          <Image
            src={mantra.image}
            alt={mantra.name}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute right-4 top-4">
            <FavoriteButton
              item={{
                type: "mantra",
                id: mantra.id,
                title: mantra.name,
                href: `/mantras/${mantra.slug}`,
              }}
            />
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <p className="font-display text-3xl font-bold text-white drop-shadow">
              {mantra.sanskrit}
            </p>
            <p className="mt-1 text-white/85">{mantra.transliteration}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge>{mantra.deity}</Badge>
            <Badge variant="muted">{mantra.category}</Badge>
          </div>

          <QuickAnswer label={`What is the ${mantra.name}?`}>
            {mantra.name} ({mantra.transliteration}) is a {mantra.category}{" "}
            mantra dedicated to {mantra.deity}. {mantra.meaning}
          </QuickAnswer>

          <KeyFacts
            facts={[
              { label: "Deity", value: mantra.deity },
              { label: "Category", value: mantra.category },
              { label: "When to chant", value: mantra.whenToChant },
              {
                label: "Repetitions",
                value: mantra.count ? `${mantra.count} (one mala)` : undefined,
              },
              { label: "Related festival", value: mantra.relatedFestival },
            ]}
          />

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/jap?mantra=${mantra.slug}`}
              className="inline-flex h-12 items-center gap-2 rounded-2xl bg-saffron-gradient px-6 font-semibold text-white shadow-glow transition-transform active:scale-95"
            >
              <Play className="h-4 w-4 fill-white" /> Start Jap
            </Link>
            <MantraListenButton src={mantra.audio} />
            {mantra.aarti?.audio && (
              <MantraListenButton src={mantra.aarti.audio} noun="aarti" />
            )}
          </div>

          <Section title="Meaning" icon={<Sparkles className="h-4 w-4" />}>
            <p className="leading-relaxed text-muted-foreground">{mantra.meaning}</p>
          </Section>

          <Section title="Pronunciation">
            <p className="rounded-2xl bg-secondary px-4 py-3 font-medium">
              {mantra.pronunciation}
            </p>
          </Section>

          <Section title="Benefits (Traditional Beliefs)">
            <ul className="space-y-2">
              {mantra.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-saffron-500" />
                  {b}
                </li>
              ))}
            </ul>
          </Section>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoTile
              icon={<Clock className="h-4 w-4" />}
              label="When to Chant"
              value={mantra.whenToChant}
            />
            {mantra.relatedFestival && (
              <InfoTile
                icon={<CalendarDays className="h-4 w-4" />}
                label="Related Festival"
                value={mantra.relatedFestival}
              />
            )}
            {mantra.relatedTemple && (
              <InfoTile
                icon={<Landmark className="h-4 w-4" />}
                label="Related Temple"
                value={mantra.relatedTemple}
              />
            )}
          </div>
        </div>
      </div>

      <RelatedLinks groups={relatedGroups} />

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 font-display text-xl font-bold">
            More {mantra.category} Mantras
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((m) => (
              <MantraCard key={m.id} mantra={m} />
            ))}
          </div>
        </div>
      )}

      <EditorialNote />
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
