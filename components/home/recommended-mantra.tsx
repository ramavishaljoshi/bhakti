"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Headphones, Star } from "lucide-react";
import { Mantra } from "@/lib/types";

export function RecommendedMantra({
  mantra,
  recommendedFor = "Peace",
}: {
  mantra: Mantra;
  recommendedFor?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-hidden rounded-4xl border border-border bg-card shadow-soft"
    >
      <div className="grid sm:grid-cols-[40%_1fr]">
        <div className="relative aspect-square sm:aspect-auto">
          <Image
            src={mantra.image}
            alt={mantra.name}
            fill
            sizes="(max-width: 640px) 100vw, 40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent sm:bg-gradient-to-r" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-saffron-700 shadow-soft backdrop-blur">
            ✨ Recommended for {recommendedFor}
          </span>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-saffron-600 dark:text-saffron-400">
            Today&apos;s Mantra
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold leading-tight">
            🕉 {mantra.name}
          </h3>
          <div className="mt-1.5 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-saffron-400 text-saffron-400" />
            ))}
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Meaning · </span>
            {mantra.meaning} Traditionally chanted 108 times at sunrise to align
            body, mind and breath.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              href={`/jap?mantra=${mantra.slug}`}
              className="inline-flex h-11 items-center gap-2 rounded-2xl bg-saffron-gradient px-5 text-sm font-semibold text-white shadow-glow transition-transform active:scale-95"
            >
              <Play className="h-4 w-4 fill-white" /> Start Jap
            </Link>
            <button className="inline-flex h-11 items-center gap-2 rounded-2xl bg-saffron-100 px-5 text-sm font-semibold text-saffron-700 transition-colors hover:bg-saffron-200 dark:bg-saffron-900/30 dark:text-saffron-300">
              <Headphones className="h-4 w-4" /> Listen
            </button>
            <Link
              href={`/mantras/${mantra.slug}`}
              className="inline-flex h-11 items-center rounded-2xl border border-border px-5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
