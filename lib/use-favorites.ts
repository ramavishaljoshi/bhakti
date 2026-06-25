"use client";

import * as React from "react";

export type FavType = "mantra" | "god" | "temple" | "festival" | "verse";

export interface FavItem {
  type: FavType;
  id: string;
  title: string;
  href: string;
}

const KEY = "bhakti:favorites";

function read(): FavItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = React.useState<FavItem[]>([]);

  React.useEffect(() => {
    setFavorites(read());
    const onStorage = () => setFavorites(read());
    window.addEventListener("bhakti:fav-change", onStorage);
    return () => window.removeEventListener("bhakti:fav-change", onStorage);
  }, []);

  const persist = (items: FavItem[]) => {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("bhakti:fav-change"));
  };

  const isFavorite = React.useCallback(
    (type: FavType, id: string) =>
      favorites.some((f) => f.type === type && f.id === id),
    [favorites]
  );

  const toggle = React.useCallback((item: FavItem) => {
    const current = read();
    const exists = current.some(
      (f) => f.type === item.type && f.id === item.id
    );
    const next = exists
      ? current.filter((f) => !(f.type === item.type && f.id === item.id))
      : [...current, item];
    persist(next);
    setFavorites(next);
  }, []);

  return { favorites, isFavorite, toggle };
}
