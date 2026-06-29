import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./ModernCounter.css";
import PhysicsMala from "./PhysicsMala";
import {
  KEYS,
  type DayLog,
  compact,
  dayKey,
  formatClock,
  getTotals,
  readJSON,
  recordMala,
  writeJSON,
} from "../lib/japaStore";

type Mode = "manual" | "auto" | "mala";
type SoundId = "temple" | "soft" | "wooden";

type Settings = {
  mode: Mode;
  malaSize: number;
  vibrateEach: boolean;
  vibrateComplete: boolean;
  freeStyle: boolean;
  soundOn: boolean;
  chimeEach: boolean;
  volume: number;
  sound: SoundId;
  autoTempoMs: number;
  mantra: string;
  deity: string;
};

type GoalLite = { metric: "malas" | "chants"; period: string; target: number };

const DEFAULTS: Settings = {
  mode: "manual",
  malaSize: 108,
  vibrateEach: true,
  vibrateComplete: true,
  freeStyle: false,
  soundOn: true,
  chimeEach: true,
  volume: 0.5,
  sound: "temple",
  autoTempoMs: 1400,
  mantra: "Radhe Radhe",
  deity: "Radhe",
};

const SOUNDS: { id: SoundId; label: string }[] = [
  { id: "temple", label: "Temple Bell" },
  { id: "soft", label: "Soft Bell" },
  { id: "wooden", label: "Wooden Click" },
];

const NAV_LINKS = [
  { label: "Counter", href: "/free-tools/naam-jaap-counter-modern/", active: true },
  { label: "Journey", href: "/free-tools/japa-journey/" },
  { label: "Milestones", href: "/free-tools/japa-milestones/" },
  { label: "Goals", href: "/free-tools/japa-goals/" },
];

const DEITY_IMG_KEY = "njc-deity-image";

