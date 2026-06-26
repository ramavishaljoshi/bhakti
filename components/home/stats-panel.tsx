"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Flame, Sparkles } from "lucide-react";

export function StatsPanel() {
  const router = useRouter();
  const [q, setQ] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex h-full flex-col gap-4 rounded-4xl border border-border bg-card p-5 shadow-soft sm:p-6"
    >
      <form
        onSubmit={submit}
        className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-1 focus-within:ring-2 focus-within:ring-ring"
      >
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search mantra, temple, god, festival..."
          className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </form>

      <div className="grid flex-1 grid-cols-2 gap-4">
        <div className="flex flex-col justify-center rounded-3xl bg-tint-peach p-5">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 text-orange-500">
            <Flame className="h-5 w-5" />
          </div>
          <p className="font-display text-3xl font-bold tabular-nums text-stone-800">
            12
          </p>
          <p className="text-xs text-stone-500">Days streak</p>
        </div>

        <div className="flex flex-col justify-center rounded-3xl bg-tint-saffron p-5">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 text-saffron-600">
            <Sparkles className="h-5 w-5" />
          </div>
          <p className="font-display text-3xl font-bold tabular-nums text-stone-800">
            2,430
          </p>
          <p className="text-xs text-stone-500">Total Jap</p>
        </div>
      </div>
    </motion.div>
  );
}
