import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import "./MindResetGame.css";

type PatternId = "doomscroll" | "guilt" | "gaming" | "lonely" | "anger" | "lazy";
type BackgroundId = "radha" | "shiva" | "hanuman" | "diya" | "forest";
type EnergyId = "body" | "seva" | "study" | "prayer" | "family" | "clean";
type AffirmationId = "anxiety" | "setback" | "selfworth" | "focus" | "repair" | "habit";

type KarmaRun = {
  id: string;
  date: string;
  pattern: PatternId;
  background: BackgroundId;
  energy: EnergyId;
  urgeBefore: number;
  urgeAfter: number;
  cue: string;
  nextAction: string;
  beads: number;
  affirmation?: string;
  affirmationPack?: AffirmationId;
};

const STORAGE_KEY = "karma-reset-game-v1";

const patterns: Record<
  PatternId,
  {
    label: string;
    shadow: string;
    promise: string;
    truth: string;
    sankalp: string;
    loop: [string, string, string, string];
  }
> = {
  doomscroll: {
    label: "Doomscroll",
    shadow: "Endless feed",
    promise: "One more post will make me feel informed or safe.",
    truth: "The feed gives stimulation, not peace. Return to one grounded action.",
    sankalp: "I place the phone down and return to my own karma.",
    loop: ["Trigger: boredom or stress", "Craving: more certainty", "Action: scroll", "Result: fog and guilt"],
  },
  guilt: {
    label: "Guilt Loop",
    shadow: "Self-blame",
    promise: "If I punish myself enough, I will become better.",
    truth: "Guilt becomes useful only when it turns into repair.",
    sankalp: "I learn, repair, and take one honest step.",
    loop: ["Trigger: mistake", "Craving: undo the past", "Action: self-attack", "Result: stuck energy"],
  },
  gaming: {
    label: "Gaming Urge",
    shadow: "Escape quest",
    promise: "One more round will reset my mood.",
    truth: "Rest is valid, but escape cannot lead the day.",
    sankalp: "I choose the real-life quest before the screen quest.",
    loop: ["Trigger: pressure", "Craving: quick win", "Action: game loop", "Result: lost time"],
  },
  lonely: {
    label: "Loneliness",
    shadow: "Empty room",
    promise: "Nobody is there, so nothing matters.",
    truth: "A small connection can reopen the heart.",
    sankalp: "I make one human signal: message, prayer, service, or presence.",
    loop: ["Trigger: silence", "Craving: comfort", "Action: withdraw", "Result: deeper isolation"],
  },
  anger: {
    label: "Anger Heat",
    shadow: "Fire impulse",
    promise: "If I react, I will feel powerful.",
    truth: "Power is choosing the right action after the heat passes.",
    sankalp: "I pause my speech and protect my karma.",
    loop: ["Trigger: insult", "Craving: control", "Action: reaction", "Result: damage"],
  },
  lazy: {
    label: "Laziness",
    shadow: "Heavy body",
    promise: "Later will be easier.",
    truth: "Energy comes after the first small movement.",
    sankalp: "I start with two minutes. Momentum can follow.",
    loop: ["Trigger: task", "Craving: comfort", "Action: delay", "Result: pressure"],
  },
};

const backgrounds: Record<
  BackgroundId,
  { label: string; symbol: string; mantra: string; palette: [string, string, string, string] }
> = {
  radha: {
    label: "Radha Krishna",
    symbol: "राधे",
    mantra: "Radhe Radhe",
    palette: ["#190711", "#5b1827", "#a75a88", "#ffd6a5"],
  },
  shiva: {
    label: "Shiva Calm",
    symbol: "ॐ",
    mantra: "Om Namah Shivaya",
    palette: ["#06111d", "#10304a", "#4ea7ff", "#a7f3d0"],
  },
  hanuman: {
    label: "Hanuman Courage",
    symbol: "राम",
    mantra: "Shri Ram Jai Ram",
    palette: ["#230905", "#803015", "#ff9f1c", "#ffd166"],
  },
  diya: {
    label: "Diya Light",
    symbol: "दीप",
    mantra: "Lead me to light",
    palette: ["#100814", "#442019", "#ffc857", "#fff3bf"],
  },
  forest: {
    label: "Forest Breath",
    symbol: "शांति",
    mantra: "Shanti Shanti",
    palette: ["#051715", "#164335", "#62d2a2", "#d8f3dc"],
  },
};

