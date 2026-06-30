"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CircleDot,
  Bot,
  User,
  BookOpen,
  Landmark,
  Sparkles,
  Moon,
  Newspaper,
  CalendarDays,
  Heart,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const left = [
  { label: "Home", href: "/", icon: Home },
  { label: "Jap", href: "/jap", icon: CircleDot },
];
const right = [
  { label: "AI Guru", href: "/ai-guru", icon: Bot },
  { label: "Profile", href: "/profile", icon: User },
];

// Everything reachable from the "Explore" sheet — the full site map for mobile,
// since the top-nav menu is hidden below the lg breakpoint.
const explore = [
  { label: "Mantras", href: "/mantras", icon: BookOpen },
  { label: "Temples", href: "/temples", icon: Landmark },
  { label: "Festivals", href: "/festivals", icon: Sparkles },
  { label: "Vrat", href: "/vrat", icon: Moon },
  { label: "Articles", href: "/articles", icon: Newspaper },
  { label: "Panchang", href: "/panchang", icon: CalendarDays },
  { label: "Intentions", href: "/intentions", icon: Heart },
  { label: "AI Guru", href: "/ai-guru", icon: Bot },
];

export function BottomNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close the sheet whenever the route changes or Escape is pressed.
  React.useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const Item = ({
    item,
  }: {
    item: { label: string; href: string; icon: React.ElementType };
  }) => {
    const active = isActive(item.href);
    const Icon = item.icon;
    return (
      <Link
        href={item.href}
        className="flex flex-1 flex-col items-center gap-1 py-1"
      >
        <Icon
          className={cn(
            "h-5 w-5 transition-colors",
            active ? "text-saffron-600" : "text-muted-foreground"
          )}
        />
        <span
          className={cn(
            "text-[10px] font-medium transition-colors",
            active ? "text-saffron-600" : "text-muted-foreground"
          )}
        >
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* Explore bottom sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              className="absolute inset-x-0 bottom-0 rounded-t-4xl border-t border-border bg-card p-5 pb-8 shadow-soft-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">Explore</h2>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {explore.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <span
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
                          active
                            ? "bg-saffron-gradient text-white shadow-glow"
                            : "bg-secondary text-saffron-600 dark:text-saffron-400"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-center text-[11px] font-medium leading-tight text-foreground">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="mx-auto max-w-md px-4 pb-4">
          <div className="glass relative flex items-end justify-between rounded-3xl px-3 pb-2 pt-2.5 shadow-soft-lg">
            {left.map((item) => (
              <Item key={item.href} item={item} />
            ))}

            {/* Elevated center: opens the Explore sheet */}
            <div className="flex flex-1 justify-center">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Explore all sections"
                aria-expanded={menuOpen}
                className="relative -mt-8 flex flex-col items-center"
              >
                <motion.span
                  whileTap={{ scale: 0.9 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-saffron-gradient text-2xl text-white shadow-glow ring-4 ring-background"
                >
                  ॐ
                </motion.span>
                <span
                  className={cn(
                    "mt-1 text-[10px] font-semibold",
                    menuOpen ? "text-saffron-600" : "text-muted-foreground"
                  )}
                >
                  Explore
                </span>
              </button>
            </div>

            {right.map((item) => (
              <Item key={item.href} item={item} />
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
