import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import { MantraCard } from "@/components/cards/mantra-card";
import { Disclaimer } from "@/components/shared/disclaimer";
import { EmptyState } from "@/components/shared/empty-state";
import {
  intentions,
  getIntentionById,
  INTENTION_DISCLAIMER,
} from "@/lib/data/intentions";
import { getMantraBySlug } from "@/lib/data/mantras";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export function generateStaticParams() {
  return intentions.map((i) => ({ slug: i.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const intention = getIntentionById(params.slug);
  if (!intention)
    return buildMetadata({
      title: "Mantras by Intention",
      description: "Discover mantras traditionally associated with your intention.",
      path: `/intentions/${params.slug}`,
    });
  return buildMetadata({
    title: `Mantras for ${intention.label} — Chant for ${intention.label}`,
    description: `${intention.description} ${intention.label} ke liye sujhaaye gaye mantra — meaning aur vidhi ke saath.`.slice(0, 155),
    path: `/intentions/${intention.id}`,
    keywords: [
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
    .filter(Boolean);

  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Intentions", path: "/intentions" },
          { name: intention.label, path: `/intentions/${intention.id}` },
        ])}
      />
      <PageHeader title={`Mantras for ${intention.label}`} backHref="/intentions" />

      <div
        className={cn(
          "mb-6 flex items-center gap-4 rounded-3xl bg-gradient-to-br p-6 text-white shadow-soft",
          intention.color
        )}
      >
        <span className="text-4xl">{intention.emoji}</span>
        <div>
          <h2 className="font-display text-xl font-bold">{intention.label}</h2>
          <p className="text-white/90">{intention.description}</p>
        </div>
      </div>

      <div className="mb-6">
        <Disclaimer text={INTENTION_DISCLAIMER} />
      </div>

      <h3 className="mb-4 font-display text-lg font-semibold">
        Recommended Mantras
      </h3>

      {recommended.length === 0 ? (
        <EmptyState
          title="No mantras yet"
          description="We're adding more mantras for this intention."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {recommended.map(
            (m) => m && <MantraCard key={m.id} mantra={m} />
          )}
        </div>
      )}
    </div>
  );
}
