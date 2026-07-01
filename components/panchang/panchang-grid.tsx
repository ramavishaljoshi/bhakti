"use client";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";
import { usePanchang } from "@/lib/use-panchang";
import type { PanchangItem } from "@/lib/data/misc";

/**
 * Renders the Panchang cards on /panchang. `initial` is computed on the server
 * (build time) for SEO / no-JS; on mount usePanchang() overrides the values
 * with the latest published row from the Supabase `panchang` table — so this
 * page and the homepage card always show the same data.
 */
function formatPublished(iso: string): string | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(d);
}

export function PanchangGrid({ initial }: { initial: PanchangItem[] }) {
  const { items, publishedAt } = usePanchang(initial);
  const published = publishedAt ? formatPublished(publishedAt) : null;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
        <div
          key={p.label}
          className="flex items-center gap-4 rounded-4xl border border-border bg-card p-5 shadow-soft"
        >
          <span
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
              p.color
            )}
          >
            <Icon name={p.icon} className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {p.label}
            </p>
            <p className="truncate text-lg font-semibold leading-tight">
              {p.value}
            </p>
          </div>
        </div>
        ))}
      </div>

      {published && (
        <p className="mt-4 text-xs text-muted-foreground">
          Published: {published} IST
        </p>
      )}
    </div>
  );
}
