import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import "./AffirmationTool.css";

type PurposeId = "anxiety" | "setback" | "selfworth" | "focus" | "guilt" | "habit";
type SceneId = "dawn" | "temple" | "forest" | "moon" | "radha";

type SavedAffirmation = {
  id: string;
  date: string;
  purpose: PurposeId;
  scene: SceneId;
  affirmation: string;
  mantra: string;
  action: string;
  moodBefore: number;
  moodAfter: number;
  rounds: number;
};

const STORAGE_KEY = "naamjapa-affirmation-tool-v1";

const scenes: Record<SceneId, { label: string; symbol: string; palette: [string, string, string, string] }> = {
  dawn: { label: "Dawn Light", symbol: "प्रकाश", palette: ["#120914", "#5b1b2f", "#ffb36b", "#fff0c9"] },
  temple: { label: "Temple Diya", symbol: "दीप", palette: ["#090b12", "#321b14", "#f9a03f", "#ffe8a3"] },
  forest: { label: "Forest Breath", symbol: "शांति", palette: ["#061512", "#164335", "#71ddb0", "#d8f3dc"] },
  moon: { label: "Moon Calm", symbol: "ॐ", palette: ["#07111f", "#15284a", "#79b8ff", "#e5f2ff"] },
  radha: { label: "Radha Grace", symbol: "राधे", palette: ["#180713", "#562342", "#f0a6ca", "#ffe2a8"] },
};

const purposes: Record<
  PurposeId,
  {
    label: string;
    forMoment: string;
    story: string;
    mantra: string;
    tinyAction: string;
    lines: [string, string, string, string, string];
  }
> = {
  anxiety: {
    label: "Anxiety Calm",
    forMoment: "When the mind is racing",
    story: "Anxiety often feels like danger, but many times it is the nervous system asking for steadiness. This practice gives the mind a sentence, the breath a rhythm, and the body one safe next step.",
    mantra: "Om Shanti Shanti Shanti",
    tinyAction: "Take 9 slow breaths, then drink water.",
    lines: [
      "I am safe enough to take one slow breath.",
      "I do not need to solve my whole life in this moment.",
      "My thoughts can be loud, but my next action can be gentle.",
      "With each naam, my body receives a signal of peace.",
      "I return from fear to the present moment.",
    ],
  },
  setback: {
    label: "Emotional Setback",
    forMoment: "After hurt, rejection, breakup, or disappointment",
    story: "Pain needs respect, not performance. This practice helps a person stop replaying the wound and begin returning energy to dignity, self-care, and the next honest step.",
    mantra: "Radhe Radhe",
    tinyAction: "Write one sentence: Today I will not abandon myself.",
    lines: [
      "I can be hurt and still be guided.",
      "This pain is real, but it is not my final identity.",
      "I release the need to replay what wounded me.",
      "My heart can heal without chasing closure from everyone.",
      "Today I choose one action that brings me back to myself.",
    ],
  },
  selfworth: {
    label: "Self-Worth",
    forMoment: "When confidence feels low",
    story: "Self-worth affirmations should not be fake praise. They work better when they remind the person of values, effort, and the right to begin again.",
    mantra: "So Hum",
    tinyAction: "Stand straight for 30 seconds and choose one task you can finish.",
    lines: [
      "I do not need to become perfect to be worthy of progress.",
      "I can respect myself while I am still learning.",
      "My energy is precious; I will not spend it attacking myself.",
      "Small honest karma builds quiet confidence.",
      "I am allowed to begin again without drama.",
    ],
  },
  focus: {
    label: "Focus Reset",
    forMoment: "When attention is scattered",
    story: "Focus comes back through a small doorway. Instead of demanding a perfect day, this practice asks for one clean block of attention.",
    mantra: "Om Gam Ganapataye Namah",
    tinyAction: "Set a 12-minute timer and open only one task.",
    lines: [
      "I choose depth over noise for the next few minutes.",
      "My attention is a sacred resource.",
      "I do not need motivation first; I need one clear start.",
      "One completed action is stronger than ten imagined plans.",
      "I can return to my work with steadiness.",
    ],
  },
  guilt: {
    label: "Guilt To Repair",
    forMoment: "When guilt becomes heavy",
    story: "Guilt is useful only when it becomes learning, apology, repair, or discipline. This practice moves the person from self-attack to responsibility.",
    mantra: "Ram Ram",
    tinyAction: "Choose one repair: apologize, clean up, learn, or stop repeating it.",
    lines: [
      "I will not punish myself into growth.",
      "I can take responsibility without losing self-respect.",
      "The next right action is more powerful than replaying the past.",
      "I repair what I can and release what I cannot control.",
      "I choose discipline over self-hate.",
    ],
  },
  habit: {
    label: "New Habit",
    forMoment: "For doomscrolling, addiction patterns, or escape loops",
    story: "A habit changes when the brain gets a new reward repeatedly. The goal is not shame; the goal is replacement.",
    mantra: "Om Namah Shivaya",
    tinyAction: "Put the phone down, chant 11 times, then do the replacement action.",
    lines: [
      "The urge is a wave; I can watch it rise and pass.",
      "I am training my brain with one better repetition.",
      "My future self is built by tiny choices, not shame.",
      "I can replace escape with energy, service, learning, or prayer.",
      "Today I make the better path easier to repeat.",
    ],
  },
};

