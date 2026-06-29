// Shared helpers over the same localStorage the Naam Jaap counter uses.
// Keeps every tool (classic counter, modern counter, journey, milestones, goals)
// reading and writing one consistent data model. No database, no network.

export type Session = {
  id: string;
  start: string | null;
  end: string;
  count: number;
  size: number;
  durationSec: number;
  mantra: string;
  deity: string;
  done: boolean;
  createdAt: string;
};

export type Totals = { totalMalas: number; totalChants: number; totalSeconds: number };
export type DayLog = Record<string, { malas: number; chants: number; seconds: number }>;

export const KEYS = {
  sessions: "njc-sessions",
  totals: "njc-totals",
  dayLog: "njc-day-log",
  milestones: "njc-milestones",
  goals: "njc-goals-v2",
  settings: "njc-modern-settings",
} as const;

export const EMPTY_TOTALS: Totals = { totalMalas: 0, totalChants: 0, totalSeconds: 0 };

export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw == null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or disabled */
  }
}

export function pad2(n: number) {
  return String(Math.floor(n)).padStart(2, "0");
}

export function dayKey(d = new Date()) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export function formatHMS(sec: number) {
  const safe = Math.max(0, Math.floor(sec));
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  return `${h}:${pad2(m)}:${pad2(s)}`;
}

export function formatClock(sec: number) {
  const safe = Math.max(0, Math.floor(sec));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${pad2(m)}:${pad2(s)}`;
}

export function compact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}K`;
  return String(n);
}

export function uid() {
  return `mala_${Date.now()}_${Math.floor(Math.random() * 9999)}`;
}

export function getTotals(): Totals {
  return { ...EMPTY_TOTALS, ...readJSON<Partial<Totals>>(KEYS.totals, {}) };
}

// Record one completed mala into sessions + totals + day log, exactly like the
// classic counter so the journey, milestones and goals all stay in sync.
export function recordMala(opts: { size: number; durationSec: number; mantra: string; deity: string }) {
  const now = new Date();
  const iso = now.toISOString();
  const session: Session = {
    id: uid(),
    start: null,
    end: iso,
    count: opts.size,
    size: opts.size,
    durationSec: Math.max(0, Math.floor(opts.durationSec)),
    mantra: opts.mantra,
    deity: opts.deity,
    done: true,
    createdAt: iso,
  };

  const sessions = readJSON<Session[]>(KEYS.sessions, []);
  writeJSON(KEYS.sessions, [session, ...sessions].slice(0, 400));

  const totals = getTotals();
  writeJSON(KEYS.totals, {
    totalMalas: totals.totalMalas + 1,
    totalChants: totals.totalChants + opts.size,
    totalSeconds: totals.totalSeconds + session.durationSec,
  });

  const log = readJSON<DayLog>(KEYS.dayLog, {});
  const k = dayKey(now);
  const cur = log[k] || { malas: 0, chants: 0, seconds: 0 };
  log[k] = {
    malas: cur.malas + 1,
    chants: cur.chants + opts.size,
    seconds: cur.seconds + session.durationSec,
  };
  writeJSON(KEYS.dayLog, log);

  return session;
}
