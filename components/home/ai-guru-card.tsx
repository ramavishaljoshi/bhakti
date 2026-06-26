"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";

const examples = [
  "Which mantra should I chant for peace?",
  "Explain Bhagavad Gita Chapter 2.",
  "Tell me a Hanuman story.",
];

// Free public AI platform the questions open on. Swap this single builder to
// point the whole card at Claude / Perplexity / Grok instead:
//   Claude:     https://claude.ai/new?q=<q>
//   Perplexity: https://www.perplexity.ai/search?q=<q>
//   Grok:       https://grok.com/?q=<q>
const askUrl = (q: string) =>
  `https://chatgpt.com/?hints=search&q=${encodeURIComponent(q)}`;

const defaultPrompt =
  "Be my spiritual guide — suggest a mantra for today and share a short teaching from the Bhagavad Gita.";

export function AIGuruBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-4xl border border-border bg-gradient-to-br from-violet-50 via-card to-fuchsia-50 p-6 shadow-soft dark:from-violet-950/30 dark:to-fuchsia-950/30 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-10 top-0 h-48 w-48 rounded-full bg-violet-300/30 blur-3xl" />

      <div className="relative grid items-center gap-6 sm:grid-cols-[1fr_auto]">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-200">
            <Sparkles className="h-3.5 w-3.5" /> Powered by Vani AI
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
            Ask AI Guru
          </h2>
          <p className="mt-1.5 max-w-md text-muted-foreground">
            Your personal spiritual companion — ask anything about mantras,
            scriptures, gods and practice.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {examples.map((ex) => (
              <a
                key={ex}
                href={askUrl(ex)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-2xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-violet-300 hover:text-violet-600"
              >
                {ex}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </div>

          <a
            href={askUrl(defaultPrompt)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 font-semibold text-white shadow-lg transition-transform active:scale-95"
          >
            Ask Now <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative mx-auto hidden h-44 w-44 sm:block">
          <div className="absolute inset-6 rounded-full bg-violet-300/30 blur-2xl" />
          <Image
            src="/assets/ai-guru.png"
            alt="AI Guru"
            fill
            sizes="176px"
            className="animate-float-slow object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </motion.div>
  );
}
