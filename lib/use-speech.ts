"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type VoiceGender = "female" | "male";

export interface SpeakOptions {
  lang?: string;
  gender?: VoiceGender;
  rate?: number;
  repeat?: number;
}

// Name hints used to guess a voice's gender (the Web Speech API doesn't expose
// gender directly). Covers common Windows/macOS/Android/edge voice names,
// including a few Indian English / Hindi voices.
const FEMALE_HINTS =
  /female|woman|zira|susan|samantha|victoria|karen|tessa|kalpana|swara|heera|neerja|aria|jenny|google.*(female|hindi)/i;
const MALE_HINTS = /\bmale\b|\bman\b|david|mark|george|ravi|hemant|prabhat|madhur|guy|daniel/i;

/**
 * Thin wrapper over the browser SpeechSynthesis API for chanting mantras.
 * Returns { supported, voices, speak, cancel }. No-ops safely on the server
 * and on browsers without speech support.
 */
export function useSpeech() {
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);
    const load = () => {
      const list = window.speechSynthesis.getVoices();
      voicesRef.current = list;
      setVoices(list);
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      try {
        window.speechSynthesis.cancel();
      } catch {
        // no-op
      }
    };
  }, []);

  const pickVoice = useCallback(
    (lang: string, gender: VoiceGender): SpeechSynthesisVoice | null => {
      const list = voicesRef.current;
      if (!list.length) return null;
      const prefix = lang.slice(0, 2).toLowerCase();
      const byLang = list.filter((v) => v.lang.toLowerCase().startsWith(prefix));
      const pool = byLang.length ? byLang : list;
      const wanted = gender === "female" ? FEMALE_HINTS : MALE_HINTS;
      const other = gender === "female" ? MALE_HINTS : FEMALE_HINTS;
      // Prefer a voice whose name matches the wanted gender and not the other.
      return (
        pool.find((v) => wanted.test(v.name) && !other.test(v.name)) ||
        pool.find((v) => wanted.test(v.name)) ||
        pool[0] ||
        null
      );
    },
    []
  );

  const cancel = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
    } catch {
      // no-op
    }
  }, []);

  const speak = useCallback(
    (text: string, opts: SpeakOptions = {}) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      const trimmed = text.trim();
      if (!trimmed) return;
      const synth = window.speechSynthesis;
      // Avoid a growing backlog if the user taps faster than speech plays.
      synth.cancel();
      const lang = opts.lang ?? "en-US";
      const voice = pickVoice(lang, opts.gender ?? "female");
      const repeat = Math.min(9, Math.max(1, Math.round(opts.repeat ?? 1)));
      for (let i = 0; i < repeat; i++) {
        const u = new SpeechSynthesisUtterance(trimmed);
        u.rate = Math.min(2, Math.max(0.5, opts.rate ?? 1));
        u.lang = voice?.lang ?? lang;
        if (voice) u.voice = voice;
        synth.speak(u);
      }
    },
    [pickVoice]
  );

  return { supported, voices, speak, cancel };
}
