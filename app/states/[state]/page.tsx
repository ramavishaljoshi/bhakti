import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { RelatedLinks, type RelatedGroup } from "@/components/shared/related-links";
import {
  getAllStates,
  getStateBySlug,
  getTemplesByState,
} from "@/lib/data/temples";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export function generateStaticParams() {
  return getAllStates().map((s) => ({ state: s.slug }));
}

export function generateMetadata({ params }: { params: { state: string } }) {
  const s = getStateBySlug(params.state);
  if (!s)
    return buildMetadata({
      title: "Temples by State",
      description: "Hindu temples in this state — deities, timings and darshan guide.",
      path: `/states/${params.state}`,
    });
  return buildMetadata({
    title: `Temples in ${s.name} — Famous Mandirs & Darshan Guide`,
    description: `Discover ${s.count} famous Hindu temples in ${s.name} — their deities, history, timings and how to reach. ${s.name} ke pramukh mandir ek jagah.`.slice(0, 155),
    path: `/states/${s.slug}`,
    keywords: [
      `temples in ${s.name.toLowerCase()}`,
      `${s.name.toLowerCase()} mandir`,
      `famous temples ${s.name.toLowerCase()}`,
      "darshan guide",
    ],
  });
}

export default function StateDetailPage({
  params,
}: {
  params: { state: string };
}) {
  const state = getStateBySlug(params.state);
  if (!state) notFound();
  const stateTemples = getTemplesByState(state.name);

  const otherStates = getAllStates()
    .filter((s) => s.slug !== state.slug)
    .slice(0, 8)
    .map((s) => ({ label: s.name, href: `/states/${s.slug}` }));
  const relatedGroups: RelatedGroup[] = [
    { title: "Other states", items: otherStates },
  ];

  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "States", path: "/states" },
          { name: state.name, path: `/states/${state.slug}` },
        ])}
      />
      <PageHeader
        title={`Temples in ${state.name}`}
        description={`${state.count} sacred ${
          state.count === 1 ? "temple" : "temples"
        } across ${state.name} — deities, timings and how to visit.`}
        backHref="/states"
        icon={<MapPin className="h-6 w-6" />}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stateTemples.map((t) => (
          <Link
            key={t.id}
            href={`/temples/${t.slug}`}
            className="group block overflow-hidden rounded-4xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg"
          >
            <div className="relative aspect-[16/11] overflow-hidden bg-secondary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.image}
                alt={`${t.name}, ${t.city}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-saffron-700 shadow-sm backdrop-blur dark:bg-black/50 dark:text-saffron-300">
                {t.deity}
              </span>
            </div>
            <div className="space-y-2 p-5">
              <h2 className="font-display text-lg font-bold tracking-tight">
                {t.name}
              </h2>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-saffron-500" />
                {t.city}, {t.state}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 shrink-0 text-saffron-500" />
                {t.timings}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <RelatedLinks heading="Explore other states" groups={relatedGroups} />
    </div>
  );
}
