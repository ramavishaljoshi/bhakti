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

        <div className="flex gap-x-12 gap-y-6 text-sm">
          <nav className="flex flex-col gap-2">
            <p className="mb-1 font-semibold text-foreground">Explore</p>
            <Link href="/gods" className="text-muted-foreground hover:text-foreground">Gods</Link>
            <Link href="/mantras" className="text-muted-foreground hover:text-foreground">Mantras</Link>
            <Link href="/temples" className="text-muted-foreground hover:text-foreground">Temples</Link>
            <Link href="/festivals" className="text-muted-foreground hover:text-foreground">Festivals</Link>
            <Link href="/panchang" className="text-muted-foreground hover:text-foreground">Panchang</Link>
            <Link href="/gita" className="text-muted-foreground hover:text-foreground">Bhagavad Gita</Link>
            <Link href="/states" className="text-muted-foreground hover:text-foreground">Temples by State</Link>
          </nav>
          <nav className="flex flex-col gap-2">
            <p className="mb-1 font-semibold text-foreground">More</p>
            <Link href="/jap" className="text-muted-foreground hover:text-foreground">Jap Counter</Link>
            <Link href="/intentions" className="text-muted-foreground hover:text-foreground">Intentions</Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">About</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link>
          </nav>
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
