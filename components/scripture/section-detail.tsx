import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { JsonLd } from "@/components/shared/json-ld";
import { ScriptureSection } from "@/lib/types";
import { breadcrumbSchema, absoluteUrl, SITE_NAME } from "@/lib/seo";

/**
 * Detail page body for one section of a narrative scripture — summary box,
 * key episodes, quoted shlokas and prev/next navigation.
 */
export function SectionDetail({
  section,
  sections,
  basePath,
  bookName,
  unitLabel,
}: {
  section: ScriptureSection;
  /** Full ordered list, used for prev/next. */
  sections: ScriptureSection[];
  basePath: string;
  bookName: string;
  unitLabel: string;
}) {
  const idx = sections.findIndex((s) => s.slug === section.slug);
  const prev = idx > 0 ? sections[idx - 1] : null;
  const next = idx < sections.length - 1 ? sections[idx + 1] : null;

  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: bookName, path: basePath },
            { name: section.name, path: `${basePath}/${section.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Chapter",
            name: `${section.name} — ${section.translation}`,
            position: section.number,
            isPartOf: {
              "@type": "Book",
              name: bookName,
              url: absoluteUrl(basePath),
            },
            url: absoluteUrl(`${basePath}/${section.slug}`),
            publisher: { "@type": "Organization", name: SITE_NAME },
          },
        ]}
      />
      <PageHeader
        title={`${section.number}. ${section.name}`}
        backHref={basePath}
        icon={<BookOpen className="h-6 w-6" />}
      />

      {/* Summary box (AI-friendly quick answer) */}
      <div className="mb-8 rounded-3xl border border-border bg-secondary/40 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-saffron-600 dark:text-saffron-400">
          {section.translation} · {section.unitsCount} {unitLabel}
        </p>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          {section.summary}
        </p>
      </div>

      {/* Cross-link out to a related section of the site */}
      {section.crossLink && (
        <Link
          href={section.crossLink.href}
          className="mb-8 inline-flex items-center gap-2 rounded-2xl bg-saffron-gradient px-6 py-3 font-semibold text-white shadow-glow transition-transform active:scale-95"
        >
          <Sparkles className="h-4 w-4" /> {section.crossLink.label}
        </Link>
      )}

      {/* Key episodes */}
      <h2 className="mb-4 font-display text-xl font-bold tracking-tight sm:text-2xl">
        Key Episodes
      </h2>
      <ul className="mb-10 space-y-2.5">
        {section.highlights.map((h) => (
          <li key={h} className="flex gap-3 leading-relaxed text-muted-foreground">
            <span
              aria-hidden
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-500"
            />
            {h}
          </li>
        ))}
      </ul>

      {/* Shlokas */}
      {section.verses.length > 0 && (
        <>
          <h2 className="mb-4 font-display text-xl font-bold tracking-tight sm:text-2xl">
            Shlokas
          </h2>
          <div className="space-y-5">
            {section.verses.map((v) => (
              <div
                key={v.sanskrit}
                className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6"
              >
                <p className="mb-2 text-xs font-bold text-saffron-600 dark:text-saffron-400">
                  {v.ref}
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
        </>
      )}

      {/* Prev / next */}
      <div className="mt-10 flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`${basePath}/${prev.slug}`}
            className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" /> {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`${basePath}/${next.slug}`}
            className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            {next.name} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
