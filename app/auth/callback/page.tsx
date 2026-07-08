"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase/client";

/**
 * OAuth / email-confirmation landing page. Supabase (Google sign-in, confirm
 * links, magic links) redirects here with a `?code=` to exchange for a session.
 *
 * This is a CLIENT page — not a route handler — because the site is a static
 * export (`output: "export"`), where server route handlers don't run. The
 * browser Supabase client holds the PKCE verifier, so it can do the exchange.
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = React.useState("Signing you in…");

  React.useEffect(() => {
    let cancelled = false;

    const finishToLogin = (msg: string) => {
      if (!cancelled) router.replace(`/login?error=${encodeURIComponent(msg)}`);
    };

    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const errorDesc =
        params.get("error_description") || params.get("error");

      if (errorDesc) return finishToLogin(errorDesc);

      const supabase = getSupabaseClient();
      if (!supabase) {
        return finishToLogin("Authentication isn't configured. Please try again later.");
      }

      // The browser client may already have exchanged the code automatically
      // (detectSessionInUrl). If a session exists, just continue.
      const existing = await supabase.auth.getSession();
      if (existing.data.session) {
        if (!cancelled) router.replace("/profile");
        return;
      }

      if (!code) {
        return finishToLogin(
          "This link is missing its verification code. Please sign in again."
        );
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        // Maybe it was consumed by the auto-detect above — re-check the session.
        const retry = await supabase.auth.getSession();
        if (retry.data.session) {
          if (!cancelled) router.replace("/profile");
          return;
        }
        return finishToLogin(
          "This link is invalid or has expired. Please sign in again."
        );
      }

      if (!cancelled) {
        setMessage("Signed in! Redirecting…");
        router.replace("/profile");
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <Loader2 className="h-6 w-6 animate-spin text-saffron-500" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
