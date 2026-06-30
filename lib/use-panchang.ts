"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import { panchang as fallbackPanchang } from "@/lib/data/misc";
import type { PanchangItem } from "@/lib/data/misc";

/**
 * Map a Supabase `panchang` row onto the icon/colour template by label.
 * Table columns: id, tithi, nakshatra, rahu_kal, sunrise, sunset, created_at.
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

/**
 * Today's Panchang for the homepage card.
 *
 * `initial` is computed at BUILD TIME on the server (see app/page.tsx) so the
 * heavy `mhah-panchang` library stays out of the client bundle. On mount we
 * fetch the latest published row from the Supabase `panchang` table and, if one
 * exists, use it instead of the computed values.
 */
export function usePanchang(
  initial: PanchangItem[] = fallbackPanchang
): PanchangItem[] {
  const [items, setItems] = useState<PanchangItem[]>(initial);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    let active = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("panchang")
          .select("tithi,nakshatra,rahu_kal,sunrise,sunset")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!active || error || !data) return;
        setItems(applyRow(initial, data as Record<string, string>));
      } catch {
        // Network/Supabase failure → keep the build-time values.
      }
    })();

    return () => {
      active = false;
    };
  }, [initial]);

  return items;
}
