import { ShieldCheck } from "lucide-react";
import { CONTENT_UPDATED, SITE_NAME } from "@/lib/seo";

// Human-readable form of the ISO content-updated date.
function formatted(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  if (!y || !m || !d) return iso;
  return `${months[m - 1]} ${d}, ${y}`;
}

/**
 * Visible EEAT signal: who stands behind the content and when it was last
 * reviewed. Pairs with the Article `author`/`dateModified` schema.
 */
export function EditorialNote({
  sources,
}: {
  sources?: string;
}) {
  return (
    <div className="mt-10 rounded-2xl border border-border bg-secondary/30 p-4 text-xs leading-relaxed text-muted-foreground">
      <p className="flex items-center gap-1.5 font-medium text-foreground">
        <ShieldCheck className="h-4 w-4 text-saffron-500" />
        Reviewed by the {SITE_NAME} editorial team
      </p>
      <p className="mt-1">
        Last updated {formatted(CONTENT_UPDATED)}. Content is presented for
        devotional and educational purposes, with traditional beliefs framed as
        such.
        {sources ? ` Sources: ${sources}.` : ""}
      </p>
    </div>
  );
}
