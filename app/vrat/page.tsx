import Link from "next/link";
import type { Metadata } from "next";
import { Moon, CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { vrats } from "@/lib/data/vrat";

export const metadata: Metadata = {
  title: "Vrat & Fasting Guides — Ekadashi, Somvar, Shanivar & More",
  description:
    "Simple step-by-step vrat guides — Ekadashi vrat kaise kare, Somvar vrat ke fayde, Shanivar vrat vidhi, Sankashti Chaturthi and more. Vidhi, niyam, what to eat and FAQs.",
  alternates: { canonical: "/vrat" },
};

export default function VratPage() {
  return (
    <div className="container py-6 lg:py-10">
      <PageHeader
        title="Vrat & Fasting"
        description="Step-by-step guides to popular Hindu vrats — when to keep them, the vidhi, what to eat, and the benefits devotees seek."
        icon={<Moon className="h-6 w-6" />}
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {vrats.map((v) => (
          <Link
            key={v.id}
            href={`/vrat/${v.slug}`}
            className="group block overflow-hidden rounded-4xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.image}
                alt={v.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3">
                <Badge>{v.deity}</Badge>
              </span>
            </div>

            <div className="space-y-2.5 p-5">
              <h2 className="font-display text-lg font-bold leading-snug tracking-tight">
                {v.name}
              </h2>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {v.excerpt}
              </p>
              <p className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5 text-saffron-500" />
                {v.observedOn}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