export default function ModernCounter() {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [totals, setTotals] = useState(getTotals());
  const [todayMalas, setTodayMalas] = useState(0);
  const [goal, setGoal] = useState<GoalLite | null>(null);
  const [deityImage, setDeityImage] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);

  const rootRef = useRef<HTMLElement | null>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const startedAt = useRef<number | null>(null);
  const lastFeedback = useRef(0);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  // Load
  useEffect(() => {
    setSettings({ ...DEFAULTS, ...readJSON<Partial<Settings>>(KEYS.settings, {}) });
    setDeityImage(readJSON<string>(DEITY_IMG_KEY, ""));
    refreshDerived();
  }, []);

  const refreshDerived = useCallback(() => {
    setTotals(getTotals());
    const log = readJSON<DayLog>(KEYS.dayLog, {});
    setTodayMalas(log[dayKey()]?.malas || 0);
    const goals = readJSON<GoalLite[]>(KEYS.goals, []);
    setGoal(goals.find((g) => g.period === "daily" && g.metric === "malas") || null);
  }, []);

  // Persist settings
  useEffect(() => {
    writeJSON(KEYS.settings, settings);
  }, [settings]);

  // Session timer
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setElapsed((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  // Auto mode increments
  useEffect(() => {
    if (!running || settings.mode !== "auto") return;
    const id = window.setInterval(() => addCount(), settings.autoTempoMs);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, settings.mode, settings.autoTempoMs]);

  const ensureAudio = () => {
    if (typeof window === "undefined") return null;
    const Ctor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    if (!audioRef.current) audioRef.current = new Ctor();
    if (audioRef.current.state === "suspended") void audioRef.current.resume();
    return audioRef.current;
  };

  // Synthesize the chosen sound. Used for previews and mala completion.
  const renderSound = (id: SoundId, volume: number) => {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const out = ctx.createGain();
    out.gain.value = Math.max(0, volume);
    out.connect(ctx.destination);

    if (id === "wooden") {
      // Short percussive click: filtered noise burst + tiny blip.
      const len = Math.floor(ctx.sampleRate * 0.06);
      const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < len; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 1800;
      bp.Q.value = 6;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.9, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      src.connect(bp).connect(g).connect(out);
      src.start(now);
      src.stop(now + 0.09);
      return;
    }

    // Bell tones: inharmonic partials with long decay (temple) or softer/shorter (soft).
    const base = id === "temple" ? 523.25 : 660;
    const partials = id === "temple" ? [1, 2.01, 2.78, 4.16, 5.43] : [1, 2.0, 3.01];
    const gains = id === "temple" ? [1, 0.5, 0.34, 0.16, 0.1] : [1, 0.35, 0.16];
    const decay = id === "temple" ? 2.6 : 1.3;
    partials.forEach((p, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = id === "temple" ? "sine" : "triangle";
      osc.frequency.value = base * p;
      const peak = 0.22 * gains[i];
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), now + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, now + decay * (1 - i * 0.12));
      osc.connect(g).connect(out);
      osc.start(now);
      osc.stop(now + decay + 0.1);
    });
  };

  const previewSound = (id: SoundId) => {
    ensureAudio();
    renderSound(id, Math.max(0.15, settingsRef.current.volume));
  };

  const playChime = (complete: boolean) => {
    const s = settingsRef.current;
    if (!s.soundOn) return;
    if (complete) {
      renderSound(s.sound, s.volume);
      return;
    }
    // Soft bell chime on each bead (toggleable).
    if (!s.chimeEach) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime;
    const out = ctx.createGain();
    out.gain.value = Math.max(0, s.volume);
    out.connect(ctx.destination);
    [880, 1320].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      const peak = (i === 0 ? 0.14 : 0.05);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      osc.connect(gain).connect(out);
      osc.start(now);
      osc.stop(now + 0.32);
    });
  };

  const buzz = (pattern: number | number[]) => {
    if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
    try {
      navigator.vibrate(pattern);
    } catch {
      /* not allowed */
    }
  };

  const addCount = useCallback(() => {
    ensureAudio();
    if (!running) {
      setRunning(true);
      startedAt.current = startedAt.current ?? Date.now();
    }
    setPulse((p) => p + 1);
    setCount((prev) => {
      const s = settingsRef.current;
      const next = prev + 1;
      const isComplete = next % s.malaSize === 0;
      if (isComplete) {
        const since = startedAt.current ? Math.floor((Date.now() - startedAt.current) / 1000) : elapsed;
        recordMala({ size: s.malaSize, durationSec: since, mantra: s.mantra, deity: s.deity });
        startedAt.current = Date.now();
        setElapsed(0);
        refreshDerived();
        playChime(true);
        if (s.vibrateComplete) buzz([20, 40, 30, 40, 80]);
        return s.freeStyle ? next : 0;
      }
      // Throttle per-bead feedback so fast spins don't blast sound/haptics.
      const now = Date.now();
      if (now - lastFeedback.current > 45) {
        lastFeedback.current = now;
        playChime(false);
        if (s.vibrateEach) buzz(10);
      }
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, elapsed, refreshDerived]);

  // Keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && /input|textarea|select/i.test(t.tagName)) return;
      if (e.key === "Escape" && fullscreen && !document.fullscreenElement) {
        e.preventDefault();
        setFullscreen(false);
        return;
      }
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        addCount();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [addCount, fullscreen]);

  // Undo one bead (used when the mala is spun backwards).
  const removeCount = useCallback(() => {
    setCount((c) => Math.max(0, c - 1));
  }, []);

  const reset = () => {
    setCount(0);
    setElapsed(0);
    setRunning(false);
    startedAt.current = null;
    setResetSignal((v) => v + 1);
  };

  // Fullscreen (focus mode), with a CSS fallback when the API is blocked.
  useEffect(() => {
    const onFs = () => setFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggleFullscreen = async () => {
    const node = rootRef.current;
    if (!node) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await node.requestFullscreen();
      }
    } catch {
      // API unavailable (e.g. iOS Safari) — fall back to a CSS full-screen layer.
      setFullscreen((v) => !v);
    }
  };

  const handleImage = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = String(reader.result || "");
      setDeityImage(data);
      writeJSON(DEITY_IMG_KEY, data);
    };
    reader.readAsDataURL(file);
  };

  const ringPct = (count % settings.malaSize) / settings.malaSize;
  const inMala = count % settings.malaSize;

  // Bead layout (cap visual beads, fill proportionally)
  const beadCount = Math.min(settings.malaSize, 54);
  const beads = useMemo(() => {
    return Array.from({ length: beadCount }, (_, i) => {
      const angle = -Math.PI / 2 + (i / beadCount) * Math.PI * 2;
      return { i, x: 200 + Math.cos(angle) * 150, y: 200 + Math.sin(angle) * 150 };
    });
  }, [beadCount]);
  const activeBeads = Math.round(ringPct * beadCount);

  const goalText = goal ? `${todayMalas} / ${goal.target} malas` : "No goal set";
  const goalPct = goal ? Math.min(100, Math.round((todayMalas / Math.max(1, goal.target)) * 100)) : 0;

  const idle = !running;

  return (
    <section ref={rootRef} className={`mc ${fullscreen ? "is-fullscreen" : ""}`} aria-label="Modern Naam Jaap counter">
      {fullscreen ? (
        <button className="mc-fs-exit" onClick={() => void toggleFullscreen()} aria-label="Exit fullscreen">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
          <span>Exit</span>
        </button>
      ) : null}

      <div className="mc-stage-wrap">
        {settings.mode === "mala" ? (
          <div className="mc-stage mc-stage-mala">
            <PhysicsMala
              malaSize={settings.malaSize}
              onBead={addCount}
              onUndo={removeCount}
              resetSignal={resetSignal}
            />
            <span className="mc-center mc-center-static">
              {deityImage ? (
                <span className="mc-deity" style={{ backgroundImage: `url(${deityImage})` }} />
              ) : (
                <label className="mc-upload">
                  <span aria-hidden="true">🖼+</span>
                  <input type="file" accept="image/*" hidden onChange={(e) => handleImage(e.target.files?.[0])} />
                </label>
              )}
            </span>
          </div>
        ) : (
          <button className="mc-stage" onClick={addCount} aria-label="Tap to count">
            <svg className={`mc-orbit ${idle ? "is-idle" : ""}`} viewBox="0 0 400 400" aria-hidden="true">
              <g className="orbit-rings">
                <circle cx="200" cy="200" r="182" className="orbit-dashed" fill="none" />
                <circle cx="200" cy="200" r="150" className="orbit-solid" fill="none" />
              </g>
              {beads.map((b) => (
                <circle
                  key={b.i}
                  cx={b.x}
                  cy={b.y}
                  r={b.i === activeBeads - 1 ? 6 : 4.5}
                  className={`orbit-bead ${b.i < activeBeads ? "is-on" : ""} ${b.i === activeBeads - 1 ? "is-head" : ""}`}
                />
              ))}
              <circle cx="200" cy="200" r="110" className="orbit-core" />
            </svg>

            <span className={`mc-center ${pulse ? "pulse" : ""}`} key={pulse}>
              {deityImage ? (
                <span className="mc-deity" style={{ backgroundImage: `url(${deityImage})` }} />
              ) : (
                <label className="mc-upload" onClick={(e) => e.stopPropagation()}>
                  <span aria-hidden="true">🖼+</span>
                  <input type="file" accept="image/*" hidden onChange={(e) => handleImage(e.target.files?.[0])} />
                </label>
              )}
            </span>
          </button>
        )}

        {/* Floating tiles */}
        <div className="mc-tile tile-time">
          <small>Time</small>
          <strong>{formatClock(elapsed)}</strong>
        </div>
        <div className="mc-tile tile-total">
          <small>Total</small>
          <strong>
            <b className="t-blue">{compact(totals.totalMalas)}</b> M ·{" "}
            <b className="t-green">{compact(totals.totalChants)}</b>
          </strong>
        </div>
        <div className="mc-tile tile-count">
          <small>Count</small>
          <strong>{inMala}</strong>
        </div>
        <div className={`mc-tile tile-goal ${goal ? "" : "is-empty"}`}>
          <small>{goal ? "Daily goal" : "No goal set"}</small>
          <span className="tile-goal-bar"><i style={{ width: `${goalPct}%` }} /></span>
        </div>
      </div>

      {count === 0 && !running ? (
        <div className="mc-mode-pill">
          <span className="dot" />{" "}
          {settings.mode === "manual"
            ? "Manual Mode: Tap to Count"
            : settings.mode === "auto"
              ? "Auto Mode: Hands-free"
              : "Mala Mode: Spin the beads"}
        </div>
      ) : null}

      <div className="mc-controls">
        <button className="mc-start" onClick={() => { ensureAudio(); setRunning((v) => !v); startedAt.current = startedAt.current ?? Date.now(); }}>
          {running ? "⏸ Pause" : "▷ Start"}
        </button>
        <button className="mc-new" onClick={reset}>↻ New</button>

        <button
          className="mc-icon-btn"
          onClick={() => void toggleFullscreen()}
          aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          {fullscreen ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 4H5a1 1 0 0 0-1 1v4M15 4h4a1 1 0 0 1 1 1v4M9 20H5a1 1 0 0 1-1-1v-4M15 20h4a1 1 0 0 0 1-1v-4" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4" />
            </svg>
          )}
        </button>

        <div className="mc-menu-wrap">
          <button
            className="mc-icon-btn"
            aria-haspopup="true"
            aria-expanded={navOpen}
            aria-label="Progress menu"
            title="Progress"
            onClick={() => setNavOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17l6-6 4 4 7-7" />
              <path d="M17 8h4v4" />
            </svg>
          </button>
          {navOpen ? (
            <>
              <button className="mc-menu-scrim" aria-label="Close menu" onClick={() => setNavOpen(false)} />
              <div className="mc-menu" role="menu">
                {NAV_LINKS.map((l) => (
                  <a key={l.href} href={l.href} role="menuitem" className={l.active ? "is-active" : ""}>
                    {l.label}
                  </a>
                ))}
              </div>
            </>
          ) : null}
        </div>

        <button className="mc-more" onClick={() => setShowSettings(true)} aria-label="Settings" title="Settings">⋮</button>
      </div>

      {showSettings ? (
        <SettingsModal
          settings={settings}
          inMala={inMala}
          onChange={setSettings}
          onPreview={previewSound}
          onClose={() => setShowSettings(false)}
        />
      ) : null}
    </section>
  );
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button type="button" className={`mc-toggle ${on ? "on" : ""}`} onClick={onClick} role="switch" aria-checked={on}>
      <span />
    </button>
  );
}

