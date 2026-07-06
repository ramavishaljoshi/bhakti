import Link from "next/link";
import type { Metadata } from "next";
import { Home, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found (404)",
  robots: { index: false, follow: true },
};

const LINKS = [
  { label: "Mantras", href: "/mantras" },
  { label: "Mantras by Purpose", href: "/intentions" },
  { label: "Gods & Goddesses", href: "/gods" },
  { label: "Temples", href: "/temples" },
  { label: "Festivals", href: "/festivals" },
  { label: "Bhagavad Gita", href: "/gita" },
  { label: "Articles", href: "/articles" },
  { label: "Jap Counter", href: "/jap" },
];

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center py-20 text-center">
      <p className="font-display text-6xl font-bold text-saffron-500">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
        This page could not be found
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        The page you’re looking for may have moved or never existed. Try one of
        these instead, or head back home.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center gap-2 rounded-2xl bg-saffron-gradient px-6 font-semibold text-white shadow-glow transition-transform active:scale-95"
        >
          <Home className="h-4 w-4" aria-hidden="true" /> Go home
        </Link>
        <Link
          href="/mantras"
          className="inline-flex h-11 items-center gap-2 rounded-2xl border border-border bg-card px-6 font-semibold transition-colors hover:border-saffron-400"
        >
          <Search className="h-4 w-4 text-saffron-500" aria-hidden="true" /> Browse mantras
        </Link>
      </div>

      <nav aria-label="Popular pages" className="mt-10">
        <ul className="flex flex-wrap justify-center gap-2 p-0">
          {LINKS.map((l) => (
            <li key={l.href} className="list-none">
              <Link
                href={l.href}
                className="inline-block rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
