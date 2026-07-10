"use client";

import * as React from "react";
import "./bucket-counter.css";

/**
 * Kids Naam Jaap Counter — "Fill the Bhakti Bucket".
 *
 * A faithful React/TypeScript port of the reference tool: children chant a
 * naam, tap the cute bucket, and fill it with 108 blessings. Every full 108
 * saves a "happy mala" (local only) and unlocks a surprise reward world.
 * All markup/class names match the shared stylesheet in ./bucket-counter.css.
 */

const TARGET = 108;
const STORAGE_KEY = "naamjapa-kids-counter-v1";

interface MantraDef {
  label: string;
  short: string;
  hindi: string;
  guide: string;
}

const MANTRAS: Record<string, MantraDef> = {
  radhe: { label: "Radhe Radhe", short: "Radhe", hindi: "राधे राधे", guide: "Say Radhe Radhe with love." },
  krishna: { label: "Hare Krishna", short: "Krishna", hindi: "हरे कृष्ण", guide: "Say Krishna and fill the bucket." },
  ram: { label: "Ram Ram", short: "Ram", hindi: "राम राम", guide: "Say Ram Ram slowly." },
  shiv: { label: "Om Namah Shivaya", short: "Shiv", hindi: "ॐ नमः शिवाय", guide: "Say Om Namah Shivaya calmly." },
  waheguru: { label: "Waheguru", short: "Waheguru", hindi: "वाहेगुरु", guide: "Say Waheguru with a happy heart." },
};

interface WorldDef {
  label: string;
  item: string;
  color: string;
  accent: string;
  done: string;
  meaning: string;
  surprise: string;
}

const WORLDS: Record<string, WorldDef> = {
  flowers: { label: "Flower bucket", item: "flower", color: "#ff8ab3", accent: "#78dca5", done: "The flower bucket is full.", meaning: "Love grows one naam at a time.", surprise: "A garden of kindness is waiting." },
  stars: { label: "Star sky", item: "star", color: "#ffd166", accent: "#6dbdff", done: "The star sky is shining.", meaning: "Every naam becomes a brave little star.", surprise: "A courage sky may open next." },
  butter: { label: "Makhan pot", item: "butter", color: "#fff1a8", accent: "#ffb45f", done: "Krishna's makhan pot is full.", meaning: "Joy becomes sweet like makhan.", surprise: "Krishna may fill the makhan pot." },
  lotus: { label: "Lotus pond", item: "lotus", color: "#a78bfa", accent: "#65d6c8", done: "The lotus pond is blooming.", meaning: "Calm blooms inside the heart.", surprise: "A quiet lotus pond may appear." },
  rainbow: { label: "Rainbow blessing", item: "rainbow", color: "#87d7ff", accent: "#ff87b5", done: "The rainbow blessing is bright.", meaning: "Good thoughts can become colorful again.", surprise: "A rainbow blessing may shine." },
  bells: { label: "Temple bells", item: "bell", color: "#ffd76e", accent: "#c990ff", done: "The temple bells are ringing.", meaning: "The heart learns to listen softly.", surprise: "Temple bells may ring next." },
};

const WORLD_KEYS = Object.keys(WORLDS);

interface Round {
  id: string;
  date: string;
  mantra: string;
  count: number;
  durationSec: number;
  reward: string;
}

/** Pick a random world different from the current one. */
function surpriseWorld(current: string): string {
  const others = WORLD_KEYS.filter((k) => k !== current);
  return others[Math.floor(Math.random() * others.length)] || current;
}

function loadHistory(): Round[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(raw) ? raw.slice(0, 30) : [];
  } catch {
    return [];
  }
}

function saveHistory(rounds: Round[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rounds.slice(0, 30)));
  } catch {
    /* storage blocked — keep working in memory */
  }
}

const pad2 = (n: number) => String(Math.floor(n)).padStart(2, "0");
function clock(totalSec: number): string {
  const s = Math.max(0, Math.floor(totalSec));
  return `${pad2(Math.floor(s / 60))}:${pad2(s % 60)}`;
}
function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

interface AudioRef {
  context: AudioContext;
  master: GainNode;
}

