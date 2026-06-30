export interface Author {
  slug: string;
  name: string;
  /** schema.org type — a named individual is "Person", a team is "Organization". */
  type: "Person" | "Organization";
  role: string;
  /** Short bio shown on the author page and used in Person/Org schema. */
  bio: string;
  /** Areas of expertise (used for the page and EEAT signalling). */
  expertise: string[];
  image: string;
  /** Verified profile / reference URLs for schema `sameAs`. Fill in real ones. */
  sameAs: string[];
}

// The byline shown on content and the author entity behind Article schema.
// Replace/extend with named subject-matter experts as they join.
export const authors: Author[] = [
  {
    slug: "bhakti-editorial-team",
    name: "Bhakti Editorial Team",
    type: "Organization",
    role: "Editorial & Review Team",
    bio: "The Bhakti Editorial Team researches and reviews every guide on devotional practice, mantras, vrat, festivals and Panchang. We work with practitioners and reference traditional sources to keep the content authentic, respectful and easy to follow for everyday devotees.",
    expertise: [
      "Hindu devotional practice",
      "Mantras & jap",
      "Vrat & fasting",
      "Festivals & Panchang",
    ],
    image: "/assets/hero-illustration.png",
    sameAs: [],
  },
];

export const getAuthorBySlug = (slug: string) =>
  authors.find((a) => a.slug === slug);

/** The default byline author for content that doesn't name one explicitly. */
export const DEFAULT_AUTHOR_SLUG = "bhakti-editorial-team";
