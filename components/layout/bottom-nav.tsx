"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CircleDot, Bot, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const left = [
  { label: "Home", href: "/", icon: Home },
  { label: "Jap", href: "/jap", icon: CircleDot },
];
const right = [
  { label: "AI Guru", href: "/ai-guru", icon: Bot },
  { label: "Profile", href: "/profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="mx-auto max-w-md px-4 pb-4">
        <div className="glass relative flex items-end justify-between rounded-3xl px-3 pb-2 pt-2.5 shadow-soft-lg">
          {left.map((item) => (
            <Item key={item.href} item={item} />
          ))}

          {/* Elevated center: Explore */}
          <div className="flex flex-1 justify-center">
            <Link
              href="/explore"
              className="relative -mt-8 flex flex-col items-center"
            >
              <motion.span
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-full bg-saffron-gradient text-2xl text-white shadow-glow ring-4 ring-background"
                )}
              >
                ॐ
              </motion.span>
              <span
                className={cn(
                  "mt-1 text-[10px] font-semibold",
                  isActive("/explore") ? "text-saffron-600" : "text-muted-foreground"
                )}
              >
                Explore
              </span>
            </Link>
          </div>

          {right.map((item) => (
            <Item key={item.href} item={item} />
          ))}
        </div>
      </div>
    </nav>
  );
}