const energies: Record<EnergyId, { label: string; action: string; reward: string }> = {
  body: { label: "Body", action: "Stand up, drink water, and take 9 slow breaths.", reward: "Body led the mind." },
  seva: { label: "Seva", action: "Do one helpful action for someone without announcing it.", reward: "Energy became service." },
  study: { label: "Study", action: "Open one learning task for 12 focused minutes.", reward: "Attention became skill." },
  prayer: { label: "Prayer", action: "Chant 11 names or sit silently with one mantra.", reward: "Restlessness became remembrance." },
  family: { label: "Family", action: "Send one kind message or give full attention for 5 minutes.", reward: "Loneliness became connection." },
  clean: { label: "Clean Space", action: "Clear one small surface around you.", reward: "Outer order supported inner order." },
};

const affirmationPacks: Record<
  AffirmationId,
  {
    label: string;
    need: string;
    story: string;
    lines: [string, string, string, string];
    mantraBridge: string;
  }
> = {
  anxiety: {
    label: "Anxiety calm",
    need: "When the mind is racing",
    story: "Anxiety is energy asking for safety. I do not have to solve my whole life in this moment.",
    lines: [
      "I am safe enough to take one slow breath.",
      "My mind can be loud, but my next action can be simple.",
      "I return from imagined fear to this present moment.",
      "With every naam, my nervous system receives a signal of peace.",
    ],
    mantraBridge: "Naam Jaap anchor: inhale, chant softly, exhale slowly.",
  },
  setback: {
    label: "Emotional setback",
    need: "After hurt, rejection, or breakup",
    story: "A setback can bend my heart, but it does not have to define my worth or future.",
    lines: [
      "I can be hurt and still be guided.",
      "This pain is real, but it is not my final identity.",
      "I release the need to replay what wounded me.",
      "Today I choose one action that brings me back to myself.",
    ],
    mantraBridge: "Naam Jaap anchor: offer the person, the memory, and the pain to light.",
  },
  selfworth: {
    label: "Self-worth",
    need: "When confidence feels low",
    story: "My value is not decided by one mood, one mistake, one person, or one result.",
    lines: [
      "I do not need to become perfect to be worthy of progress.",
      "I can respect myself while I am still learning.",
      "My energy is precious; I will not spend it attacking myself.",
      "Small honest karma builds quiet confidence.",
    ],
    mantraBridge: "Naam Jaap anchor: each bead is a reminder that I am allowed to begin again.",
  },
  focus: {
    label: "Focus reset",
    need: "When attention is scattered",
    story: "Focus returns when I stop negotiating with every distraction and choose one clean task.",
    lines: [
      "I choose depth over noise for the next few minutes.",
      "My attention is a sacred resource.",
      "I do not need motivation first; I need one clear start.",
      "One small completed action is stronger than ten imagined plans.",
    ],
    mantraBridge: "Naam Jaap anchor: chant 11 times, then begin the smallest task.",
  },
  repair: {
    label: "Guilt to repair",
    need: "When guilt becomes heavy",
    story: "Guilt is useful only when it becomes learning, apology, repair, or discipline.",
    lines: [
      "I will not punish myself into growth.",
      "I can take responsibility without losing self-respect.",
      "The next right action is more powerful than replaying the past.",
      "I repair what I can and release what I cannot control.",
    ],
    mantraBridge: "Naam Jaap anchor: chant, then do one repair action if it is possible.",
  },
  habit: {
    label: "New habit",
    need: "When changing doomscroll or addiction patterns",
    story: "A habit changes when the brain gets a new reward, repeated with patience.",
    lines: [
      "The urge is a wave; I can watch it rise and pass.",
      "I am training my brain with one better repetition.",
      "My future self is built by tiny choices, not shame.",
      "I can replace escape with energy, service, learning, or prayer.",
    ],
    mantraBridge: "Naam Jaap anchor: after one mala or 11 chants, choose the replacement action.",
  },
};

function loadRuns(): KarmaRun[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.slice(0, 50) : [];
  } catch {
    return [];
  }
}

