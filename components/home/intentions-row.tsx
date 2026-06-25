"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Wallet,
  Users,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Gem,
  Shield,
  Flower2,
  Smile,
  Sprout,
  HandHeart,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items: {
  label: string;
  href: string;
  icon: LucideIcon;
  tint: string;
  fg: string;
}[] = [
  { label: "Peace", href: "/intentions/peace", icon: Heart, tint: "bg-tint-rose", fg: "text-rose-500" },
  { label: "Prosperity", href: "/intentions/prosperity", icon: Wallet, tint: "bg-tint-mint", fg: "text-emerald-500" },
  { label: "Family", href: "/intentions/child", icon: Users, tint: "bg-tint-sky", fg: "text-sky-500" },
  { label: "Career", href: "/intentions/career", icon: Briefcase, tint: "bg-tint-peach", fg: "text-orange-500" },
  { label: "Education", href: "/intentions/education", icon: GraduationCap, tint: "bg-tint-lavender", fg: "text-violet-500" },
  { label: "Health", href: "/intentions/health", icon: HeartPulse, tint: "bg-tint-mint", fg: "text-teal-500" },
  { label: "Marriage", href: "/intentions/marriage", icon: Gem, tint: "bg-tint-rose", fg: "text-pink-500" },
  { label: "Protection", href: "/intentions/protection", icon: Shield, tint: "bg-tint-saffron", fg: "text-saffron-600" },
  { label: "Meditation", href: "/intentions/meditation", icon: Flower2, tint: "bg-tint-lavender", fg: "text-purple-500" },
  { label: "Happiness", href: "/intentions/happiness", icon: Smile, tint: "bg-tint-lemon", fg: "text-amber-500" },
  { label: "Growth", href: "/intentions/spiritual-growth", icon: Sprout, tint: "bg-tint-mint", fg: "text-green-500" },
  { label: "Devotion", href: "/intentions/gratitude", icon: HandHeart, tint: "bg-tint-rose", fg: "text-rose-500" },
];

export function IntentionsRow() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
      {items.map((it, i) => {
        const Icon = it.icon;
        return (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
          >
            <Link
              href={it.href}
              className="group flex flex-col items-center gap-2.5 rounded-3xl border border-border bg-card p-4 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110",
                  it.tint,
                  it.fg
                )}
              >
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-xs font-semibold">{it.label}</span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
