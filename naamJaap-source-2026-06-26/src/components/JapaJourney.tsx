import { useCallback, useEffect, useMemo, useState } from "react";
import "./JapaJourney.css";

// Read-only dashboard over the localStorage written by NaamJaapCounter.
// Keys used: njc-day-log, njc-totals, njc-sessions. Goals live in njc-journey-goals.

type DayLog = Record<string, { malas: number; chants: number; seconds: number }>;
type Totals = { totalMalas: number; totalChants: number; totalSeconds: number };
type Goals = { dailyMalas: number; weeklyMalas: number };

const GOALS_KEY = "njc-journey-goals";
const DEFAULT_GOALS: Goals = { dailyMalas: 1, weeklyMalas: 7 };

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw == null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function keyOf(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function addDays(d: Date, n: number) {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}

function formatHMS(sec: number) {
  const safe = Math.max(0, Math.floor(sec));
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  return `${h}:${pad2(m)}:${pad2(s)}`;
}

function shortDate(d: Date) {
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

const EMPTY = { malas: 0, chants: 0, seconds: 0 };

function sumRange(log: DayLog, from: Date, to: Date) {
  let malas = 0;
  let chants = 0;
  let seconds = 0;
  for (const [k, v] of Object.entries(log)) {
    const d = new Date(`${k}T00:00:00`);
    if (d >= from && d <= to) {
      malas += v.malas || 0;
      chants += v.chants || 0;
      seconds += v.seconds || 0;
    }
  }
  return { malas, chants, seconds };
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function JapaJourney() {
  const [tick, setTick] = useState(0);
  const [log, setLog] = useState<DayLog>({});
  const [totals, setTotals] = useState<Totals>({ totalMalas: 0, totalChants: 0, totalSeconds: 0 });
  const [goals, setGoals] = useState<Goals>(DEFAULT_GOALS);
  const [editingGoals, setEditingGoals] = useState(false);

  const refresh = useCallback(() => {
    setLog(readJSON<DayLog>("njc-day-log", {}));
    setTotals(readJSON<Totals>("njc-totals", { totalMalas: 0, totalChants: 0, totalSeconds: 0 }));
    setGoals({ ...DEFAULT_GOALS, ...readJSON<Partial<Goals>>(GOALS_KEY, {}) });
  }, []);

  // Initial load + live sync (cross-tab storage events and a 5s poll for same-tab updates).
  useEffect(() => {
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key.startsWith("njc-")) refresh();
    };
    window.addEventListener("storage", onStorage);
    const id = window.setInterval(() => {
      refresh();
      setTick((t) => t + 1);
    }, 5000);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.clearInterval(id);
    };
  }, [refresh]);

  const now = useMemo(() => new Date(), [tick]);
  const todayKey = keyOf(now);
  const yesterdayKey = keyOf(addDays(now, -1));
  const today = log[todayKey] || EMPTY;
  const yesterday = log[yesterdayKey] || EMPTY;

  // Streak: consecutive active days ending today (or yesterday if today is empty).
  const streak = useMemo(() => {
    let count = 0;
    let cursor = new Date(now);
    if (!(log[keyOf(cursor)]?.chants > 0)) cursor = addDays(cursor, -1);
    while (log[keyOf(cursor)]?.chants > 0) {
      count += 1;
      cursor = addDays(cursor, -1);
    }
    return count;
  }, [log, now]);

  // Period ranges. Week starts Sunday to match common practice.
  const periods = useMemo(() => {
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = addDays(startOfDay, -startOfDay.getDay());
    const weekEnd = addDays(weekStart, 6);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);
    return [
      { label: "This Week", range: `${shortDate(weekStart)} - ${shortDate(weekEnd)}`, ...sumRange(log, weekStart, weekEnd) },
      { label: "This Month", range: `${shortDate(monthStart)} - ${shortDate(startOfDay)}`, ...sumRange(log, monthStart, startOfDay) },
      { label: "This Year", range: `${shortDate(yearStart)} - ${shortDate(startOfDay)}`, ...sumRange(log, yearStart, startOfDay) },
    ];
  }, [log, now]);

  // Last 3 calendar months (oldest first), each as a grid of day cells.
  const months = useMemo(() => {
    const out: { name: string; year: number; cells: ({ day: number; key: string; active: boolean; isToday: boolean } | null)[] }[] = [];
    for (let offset = 2; offset >= 0; offset -= 1) {
      const base = new Date(now.getFullYear(), now.getMonth() - offset, 1);
      const year = base.getFullYear();
      const month = base.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const cells: ({ day: number; key: string; active: boolean; isToday: boolean } | null)[] = [];
      for (let i = 0; i < firstDay; i += 1) cells.push(null);
      for (let day = 1; day <= daysInMonth; day += 1) {
        const k = `${year}-${pad2(month + 1)}-${pad2(day)}`;
        cells.push({ day, key: k, active: (log[k]?.chants || 0) > 0, isToday: k === todayKey });
      }
      out.push({ name: MONTH_NAMES[month], year, cells });
    }
    return out;
  }, [log, now, todayKey]);

  const dailyPct = Math.min(100, Math.round((today.malas / Math.max(1, goals.dailyMalas)) * 100));
  const weekMalas = periods[0].malas;
  const weeklyPct = Math.min(100, Math.round((weekMalas / Math.max(1, goals.weeklyMalas)) * 100));

  const saveGoals = (next: Goals) => {
    const clean = {
      dailyMalas: Math.max(1, Math.min(108, Math.round(next.dailyMalas) || 1)),
      weeklyMalas: Math.max(1, Math.min(756, Math.round(next.weeklyMalas) || 1)),
    };
    setGoals(clean);
    try {
      window.localStorage.setItem(GOALS_KEY, JSON.stringify(clean));
    } catch {
      /* storage disabled */
    }
  };

  return (
    <section className="journey" aria-label="Your Japa Journey">
      <header className="journey-head">
        <h1>Your Japa Journey</h1>
        <p>Track your spiritual progress with mindful insights</p>
      </header>

      <div className="journey-board">
        <div className="journey-sync" aria-live="polite">
          <span className="sync-dot" /> Live sync · refreshes within 5 seconds
        </div>

        <div className="summary-row">
          <SummaryCard icon="sun" title="Today's Japa" subtitle="Every day is a fresh opportunity" data={today} />
          <SummaryCard icon="moon" title="Yesterday's Japa" subtitle="Every day has its own rhythm" data={yesterday} />
          <SummaryCard
            icon="cup"
            title="Lifetime Total"
            subtitle="Nothing you've done is lost"
            data={{ malas: totals.totalMalas, chants: totals.totalChants, seconds: totals.totalSeconds }}
          />
        </div>

        {/* Goals */}
        <div className="goal-card">
          <div className="card-head">
            <span className="card-icon" aria-hidden="true">◎</span>
            <div>
              <h2>Daily &amp; Weekly Goals</h2>
              <p>Gentle targets, not pressure</p>
            </div>
            <button className="goal-edit" onClick={() => setEditingGoals((v) => !v)}>
              {editingGoals ? "Done" : "Edit goals"}
            </button>
          </div>

          {editingGoals ? (
            <div className="goal-edit-row">
              <label>
                Daily malas
                <input
                  type="number"
                  min={1}
                  max={108}
                  value={goals.dailyMalas}
                  onChange={(e) => saveGoals({ ...goals, dailyMalas: Number(e.target.value) })}
                />
              </label>
              <label>
                Weekly malas
                <input
                  type="number"
                  min={1}
                  max={756}
                  value={goals.weeklyMalas}
                  onChange={(e) => saveGoals({ ...goals, weeklyMalas: Number(e.target.value) })}
                />
              </label>
            </div>
          ) : null}

          <div className="goal-grid">
            <GoalBar label="Today" done={today.malas} target={goals.dailyMalas} pct={dailyPct} />
            <GoalBar label="This week" done={weekMalas} target={goals.weeklyMalas} pct={weeklyPct} />
          </div>
        </div>

        <div className="journey-cols">
          {/* Streak + calendar */}
          <div className="calendar-card">
            <div className="card-head">
              <span className="card-icon" aria-hidden="true">▦</span>
              <div>
                <h2>Continuity Calendar</h2>
                <p>Returning matters more than perfection</p>
              </div>
            </div>

            <div className="streak-badge">
              <strong>{streak}</strong>
              <span>day streak</span>
            </div>

            <div className="calendar-grid">
              {months.map((m) => (
                <div className="cal-month" key={`${m.name}-${m.year}`}>
                  <div className="cal-title">
                    {m.name} <span>{m.year}</span>
                  </div>
                  <div className="cal-week">
                    {WEEKDAYS.map((d, i) => (
                      <span key={i} className="cal-wd">
                        {d}
                      </span>
                    ))}
                  </div>
                  <div className="cal-days">
                    {m.cells.map((cell, i) =>
                      cell ? (
                        <span
                          key={i}
                          className={`cal-day ${cell.active ? "is-active" : ""} ${cell.isToday ? "is-today" : ""}`}
                          title={cell.active ? `${log[cell.key].malas} malas` : ""}
                        >
                          {cell.day}
                        </span>
                      ) : (
                        <span key={i} className="cal-day is-empty" />
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Period totals */}
          <div className="period-card">
            <div className="card-head">
              <span className="card-icon" aria-hidden="true">↗</span>
              <div>
                <h2>Period Totals</h2>
                <p>Small efforts, added gently over time</p>
              </div>
            </div>

            <table className="period-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Malas</th>
                  <th>Chants</th>
                  <th>Time (h:m:s)</th>
                </tr>
              </thead>
              <tbody>
                {periods.map((p) => (
                  <tr key={p.label}>
                    <td>
                      <strong>{p.label}</strong>
                      <span>{p.range}</span>
                    </td>
                    <td>{p.malas.toLocaleString()}</td>
                    <td>{p.chants.toLocaleString()}</td>
                    <td>{formatHMS(p.seconds)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryCard({
  icon,
  title,
  subtitle,
  data,
}: {
  icon: "sun" | "moon" | "cup";
  title: string;
  subtitle: string;
  data: { malas: number; chants: number; seconds: number };
}) {
  const glyph = icon === "sun" ? "☀" : icon === "moon" ? "☾" : "🏆";
  return (
    <article className="summary-card">
      <div className="card-head">
        <span className="card-icon" aria-hidden="true">{glyph}</span>
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="summary-metrics">
        <div>
          <strong>{data.malas.toLocaleString()}</strong>
          <span>Malas</span>
        </div>
        <div>
          <strong>{data.chants.toLocaleString()}</strong>
          <span>Chants</span>
        </div>
        <div>
          <strong>{formatHMS(data.seconds)}</strong>
          <span>Time (h:m:s)</span>
        </div>
      </div>
    </article>
  );
}

function GoalBar({ label, done, target, pct }: { label: string; done: number; target: number; pct: number }) {
  const met = done >= target;
  return (
    <div className={`goal-bar ${met ? "is-met" : ""}`}>
      <div className="goal-bar-top">
        <span>{label}</span>
        <strong>
          {done.toLocaleString()} / {target.toLocaleString()} malas {met ? "✓" : ""}
        </strong>
      </div>
      <div className="goal-track">
        <i style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
