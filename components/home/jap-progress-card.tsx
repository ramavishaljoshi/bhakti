"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { TempleSilhouette } from "@/components/shared/temple-silhouette";

export function JapProgressCard({
  mantraName = "Om Namah Shivaya",
  current = 54,
  goal = 108,
}: {
  mantraName?: string;
  current?: number;
  goal?: number;
}) {
  const pct = Math.round((current / goal) * 100);
  const size = 124;
  const stroke = 11;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-full overflow-hidden rounded-4xl bg-warm-gradient p-6 text-white shadow-glow sm:p-7"
    >
      <TempleSilhouette className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full text-white/15" />
      <div className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/20 blur-3xl" />

      <p className="relative text-xs font-medium uppercase tracking-wider text-white/80">
        Today&apos;s Progress
      </p>

      <div className="relative mt-3 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-bold">Continue Your Jap</h3>
          <p className="mt-1 text-sm text-white/85">
            Current Mantra · <span className="font-semibold">ॐ {mantraName}</span>
          </p>

          <p className="mt-5 font-display text-5xl font-bold tabular-nums">
            {current}
            <span className="text-2xl font-semibold text-white/70"> / {goal}</span>
          </p>
          <div className="mt-3 h-2 w-44 max-w-full overflow-hidden rounded-full bg-white/25">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-white"
            />
          </div>
        </div>

        <div className="relative shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              strokeWidth={stroke}
              className="stroke-white/25"
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              strokeWidth={stroke}
              strokeLinecap="round"
              className="stroke-white"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl font-bold">{pct}%</span>
            <span className="text-[10px] text-white/85">Complete</span>
          </div>
        </div>
      </div>

      <Link
        href="/jap"
        className="relative mt-5 inline-flex h-11 items-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-saffron-600 shadow-soft transition-transform active:scale-95"
      >
        <Play className="h-4 w-4 fill-saffron-600" />
        Continue Jap
      </Link>
    </motion.div>
  );
}
