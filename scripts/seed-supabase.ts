/* Seed Supabase content tables from the app's lib/data/* files.
   Run: npx tsx scripts/seed-supabase.ts   (from project root) */
import { readFileSync } from "node:fs";

const env = readFileSync(".env.local", "utf8");
const get = (k: string) => {
  const m = env.match(new RegExp(`^${k}=(.*)$`, "m"));
  return (m?.[1] ?? "").trim().replace(/^["']|["']$/g, "").replace(/\r$/, "");
};
const URL = get("NEXT_PUBLIC_SUPABASE_URL");
const KEY = get("NEXT_PUBLIC_SUPABASE_ANON_KEY");

async function upsert(table: string, rows: Record<string, unknown>[], onConflict = "slug") {
  if (!rows.length) return;
  const res = await fetch(`${URL}/rest/v1/${table}?on_conflict=${onConflict}`, {
    method: "POST",
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=ignore-duplicates,return=minimal",
    },
    body: JSON.stringify(rows),
  });
  const txt = res.ok ? "" : " -> " + (await res.text());
  console.log(`${res.ok ? "✅" : "❌"} ${table}: ${rows.length} rows (HTTP ${res.status})${txt}`);
}

async function load<T>(path: string): Promise<T | null> {
  try {
    return (await import(path)) as T;
  } catch (e) {
    console.log(`⚠️  skip ${path}: ${(e as Error).message}`);
    return null;
  }
}

async function main() {
  console.log("Seeding:", URL);

  const f = await load<{ festivals: any[] }>("../lib/data/festivals");
  if (f) await upsert("festivals", f.festivals.map((x) => ({
    slug: x.slug, name: x.name, date_label: x.date, iso_date: x.isoDate ?? null,
    story: x.story, why_celebrate: x.whyCelebrate, image_url: x.image,
  })));

  const g = await load<{ gods: any[] }>("../lib/data/gods");
  if (g) await upsert("gods", g.gods.map((x) => ({
    slug: x.slug, name: x.name, title: x.title, introduction: x.introduction,
    story: x.story, image_url: x.image, color: x.color,
  })));

  const m = await load<{ mantras: any[] }>("../lib/data/mantras");
  if (m) await upsert("mantras", m.mantras.map((x) => ({
    slug: x.slug, name: x.name, sanskrit: x.sanskrit, transliteration: x.transliteration,
    deity: x.deity, category: x.category, meaning: x.meaning,
    benefits: x.benefits ?? [], image_url: x.image, audio_url: x.audio ?? null,
  })));

  const t = await load<{ temples: any[] }>("../lib/data/temples");
  if (t) await upsert("temples", t.temples.map((x) => ({
    slug: x.slug, name: x.name, deity: x.deity, state: x.state, city: x.city,
    history: x.history, image_url: x.image,
  })));

  const v = await load<{ vrats: any[] }>("../lib/data/vrat");
  if (v) await upsert("vrats", v.vrats.map((x) => ({
    slug: x.slug, name: x.name, deity: x.deity, observed_on: x.observedOn,
    significance: x.significance, image_url: x.image,
  })));

  console.log("Done.");
}

main();
