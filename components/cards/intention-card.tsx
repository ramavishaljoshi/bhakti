"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Intention } from "@/lib/types";
import { cn } from "@/lib/utils";

export function IntentionCard({
  intention,
  index = 0,
}: {
  intention: Intention;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/intentions/${intention.id}`}
        className="group relative block overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-soft-lg"
      >
        <div
          className={cn(
            "mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl shadow-soft",
            intention.color
          )}
        >
          {intention.emoji}
        </div>
        <h3 className="font-display font-semibold">{intention.label}</h3>
        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
          {intention.description}
        </p>
        <div
          className={cn(
            "absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20",
            intention.color
          )}
        />
      </Link>
    </motion.div>
  );
}
