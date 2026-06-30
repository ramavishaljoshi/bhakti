import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { mantras } from "@/lib/data/mantras";
import { temples, getAllStates } from "@/lib/data/temples";
import { festivals } from "@/lib/data/festivals";
import { intentions } from "@/lib/data/intentions";
import { gitaChapters } from "@/lib/data/gita";
import { articles } from "@/lib/data/articles";
import { vrats } from "@/lib/data/vrat";
import { authors } from "@/lib/data/authors";

// Static-export sitemap (emitted as /sitemap.xml at build time). Lists every
// public, indexable route. Auth/profile routes are intentionally excluded.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

  const staticRoutes: {
    path: string;
    priority: number;
    freq: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1.0, freq: "daily" },
    { path: "/mantras", priority: 0.9, freq: "weekly" },
    { path: "/temples", priority: 0.9, freq: "weekly" },
    { path: "/festivals", priority: 0.9, freq: "weekly" },
    { path: "/vrat", priority: 0.9, freq: "weekly" },
    { path: "/articles", priority: 0.9, freq: "weekly" },
    { path: "/states", priority: 0.8, freq: "monthly" },
    { path: "/intentions", priority: 0.8, freq: "monthly" },
    { path: "/gita", priority: 0.8, freq: "monthly" },
    { path: "/gods", priority: 0.9, freq: "weekly" },
    { path: "/panchang", priority: 0.8, freq: "daily" },
    { path: "/jap", priority: 0.7, freq: "monthly" },
    { path: "/ai-guru", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.5, freq: "yearly" },
    { path: "/contact", priority: 0.5, freq: "yearly" },
    { path: "/editorial-policy", priority: 0.4, freq: "yearly" },
    { path: "/privacy", priority: 0.3, freq: "yearly" },
    { path: "/terms", priority: 0.3, freq: "yearly" },
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: url(r.path),
    changeFrequency: r.freq,
    priority: r.priority,
  }));

  for (const m of mantras) {
    entries.push({ url: url(`/mantras/${m.slug}`), changeFrequency: "monthly", priority: 0.7 });
  }
  for (const t of temples) {
    entries.push({ url: url(`/temples/${t.slug}`), changeFrequency: "monthly", priority: 0.7 });
  }
  for (const f of festivals) {
    entries.push({ url: url(`/festivals/${f.slug}`), changeFrequency: "monthly", priority: 0.7 });
  }
  for (const v of vrats) {
    entries.push({ url: url(`/vrat/${v.slug}`), changeFrequency: "monthly", priority: 0.7 });
  }
  for (const a of articles) {
    entries.push({ url: url(`/articles/${a.slug}`), changeFrequency: "monthly", priority: 0.8 });
  }
  for (const i of intentions) {
    entries.push({ url: url(`/intentions/${i.id}`), changeFrequency: "monthly", priority: 0.6 });
  }
  for (const c of gitaChapters) {
    entries.push({ url: url(`/gita/${c.number}`), changeFrequency: "monthly", priority: 0.6 });
  }
  for (const s of getAllStates()) {
    entries.push({ url: url(`/states/${s.slug}`), changeFrequency: "monthly", priority: 0.6 });
  }
  for (const au of authors) {
    entries.push({ url: url(`/authors/${au.slug}`), changeFrequency: "yearly", priority: 0.3 });
  }

  return entries;
}
