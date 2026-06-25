"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mantra } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/shared/favorite-button";

export function MantraCard({ mantra }: { mantra: Mantra }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/mantras/${mantra.slug}`}
        className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={mantra.image}
            alt={mantra.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute right-3 top-3">
            <FavoriteButton
              item={{
                type: "mantra",
                id: mantra.id,
                title: mantra.name,
                href: `/mantras/${mantra.slug}`,
              }}
            />
          </div>
          <div className="absolute bottom-3 left-4 right-4">
            <p className="font-display text-base font-semibold text-white drop-shadow">
              {mantra.sanskrit}
            </p>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <Badge>{mantra.deity}</Badge>
          </div>
          <h3 className="font-display font-semibold leading-tight">{mantra.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {mantra.meaning}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
