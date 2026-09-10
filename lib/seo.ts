import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Central SEO configuration. One source of truth for the canonical domain,
// brand strings and the default social-share image so every page stays
// consistent. Used by `app/layout.tsx`, per-page metadata, the sitemap and
// the JSON-LD structured-data helpers below.
// ---------------------------------------------------------------------------

export const SITE_URL = "https://bhakti.agenticvani.com";
export const SITE_NAME = "Bhakti by Agentic Vani";
export const SITE_TAGLINE = "Your Spiritual Companion";
export const DEFAULT_OG_IMAGE = "/og-image.png";
export const LOCALE = "en_IN";
// Editorial "last reviewed" date (ISO). Bump when content is substantively
// updated; surfaced as schema dateModified and a visible EEAT note.
export const CONTENT_UPDATED = "2026-06-29";

/**
 * Canonical path form for this site. `next.config.mjs` sets
 * `trailingSlash: true`, so every *page* URL ends in "/" and the unslashed
 * form 308-redirects to it. Emitting the unslashed form in a sitemap, feed or
 * JSON-LD node costs a needless redirect hop and splits Search Console
 * reporting across two URLs, so normalise here — once, for every caller.
 * Asset paths (anything with a file extension, e.g. /og-image.png, /rss.xml)
 * are left exactly as-is.
 */
export function canonicalPath(path: string): string {
  const i = path.search(/[?#]/);
  const pathname = i === -1 ? path : path.slice(0, i);
  const suffix = i === -1 ? "" : path.slice(i);
  if (pathname.endsWith("/")) return pathname + suffix;
  // A dot in the final segment means this is a file, not a page.
  if (/\.[a-z0-9]+$/i.test(pathname.split("/").pop() ?? "")) return pathname + suffix;
  return `${pathname}/${suffix}`;
}

/** Build an absolute URL for a site-relative path (or pass through if absolute). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${canonicalPath(path)}`;
}

interface PageMetaInput {
  /** Bare page title; the site name is appended for <title> and social cards. */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/mantras" or "/mantras/om-namah-shivaya". */
  path: string;
  /** Social-share image (site-relative or absolute). Defaults to the hero. */
  image?: string;
  keywords?: string[];
  /** Set true for private/auth pages that must stay out of the index. */
  noindex?: boolean;
  type?: "website" | "article";
}

/**
 * Produce a complete Next.js Metadata object — canonical URL, robots,
 * Open Graph and Twitter cards — from a small per-page input. Keeps every
 * page's social/SEO tags uniform without repeating boilerplate.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  keywords,
  noindex = false,
  type = "website",
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      locale: LOCALE,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD structured-data builders. Each returns a plain schema.org object to
// be rendered via the <JsonLd> component. Helps Google rich results and gives
// AI search engines (ChatGPT, Gemini, Perplexity) clean, entity-rich facts.
// ---------------------------------------------------------------------------

// Stable @id anchors so every schema block on the site refers to ONE canonical
// Organization / WebSite node. This is the strongest signal we can send Google
// for the site name (Task 6) — the brand is defined once and referenced by id.
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    // alternateName teaches Google the accepted short forms so it stops falling
    // back to the bare domain (agenticvani.com) as the display name.
    alternateName: ["Bhakti", "Bhakti App", "Agentic Vani"],
    url: SITE_URL,
    // Square logo (Google requires a square, ≥112px logo for the site-name /
    // knowledge panel). icon-512.png is a clean 512×512 square.
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon-512.png"),
      width: 512,
      height: 512,
    },
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description:
      "A premium, mindful Hindu spirituality app — digital jap counter, mantra library, gods, temples, festivals and the Bhagavad Gita.",
    knowsLanguage: ["en", "hi"],
    knowsAbout: [
      "Hindu mantras",
      "Hindu gods",
      "Hindu temples",
      "Hindu festivals",
      "Jap",
      "Bhagavad Gita",
      "Indian spiritual traditions",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: ["Bhakti", "Bhakti by Agentic Vani", "Agentic Vani Bhakti"],
    url: SITE_URL,
    inLanguage: ["en", "hi"],
    publisher: { "@id": ORG_ID },
  };
}

/**
 * ItemList structured data for hub/listing pages (e.g. /intentions). Gives
 * Google and AI engines a clean, ordered map of the child pages.
 */
export function itemListSchema(
  items: { name: string; path: string }[],
  { name }: { name?: string } = {}
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    ...(name ? { name } : {}),
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.path),
    })),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/**
 * Speakable schema marks the parts of a page suitable for voice/audio
 * playback (Google Assistant). Points at the Quick Answer box and FAQ heading.
 */
export function speakableSchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: absoluteUrl(path),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".quick-answer", "#faq-heading"],
    },
  };
}

export function articleSchema({
  headline,
  description,
  path,
  image,
}: {
  headline: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: image ? absoluteUrl(image) : absoluteUrl(DEFAULT_OG_IMAGE),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    datePublished: CONTENT_UPDATED,
    dateModified: CONTENT_UPDATED,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon-512.png"),
      },
    },
  };
}

/** HowTo structured data — for step-based guides (jap, puja vidhi). */
export function howToSchema({
  name,
  description,
  steps,
  path,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(path) },
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
