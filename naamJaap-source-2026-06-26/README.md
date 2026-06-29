# Naam Jaap Counter

A calm, private, offline-friendly **108-mala counter** for Naam Jaap, mantra chanting and japa practice.

This repo is the **interactive HTML prototype** of the page. It is a single-file
deliverable (`index.html` + a few `.jsx` modules loaded by Babel-in-browser) that you can
preview locally and port into the Astro site at `/free-tools/naam-jaap-counter/`.

---

## 1 · What's in here

| File | Purpose |
|---|---|
| `index.html`         | Page shell — meta tags, SEO content, FAQ schema, SoftwareApplication schema, CSS, mount points. |
| `counter-core.jsx`   | `MalaRing`, audio (chime + ambient drone), localStorage wrapper, mantras, palettes, legacy-key migration. |
| `counter.jsx`        | `NaamJaapApp` — state, persistence, tap/undo/reset, exports, topbar chips, Tweaks panel wiring. |
| `tweaks-panel.jsx`   | Reusable Tweaks shell (host protocol + form controls). |

The prototype runs entirely in the browser. No build step. Open `index.html` in any
modern browser.

---

## 2 · Features

**Counting**
- Tap anywhere on the ring to count.
- `Space` / `Enter` keyboard shortcut. `Backspace` / `U` for undo.
- Haptic vibration on supported mobile devices.
- Soft synthesised chime on each tap; a slightly different chime at 108.
- Auto-save on mala completion; counter rolls into the next round seamlessly.

**Visuals**
- SVG 108-bead mala — beads and progress arc share the same circle geometry.
- Sumeru bead at the top, dividing markers every 27 beads.
- Subtle breathing aura, soft tap ripple, gentle 360° rotor flip on completion.
- Deity text watermark behind the ring (राम / राधे / शिव / कृष्ण / ੴ / ॐ).

**Tweaks (toolbar toggle)**
- 5 palettes: Indigo Night, Moonlight, Twilight, Forest Temple, Warm Dusk.
- 4 bead styles: Outlined / Solid dots / Glowing halo / Gold counted.
- Mala size: 108 / 54 / 27.
- Animation intensity, chime + ambient drone toggles, haptics, language, export, hard reset.

**Data**
- All sessions stored in `localStorage` under `njc-*` keys.
- Session record matches the spec: `{ id, start, end, count, size, durationSec, mantra, deity, done, createdAt }`.
- Export as **CSV download** or **JSON copy-to-clipboard**.
- Migration from legacy `njc-mala-rounds` key on first load.
- No network calls, no analytics, no third-party scripts.

**Accessibility & responsive**
- Semantic buttons, focus rings, ARIA labels.
- Single column under 880px, 3-column over 880px, wider gutters over 1100px.
- All tap targets ≥ 44px high.
- No text overflow at 360px width.

**SEO**
- Title and meta description per spec.
- `SoftwareApplication` and `FAQPage` JSON-LD blocks in `<head>`.
- Six content sections below the tool, with the spec's target keywords used naturally.
- Internal links to related tools.

---

## 3 · Porting to Astro

Recommended structure:

```
src/
  pages/
    free-tools/
      naam-jaap-counter/
        index.astro          ← page shell (meta, SEO content, schema)
  components/
    NaamJaapCounter/
      index.tsx              ← React island
      MalaRing.tsx
      useAudio.ts
      storage.ts
      tweaks.tsx
      i18n.ts
  styles/
    naam-jaap.css            ← CSS variables + page styles
public/
  manifest.webmanifest
  sw.js                      ← service worker (optional)
```

### Steps

1. **Create the route.** `src/pages/free-tools/naam-jaap-counter/index.astro` — copy the `<head>` block, both JSON-LD schemas, and everything inside `<section class="seo">` from `index.html` verbatim. Astro will pre-render this as static HTML — perfect for SEO.

2. **Move the counter to a React island.**
   ```astro
   ---
   import NaamJaapCounter from "@/components/NaamJaapCounter";
   ---
   <section class="stage">
     <NaamJaapCounter client:load />
   </section>
   ```
   The `client:load` directive ships React + the counter only — the SEO content below stays static.

3. **Lift each `.jsx` block into a real TS module.** The `counter-core.jsx` here is intentionally written as plain functions + hooks, no global state — it ports 1:1 to `MalaRing.tsx`, `useAudio.ts`, `storage.ts`, `i18n.ts`. Drop the `Object.assign(window, …)` line at the bottom and replace with `export`s.

4. **Tweaks panel.** Decide: keep it (developer/power-user toggle) or strip for production. If you keep it, factor `tweaks-panel.jsx` into a proper component; if you drop it, replace the `useTweaks` hook with a plain `useState` and a small settings sheet.

5. **PWA.**
   - Add `public/manifest.webmanifest` with `name`, `short_name`, `theme_color: "#0b1024"`, icons (192/512), `display: "standalone"`, `start_url: "/free-tools/naam-jaap-counter/"`.
   - Link it from `<head>` and add a basic service worker that caches the page shell + JS bundle on install for offline use.

6. **Custom deity images.** The spec asks to avoid copyrighted deity images by default. Keep the text-watermark mode as the default. For user uploads, accept a file via `<input type="file" accept="image/*">`, read as `dataURL`, store under `njc-deity-image` in localStorage (or IndexedDB if the image is large).

7. **Optional Google Sheets sync.** Stub a webhook in the Export modal — POST `JSON.stringify({totals, sessions})` to a user-provided Apps Script URL. Make the URL itself a localStorage value the user pastes in.

---

## 4 · Deployment

The page is static after the Astro build. Deploy to:

- **Vercel** — `vercel --prod` from the project root.
- **Netlify** — push to a connected git repo, build command `astro build`, publish `dist`.
- **Cloudflare Pages** — same build command.
- **Any static host** — `astro build` then upload `dist/`.

There is no backend and no environment variable required. The optional Google Sheets sync is purely client-side; nothing is stored on your servers.

---

## 5 · Notes on the audio

- Both the tap chime and the ambient drone are **synthesised on the fly** with the Web Audio API. No audio files are bundled, so there are no licensing concerns and no extra bytes shipped.
- The drone is a slow A2 + E3 + A3 stack with a low-pass filter and a subtle LFO — a tanpura-shaped wash that fades in / out gently.
- The chime is a sine + 2nd harmonic at 392 Hz on every tap, with a richer 528 Hz + harmonics chord on every 108th tap.

If you want a real recorded ambient track later, replace the `useAudio` drone code path with an `<audio loop src="…" />` element. Keep the manual user-tap gating — browsers block autoplay by default.

---

## 6 · Local storage keys

| Key | Shape |
|---|---|
| `njc-current-count`   | `number` — count of in-progress mala |
| `njc-current-elapsed` | `number` — seconds elapsed in current mala |
| `njc-sessions`        | `Session[]` — last ~200 completed malas, newest first |
| `njc-totals`          | `{ totalMalas, totalChants, totalSeconds }` |
| `njc-day-log`         | `{ "2026-05-13": { malas, chants, seconds } }` |
| `njc-migrated`        | `boolean` — has legacy `njc-mala-rounds` been migrated |

All reads go through a `LS` wrapper with safe `JSON.parse`, so corrupted data never breaks the page.
