import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./NaamJaapCounter.css";

type Language = "en" | "hi";
type Theme = "calm" | "hindu";
type MantraId = "radhe" | "krishna" | "ram" | "shiv" | "gayatri" | "waheguru" | "custom";

type Session = {
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

type Totals = {
  totalMalas: number;
  totalChants: number;
  totalSeconds: number;
};

type DayLog = Record<string, { malas: number; chants: number; seconds: number }>;

const MALA_SIZE = 108;

const MANTRAS: Array<{ id: MantraId; en: string; hi: string; deity: string }> = [
  { id: "radhe", en: "Radhe Radhe", hi: "राधे राधे", deity: "Radhe" },
  { id: "krishna", en: "Hare Krishna", hi: "हरे कृष्ण", deity: "Krishna" },
  { id: "ram", en: "Ram Naam", hi: "राम नाम", deity: "Ram" },
  { id: "shiv", en: "Om Namah Shivaya", hi: "ॐ नमः शिवाय", deity: "Shiv" },
  { id: "gayatri", en: "Gayatri Mantra", hi: "गायत्री मंत्र", deity: "Gayatri" },
  { id: "waheguru", en: "Waheguru", hi: "वाहेगुरु", deity: "Waheguru" },
];

const DEITIES = ["None", "Radhe", "Krishna", "Ram", "Shiv", "Gayatri", "Waheguru"];

const DEITY_TEXT: Record<string, string> = {
  None: "",
  Radhe: "राधे",
  Krishna: "कृष्ण",
  Ram: "राम",
  Shiv: "शिव",
  Gayatri: "ॐ",
  Waheguru: "ੴ",
};

const UI = {
  en: {
    musicOff: "Music",
    musicOn: "Music on",
    themeCalm: "Calm",
    themeHindu: "Hindu",
    language: "EN",
    options: "Options",
    export: "Export",
    today: "Today",
    lifetime: "Lifetime",
    malas: "Malas",
    chants: "Chants",
    time: "Time",
    mantra: "Mantra",
    background: "Background",
    custom: "Custom",
    customPlaceholder: "Type your mantra",
    upload: "Upload deity photo",
    removeImage: "Remove image",
    noRecent: "Completed malas appear here after 108 counts.",
    recent: "Recent malas",
    reset: "Reset",
    undo: "Undo",
    start: "Start",
    pause: "Pause",
    resume: "Resume",
    live: "live",
    paused: "paused",
    session: "session",
    remaining: "left",
    tap: "Tap the mala ring to count",
    keyHint: "or press",
    complete: "Mala complete",
    exportTitle: "Export your jaap history",
    exportDesc: "Your data stays on this device unless you export it.",
    csv: "Download CSV",
    json: "Copy JSON",
    close: "Close",
    copied: "Copied",
    resetConfirm: "Reset current mala?",
    resetDesc: "This clears only the in-progress count, not your saved history.",
    cancel: "Cancel",
    yesReset: "Yes, reset",
  },
  hi: {
    musicOff: "संगीत",
    musicOn: "संगीत चालू",
    themeCalm: "शांत",
    themeHindu: "हिंदू",
    language: "हिं",
    options: "विकल्प",
    export: "निर्यात",
    today: "आज",
    lifetime: "कुल",
    malas: "माला",
    chants: "जाप",
    time: "समय",
    mantra: "मंत्र",
    background: "पृष्ठभूमि",
    custom: "अपना",
    customPlaceholder: "अपना मंत्र लिखें",
    upload: "देवी/देवता फोटो",
    removeImage: "फोटो हटाएँ",
    noRecent: "108 पूर्ण होने के बाद माला यहाँ दिखेगी।",
    recent: "हाल की माला",
    reset: "रीसेट",
    undo: "वापस",
    start: "आरंभ",
    pause: "रोकें",
    resume: "जारी",
    live: "चालू",
    paused: "रुका",
    session: "सत्र",
    remaining: "शेष",
    tap: "गिनने के लिए माला रिंग छुएँ",
    keyHint: "या दबाएँ",
    complete: "माला पूर्ण",
    exportTitle: "अपना जाप इतिहास निर्यात करें",
    exportDesc: "डेटा इसी डिवाइस पर रहता है, जब तक आप export न करें।",
    csv: "CSV डाउनलोड",
    json: "JSON कॉपी",
    close: "बंद",
    copied: "कॉपी हुआ",
    resetConfirm: "वर्तमान माला रीसेट करें?",
    resetDesc: "यह केवल चल रही गिनती हटाएगा, पुराना इतिहास नहीं।",
    cancel: "रद्द",
    yesReset: "हाँ, रीसेट",
  },
};

const storage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      return raw == null ? fallback : (JSON.parse(raw) as T);
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Browser storage can be full or disabled; the counter should still work.
    }
  },
  del(key: string) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      // no-op
    }
  },
};

