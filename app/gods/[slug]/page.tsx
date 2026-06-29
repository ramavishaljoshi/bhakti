import Image from "next/image";
import { notFound } from "next/navigation";
import { Sparkles, BookOpen, Star } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { FaqSection } from "@/components/shared/faq-section";
import { RelatedLinks, type RelatedGroup } from "@/components/shared/related-links";
import { gods, getGodBySlug } from "@/lib/data/gods";
import { getFestivalByName } from "@/lib/data/festivals";
import { getTempleByName } from "@/lib/data/temples";
import { getMantraBySlug } from "@/lib/data/mantras";
import {
  buildMetadata,
  breadcrumbSchema,
  articleSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export function generateStaticParams() {
  return gods.map((g) => ({ slug: g.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const g = getGodBySlug(params.slug);
  if (!g)
    return buildMetadata({
      title: "Hindu God",
      description: "Hindu deity — story, symbols, mantras and significance.",
      path: `/gods/${params.slug}`,
    });
  return buildMetadata({
    title: `${g.name} — Story, Symbols, Mantras & Significance`,
    description: `${g.name}, ${g.title}. ${g.introduction}`.slice(0, 155),
    path: `/gods/${g.slug}`,
    image: g.image,
    type: "article",
    keywords: [
      g.name.toLowerCase(),
      g.slug,
      `${g.slug} mantra`,
      `${g.slug} story`,
      `${g.slug} symbols`,
    ],
  });
}

export default function GodDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const god = getGodBySlug(params.slug);
  if (!god) notFound();

  // Resolve cross-entity relations into linkable items.
  const festivalItems = god.festivals.map((name) => {
    const f = getFestivalByName(name);
    return { label: name, href: f ? `/festivals/${f.slug}` : "/festivals" };
  });
  const templeItems = god.temples.map((name) => {
    const t = getTempleByName(name);
    return { label: name, href: t ? `/temples/${t.slug}` : "/temples" };
  });
  const mantraItems = god.mantras
    .map((slug) => getMantraBySlug(slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m))
    .map((m) => ({ label: m.name, href: `/mantras/${m.slug}` }));

  const relatedGroups: RelatedGroup[] = [
    { title: "Festivals", items: festivalItems },
    { title: "Temples", items: templeItems },
    { title: "Mantras", items: mantraItems },
    { title: "Scriptures", items: [{ label: "Bhagavad Gita", href: "/gita" }] },
  ];

  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Gods", path: "/gods" },
            { name: god.name, path: `/gods/${god.slug}` },
          ]),
          articleSchema({
            headline: `${god.name} — ${god.title}`,
            description: god.introduction,
            path: `/gods/${god.slug}`,
            image: god.image,
          }),
          // FAQPage schema is emitted by the visible <FaqSection> below.
        ]}
      />
      <PageHeader title={god.name} backHref="/gods" />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Hero image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-4xl border border-border shadow-soft lg:sticky lg:top-6 lg:self-start">
          <Image
            src={god.image}
            alt={`${god.name} — ${god.title}`}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <p className="font-display text-2xl font-bold text-white drop-shadow">
              {god.name}
            </p>
            <p className="text-white/85">{god.title}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          {/* Quick answer (AI-friendly) */}
          <div className="rounded-3xl border border-border bg-secondary/40 p-5">
            <p className="leading-relaxed text-muted-foreground">
              {god.introduction}
            </p>
          </div>

          <Section title="Story" icon={<Sparkles className="h-4 w-4" />}>
            <p className="leading-relaxed text-muted-foreground">{god.story}</p>
          </Section>

          {god.symbols?.length > 0 && (
            <Section title="Symbols" icon={<Star className="h-4 w-4" />}>
              <div className="flex flex-wrap gap-2">
                {god.symbols.map((s) => (
                  <Badge key={s} variant="muted">
                    {s}
                  </Badge>
                ))}
              </div>
            </Section>
          )}

          <Section title="Scriptures" icon={<BookOpen className="h-4 w-4" />}>
            <p className="leading-relaxed text-muted-foreground">
              Explore the timeless wisdom connected to {god.name} in the{" "}
              <a href="/gita" className="font-medium text-saffron-600 hover:underline dark:text-saffron-400">
                Bhagavad Gita
              </a>
              .
            </p>
          </Section>
        </div>
      </div>

      {/* Related entity graph */}
      <RelatedLinks groups={relatedGroups} />

      {/* FAQ */}
      {god.faqs?.length > 0 && (
        <div className="mt-12">
          <FaqSection
            title={`${god.name} — Frequently Asked Questions`}
            faqs={god.faqs}
          />
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
