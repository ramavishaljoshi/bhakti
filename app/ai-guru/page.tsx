"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, Send } from "lucide-react";

// External AI the questions open on. Swap this single builder to point the whole
// page at Claude / Perplexity / Grok instead:
//   Claude:     https://claude.ai/new?q=<q>
//   Perplexity: https://www.perplexity.ai/search?q=<q>
const askUrl = (q: string) =>
  `https://chatgpt.com/?hints=search&q=${encodeURIComponent(q)}`;

const categories: { title: string; emoji: string; prompts: string[] }[] = [
  {
    title: "Mantras & Chanting",
    emoji: "📿",
    prompts: [
      "Which mantra should I chant for inner peace?",
      "Explain the meaning of the Gayatri Mantra.",
      "How many times should I chant Om Namah Shivaya?",
    ],
  },
  {
    title: "Scriptures",
    emoji: "📖",
    prompts: [
      "Explain Bhagavad Gita Chapter 2 in simple words.",
      "What does the Gita say about karma?",
      "Summarise the teachings of the Ramayana.",
    ],
  },
  {
    title: "Gods & Stories",
    emoji: "🕉️",
    prompts: [
      "Tell me a story about Lord Hanuman.",
      "Why does Lord Shiva have a third eye?",
      "Who are the ten avatars of Vishnu?",
    ],
  },
  {
    title: "Daily Practice",
    emoji: "🪔",
    prompts: [
      "Suggest a simple morning spiritual routine.",
      "How do I start meditating as a beginner?",
      "Give me a short teaching to reflect on today.",
    ],
  },
];

const defaultPrompt =
  "Be my spiritual guide — suggest a mantra for today and share a short teaching from the Bhagavad Gita.";

export default function AIGuruPage() {
  const [question, setQuestion] = React.useState("");

  const ask = (q: string) => {
    const text = q.trim();
    if (!text) return;
    window.open(askUrl(text), "_blank", "noopener,noreferrer");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ask(question || defaultPrompt);
  };

  return (
    <div className="container py-6 lg:py-10">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-4xl border border-border bg-gradient-to-br from-violet-50 via-card to-fuchsia-50 p-6 shadow-soft dark:from-violet-950/30 dark:to-fuchsia-950/30 sm:p-10"
      >
        <div className="pointer-events-none absolute -right-10 top-0 h-56 w-56 rounded-full bg-violet-300/30 blur-3xl" />

        <div className="relative grid items-center gap-8 sm:grid-cols-[1fr_auto]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-900/40 dark:text-violet-200">
              <Sparkles className="h-3.5 w-3.5" /> Powered by Vani AI
            </span>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Ask AI Guru
            </h1>
            <p className="mt-2 max-w-md text-muted-foreground">
              Your personal spiritual companion. Ask anything about mantras,
              scriptures, gods and daily practice.
            </p>

            {/* Ask box */}
            <form onSubmit={onSubmit} className="mt-6">
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-300/50">
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask your spiritual question…"
                  className="h-10 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-4 text-sm font-semibold text-white shadow-lg transition-transform active:scale-95"
                >
                  Ask <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Opens your question in a new tab with AI.
              </p>
            </form>
          </div>

          <div className="relative mx-auto hidden h-52 w-52 sm:block">
            <div className="absolute inset-6 rounded-full bg-violet-300/30 blur-2xl" />
            <Image
              src="/assets/ai-guru.png"
              alt="AI Guru"
              fill
              sizes="208px"
              className="animate-float-slow object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </motion.section>

      {/* Suggested prompts */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {categories.map((cat, i) => (
          <motion.section
            key={cat.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className="rounded-4xl border border-border bg-card p-5 shadow-soft"
          >
            <h2 className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
              <span className="text-xl">{cat.emoji}</span>
              {cat.title}
            </h2>
            <div className="mt-3 space-y-2">
              {cat.prompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => ask(p)}
                  className="group flex w-full items-center justify-between gap-2 rounded-2xl border border-border bg-secondary/40 px-4 py-2.5 text-left text-sm font-medium text-foreground/80 transition-colors hover:border-violet-300 hover:text-violet-600 dark:hover:text-violet-300"
                >
                  {p}
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
