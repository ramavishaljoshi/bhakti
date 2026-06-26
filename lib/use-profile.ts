"use client";

import * as React from "react";
import { getSupabaseClient } from "@/lib/supabase/client";

export interface Profile {
  name: string;
  sankalp: string;
  phone: string;
  city: string;
  favorite_deity: string;
  bio: string;
}

export const emptyProfile: Profile = {
  name: "",
  sankalp: "",
  phone: "",
  city: "",
  favorite_deity: "",
  bio: "",
};

export type SaveResult = { ok: true } | { ok: false; error: string };

export function useProfile() {
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setReady(true);
      return;
    }
    let active = true;

    async function load() {
      const { data: userData } = await supabase!.auth.getUser();
      const uid = userData.user?.id ?? null;
      if (!active) return;
      setUserId(uid);

      if (!uid) {
        setProfile(null);
        setReady(true);
        return;
      }

      const { data } = await supabase!
        .from("profiles")
        .select("name,sankalp,phone,city,favorite_deity,bio")
        .eq("id", uid)
        .maybeSingle();

      if (!active) return;
      setProfile({
        ...emptyProfile,
        ...(data ?? {}),
        // Fall back to the name captured at sign-up.
        name:
          (data?.name as string) ||
          (userData.user?.user_metadata?.name as string) ||
          "",
        sankalp:
          (data?.sankalp as string) ||
          (userData.user?.user_metadata?.sankalp as string) ||
          "",
      });
      setReady(true);
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const save = React.useCallback(
    async (data: Profile): Promise<SaveResult> => {
      const supabase = getSupabaseClient();
      if (!supabase || !userId) {
        return {
          ok: false,
          error: "You must be signed in to update your profile.",
        };
      }

      const payload = {
        id: userId,
        name: data.name.trim(),
        sankalp: data.sankalp.trim() || null,
        phone: data.phone.trim() || null,
        city: data.city.trim() || null,
        favorite_deity: data.favorite_deity.trim() || null,
        bio: data.bio.trim() || null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("profiles")
        .upsert(payload, { onConflict: "id" });
      if (error) return { ok: false, error: error.message };

      // Keep auth metadata in sync so the nav/profile name updates instantly.
      await supabase.auth.updateUser({
        data: { name: payload.name, sankalp: payload.sankalp },
      });

      setProfile({ ...data });
      return { ok: true };
    },
    [userId]
  );

  return { profile, ready, save };
}
