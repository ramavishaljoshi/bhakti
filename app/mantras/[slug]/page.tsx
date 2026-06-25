import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Play,
  Headphones,
  Sparkles,
  Clock,
  CalendarDays,
  Landmark,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/shared/favorite-button";
import { MantraCard } from "@/components/cards/mantra-card";
import { mantras, getMantraBySlug, getMantrasByCategory } from "@/lib/data/mantras";

export function generateStaticParams() {
  return mantras.map((m) => ({ slug: m.slug }));
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

  return (
    <div className="container py-6 lg:py-10">
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

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/jap?mantra=${mantra.slug}`}
              className="inline-flex h-12 items-center gap-2 rounded-2xl bg-saffron-gradient px-6 font-semibold text-white shadow-glow transition-transform active:scale-95"
            >
              <Play className="h-4 w-4 fill-white" /> Start Jap
            </Link>
            <button className="inline-flex h-12 items-center gap-2 rounded-2xl border border-border bg-card px-6 font-semibold transition-colors hover:bg-secondary">
              <Headphones className="h-4 w-4" /> Listen
            </button>
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
