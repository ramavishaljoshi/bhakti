"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { shortcuts, shortcutTints } from "@/lib/data/misc";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

export function DailyShortcutsPanel() {
  return (
    <div className="h-full rounded-4xl border border-border bg-card p-5 shadow-soft sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-saffron-600 dark:text-saffron-400">
        Quick Access
      </p>
      <h3 className="mb-4 mt-1 font-display text-lg font-semibold">
        Daily spiritual shortcuts
      </h3>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {shortcuts.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
          >
            <Link
              href={s.href}
              className="group flex flex-col items-center gap-2 rounded-2xl p-2 text-center transition-colors hover:bg-secondary"
            >
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110",
                  shortcutTints[i % shortcutTints.length]
                )}
              >
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <span className="text-[10px] font-medium leading-tight">
                {s.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
