"use client";

import * as React from "react";
import { getSupabaseClient } from "@/lib/supabase/client";

export const JAP_GOAL = 108;
const KEY = "bhakti:jap";

/** Map of "YYYY-MM-DD" -> count chanted that day. */
type DayMap = Record<string, number>;

export interface JapStats {
  ready: boolean;
  total: number;
  today: number;
  streak: number;
  goal: number;
  week: { date: string; label: string; count: number }[];
  addJap: (delta: number, mantra?: string) => void;
}

/** Coerce any stored value into a safe non-negative integer count (0 if junk). */
function toCount(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

/** Drop non-numeric/corrupt entries so stats can never render "[object Object]". */
function normalizeMap(raw: Record<string, unknown>): DayMap {
  const out: DayMap = {};
  for (const [k, v] of Object.entries(raw ?? {})) {
    const n = toCount(v);
    if (n > 0) out[k] = n;
  }
  return out;
}

function localDay(d: Date): string {
  // Local-timezone YYYY-MM-DD (not UTC) so "today" matches the user.
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function readLocal(): DayMap {
  if (typeof window === "undefined") return {};
  try {
    return normalizeMap(JSON.parse(localStorage.getItem(KEY) || "{}"));
  } catch {
    return {};
  }
}

function computeStats(map: DayMap) {
  const today = new Date();
  const todayStr = localDay(today);

  const total = Object.values(map).reduce((a, b) => a + b, 0);
  const todayCount = map[todayStr] ?? 0;

  // Streak: consecutive days with activity, ending today (or yesterday if
  // nothing chanted yet today).
  let streak = 0;
  const cursor = new Date(today);
  if ((map[localDay(cursor)] ?? 0) === 0) cursor.setDate(cursor.getDate() - 1);
  while ((map[localDay(cursor)] ?? 0) > 0) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  // Last 7 days for the weekly chart.
  const week: { date: string; label: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = localDay(d);
    week.push({
      date: key,
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      count: map[key] ?? 0,
    });
  }

  return { total, today: todayCount, streak, week };
}

export function useJap(): JapStats {
  const [map, setMap] = React.useState<DayMap>({});
  const [userId, setUserId] = React.useState<string | null>(null);
  const [ready, setReady] = React.useState(false);

  const pendingRef = React.useRef(0);
  const mantraRef = React.useRef<string | undefined>(undefined);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track signed-in user.
  React.useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setUserId(null);
      return;
    }
    supabase.auth.getUser().then(({ data }) => setUserId(data.user?.id ?? null));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) =>
      setUserId(session?.user?.id ?? null)
    );
    return () => subscription.unsubscribe();
  }, []);

  // Load history when auth state settles.
  React.useEffect(() => {
    let active = true;
    const supabase = getSupabaseClient();

    async function load() {
      if (supabase && userId) {
        const { data } = await supabase
          .from("jap_logs")
          .select("day,count")
          .eq("user_id", userId);
        if (!active) return;
        const next: DayMap = {};
        (data ?? []).forEach((r: { day: string; count: number }) => {
          const n = toCount(r.count);
          if (n > 0) next[r.day] = n;
        });
        setMap(next);
      } else {
        if (!active) return;
        setMap(readLocal());
      }
      if (active) setReady(true);
    }

    load();
    return () => {
      active = false;
    };
  }, [userId]);

  const flush = React.useCallback(() => {
    const delta = pendingRef.current;
    if (delta <= 0) return;
    pendingRef.current = 0;
    const supabase = getSupabaseClient();
    if (supabase && userId) {
      supabase
        .rpc("bump_jap", { p_delta: delta, p_mantra: mantraRef.current ?? null })
        .then(undefined);
    }
  }, [userId]);

  // Flush pending writes on unmount / tab hide so nothing is lost.
  React.useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === "hidden") flush();
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      if (timerRef.current) clearTimeout(timerRef.current);
      flush();
    };
  }, [flush]);

  const addJap = React.useCallback(
    (delta: number, mantra?: string) => {
      if (delta <= 0) return;
      if (mantra) mantraRef.current = mantra;
      const todayStr = localDay(new Date());

      setMap((prev) => {
        const next = { ...prev, [todayStr]: (prev[todayStr] ?? 0) + delta };
        const supabase = getSupabaseClient();
        if (!(supabase && userId)) {
          try {
            localStorage.setItem(KEY, JSON.stringify(next));
          } catch {}
        }
        return next;
      });

      const supabase = getSupabaseClient();
      if (supabase && userId) {
        pendingRef.current += delta;
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(flush, 1200);
      }
    },
    [userId, flush]
  );

  const stats = React.useMemo(() => computeStats(map), [map]);

  return { ready, goal: JAP_GOAL, addJap, ...stats };
}
