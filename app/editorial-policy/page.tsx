import type { Metadata } from "next";
import {
  ShieldCheck,
  BookOpenCheck,
  Users,
  RefreshCw,
  Mail,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How Bhakti researches, writes and reviews its content on mantras, vrat, festivals and Panchang — our standards for accuracy, sourcing, respect and corrections.",
  alternates: { canonical: "/editorial-policy" },
};

const principles = [
  {
    icon: BookOpenCheck,
    title: "Rooted in tradition",
    text: "Every guide is based on established scriptural and traditional sources. Where practices vary by region or sampradaya, we say so rather than presenting one custom as the only way.",
  },
  {
    icon: Users,
    title: "Researched & reviewed",
    text: "Content is researched, written and then reviewed by the Bhakti Editorial Team before publishing. We consult practitioners to keep details authentic and respectful.",
  },
  {
    icon: ShieldCheck,
    title: "Honest & non-dogmatic",
    text: "We explain the meaning and intent behind a practice without making fearful or guaranteed-outcome claims. Spiritual guidance is offered with humility, not as a substitute for medical, legal or financial advice.",
  },
  {
    icon: RefreshCw,
    title: "Kept up to date",
    text: "Festival and Panchang dates are reviewed each year, and guides are updated when we find an error or a clearer explanation. Significant updates bump the page's last-updated date.",
  },
];

export default function EditorialPolicyPage() {
  return (
    <div className="container py-6 lg:py-10">
      <PageHeader
        title="Editorial Policy"
        description="Our standards for accuracy, sourcing and respect across every guide on Bhakti."
        icon={<ShieldCheck className="h-6 w-6" />}
        backHref="/"
      />

      <div className="mx-auto max-w-3xl space-y-8">
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          Bhakti is a spiritual companion for everyday devotees. Because our
          content touches faith and practice, we hold it to clear editorial
          standards. This page explains how we create and maintain it.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          {principles.map((p) => (
            <div
              key={p.title}
              className="rounded-4xl border border-border bg-card p-5 shadow-soft"
            >
              <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-saffron-100 text-saffron-600 dark:bg-saffron-900/30 dark:text-saffron-300">
                <p.icon className="h-5 w-5" />
              </span>
              <h2 className="font-display font-semibold">{p.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {p.text}
              </p>
            </div>
          ))}
        </div>

        <section className="rounded-4xl border border-border bg-secondary/40 p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            <Mail className="h-5 w-5 text-saffron-500" />
            Corrections & feedback
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Found something inaccurate or have a suggestion? We genuinely want to
            know. Reach us through the{" "}
            <a
              href="/contact"
              className="font-semibold text-saffron-600 underline-offset-2 hover:underline dark:text-saffron-400"
            >
              contact page
            </a>{" "}
            and we&apos;ll review and correct verified issues promptly.
          </p>
        </section>
      </div>
    </div>
  );
}
