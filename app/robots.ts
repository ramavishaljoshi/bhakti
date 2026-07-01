import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Emitted as /robots.txt at build time (static export).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private / auth-only routes that should never be indexed.
      disallow: ["/login", "/register", "/profile"],
    },
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/image-sitemap.xml`],
    host: SITE_URL,
  };
}
