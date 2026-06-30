import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, HelpCircle, PenLine } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { articles, getArticleBySlug } from "@/lib/data/articles";
import { getAuthorBySlug, DEFAULT_AUTHOR_SLUG } from "@/lib/data/authors";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const a = getArticleBySlug(params.slug);
  if (!a) return { title: "Article — Bhakti" };
  return {
    title: `${a.title} | Bhakti`,
    description: a.excerpt,
    alternates: { canonical: `/articles/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.excerpt,
      type: "article",
      images: [a.image],
    },
  };
}

export default function ArticleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const author = getAuthorBySlug(DEFAULT_AUTHOR_SLUG)!;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.date,
    dateModified: article.date,
    articleSection: article.category,
    author: {
      "@type": author.type,
      name: author.name,
      url: absoluteUrl(`/authors/${author.slug}`),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl("/assets/hero-illustration.png") },
    },
    mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="container py-6 lg:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {article.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <PageHeader title={article.title} backHref="/articles" />

      <article className="mx-auto max-w-3xl">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <Badge>{article.category}</Badge>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-saffron-500" />
            {article.readTime} read
          </span>
          <Link
            href={`/authors/${author.slug}`}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <PenLine className="h-3.5 w-3.5 text-saffron-500" />
            By {author.name}
          </Link>
        </div>

        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-4xl border border-border shadow-soft">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          {article.intro}
        </p>

        <div className="space-y-8">
          {article.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="mb-3 font-display text-xl font-bold tracking-tight">
                {s.heading}
              </h2>
              <div className="space-y-3">
                {s.body.map((p, i) => (
                  <p
                    key={i}
                    className="leading-relaxed text-muted-foreground"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {article.faqs.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold">
              <HelpCircle className="h-5 w-5 text-saffron-500" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {article.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-border bg-card p-5 shadow-soft"
                >
                  <p className="font-semibold">{faq.q}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
