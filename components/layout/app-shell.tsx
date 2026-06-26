import { TopNav } from "./top-nav";
import { BottomNav } from "./bottom-nav";
import { SiteFooter } from "./site-footer";
import { StarField } from "@/components/shared/star-field";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <StarField />
      <div className="relative z-10 flex min-h-screen flex-col">
        <TopNav />
        <main className="flex-1 pb-28 lg:pb-0">{children}</main>
        <SiteFooter />
        <BottomNav />
      </div>
    </div>
  );
}
