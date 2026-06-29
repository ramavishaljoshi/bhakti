import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import "./KidsNaamJaapCounter.css";

type KidMantraId = "radhe" | "krishna" | "ram" | "shiv" | "waheguru";
type RewardId = "flowers" | "stars" | "butter" | "lotus" | "rainbow" | "bells";

type KidRound = {
  id: string;
  date: string;
  mantra: string;
  count: number;
  durationSec: number;
  reward: RewardId;
};

const MALA_SIZE = 108;
const STORAGE_KEY = "naamjapa-kids-counter-v1";

const MANTRAS: Record<KidMantraId, { label: string; short: string; hindi: string; guide: string }> = {
  radhe: {
    label: "Radhe Radhe",
    short: "Radhe",
    hindi: "राधे राधे",
    guide: "Say Radhe Radhe with love.",
  },
  krishna: {
    label: "Hare Krishna",
    short: "Krishna",
    hindi: "हरे कृष्ण",
    guide: "Say Krishna and fill the bucket.",
  },
  ram: {
    label: "Ram Ram",
    short: "Ram",
    hindi: "राम राम",
    guide: "Say Ram Ram slowly.",
  },
  shiv: {
    label: "Om Namah Shivaya",
    short: "Shiv",
    hindi: "ॐ नमः शिवाय",
    guide: "Say Om Namah Shivaya calmly.",
  },
  waheguru: {
    label: "Waheguru",
    short: "Waheguru",
    hindi: "वाहेगुरु",
    guide: "Say Waheguru with a happy heart.",
  },
};

const REWARDS: Record<
  RewardId,
  { label: string; item: string; color: string; accent: string; done: string; meaning: string; surprise: string }
> = {
  flowers: {
    label: "Flower bucket",
    item: "flower",
    color: "#ff8ab3",
    accent: "#78dca5",
    done: "The flower bucket is full.",
    meaning: "Love grows one naam at a time.",
    surprise: "A garden of kindness is waiting.",
  },
  stars: {
    label: "Star sky",
    item: "star",
    color: "#ffd166",
    accent: "#6dbdff",
    done: "The star sky is shining.",
    meaning: "Every naam becomes a brave little star.",
    surprise: "A courage sky may open next.",
  },
  butter: {
    label: "Makhan pot",
    item: "butter",
    color: "#fff1a8",
    accent: "#ffb45f",
    done: "Krishna's makhan pot is full.",
    meaning: "Joy becomes sweet like makhan.",
    surprise: "Krishna may fill the makhan pot.",
  },
  lotus: {
    label: "Lotus pond",
    item: "lotus",
    color: "#a78bfa",
    accent: "#65d6c8",
    done: "The lotus pond is blooming.",
    meaning: "Calm blooms inside the heart.",
    surprise: "A quiet lotus pond may appear.",
  },
  rainbow: {
    label: "Rainbow blessing",
    item: "rainbow",
    color: "#87d7ff",
    accent: "#ff87b5",
    done: "The rainbow blessing is bright.",
    meaning: "Good thoughts can become colorful again.",
    surprise: "A rainbow blessing may shine.",
  },
  bells: {
    label: "Temple bells",
    item: "bell",
    color: "#ffd76e",
    accent: "#c990ff",
    done: "The temple bells are ringing.",
    meaning: "The heart learns to listen softly.",
    surprise: "Temple bells may ring next.",
  },
};

const REWARD_IDS = Object.keys(REWARDS) as RewardId[];

function getRandomReward(current: RewardId) {
  const options = REWARD_IDS.filter((id) => id !== current);
  return options[Math.floor(Math.random() * options.length)] || current;
}

function loadRounds(): KidRound[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.slice(0, 30) : [];
  } catch {
    return [];
  }
}

function saveRounds(rounds: KidRound[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rounds.slice(0, 30)));
}

function pad2(value: number) {
  return String(Math.floor(value)).padStart(2, "0");
}

