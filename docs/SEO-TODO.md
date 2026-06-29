# Bhakti — SEO TODO (pending work)

Handoff list for the next session. P0 + P1 of the roadmap are **done and deployed**
(see `docs/SEO-STRATEGY.md` §9). Below is everything still pending, ordered by
impact, with concrete steps so you can pick up cold.

Status legend: 🔴 not started · 🟡 needs data/input from you · 🟢 quick code-only win

---

## 1. 🟡 Replace placeholder god images  (do this first — quality blocker)
**Problem:** `lib/data/gods.ts` uses `picsum.photos` (random stock photos, not deities).
Looks wrong on `/gods` and every god detail page.
**Steps:**
- Add real, licensed god artwork to `public/assets/gods/` (e.g. `shiva.jpg`).
- Update each `image:` field in `lib/data/gods.ts` to `/assets/gods/<slug>.jpg`.
- Run the image optimizer so they get resized/compressed (see §8).
- Rebuild and check `/gods`.

## 2. 🟢 /panchang — daily Panchang page  (library already installed)
**Why:** Targets high-volume "aaj ka panchang", "ekadashi today", "rahu kaal today".
`mhah-panchang` is already a dependency and `lib/panchang.ts` already computes it.
**Steps:**
- Create `app/panchang/page.tsx`: render today's tithi, nakshatra, sunrise/sunset,
  Rahu Kaal, etc. from `lib/panchang.ts` (`DEFAULT_LOCATION` = New Delhi).
- Add `buildMetadata`, breadcrumb schema, FAQ (English + Hinglish), QuickAnswer.
- ⚠️ Static export: the page is built once at build time, so "today" is the build
  date. Either (a) compute client-side in a `"use client"` component for a live
  date, or (b) document that it reflects the last deploy. Recommend client-side.
- Add `/panchang` to `app/sitemap.ts` and the footer/nav.

## 3. 🔴 /vrat — fasting/observance hub
**Why:** "janmashtami vrat", "ekadashi vrat rules", "pradosh vrat" are strong queries.
**Steps:**
- Create `lib/data/vrats.ts` (new) — fields: slug, name, deity, frequency, story,
  rules/vidhi[], whatToEat[], whatToAvoid[], mantras[], faqs[].
- Build `app/vrat/page.tsx` + `app/vrat/[slug]/page.tsx` mirroring the festival
  pattern (metadata, breadcrumb, Article + FAQ schema, QuickAnswer, KeyFacts,
  RelatedLinks, EditorialNote).
- Add to sitemap + footer/nav. Cross-link from festivals/gods where relevant.

## 4. 🔴 /articles — topical blog (Hinglish intent)
**Why:** Captures the long tail: "diwali kab hai", "best mantra for peace",
"how to start daily jap", "108 ka matlab".
**Steps:**
- `lib/data/articles.ts` already partially referenced in `lib/data/misc.ts` — check
  what exists, formalize an `Article` data shape (slug, title, excerpt, body[],
  date, related[]).
- Build `app/articles/page.tsx` + `app/articles/[slug]/page.tsx` with Article schema,
  author, dateModified, breadcrumb, FAQ, RelatedLinks.
- Add to sitemap + footer.

## 5. 🟡 EEAT — author & editorial-policy pages
**Steps:**
- `app/about` exists — add a real **author/team bio** with `Person` schema
  (name, role, credentials) and link it from `EditorialNote` (currently links nowhere).
- New `app/editorial-policy/page.tsx`: how content is sourced/reviewed. Link in footer.
- Optionally point `EditorialNote`'s "editorial team" text to these pages.

## 6. 🟡 Organization `sameAs` (social profiles)
**Blocked on you:** give me the real social URLs (Instagram / YouTube / X / Facebook).
Then add a `sameAs: [...]` array to `organizationSchema()` in `lib/seo.ts`.
(Deliberately omitted — won't fabricate URLs.)

## 7. 🔴 Festival `Event` schema
**Blocked on data:** festival dates in `lib/data/festivals.ts` are non-ISO
(e.g. "Falgun Purnima"). For Event rich results, add an ISO `startDate` per festival
(per year), then add `eventSchema()` to `lib/seo.ts` and the festival detail page.

## 8. 🟢 Per-entity OG images + re-run image optimizer
- Currently all pages share `/assets/hero-illustration.png` for social cards.
  Generate per-entity OG images (or at least per-section) and pass `image:` to
  `buildMetadata`.
- After adding ANY new images, re-run the optimizer (resize + compress):
  - Script: `scratchpad/optimize-images.js` (sharp is installed).
  - Run from project root: `NODE_PATH=./node_modules node <script-path>`
  - It only downscales/recompresses; safe to re-run.

---

## Quick reference (already built — reuse these)
- `buildMetadata(...)`, `breadcrumbSchema`, `articleSchema`, `faqSchema`,
  `speakableSchema`, `howToSchema`, `CONTENT_UPDATED` → `lib/seo.ts`
- `<FaqSection>`, `<RelatedLinks>`, `<QuickAnswer>`, `<KeyFacts>`,
  `<EditorialNote>`, `<JsonLd>` → `components/shared/`
- Name→entity helpers: `getGodByName`, `getFestivalByName`, `getTempleByName`,
  `getGodsByFestival`, `getAllStates`/`getStateBySlug`/`stateSlug`
- After edits: `npx tsc --noEmit` → `npx next build` → `npx next lint`.
  (On Windows the first build after installs can crash with a transient Jest
  worker error — just re-run.)
- Bump `CONTENT_UPDATED` in `lib/seo.ts` when you refresh content.

## Don't forget (post-deploy)
- Submit `https://bhakti.agenticvani.com/sitemap.xml` in Google Search Console.
- Test a god/festival/jap page in Google's **Rich Results Test** (FAQ, Breadcrumb,
  HowTo, Speakable).
- Re-run PageSpeed (mobile + desktop) after the image work to confirm 90+.
