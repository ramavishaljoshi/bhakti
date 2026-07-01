"use client";

import * as React from "react";
import { Accessibility, Check } from "lucide-react";

type Setting = "text" | "contrast" | "font" | "motion";

const CONFIG: Record<Setting, { attr: string; on: string; label: string }> = {
  text: { attr: "data-a11y-text", on: "large", label: "Larger text" },
  contrast: { attr: "data-a11y-contrast", on: "high", label: "High contrast" },
  font: { attr: "data-a11y-font", on: "dyslexic", label: "Dyslexia-friendly font" },
  motion: { attr: "data-a11y-motion", on: "reduce", label: "Reduce motion" },
};

const STORAGE_KEY = "bhakti:a11y";

type State = Record<Setting, boolean>;
const DEFAULT: State = { text: false, contrast: false, font: false, motion: false };

function apply(state: State) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  (Object.keys(CONFIG) as Setting[]).forEach((key) => {
    const { attr, on } = CONFIG[key];
    if (state[key]) root.setAttribute(attr, on);
    else root.removeAttribute(attr);
  });
}

export function AccessibilityMenu() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<State>(DEFAULT);
  const ref = React.useRef<HTMLDivElement>(null);

  // Load saved preferences and apply them.
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULT, ...(JSON.parse(raw) as Partial<State>) };
        setState(parsed);
        apply(parsed);
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  // Close on outside click / Escape.
  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = (key: Setting) => {
    setState((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      apply(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const activeCount = Object.values(state).filter(Boolean).length;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
        aria-label="Accessibility options"
        aria-haspopup="menu"
        aria-expanded={open}
        title="Accessibility options"
      >
        <Accessibility className="h-5 w-5" />
        {activeCount > 0 && (
          <span
            className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-saffron-gradient px-1 text-[10px] font-bold text-white"
            aria-hidden="true"
          >
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Accessibility options"
          className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-soft"
        >
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Accessibility
          </p>
          {(Object.keys(CONFIG) as Setting[]).map((key) => {
            const active = state[key];
            return (
              <button
                key={key}
                type="button"
                role="menuitemcheckbox"
                aria-checked={active}
                onClick={() => toggle(key)}
                className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-saffron-100 dark:hover:bg-saffron-900/30"
              >
                <span>{CONFIG[key].label}</span>
                <span
                  className={
                    "flex h-5 w-5 items-center justify-center rounded-md border " +
                    (active
                      ? "border-saffron-500 bg-saffron-gradient text-white"
                      : "border-border")
                  }
                  aria-hidden="true"
                >
                  {active && <Check className="h-3.5 w-3.5" />}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
