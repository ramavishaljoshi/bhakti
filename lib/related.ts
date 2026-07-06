import type { RelatedGroup, RelatedItem } from "@/components/shared/related-links";
import type { Intention } from "@/lib/types";
import { getMantraBySlug } from "@/lib/data/mantras";
import { getGodByName } from "@/lib/data/gods";
import { getFestivalByName } from "@/lib/data/festivals";
import { getTempleByName } from "@/lib/data/temples";
import { articles } from "@/lib/data/articles";
import { vrats } from "@/lib/data/vrat";

// ---------------------------------------------------------------------------
// Internal-linking engine. Given an entity (currently an Intention), it derives
// a rich set of related internal links across every content type on the site —
// Mantras, Gods, Temples, Festivals, Articles, Scriptures, Chalisa, Bhajans/
// Aarti, Vrat, Daily Quotes and AI Questions. This builds the topical-authority
// graph and keeps crawlers + users moving between connected entities.
//
// Every link points at an EXISTING indexed URL — nothing here renames or mints
// new routes.
// ---------------------------------------------------------------------------

const uniqByHref = (items: RelatedItem[]): RelatedItem[] => {
  const seen = new Set<string>();
  return items.filter((i) => (seen.has(i.href) ? false : (seen.add(i.href), true)));
};

/** First word of a deity name ("Lord Shiva" -> "shiva") for loose matching. */
const deityKey = (deity: string) =>
  deity.toLowerCase().replace(/^(lord|goddess|shri|sri)\s+/i, "").trim();

export function intentionRelations(intention: Intention): RelatedGroup[] {
  const mantras = intention.mantraIds
    .map((id) => getMantraBySlug(id))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  const deities = Array.from(new Set(mantras.map((m) => m.deity)));

  // --- Mantras ------------------------------------------------------------
  const mantraLinks = uniqByHref(
    mantras.map((m) => ({ label: m.name, href: `/mantras/${m.slug}` }))
  );

  // --- Gods ---------------------------------------------------------------
  const godLinks = uniqByHref(
    deities
      .map((d) => getGodByName(d))
      .filter((g): g is NonNullable<typeof g> => Boolean(g))
      .map((g) => ({ label: g.name, href: `/gods/${g.slug}` }))
  );

  // --- Temples ------------------------------------------------------------
  const templeLinks = uniqByHref(
    mantras
      .map((m) => m.relatedTemple)
      .filter((t): t is string => Boolean(t))
      .map((t) => getTempleByName(t))
      .filter((t): t is NonNullable<typeof t> => Boolean(t))
      .map((t) => ({ label: t.name, href: `/temples/${t.slug}` }))
  );

  // --- Festivals ----------------------------------------------------------
  const festivalLinks = uniqByHref(
    mantras
      .map((m) => m.relatedFestival)
      .filter((f): f is string => Boolean(f))
      .map((f) => getFestivalByName(f))
      .filter((f): f is NonNullable<typeof f> => Boolean(f))
      .map((f) => ({ label: f.name, href: `/festivals/${f.slug}` }))
  );

  // --- Articles (match by purpose label, mantra names, deities) -----------
  const needles = [
    intention.label.toLowerCase(),
    ...mantras.map((m) => m.name.toLowerCase()),
    ...deities.map((d) => deityKey(d)),
  ];
  const articleLinks = uniqByHref(
    articles
      .filter((a) => {
        const hay = `${a.title} ${a.intent} ${a.excerpt} ${a.category}`.toLowerCase();
        return needles.some((n) => n.length > 2 && hay.includes(n));
      })
      .map((a) => ({ label: a.title, href: `/articles/${a.slug}` }))
  ).slice(0, 4);

  // --- Vrat (match a fasting guide by shared deity) -----------------------
  const vratLinks = uniqByHref(
    vrats
      .filter((v) => deities.some((d) => deityKey(v.deity) === deityKey(d)))
      .map((v) => ({ label: v.name, href: `/vrat/${v.slug}` }))
  ).slice(0, 3);

  // --- Bhajans & Aarti (recommended mantras that carry an aarti) ----------
  const bhajanLinks = uniqByHref(
    mantras
      .filter((m) => m.aarti?.title)
      .map((m) => ({ label: `${m.aarti!.title} (Aarti)`, href: `/mantras/${m.slug}` }))
  ).slice(0, 4);

  // --- Chalisa (surface the Hanuman Chalisa when relevant) ----------------
  const chalisaLinks: RelatedItem[] = mantras.some((m) => m.slug === "hanuman-chalisa")
    ? [{ label: "Hanuman Chalisa", href: "/mantras/hanuman-chalisa" }]
    : [];

  // --- Static hubs (always relevant) -------------------------------------
  const scriptureLinks: RelatedItem[] = [
    { label: "Bhagavad Gita", href: "/gita" },
  ];
  const dailyQuoteLinks: RelatedItem[] = [
    { label: "Verse of the Day", href: "/gita" },
  ];
  const aiLinks: RelatedItem[] = [
    { label: "Ask the AI Guru", href: "/ai-guru" },
  ];

  const groups: RelatedGroup[] = [
    { title: "Related Mantras", items: mantraLinks },
    { title: "Related Gods", items: godLinks },
    { title: "Related Temples", items: templeLinks },
    { title: "Related Festivals", items: festivalLinks },
    { title: "Related Articles", items: articleLinks },
    { title: "Related Vrat", items: vratLinks },
    { title: "Bhajans & Aarti", items: bhajanLinks },
    { title: "Related Chalisa", items: chalisaLinks },
    { title: "Scriptures", items: scriptureLinks },
    { title: "Daily Quotes", items: dailyQuoteLinks },
    { title: "Ask AI", items: aiLinks },
  ];

  // RelatedLinks drops empty groups, but filter here too for a clean count.
  return groups.filter((g) => g.items.length > 0);
}
