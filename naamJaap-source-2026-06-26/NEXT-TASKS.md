# Naam Jaap — Next Tasks (Backlog)

Planning only. Nothing here is built yet. Tasks are drawn from the reference screenshots (sidebar app with Dashboard / Progress / Milestones / Goals / Reminders, a modern orbit-style counter, and a Japa Settings modal).

Legend for storage column:
- **Local** = doable fully in browser `localStorage` (no server).
- **Backend** = needs a server / email service / DB (cannot be local-only).

---

## 0. App shell & navigation
A left sidebar that ties all tools together: Dashboard, Progress, Milestones, Goals, Reminders (+ Counter, Settings).

- [ ] Sidebar nav with active-state highlight (indigo pill) and icons.
- [ ] Shared layout so every tool sits inside one app frame.
- [ ] Mobile: collapse sidebar into a bottom bar or hamburger drawer.
- Storage: **Local** (pure UI).
- Note: decide if this replaces the current top `SiteHeader` nav or is a separate "app" area.

---

## 1. Milestones page
"Sacred markers on your journey of devotion."

- [ ] **Earned Badges** list — badge card with icon, name, threshold, date earned, check mark.
- [ ] "N milestones achieved" summary pill.
- [ ] **Current Milestone** — "Currently walking towards" with name, `current / target`, "X chants remaining", progress ring + bar.
- [ ] **The Path** — vertical timeline of all tiers, current one highlighted "In progress", future ones dimmed/locked.
- Tier ladder from screenshots (lifetime chants):
  - Arambh (Beginning) — 108
  - Sadhak (Seeker) — 10K
  - Bhakt (Devotee) — 100K
  - Anushasan (Discipline) — 500K
  - Tapasya (Austerity) — 1M
  - Yogi (Union) — 3M
  - Muni (Sage) — 5M
  - Sanyasi (Renunciant) — 10M
- Storage: **Local** — derive everything from `njc-totals.totalChants`; save earned-date per tier in a new key (e.g. `njc-milestones`).
- Open question: confirm final tier names/thresholds and badge icons.

---

## 2. Goals page (full feature)
"Set and track your spiritual practice goals." Bigger than the simple daily/weekly bars already added to Japa Journey.

- [ ] Summary cards: **Completed** (count this year), **Fulfillment** (%), **Analytics → View Charts**.
- [ ] **Active Goals** list with empty state ("No active goals" + Create Goal CTA).
- [ ] **New Goal** flow: type (daily/weekly/monthly/custom), target (malas or chants), date range, label.
- [ ] Per-goal progress bar + complete/expire logic.
- [ ] Edit / delete a goal.
- [ ] Analytics view (charts of goal fulfillment over time).
- Storage: **Local** — goals array in `localStorage` (e.g. `njc-goals-v2`); progress computed from `njc-day-log`.
- Note: reconcile with the simple goals already in Japa Journey so there's one source of truth.

---

## 3. Reminders page
"Receive email reminders for your japa practice."

- [ ] Empty state + "Add Your First Reminder".
- [ ] Create reminder: time of day, days of week, message.
- [ ] List / edit / delete reminders.
- Storage: depends on type —
  - **Local** if implemented as **browser notifications** (Notification API + a service-worker schedule). Works only while the device/browser allows it; no email.
  - **Backend** if it must send **email** (needs a server + email provider like Resend/SendGrid + stored email address). This is the only feature here that genuinely cannot be local-only.
- Decision needed: **email reminders (backend) vs browser/push notifications (local).** Recommend starting with local browser notifications, add email later if wanted.

---

## 4. Modern Counter — SECOND counter option
Keep the current calm mala-ring counter as the default. Add a **modern "orbit" counter** as an alternate skin the user can switch to.

- [ ] Orbit visual: dotted outer ring + glowing beads filling around a large central disc.
- [ ] Center tile: deity image upload (＋ image) / God name / mantra (per Display toggles).
- [ ] Floating stat tiles: **Time**, **Total (M · chants)**, **Count**, **Goal** ("No goal set" state).
- [ ] Bottom controls: **Start / Pause**, **New**, overflow menu (⋮).
- [ ] "Manual Mode: Tap to Count" status pill.
- [ ] A way to choose between Classic and Modern counter (settings toggle or `?style=` / saved preference).
- Storage: **Local** — reuse existing `njc-*` keys so both counters share history. No data model change.
- Note: this is a visual variant, not a new data system. Confirm whether Modern becomes default or stays optional.

---

## 5. Japa Settings modal
Unified settings sheet for the counter (seen as "Japa Settings").

- [ ] **Mode**: Manual / Auto / Camera.
  - Manual = tap/click anywhere or slide (each reversal = 1 chant). — **Local**
  - Auto = timed auto-increment. — **Local**
  - Camera = count via camera (bead/sound/motion detection). — **Local but heavy** (needs camera permission + detection logic; largest effort, prototype separately).
- [ ] **Vibration**: On Each Count toggle, On Mala Completion toggle; note "iOS uses a subtle sound instead of vibration." — **Local** (`navigator.vibrate`, already used in Kids counter).
- [ ] **Counting Style**: Free Style Mode (continuous counting, no mala completion). — **Local**
- [ ] **Discreet Japa / Privacy Mode**: black screen, only count visible. — **Local**
- [ ] **Mala Size**: editable bead count, default 108, range 10–1080; lock change until current mala finishes. — **Local** (generalize the hardcoded `MALA_SIZE = 108`).
- [ ] **Display** toggles: Show Mantra, God Image, God Name, Sacred Canvas (flowing names bg). — **Local**
- [ ] **Sound**: Mala Completion Sound toggle, Volume slider, sound picker (Temple Bell / Soft Bell / Wooden Click…) with preview play. — **Local** (bundle small audio files or synth tones).
- Storage: **Local** — one settings object key (e.g. `njc-settings`).
- Note: biggest single piece is **Camera mode** — scope it as its own spike.

---

## Cross-cutting / decisions before building
- [ ] One source of truth for **Goals** (Journey simple goals vs full Goals page).
- [ ] Confirm **milestone tiers, names, thresholds, icons**.
- [ ] **Reminders**: email (backend) or browser notifications (local)? Pick one for v1.
- [ ] **Camera counting**: separate research spike; don't block other tasks.
- [ ] Make `MALA_SIZE` configurable everywhere it's currently hardcoded (108).
- [ ] Keep all new keys under the `njc-` prefix so the Journey dashboard's live-sync keeps working.

## Suggested build order
1. App shell + sidebar (unblocks all pages).
2. Japa Settings modal + configurable mala size + vibration (improves the core counter).
3. Modern counter as second option.
4. Milestones (pure read over existing totals — quick win).
5. Goals page (consolidate with Journey).
6. Reminders (after deciding local vs email).
7. Camera mode spike (last, highest risk).
