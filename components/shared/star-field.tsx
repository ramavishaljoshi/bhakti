"use client";

import { motion } from "framer-motion";

type Star = {
  top: number; // 0-100 (% of column height)
  left: number; // 0-100 (% of column width)
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  drift: number;
};

// Deterministic pseudo-random so SSR and client render identically.
function makeStars(count: number, seed: number): Star[] {
  const rand = (n: number) => {
    const x = Math.sin(seed * 999 + n * 137.13) * 43758.5453;
    return x - Math.floor(x);
  };
  return Array.from({ length: count }, (_, i) => ({
    top: rand(i) * 100,
    left: rand(i + 0.5) * 100,
    size: 2 + Math.round(rand(i + 1) * 4),
    delay: rand(i + 2) * 4,
    duration: 8 + rand(i + 3) * 6,
    opacity: 0.35 + rand(i + 4) * 0.4,
    drift: (rand(i + 5) - 0.5) * 36,
  }));
}

const LEFT_STARS = makeStars(34, 7);
const RIGHT_STARS = makeStars(34, 19);

function StarShape({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size * 4}
      height={size * 4}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 1.5l2.1 6.8 7.1.4-5.6 4.3 2 6.9L12 16.3 6.4 19.9l2-6.9L2.8 8.7l7.1-.4z" />
    </svg>
  );
}

function StarColumn({ side, stars }: { side: "left" | "right"; stars: Star[] }) {
  return (
    <div
      className={`pointer-events-none fixed top-0 z-0 hidden h-screen overflow-hidden xl:block ${
        side === "left" ? "left-0" : "right-0"
      }`}
      // Fill the entire empty gutter beside the 1280px content container.
      style={{ width: "calc((100vw - 1280px) / 2)" }}
      aria-hidden
    >
      {stars.map((s, i) => (
        <motion.span
          key={`${side}-${i}`}
          className="absolute text-saffron-400 dark:text-saffron-300"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            opacity: s.opacity,
            filter: "drop-shadow(0 0 6px rgba(255, 153, 51, 0.45))",
          }}
          animate={{
            y: [0, s.drift, 0],
            opacity: [s.opacity * 0.35, s.opacity, s.opacity * 0.35],
            rotate: [0, side === "left" ? 25 : -25, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <StarShape size={s.size} />
        </motion.span>
      ))}
    </div>
  );
}

export function StarField() {
  return (
    <>
      <StarColumn side="left" stars={LEFT_STARS} />
      <StarColumn side="right" stars={RIGHT_STARS} />
    </>
  );
}
