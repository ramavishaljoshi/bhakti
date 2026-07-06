import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import { MantraCard } from "@/components/cards/mantra-card";
import { Disclaimer } from "@/components/shared/disclaimer";
import { EmptyState } from "@/components/shared/empty-state";
import { QuickAnswer } from "@/components/shared/quick-answer";
import { KeyFacts } from "@/components/shared/key-facts";
import { FaqSection } from "@/components/shared/faq-section";
import { RelatedLinks } from "@/components/shared/related-links";
import {
  intentions,
  getIntentionById,
  INTENTION_DISCLAIMER,
} from "@/lib/data/intentions";
import { getMantraBySlug } from "@/lib/data/mantras";
import { intentionRelations } from "@/lib/related";
import {
  buildMetadata,
  breadcrumbSchema,
  articleSchema,
  howToSchema,
  itemListSchema,
  speakableSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export function generateStaticParams() {
  return intentions.map((i) => ({ slug: i.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const intention = getIntentionById(params.slug);
  if (!intention)
    return buildMetadata({
      title: "Mantras by Purpose",
      description: "Discover mantras traditionally associated with your intention.",
      path: `/intentions/${params.slug}`,
    });
  const firstMantra = getMantraBySlug(intention.mantraIds[0]);
  const title = intention.seoTitle ?? `Mantras for ${intention.label}`;
  const description = (intention.intro ?? intention.description).slice(0, 155);
  return buildMetadata({
    title,
    description,
    path: `/intentions/${intention.id}`,
    image: firstMantra?.image,
    type: "article",
    keywords:
      intention.keywords ?? [
        `mantra for ${intention.label.toLowerCase()}`,
        `mantras for ${intention.label.toLowerCase()}`,
        "mantra jap",
      ],
  });
}

export default function IntentionDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const intention = getIntentionById(params.slug);
  if (!intention) notFound();

  const recommended = intention.mantraIds
    .map((id) => getMantraBySlug(id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  const top = recommended[0];
  const deities = Array.from(new Set(recommended.map((m) => m.deity)));
  const faqs = intention.faqs ?? [];
  const relatedGroups = intentionRelations(intention);

  // "People also look for" — sibling purposes, ranked by shared mantras.
  const relatedIntentions = intentions
    .filter((i) => i.id !== intention.id)
    .map((i) => ({
      i,
      overlap: i.mantraIds.filter((m) => intention.mantraIds.includes(m)).length,
    }))
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 6)
    .map((x) => x.i);

  // Purpose-aware "how to chant" steps (also emitted as HowTo schema).
  const howToSteps = [
    {
      name: "Choose your mantra",
      text: top
        ? `Pick one mantra from the list below. For ${intention.label.toLowerCase()}, ${top.name} is the most recommended.`
        : "Pick one mantra from the recommended list below.",
    },
    {
      name: "Set your intention",
      text: `Sit comfortably with a straight spine, close your eyes, and hold your intention for ${intention.label.toLowerCase()} in mind.`,
    },
    {
      name: "Chant one mala",
      text: "Repeat the mantra 108 times using a mala, keeping a slow, steady breath and clear pronunciation.",
    },
    {
      name: "Practise daily",
      text: top?.whenToChant
        ? `${top.whenToChant} Regular daily practice is what deepens the effect.`
        : "Chant each morning. Regular daily practice is what deepens the effect.",
    },
  ];

  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Mantras by Purpose", path: "/intentions" },
            { name: intention.label, path: `/intentions/${intention.id}` },
          ]),
          articleSchema({
            headline: intention.seoTitle ?? `Mantras for ${intention.label}`,
            description: intention.intro ?? intention.description,
            path: `/intentions/${intention.id}`,
            image: top?.image,
          }),
          howToSchema({
            name: `How to chant a mantra for ${intention.label.toLowerCase()}`,
            description: intention.intro ?? intention.description,
            steps: howToSteps,
            path: `/intentions/${intention.id}`,
          }),
          ...(recommended.length
            ? [
                itemListSchema(
                  recommended.map((m) => ({ name: m.name, path: `/mantras/${m.slug}` })),
                  { name: `Recommended mantras for ${intention.label}` }
                ),
              ]
            : []),
          // NB: FAQPage schema is emitted by <FaqSection> below — don't
          // duplicate it here.
          speakableSchema(`/intentions/${intention.id}`),
        ]}
      />

      <PageHeader
        title={`Mantras for ${intention.label}`}
        backHref="/intentions"
      />

      {/* Hero panel — dark scrim + drop-shadow keeps white text AA-legible on
          the lighter gradients (contrast fix). */}
      <div
        className={cn(
          "relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-white shadow-soft",
          intention.color
        )}
      >
        <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
        <div className="relative flex items-center gap-4">
          <span className="text-4xl" aria-hidden="true">
            {intention.emoji}
          </span>
          <div className="[text-shadow:0_1px_2px_rgba(0,0,0,0.4)]">
            <h2 className="font-display text-xl font-bold">{intention.label}</h2>
            <p className="text-white">{intention.description}</p>
          </div>
        </div>
      </div>

      {/* AEO summary box + Key Facts */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <QuickAnswer label={`Mantras for ${intention.label}`}>
            {intention.intro ?? intention.description}
          </QuickAnswer>
          {top && (
            <p className="text-muted-foreground">
              The most recommended mantra for {intention.label.toLowerCase()} is{" "}
              <Link
                href={`/mantras/${top.slug}`}
                className="font-medium text-foreground underline decoration-saffron-400 underline-offset-2"
              >
                {top.name}
              </Link>
              {top.transliteration ? ` (${top.transliteration})` : ""}.
            </p>
          )}
        </div>
        <KeyFacts
          facts={[
            { label: "Purpose", value: intention.label },
            { label: "Deities", value: deities.join(", ") },
            { label: "Top mantra", value: top?.name },
            { label: "Best time", value: top?.whenToChant },
            { label: "Repetitions", value: "108 (one mala)" },
          ]}
        />
      </div>

      <div className="my-6">
        <Disclaimer text={INTENTION_DISCLAIMER} />
      </div>

      {/* Recommended mantras */}
      <h2 className="mb-4 font-display text-xl font-bold tracking-tight sm:text-2xl">
        Recommended Mantras for {intention.label}
      </h2>
      {recommended.length === 0 ? (
        <EmptyState
          title="No mantras yet"
          description="We're adding more mantras for this intention."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {recommended.map((m) => (
            <MantraCard key={m.id} mantra={m} />
          ))}
        </div>
      )}

      {/* How to chant (HowTo) */}
      <section aria-labelledby="howto-heading" className="mt-12">
        <h2
          id="howto-heading"
          className="mb-4 flex items-center gap-2 font-display text-xl font-bold tracking-tight sm:text-2xl"
        >
          <Sparkles className="h-5 w-5 text-saffron-500" aria-hidden="true" />
          How to Chant for {intention.label}
        </h2>
        <ol className="space-y-3">
          {howToSteps.map((s, i) => (
            <li key={s.name} className="flex gap-3 rounded-2xl border border-border bg-card p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-saffron-100 text-sm font-bold text-saffron-700 dark:bg-saffron-900/40 dark:text-saffron-300">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ (also emits FAQPage schema) */}
      {faqs.length > 0 && (
        <div className="mt-12">
          <FaqSection
            title={`${intention.label} Mantras — FAQ`}
            faqs={faqs}
          />
        </div>
      )}

      {/* People also look for */}
      {relatedIntentions.length > 0 && (
        <section aria-labelledby="paa-heading" className="mt-12">
          <h2
            id="paa-heading"
            className="mb-4 font-display text-xl font-bold tracking-tight sm:text-2xl"
          >
            People Also Look For
          </h2>
          <ul className="flex flex-wrap gap-2 p-0">
            {relatedIntentions.map((i) => (
              <li key={i.id} className="list-none">
                <Link
                  href={`/intentions/${i.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-saffron-400 hover:text-saffron-600 dark:hover:text-saffron-400"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-saffron-500" aria-hidden="true" />
                  Mantras for {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Full internal-linking graph */}
      <RelatedLinks heading="Explore related" groups={relatedGroups} />
    </div>
  );
}