function formatTime(sec: number) {
  const safe = Math.max(0, Math.floor(sec));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${pad2(m)}:${pad2(s)}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function KidsNaamJaapCounter() {
  const audioRef = useRef<{ context: AudioContext; master: GainNode } | null>(null);
  const [mantra, setMantra] = useState<KidMantraId>("radhe");
  const [reward, setReward] = useState<RewardId>("flowers");
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [hapticOn, setHapticOn] = useState(true);
  const [rounds, setRounds] = useState<KidRound[]>([]);
  const [burst, setBurst] = useState(0);
  const [tapPulse, setTapPulse] = useState(0);
  const [isTouched, setIsTouched] = useState(false);
  const [surpriseText, setSurpriseText] = useState("A surprise world opens after 108.");

  const selectedMantra = MANTRAS[mantra];
  const selectedReward = REWARDS[reward];
  const left = MALA_SIZE - count;
  const progress = Math.min(100, (count / MALA_SIZE) * 100);
  const rewardItems = Math.min(24, Math.floor((count / MALA_SIZE) * 24));

  const totals = useMemo(
    () => ({
      rounds: rounds.length,
      chants: rounds.reduce((sum, item) => sum + item.count, 0) + count,
    }),
    [count, rounds],
  );

  useEffect(() => {
    setRounds(loadRounds());
  }, []);

  useEffect(() => {
    if (!isRunning || startedAt == null) return;
    const timer = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 500);
    return () => window.clearInterval(timer);
  }, [isRunning, startedAt]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "Enter") {
        event.preventDefault();
        addChant();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const vibrate = (pattern: number | number[]) => {
    if (!hapticOn) return;
    if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
    try {
      navigator.vibrate(pattern);
    } catch {
      /* vibration not allowed */
    }
  };

  const ensureAudio = async () => {
    if (!soundOn) return null;
    if (audioRef.current) {
      await audioRef.current.context.resume();
      return audioRef.current;
    }
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    const context = new AudioContextClass();
    const master = context.createGain();
    master.gain.value = 0.28;
    master.connect(context.destination);
    audioRef.current = { context, master };
    return audioRef.current;
  };

  const playTone = async (complete = false) => {
    const audio = await ensureAudio();
    if (!audio) return;
    const now = audio.context.currentTime;
    const notes = complete ? [523.25, 659.25, 783.99] : [523.25];
    notes.forEach((frequency, index) => {
      const oscillator = audio.context.createOscillator();
      const gain = audio.context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, now + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(complete ? 0.16 : 0.08, now + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 0.42);
      oscillator.connect(gain);
      gain.connect(audio.master);
      oscillator.start(now + index * 0.08);
      oscillator.stop(now + index * 0.08 + 0.5);
    });
  };

  const completeRound = async (durationSec: number) => {
    const round: KidRound = {
      id: `kid_${Date.now()}`,
      date: new Date().toISOString(),
      mantra: selectedMantra.label,
      count: MALA_SIZE,
      durationSec,
      reward,
    };
    const next = [round, ...rounds].slice(0, 30);
    setRounds(next);
    saveRounds(next);
    setCount(0);
    setElapsed(0);
    setStartedAt(null);
    setIsRunning(false);
    const nextReward = getRandomReward(reward);
    setReward(nextReward);
    setSurpriseText(`Surprise unlocked: ${REWARDS[nextReward].label}`);
    setBurst((value) => value + 1);
    await playTone(true);
  };

  const addChant = async () => {
    setIsTouched(true);
    setTapPulse((value) => value + 1);
    window.setTimeout(() => setIsTouched(false), 520);
    if (!isRunning) {
      setIsRunning(true);
      setStartedAt(Date.now() - elapsed * 1000);
    }
    const nextCount = count + 1;
    if (nextCount >= MALA_SIZE) {
      const duration = startedAt ? Math.floor((Date.now() - startedAt) / 1000) : elapsed;
      vibrate([40, 40, 80, 40, 160]);
      await completeRound(Math.max(1, duration));
      return;
    }
    setCount(nextCount);
    if (nextCount % 9 === 0) {
      setBurst((value) => value + 1);
      vibrate([20, 30, 50]);
    } else {
      vibrate(18);
    }
    await playTone(false);
  };

  const undo = () => {
    setCount((value) => Math.max(0, value - 1));
  };

  const reset = () => {
    setCount(0);
    setElapsed(0);
    setStartedAt(null);
    setIsRunning(false);
  };

  const shuffleReward = () => {
    const nextReward = getRandomReward(reward);
    setReward(nextReward);
    setSurpriseText(`Now playing: ${REWARDS[nextReward].label}`);
    setBurst((value) => value + 1);
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRounds([]);
  };

  const pageStyle = {
    "--kid-fill": selectedReward.color,
    "--kid-accent": selectedReward.accent,
  } as CSSProperties;

  return (
    <section className="kids-counter" style={pageStyle} aria-label="Kids Naam Jaap counter">
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
              <strong>{count}</strong>
              said
            </span>
            <span>
              <strong>{left}</strong>
              left
            </span>
            <span>
              <strong>{formatTime(elapsed)}</strong>
              time
            </span>
          </div>
        </div>

        <div className={isTouched ? "kids-world touched" : "kids-world"}>
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
            <strong className="krishna-name">{selectedMantra.short}</strong>
          </div>

          <button type="button" className="bucket-button" onClick={addChant} aria-label="Add one naam">
            <span className={`bucket reward-${reward}`}>
              <span className="bucket-handle" />
              <span className="bucket-lip" />
              <span className="bucket-fill" style={{ height: `${progress}%` }} />
              <span className="bucket-waves" style={{ bottom: `${Math.max(10, progress)}%` }} />
              <span className="bucket-shine" />
              {Array.from({ length: rewardItems }, (_, index) => (
                <i
                  key={`${reward}-${index}-${burst}`}
                  className={`reward-item reward-${reward} item-${index % 6}`}
                  style={
                    {
                      "--x": `${12 + ((index * 17) % 74)}%`,
                      "--y": `${92 - Math.floor(index / 4) * 12}%`,
                      "--delay": `${(index % 5) * 0.04}s`,
                    } as CSSProperties
                  }
                />
              ))}
              <span className="bucket-count">
                <strong>{count}</strong>
                <small>of 108</small>
              </span>
              {tapPulse > 0 && (
                <span key={tapPulse} className="tap-plus" aria-hidden="true">
                  +1
                </span>
              )}
              <span className="bucket-world-label">
                <strong>{selectedReward.item}</strong>
              </span>
            </span>
            <span className="tap-text">{selectedMantra.label}</span>
          </button>
          <div className="kids-hero-action">
            <button type="button" className="kid-primary" onClick={addChant}>
              I said one naam
            </button>
            <small>{left} more drops to fill the bucket</small>
          </div>
        </div>

        <div className="reward-surprise" aria-live="polite">
          <strong>{selectedReward.label}</strong>
          <span>{count === 0 ? surpriseText : selectedReward.meaning}</span>
        </div>

        <div className="kids-quick-actions" aria-label="Counter controls">
          <button type="button" className="kid-secondary" onClick={undo}>
            Undo
          </button>
          <button type="button" className="kid-secondary" onClick={reset}>
            Empty
          </button>
          <button type="button" className={soundOn ? "kid-secondary active" : "kid-secondary"} onClick={() => setSoundOn((value) => !value)}>
            {soundOn ? "Sound" : "Silent"}
          </button>
          <button
            type="button"
            className={hapticOn ? "kid-secondary active" : "kid-secondary"}
            onClick={() => {
              setHapticOn((value) => {
                if (!value) {
                  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
                    try {
                      navigator.vibrate(18);
                    } catch {
                      /* ignore */
                    }
                  }
                }
                return !value;
              });
            }}
          >
            {hapticOn ? "Buzz" : "No buzz"}
          </button>
        </div>
      </div>

      <div className="kids-layout" aria-label="Quiet parent settings">
        <details className="kids-panel kids-settings" open>
          <summary>Choose naam</summary>
          <p className="kids-panel-kicker">Choose naam</p>
          <div className="kid-choice-grid">
            {(Object.keys(MANTRAS) as KidMantraId[]).map((id) => (
              <button
                key={id}
                type="button"
                className={mantra === id ? "kid-choice active" : "kid-choice"}
                onClick={() => setMantra(id)}
              >
                <strong>{MANTRAS[id].label}</strong>
                <span>{MANTRAS[id].hindi}</span>
              </button>
            ))}
          </div>
          <div className="kid-guide">
            <strong>{selectedMantra.guide}</strong>
            <span>Parents can read this line and the child taps the bucket after saying the naam.</span>
          </div>
        </details>

        <section className="kids-panel kids-story-panel">
          <p className="kids-panel-kicker">Tiny progress</p>
          <h2>{selectedReward.meaning}</h2>
          <div className="kid-progress-row">
            <div>
              <strong>{Math.round(progress)}%</strong>
              <span>bucket full</span>
            </div>
            <div>
              <strong>{formatTime(elapsed)}</strong>
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
            {REWARD_IDS.map((id) => (
              <button
                key={id}
                type="button"
                className={reward === id ? "kid-choice active" : "kid-choice"}
                onClick={() => setReward(id)}
              >
                <strong>{REWARDS[id].label}</strong>
                <span>{REWARDS[id].meaning}</span>
              </button>
            ))}
          </div>
          <div className="kid-guide reward-note">
            <strong>After every full 108, the next reward changes by surprise.</strong>
            <span>{selectedReward.surprise}</span>
            <button type="button" className="kid-secondary reward-shuffle" onClick={shuffleReward}>
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
          {rounds.length ? (
            rounds.slice(0, 6).map((round) => (
              <article key={round.id}>
                <strong>{round.mantra}</strong>
                <span>
                  {formatDate(round.date)} · {formatTime(round.durationSec)} · {REWARDS[round.reward].label}
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
