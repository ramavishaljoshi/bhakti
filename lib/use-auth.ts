"use client";

// Auth hook (Supabase): email/password + Google OAuth. `useAuth()` returns
// user/ready plus login, loginWithGoogle, register, logout, updateAccount.
import * as React from "react";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { authCallbackUrl } from "@/lib/site-url";

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
  // Google/OAuth stores the display name under full_name/name; our own signups
  // use name. Fall back through them, then the email prefix.
  const metaName =
    (meta.name as string) ||
    (meta.full_name as string) ||
    (meta.user_name as string) ||
    (meta.given_name as string) ||
    "";
  return {
    name: metaName || (u.email ? u.email.split("@")[0] : "Seeker"),
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
          // The confirmation email link must return to our callback route on the
          // live site (NEXT_PUBLIC_SITE_URL) so it works from any device — not
          // localhost. Without this it lands on the site root and can't sign in.
          emailRedirectTo: authCallbackUrl(),
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

  const loginWithGoogle = React.useCallback(async (): Promise<AuthResult> => {
    const supabase = getSupabaseClient();
    if (!supabase) return { ok: false, error: NOT_CONFIGURED };

    // Redirects the browser to Google, then back to our /auth/callback route,
    // which exchanges the code for a session. No further action here on success.
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: authCallbackUrl() },
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }, []);

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

      const { data: result, error } = await supabase.auth.updateUser(payload, {
        // Email changes also send a confirmation link — route it to our callback.
        emailRedirectTo: authCallbackUrl(),
      });
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
    loginWithGoogle,
    logout,
    updateAccount,
    configured: isSupabaseConfigured,
  };
}
