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
export const DEFAULT_OG_IMAGE = "/assets/hero-illustration.png";
export const LOCALE = "en_IN";

/** Build an absolute URL for a site-relative path (or pass through if absolute). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path === "/" ? "" : path}`;
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

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "Bhakti",
    url: SITE_URL,
    logo: absoluteUrl("/assets/hero-illustration.png"),
    description:
      "A premium, mindful Hindu spirituality app — digital jap counter, mantra library, gods, temples, festivals and the Bhagavad Gita.",
    knowsLanguage: ["en", "hi"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["en", "hi"],
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
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
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/assets/hero-illustration.png"),
      },
    },
  };
}
