/**
 * AmbientBackground — a subtle, divine "cosmos & earth" animated layer that
 * sits behind the main content area. It is purely decorative: fixed to the
 * viewport, pointer-events-none, and low-opacity so it never competes with
 * the foreground UI. Works in both light (cream) and dark themes.
 *
 * Animations are pure CSS (transform/opacity) so they run on the compositor
 * thread instead of the JS main thread — no per-frame work, no forced reflow.
 */

import type { CSSProperties } from "react";

const FLOATING_OM = [
  { left: "12%", size: 26, delay: 0, duration: 22, drift: 18 },
  { left: "27%", size: 18, delay: 4, duration: 26, drift: -14 },
  { left: "44%", size: 32, delay: 8, duration: 30, drift: 20 },
  { left: "61%", size: 20, delay: 2, duration: 24, drift: -16 },
  { left: "76%", size: 28, delay: 6, duration: 28, drift: 14 },
  { left: "88%", size: 16, delay: 10, duration: 23, drift: -12 },
];

function AuroraBlob({
  className,
  duration,
  delay = 0,
}: {
  className: string;
  duration: number;
  delay?: number;
}) {
  return (
    <div
      className={`decor-anim absolute rounded-full blur-3xl ${className}`}
      style={{
        animation: `aurora-drift ${duration}s ease-in-out ${delay}s infinite`,
        willChange: "transform",
      }}
      aria-hidden
    />
  );
}

export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* drifting aurora glows */}
      <AuroraBlob
        className="left-[-8%] top-[10%] h-72 w-72 bg-saffron-300/30 dark:bg-saffron-500/15"
        duration={26}
      />
      <AuroraBlob
        className="right-[-6%] top-[28%] h-80 w-80 bg-violet-300/30 dark:bg-indigo-500/10"
        duration={32}
        delay={3}
      />
      <AuroraBlob
        className="left-[20%] top-[55%] h-72 w-72 bg-emerald-300/30 dark:bg-emerald-500/10"
        duration={30}
        delay={6}
      />

      {/* floating Om symbols rising upward */}
      {FLOATING_OM.map((om, i) => (
        <span
          key={i}
          className="decor-anim absolute font-semibold text-saffron-500/30 dark:text-saffron-300/25"
          style={
            {
              left: om.left,
              bottom: "-6%",
              fontSize: om.size,
              opacity: 0,
              "--drift": `${om.drift}px`,
              "--rot": `${om.drift > 0 ? 12 : -12}deg`,
              animation: `om-rise ${om.duration}s ease-in-out ${om.delay}s infinite`,
              willChange: "transform, opacity",
            } as CSSProperties
          }
        >
          ॐ
        </span>
      ))}
    </div>
  );
}
