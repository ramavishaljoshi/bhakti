"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Flame, Target, History, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useJap } from "@/lib/use-jap";

const malaOptions = [
  { label: "108 Mala", value: 108 },
  { label: "54 Mala", value: 54 },
  { label: "27 Mala", value: 27 },
  { label: "Unlimited", value: 0 },
];

export function JapCounter({ mantraName = "Om Namah Shivaya" }: { mantraName?: string }) {
  const jap = useJap();
  const [mala, setMala] = React.useState(108);
  const [count, setCount] = React.useState(0);
  const [rounds, setRounds] = React.useState(0);
  const [pulse, setPulse] = React.useState(0);

  const weekTotal = jap.week.reduce((a, b) => a + b.count, 0);

  const increment = () => {
    setPulse((p) => p + 1);
    const nextCount = count + 1;
    if (mala > 0 && nextCount >= mala) {
      setCount(0);
      setRounds((r) => r + 1);
    } else {
      setCount(nextCount);
    }
    jap.addJap(1, mantraName);
    if (navigator?.vibrate) navigator.vibrate(8);
  };

  const reset = () => {
    setCount(0);
    setRounds(0);
  };

  const progress = mala > 0 ? count / mala : (count % 108) / 108;
  const size = 280;
  const stroke = 16;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      {/* Counter */}
      <div className="flex flex-col items-center rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-10">
        {/* Mala selector */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {malaOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setMala(opt.value);
                reset();
              }}
              className={cn(
                "rounded-2xl px-4 py-2 text-sm font-semibold transition-colors",
                mala === opt.value
                  ? "bg-saffron-gradient text-white shadow-glow"
                  : "border border-border bg-card hover:bg-secondary"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <p className="mb-1 text-sm text-muted-foreground">Chanting</p>
        <p className="mb-6 font-display text-lg font-semibold text-saffron-600 dark:text-saffron-400">
          {mantraName}
        </p>

        {/* Tap circle */}
        <button
          onClick={increment}
          className="group relative flex items-center justify-center outline-none"
          style={{ width: size, height: size }}
        >
          <svg width={size} height={size} className="-rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              strokeWidth={stroke}
              className="stroke-muted"
            />
            <defs>
              <linearGradient id="jap-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFB347" />
                <stop offset="100%" stopColor="#F57E0F" />
              </linearGradient>
            </defs>
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              strokeWidth={stroke}
              strokeLinecap="round"
              stroke="url(#jap-grad)"
              strokeDasharray={circ}
              animate={{ strokeDashoffset: circ * (1 - progress) }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </svg>

          <div className="absolute inset-8 rounded-full bg-saffron-50 transition-colors group-active:bg-saffron-100 dark:bg-saffron-900/20" />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={count}
                initial={{ scale: 0.6, opacity: 0, y: 8 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 1.4, opacity: 0 }}
                className="font-display text-6xl font-bold tabular-nums"
              >
                {count}
              </motion.span>
            </AnimatePresence>
            <span className="mt-1 text-sm text-muted-foreground">
              {mala > 0 ? `of ${mala}` : "tap to count"}
            </span>
            {rounds > 0 && (
              <span className="mt-2 rounded-full bg-saffron-100 px-3 py-0.5 text-xs font-semibold text-saffron-700 dark:bg-saffron-900/30 dark:text-saffron-300">
                {rounds} {rounds === 1 ? "round" : "rounds"} done
              </span>
            )}
          </div>

          {/* ripple */}
          <AnimatePresence>
            <motion.span
              key={pulse}
              initial={{ scale: 0.85, opacity: 0.4 }}
              animate={{ scale: 1.15, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none absolute inset-6 rounded-full border-2 border-saffron-400"
            />
          </AnimatePresence>
        </button>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Tap the circle to count · works offline
        </p>

        <button
          onClick={reset}
          className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>

      {/* Stats */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <StatTile
            icon={<Flame className="h-5 w-5" />}
            label="Day Streak"
            value={`${jap.streak}`}
          />
          <StatTile
            icon={<Target className="h-5 w-5" />}
            label="Today"
            value={`${jap.today}/${jap.goal}`}
          />
          <StatTile
            icon={<Check className="h-5 w-5" />}
            label="Total Jap"
            value={jap.total.toLocaleString("en-IN")}
          />
          <StatTile
            icon={<History className="h-5 w-5" />}
            label="This Week"
            value={`${weekTotal}`}
          />
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display font-semibold">Weekly History</h3>
            <span className="text-xs text-muted-foreground">Goal {jap.goal}</span>
          </div>
          <div className="flex h-36 items-end justify-between gap-2">
            {jap.week.map((d) => (
              <div key={d.date} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.min((d.count / jap.goal) * 100, 100)}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full rounded-xl bg-saffron-gradient"
                  style={{ minHeight: 6 }}
                />
                <span className="text-[10px] text-muted-foreground">{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-saffron-100 text-saffron-600 dark:bg-saffron-900/30 dark:text-saffron-300">
        {icon}
      </div>
      <p className="font-display text-2xl font-bold tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
