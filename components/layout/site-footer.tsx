import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border bg-card/40">
      <div className="container flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-saffron-gradient text-lg text-white shadow-glow">
              ॐ
            </span>
            <span className="font-display text-base font-bold">
              Bhakti <span className="font-normal text-muted-foreground">by Agentic Vani</span>
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A modern spiritual companion crafted with devotion.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">About</Link>
          <Link href="/" className="hover:text-foreground">Privacy</Link>
          <Link href="/" className="hover:text-foreground">Terms</Link>
          <Link href="/" className="hover:text-foreground">Contact</Link>
        </div>
      </div>
      <div className="border-t border-border py-4 pb-28 lg:pb-4">
        <p className="container text-center text-xs text-muted-foreground">
          © 2026 Bhakti by Agentic Vani · Crafted with 🙏
        </p>
      </div>
    </footer>
  );
}
