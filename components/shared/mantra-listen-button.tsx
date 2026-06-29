"use client";

import * as React from "react";
import { Headphones, Pause, Loader2 } from "lucide-react";

/**
 * "Listen" button for a mantra detail page. Plays the mantra's audio recording
 * inline (play / pause). Renders nothing when no audio is available.
 */
export function MantraListenButton({ src }: { src?: string }) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  if (!src) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        setLoading(true);
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      // Playback failed (network/format) — reset state.
      setPlaying(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onWaiting={() => setLoading(true)}
        onPlaying={() => setLoading(false)}
        onEnded={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause mantra" : "Listen to mantra"}
        className="inline-flex h-12 items-center gap-2 rounded-2xl border border-border bg-card px-6 font-semibold transition-colors hover:bg-secondary"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : playing ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Headphones className="h-4 w-4" />
        )}
        {playing ? "Pause" : "Listen"}
      </button>
    </>
  );
}
