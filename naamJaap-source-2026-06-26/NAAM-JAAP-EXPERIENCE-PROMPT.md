# Development Prompt — A Naam Jaap That Feels Physically & Spiritually Real (Mobile-only)

Copy-paste the prompt below into your AI/dev tool. It carries its own context (purpose, researched benefits, physics, psychology), so it can be used standalone.

---

## THE PROMPT

You are building a **mobile-only Naam Jaap (mantra repetition) experience** that feels like holding and using a **real mala** — physically natural, emotionally calming, and quietly addictive in a *healthy* way. Approach it with the heart of a saint and the rigor of a scientist: the goal is not a counter app, it is a **doorway into stillness** that a person is drawn back to without willpower.

### Purpose (the saint's intent)
Japa is the deliberate repetition of a divine name, one bead at a time, to gather a scattered mind. The tool must protect that spirit: calm, unhurried, ego-quieting, never a noisy productivity feed. Success = the user forgets they are using an app and simply chants.

### Why it works (ground the design in this; cite if asked)
- Mantra repetition activates the **parasympathetic nervous system via the vagus nerve** → slower heart rate, higher HRV, lower cortisol.
- It **quiets the default-mode network** (the brain's worry/rumination loop) and shifts brainwaves toward **alpha/theta** calm.
- Herbert Benson (Harvard) showed repetition reliably triggers a **relaxation response** regardless of the word; AIIMS found OM chanting lowers limbic (emotional) activity.
- Habits form through a **cue → simple action → immediate satisfying feedback** loop; intrinsic pleasure and gentle, *non-manipulative* reward make a calm behaviour self-sustaining.

### The core interaction — make the physics feel REAL
- A real mala advances **one bead per mantra**, pulled deliberately by the thumb — never a fast spin.
- So: **one bead per deliberate gesture** (a single tap, or one short swipe past a small threshold). Speed or distance must NEVER over-count — gesture-gated, not motion-gated.
- Each bead **animates physically**: the strand rotates exactly one bead-step with eased, weighty motion (subtle inertia/settle), the next bead rises to a marker and glows. Use real-feeling easing and micro-physics (spring/damping) so it has *weight*, not a flat tick.
- The **guru (sumeru) bead** marks start/finish; at 108 the round completes and gently begins again.
- Must be **eyes-free**: tap/swipe anywhere on the bead area, confirmed by feedback — usable with the screen barely glanced at.

### Multi-sensory feedback (the emotional pull — keep it gentle, never slot-machine)
- **Haptics:** a soft buzz on every bead, a warmer pattern on completing 108. (`navigator.vibrate`; on iOS use a subtle sound instead.)
- **Sound:** an optional soft per-bead chime and a chosen completion bell (Temple Bell / Soft Bell / wooden click), volume controlled, synthesized so it works offline.
- **Visual:** warm, tactile beads (shaded 3D spheres, a thread, a tasselled guru bead), a living but quiet background — breathing light, not flashing rewards.
- **Breath rhythm (optional):** a faint pulse the user can match breath to, reinforcing the parasympathetic effect.

### The healthy "attraction" loop (habit, not addiction)
- **Cue:** a gentle daily reminder + an inviting, instantly-open screen (no login, no friction).
- **Action:** one effortless gesture per chant.
- **Reward:** immediate sensory confirmation + quiet progress — a streak that celebrates *returning*, not perfection; milestones framed as a sacred journey (Arambh → Sadhak → Bhakt…), never guilt or pressure.
- Keep variable reward **soft and meaningful** (a kind blessing, a new calm scene) — design for *devotion and peace*, explicitly NOT compulsion. No dark patterns, no anxiety, no endless feed.

### Constraints
- **Mobile-first and mobile-only** in layout: full-screen counter, large eyes-free target, thumb-reachable controls, safe-area aware, distraction-free / fullscreen focus mode.
- **Local-first & private:** all data in the browser (localStorage), works offline, no account, no server, no tracking.
- **Performant:** smooth 60fps on mid-range phones (cache bead sprites, sleep when idle, respect `prefers-reduced-motion`).
- **Accessible & calm:** legible, gentle contrast, optional silence, never overstimulating.

### Deliverable
A focused mobile japa screen where a person taps or pulls one bead per mantra, feels a real, weighted bead move with sound and haptic, watches a quiet progress journey grow, and is drawn back daily — because it makes them feel calm, present, and devoted. Build the interaction model first (one-bead-per-gesture + physical bead animation + feedback), then the gentle progress/streak layer.

---

### One-line version (if you need it short)
> Build a mobile-only, offline Naam Jaap mala where each tap/short-swipe pulls exactly one physically-animated bead (weighted easing, soft haptic + chime), framed as a calm spiritual journey — designed using the neuroscience of mantra (vagal/parasympathetic calm, quieting the default-mode network) and gentle habit psychology (cue → effortless action → soft satisfying feedback) so it feels real, emotional, and naturally draws the user back — without any dark patterns or pressure.
