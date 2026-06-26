"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/lib/use-auth";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const links = [
  { label: "Home", href: "/" },
  { label: "Mantras", href: "/mantras" },
  { label: "Temples", href: "/temples" },
  { label: "Festivals", href: "/festivals" },
  { label: "Chalisa", href: "/mantras" },
  { label: "AI Guru", href: "/ai-guru" },
  { label: "Profile", href: "/profile" },
];

export function TopNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-saffron-gradient text-lg text-white shadow-glow">
            ॐ
          </span>
          <div className="leading-none">
            <p className="font-display text-base font-bold">Bhakti</p>
            <p className="hidden text-[10px] text-muted-foreground sm:block">
              by Agentic Vani
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.label}
                href={l.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-saffron-700 dark:text-saffron-300"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="topnav-active"
                    className="absolute inset-0 rounded-full bg-saffron-100 dark:bg-saffron-900/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-saffron-gradient text-sm font-bold text-white shadow-glow ring-2 ring-background"
            aria-label="Profile"
            title={user ? user.name : "Sign in"}
          >
            {user ? initials(user.name) : "ॐ"}
          </Link>
        </div>
      </div>
    </header>
  );
}
