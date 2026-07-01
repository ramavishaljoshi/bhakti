-- Bhakti — drop UNUSED tables from the live project (ref ygpcbvmrcvbgjrhvvggf).
--
-- ⚠️ DESTRUCTIVE: this permanently deletes these tables AND their data.
--    Take a backup first (Dashboard → Database → Backups, or export the rows)
--    if there is any chance you'll want the seeded content back.
--
-- KEPT (used by the app): profiles, favorites, jap_logs, panchang
-- DROPPED (below): unused content seeds + leftover CMS tables.
--
-- HOW TO RUN: Dashboard → SQL Editor → New query → paste ALL → Run.
-- `cascade` also removes any dependent objects (policies, indexes, FKs).

-- Content tables the app does NOT read from the DB (it reads lib/data/* instead)
drop table if exists public.gods       cascade;
drop table if exists public.mantras    cascade;
drop table if exists public.temples    cascade;
drop table if exists public.festivals  cascade;
drop table if exists public.vrats      cascade;
drop table if exists public.quotes     cascade;

-- Leftover CMS tables no code touches
drop table if exists public.daily_content  cascade;
drop table if exists public.bookmarks      cascade;
drop table if exists public.jaap_sessions  cascade;
drop table if exists public.notifications  cascade;
drop table if exists public.app_settings   cascade;
