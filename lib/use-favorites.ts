"use client";

// Favourites are backed by Supabase when signed in, and localStorage for
// guests. The implementation lives in the provider; this module re-exports it
// so existing imports (`@/lib/use-favorites`) keep working unchanged.
export {
  FavoritesProvider,
  useFavorites,
  type FavType,
  type FavItem,
} from "@/lib/favorites-context";