function SettingsModal({
  settings,
  inMala,
  onChange,
  onPreview,
  onClose,
}: {
  settings: Settings;
  inMala: number;
  onChange: (s: Settings) => void;
  onPreview: (id: SoundId) => void;
  onClose: () => void;
}) {
  const set = (patch: Partial<Settings>) => onChange({ ...settings, ...patch });
  const sizeLocked = inMala > 0;

  return (
    <div className="mc-modal-backdrop" role="dialog" aria-modal="true" aria-label="Japa Settings">
      <button className="mc-modal-scrim" aria-label="Close" onClick={onClose} />
      <div className="mc-modal">
        <div className="mc-modal-head">
          <strong>⚙ Japa Settings</strong>
          <button className="mc-x" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="mc-modal-body">
          <section className="mc-sec">
            <h3>Mode</h3>
            <p>Choose how you want to count</p>
            <div className="mc-seg">
              {(["manual", "auto", "mala"] as Mode[]).map((m) => (
                <button key={m} className={settings.mode === m ? "on" : ""} onClick={() => set({ mode: m })}>
                  {m === "manual" ? "Manual" : m === "auto" ? "Auto" : "Mala"}
                </button>
              ))}
            </div>
            <div className="mc-note">
              {settings.mode === "manual" ? (
                <>
                  <strong>Tap/Click</strong> anywhere on the circle to count. Or press <strong>Space / Enter</strong>.
                </>
              ) : settings.mode === "auto" ? (
                <>Counts automatically while running. Adjust the tempo below.</>
              ) : (
                <>
                  <strong>Spin the mala</strong> — drag the bead ring and let it go. It keeps turning with
                  momentum and slows naturally. Each bead past the top marker is one chant; one full turn = one mala.
                </>
              )}
            </div>
            {settings.mode === "auto" ? (
              <label className="mc-range">
                Tempo: {(settings.autoTempoMs / 1000).toFixed(1)}s per chant
                <input
                  type="range"
                  min={600}
                  max={4000}
                  step={100}
                  value={settings.autoTempoMs}
                  onChange={(e) => set({ autoTempoMs: Number(e.target.value) })}
                />
              </label>
            ) : null}
          </section>

          <section className="mc-sec">
            <h3>Vibration</h3>
            <p>Haptic feedback on mobile &amp; tablet devices</p>
            <div className="mc-toggle-row">
              <div><strong>On Each Count</strong><span>Light vibration per count</span></div>
              <Toggle on={settings.vibrateEach} onClick={() => set({ vibrateEach: !settings.vibrateEach })} />
            </div>
            <div className="mc-toggle-row">
              <div><strong>On Mala Completion</strong><span>Vibrate when mala completes</span></div>
              <Toggle on={settings.vibrateComplete} onClick={() => set({ vibrateComplete: !settings.vibrateComplete })} />
            </div>
            <p className="mc-fine">iOS devices use a subtle sound instead of vibration.</p>
          </section>

          <section className="mc-sec">
            <h3>Counting Style</h3>
            <p>Traditional mala-based or continuous counting</p>
            <div className="mc-toggle-row">
              <div><strong>Free Style Mode</strong><span>Continuous counting without mala reset</span></div>
              <Toggle on={settings.freeStyle} onClick={() => set({ freeStyle: !settings.freeStyle })} />
            </div>
          </section>

          <section className="mc-sec">
            <h3>Mala Size</h3>
            <p>Number of beads in your mala</p>
            {sizeLocked ? (
              <div className="mc-lock">
                ⓘ Complete your current mala before changing the bead count.
                <span>{inMala} of {settings.malaSize} beads counted</span>
              </div>
            ) : null}
            <input
              className="mc-size-input"
              type="number"
              min={10}
              max={1080}
              disabled={sizeLocked}
              value={settings.malaSize}
              onChange={(e) => set({ malaSize: Math.max(10, Math.min(1080, Number(e.target.value) || 108)) })}
            />
            <p className="mc-fine">Default: 108 · Range: 10–1080</p>
          </section>

          <section className="mc-sec">
            <h3>Mantra</h3>
            <p>Saved with each completed mala</p>
            <input
              className="mc-size-input"
              value={settings.mantra}
              onChange={(e) => set({ mantra: e.target.value, deity: e.target.value.split(" ")[0] || "None" })}
            />
          </section>

          <section className="mc-sec">
            <h3>Sound</h3>
            <p>Play a sound when a mala completes</p>
            <div className="mc-toggle-row">
              <div><strong>Mala Completion Sound</strong><span>Chime when a mala completes</span></div>
              <Toggle on={settings.soundOn} onClick={() => set({ soundOn: !settings.soundOn })} />
            </div>
            <div className="mc-toggle-row">
              <div><strong>Chime On Each Bead</strong><span>Soft bell on every count</span></div>
              <Toggle on={settings.chimeEach} onClick={() => set({ chimeEach: !settings.chimeEach })} />
            </div>

            {settings.soundOn ? (
              <div className="mc-sound-panel">
                <label className="mc-range">
                  <span className="mc-vol-label">🔊 Volume <b>{Math.round(settings.volume * 100)}%</b></span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={Math.round(settings.volume * 100)}
                    onChange={(e) => set({ volume: Number(e.target.value) / 100 })}
                  />
                </label>

                <p className="mc-select-label">Select Sound</p>
                <div className="mc-sound-list">
                  {SOUNDS.map((s) => (
                    <div key={s.id} className={`mc-sound-opt ${settings.sound === s.id ? "is-on" : ""}`}>
                      <button className="mc-sound-pick" onClick={() => { set({ sound: s.id }); onPreview(s.id); }}>
                        <span className="mc-sound-check" aria-hidden="true">{settings.sound === s.id ? "✓" : ""}</span>
                        {s.label}
                      </button>
                      <button className="mc-sound-play" aria-label={`Preview ${s.label}`} onClick={() => onPreview(s.id)}>▷</button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        </div>

        <div className="mc-modal-foot">
          <button className="mc-done" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
