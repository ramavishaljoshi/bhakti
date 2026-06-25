import { tickerItems } from "@/lib/data/misc";

export function Ticker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-saffron-200/60 bg-saffron-50 py-2.5 dark:border-saffron-900/40 dark:bg-saffron-900/20">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap pl-8">
        {items.map((item, i) => (
          <span
            key={i}
            className="text-sm font-medium text-saffron-800 dark:text-saffron-200"
          >
            {item}
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-saffron-50 to-transparent dark:from-saffron-900/20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-saffron-50 to-transparent dark:from-saffron-900/20" />
    </div>
  );
}