function saveRuns(runs: KarmaRun[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(runs.slice(0, 50)));
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function MindResetGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<{
    context: AudioContext;
    master: GainNode;
    oscillators: OscillatorNode[];
    lfo?: OscillatorNode;
  } | null>(null);
  const [entered, setEntered] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [pattern, setPattern] = useState<PatternId>("doomscroll");
  const [background, setBackground] = useState<BackgroundId>("radha");
  const [energy, setEnergy] = useState<EnergyId>("prayer");
  const [affirmation, setAffirmation] = useState<AffirmationId>("anxiety");
  const [affirmationIndex, setAffirmationIndex] = useState(0);
  const [cue, setCue] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [urgeBefore, setUrgeBefore] = useState(8);
  const [urgeAfter, setUrgeAfter] = useState(4);
  const [step, setStep] = useState(0);
  const [beads, setBeads] = useState(0);
  const [runs, setRuns] = useState<KarmaRun[]>([]);

  const selectedPattern = patterns[pattern];
  const selectedBackground = backgrounds[background];
  const selectedEnergy = energies[energy];
  const selectedAffirmation = affirmationPacks[affirmation];
  const activeAffirmation = selectedAffirmation.lines[affirmationIndex];
  const progress = Math.min(100, Math.round((step * 15 + beads * 8 + (cue ? 12 : 0) + (nextAction ? 10 : 0) + affirmationIndex * 4) / 1.24));

  const streak = useMemo(() => {
    const days = new Set(runs.map((run) => run.date.slice(0, 10)));
    return days.size;
  }, [runs]);

  useEffect(() => {
    setRuns(loadRuns());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animation = 0;
    const motes = Array.from({ length: 140 }, (_, index) => ({
      angle: (index / 140) * Math.PI * 2,
      orbit: 110 + (index % 18) * 12,
      size: 0.9 + (index % 7) * 0.38,
      speed: 0.0009 + (index % 9) * 0.00038,
      drift: (index % 5) * 0.09,
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
      const cy = h * 0.48;
      const radius = Math.min(w, h) * 0.28;
      const [deep, mid, glow, warm] = selectedBackground.palette;
      frame += 1;

      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, deep);
      sky.addColorStop(0.5, mid);
      sky.addColorStop(1, "#06090f");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      const aura = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) * 0.64);
      aura.addColorStop(0, `${warm}3f`);
      aura.addColorStop(0.3, `${glow}24`);
      aura.addColorStop(0.72, `${mid}22`);
      aura.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < 10; i += 1) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(i * 0.628 + Math.sin(frame / 260) * 0.06);
        const ray = ctx.createLinearGradient(0, 0, radius * 2.4, 0);
        ray.addColorStop(0, `${glow}38`);
        ray.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = ray;
        ctx.beginPath();
        ctx.moveTo(0, -4);
        ctx.lineTo(radius * 2.2, -22);
        ctx.lineTo(radius * 2.2, 22);
        ctx.lineTo(0, 4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = `${glow}64`;
      ctx.lineWidth = 1.2;
      for (let ring = 0; ring < 4; ring += 1) {
        const r = radius * (0.7 + ring * 0.22) + Math.sin(frame / 90 + ring) * 2;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (let petal = 0; petal < 16; petal += 1) {
        ctx.rotate(Math.PI / 8);
        ctx.beginPath();
        ctx.ellipse(0, -radius * 0.88, radius * 0.12, radius * 0.34, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      const activeMotes = Math.round((progress / 100) * motes.length);
      motes.forEach((mote, index) => {
        const active = index < activeMotes;
        const orbit = mote.angle + frame * mote.speed;
        const x = cx + Math.cos(orbit) * (mote.orbit + Math.sin(frame / 80 + mote.drift) * 16);
        const y = cy + Math.sin(orbit) * (mote.orbit * 0.72);
        ctx.globalAlpha = active ? 0.7 : 0.24;
        ctx.fillStyle = active ? glow : "rgba(235, 238, 230, 0.5)";
        ctx.beginPath();
        ctx.arc(x, y, active ? mote.size + 1.25 : mote.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      const silhouette = ctx.createRadialGradient(cx, cy + radius * 0.1, 5, cx, cy, radius * 1.1);
      silhouette.addColorStop(0, "rgba(255,255,255,0.16)");
      silhouette.addColorStop(0.6, "rgba(9, 14, 24, 0.16)");
      silhouette.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = silhouette;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.04, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.font = `700 ${Math.max(58, radius * 0.78)}px "Noto Serif Devanagari", serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(255, 250, 237, 0.92)";
      ctx.shadowColor = glow;
      ctx.shadowBlur = 30;
      ctx.fillText(selectedBackground.symbol, 0, -radius * 0.06);
      ctx.restore();

      const ground = ctx.createLinearGradient(0, h * 0.64, 0, h);
      ground.addColorStop(0, "rgba(0,0,0,0)");
      ground.addColorStop(1, "rgba(2, 5, 9, 0.86)");
      ctx.fillStyle = ground;
      ctx.fillRect(0, h * 0.58, w, h * 0.42);

      animation = window.requestAnimationFrame(draw);
    };

    animation = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(animation);
  }, [progress, selectedBackground.palette, selectedBackground.symbol]);

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
      audioRef.current.master.gain.setTargetAtTime(0.2, audioRef.current.context.currentTime, 0.4);
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
    filter.frequency.value = 820;
    filter.Q.value = 0.7;
    filter.connect(master);

    const frequencies = [136.1, 204.15, 272.2];
    const oscillators = frequencies.map((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = index === 1 ? "triangle" : "sine";
      oscillator.frequency.value = frequency;
      gain.gain.value = index === 0 ? 0.28 : 0.12;
      oscillator.connect(gain);
      gain.connect(filter);
      oscillator.start();
      return oscillator;
    });

    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    lfo.frequency.value = 0.05;
    lfoGain.gain.value = 70;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    master.gain.setTargetAtTime(0.2, context.currentTime, 0.5);
    audioRef.current = { context, master, oscillators, lfo };
    setSoundOn(true);
  };

  const stopSound = () => {
    if (!audioRef.current) return;
    audioRef.current.master.gain.setTargetAtTime(0.0001, audioRef.current.context.currentTime, 0.25);
    setSoundOn(false);
  };

  const playChime = () => {
    if (!audioRef.current || !soundOn) return;
    const { context, master } = audioRef.current;
    const now = context.currentTime;
    [523.25, 783.99].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(index === 0 ? 0.12 : 0.07, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + index * 0.25);
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start(now);
      oscillator.stop(now + 1.5 + index * 0.25);
    });
  };

  const enterExperience = async () => {
    setEntered(true);
    await startSound();
    window.setTimeout(() => {
      document.getElementById("karma-play")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 650);
  };

  const completeStep = () => {
    setStep((value) => Math.min(5, value + 1));
    setBeads((value) => Math.min(12, value + 1));
    playChime();
  };

  const nextAffirmation = () => {
    setAffirmationIndex((value) => (value + 1) % selectedAffirmation.lines.length);
    setBeads((value) => Math.min(12, value + 1));
    playChime();
  };

  const resetRound = () => {
    setStep(0);
    setBeads(0);
    setCue("");
    setNextAction("");
    setAffirmationIndex(0);
    setUrgeBefore(8);
    setUrgeAfter(4);
  };

  const saveRound = () => {
    const run: KarmaRun = {
      id: `karma_${Date.now()}`,
      date: new Date().toISOString(),
      pattern,
      background,
      energy,
      urgeBefore,
      urgeAfter,
      cue,
      nextAction: nextAction || selectedEnergy.action,
      beads,
      affirmation: activeAffirmation,
      affirmationPack: affirmation,
    };
    const next = [run, ...runs].slice(0, 50);
    setRuns(next);
    saveRuns(next);
    playChime();
    resetRound();
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRuns([]);
  };

  const pageStyle = {
    "--karma-deep": selectedBackground.palette[0],
    "--karma-mid": selectedBackground.palette[1],
    "--karma-glow": selectedBackground.palette[2],
    "--karma-warm": selectedBackground.palette[3],
  } as CSSProperties;

  return (
    <section className={entered ? "karma-game is-entered" : "karma-game"} style={pageStyle} aria-label="Karma Reset game">
      <div className={entered ? "karma-portal portal-entered" : "karma-portal"} aria-hidden={entered ? "true" : "false"}>
        <div className="karma-cloud cloud-one" />
        <div className="karma-cloud cloud-two" />
        <div className="karma-cloud cloud-three" />
        <div className="portal-copy">
          <p>Enter the quiet field</p>
          <h1>Karma Reset</h1>
          <span>Turn the urge into light, action, and remembrance.</span>
          <button type="button" onClick={enterExperience}>
            Enter
          </button>
        </div>
      </div>

      <div className="karma-experience">
        <div className="karma-hero" id="karma-play">
          <canvas ref={canvasRef} className="karma-canvas" aria-hidden="true" />
          <div className="cinema-noise" aria-hidden="true" />
          <div className="karma-orbit-copy">
            <p className="karma-eyebrow">Local-only spiritual reset</p>
            <h2>{selectedBackground.mantra}</h2>
            <span>{activeAffirmation}</span>
          </div>

          <div className="hero-side-card time-card">
            <span>Pattern</span>
            <strong>{selectedPattern.label}</strong>
          </div>
          <div className="hero-side-card total-card">
            <span>Progress</span>
            <strong>{progress}%</strong>
          </div>
          <div className="hero-side-card safety-card">
            <span>Mood lift</span>
            <strong>{selectedAffirmation.label}</strong>
          </div>

          <div className="hero-controls" aria-label="Experience controls">
            <button type="button" className={soundOn ? "control-pill active" : "control-pill"} onClick={soundOn ? stopSound : startSound}>
              {soundOn ? "Music on" : "Music"}
            </button>
            <a className="control-pill" href="/free-tools/naam-jaap-counter/">
              Naam Jaap
            </a>
          </div>
        </div>

        <div className="karma-ritual-strip" aria-label="Reset chapters">
          <span>See the loop</span>
          <span>Lift the mood</span>
          <span>Name the cue</span>
          <span>Redirect karma</span>
          <span>Save sankalp</span>
        </div>

        <div className="karma-layout">
          <aside className="karma-panel pattern-panel">
            <p className="karma-panel-kicker">1. Choose the pull</p>
            <h2>What is asking for your attention?</h2>
            <div className="pattern-grid">
              {(Object.keys(patterns) as PatternId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  className={pattern === id ? "pattern-card active" : "pattern-card"}
                  onClick={() => {
                    setPattern(id);
                    setStep(0);
                    setBeads(0);
                    playChime();
                  }}
                >
                  <strong>{patterns[id].label}</strong>
                  <span>{patterns[id].shadow}</span>
                </button>
              ))}
            </div>
          </aside>

          <main className="karma-board">
            <div className="board-head">
              <div>
                <p className="karma-panel-kicker">2. Offer the loop</p>
                <h2>{selectedPattern.label}</h2>
                <p>{selectedPattern.promise}</p>
              </div>
              <div className="light-meter" style={{ "--light": `${progress}%` } as CSSProperties}>
                <strong>{progress}</strong>
                <span>light</span>
              </div>
            </div>

            <div className="loop-track" aria-label="Habit loop">
              {selectedPattern.loop.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={step > index ? "loop-node complete" : step === index ? "loop-node active" : "loop-node"}
                  onClick={completeStep}
                >
                  <span>{index + 1}</span>
                  {item}
                </button>
              ))}
            </div>

            <div className="affirmation-stage" aria-label="Daily affirmation story">
              <div>
                <p className="karma-panel-kicker">3. Mood uplift</p>
                <h3>{selectedAffirmation.label}</h3>
                <p>{selectedAffirmation.story}</p>
              </div>
              <div className="affirmation-card">
                <span>{selectedAffirmation.need}</span>
                <strong>{activeAffirmation}</strong>
                <small>{selectedAffirmation.mantraBridge}</small>
                <div className="affirmation-actions">
                  <button type="button" className="karma-primary" onClick={nextAffirmation}>
                    Next line
                  </button>
                  <a className="karma-secondary" href="/free-tools/naam-jaap-counter/">
                    Jaap with this
                  </a>
                </div>
              </div>
            </div>

            <div className="choice-grid">
              <label className="karma-writing">
                Name the real cue
                <textarea
                  value={cue}
                  onChange={(event) => setCue(event.target.value)}
                  placeholder="Example: I opened the phone because I felt tired, bored, or alone."
                />
              </label>
              <div className="energy-panel">
                <p className="karma-panel-kicker">3. Redirect karma</p>
                <div className="energy-grid">
                  {(Object.keys(energies) as EnergyId[]).map((id) => (
                    <button
                      key={id}
                      type="button"
                      className={energy === id ? "energy-chip active" : "energy-chip"}
                      onClick={() => {
                        setEnergy(id);
                        setNextAction(energies[id].action);
                        completeStep();
                      }}
                    >
                  {energies[id].label}
                    </button>
                  ))}
                </div>
                <div className="next-action">
                  <strong>{selectedEnergy.reward}</strong>
                  <span>{selectedEnergy.action}</span>
                </div>
              </div>
            </div>

            <div className="sankalp-zone">
              <div>
                <p className="karma-panel-kicker">4. Sankalp</p>
                <h3>{selectedPattern.sankalp}</h3>
                <input
                  value={nextAction}
                  onChange={(event) => setNextAction(event.target.value)}
                  placeholder="Edit your tiny next action..."
                />
              </div>
              <div className="bead-ring" aria-label={`${beads} sankalp beads`}>
                {Array.from({ length: 12 }, (_, index) => (
                  <span key={index} className={index < beads ? "lit" : ""} />
                ))}
              </div>
            </div>

            <div className="finish-karma">
              <label>
                Urge before
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={urgeBefore}
                  onChange={(event) => setUrgeBefore(Number(event.target.value))}
                />
                <span>{urgeBefore} / 10</span>
              </label>
              <label>
                Urge after
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={urgeAfter}
                  onChange={(event) => setUrgeAfter(Number(event.target.value))}
                />
                <span>{urgeAfter} / 10</span>
              </label>
              <button type="button" className="karma-primary" onClick={saveRound}>
                Save sankalp
              </button>
              <button type="button" className="karma-secondary" onClick={resetRound}>
                Reset
              </button>
            </div>
          </main>

          <aside className="karma-panel progress-panel">
            <p className="karma-panel-kicker">Sacred setting</p>
            <h2>Change the field</h2>
            <label className="karma-label">
              Background
              <select value={background} onChange={(event) => setBackground(event.target.value as BackgroundId)}>
                {(Object.keys(backgrounds) as BackgroundId[]).map((id) => (
                  <option key={id} value={id}>
                    {backgrounds[id].label}
                  </option>
                ))}
              </select>
            </label>
            <label className="karma-label">
              Affirmation purpose
              <select
                value={affirmation}
                onChange={(event) => {
                  setAffirmation(event.target.value as AffirmationId);
                  setAffirmationIndex(0);
                  playChime();
                }}
              >
                {(Object.keys(affirmationPacks) as AffirmationId[]).map((id) => (
                  <option key={id} value={id}>
                    {affirmationPacks[id].label}
                  </option>
                ))}
              </select>
            </label>
            <div className="daily-affirmation">
              <span>Daily inspiration</span>
              <strong>{activeAffirmation}</strong>
            </div>
            <div className="karma-stats">
              <div>
                <strong>{runs.length}</strong>
                <span>resets</span>
              </div>
              <div>
                <strong>{streak}</strong>
                <span>days</span>
              </div>
            </div>
            <div className="run-list">
              {runs.length ? (
                runs.slice(0, 5).map((run) => (
                  <article key={run.id}>
                    <strong>{patterns[run.pattern].label}</strong>
                    <span>
                      {energies[run.energy].label} · {run.urgeBefore} to {run.urgeAfter} · {formatDate(run.date)}
                    </span>
                  <p>{run.nextAction}</p>
                  {run.affirmation ? <p className="run-affirmation">{run.affirmation}</p> : null}
                </article>
              ))
              ) : (
                <p className="empty-runs">Your first sankalp will save only on this device.</p>
              )}
            </div>
            <button className="karma-secondary clear-button" type="button" onClick={clearHistory}>
              Clear local history
            </button>
          </aside>
        </div>

        <div className="karma-guide-card">
          <strong>Gentle safety note</strong>
          <span>
            This is a self-help ritual, not therapy or crisis care. If you feel unsafe, reach a trusted person or emergency support now.
          </span>
        </div>
      </div>
    </section>
  );
}
