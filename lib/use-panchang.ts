"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import { panchang as fallbackPanchang } from "@/lib/data/misc";
import type { PanchangItem } from "@/lib/data/misc";

/**
 * Map a Supabase `panchang` row onto the icon/colour template by label.
 * Table columns: id, day, tithi, nakshatra, rahu_kal, sunrise, sunset, created_at.
 */
function applyRow(
  items: PanchangItem[],
  row: Record<string, string>
): PanchangItem[] {
  const byLabel: Record<string, string | undefined> = {
    Tithi: row.tithi,
    Nakshatra: row.nakshatra,
    "Rahu Kaal": row.rahu_kal,
    Sunrise: row.sunrise,
    Sunset: row.sunset,
  };
  return items.map((it) =>
    byLabel[it.label] ? { ...it, value: byLabel[it.label]! } : it
  );
}

/** Today's date as YYYY-MM-DD in India time (matches the `day` column). */
function istDayKey(d: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

export interface PanchangData {
  items: PanchangItem[];
  /** ISO timestamp of the Supabase row shown, or null when using computed values. */
  publishedAt: string | null;
}

/**
 * Today's Panchang, always current and DB-backed.
 *
 * `initial` is computed at BUILD TIME (frozen to the build date). On mount we:
 *   1. read the Supabase `panchang` row for TODAY (India time) and use it, else
 *   2. compute today's Panchang on the client (accurate, changes every day) and
 *      write it back to Supabase so subsequent visits are served from the DB.
 */
export function usePanchang(
  initial: PanchangItem[] = fallbackPanchang
): PanchangData {
  const [items, setItems] = useState<PanchangItem[]>(initial);
  const [publishedAt, setPublishedAt] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      const today = istDayKey(new Date());
      const supabase = getSupabaseClient();

      // 1. Prefer a published row for TODAY.
      if (supabase) {
        try {
          const { data } = await supabase
            .from("panchang")
            .select("tithi,nakshatra,rahu_kal,sunrise,sunset,created_at,day")
            .eq("day", today)
            .limit(1)
            .maybeSingle();
          if (!active) return;
          if (data) {
            setItems(applyRow(initial, data as Record<string, string>));
            setPublishedAt((data as { created_at?: string }).created_at ?? null);
            return;
          }
        } catch (err) {
          // fall through to client computation
          if (process.env.NODE_ENV !== "production")
            console.warn("[panchang] read failed:", err);
        }
      }

      // 2. No row for today → compute it on the client (date-accurate, daily).
      try {
        const { computePanchang } = await import("@/lib/panchang");
        const computed = computePanchang(new Date());
        if (!active) return;
        setItems(computed);
        setPublishedAt(new Date().toISOString());

        // 3. Persist today's values so it's served from the DB next time.
        if (supabase) {
          const val = (label: string) =>
            computed.find((i) => i.label === label)?.value ?? null;
          // Upsert on `day` so a repeat visit updates (not duplicates) today's
          // row. Requires the `day` column + unique index from
          // supabase/panchang-daily.sql — run that migration once in the
          // Supabase SQL Editor or every write fails with PGRST204.
          const { error } = await supabase
            .from("panchang")
            .upsert(
              {
                day: today,
                tithi: val("Tithi"),
                nakshatra: val("Nakshatra"),
                rahu_kal: val("Rahu Kaal"),
                sunrise: val("Sunrise"),
                sunset: val("Sunset"),
              },
              { onConflict: "day" }
            );
          if (error && process.env.NODE_ENV !== "production")
            console.warn("[panchang] write failed:", error.message);
        }
      } catch {
        // Keep the build-time `initial` values.
      }
    })();

    return () => {
      active = false;
    };
  }, [initial]);

  return { items, publishedAt };
}
