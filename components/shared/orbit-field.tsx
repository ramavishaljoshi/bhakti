import {
  Sun,
  Moon,
  Star,
  Sparkles,
  Flame,
  Globe,
  Bell,
  Flower,
  Shell,
  CircleDot,
  type LucideIcon,
} from "lucide-react";

/**
 * OrbitField — a cosmic "hero" backdrop inspired by orbital UIs: concentric
 * rings radiate from the bottom-center, with glowing spiritual / planetary
 * icon nodes (Sun, Moon, ॐ, lotus, diya, chakra, conch, bell …) slowly
 * orbiting along them, plus small dots traveling the arcs.
 *
 * It is purely decorative — fixed, pointer-events-none, low opacity, and
 * sits at z-0 behind the page content. Hidden on small screens where there
 * is no room for the arcs to breathe.
 */

type NodeKind = "icon" | "om" | "dot";

type OrbitNode = {
  angle: number; // degrees from the top of the ring; + is clockwise
  kind: NodeKind;
  icon?: LucideIcon;
  tone?: "saffron" | "amber" | "violet" | "sky";
};

type Ring = {
  radius: number; // px
  duration: number; // seconds for a full revolution
  reverse?: boolean;
  nodes: OrbitNode[];
};

const TONES: Record<string, string> = {
  saffron: "text-saffron-400 border-saffron-300/40",
  amber: "text-amber-300 border-amber-300/40",
  violet: "text-violet-300 border-violet-300/40",
  sky: "text-sky-300 border-sky-300/40",
};

const RINGS: Ring[] = [
  {
    radius: 210,
    duration: 70,
    nodes: [
      { angle: -52, kind: "icon", icon: Flame, tone: "amber" },
      { angle: 6, kind: "om", tone: "saffron" },
      { angle: 58, kind: "icon", icon: Bell, tone: "saffron" },
      { angle: -110, kind: "dot", tone: "amber" },
      { angle: 130, kind: "dot", tone: "saffron" },
    ],
  },
  {
    radius: 340,
    duration: 95,
    reverse: true,
    nodes: [
      { angle: -64, kind: "icon", icon: Flower, tone: "violet" },
      { angle: -8, kind: "icon", icon: Sparkles, tone: "saffron" },
      { angle: 50, kind: "icon", icon: Globe, tone: "sky" },
      { angle: 95, kind: "dot", tone: "violet" },
      { angle: -120, kind: "dot", tone: "sky" },
    ],
  },
  {
    radius: 480,
    duration: 120,
    nodes: [
      { angle: -70, kind: "icon", icon: Sun, tone: "amber" },
      { angle: -18, kind: "om", tone: "saffron" },
      { angle: 40, kind: "icon", icon: Shell, tone: "sky" },
      { angle: 78, kind: "icon", icon: Star, tone: "violet" },
      { angle: 150, kind: "dot", tone: "amber" },
    ],
  },
  {
    radius: 630,
    duration: 150,
    reverse: true,
    nodes: [
      { angle: -58, kind: "icon", icon: Moon, tone: "sky" },
      { angle: 0, kind: "icon", icon: CircleDot, tone: "saffron" },
      { angle: 62, kind: "icon", icon: Sparkles, tone: "violet" },
      { angle: -130, kind: "dot", tone: "saffron" },
    ],
  },
];

function NodeVisual({ node }: { node: OrbitNode }) {
  if (node.kind === "dot") {
    return (
      <span
        className={`block h-2 w-2 rounded-full ${
          node.tone ? TONES[node.tone].split(" ")[0] : "text-saffron-400"
        }`}
        style={{
          backgroundColor: "currentColor",
          boxShadow: "0 0 10px 2px currentColor",
          opacity: 0.8,
        }}
      />
    );
  }

  const Icon = node.icon;
  const tone = TONES[node.tone ?? "saffron"];
  return (
    <span
      className={`flex h-11 w-11 items-center justify-center rounded-2xl border bg-white/5 backdrop-blur-sm ${tone}`}
      style={{
        boxShadow:
          "0 0 18px -2px currentColor, inset 0 0 12px -6px currentColor",
      }}
    >
      {node.kind === "om" ? (
        <span className="text-xl font-semibold leading-none">ॐ</span>
      ) : Icon ? (
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      ) : null}
    </span>
  );
}

function OrbitRing({ ring }: { ring: Ring }) {
  const size = ring.radius * 2;
  // CSS-driven spin: the ring rotates one way, each node counter-rotates the
  // other way at the same speed so the icons stay upright.
  const spin = ring.reverse ? "orbit-spin-reverse" : "orbit-spin";
  const counter = ring.reverse ? "orbit-spin" : "orbit-spin-reverse";

  return (
    <div
      className="decor-anim absolute rounded-full border border-saffron-200/10 dark:border-saffron-300/10"
      style={{
        width: size,
        height: size,
        left: -ring.radius,
        bottom: -ring.radius,
        animation: `${spin} ${ring.duration}s linear infinite`,
        willChange: "transform",
      }}
    >
      {ring.nodes.map((node, i) => (
        // Placement: rotate to the node's angle, then push out to the ring edge.
        <div
          key={i}
          className="absolute left-1/2 top-1/2"
          style={{
            transform: `rotate(${node.angle}deg) translateY(-${ring.radius}px)`,
          }}
        >
          {/* Counter-rotate (cancels the ring spin) so icons stay upright. */}
          <div
            className="decor-anim"
            style={{
              animation: `${counter} ${ring.duration}s linear infinite`,
              willChange: "transform",
            }}
          >
            {/* Undo the placement angle so the icon is level at rest. */}
            <div
              className="-translate-x-1/2 -translate-y-1/2"
              style={{ transform: `rotate(${-node.angle}deg)` }}
            >
              <NodeVisual node={node} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OrbitField() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block"
      aria-hidden
    >
      {/* central glow where the orbits converge */}
      <div
        className="decor-anim absolute left-1/2 bottom-0 h-[420px] w-[820px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,153,51,0.22), rgba(167,139,250,0.10) 55%, transparent 78%)",
          filter: "blur(8px)",
          animation: "glow-pulse 9s ease-in-out infinite",
          willChange: "transform, opacity",
        }}
      />

      {/* the orbiting rings, anchored to the bottom-center of the viewport */}
      <div className="absolute left-1/2 bottom-0">
        {RINGS.map((ring, i) => (
          <OrbitRing key={i} ring={ring} />
        ))}
      </div>
    </div>
  );
}
