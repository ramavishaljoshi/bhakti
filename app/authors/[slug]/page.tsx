import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { authors, getAuthorBySlug } from "@/lib/data/authors";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const a = getAuthorBySlug(params.slug);
  if (!a) return { title: "Author — Bhakti" };
  return {
    title: `${a.name} — ${a.role}`,
    description: a.bio,
    alternates: { canonical: `/authors/${a.slug}` },
  };
}

export default function AuthorPage({ params }: { params: { slug: string } }) {
  const author = getAuthorBySlug(params.slug);
  if (!author) notFound();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": author.type,
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    image: absoluteUrl(author.image),
    url: absoluteUrl(`/authors/${author.slug}`),
    knowsAbout: author.expertise,
    ...(author.sameAs.length > 0 ? { sameAs: author.sameAs } : {}),
  };

  return (
    <div className="container py-6 lg:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <PageHeader title={author.name} backHref="/" />

      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-center gap-5 rounded-4xl border border-border bg-card p-6 text-center shadow-soft sm:flex-row sm:text-left">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl border border-border">
            <Image
              src={author.image}
              alt={author.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight">
              {author.name}
            </h1>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-sm font-medium text-saffron-600 dark:text-saffron-400 sm:justify-start">
              <BadgeCheck className="h-4 w-4" /> {author.role}
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:justify-start">
              {author.expertise.map((e) => (
                <Badge key={e}>{e}</Badge>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="mb-2 font-display text-lg font-semibold">About</h2>
          <p className="leading-relaxed text-muted-foreground">{author.bio}</p>
        </section>

        <section className="mt-8 flex items-start gap-3 rounded-3xl border border-border bg-secondary/40 p-5">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-saffron-500" />
          <p className="text-sm text-muted-foreground">
            All content is researched and reviewed against traditional sources.
            Read our{" "}
            <a
              href="/editorial-policy"
              className="font-semibold text-saffron-600 underline-offset-2 hover:underline dark:text-saffron-400"
            >
              editorial policy
            </a>{" "}
            to learn how we keep guides accurate and respectful.
          </p>
        </section>
      </div>
    </div>
  );
}
