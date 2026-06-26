"use client";

import * as React from "react";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";

export interface BhaktiUser {
  name: string;
  email: string;
  /** A spiritual sankalp (intention) the seeker sets on sign-up. */
  sankalp?: string;
  createdAt: number;
}

export type AuthResult =
  | { ok: true; needsConfirmation?: boolean }
  | { ok: false; error: string };

const NOT_CONFIGURED =
  "Authentication isn't configured yet. Add your Supabase keys to .env.local and restart the dev server.";

function mapUser(u: {
  email?: string;
  created_at?: string;
  user_metadata?: Record<string, unknown>;
} | null): BhaktiUser | null {
  if (!u) return null;
  const meta = u.user_metadata ?? {};
  return {
    name: (meta.name as string) || (u.email ? u.email.split("@")[0] : "Seeker"),
    email: u.email ?? "",
    sankalp: (meta.sankalp as string) || undefined,
    createdAt: u.created_at ? new Date(u.created_at).getTime() : Date.now(),
  };
}

export function useAuth() {
  const [user, setUser] = React.useState<BhaktiUser | null>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setReady(true);
      return;
    }

    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setUser(mapUser(data.user));
      setReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapUser(session?.user ?? null));
      setReady(true);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const register = React.useCallback(
    async (data: {
      name: string;
      email: string;
      password: string;
      sankalp?: string;
    }): Promise<AuthResult> => {
      const supabase = getSupabaseClient();
      if (!supabase) return { ok: false, error: NOT_CONFIGURED };

      const { data: result, error } = await supabase.auth.signUp({
        email: data.email.trim().toLowerCase(),
        password: data.password,
        options: {
          data: {
            name: data.name.trim(),
            sankalp: data.sankalp?.trim() || null,
          },
        },
      });
      if (error) return { ok: false, error: error.message };

      // When email confirmation is on, no session is returned until the
      // user clicks the verification link.
      const needsConfirmation = !result.session;
      return { ok: true, needsConfirmation };
    },
    []
  );

  const login = React.useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const supabase = getSupabaseClient();
      if (!supabase) return { ok: false, error: NOT_CONFIGURED };

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (error) return { ok: false, error: error.message };
      return { ok: true };
    },
    []
  );

  const logout = React.useCallback(async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const updateAccount = React.useCallback(
    async (data: {
      name?: string;
      email?: string;
      password?: string;
    }): Promise<AuthResult> => {
      const supabase = getSupabaseClient();
      if (!supabase) return { ok: false, error: NOT_CONFIGURED };

      const payload: {
        email?: string;
        password?: string;
        data?: Record<string, unknown>;
      } = {};
      if (data.name !== undefined) payload.data = { name: data.name.trim() };
      if (data.email) payload.email = data.email.trim().toLowerCase();
      if (data.password) payload.password = data.password;

      const { data: result, error } = await supabase.auth.updateUser(payload);
      if (error) return { ok: false, error: error.message };

      setUser(mapUser(result.user));
      // Changing the email sends a confirmation link to the new address.
      const needsConfirmation = Boolean(
        data.email && result.user?.new_email
      );
      return { ok: true, needsConfirmation };
    },
    []
  );

  return {
    user,
    ready,
    register,
    login,
    logout,
    updateAccount,
    configured: isSupabaseConfigured,
  };
}
