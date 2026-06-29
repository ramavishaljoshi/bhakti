import Link from "next/link";

export interface RelatedItem {
  label: string;
  href: string;
}

export interface RelatedGroup {
  title: string;
  items: RelatedItem[];
}

/**
 * Renders grouped "explore related" internal links (gods, festivals, temples,
 * mantras, scriptures…). Builds the topical-authority graph and keeps users
 * moving between connected entities. Empty groups are dropped.
 */
export function RelatedLinks({
  heading = "Explore related",
  groups,
}: {
  heading?: string;
  groups: RelatedGroup[];
}) {
  const visible = groups.filter((g) => g.items.length > 0);
  if (!visible.length) return null;

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="mb-5 font-display text-xl font-bold tracking-tight sm:text-2xl">
        {heading}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((g) => (
          <div key={g.title}>
            <p className="mb-2.5 text-sm font-semibold text-saffron-600 dark:text-saffron-400">
              {g.title}
            </p>
            <ul className="space-y-1.5">
              {g.items.map((it) => (
                <li key={`${g.title}-${it.href}-${it.label}`}>
                  <Link
                    href={it.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
