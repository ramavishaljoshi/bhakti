"use client";

import { motion } from "framer-motion";

type Star = {
  top: string;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  drift: number;
};

const LEFT_STARS: Star[] = [
  { top: "6%", size: 3, delay: 0, duration: 9, opacity: 0.55, drift: 14 },
  { top: "13%", size: 5, delay: 1.2, duration: 11, opacity: 0.7, drift: -18 },
  { top: "21%", size: 2, delay: 0.4, duration: 8, opacity: 0.45, drift: 10 },
  { top: "29%", size: 4, delay: 2.1, duration: 10, opacity: 0.6, drift: -12 },
  { top: "38%", size: 3, delay: 0.9, duration: 12, opacity: 0.5, drift: 16 },
  { top: "47%", size: 6, delay: 1.7, duration: 13, opacity: 0.75, drift: -20 },
  { top: "55%", size: 2, delay: 0.2, duration: 9, opacity: 0.4, drift: 12 },
  { top: "63%", size: 4, delay: 2.5, duration: 11, opacity: 0.65, drift: -14 },
  { top: "72%", size: 3, delay: 1.1, duration: 10, opacity: 0.55, drift: 18 },
  { top: "81%", size: 5, delay: 0.6, duration: 12, opacity: 0.7, drift: -16 },
  { top: "90%", size: 3, delay: 1.9, duration: 9, opacity: 0.5, drift: 10 },
];

const RIGHT_STARS: Star[] = [
  { top: "4%", size: 4, delay: 0.8, duration: 10, opacity: 0.6, drift: -14 },
  { top: "11%", size: 3, delay: 2.2, duration: 11, opacity: 0.5, drift: 18 },
  { top: "19%", size: 5, delay: 0.5, duration: 9, opacity: 0.7, drift: -16 },
  { top: "27%", size: 2, delay: 1.4, duration: 8, opacity: 0.4, drift: 10 },
  { top: "35%", size: 6, delay: 0.3, duration: 13, opacity: 0.75, drift: -20 },
  { top: "44%", size: 3, delay: 2.0, duration: 11, opacity: 0.55, drift: 14 },
  { top: "52%", size: 4, delay: 1.0, duration: 10, opacity: 0.6, drift: -12 },
  { top: "60%", size: 2, delay: 2.4, duration: 9, opacity: 0.45, drift: 16 },
  { top: "69%", size: 5, delay: 0.7, duration: 12, opacity: 0.7, drift: -18 },
  { top: "78%", size: 3, delay: 1.6, duration: 10, opacity: 0.55, drift: 12 },
  { top: "87%", size: 4, delay: 0.4, duration: 11, opacity: 0.6, drift: -14 },
  { top: "95%", size: 3, delay: 2.3, duration: 9, opacity: 0.5, drift: 16 },
];

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
      className={`pointer-events-none fixed top-0 ${
        side === "left" ? "left-0" : "right-0"
      } z-0 hidden h-screen w-24 overflow-hidden md:block lg:w-32`}
      aria-hidden
    >
      {stars.map((s, i) => (
        <motion.span
          key={`${side}-${i}`}
          className="absolute text-saffron-400 dark:text-saffron-300"
          style={{
            top: s.top,
            left: side === "left" ? `${10 + (i % 3) * 18}px` : "auto",
            right: side === "right" ? `${10 + (i % 3) * 18}px` : "auto",
            opacity: s.opacity,
            filter: "drop-shadow(0 0 6px rgba(255, 153, 51, 0.45))",
          }}
          animate={{
            y: [0, s.drift, 0],
            opacity: [s.opacity * 0.4, s.opacity, s.opacity * 0.4],
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