function pad2(value: number) {
  return String(Math.floor(value)).padStart(2, "0");
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function formatTime(sec: number) {
  const safe = Math.max(0, Math.floor(sec));
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;
  return h > 0 ? `${h}:${pad2(m)}:${pad2(s)}` : `${pad2(m)}:${pad2(s)}`;
}

function formatShort(sec: number) {
  const safe = Math.max(0, Math.floor(sec));
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m`;
  return `${safe}s`;
}

function uid() {
  return `mala_${Date.now()}_${Math.floor(Math.random() * 9999)}`;
}

function migrateLegacy() {
  if (storage.get("njc-migrated", false)) return;
  const legacy = storage.get<Array<{ count?: number; time?: string }>>("njc-mala-rounds", []);
  if (Array.isArray(legacy) && legacy.length) {
    const migrated: Session[] = legacy.map((round) => {
      const parts = String(round.time || "00:00:00").split(":").map(Number);
      const durationSec = (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
      return {
        id: uid(),
        start: null,
        end: new Date().toISOString(),
        count: round.count || MALA_SIZE,
        size: MALA_SIZE,
        durationSec,
        mantra: "Migrated",
        deity: "None",
        done: true,
        createdAt: new Date().toISOString(),
      };
    });
    const existing = storage.get<Session[]>("njc-sessions", []);
    const totals = storage.get<Totals>("njc-totals", { totalMalas: 0, totalChants: 0, totalSeconds: 0 });
    migrated.forEach((s) => {
      totals.totalMalas += 1;
      totals.totalChants += s.count;
      totals.totalSeconds += s.durationSec;
    });
    storage.set("njc-sessions", [...migrated, ...existing].slice(0, 400));
    storage.set("njc-totals", totals);
  }
  storage.set("njc-migrated", true);
}

function useTone(enabled: boolean, music: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  const droneRef = useRef<{ master: GainNode; nodes: OscillatorNode[] } | null>(null);

  const ensure = useCallback(() => {
    if (typeof window === "undefined") return null;
    const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return null;
    if (!ctxRef.current) ctxRef.current = new AudioCtor();
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const chime = useCallback(
    (milestone: boolean) => {
      if (!enabled) return;
      const ctx = ensure();
      if (!ctx) return;
      const now = ctx.currentTime;
      const base = milestone ? 528 : 396;
      [1, 2].forEach((partial, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = base * partial;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime((milestone ? 0.09 : 0.045) / (i + 1), now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + (milestone ? 1.4 : 0.65));
        osc.connect(gain).connect(ctx.destination);
        osc.start(now);
        osc.stop(now + (milestone ? 1.5 : 0.72));
      });
    },
    [enabled, ensure],
  );

  useEffect(() => {
    const ctx = ensure();
    if (!ctx) return;
    if (music && !droneRef.current) {
      const master = ctx.createGain();
      master.gain.value = 0.035;
      master.connect(ctx.destination);
      const nodes = [110, 165, 220].map((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = index === 1 ? "triangle" : "sine";
        osc.frequency.value = freq;
        gain.gain.value = index === 0 ? 0.42 : 0.18;
        osc.connect(gain).connect(master);
        osc.start();
        return osc;
      });
      droneRef.current = { master, nodes };
    }
    if (!music && droneRef.current) {
      const current = droneRef.current;
      current.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
      setTimeout(() => current.nodes.forEach((node) => node.stop()), 350);
      droneRef.current = null;
    }
  }, [music, ensure]);

  return { ensure, chime };
}

function MalaRing({ count }: { count: number }) {
  const viewBox = 420;
  const cx = 210;
  const cy = 210;
  const beadRadius = 166;
  const progressRadius = beadRadius;
  const guideRadius = beadRadius + 18;
  const innerRadius = 96;
  const circumference = 2 * Math.PI * progressRadius;
  const progress = Math.min(1, count / MALA_SIZE);
  const beads = useMemo(
    () =>
      Array.from({ length: MALA_SIZE }, (_, index) => {
        const angle = -Math.PI / 2 + (index / MALA_SIZE) * Math.PI * 2;
        return {
          index,
          x: cx + Math.cos(angle) * beadRadius,
          y: cy + Math.sin(angle) * beadRadius,
        };
      }),
    [],
  );

  return (
    <svg className="mala-ring" viewBox={`0 0 ${viewBox} ${viewBox}`} role="img" aria-label={`${count} of ${MALA_SIZE} chants`}>
      <defs>
        <radialGradient id="ringGlow" cx="50%" cy="42%" r="64%">
          <stop offset="0%" stopColor="var(--ring-glow-a)" />
          <stop offset="55%" stopColor="var(--ring-glow-b)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--teal)" />
          <stop offset="58%" stopColor="var(--blue)" />
          <stop offset="100%" stopColor="var(--gold)" />
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r="198" fill="url(#ringGlow)" />
      <circle className="outer-guide-ring" cx={cx} cy={cy} r={guideRadius} fill="none" strokeWidth="2" strokeDasharray="5 10" />
      <circle className="bead-track-ring" cx={cx} cy={cy} r={progressRadius} fill="none" strokeWidth="2" />
      {beads.map((bead) => (
        <circle key={`pending-${bead.index}`} className="bead bead-pending" cx={bead.x} cy={bead.y} r="4.6" />
      ))}
      <circle
        className="progress-arc"
        cx={cx}
        cy={cy}
        r={progressRadius}
        fill="none"
        stroke="url(#progressGrad)"
        strokeLinecap="round"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - progress)}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      {beads.map((bead) => {
        const done = bead.index < count;
        const current = bead.index === Math.max(0, count - 1);
        if (!done) return null;
        return (
          <circle
            key={bead.index}
            className={`bead bead-done ${current ? "bead-current" : ""}`}
            cx={bead.x}
            cy={bead.y}
            r={current ? 8.8 : done ? 5.8 : 4.6}
          />
        );
      })}
      <circle className="inner-guide-ring" cx={cx} cy={cy} r={innerRadius} fill="none" strokeWidth="2" />
    </svg>
  );
}

export default function NaamJaapCounter() {
  const [ready, setReady] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("calm");
  const [music, setMusic] = useState(false);
  const [chimeOn, setChimeOn] = useState(true);
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [sessionStart, setSessionStart] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [totals, setTotals] = useState<Totals>({ totalMalas: 0, totalChants: 0, totalSeconds: 0 });
  const [dayLog, setDayLog] = useState<DayLog>({});
  const [mantraId, setMantraId] = useState<MantraId>("radhe");
  const [customMantra, setCustomMantra] = useState("");
  const [deity, setDeity] = useState("Radhe");
  const [deityImage, setDeityImage] = useState("");
  const [showExport, setShowExport] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showMobileTools, setShowMobileTools] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const appRef = useRef<HTMLElement | null>(null);
  const undoRef = useRef<number[]>([]);
  const elapsedRef = useRef(0);
  const sessionsRef = useRef<Session[]>([]);
  const { ensure, chime } = useTone(chimeOn, music);
  const L = UI[language];

  const selectedMantra = useMemo(() => MANTRAS.find((m) => m.id === mantraId) || MANTRAS[0], [mantraId]);
  const mantraLabel = mantraId === "custom" ? customMantra || "Custom mantra" : language === "hi" ? selectedMantra.hi : selectedMantra.en;
  const mantraSub = mantraId === "custom" ? "" : language === "hi" ? selectedMantra.en : selectedMantra.hi;
  const today = dayLog[todayKey()] || { malas: 0, chants: 0, seconds: 0 };
  const remaining = MALA_SIZE - count;

  useEffect(() => {
    migrateLegacy();
    setLanguage(storage.get<Language>("njc-language", "en"));
    setTheme(storage.get<Theme>("njc-theme", "calm"));
    setMusic(storage.get("njc-music", false));
    setChimeOn(storage.get("njc-chime", true));
    setCount(storage.get("njc-current-count", 0));
    setElapsed(storage.get("njc-current-elapsed", 0));
    setSessions(storage.get("njc-sessions", []));
    setTotals(storage.get("njc-totals", { totalMalas: 0, totalChants: 0, totalSeconds: 0 }));
    setDayLog(storage.get("njc-day-log", {}));
    setMantraId(storage.get<MantraId>("njc-mantra-id", "radhe"));
    setCustomMantra(storage.get("njc-custom-mantra", ""));
    setDeity(storage.get("njc-deity", "Radhe"));
    setDeityImage(storage.get("njc-deity-image", ""));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    storage.set("njc-language", language);
    storage.set("njc-theme", theme);
    storage.set("njc-music", music);
    storage.set("njc-chime", chimeOn);
    storage.set("njc-current-count", count);
    storage.set("njc-current-elapsed", elapsed);
    storage.set("njc-sessions", sessions);
    storage.set("njc-totals", totals);
    storage.set("njc-day-log", dayLog);
    storage.set("njc-mantra-id", mantraId);
    storage.set("njc-custom-mantra", customMantra);
    storage.set("njc-deity", deity);
    storage.set("njc-deity-image", deityImage);
    document.documentElement.dataset.theme = theme;
    sessionsRef.current = sessions;
    elapsedRef.current = elapsed;
    document.dispatchEvent(new CustomEvent("naamjapa:deity", { detail: { text: DEITY_TEXT[deity] || "" } }));
  }, [ready, language, theme, music, chimeOn, count, elapsed, sessions, totals, dayLog, mantraId, customMantra, deity, deityImage]);

  useEffect(() => {
    elapsedRef.current = elapsed;
  }, [elapsed]);

  useEffect(() => {
    sessionsRef.current = sessions;
  }, [sessions]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === appRef.current);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const completeMala = useCallback(() => {
    const now = new Date().toISOString();
    const durationSec = elapsedRef.current;
    const session: Session = {
      id: uid(),
      start: sessionStart || now,
      end: now,
      count: MALA_SIZE,
      size: MALA_SIZE,
      durationSec,
      mantra: mantraLabel,
      deity,
      done: true,
      createdAt: now,
    };
    setSessions((prev) => [session, ...prev].slice(0, 400));
    setTotals((prev) => ({
      totalMalas: prev.totalMalas + 1,
      totalChants: prev.totalChants + MALA_SIZE,
      totalSeconds: prev.totalSeconds + durationSec,
    }));
    setDayLog((prev) => {
      const key = todayKey();
      const current = prev[key] || { malas: 0, chants: 0, seconds: 0 };
      return {
        ...prev,
        [key]: {
          malas: current.malas + 1,
          chants: current.chants + MALA_SIZE,
          seconds: current.seconds + durationSec,
        },
      };
    });
    setSessionStart(now);
    setElapsed(0);
    undoRef.current = [];
  }, [deity, mantraLabel, sessionStart]);

  const tap = useCallback(() => {
    ensure();
    if (!running) {
      setRunning(true);
      setSessionStart((start) => start || new Date().toISOString());
    }
    setCount((prev) => {
      const next = prev + 1;
      undoRef.current.push(prev);
      const isComplete = next >= MALA_SIZE;
      chime(isComplete);
      if (navigator.vibrate) {
        try {
          navigator.vibrate(isComplete ? [15, 35, 25] : 7);
        } catch {
          // no-op
        }
      }
      if (isComplete) {
        completeMala();
        return 0;
      }
      return next;
    });
  }, [chime, completeMala, ensure, running]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /input|textarea|select/i.test(target.tagName)) return;
      if ((event.key === "Escape" || event.code === "Escape") && isFullscreen && !document.fullscreenElement) {
        event.preventDefault();
        setIsFullscreen(false);
        return;
      }
      if (event.code === "Space" || event.code === "Enter") {
        event.preventDefault();
        tap();
      }
      if (event.code === "Backspace" || event.key.toLowerCase() === "u") {
        event.preventDefault();
        const last = undoRef.current.pop();
        if (typeof last === "number") setCount(last);
      }
    };
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("keyup", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("keyup", onKey, true);
    };
  }, [isFullscreen, tap]);

  const undo = () => {
    const last = undoRef.current.pop();
    if (typeof last === "number") setCount(last);
  };

  const resetCurrent = () => {
    setCount(0);
    setElapsed(0);
    setRunning(false);
    setSessionStart(null);
    undoRef.current = [];
    setShowReset(false);
  };

  const exportCsv = () => {
    const headers = ["id", "start", "end", "count", "size", "durationSec", "mantra", "deity", "createdAt"];
    const rows = sessions.map((item) => headers.map((key) => JSON.stringify(item[key as keyof Session] ?? "")).join(","));
    const blob = new Blob([[headers.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `naam-jaap-${todayKey()}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const copyJson = async () => {
    await navigator.clipboard?.writeText(JSON.stringify({ totals, sessions }, null, 2));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const toggleFullscreen = async () => {
    const node = appRef.current;
    if (!node) return;
    try {
      if (isFullscreen && !document.fullscreenElement) {
        setIsFullscreen(false);
        return;
      }
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await node.requestFullscreen();
      }
    } catch {
      setIsFullscreen((value) => {
        const next = !value;
        if (next) window.setTimeout(() => node.focus({ preventScroll: true }), 0);
        return next;
      });
    }
  };

  const handleImage = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDeityImage(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  if (!ready) return null;

  const toolsPanels = (
    <>
      <div className="panel">
        <div className="panel-title">
          <span>{L.mantra}</span>
        </div>
        <div className="mantra-list">
          {MANTRAS.map((m) => (
            <button
              key={m.id}
              className={`tag ${mantraId === m.id ? "is-on" : ""}`}
              onClick={() => {
                setMantraId(m.id);
                setDeity(m.deity);
              }}
            >
              {language === "hi" ? m.hi : m.en}
              <small>{language === "hi" ? m.en : m.hi}</small>
            </button>
          ))}
          <button className={`tag ${mantraId === "custom" ? "is-on" : ""}`} onClick={() => setMantraId("custom")}>
            {L.custom}
          </button>
        </div>
        {mantraId === "custom" ? <input className="field" style={{ marginTop: 10 }} value={customMantra} onChange={(event) => setCustomMantra(event.target.value)} placeholder={L.customPlaceholder} /> : null}
      </div>

      <div className="panel">
        <div className="panel-title">
          <span>{L.background}</span>
        </div>
        <div className="deity-list">
          {DEITIES.map((name) => (
            <button key={name} className={`tag ${deity === name ? "is-on" : ""}`} onClick={() => setDeity(name)}>
              {DEITY_TEXT[name] || name}
            </button>
          ))}
        </div>
        <div className="upload-row" style={{ marginTop: 12 }}>
          <label className="chip" style={{ justifyContent: "center" }}>
            {L.upload}
            <input type="file" accept="image/*" hidden onChange={(event) => handleImage(event.target.files?.[0])} />
          </label>
          {deityImage ? (
            <>
              <div className="upload-preview" style={{ backgroundImage: `url(${deityImage})` }} />
              <button className="btn" onClick={() => setDeityImage("")}>
                {L.removeImage}
              </button>
            </>
          ) : null}
        </div>
      </div>

      <div className="panel">
        <div className="panel-title">
          <span>{L.recent}</span>
          <small>{sessions.length}</small>
        </div>
        {sessions.length ? (
          <div className="recent-list">
            {sessions.slice(0, 8).map((item) => (
              <div className="recent-item" key={item.id}>
                <span>{item.mantra}</span>
                <span className="recent-time">{formatTime(item.durationSec)}</span>
                <span className="recent-count">{item.count}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">{L.noRecent}</div>
        )}
      </div>
    </>
  );

  return (
    <section ref={appRef} className={`counter-app ${isFullscreen ? "is-counter-fullscreen" : ""}`} tabIndex={-1} aria-label="Naam Jaap counter">
      <div className="counter-topbar" aria-label="Counter summary and settings">
        <div className="compact-stats" aria-label="Today and lifetime summary">
          <CompactStat label={L.today} malas={today.malas} chants={today.chants} time={today.seconds} />
          <CompactStat label={L.lifetime} malas={totals.totalMalas} chants={totals.totalChants} time={totals.totalSeconds} />
        </div>
      </div>

      <div className="counter-grid">
        <main className="ring-column">
          <div className="ring-frame" style={deityImage ? { backgroundImage: `linear-gradient(rgba(5,8,18,.62), rgba(5,8,18,.62)), url(${deityImage})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: "50%" } : undefined}>
            <MalaRing count={count} />
            <div className="ring-center">
              <div className="center-disc">
                <div>
                  <div className="mantra-line">
                    {mantraLabel}
                    {mantraSub ? <span>{mantraSub}</span> : null}
                  </div>
                  <div className="count-number">{count}</div>
                  <div className="count-meta">of {MALA_SIZE}</div>
                  <div className="count-left">{remaining === MALA_SIZE && count === 0 ? L.tap : `${remaining} ${L.remaining}`}</div>
                </div>
              </div>
            </div>
            <button className="tap-layer" onClick={tap} aria-label={L.tap} />
            <button
              className={`ring-music-button ${music ? "is-on" : ""}`}
              onClick={() => setMusic((value) => !value)}
              aria-label={music ? L.musicOn : L.musicOff}
              title={music ? L.musicOn : L.musicOff}
            >
              <span aria-hidden="true">♪</span>
            </button>
          </div>

          <div className="session-line">
            <span className={`live-dot ${running ? "" : "paused"}`} />
            <span>{running ? L.live : L.paused}</span>
            <span>{formatTime(elapsed)}</span>
            <span>{L.session}</span>
          </div>

          <div className="controls">
            <button className="btn btn-danger" onClick={() => setShowReset(true)}>
              {L.reset}
            </button>
            <button className="btn" onClick={undo} disabled={!undoRef.current.length}>
              {L.undo}
            </button>
            <button
              className={`btn ${running ? "btn-pause" : "btn-primary"}`}
              onClick={() => {
                ensure();
                setRunning((value) => !value);
                setSessionStart((start) => start || new Date().toISOString());
              }}
            >
              {running ? L.pause : elapsed > 0 ? L.resume : L.start}
            </button>
          </div>

          <div className="hint">
            {L.keyHint} <span className="kbd">Space</span> / <span className="kbd">Enter</span>
          </div>

          <div className="counter-under-actions" aria-label="Counter actions">
            <button className="chip mantra-trigger" onClick={() => setShowMobileTools(true)}>
              {L.mantra}
            </button>
            <button
              className="chip fullscreen-trigger"
              onClick={() => {
                if (isFullscreen) {
                  if (document.fullscreenElement) void document.exitFullscreen();
                  setIsFullscreen(false);
                  return;
                }
                void toggleFullscreen();
              }}
              aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen counter"}
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen counter"}
            >
              <span aria-hidden="true">{isFullscreen ? "×" : "⛶"}</span>
            </button>
            <button className="chip settings-trigger" onClick={() => setShowSettings(true)} aria-label="Settings" title="Settings">
              <span aria-hidden="true">⚙</span>
            </button>
            {isFullscreen ? <span className="fullscreen-hint">Esc to exit</span> : null}
          </div>
        </main>

      </div>

      {showMobileTools ? (
        <div className="mobile-tools-backdrop" role="dialog" aria-modal="true" aria-label={L.mantra}>
          <button className="mobile-tools-scrim" aria-label={L.close} onClick={() => setShowMobileTools(false)} />
          <div className="mobile-tools-sheet">
            <div className="mobile-tools-head">
              <div>
                <strong>{L.mantra}</strong>
                <span>{L.mantra} · {L.background}</span>
              </div>
              <button className="chip" onClick={() => setShowMobileTools(false)}>
                {L.close}
              </button>
            </div>
            <div className="side-stack mobile-tools-stack">{toolsPanels}</div>
          </div>
        </div>
      ) : null}

      {showExport ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <h2>{L.exportTitle}</h2>
            <p>{L.exportDesc}</p>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={exportCsv}>
                {L.csv}
              </button>
              <button className="btn" onClick={() => void copyJson()}>
                {copied ? L.copied : L.json}
              </button>
              <button className="btn" onClick={() => setShowExport(false)}>
                {L.close}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showSettings ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Settings">
          <div className="modal settings-modal">
            <h2>Settings</h2>
            <div className="settings-grid">
              <button className={`chip ${theme === "hindu" ? "is-on" : ""}`} onClick={() => setTheme((value) => (value === "calm" ? "hindu" : "calm"))}>
                {theme === "hindu" ? L.themeHindu : L.themeCalm}
              </button>
              <button className={`chip ${chimeOn ? "is-on" : ""}`} onClick={() => setChimeOn((value) => !value)}>
                Chime
              </button>
              <button className="chip language-chip" onClick={() => setLanguage(language === "en" ? "hi" : "en")}>
                {L.language}
              </button>
              <button
                className="chip"
                onClick={() => {
                  setShowSettings(false);
                  setShowExport(true);
                }}
              >
                {L.export}
              </button>
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={() => setShowSettings(false)}>
                {L.close}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showReset ? (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <h2>{L.resetConfirm}</h2>
            <p>{L.resetDesc}</p>
            <div className="modal-actions">
              <button className="btn" onClick={() => setShowReset(false)}>
                {L.cancel}
              </button>
              <button className="btn btn-danger" onClick={resetCurrent}>
                {L.yesReset}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-row">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

function CompactStat({ label, malas, chants, time }: { label: string; malas: number; chants: number; time: number }) {
  return (
    <div className="compact-stat">
      <span>{label}</span>
      <strong>{malas.toLocaleString()}M</strong>
      <small>{chants.toLocaleString()} · {formatShort(time)}</small>
    </div>
  );
}
