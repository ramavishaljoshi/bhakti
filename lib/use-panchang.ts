"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import { panchang as fallbackPanchang } from "@/lib/data/misc";
import type { PanchangItem } from "@/lib/data/misc";

// Kept as a string literal (not imported from lib/panchang) so this client
// hook never pulls the `mhah-panchang` library into the browser bundle.
const DEFAULT_LOCATION_LABEL = "New Delhi";

/** Today's date as YYYY-MM-DD in IST (matches the `panchang.date` column). */
function todayInIST(): string {
  // en-CA renders ISO-style YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date());
}

/** Map a Supabase `panchang` row onto the icon/colour template by label. */
function applyRow(
  items: PanchangItem[],
  row: Record<string, string>
): PanchangItem[] {
  const byLabel: Record<string, string | undefined> = {
    Tithi: row.tithi,
    Nakshatra: row.nakshatra,
    "Rahu Kaal": row.rahu_kaal,
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
 * only check Supabase for an admin-published override row for today.
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
          .select("tithi,nakshatra,rahu_kaal,sunrise,sunset")
          .eq("date", todayInIST())
          .eq("location", DEFAULT_LOCATION_LABEL)
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
