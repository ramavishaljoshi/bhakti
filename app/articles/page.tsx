import Link from "next/link";
import type { Metadata } from "next";
import { Newspaper, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/lib/data/articles";

export const metadata: Metadata = {
  title: "Articles — Bhakti Blog on Vrat, Mantra, Puja & Panchang",
  description:
    "Simple, practical guides on Hindu practices — Ekadashi vrat kaise kare, Hanuman Chalisa ke fayde, Rahu Kaal, Gayatri Mantra ka arth and more.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <div className="container py-6 lg:py-10">
      <PageHeader
        title="Articles"
        description="Practical guides to mantra, vrat, puja and panchang — written to answer the questions devotees actually ask."
        icon={<Newspaper className="h-6 w-6" />}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/articles/${a.slug}`}
            className="group block overflow-hidden rounded-4xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.image}
                alt={a.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3">
                <Badge>{a.category}</Badge>
              </span>
            </div>

            <div className="space-y-2.5 p-5">
              <h2 className="font-display text-lg font-bold leading-snug tracking-tight">
                {a.title}
              </h2>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {a.excerpt}
              </p>
              <p className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-saffron-500" />
                {a.readTime} read
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
