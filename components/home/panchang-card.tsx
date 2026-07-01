"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Quote } from "lucide-react";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";
import { usePanchang } from "@/lib/use-panchang";
import type { PanchangItem } from "@/lib/data/misc";

export function PanchangCard({ initial }: { initial?: PanchangItem[] }) {
  const { items: panchang } = usePanchang(initial);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-4xl border border-border bg-card p-5 shadow-soft"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display font-semibold">
          <span className="text-saffron-500">📅</span> Today&apos;s Panchang
        </h3>
        <Link
          href="/panchang"
          className="flex items-center gap-0.5 text-xs font-semibold text-saffron-600 dark:text-saffron-400"
        >
          View All <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {panchang.map((p) => (
          <div key={p.label} className="flex items-center gap-3">
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                p.color
              )}
            >
              <Icon name={p.icon} className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold leading-tight">
                {p.value}
              </p>
              <p className="text-xs text-muted-foreground">{p.label}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function QuoteCard({
  text,
  source,
}: {
  text: string;
  source: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.18 }}
      className="rounded-4xl border border-border bg-card p-5 shadow-soft"
    >
      <Quote className="mb-2 h-5 w-5 text-saffron-400" />
      <p className="text-sm font-medium italic leading-relaxed">
        {text}
      </p>
      <p className="mt-2 text-xs font-semibold text-saffron-600 dark:text-saffron-400">
        — {source}
      </p>
    </motion.div>
  );
}
