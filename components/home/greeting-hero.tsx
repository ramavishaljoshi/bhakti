"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, BookOpen, Clock } from "lucide-react";
import { getGreeting } from "@/lib/utils";
import { TempleSilhouette } from "@/components/shared/temple-silhouette";

export function GreetingHero({ userName = "Anju" }: { userName?: string }) {
  const [greeting, setGreeting] = React.useState("Good Morning");
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    const d = new Date();
    setGreeting(getGreeting(d));
    setTime(
      d.toLocaleDateString("en-US", { weekday: "long" }) +
        " • " +
        d.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
    );
  }, []);

  return (
    <div className="relative overflow-hidden rounded-4xl border border-border bg-hero-glow p-6 shadow-soft sm:p-8">
      <TempleSilhouette className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full text-saffron-500/10" />
      <div className="pointer-events-none absolute -right-10 top-0 h-48 w-48 rounded-full bg-saffron-300/20 blur-3xl" />

      <div className="relative grid items-center gap-6 sm:grid-cols-[1.5fr_1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <Clock className="h-3.5 w-3.5 text-saffron-500" />
            {time || "Today"}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-3 font-display text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl"
          >
            🙏 {greeting},{" "}
            <span className="text-gradient">{userName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 max-w-md text-stone-600"
          >
            May your day be filled with peace, devotion and positivity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-5 flex flex-wrap gap-3"
          >
            <Link
              href="/jap"
              className="inline-flex h-12 items-center gap-2 rounded-2xl bg-saffron-gradient px-6 font-semibold text-white shadow-glow transition-transform active:scale-95"
            >
              <Play className="h-4 w-4 fill-white" />
              Begin Today&apos;s Jap
            </Link>
            <Link
              href="/gita"
              className="inline-flex h-12 items-center gap-2 rounded-2xl border border-border bg-card px-6 font-semibold transition-colors hover:bg-secondary"
            >
              <BookOpen className="h-4 w-4" />
              Daily Reading
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="relative mx-auto hidden h-44 w-44 sm:block sm:h-56 sm:w-56"
        >
          <div className="absolute inset-4 rounded-full bg-saffron-200/40 blur-2xl" />
          <Image
            src="/assets/hero-illustration.png"
            alt="Meditation"
            fill
            sizes="224px"
            priority
            className="animate-float-slow object-contain drop-shadow-xl"
          />
        </motion.div>
      </div>
    </div>
  );
}
