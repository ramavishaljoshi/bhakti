"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { Festival } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function FestivalCard({ festival }: { festival: Festival }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/festivals/${festival.slug}`}
        className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={festival.image}
            alt={festival.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute left-3 top-3">
            <Badge className="flex items-center gap-1 bg-white/90 text-saffron-700">
              <CalendarDays className="h-3 w-3" />
              {festival.date}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-display text-lg font-semibold text-white drop-shadow">
              {festival.name}
            </h3>
          </div>
        </div>
        <div className="p-4">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {festival.whyCelebrate}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
