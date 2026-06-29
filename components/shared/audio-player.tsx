"use client";

import * as React from "react";
import { Music2, Play, Pause, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Bhajan = { title: string; artist: string; src: string };

// Verified, freely-streamable bhajans/mantras hosted on the Internet Archive.
// To add your own: drop an mp3 in public/assets and use src: "/assets/your.mp3".
const BHAJANS: Bhajan[] = [
  {
    title: "Shree Hanuman Chalisa",
    artist: "Hariharan · Gulshan Kumar",
    src: "https://archive.org/download/shree-hanuman-chalisa-original-video-gulshan-kumar-hariharan-full-hd_202503/%E0%A4%B6%E0%A4%B0%20%E0%A4%B9%E0%A4%A8%E0%A4%AE%E0%A4%A8%20%E0%A4%9A%E0%A4%B2%E0%A4%B8%20%20Shree%20Hanuman%20Chalisa%20Original%20Video%20%20GULSHAN%20KUMAR%20%20HARIHARAN%20Full%20HD.mp3",
  },
  {
    title: "Om Jai Jagdish Hare (Aarti)",
    artist: "Bhakti Aarti",
    src: "https://archive.org/download/y2mate.comomjaijagdishhareaartibhaktisongsvzx5jqnzd6u/y2mate.com%20-%20om_jai_jagdish_hare_aarti_bhakti_songs_Vzx5jQnzd6U.mp3",
  },
  {
    title: "Achyutam Keshavam",
    artist: "Krishna Bhajan",
    src: "https://archive.org/download/Achyutastakam_621/Achyutastakam.mp3",
  },
  {
    title: "Shiv Tandav Stotram",
    artist: "Shiva Stotram",
    src: "https://archive.org/download/ShivTandavStotram/02ShivTandavStotram.mp3",
  },
  {
    title: "Mahamrityunjaya Mantra (108×)",
    artist: "Shiva Mantra",
    src: "https://archive.org/download/MahamrityunjayaMantra108Times1/Mahamrityunjaya%20Mantra%20108%20Times-1.mp3",
  },
  {
    title: "Hare Krishna Mahamantra",
    artist: "Chanting · Meditation",
    src: "https://archive.org/download/famous-powerful-gayatri-mantra-108-times-om-bhur-bhuva-swaha-mp-3-1/30%20Mins%20of%20The%20Great%20Mantra_%20Hare%20Krishna_%20Hare%20Rama%20_%20Chanting%20_%20Meditation%20Music(MP3_160K).mp3",
  },
];

/**
 * Site-wide bhajan playlist. The floating button opens a panel listing every
 * bhajan with its own Listen (play/pause) button. It lives in the root
 * AppShell, so playback continues as the user moves between pages.
 *
 * No autoplay: nothing plays on load. Picking a track from the list (a user
 * gesture) plays it with sound immediately.
 */
export function AudioPlayer() {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  // Keep the UI in sync with the actual <audio> element.
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  // On mount: pre-load the first track but do NOT play it. Playback only
  // starts when the user explicitly picks a track from the list.
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = BHAJANS[0].src;
  }, []);

  // When the user picks a different track, swap the source and play it.
  const mounted = React.useRef(false);
  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return; // initial track is handled by the mount effect above
    }
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = BHAJANS[index].src;
    audio.muted = false;
    audio.play().catch(() => {});
  }, [index]);

  // Play the chosen row, or toggle pause/resume if it's already current.
  const selectTrack = (i: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (i === index) {
      if (audio.paused) {
        audio.muted = false;
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
      return;
    }
    setIndex(i);
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto" />

      {/* Bhajan list panel */}
      {open && (
        <div className="fixed bottom-40 right-4 z-50 w-72 overflow-hidden rounded-3xl border border-border bg-card/95 shadow-soft backdrop-blur-xl lg:bottom-20">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="font-display text-sm font-bold">🎵 Bhajans</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded-lg p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <ul className="max-h-72 overflow-y-auto p-1.5">
            {BHAJANS.map((b, i) => {
              const active = i === index;
              const isPlaying = active && playing;
              return (
                <li key={b.src}>
                  <button
                    type="button"
                    onClick={() => selectTrack(i)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl px-2.5 py-2 text-left transition-colors",
                      active
                        ? "bg-saffron-100 dark:bg-saffron-900/30"
                        : "hover:bg-saffron-50 dark:hover:bg-saffron-900/15"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white",
                        active
                          ? "bg-saffron-gradient shadow-glow"
                          : "bg-saffron-400/80"
                      )}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-foreground">
                        {b.title}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {b.artist}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Bhajans"
        title="Bhajans"
        className={cn(
          "fixed bottom-24 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-saffron-gradient text-white shadow-glow ring-2 ring-background transition-transform hover:scale-105 lg:bottom-6",
          playing && !open && "animate-pulse"
        )}
      >
        <Music2 className="h-5 w-5" />
      </button>
    </>
  );
}
