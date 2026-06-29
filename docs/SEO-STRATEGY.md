# Bhakti by Agentic Vani — SEO / GEO / AIO Strategy & Roadmap

> Goal: make Bhakti the most authoritative Indian spiritual platform across Google
> Search, Google AI Overviews, Bing, and AI engines (ChatGPT, Claude, Gemini,
> Perplexity). This document is the production plan; it tracks what is **done**,
> what is a **gap**, and the **priority order** to close them.

Canonical domain: `https://bhakti.agenticvani.com` · Static export (Cloudflare Pages).

---

## 1. Technical SEO Audit — current state

**Done (shipped):**
- `lib/seo.ts` central config + `buildMetadata()` (canonical, OG, Twitter, robots).
- Title template, `metadataBase`, site-wide **Organization + WebSite** JSON-LD.
- Per-page metadata on every route; **canonical** URLs everywhere.
- Structured data: **BreadcrumbList** (sections/details), **Article** (mantra/festival),
  **TouristAttraction** (temples), **FAQPage** (home, mantras, jap, temples, festivals,
  festival details).
- `app/sitemap.ts` (79 URLs) + `app/robots.ts`; Google Search Console verification file.
- Performance: framer-motion → CSS animations (TBT ~10ms), images optimized
  (~45MB → ~13MB), modern `browserslist`, Cloudflare `_headers` cache policy.

**Open technical gaps:**
1. **Broken internal link:** home "Daily Reading" → `/gita` is a **404** (no route). High priority.
2. **No `/gods` route** though `lib/data/gods.ts` has 7 complete entities — the core
   entity hub is missing.
3. **No `/scriptures` / `/gita`** route though `lib/data/gita.ts` exists.
4. **No `/states/[state]`** pages — the home "Explore by state" links go to
   `/temples?state=` (filter), not indexable hub pages.
5. **No `/vrat`, `/articles`** sections (brief requests them).
6. **No author/EEAT signals** (author box, editorial policy, "last updated", sources).
7. Listing cards use raw `<img>` without width/height (minor CLS risk; currently CLS 0).

---

## 2. Target Information Architecture

```
/                         Home (hub: links to every cluster)
/mantras                  ✅ listing + FAQ
/mantras/[slug]           ✅ detail (Article + Breadcrumb)
/gods                     ❌ BUILD — listing (data ready)
/gods/[slug]              ❌ BUILD — detail; entity hub linking festivals/temples/mantras
/festivals                ✅ listing + FAQ
/festivals/[slug]         ✅ detail (Article + FAQ + Breadcrumb)
/temples                  ✅ listing + FAQ
/temples/[slug]           ✅ detail (TouristAttraction + Breadcrumb)
/states                   ❌ BUILD — listing
/states/[state]           ❌ BUILD — temples grouped by state (indexable hub)
/scriptures               ❌ BUILD — hub
/scriptures/bhagavad-gita ❌ BUILD — chapters/verses (data ready in gita.ts)
/jap                      ✅ tool + FAQ
/intentions               ✅ listing + detail
/vrat                     ❌ BUILD (future) — Ekadashi, Pradosh, Navratri vrat
/articles                 ❌ BUILD (future) — blog/topical content
/panchang                 ◻ optional — daily panchang (data via mhah-panchang)
```

Add **breadcrumb navigation UI** (visible, not just schema) on detail pages.

---

## 3. Entity Graph (Semantic / Entity SEO)

The `/gods/[slug]` hub is the linchpin — it already has the data to wire the graph.
Example (Krishna):

```
Krishna ──┬── Festival: Janmashtami, Holi, Govardhan Puja
          ├── Temples: Banke Bihari, Dwarkadhish
          ├── Mantras: Hare Krishna Maha Mantra, Krishna mantras
          ├── Scripture: Bhagavad Gita (+ Gita quotes)
          ├── Place/Entity: Vrindavan, Mathura, Dwarka, Govardhan
          └── Intention: peace, devotion, gratitude
```

**Implementation:** each `gods/[slug]` page renders "Related Festivals / Temples /
Mantras / Scriptures" link blocks from the existing `God` fields (`festivals`,
`temples`, `mantras`). Reciprocally, mantra/festival/temple detail pages should add
a "Related God" link. This creates the bidirectional topical graph.

Add JSON-LD `sameAs` (Wikipedia/Wikidata) on god & temple entities to anchor them to
the knowledge graph — strong for AI engines and Google entity matching.

---

## 4. SEO Silos / Content Clusters

Build one silo per major deity, hub = `/gods/[slug]`:

| Cluster  | Hub          | Spokes (link from hub)                                                      |
|----------|--------------|-----------------------------------------------------------------------------|
| Shiva    | /gods/shiva  | Maha Shivaratri · Om Namah Shivaya · Kedarnath · Kashi Vishwanath · 12 Jyotirlinga |
| Krishna  | /gods/krishna| Janmashtami · Hare Krishna mantra · Banke Bihari · Bhagavad Gita · Vrindavan |
| Hanuman  | /gods/hanuman| Hanuman Jayanti · Hanuman Chalisa · Hanuman mantras                          |
| Durga    | /gods/durga  | Navratri · Durga mantras · Vaishno Devi · Kamakhya                           |
| Ganesha  | /gods/ganesha| Ganesh Chaturthi · Ganesha mantras · Siddhivinayak                           |
| Lakshmi  | /gods/lakshmi| Diwali · Dhanteras · Lakshmi mantras                                         |
| Ram      | /gods/ram    | Ram Navami · Ramayana · Ram Mandir Ayodhya                                   |