export default function BucketCounter() {
  const audioRef = React.useRef<AudioRef | null>(null);

  const [mantraKey, setMantraKey] = React.useState<string>("radhe");
  const [worldKey, setWorldKey] = React.useState<string>("flowers");
  const [count, setCount] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const [elapsed, setElapsed] = React.useState(0);
  const [soundOn, setSoundOn] = React.useState(true);
  const [buzzOn, setBuzzOn] = React.useState(true);
  const [history, setHistory] = React.useState<Round[]>([]);
  const [burst, setBurst] = React.useState(0);
  const [tapPlus, setTapPlus] = React.useState(0);
  const [touched, setTouched] = React.useState(false);
  const [surpriseMsg, setSurpriseMsg] = React.useState("A surprise world opens after 108.");

  const mantra = MANTRAS[mantraKey];
  const world = WORLDS[worldKey];
  const left = TARGET - count;
  const fillPct = Math.min(100, (count / TARGET) * 100);
  const itemCount = Math.min(24, Math.floor((count / TARGET) * 24));

  const totals = React.useMemo(
    () => ({
      rounds: history.length,
      chants: history.reduce((sum, r) => sum + r.count, 0) + count,
    }),
    [count, history]
  );

  // Load saved buckets on mount.
  React.useEffect(() => {
    setHistory(loadHistory());
  }, []);

  // Tick the timer while running.
  React.useEffect(() => {
    if (!running || startTime == null) return;
    const id = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 500);
    return () => window.clearInterval(id);
  }, [running, startTime]);

  // Vibration helper (respects the Buzz toggle).
  const buzz = React.useCallback(
    (pattern: number | number[]) => {
      if (!buzzOn) return;
      if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
      try {
        navigator.vibrate(pattern);
      } catch {
        /* ignore */
      }
    },
    [buzzOn]
  );

  // Lazily create/resume the shared AudioContext.
  const ensureAudio = React.useCallback(async (): Promise<AudioRef | null> => {
    if (!soundOn) return null;
    if (audioRef.current) {
      await audioRef.current.context.resume();
      return audioRef.current;
    }
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    const context = new AC();
    const master = context.createGain();
    master.gain.value = 0.28;
    master.connect(context.destination);
    audioRef.current = { context, master };
    return audioRef.current;
  }, [soundOn]);

  // Play a soft blip (or a happy chord when `chord` is true).
  const playTone = React.useCallback(
    async (chord = false) => {
      const a = await ensureAudio();
      if (!a) return;
      const t0 = a.context.currentTime;
      const notes = chord ? [523.25, 659.25, 783.99] : [523.25];
      notes.forEach((freq, i) => {
        const osc = a.context.createOscillator();
        const gain = a.context.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, t0 + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(chord ? 0.16 : 0.08, t0 + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + i * 0.08 + 0.42);
        osc.connect(gain);
        gain.connect(a.master);
        osc.start(t0 + i * 0.08);
        osc.stop(t0 + i * 0.08 + 0.5);
      });
    },
    [ensureAudio]
  );

  // Complete a full 108: save the bucket, reset, unlock a surprise world.
  const completeBucket = React.useCallback(
    async (durationSec: number) => {
      const round: Round = {
        id: `kid_${Date.now()}`,
        date: new Date().toISOString(),
        mantra: mantra.label,
        count: TARGET,
        durationSec,
        reward: worldKey,
      };
      const next = [round, ...history].slice(0, 30);
      setHistory(next);
      saveHistory(next);
      setCount(0);
      setElapsed(0);
      setStartTime(null);
      setRunning(false);
      const nextWorld = surpriseWorld(worldKey);
      setWorldKey(nextWorld);
      setSurpriseMsg(`Surprise unlocked: ${WORLDS[nextWorld].label}`);
      setBurst((b) => b + 1);
      await playTone(true);
    },
    [history, mantra.label, worldKey, playTone]
  );

  // The tap handler — one naam.
  const addNaam = React.useCallback(async () => {
    setTouched(true);
    setTapPlus((n) => n + 1);
    window.setTimeout(() => setTouched(false), 520);

    if (!running) {
      setRunning(true);
      setStartTime(Date.now() - elapsed * 1000);
    }

    const next = count + 1;
    if (next >= TARGET) {
      const dur = startTime ? Math.floor((Date.now() - startTime) / 1000) : elapsed;
      buzz([40, 40, 80, 40, 160]);
      await completeBucket(Math.max(1, dur));
      return;
    }
    setCount(next);
    if (next % 9 === 0) {
      setBurst((b) => b + 1);
      buzz([20, 30, 50]);
    } else {
      buzz(18);
    }
    await playTone(false);
  }, [running, elapsed, count, startTime, buzz, completeBucket, playTone]);

  // Space / Enter anywhere adds a naam. No dep array (matches reference) so the
  // handler always sees fresh state.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        void addNaam();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const undo = () => setCount((c) => Math.max(0, c - 1));
  const empty = () => {
    setCount(0);
    setElapsed(0);
    setStartTime(null);
    setRunning(false);
  };
  const surpriseNow = () => {
    const w = surpriseWorld(worldKey);
    setWorldKey(w);
    setSurpriseMsg(`Now playing: ${WORLDS[w].label}`);
    setBurst((b) => b + 1);
  };
  const clearHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setHistory([]);
  };

  const rootStyle = {
    "--kid-fill": world.color,
    "--kid-accent": world.accent,
  } as React.CSSProperties;

  return (
    <section className="kids-counter" style={rootStyle} aria-label="Kids Naam Jaap counter">
      <div className="kids-hero">
        <div className="kids-sky" aria-hidden="true">
          <span className="kid-cloud cloud-1" />
          <span className="kid-cloud cloud-2" />
          <span className="kid-sun" />
        </div>

        <div className="kids-hero-top">
          <div className="kids-copy">
            <p className="kids-eyebrow">Kids Naam Jaap</p>
            <h1>Fill the Bhakti Bucket</h1>
            <p>One naam. One drop of joy. Fill 108 with Krishna.</p>
          </div>
          <div className="kids-mini-stats" aria-label="Kids counter totals">
            <span>
              <strong>{count}</strong>said
            </span>
            <span>
              <strong>{left}</strong>left
            </span>
            <span>
              <strong>{clock(elapsed)}</strong>time
            </span>
          </div>
        </div>

        <div className={touched ? "kids-world touched" : "kids-world"}>
          <div className="reward-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="krishna-scene" aria-hidden="true">
            <div className="krishna-card">
              <div className="halo" />
              <div className="kid-body">
                <span className="kid-arm kid-arm-left" />
                <span className="kid-arm kid-arm-right" />
                <div className="kid-face">
                  <span className="hair" />
                  <span className="curl curl-1" />
                  <span className="curl curl-2" />
                  <span className="tilak" />
                  <span className="cheek cheek-left" />
                  <span className="cheek cheek-right" />
                  <span className="eye eye-left" />
                  <span className="eye eye-right" />
                  <span className="smile" />
                </div>
                <span className="kid-dhoti" />
              </div>
              <div className="flute" />
              <div className="peacock-feather" />
            </div>
            <strong className="krishna-name">{mantra.short}</strong>
          </div>

          <button type="button" className="bucket-button" onClick={addNaam} aria-label="Add one naam">
            <span className={`bucket reward-${worldKey}`}>
              <span className="bucket-handle" />
              <span className="bucket-lip" />
              <span className="bucket-fill" style={{ height: `${fillPct}%` }} />
              <span className="bucket-waves" style={{ bottom: `${Math.max(10, fillPct)}%` }} />
              <span className="bucket-shine" />
              {Array.from({ length: itemCount }, (_, a) => (
                <i
                  key={`${worldKey}-${a}-${burst}`}
                  className={`reward-item reward-${worldKey} item-${a % 6}`}
                  style={
                    {
                      "--x": `${12 + ((a * 17) % 74)}%`,
                      "--y": `${92 - Math.floor(a / 4) * 12}%`,
                      "--delay": `${(a % 5) * 0.04}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
              <span className="bucket-count">
                <strong>{count}</strong>
                <small>of 108</small>
              </span>
              {tapPlus > 0 && (
                <span className="tap-plus" aria-hidden="true" key={tapPlus}>
                  +1
                </span>
              )}
              <span className="bucket-world-label">
                <strong>{world.item}</strong>
              </span>
            </span>
            <span className="tap-text">{mantra.label}</span>
          </button>

          <div className="kids-hero-action">
            <button type="button" className="kid-primary" onClick={addNaam}>
              I said one naam
            </button>
            <small>{left} more drops to fill the bucket</small>
          </div>
        </div>

        <div className="reward-surprise" aria-live="polite">
          <strong>{world.label}</strong>
          <span>{count === 0 ? surpriseMsg : world.meaning}</span>
        </div>

        <div className="kids-quick-actions" aria-label="Counter controls">
          <button type="button" className="kid-secondary" onClick={undo}>
            Undo
          </button>
          <button type="button" className="kid-secondary" onClick={empty}>
            Empty
          </button>
          <button
            type="button"
            className={soundOn ? "kid-secondary active" : "kid-secondary"}
            onClick={() => setSoundOn((s) => !s)}
          >
            {soundOn ? "Sound" : "Silent"}
          </button>
          <button
            type="button"
            className={buzzOn ? "kid-secondary active" : "kid-secondary"}
            onClick={() => {
              setBuzzOn((s) => {
                if (!s && typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
                  try {
                    navigator.vibrate(18);
                  } catch {
                    /* ignore */
                  }
                }
                return !s;
              });
            }}
          >
            {buzzOn ? "Buzz" : "No buzz"}
          </button>
        </div>
      </div>

      <div className="kids-layout" aria-label="Quiet parent settings">
        <details className="kids-panel kids-settings" open>
          <summary>Choose naam</summary>
          <p className="kids-panel-kicker">Choose naam</p>
          <div className="kid-choice-grid">
            {Object.keys(MANTRAS).map((k) => (
              <button
                key={k}
                type="button"
                className={mantraKey === k ? "kid-choice active" : "kid-choice"}
                onClick={() => setMantraKey(k)}
              >
                <strong>{MANTRAS[k].label}</strong>
                <span>{MANTRAS[k].hindi}</span>
              </button>
            ))}
          </div>
          <div className="kid-guide">
            <strong>{mantra.guide}</strong>
            <span>Parents can read this line and the child taps the bucket after saying the naam.</span>
          </div>
        </details>

        <section className="kids-panel kids-story-panel">
          <p className="kids-panel-kicker">Tiny progress</p>
          <h2>{world.meaning}</h2>
          <div className="kid-progress-row">
            <div>
              <strong>{Math.round(fillPct)}%</strong>
              <span>bucket full</span>
            </div>
            <div>
              <strong>{clock(elapsed)}</strong>
              <span>time</span>
            </div>
            <div>
              <strong>{totals.chants}</strong>
              <span>total names</span>
            </div>
          </div>
        </section>

        <details className="kids-panel kids-settings">
          <summary>Reward surprise</summary>
          <p className="kids-panel-kicker">Reward surprise</p>
          <div className="kid-choice-grid reward-grid">
            {WORLD_KEYS.map((k) => (
              <button
                key={k}
                type="button"
                className={worldKey === k ? "kid-choice active" : "kid-choice"}
                onClick={() => setWorldKey(k)}
              >
                <strong>{WORLDS[k].label}</strong>
                <span>{WORLDS[k].meaning}</span>
              </button>
            ))}
          </div>
          <div className="kid-guide reward-note">
            <strong>After every full 108, the next reward changes by surprise.</strong>
            <span>{world.surprise}</span>
            <button type="button" className="kid-secondary reward-shuffle" onClick={surpriseNow}>
              Surprise now
            </button>
          </div>
        </details>
      </div>

      <div className="kids-history">
        <div>
          <p className="kids-panel-kicker">Happy malas</p>
          <h2>{totals.rounds} full buckets saved</h2>
        </div>
        <div className="kid-round-list">
          {history.length ? (
            history.slice(0, 6).map((r) => (
              <article key={r.id}>
                <strong>{r.mantra}</strong>
                <span>
                  {shortDate(r.date)} · {clock(r.durationSec)} · {WORLDS[r.reward].label}
                </span>
              </article>
            ))
          ) : (
            <p>No full bucket yet. Start with one naam.</p>
          )}
        </div>
        <button type="button" className="kid-secondary clear-kid-history" onClick={clearHistory}>
          Clear saved buckets
        </button>
      </div>
    </section>
  );
}
