import { ScrollText } from "lucide-react";
import { RecitationVerse } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Full paath text for a long recitation, in one scrollable panel so a 43-verse
 * chalisa doesn't stretch the page. Dohas are tinted as framing couplets;
 * chaupais are numbered so a devotee can keep their place.
 *
 * Devanagari only — a paath is read aloud, and transliteration/meaning between
 * every verse breaks that flow. `RecitationVerse` still carries both; render
 * them here if a "with meaning" view is ever wanted.
 */
export function RecitationText({
  verses,
  title,
}: {
  verses: RecitationVerse[];
  title: string;
}) {
  if (!verses.length) return null;

  const chaupaiCount = verses.filter((v) => v.kind === "chaupai").length;
  const dohaCount = verses.length - chaupaiCount;

  return (
    <section aria-labelledby="paath-heading" className="mt-12 scroll-mt-24">
      <h2
        id="paath-heading"
        className="mb-2 flex items-center gap-2 font-display text-xl font-bold tracking-tight sm:text-2xl"
      >
        <ScrollText className="h-5 w-5 text-saffron-500" />
        {title} — Full Paath
      </h2>
      <p className="mb-5 text-sm text-muted-foreground">
        {dohaCount} dohas and {chaupaiCount} chaupais — scroll to read the
        complete paath.
      </p>

      <div className="overflow-hidden rounded-4xl border border-border bg-card shadow-soft">
        <div
          tabIndex={0}
          role="region"
          aria-label={`${title} full text`}
          className="max-h-[70vh] overflow-y-auto overscroll-contain px-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 sm:px-6"
        >
          {verses.map((v, i) => {
            const isDoha = v.kind === "doha";
            return (
              <div
                key={i}
                className={cn(
                  "border-b border-border/60 py-6 last:border-0",
                  // Full-bleed tint pulls the doha out of the column rhythm
                  // without breaking the shared divider line.
                  isDoha &&
                    "-mx-5 border-l-4 border-l-saffron-400 bg-tint-saffron px-5 dark:bg-saffron-900/10 sm:-mx-6 sm:px-6"
                )}
              >
                <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-saffron-600 dark:text-saffron-400">
                  {isDoha ? "Doha" : `Chaupai ${v.number}`}
                </p>
                <p className="whitespace-pre-line font-display text-xl font-semibold leading-loose text-foreground sm:text-2xl">
                  {v.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
