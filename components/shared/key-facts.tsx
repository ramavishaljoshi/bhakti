/**
 * A compact "key facts" table (definition list). AI engines and Google AI
 * Overviews extract structured label→value pairs easily, so this surfaces the
 * most-asked attributes of an entity (deity, location, date, timings…).
 */
export function KeyFacts({
  title = "Key Facts",
  facts,
}: {
  title?: string;
  facts: { label: string; value?: string | null }[];
}) {
  const visible = facts.filter(
    (f): f is { label: string; value: string } => Boolean(f.value)
  );
  if (!visible.length) return null;

  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      <dl className="divide-y divide-border">
        {visible.map((f) => (
          <div key={f.label} className="flex justify-between gap-6 py-2.5">
            <dt className="text-sm text-muted-foreground">{f.label}</dt>
            <dd className="text-right text-sm font-medium text-foreground">
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
