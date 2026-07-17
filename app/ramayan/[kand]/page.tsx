import { notFound } from "next/navigation";
import { SectionDetail } from "@/components/scripture/section-detail";
import { ramayanKands, getKand } from "@/lib/data/ramayan";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return ramayanKands.map((k) => ({ kand: k.slug }));
}

export function generateMetadata({ params }: { params: { kand: string } }) {
  const k = getKand(params.kand);
  if (!k)
    return buildMetadata({
      title: "Ramayan Kand",
      description: "Read this kand of the Ramayan with its katha and shlokas.",
      path: `/ramayan/${params.kand}`,
    });
  return buildMetadata({
    title: `${k.name} — Katha, Prasang & Shlok`,
    description: `${k.translation}. ${k.summary}`.slice(0, 155),
    path: `/ramayan/${k.slug}`,
    type: "article",
    keywords: [
      k.name.toLowerCase(),
      `ramayan ${k.name.toLowerCase()}`,
      k.translation.toLowerCase(),
      "ramayan katha",
    ],
  });
}

export default function RamayanKandPage({
  params,
}: {
  params: { kand: string };
}) {
  const kand = getKand(params.kand);
  if (!kand) notFound();

  return (
    <SectionDetail
      section={kand}
      sections={ramayanKands}
      basePath="/ramayan"
      bookName="Ramayan"
      unitLabel="sargas"
    />
  );
}
