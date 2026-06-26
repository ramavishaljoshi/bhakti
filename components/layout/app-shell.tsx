"use client";

import { usePathname } from "next/navigation";
import { TopNav } from "./top-nav";
import { BottomNav } from "./bottom-nav";
import { SiteFooter } from "./site-footer";
import { StarField } from "@/components/shared/star-field";
import { AmbientBackground } from "@/components/shared/ambient-background";
import { OrbitField } from "@/components/shared/orbit-field";
import { FavoritesProvider } from "@/lib/favorites-context";

// Routes that render without the top nav, site footer and bottom nav
// (full-screen, distraction-free auth experience).
const BARE_ROUTES = ["/login", "/register"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.some(
    (r) => pathname === r || pathname?.startsWith(`${r}/`)
  );

  return (
    <FavoritesProvider>
      <div className="relative flex min-h-screen flex-col">
        <AmbientBackground />
        <OrbitField />
        <StarField />
        <div className="relative z-10 flex min-h-screen flex-col">
          {!bare && <TopNav />}
          <main className={bare ? "flex-1" : "flex-1 pb-28 lg:pb-0"}>
            {children}
          </main>
          {!bare && <SiteFooter />}
          {!bare && <BottomNav />}
        </div>
      </div>
    </FavoritesProvider>
  );
}
