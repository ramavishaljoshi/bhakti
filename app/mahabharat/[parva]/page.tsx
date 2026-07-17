import { notFound } from "next/navigation";
import { SectionDetail } from "@/components/scripture/section-detail";
import { mahabharatParvas, getParva } from "@/lib/data/mahabharat";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return mahabharatParvas.map((p) => ({ parva: p.slug }));
}

export function generateMetadata({ params }: { params: { parva: string } }) {
  const p = getParva(params.parva);
  if (!p)
    return buildMetadata({
      title: "Mahabharat Parva",
      description:
        "Read this parva of the Mahabharat with its katha and shlokas.",
      path: `/mahabharat/${params.parva}`,
    });
  return buildMetadata({
    title: `${p.name} — Katha, Prasang & Shlok`,
    description: `${p.translation}. ${p.summary}`.slice(0, 155),
    path: `/mahabharat/${p.slug}`,
    type: "article",
    keywords: [
      p.name.toLowerCase(),
      `mahabharat ${p.name.toLowerCase()}`,
      p.translation.toLowerCase(),
      "mahabharat katha",
    ],
  });
}

export default function MahabharatParvaPage({
  params,
}: {
  params: { parva: string };
}) {
  const parva = getParva(params.parva);
  if (!parva) notFound();

  return (
    <SectionDetail
      section={parva}
      sections={mahabharatParvas}
      basePath="/mahabharat"
      bookName="Mahabharat"
      unitLabel="adhyayas"
    />
  );
}
