import { SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { gods } from "@/lib/data/gods";
import { mantras } from "@/lib/data/mantras";
import { temples } from "@/lib/data/temples";
import { festivals } from "@/lib/data/festivals";
import { vrats } from "@/lib/data/vrat";
import { articles } from "@/lib/data/articles";

// Dedicated Google image sitemap. Emitted as a static file at build time
// (`output: "export"`), because Next 14's built-in sitemap type has no
// `images` field. Each <url> lists the images shown on that page.
export const dynamic = "force-static";

const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p}`);
const loc = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

type Entry = { path: string; images: string[] };

function collect(): Entry[] {
  const one = (image?: string) => (image ? [abs(image)] : []);
  const many = (items: Array<{ image?: string }>) =>
    items.flatMap((i) => (i.image ? [abs(i.image)] : []));

  const entries: Entry[] = [
    { path: "/", images: [abs(DEFAULT_OG_IMAGE)] },
    { path: "/gods", images: many(gods) },
    { path: "/mantras", images: many(mantras) },
    { path: "/temples", images: many(temples) },
    { path: "/festivals", images: many(festivals) },
    { path: "/vrat", images: many(vrats) },
    { path: "/articles", images: many(articles) },
  ];

  for (const g of gods) entries.push({ path: `/gods/${g.slug}`, images: one(g.image) });
  for (const m of mantras) entries.push({ path: `/mantras/${m.slug}`, images: one(m.image) });
  for (const t of temples) entries.push({ path: `/temples/${t.slug}`, images: one(t.image) });
  for (const f of festivals) entries.push({ path: `/festivals/${f.slug}`, images: one(f.image) });
  for (const v of vrats) entries.push({ path: `/vrat/${v.slug}`, images: one(v.image) });
  for (const a of articles) entries.push({ path: `/articles/${a.slug}`, images: one(a.image) });

  return entries.filter((e) => e.images.length > 0);
}

export function GET() {
  const body = collect()
    .map(
      (e) =>
        `  <url>\n    <loc>${esc(loc(e.path))}</loc>\n` +
        e.images
          .map((img) => `    <image:image>\n      <image:loc>${esc(img)}</image:loc>\n    </image:image>`)
          .join("\n") +
        `\n  </url>`
    )
    .join("\n");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    body +
    `\n</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
