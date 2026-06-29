"use client";

import { useEffect, useRef } from "react";

// Spin-the-mala interaction with natural momentum and friction.
// Dependency-free (no CDN, works offline). Grab and flick the bead ring;
// it keeps spinning, slows down, and gently settles. Each bead that passes
// the top marker is one chant, so one full turn of a 108-bead mala = one mala.
// Counting is derived from cumulative rotation, so it is always exact.

type Props = {
  malaSize: number;
  onBead: () => void;
  onUndo: () => void;
  resetSignal: number;
};

const TWO_PI = Math.PI * 2;
const MAX_OMEGA = 18; // rad/sec cap so flicks stay controllable

function shortest(d: number) {
  while (d > Math.PI) d -= TWO_PI;
  while (d < -Math.PI) d += TWO_PI;
  return d;
}

// Pre-render a shaded sphere bead to an offscreen canvas (cheap to blit 108x/frame).
function makeBead(diameter: number, dpr: number, hi: string, mid: string, edge: string, rim?: string) {
  const px = Math.max(6, Math.ceil(diameter * dpr));
  const c = document.createElement("canvas");
  c.width = px;
  c.height = px;
  const g = c.getContext("2d");
  if (!g) return c;
  const r = px / 2;
  const grad = g.createRadialGradient(r * 0.66, r * 0.6, r * 0.1, r, r, r);
  grad.addColorStop(0, hi);
  grad.addColorStop(0.5, mid);
  grad.addColorStop(1, edge);
  g.beginPath();
  g.arc(r, r, r * 0.94, 0, TWO_PI);
  g.fillStyle = grad;
  g.fill();
  if (rim) {
    g.beginPath();
    g.arc(r, r, r * 0.94, 0, TWO_PI);
    g.lineWidth = px * 0.06;
    g.strokeStyle = rim;
    g.stroke();
  }
  // specular highlight
  g.beginPath();
  g.arc(r * 0.66, r * 0.58, r * 0.2, 0, TWO_PI);
  g.fillStyle = "rgba(255,255,255,0.55)";
  g.fill();
  return c;
}

