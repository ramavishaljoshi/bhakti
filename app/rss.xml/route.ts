import { absoluteUrl, SITE_NAME } from "@/lib/seo";
import { articles } from "@/lib/data/articles";

// RSS 2.0 feed of articles. Emitted as a static file at build time
// (`output: "export"`). Helps feed readers, syndication and content discovery.
export const dynamic = "force-static";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// Canonical trailing slash on page links; "/rss.xml" is a file and stays bare.
const loc = absoluteUrl;
const rfc822 = (iso: string) => new Date(`${iso}T09:00:00Z`).toUTCString();

export function GET() {
  const sorted = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
  const buildDate = sorted[0] ? rfc822(sorted[0].date) : new Date(0).toUTCString();

  const items = sorted
    .map(
      (a) =>
        `    <item>\n` +
        `      <title>${esc(a.title)}</title>\n` +
        `      <link>${loc(`/articles/${a.slug}`)}</link>\n` +
        `      <guid isPermaLink="true">${loc(`/articles/${a.slug}`)}</guid>\n` +
        `      <pubDate>${rfc822(a.date)}</pubDate>\n` +
        `      <category>${esc(a.category)}</category>\n` +
        `      <description>${esc(a.excerpt)}</description>\n` +
        `    </item>`
    )
    .join("\n");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
    `  <channel>\n` +
    `    <title>${esc(SITE_NAME)} — Articles</title>\n` +
    `    <link>${loc("/articles")}</link>\n` +
    `    <atom:link href="${loc("/rss.xml")}" rel="self" type="application/rss+xml" />\n` +
    `    <description>Guides on mantras, festivals, vrat, Panchang and Hindu spiritual practice.</description>\n` +
    `    <language>en-in</language>\n` +
    `    <lastBuildDate>${buildDate}</lastBuildDate>\n` +
    items +
    `\n  </channel>\n</rss>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
