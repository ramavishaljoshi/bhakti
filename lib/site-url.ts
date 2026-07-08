/**
 * The canonical, public base URL of the site (no trailing slash).
 *
 * Auth confirmation links must point at the deployed site — not `localhost` —
 * so they work from any device and after deploy. Set NEXT_PUBLIC_SITE_URL to
 * the live domain; we fall back to the current browser origin only when it
 * isn't configured (e.g. quick local testing).
 */
export function getSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env) return env.replace(/\/+$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

/**
 * Where Supabase auth links (Google OAuth, confirm signup, email change) return.
 * Trailing slash matches the static export (`trailingSlash: true`) so the page
 * resolves directly without a redirect that could drop the `?code=` param.
 */
export function authCallbackUrl(): string | undefined {
  const base = getSiteUrl();
  return base ? `${base}/auth/callback/` : undefined;
}
