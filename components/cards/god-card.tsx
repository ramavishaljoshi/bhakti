"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { God } from "@/lib/types";
import { cn } from "@/lib/utils";

export function GodCard({ god }: { god: God }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/gods/${god.slug}`}
        className="group relative block overflow-hidden rounded-3xl border border-border shadow-soft transition-shadow hover:shadow-soft-lg"
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={god.image}
            alt={god.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t opacity-90 mix-blend-multiply",
              god.color
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-display text-lg font-bold text-white drop-shadow">
            {god.name}
          </h3>
          <p className="text-sm text-white/85">{god.title}</p>
        </div>
      </Link>
    </motion.div>
  );
}
