# Physics-based Japa Experience — Feasibility Plan (Matter.js)

Planning / research only. Nothing built. The question: can Matter.js give a natural, physics-based feel to the practice for the sadhak?

Short answer: **Yes — and the single best use is a real, draggable mala you turn with your finger.** It fits the existing data model with no backend. The main risk is keeping the count exact, which is solvable with a deterministic "sensor", not the physics itself.

---

## About the library

- **Matter.js** — 2D rigid-body physics engine for the web (rigid bodies, **constraints**, **composites/chains**, collisions, gravity, **events**, **sleeping bodies**). MIT licensed, ~ standalone, no dependencies.
- Size: roughly **80–90 KB minified (~25 KB gzip)**. Acceptable if **lazy-loaded only on the counter**, not on every page.
- Renders to its own `<canvas>` (or you can drive your own renderer from its body positions).

---

## Concepts, ranked by value to the sadhak

### 1. The living mala — a real bead loop you turn (RECOMMENDED)
A loop of 108 beads strung on constraints, hanging with gravity. The user **drags/flicks** beads with finger or mouse; the strand swings and settles naturally. A fixed **guru (sumeru) bead** marks the start. Each time a bead **crosses the guru marker**, count +1 — exactly like a physical mala.

- Why it's the best: it turns counting from "tapping a screen" into "moving a mala", which is what devotees actually do. Deeply on-theme for a *sadhak*.
- Fits the app as a **new counting Mode** ("Mala / Physical") alongside Manual / Auto, saved in settings.

### 2. Reward / celebration physics (low risk, high delight)
On mala completion (108), drop **flower petals / marigold / butter drops** that fall with gravity and pile up. Purely decorative, no counting involved — safe and quick. Natural fit for the **Kids "Fill the Bhakti Bucket"** page (beads physically dropping and stacking) and the modern counter's completion moment.

### 3. Karma Reset metaphor (thematic)
Physically **toss/throw** a "worry" object off-screen, or watch tension objects fall away — a tactile version of the existing sankalp action. Optional, niche.

### 4. Orbit counter flourish
Give the modern counter's orbiting beads light attraction/spring so they feel alive when flicked. Cosmetic only; the idle CSS animation already covers most of this — low priority.

---

## How it maps to the current architecture

- **No new storage model.** Physics only changes *interaction*. Counting still calls the existing `recordMala()` in `src/lib/japaStore.ts`, so Journey, Milestones, Goals and totals keep working unchanged.
- **Lives as a Mode**, not a new page. The Japa Settings modal already has Manual / Auto; add "Mala (physical)". Keeps one counter, one history.
- **Lazy load.** `import('matter-js')` only when the physical mode is selected, so other pages and the default counter stay light.

---

## The real risk: counting must stay exact (108)

Physics is non-deterministic; you can't trust "a bead bounced past" to count reliably (double counts, missed counts). Solution: **separate feel from truth.**

- Use a thin **sensor zone** at the guru marker. Count +1 only on a clean **directional** crossing (e.g. bead moving clockwise through the gate), with a small debounce so jitter near the line can't double-fire.
- Track each bead's id so the same bead can't count twice without leaving and re-entering.
- The physics gives the *feel*; a deterministic crossing rule gives the *number*. Authoritative count never comes from raw collisions.

This is the one piece that needs a careful prototype before committing.

---

## Other risks & mitigations

| Risk | Mitigation |
|---|---|
| **Mobile performance** — 108 constrained bodies at 60fps on low-end phones | Use fewer constraint segments (e.g. 36 visual beads representing the round), enable **sleeping bodies**, cap solver iterations, pause the engine when the tab/section isn't visible. Prototype on a real mid-range phone early. |
| **Battery drain** — continuous simulation | Run the engine only while interacting; **sleep** when settled; stop on blur / when not in viewport. |
| **Bundle size** (~25 KB gzip) | Dynamic `import()` only in physical mode. |
| **Accessibility / motion sensitivity** | Respect `prefers-reduced-motion`; always keep tap-to-count and Auto mode as non-physics fallbacks. Physical mode is opt-in. |
| **Touch vs scroll conflict** on mobile | Constrain dragging to the mala area; `touch-action: none` only on the canvas, not the page. |
| **Determinism across devices** | Fine, because the count comes from the sensor rule, not from reproducing identical physics. |

---

## Suggested approach (if you decide to proceed)

1. **Spike first (½–1 day):** a throwaway prototype of a draggable bead loop + guru-gate counter on one phone. Goal: confirm it *feels* good and the count stays exact under fast flicks. Decide go/no-go from this.
2. If good, wire it as a **"Mala (physical)" Mode** in Japa Settings, lazy-loaded, writing through `recordMala()`.
3. Keep **petal-drop completion** as a separate, easy win that can ship even if the full mala is deferred.
4. Always ship with the **tap/auto fallback** and reduced-motion handling.

**Effort:** petal celebration = small. Full physical mala with reliable counting = medium, gated on the spike. Camera mode (from the earlier backlog) remains the only genuinely large/risky one — physical mala is lower risk than that.

**Verdict:** worth doing. Start with the spike for the physical mala, and ship the petal-drop celebration as a quick, safe first taste of physics.
