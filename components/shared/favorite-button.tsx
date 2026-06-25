"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useFavorites, FavItem } from "@/lib/use-favorites";

export function FavoriteButton({
  item,
  className,
}: {
  item: FavItem;
  className?: string;
}) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(item.type, item.id);

  return (
    <button
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(item);
      }}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur transition-colors hover:bg-secondary",
        className
      )}
    >
      <motion.span whileTap={{ scale: 0.8 }} animate={active ? { scale: [1, 1.3, 1] } : {}}>
        <Heart
          className={cn(
            "h-[18px] w-[18px] transition-colors",
            active ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
          )}
        />
      </motion.span>
    </button>
  );
}
