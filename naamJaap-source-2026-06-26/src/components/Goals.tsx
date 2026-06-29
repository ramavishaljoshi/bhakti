import { useEffect, useMemo, useState } from "react";
import "./Goals.css";
import { KEYS, type DayLog, readJSON, writeJSON } from "../lib/japaStore";

type Metric = "malas" | "chants";
type Period = "daily" | "weekly" | "monthly" | "total";

type Goal = {
  id: string;
  label: string;
  metric: Metric;
  period: Period;
  target: number;
  createdAt: string;
};

const PERIOD_LABEL: Record<Period, string> = {
  daily: "Today",
  weekly: "This week",
  monthly: "This month",
  total: "Since created",
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function keyOf(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function sumRange(log: DayLog, from: Date, to: Date, metric: Metric) {
  let v = 0;
  for (const [k, day] of Object.entries(log)) {
    const d = new Date(`${k}T00:00:00`);
    if (d >= from && d <= to) v += (metric === "malas" ? day.malas : day.chants) || 0;
  }
  return v;
}

function progressFor(goal: Goal, log: DayLog) {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (goal.period === "daily") return sumRange(log, startOfDay, now, goal.metric);
  if (goal.period === "weekly") {
    const weekStart = new Date(startOfDay);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    return sumRange(log, weekStart, now, goal.metric);
  }
  if (goal.period === "monthly") {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    return sumRange(log, monthStart, now, goal.metric);
  }
  return sumRange(log, new Date(`${keyOf(new Date(goal.createdAt))}T00:00:00`), now, goal.metric);
}

const BLANK = { label: "", metric: "malas" as Metric, period: "daily" as Period, target: 2 };

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [log, setLog] = useState<DayLog>({});
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState(BLANK);

  useEffect(() => {
    const refresh = () => {
      setGoals(readJSON<Goal[]>(KEYS.goals, []));
      setLog(readJSON<DayLog>(KEYS.dayLog, {}));
    };
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key.startsWith("njc-")) refresh();
    };
    window.addEventListener("storage", onStorage);
    const id = window.setInterval(() => setLog(readJSON<DayLog>(KEYS.dayLog, {})), 5000);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.clearInterval(id);
    };
  }, []);

  const save = (next: Goal[]) => {
    setGoals(next);
    writeJSON(KEYS.goals, next);
  };

  const openNew = () => {
    setEditId(null);
    setDraft(BLANK);
    setShowForm(true);
  };

  const openEdit = (g: Goal) => {
    setEditId(g.id);
    setDraft({ label: g.label, metric: g.metric, period: g.period, target: g.target });
    setShowForm(true);
  };

  const submit = () => {
    const target = Math.max(1, Math.round(draft.target) || 1);
    const label = draft.label.trim() || `${draft.target} ${draft.metric} · ${PERIOD_LABEL[draft.period]}`;
    if (editId) {
      save(goals.map((g) => (g.id === editId ? { ...g, ...draft, target, label } : g)));
    } else {
      save([
        { id: `goal_${Date.now()}`, createdAt: new Date().toISOString(), ...draft, target, label },
        ...goals,
      ]);
    }
    setShowForm(false);
  };

  const remove = (id: string) => save(goals.filter((g) => g.id !== id));

  const enriched = useMemo(
    () =>
      goals.map((g) => {
        const done = progressFor(g, log);
        const pct = Math.min(100, Math.round((done / Math.max(1, g.target)) * 100));
        return { goal: g, done, pct, met: done >= g.target };
      }),
    [goals, log],
  );

  const completed = enriched.filter((e) => e.met).length;
  const fulfillment = enriched.length ? Math.round(enriched.reduce((s, e) => s + e.pct, 0) / enriched.length) : 0;
  const year = new Date().getFullYear();

  return (
    <section className="goals" aria-label="Goals">
      <header className="goals-head">
        <div>
          <h1>Goals</h1>
          <p>Set and track your spiritual practice goals</p>
        </div>
        <button className="goals-new" onClick={openNew}>+ New Goal</button>
      </header>

      <div className="goals-summary">
        <div className="sum-card">
          <span className="sum-icon" aria-hidden="true">◎</span>
          <div>
            <small>Completed</small>
            <strong>{completed}</strong>
            <span>{completed ? `${completed} met right now` : `No goals completed yet in ${year}`}</span>
          </div>
        </div>
        <div className="sum-card">
          <span className="sum-icon" aria-hidden="true">↗</span>
          <div>
            <small>Fulfillment</small>
            <strong>{fulfillment}%</strong>
            <span>{enriched.length ? "Average across active goals" : `No goals set yet in ${year}`}</span>
          </div>
        </div>
        <div className="sum-card">
          <span className="sum-icon" aria-hidden="true">▥</span>
          <div>
            <small>Active</small>
            <strong>{goals.length}</strong>
            <span>{goals.length ? "Currently tracking" : "Create one to begin"}</span>
          </div>
        </div>
      </div>

      <div className="goals-card">
        <div className="card-head">
          <span className="card-icon" aria-hidden="true">◎</span>
          <div>
            <h2>Active Goals</h2>
            <p>"Track your spiritual practice."</p>
          </div>
        </div>

        {enriched.length ? (
          <div className="goal-items">
            {enriched.map(({ goal, done, pct, met }) => (
              <article className={`goal-item ${met ? "is-met" : ""}`} key={goal.id}>
                <div className="goal-item-top">
                  <div>
                    <strong>{goal.label}</strong>
                    <span className="goal-meta">{PERIOD_LABEL[goal.period]} · {goal.metric}</span>
                  </div>
                  <div className="goal-actions">
                    <button onClick={() => openEdit(goal)} aria-label="Edit goal">Edit</button>
                    <button onClick={() => remove(goal.id)} aria-label="Delete goal">Delete</button>
                  </div>
                </div>
                <div className="goal-figures">
                  <strong>{done.toLocaleString()}</strong>
                  <span>/ {goal.target.toLocaleString()} {goal.metric} {met ? "✓" : ""}</span>
                </div>
                <div className="goal-track"><i style={{ width: `${pct}%` }} /></div>
              </article>
            ))}
          </div>
        ) : (
          <div className="goals-empty">
            <span className="empty-icon" aria-hidden="true">◎</span>
            <strong>No active goals</strong>
            <p>Create your first goal to start tracking your spiritual practice.</p>
            <button className="goals-create" onClick={openNew}>+ Create Goal</button>
          </div>
        )}
      </div>

      {showForm ? (
        <div className="goal-modal-backdrop" role="dialog" aria-modal="true" aria-label="Goal">
          <button className="goal-modal-scrim" aria-label="Close" onClick={() => setShowForm(false)} />
          <div className="goal-modal">
            <h2>{editId ? "Edit goal" : "New goal"}</h2>
            <label className="goal-field">
              Label (optional)
              <input
                value={draft.label}
                placeholder="e.g. Morning sadhana"
                onChange={(e) => setDraft({ ...draft, label: e.target.value })}
              />
            </label>
            <div className="goal-field-row">
              <label className="goal-field">
                Count
                <select value={draft.metric} onChange={(e) => setDraft({ ...draft, metric: e.target.value as Metric })}>
                  <option value="malas">Malas</option>
                  <option value="chants">Chants</option>
                </select>
              </label>
              <label className="goal-field">
                Period
                <select value={draft.period} onChange={(e) => setDraft({ ...draft, period: e.target.value as Period })}>
                  <option value="daily">Per day</option>
                  <option value="weekly">Per week</option>
                  <option value="monthly">Per month</option>
                  <option value="total">Total (since created)</option>
                </select>
              </label>
              <label className="goal-field">
                Target
                <input
                  type="number"
                  min={1}
                  value={draft.target}
                  onChange={(e) => setDraft({ ...draft, target: Number(e.target.value) })}
                />
              </label>
            </div>
            <div className="goal-modal-actions">
              <button className="ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="primary" onClick={submit}>{editId ? "Save" : "Create"}</button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
