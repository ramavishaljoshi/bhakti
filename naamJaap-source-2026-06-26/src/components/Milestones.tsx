import { useEffect, useMemo, useState } from "react";
import "./Milestones.css";
import { KEYS, compact, getTotals, readJSON, writeJSON } from "../lib/japaStore";

type Tier = { id: string; name: string; meaning: string; threshold: number; glyph: string };
type EarnedMap = Record<string, string>; // tier id -> ISO date first reached

const TIERS: Tier[] = [
  { id: "arambh", name: "Arambh", meaning: "Beginning", threshold: 108, glyph: "🌱" },
  { id: "sadhak", name: "Sadhak", meaning: "Seeker", threshold: 10_000, glyph: "🔁" },
  { id: "bhakt", name: "Bhakt", meaning: "Devotee", threshold: 100_000, glyph: "♥" },
  { id: "anushasan", name: "Anushasan", meaning: "Discipline", threshold: 500_000, glyph: "✓" },
  { id: "tapasya", name: "Tapasya", meaning: "Austerity", threshold: 1_000_000, glyph: "🔥" },
  { id: "yogi", name: "Yogi", meaning: "Union", threshold: 3_000_000, glyph: "∞" },
  { id: "muni", name: "Muni", meaning: "Sage", threshold: 5_000_000, glyph: "🪶" },
  { id: "sanyasi", name: "Sanyasi", meaning: "Renunciant", threshold: 10_000_000, glyph: "🕉" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

export default function Milestones() {
  const [chants, setChants] = useState(0);
  const [earned, setEarned] = useState<EarnedMap>({});

  useEffect(() => {
    const refresh = () => {
      const total = getTotals().totalChants;
      setChants(total);
      // Persist the first date each crossed tier was reached.
      const map = readJSON<EarnedMap>(KEYS.milestones, {});
      let changed = false;
      for (const tier of TIERS) {
        if (total >= tier.threshold && !map[tier.id]) {
          map[tier.id] = new Date().toISOString();
          changed = true;
        }
      }
      if (changed) writeJSON(KEYS.milestones, map);
      setEarned({ ...map });
    };
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key.startsWith("njc-")) refresh();
    };
    window.addEventListener("storage", onStorage);
    const id = window.setInterval(refresh, 5000);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.clearInterval(id);
    };
  }, []);

  const earnedTiers = useMemo(() => TIERS.filter((t) => chants >= t.threshold), [chants]);
  const current = useMemo(() => TIERS.find((t) => chants < t.threshold) || TIERS[TIERS.length - 1], [chants]);
  const prevThreshold = useMemo(() => {
    const idx = TIERS.findIndex((t) => t.id === current.id);
    return idx > 0 ? TIERS[idx - 1].threshold : 0;
  }, [current]);

  const span = Math.max(1, current.threshold - prevThreshold);
  const into = Math.min(span, Math.max(0, chants - prevThreshold));
  const pct = Math.min(100, Math.round((into / span) * 100));
  const remaining = Math.max(0, current.threshold - chants);

  // Progress ring geometry
  const R = 54;
  const C = 2 * Math.PI * R;

  return (
    <section className="mile" aria-label="Milestones">
      <header className="mile-head">
        <h1>Milestones</h1>
        <p>Sacred markers on your journey of devotion</p>
      </header>

      {/* Earned badges */}
      <div className="mile-card">
        <div className="card-head">
          <span className="card-icon" aria-hidden="true">🏅</span>
          <div>
            <h2>Earned Badges</h2>
            <p>"Markers of your devotion journey."</p>
          </div>
        </div>

        {earnedTiers.length ? (
          <>
            <div className="badge-list">
              {earnedTiers.map((t) => (
                <article className="badge" key={t.id}>
                  <span className="badge-glyph" aria-hidden="true">{t.glyph}</span>
                  <div className="badge-body">
                    <strong>{t.name} <span>({t.meaning})</span></strong>
                    <span className="badge-sub">{compact(t.threshold)} chants</span>
                    {earned[t.id] ? <span className="badge-date">{formatDate(earned[t.id])}</span> : null}
                  </div>
                  <span className="badge-check" aria-hidden="true">✓</span>
                </article>
              ))}
            </div>
            <div className="mile-pill">{earnedTiers.length} milestone{earnedTiers.length > 1 ? "s" : ""} achieved</div>
          </>
        ) : (
          <p className="mile-empty">No badge yet. Your first 108 chants earn Arambh (Beginning).</p>
        )}
      </div>

      {/* Current milestone */}
      <div className="mile-card">
        <div className="card-head">
          <span className="card-icon" aria-hidden="true">◎</span>
          <div>
            <h2>Current Milestone</h2>
            <p>"The path you are walking now."</p>
          </div>
        </div>

        <div className="current-row">
          <div className="current-copy">
            <span className="current-eyebrow">Currently walking towards</span>
            <h3>{current.name} <small>({current.meaning})</small></h3>
            <div className="current-figures">
              <strong>{compact(chants)}</strong>
              <span>/ {compact(current.threshold)}</span>
            </div>
            <p className="current-remaining">{compact(remaining)} chants remaining</p>
            <div className="current-bar"><i style={{ width: `${pct}%` }} /></div>
          </div>

          <svg className="ring" viewBox="0 0 128 128" role="img" aria-label={`${pct}% to ${current.name}`}>
            <circle cx="64" cy="64" r={R} className="ring-track" fill="none" strokeWidth="8" />
            <circle
              cx="64" cy="64" r={R} className="ring-fill" fill="none" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)} transform="rotate(-90 64 64)"
            />
            <text x="64" y="60" className="ring-pct">{pct}%</text>
            <text x="64" y="80" className="ring-lbl">{current.name}</text>
          </svg>
        </div>
      </div>

      {/* The Path */}
      <div className="mile-card">
        <div className="card-head">
          <span className="card-icon" aria-hidden="true">⋮</span>
          <div>
            <h2>The Path</h2>
            <p>Every step is sacred</p>
          </div>
        </div>

        <ol className="path">
          {TIERS.map((t) => {
            const done = chants >= t.threshold;
            const isCurrent = t.id === current.id && !done;
            return (
              <li key={t.id} className={`path-step ${done ? "is-done" : ""} ${isCurrent ? "is-current" : ""}`}>
                <span className="path-node" aria-hidden="true">{t.glyph}</span>
                <div className="path-body">
                  <strong>{t.name} <span>({t.meaning})</span></strong>
                  <span className="path-thr">{compact(t.threshold)}</span>
                  {done ? (
                    <span className="path-state done">{earned[t.id] ? formatDate(earned[t.id]) : "Earned"}</span>
                  ) : isCurrent ? (
                    <span className="path-state current">In progress</span>
                  ) : (
                    <span className="path-state">Locked</span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
