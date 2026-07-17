import Link from "next/link";
import { ScriptureSection } from "@/lib/types";

/**
 * Card grid for a narrative scripture's sections — Ramayan kands or
 * Mahabharat parvas. Mirrors the Gita chapter grid so the two new books read
 * as part of the same library.
 */
export function SectionGrid({
  sections,
  basePath,
  unitLabel,
}: {
  sections: ScriptureSection[];
  /** Route prefix without a trailing slash, e.g. "/ramayana". */
  basePath: string;
  /** Plural name of the sub-unit shown on the card, e.g. "sargas". */
  unitLabel: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sections.map((s) => (
        <Link
          key={s.slug}
          href={`${basePath}/${s.slug}`}
          className="group flex flex-col rounded-3xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-soft-lg"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-saffron-gradient font-display font-bold text-white">
              {s.number}
            </span>
            <div className="min-w-0">
              <h3 className="truncate font-display font-bold tracking-tight">
                {s.name}
              </h3>
              <p className="truncate text-xs text-muted-foreground">
                {s.translation}
              </p>
            </div>
          </div>
          <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">
            {s.summary}
          </p>
          <p className="mt-3 text-xs font-medium text-saffron-600 dark:text-saffron-400">
            {s.unitsCount} {unitLabel} →
          </p>
        </Link>
      ))}
    </div>
  );
}
