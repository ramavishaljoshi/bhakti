# Making the Mala Feel Real — Research & Recommendation

Research only. The current "free-spin" mala over-counts on phones (a scroll/fling travels far and registers many beads at once). Here's why, how a real mala actually works, and the model I recommend.

---

## How a real japa mala is used

From traditional practice (Rudraksha Ratna, Yoga International, Japa Mala Beads):

- The mala hangs on the middle/ring finger; the **thumb pulls ONE bead toward the body per mantra** — slow and deliberate.
- It is **one bead = one repetition**, never a fast slide. The index finger never touches the beads.
- At the **guru (sumeru) bead** you don't cross over — you **reverse direction** and continue.
- The motion is small, repetitive, eyes-closed — a rhythm, not a spin.

## How good digital malas handle it

From japa counter apps (Mala Counter, Jap-Mala, Japa 108):

- **One count per gesture** — a single **tap** or a single **swipe**, nothing continuous.
- **Eyes-free**: designed to be used without looking, confirmed by **haptic** buzz (and optional completion chime).
- One big number, minimal clutter, progress saved locally.

## Why our current spin over-counts

We map *cumulative rotation* to beads (1 turn = 108). That's elegant on desktop with a slow drag, but on a phone a flick/scroll covers a large angle in one motion → dozens of beads at once. It also doesn't match how a mala is really used (deliberate, one-at-a-time).

---

## Recommended model: "pull one bead per gesture"

Switch Mala mode from continuous spin to **one bead per deliberate gesture**, which is both authentic and accurate:

- **One swipe = one bead.** A short drag past a small threshold advances **exactly one** bead, no matter how fast or far — then it ignores further motion until you lift and swipe again. Fast or slow, you can't over-count.
- **Tap also = one bead** (the eyes-free primary, like the tap apps). The whole ring is a big tap target.
- **Bead-advance animation:** the active bead visibly **slides up to the top marker and snaps**, the strand rotates by exactly one bead-step (a short eased tween), the next bead glows. This gives the "moving a real mala" feel without free spin.
- **Haptic + chime once per bead** (already built; the one-per-gesture rule means no audio spam).
- **Guru bead honored:** the golden guru bead is the start/finish; completing 108 saves the mala and the loop continues (we can add the traditional "reverse at guru" later if wanted).
- **No momentum/scroll counting** → removes the phone over-count entirely. (Optional: keep a gentle visual swing for life, but it never counts.)

### Why this is better
- **Accurate on every device** — gesture-gated, not motion-distance-gated.
- **Authentic** — mirrors thumb-pulling one bead per mantra.
- **Eyes-free** — tap or swipe anywhere, feel the buzz, stay with the mantra.
- **Calm** — deliberate rhythm instead of a spinning toy.

### Interaction details to implement
- Swipe: on pointer-up, if drag distance/angle exceeded a small threshold → advance 1 (direction sets forward/back-undo). Reset per gesture.
- Tap: pointer-up with little movement → advance 1.
- Animation: tween the strand by one bead-step (~180 ms ease-out); lock input during the tween or queue one.
- Keep Start/Pause (timer), New (reset), Fullscreen, Progress, Settings as-is.
- Mode label: "Mala Mode: Pull a bead" (tap or swipe).

### Optional extras (later, low priority)
- A soft "wood click" per bead for realism (synth, no files).
- Reverse-at-guru behavior to match tradition exactly.
- A subtle idle sway of the strand (decorative, never counts).

---

## Recommendation

Replace the free-spin counting with **one-bead-per-tap/swipe + a one-step snap animation.** It fixes the over-counting, matches how a mala is truly used, and stays fully local/offline. The richer **Matter.js hanging-strand** remains a separate, optional spike if you later want a physically swinging strand — but even there, counting should be **one bead per deliberate pull**, not free motion.

Next step (on your go-ahead): rebuild `PhysicsMala` as the gesture-based "pull a bead" model with the snap animation.
