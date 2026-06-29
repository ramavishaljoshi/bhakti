import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { gitaChapters, getChapter } from "@/lib/data/gita";
import {
  buildMetadata,
  breadcrumbSchema,
  absoluteUrl,
  SITE_NAME,
} from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export function generateStaticParams() {
  return gitaChapters.map((c) => ({ chapter: String(c.number) }));
}

export function generateMetadata({ params }: { params: { chapter: string } }) {
  const c = getChapter(Number(params.chapter));
  if (!c)
    return buildMetadata({
      title: "Bhagavad Gita Chapter",
      description: "Read this chapter of the Bhagavad Gita with meaning.",
      path: `/gita/${params.chapter}`,
    });
  return buildMetadata({
    title: `Gita Chapter ${c.number}: ${c.name} — Verses & Meaning`,
    description: `${c.translation}. ${c.summary}`.slice(0, 155),
    path: `/gita/${c.number}`,
    type: "article",
    keywords: [
      `bhagavad gita chapter ${c.number}`,
      c.name.toLowerCase(),
      c.translation.toLowerCase(),
      "gita verses meaning",
    ],
  });
}

export default function GitaChapterPage({
  params,
}: {
  params: { chapter: string };
}) {
  const chapter = getChapter(Number(params.chapter));
  if (!chapter) notFound();

  // Prev/next within the available chapters list (chapters aren't contiguous).
  const idx = gitaChapters.findIndex((c) => c.number === chapter.number);
  const prev = idx > 0 ? gitaChapters[idx - 1] : null;
  const next = idx < gitaChapters.length - 1 ? gitaChapters[idx + 1] : null;

  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Bhagavad Gita", path: "/gita" },
            { name: `Chapter ${chapter.number}`, path: `/gita/${chapter.number}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Chapter",
            name: `${chapter.name} — ${chapter.translation}`,
            position: chapter.number,
            isPartOf: { "@type": "Book", name: "Bhagavad Gita", url: absoluteUrl("/gita") },
            url: absoluteUrl(`/gita/${chapter.number}`),
            publisher: { "@type": "Organization", name: SITE_NAME },
          },
        ]}
      />
      <PageHeader
        title={`Chapter ${chapter.number}: ${chapter.name}`}
        backHref="/gita"
        icon={<BookOpen className="h-6 w-6" />}
      />

      {/* Summary box (AI-friendly quick answer) */}
      <div className="mb-8 rounded-3xl border border-border bg-secondary/40 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-saffron-600 dark:text-saffron-400">
          {chapter.translation} · {chapter.versesCount} verses
        </p>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          {chapter.summary}
        </p>
      </div>

      {/* Verses */}
      <div className="space-y-5">
        {chapter.verses.map((v) => (
          <div
            key={`${v.chapter}.${v.verse}`}
            className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6"
          >
            <p className="mb-2 text-xs font-bold text-saffron-600 dark:text-saffron-400">
              BG {v.chapter}.{v.verse}
            </p>
            <p className="font-display text-lg font-semibold leading-relaxed text-foreground">
              {v.sanskrit}
            </p>
            <p className="mt-2 text-sm italic text-muted-foreground">
              {v.transliteration}
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {v.meaning}
            </p>
          </div>
        ))}
      </div>

      {/* Prev / next */}
      <div className="mt-10 flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/gita/${prev.number}`}
            className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" /> Ch {prev.number}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/gita/${next.number}`}
            className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Ch {next.number} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
