import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Sparkles,
  ListChecks,
  HeartHandshake,
  Utensils,
  Ban,
  HelpCircle,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { vrats, getVratBySlug } from "@/lib/data/vrat";

export function generateStaticParams() {
  return vrats.map((v) => ({ slug: v.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const v = getVratBySlug(params.slug);
  if (!v) return { title: "Vrat — Bhakti" };
  return {
    title: `${v.name} — Vidhi, Niyam & Benefits`,
    description: v.excerpt,
    alternates: { canonical: `/vrat/${v.slug}` },
    openGraph: {
      title: v.name,
      description: v.excerpt,
      type: "article",
      images: [v.image],
    },
  };
}

export default function VratDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const vrat = getVratBySlug(params.slug);
  if (!vrat) notFound();

  // HowTo schema for the vidhi steps — eligible for rich results.
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to observe ${vrat.name}`,
    description: vrat.significance,
    image: vrat.image,
    step: vrat.vidhi.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: step,
    })),
  };

  const faqJsonLd =
    vrat.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: vrat.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <div className="container py-6 lg:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <PageHeader title={vrat.name} backHref="/vrat" />

      <article className="mx-auto max-w-3xl">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <Badge>{vrat.deity}</Badge>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 text-saffron-500" />
            {vrat.observedOn}
          </span>
        </div>

        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-4xl border border-border shadow-soft">
          <Image
            src={vrat.image}
            alt={vrat.name}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <Section title="Significance" icon={<Sparkles className="h-4 w-4" />}>
          <p className="leading-relaxed text-muted-foreground">
            {vrat.significance}
          </p>
        </Section>

        <Section title="Vrat Vidhi (How to Observe)" icon={<ListChecks className="h-4 w-4" />}>
          <ol className="space-y-2">
            {vrat.vidhi.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-saffron-100 text-xs font-bold text-saffron-700 dark:bg-saffron-900/30 dark:text-saffron-300">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Benefits" icon={<HeartHandshake className="h-4 w-4" />}>
          <ul className="space-y-2">
            {vrat.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-500" />
                {b}
              </li>
            ))}
          </ul>
        </Section>

        <div className="my-6 grid gap-3 sm:grid-cols-2">
          <FoodTile
            icon={<Utensils className="h-4 w-4" />}
            label="What you can eat"
            items={vrat.foodAllowed}
            tone="allow"
          />
          <FoodTile
            icon={<Ban className="h-4 w-4" />}
            label="What to avoid"
            items={vrat.foodAvoid}
            tone="avoid"
          />
        </div>

        {vrat.faqs.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold">
              <HelpCircle className="h-5 w-5 text-saffron-500" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {vrat.faqs.map((faq, i) => (
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
      </article>
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
    <div className="mb-6">
      <h2 className="mb-2 flex items-center gap-2 font-display text-lg font-semibold">
        {icon && <span className="text-saffron-500">{icon}</span>}
        {title}
      </h2>
      {children}
    </div>
  );
}

function FoodTile({
  icon,
  label,
  items,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  items: string[];
  tone: "allow" | "avoid";
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
      <p
        className={
          "mb-2 flex items-center gap-1.5 text-sm font-semibold " +
          (tone === "allow"
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-rose-600 dark:text-rose-400")
        }
      >
        {icon} {label}
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {items.map((it) => (
          <li
            key={it}
            className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
          >
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