export default function PhysicsMala({ malaSize, onBead, onUndo, resetSignal }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onBeadRef = useRef(onBead);
  const onUndoRef = useRef(onUndo);
  onBeadRef.current = onBead;
  onUndoRef.current = onUndo;

  const state = useRef({
    angle: 0,
    omega: 0,
    dragging: false,
    lastPointerAngle: 0,
    lastIndex: 0,
    lastTime: 0,
  });

  useEffect(() => {
    const s = state.current;
    s.angle = 0;
    s.omega = 0;
    s.lastIndex = 0;
  }, [resetSignal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const step = TWO_PI / Math.max(1, malaSize);
    let raf = 0;
    let size = 0;
    let cx = 0;
    let cy = 0;
    let dpr = 1;
    let ringR = 0;
    let beadR = 0;
    let beadSprite: HTMLCanvasElement | null = null;
    let guruSprite: HTMLCanvasElement | null = null;
    let topSprite: HTMLCanvasElement | null = null;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      size = Math.max(220, Math.floor(rect.width));
      canvas.width = Math.floor(size * dpr);
      canvas.height = Math.floor(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = size / 2;
      cy = size / 2;
      ringR = size * 0.37;
      beadR = Math.max(4, size * 0.019);
      // Rudraksha-like warm wood beads
      beadSprite = makeBead(beadR * 2, dpr, "#c08a52", "#7c4a26", "#341b0c");
      // Sumeru / guru bead — deeper sandal-maroon, slightly larger
      guruSprite = makeBead(beadR * 3.1, dpr, "#d49a5e", "#6e2f1d", "#2a1008", "rgba(244,186,85,0.5)");
      // bead currently at the marker — warm glow rim
      topSprite = makeBead(beadR * 2.3, dpr, "#ffd9a8", "#caa15f", "#6e3a1e", "rgba(255,153,51,0.9)");
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const pointerAngle = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return Math.atan2(clientY - rect.top - cy, clientX - rect.left - cx);
    };

    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      const s = state.current;
      s.dragging = true;
      s.omega = 0;
      s.lastPointerAngle = pointerAngle(e.clientX, e.clientY);
      s.lastTime = performance.now();
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      const s = state.current;
      if (!s.dragging) return;
      e.preventDefault();
      const now = performance.now();
      const dt = Math.max(0.001, (now - s.lastTime) / 1000);
      const pa = pointerAngle(e.clientX, e.clientY);
      const d = shortest(pa - s.lastPointerAngle);
      s.angle += d;
      const inst = d / dt;
      s.omega = 0.6 * s.omega + 0.4 * Math.max(-MAX_OMEGA, Math.min(MAX_OMEGA, inst));
      s.lastPointerAngle = pa;
      s.lastTime = now;
    };
    const onUp = (e: PointerEvent) => {
      const s = state.current;
      s.dragging = false;
      s.omega = Math.max(-MAX_OMEGA, Math.min(MAX_OMEGA, s.omega));
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };
    // Desktop: scroll wheel spins the mala
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const s = state.current;
      s.omega = Math.max(-MAX_OMEGA, Math.min(MAX_OMEGA, s.omega - e.deltaY * 0.004));
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    let prev = performance.now();
    const draw = (t: number) => {
      const s = state.current;
      const dt = Math.min(0.05, Math.max(0.001, (t - prev) / 1000));
      prev = t;

      if (!s.dragging) {
        s.angle += s.omega * dt;
        s.omega *= Math.max(0, 1 - 1.1 * dt); // smooth friction (longer spin)
        if (Math.abs(s.omega) < 0.02) s.omega = 0;
        // gentle detent so it settles with a bead on the marker
        if (s.omega === 0) {
          const nearest = Math.round(s.angle / step) * step;
          s.angle += (nearest - s.angle) * Math.min(1, 6 * dt);
        }
      }

      // Exact counting from cumulative rotation
      const idx = Math.floor(s.angle / step + 0.5);
      if (idx > s.lastIndex) {
        for (let k = s.lastIndex; k < idx; k += 1) onBeadRef.current();
      } else if (idx < s.lastIndex) {
        for (let k = s.lastIndex; k > idx; k -= 1) onUndoRef.current();
      }
      s.lastIndex = idx;

      // ---- render ----
      ctx.clearRect(0, 0, size, size);

      // soft depth glow behind the ring
      const glow = ctx.createRadialGradient(cx, cy, ringR * 0.2, cx, cy, ringR * 1.25);
      glow.addColorStop(0, "rgba(245,126,15,0.22)");
      glow.addColorStop(1, "rgba(245,126,15,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);

      // thread / string
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, 0, TWO_PI);
      ctx.strokeStyle = "rgba(220,200,170,0.22)";
      ctx.lineWidth = Math.max(1.5, size * 0.006);
      ctx.stroke();

      // nearest bead to the top marker
      let topBead = 0;
      let best = Infinity;
      for (let i = 0; i < malaSize; i += 1) {
        const a = -Math.PI / 2 + s.angle + i * step;
        const da = Math.abs(shortest(a + Math.PI / 2));
        if (da < best) {
          best = da;
          topBead = i;
        }
      }

      // beads
      for (let i = 0; i < malaSize; i += 1) {
        const a = -Math.PI / 2 + s.angle + i * step;
        const x = cx + Math.cos(a) * ringR;
        const y = cy + Math.sin(a) * ringR;
        if (i === 0 && guruSprite) {
          const gr = beadR * 1.55;
          ctx.drawImage(guruSprite, x - gr, y - gr, gr * 2, gr * 2);
          // tassel: short threads hanging outward from the guru bead
          const dirX = Math.cos(a);
          const dirY = Math.sin(a);
          ctx.strokeStyle = "rgba(244,186,85,0.85)";
          ctx.lineWidth = Math.max(1.2, size * 0.004);
          for (let tCount = -1; tCount <= 1; tCount += 1) {
            ctx.beginPath();
            const ox = -dirY * tCount * beadR * 0.5;
            const oy = dirX * tCount * beadR * 0.5;
            ctx.moveTo(x + dirX * gr + ox, y + dirY * gr + oy);
            ctx.lineTo(x + dirX * (gr + beadR * 2.2) + ox, y + dirY * (gr + beadR * 2.2) + oy);
            ctx.stroke();
          }
        } else if (i === topBead && topSprite) {
          const tr = beadR * 1.15;
          ctx.drawImage(topSprite, x - tr, y - tr, tr * 2, tr * 2);
        } else if (beadSprite) {
          ctx.drawImage(beadSprite, x - beadR, y - beadR, beadR * 2, beadR * 2);
        }
      }

      // top marker (small teal notch)
      const my = cy - ringR - size * 0.05;
      ctx.beginPath();
      ctx.moveTo(cx - 7, my);
      ctx.lineTo(cx + 7, my);
      ctx.lineTo(cx, my + 11);
      ctx.closePath();
      ctx.fillStyle = "#F57E0F";
      ctx.fill();

      raf = window.requestAnimationFrame(draw);
    };
    raf = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [malaSize]);

  return <canvas ref={canvasRef} className="mc-mala-canvas" aria-label="Spin the mala to count" />;
}
