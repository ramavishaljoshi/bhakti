-- Bhakti — make the `panchang` table hold ONE row per day so the app can show
-- today's Panchang (and store each day's values). Run in Supabase → SQL Editor.
--
-- After this, the app writes today's computed Panchang into a row keyed by
-- `day` (India date), and reads it back on every visit — so the homepage card
-- and /panchang always show today's data, from the database.
--
-- This script is safe to re-run.

-- 0. Remove any leftover test rows (e.g. from the insert-permission check).
delete from public.panchang
where tithi like '\_\_%' escape '\';

-- 1. Add the day column (nullable first so existing rows don't fail).
alter table public.panchang add column if not exists day date;

-- 2. Backfill existing rows from their created_at (India time) so the old
--    rows keep their real date instead of being treated as "today".
update public.panchang
set day = (created_at at time zone 'Asia/Kolkata')::date
where day is null;

-- 3. De-duplicate: keep only the most recent row per day (required before the
--    unique index below, in case a day accidentally has more than one row).
delete from public.panchang a
using public.panchang b
where a.day = b.day
  and a.created_at < b.created_at;

-- 4. Make it required going forward, default to today's date.
alter table public.panchang alter column day set default current_date;
alter table public.panchang alter column day set not null;

-- 5. One row per day (enables clean "today" lookups + prevents duplicates).
create unique index if not exists panchang_day_key on public.panchang (day);
