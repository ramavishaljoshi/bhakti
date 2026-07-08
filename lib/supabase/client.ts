"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True only when both env vars are present and look real (not placeholders). */
export const isSupabaseConfigured = Boolean(
  url && anonKey && url.startsWith("http") && anonKey.length > 20
);

let browserClient: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase browser client, or null when the project
 * hasn't been configured yet (so the rest of the app keeps working).
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!browserClient) {
    browserClient = createBrowserClient(url!, anonKey!, {
      auth: {
        // PKCE with a single, explicit code exchange on our /auth/callback page.
        // detectSessionInUrl must be OFF so the code isn't auto-exchanged on
        // random page loads too — a double exchange causes the Supabase
        // "flow_state_already_used / State has already been used" error.
        flowType: "pkce",
        detectSessionInUrl: false,
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return browserClient;
}
