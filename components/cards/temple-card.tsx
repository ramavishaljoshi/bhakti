"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Temple } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/shared/favorite-button";

export function TempleCard({
  temple,
  horizontal,
}: {
  temple: Temple;
  horizontal?: boolean;
}) {
  if (horizontal) {
    return (
      <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="shrink-0">
        <Link
          href={`/temples/${temple.slug}`}
          className="group block w-64 overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={temple.image}
              alt={temple.name}
              fill
              sizes="256px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <div className="p-4">
            <h3 className="font-display font-semibold leading-tight">{temple.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {temple.state}
            </p>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/temples/${temple.slug}`}
        className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg"
      >
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
          <Image
            src={temple.image}
            alt={temple.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute right-3 top-3">
            <FavoriteButton
              item={{
                type: "temple",
                id: temple.id,
                title: temple.name,
                href: `/temples/${temple.slug}`,
              }}
            />
          </div>
          <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 sm:inset-x-4">
            <div className="min-w-0">
              <h3 className="line-clamp-2 font-display text-sm font-semibold leading-tight text-white drop-shadow sm:text-lg">
                {temple.name}
              </h3>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-white/90 sm:text-sm">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  {temple.city}, {temple.state}
                </span>
              </p>
            </div>
            <Badge className="hidden shrink-0 bg-white/90 text-saffron-700 sm:inline-flex">
              {temple.deity}
            </Badge>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