Each spoke links back to the hub → tight topical authority.

---

## 5. AIO / GEO content pattern (apply to every detail page)

To be cited by AI Overviews and chat engines, each page should expose, in this order:

1. **Quick Answer / Summary box** (2–3 sentences answering the page's main question).
2. **Definition** ("What is X?") — one tight paragraph.
3. **Key Facts** — bullet list or table (date, deity, location, significance).
4. **How-to / Steps** where relevant (puja vidhi, how to chant) as ordered list.
5. **FAQ** (✅ component exists: `FaqSection`).
6. **Traditional context** with "traditionally / according to Hindu traditions" framing.

These map directly to Question→Answer, lists, tables — the formats AI engines extract.
Add **`Speakable` schema** to the Quick Answer + FAQ for voice search.

**Indian search-intent pages to target** (high volume, Hinglish):
`diwali kab hai`, `janmashtami vrat`, `mahashivratri fasting`, `hanuman mantra`,
`lakshmi mantra`, `best mantra for peace`, `ekadashi today`, `aaj ka panchang`,
`puja vidhi`, `108 jaap`. Several already have landing pages (mantras, jap, festivals);
`vrat` and `panchang` intents need dedicated pages.

---

## 6. Internal Linking Map (automated)

Build a reusable `RelatedLinks` component that each detail page renders, driven by the
entity's existing relation fields:

- **Mantra** → Related God, Related Festival, Related Temple, Related Intention.
- **Festival** → Related God, Related Mantras, Related Temples, Related Vrat.
- **Temple** → Related God (deity), Related Festivals, Related State, Nearby Temples.
- **God** → Related Festivals, Temples, Mantras, Scriptures, Bhajans, Aarti, Quotes.
- **State** → Temples in state, major festivals, regional deities.

Goal: every page links to ≥4 related entities; no orphan pages; ≤3 clicks from home to any page.

---

## 7. Schema Recommendations (beyond what's shipped)

| Page type    | Add                                                                    |
|--------------|------------------------------------------------------------------------|
| God          | `Person`/`Thing` + `sameAs` (Wikipedia), Breadcrumb, FAQ, Speakable    |
| Festival     | `Event` (startDate) in addition to Article; HowTo for puja vidhi       |
| Temple       | keep `TouristAttraction`; add `geo` coords, `sameAs`, `review`/`rating`|
| Gita         | `Book` + `Chapter`/`CreativeWork` per chapter                          |
| Jap tool     | `HowTo` (how to do jap) + `SoftwareApplication`                        |
| All articles | `Article` w/ `author`, `datePublished`, `dateModified`                 |
| Org (global) | add `sameAs` social profiles, `logo`, `contactPoint`                   |

---

## 8. EEAT plan

- **Author box** + `/about` editorial team, with `Person` schema and credentials.
- **Editorial policy** + **"How we source"** page; link in footer.
- **"Last updated" date** on content pages (`dateModified`).
- **Sources & references** block on scripture/festival/god pages (cite traditional texts:
  Puranas, Ramayana, Gita) — builds trust and gives AI engines citable provenance.
- Consistent **disclaimer** on benefit claims (already used on intentions) site-wide.

---

## 9. Prioritized Roadmap

**P0 — fix + highest impact (1–2 builds):**
1. Fix the `/gita` 404 → build `/scriptures/bhagavad-gita` (data ready) or repoint the link.
2. Build **`/gods` + `/gods/[slug]`** cluster (data ready): unlocks the entity graph,
   internal linking, and 7 high-authority hub pages. Add to sitemap.

**P1 — topical authority:**
3. `RelatedLinks` component + wire reciprocal links across mantra/festival/temple/god.
4. `/states/[state]` indexable temple hubs (replace filter-only links).
5. Add Quick-Answer/Definition/Key-Facts blocks + Speakable to all detail pages.

**P2 — coverage expansion:**
6. `/vrat` (Ekadashi, Pradosh, Navratri) + `/panchang` (daily, mhah-panchang).
7. `/articles` topical blog targeting Hinglish intent queries.
8. EEAT: author boxes, editorial policy, last-updated, sources.

**P3 — enrichment:**
9. `sameAs`/Wikidata anchoring, Event/HowTo/Book schema, ratings.
10. Per-entity OG images (currently one shared hero image).

---

## 10. Expected outcome

- Closing P0+P1 roughly **doubles indexable, entity-rich pages** and completes the
  Google's-eye topical graph (gods ↔ festivals ↔ temples ↔ mantras ↔ scriptures).
- AIO/GEO blocks make pages directly quotable by AI Overviews and chat engines.
- Combined with the shipped technical SEO + performance work, this positions the site
  to compete for head terms ("hanuman chalisa", "diwali", "kedarnath") and the long tail
  of Hinglish intent queries.
