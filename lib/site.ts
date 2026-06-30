/**
 * Central site config — base URL, identity, social profiles and default OG
 * image. Used by metadata, the Organization/WebSite JSON-LD, sitemap & robots.
 *
 * 👉 TWO THINGS TO SET FOR PRODUCTION:
 *   1. SITE_URL — your real deployed domain (or set NEXT_PUBLIC_SITE_URL in
 *      .env.local). Required for correct canonical URLs, sitemap & OG tags.
 *   2. SOCIAL — drop in your real Instagram / YouTube / Facebook / X URLs.
 *      Leave a value as "" to omit it from the Organization `sameAs`.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://bhakti-by-agentic-vani.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Bhakti by Agentic Vani";

/**
 * Bump this whenever content changes meaningfully — it drives `lastModified`
 * in the sitemap so search engines know to re-crawl. Format: YYYY-MM-DD.
 */
export const CONTENT_UPDATED = "2026-06-30";

export const SITE_DESCRIPTION =
  "A premium, mindful Indian spirituality app. Digital jap counter, mantra library, gods, temples, festivals, vrat guides, daily Panchang and the Bhagavad Gita — beautifully designed.";

/** Default social-share image (must exist under /public). */
export const DEFAULT_OG_IMAGE = "/assets/hero-illustration.png";

/**
 * Real, verified social profile URLs. Fill these in — empty strings are
 * filtered out, so an empty `sameAs` is simply omitted (better than fake URLs).
 */
export const SOCIAL = {
  instagram: "",
  youtube: "",
  facebook: "",
  x: "",
};

/** The `sameAs` array for Organization schema — only non-empty URLs. */
export const SAME_AS: string[] = Object.values(SOCIAL).filter(Boolean);

/** Absolute URL helper. */
export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
