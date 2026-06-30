import type { MetadataRoute } from "next";
import { SITE_URL, CONTENT_UPDATED } from "@/lib/site";
import { articles } from "@/lib/data/articles";
import { festivals } from "@/lib/data/festivals";
import { mantras } from "@/lib/data/mantras";
import { temples } from "@/lib/data/temples";
import { intentions } from "@/lib/data/intentions";
import { vrats } from "@/lib/data/vrat";
import { authors } from "@/lib/data/authors";

const lastModified = CONTENT_UPDATED;

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE_URL}${path}`;

  // Top-level static routes worth indexing (skips auth/profile utility pages).
  const staticRoutes: Array<[string, number]> = [
    ["/", 1],
    ["/mantras", 0.9],
    ["/temples", 0.9],
    ["/festivals", 0.9],
    ["/vrat", 0.9],
    ["/articles", 0.9],
    ["/panchang", 0.8],
    ["/intentions", 0.7],
    ["/ai-guru", 0.6],
    ["/about", 0.5],
    ["/contact", 0.4],
    ["/editorial-policy", 0.4],
    ["/privacy", 0.2],
    ["/terms", 0.2],
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map(([path, priority]) => ({
    url: url(path),
    lastModified,
    changeFrequency: path === "/panchang" ? "daily" : "weekly",
    priority,
  }));

  const collection = (
    items: { slug: string }[] | { id: string }[],
    base: string,
    key: "slug" | "id" = "slug",
    priority = 0.7
  ) => {
    for (const it of items as Array<Record<string, string>>) {
      entries.push({
        url: url(`${base}/${it[key]}`),
        lastModified,
        changeFrequency: "monthly",
        priority,
      });
    }
  };

  collection(mantras, "/mantras");
  collection(temples, "/temples");
  collection(festivals, "/festivals");
  collection(vrats, "/vrat");
  collection(articles, "/articles", "slug", 0.8);
  collection(intentions, "/intentions", "id", 0.6);
  collection(authors, "/authors", "slug", 0.3);

  return entries;
}
