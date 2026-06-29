import { Sparkles } from "lucide-react";

/**
 * A short, plain-language "quick answer" box placed near the top of a page.
 * Carries the `quick-answer` class so SpeakableSpecification (voice search) and
 * AI Overviews can extract a concise, citable summary.
 */
export function QuickAnswer({
  label = "Quick answer",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="quick-answer rounded-3xl border border-saffron-200/70 bg-saffron-50/60 p-5 dark:border-saffron-900/40 dark:bg-saffron-900/15">
      <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-saffron-600 dark:text-saffron-400">
        <Sparkles className="h-3.5 w-3.5" />
        {label}
      </p>
      <p className="leading-relaxed text-foreground">{children}</p>
    </div>
  );
}
