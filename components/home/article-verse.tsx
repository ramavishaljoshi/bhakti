"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { dailyArticle } from "@/lib/data/misc";

export function ArticleVerse() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
      {/* Daily Article */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative overflow-hidden rounded-4xl border border-border shadow-soft"
      >
        <div className="relative aspect-[16/9] sm:aspect-[2/1]">
          <Image
            src={dailyArticle.image}
            alt={dailyArticle.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="text-xs font-semibold text-saffron-300">
            {dailyArticle.tag}
          </span>
          <h3 className="mt-1 font-display text-xl font-bold text-white sm:text-2xl">
            {dailyArticle.title}
          </h3>
          <p className="mt-1 line-clamp-2 max-w-lg text-sm text-white/85">
            {dailyArticle.excerpt}
          </p>
          <Link
            href={`/articles/${dailyArticle.slug}`}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white"
          >
            Read More <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>

      {/* Gita verse */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex flex-col justify-center rounded-4xl bg-warm-gradient p-7 text-white shadow-glow"
      >
        <Quote className="h-7 w-7 text-white/80" />
        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-white/80">
          Bhagavad Gita · 2.47
        </p>
        <p className="mt-2 font-display text-xl font-semibold leading-snug">
          &ldquo;Perform your duty without attachment to the fruit of action.&rdquo;
        </p>
        <p className="mt-2 text-sm text-white/85">— Lord Krishna to Arjuna</p>
        <Link
          href="/gita/2"
          className="mt-5 inline-flex h-11 w-fit items-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-saffron-600 shadow-soft transition-transform active:scale-95"
        >
          Read Explanation <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
