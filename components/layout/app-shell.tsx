"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { Loader2 } from "lucide-react";
import { TopNav } from "./top-nav";
import { BottomNav } from "./bottom-nav";
import { SiteFooter } from "./site-footer";
import { StarField } from "@/components/shared/star-field";
import { AmbientBackground } from "@/components/shared/ambient-background";
import { OrbitField } from "@/components/shared/orbit-field";
import { AudioPlayer } from "@/components/shared/audio-player";
import { FavoritesProvider } from "@/lib/favorites-context";
import { useAuth } from "@/lib/use-auth";

// Routes that render without the top nav, site footer and bottom nav
// (full-screen, distraction-free experience).
const BARE_ROUTES: string[] = [];

// Pages a signed-out visitor is allowed to open. Everything else (incl. "/")
// is locked behind login. This site is a static export, so the gate must run
// client-side (server middleware never runs with `output: "export"`).
const PUBLIC_ROUTES = ["/login", "/register"];

function matchRoute(routes: string[], pathname: string | null) {
  if (!pathname) return false;
  return routes.some((r) => pathname === r || pathname.startsWith(`${r}/`));
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready, configured } = useAuth();

  const bare = matchRoute(BARE_ROUTES, pathname);
  const isPublic = matchRoute(PUBLIC_ROUTES, pathname);

  // Until the user logs in, keep them on the login page: any protected route
  // (and any menu click that lands on one) bounces back to /login. A signed-in
  // user sitting on the login/register page is sent home. When Supabase isn't
  // configured we never lock the site (dev fallback).
  const awaitingProtected = configured && !isPublic && (!ready || !user);
  const redirectingAuthed = configured && isPublic && ready && Boolean(user);
  const blocked = awaitingProtected || redirectingAuthed;

  React.useEffect(() => {
    if (!configured || !ready) return;
    if (!user && !isPublic) {
      router.replace("/login");
    } else if (user && isPublic) {
      router.replace("/");
    }
  }, [configured, ready, user, isPublic, router]);

  return (
    <FavoritesProvider>
      {/* reducedMotion="user" makes every framer-motion animation honour the
          OS "reduce motion" preference. */}
      <MotionConfig reducedMotion="user">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="relative flex min-h-screen flex-col">
          <AmbientBackground />
          <OrbitField />
          <StarField />
          <div className="relative z-10 flex min-h-screen flex-col">
            {blocked ? (
              <div className="flex flex-1 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-saffron-500" />
              </div>
            ) : (
              <>
                {!bare && <TopNav />}
                <main
                  id="main-content"
                  tabIndex={-1}
                  className={bare ? "flex-1" : "flex-1 pb-28 lg:pb-0"}
                >
                  {children}
                </main>
                {!bare && <SiteFooter />}
                {!bare && <BottomNav />}
              </>
            )}
          </div>
          {/* Site-wide background music — kept outside the gate so it shows on
              every page and keeps playing across navigation. */}
          <AudioPlayer />
        </div>
      </MotionConfig>
    </FavoritesProvider>
  );
}
