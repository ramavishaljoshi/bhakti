"use client";

import { cn } from "@/lib/utils";

export function FilterChips({
  options,
  value,
  onChange,
  allLabel = "All",
}: {
  options: string[];
  value: string | null;
  onChange: (v: string | null) => void;
  allLabel?: string;
}) {
  return (
    <div className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-1">
      <button
        onClick={() => onChange(null)}
        className={cn(
          "shrink-0 rounded-2xl px-4 py-2 text-sm font-semibold transition-colors",
          value === null
            ? "bg-saffron-gradient text-white shadow-glow"
            : "border border-border bg-card hover:bg-secondary"
        )}
      >
        {allLabel}
      </button>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            "shrink-0 rounded-2xl px-4 py-2 text-sm font-semibold transition-colors",
            value === opt
              ? "bg-saffron-gradient text-white shadow-glow"
              : "border border-border bg-card hover:bg-secondary"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
