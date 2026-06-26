"use client";

import * as React from "react";
import { getSupabaseClient } from "@/lib/supabase/client";

export type FavType = "mantra" | "god" | "temple" | "festival" | "verse";

export interface FavItem {
  type: FavType;
  id: string;
  title: string;
  href: string;
}

const KEY = "bhakti:favorites";

function readLocal(): FavItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function writeLocal(items: FavItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

interface Ctx {
  favorites: FavItem[];
  isFavorite: (type: FavType, id: string) => boolean;
  toggle: (item: FavItem) => void;
  ready: boolean;
}

const FavoritesContext = React.createContext<Ctx | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = React.useState<FavItem[]>([]);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [ready, setReady] = React.useState(false);

  // Track the signed-in user (or null for guests).
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

  // Load favourites whenever the auth state settles.
  React.useEffect(() => {
    let active = true;
    const supabase = getSupabaseClient();

    async function load() {
      if (supabase && userId) {
        // Migrate any guest favourites saved before signing in.
        const local = readLocal();
        if (local.length) {
          await supabase.from("favorites").upsert(
            local.map((f) => ({
              user_id: userId,
              item_type: f.type,
              item_id: f.id,
              title: f.title,
              href: f.href,
            })),
            { onConflict: "user_id,item_type,item_id", ignoreDuplicates: true }
          );
          writeLocal([]);
        }

        const { data } = await supabase
          .from("favorites")
          .select("item_type,item_id,title,href")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (!active) return;
        setFavorites(
          (data ?? []).map((r) => ({
            type: r.item_type as FavType,
            id: r.item_id,
            title: r.title,
            href: r.href,
          }))
        );
      } else {
        if (!active) return;
        setFavorites(readLocal());
      }
      if (active) setReady(true);
    }

    load();
    return () => {
      active = false;
    };
  }, [userId]);

  const isFavorite = React.useCallback(
    (type: FavType, id: string) =>
      favorites.some((f) => f.type === type && f.id === id),
    [favorites]
  );

  const toggle = React.useCallback(
    (item: FavItem) => {
      const supabase = getSupabaseClient();
      const exists = favorites.some(
        (f) => f.type === item.type && f.id === item.id
      );
      const next = exists
        ? favorites.filter((f) => !(f.type === item.type && f.id === item.id))
        : [item, ...favorites];

      // Optimistic update.
      setFavorites(next);

      if (supabase && userId) {
        if (exists) {
          supabase
            .from("favorites")
            .delete()
            .eq("user_id", userId)
            .eq("item_type", item.type)
            .eq("item_id", item.id)
            .then(undefined);
        } else {
          supabase
            .from("favorites")
            .insert({
              user_id: userId,
              item_type: item.type,
              item_id: item.id,
              title: item.title,
              href: item.href,
            })
            .then(undefined);
        }
      } else {
        writeLocal(next);
      }
    },
    [favorites, userId]
  );

  const value = React.useMemo(
    () => ({ favorites, isFavorite, toggle, ready }),
    [favorites, isFavorite, toggle, ready]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites(): Ctx {
  const ctx = React.useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return ctx;
}