function loadSaved(): SavedAffirmation[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.slice(0, 40) : [];
  } catch {
    return [];
  }
}

function saveItems(items: SavedAffirmation[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 40)));
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function AffirmationTool() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<{ context: AudioContext; master: GainNode; oscillators: OscillatorNode[] } | null>(null);
  const [entered, setEntered] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [purpose, setPurpose] = useState<PurposeId>("anxiety");
  const [scene, setScene] = useState<SceneId>("dawn");
  const [lineIndex, setLineIndex] = useState(0);
  const [moodBefore, setMoodBefore] = useState(5);
  const [moodAfter, setMoodAfter] = useState(7);
  const [rounds, setRounds] = useState(0);
  const [saved, setSaved] = useState<SavedAffirmation[]>([]);

  const selectedPurpose = purposes[purpose];
  const selectedScene = scenes[scene];
  const activeLine = selectedPurpose.lines[lineIndex];
  const progress = Math.round(((lineIndex + 1) / selectedPurpose.lines.length) * 100);

  const streak = useMemo(() => new Set(saved.map((item) => item.date.slice(0, 10))).size, [saved]);

  useEffect(() => {
    setSaved(loadSaved());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animation = 0;
    const particles = Array.from({ length: 120 }, (_, index) => ({
      angle: (index / 120) * Math.PI * 2,
      radius: 90 + (index % 16) * 14,
      size: 1 + (index % 5) * 0.42,
      speed: 0.001 + (index % 8) * 0.00038,
    }));

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      const width = Math.max(320, Math.floor(rect.width * ratio));
      const height = Math.max(420, Math.floor(rect.height * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const w = rect.width;
      const h = rect.height;
      const cx = w * 0.52;
      const cy = h * 0.46;
      const [deep, mid, glow, warm] = selectedScene.palette;
      frame += 1;

      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, deep);
      sky.addColorStop(0.52, mid);
      sky.addColorStop(1, "#05070d");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      const aura = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) * 0.68);
      aura.addColorStop(0, `${warm}55`);
      aura.addColorStop(0.24, `${glow}32`);
      aura.addColorStop(0.64, `${mid}18`);
      aura.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, w, h);

      for (let ray = 0; ray < 14; ray += 1) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ray * 0.45 + Math.sin(frame / 220) * 0.05);
        const beam = ctx.createLinearGradient(0, 0, Math.min(w, h) * 0.55, 0);
        beam.addColorStop(0, `${glow}1f`);
        beam.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = beam;
        ctx.beginPath();
        ctx.moveTo(0, -4);
        ctx.lineTo(Math.min(w, h) * 0.5, -18);
        ctx.lineTo(Math.min(w, h) * 0.5, 18);
        ctx.lineTo(0, 4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      particles.forEach((particle, index) => {
        const orbit = particle.angle + frame * particle.speed;
        const active = index < progress * 1.2;
        const x = cx + Math.cos(orbit) * particle.radius;
        const y = cy + Math.sin(orbit) * particle.radius * 0.68;
        ctx.globalAlpha = active ? 0.5 : 0.18;
        ctx.fillStyle = active ? glow : "rgba(255,255,255,0.5)";
        ctx.beginPath();
        ctx.arc(x, y, active ? particle.size + 1.2 : particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      ctx.save();
      ctx.translate(cx, h * 0.78);
      ctx.font = `700 ${Math.max(40, Math.min(w, h) * 0.1)}px "Noto Serif Devanagari", serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(255, 249, 235, 0.16)";
      ctx.shadowColor = glow;
      ctx.shadowBlur = 14;
      ctx.fillText(selectedScene.symbol, 0, 0);
      ctx.restore();

      const ground = ctx.createLinearGradient(0, h * 0.6, 0, h);
      ground.addColorStop(0, "rgba(0,0,0,0)");
      ground.addColorStop(1, "rgba(2,5,10,0.88)");
      ctx.fillStyle = ground;
      ctx.fillRect(0, h * 0.58, w, h * 0.42);

      animation = window.requestAnimationFrame(draw);
    };

    animation = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(animation);
  }, [progress, selectedScene.palette, selectedScene.symbol]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.context.close();
        audioRef.current = null;
      }
    };
  }, []);

  const startSound = async () => {
    if (audioRef.current) {
      await audioRef.current.context.resume();
      audioRef.current.master.gain.setTargetAtTime(0.18, audioRef.current.context.currentTime, 0.35);
      setSoundOn(true);
      return;
    }
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const master = context.createGain();
    master.gain.value = 0.0001;
    master.connect(context.destination);
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 760;
    filter.connect(master);
    const oscillators = [128, 192, 256].map((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = index === 1 ? "triangle" : "sine";
      oscillator.frequency.value = frequency;
      gain.gain.value = index === 0 ? 0.24 : 0.1;
      oscillator.connect(gain);
      gain.connect(filter);
      oscillator.start();
      return oscillator;
    });
    master.gain.setTargetAtTime(0.18, context.currentTime, 0.45);
    audioRef.current = { context, master, oscillators };
    setSoundOn(true);
  };

  const stopSound = () => {
    if (!audioRef.current) return;
    audioRef.current.master.gain.setTargetAtTime(0.0001, audioRef.current.context.currentTime, 0.25);
    setSoundOn(false);
  };

  const chime = () => {
    if (!audioRef.current || !soundOn) return;
    const { context, master } = audioRef.current;
    const now = context.currentTime;
    [512, 768].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.frequency.value = frequency;
      oscillator.type = "sine";
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(index === 0 ? 0.11 : 0.06, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.05 + index * 0.22);
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start(now);
      oscillator.stop(now + 1.3 + index * 0.24);
    });
  };

  const enter = async () => {
    setEntered(true);
    await startSound();
  };

  const nextLine = () => {
    setLineIndex((value) => (value + 1) % selectedPurpose.lines.length);
    setRounds((value) => value + 1);
    chime();
  };

  const savePractice = () => {
    const next: SavedAffirmation = {
      id: `affirmation_${Date.now()}`,
      date: new Date().toISOString(),
      purpose,
      scene,
      affirmation: activeLine,
      mantra: selectedPurpose.mantra,
      action: selectedPurpose.tinyAction,
      moodBefore,
      moodAfter,
      rounds,
    };
    const items = [next, ...saved].slice(0, 40);
    setSaved(items);
    saveItems(items);
    chime();
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSaved([]);
  };

  const pageStyle = {
    "--affirm-deep": selectedScene.palette[0],
    "--affirm-mid": selectedScene.palette[1],
    "--affirm-glow": selectedScene.palette[2],
    "--affirm-warm": selectedScene.palette[3],
  } as CSSProperties;

  return (
    <section className={entered ? "affirm-tool is-entered" : "affirm-tool"} style={pageStyle} aria-label="Daily affirmation tool">
      <div className="affirm-portal" aria-hidden={entered ? "true" : "false"}>
        <div className="affirm-cloud cloud-a" />
        <div className="affirm-cloud cloud-b" />
        <div className="affirm-portal-copy">
          <p>Daily affirmation ritual</p>
          <h1>Light Within</h1>
          <span>Choose the feeling, repeat the line, anchor it with naam, then take one small action.</span>
          <button type="button" onClick={enter}>
            Begin
          </button>
        </div>
      </div>

      <div className="affirm-experience">
        <div className="affirm-hero">
          <canvas ref={canvasRef} className="affirm-canvas" aria-hidden="true" />
          <div className="affirm-hero-copy">
            <p className="affirm-eyebrow">{selectedPurpose.forMoment}</p>
            <h2>{activeLine}</h2>
            <span>{selectedPurpose.mantra}</span>
          </div>
          <div className="affirm-floating-card card-left">
            <span>Purpose</span>
            <strong>{selectedPurpose.label}</strong>
          </div>
          <div className="affirm-floating-card card-right">
            <span>Practice</span>
            <strong>{rounds} lines</strong>
          </div>
          <div className="affirm-controls">
            <button type="button" className={soundOn ? "affirm-pill active" : "affirm-pill"} onClick={soundOn ? stopSound : startSound}>
              {soundOn ? "Music on" : "Music"}
            </button>
            <a className="affirm-pill" href="/free-tools/naam-jaap-counter/">
              Naam Jaap
            </a>
          </div>
        </div>

        <div className="affirm-layout">
          <aside className="affirm-panel">
            <p className="affirm-kicker">Choose your need</p>
            <h2>What should this affirmation support?</h2>
            <div className="purpose-grid">
              {(Object.keys(purposes) as PurposeId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  className={purpose === id ? "purpose-card active" : "purpose-card"}
                  onClick={() => {
                    setPurpose(id);
                    setLineIndex(0);
                    chime();
                  }}
                >
                  <strong>{purposes[id].label}</strong>
                  <span>{purposes[id].forMoment}</span>
                </button>
              ))}
            </div>
          </aside>

          <main className="affirm-board">
            <div className="affirm-story">
              <p className="affirm-kicker">Why this helps</p>
              <h2>{selectedPurpose.label}</h2>
              <p>{selectedPurpose.story}</p>
            </div>

            <div className="affirm-card">
              <span>Repeat slowly</span>
              <strong>{activeLine}</strong>
              <small>Naam anchor: {selectedPurpose.mantra}</small>
              <div className="affirm-progress" style={{ "--progress": `${progress}%` } as CSSProperties}>
                <i />
              </div>
              <div className="affirm-actions">
                <button type="button" className="affirm-primary" onClick={nextLine}>
                  Next affirmation
                </button>
                <a className="affirm-secondary" href="/free-tools/naam-jaap-counter/">
                  Practice with jaap
                </a>
              </div>
            </div>

            <div className="tiny-action">
              <div>
                <p className="affirm-kicker">Tiny action</p>
                <h3>{selectedPurpose.tinyAction}</h3>
              </div>
              <div className="mood-grid">
                <label>
                  Mood before
                  <input type="range" min="1" max="10" value={moodBefore} onChange={(event) => setMoodBefore(Number(event.target.value))} />
                  <span>{moodBefore} / 10</span>
                </label>
                <label>
                  Mood after
                  <input type="range" min="1" max="10" value={moodAfter} onChange={(event) => setMoodAfter(Number(event.target.value))} />
                  <span>{moodAfter} / 10</span>
                </label>
              </div>
              <button type="button" className="affirm-primary" onClick={savePractice}>
                Save local reflection
              </button>
            </div>
          </main>

          <aside className="affirm-panel">
            <p className="affirm-kicker">Setting</p>
            <h2>Make it yours</h2>
            <label className="affirm-label">
              Background
              <select value={scene} onChange={(event) => setScene(event.target.value as SceneId)}>
                {(Object.keys(scenes) as SceneId[]).map((id) => (
                  <option key={id} value={id}>
                    {scenes[id].label}
                  </option>
                ))}
              </select>
            </label>
            <div className="affirm-stats">
              <div>
                <strong>{saved.length}</strong>
                <span>saved</span>
              </div>
              <div>
                <strong>{streak}</strong>
                <span>days</span>
              </div>
            </div>
            <div className="saved-list">
              {saved.length ? (
                saved.slice(0, 5).map((item) => (
                  <article key={item.id}>
                    <strong>{purposes[item.purpose].label}</strong>
                    <span>
                      {formatDate(item.date)} · mood {item.moodBefore} to {item.moodAfter}
                    </span>
                    <p>{item.affirmation}</p>
                  </article>
                ))
              ) : (
                <p className="empty-saved">Your first reflection saves only in this browser.</p>
              )}
            </div>
            <button type="button" className="affirm-secondary clear-affirmations" onClick={clearHistory}>
              Clear local history
            </button>
          </aside>
        </div>

        <div className="affirm-safety">
          <strong>Gentle note</strong>
          <span>
            Affirmations can support mood and focus, but they are not a replacement for therapy, medical care, or crisis support.
          </span>
        </div>
      </div>
    </section>
  );
}
