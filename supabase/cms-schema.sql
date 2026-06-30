-- ============================================================================
-- Bhakti by Agentic Vani — Supabase CMS / dynamic-content schema
-- Designed from the actual Next.js data models (lib/types.ts, lib/data/*).
-- Normalized, multilingual-ready, admin-CMS-ready, mobile-optimized.
--
-- Run AFTER schema.sql (which creates profiles, favorites, jap_logs, panchang).
-- Safe to re-run (idempotent: create if not exists / drop policy if exists).
-- ============================================================================

create extension if not exists "pgcrypto";   -- gen_random_uuid()
create extension if not exists "unaccent";    -- accent-insensitive search

-- ----------------------------------------------------------------------------
-- Helpers: auto updated_at + admin check
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

-- Admin gate: a user is admin if their profile row has role = 'admin'.
-- (profiles is created in schema.sql; we add the column if missing.)
alter table if exists public.profiles
  add column if not exists role text not null default 'user'
  check (role in ('user', 'editor', 'admin'));

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

-- ============================================================================
-- CONTENT TABLES (CMS-managed; currently hardcoded in lib/data/*)
-- ============================================================================

-- Deities / Gods -------------------------------------------------------------
create table if not exists public.deities (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  title         text,
  introduction  text,
  story         text,
  symbols       text[] default '{}',
  color         text,
  image_url     text,
  sort_order    int default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Mantras --------------------------------------------------------------------
create table if not exists public.mantras (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  name            text not null,
  sanskrit        text,
  transliteration text,
  deity_id        uuid references public.deities(id) on delete set null,
  category        text,
  meaning         text,
  pronunciation   text,
  benefits        text[] default '{}',
  when_to_chant   text,
  image_url       text,
  audio_url       text,
  default_count   int default 108,
  sort_order      int default 0,
  is_published    boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Temples --------------------------------------------------------------------
create table if not exists public.temples (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  deity_id      uuid references public.deities(id) on delete set null,
  state         text,
  city          text,
  history       text,
  timings       text,
  dress_code    text,
  best_time     text,
  how_to_reach  text,
  image_url     text,
  gallery       text[] default '{}',
  sort_order    int default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Festivals ------------------------------------------------------------------
create table if not exists public.festivals (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  date_label    text,                 -- "October / November"
  iso_date      date,                 -- this year's observance (for Event schema)
  story         text,
  why_celebrate text,
  puja_vidhi    text[] default '{}',
  bhajans       text[] default '{}',
  food          text[] default '{}',
  image_url     text,
  sort_order    int default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Vrats (fasting guides) -----------------------------------------------------
create table if not exists public.vrats (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  intent        text,
  deity         text,
  observed_on   text,
  excerpt       text,
  image_url     text,
  significance  text,
  vidhi         text[] default '{}',
  benefits      text[] default '{}',
  food_allowed  text[] default '{}',
  food_avoid    text[] default '{}',
  sort_order    int default 0,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Intentions -----------------------------------------------------------------
create table if not exists public.intentions (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,   -- was Intention.id (e.g. "peace")
  label         text not null,
  emoji         text,
  description   text,
  color         text,
  sort_order    int default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Authors (EEAT bylines) -----------------------------------------------------
create table if not exists public.authors (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  name          text not null,
  type          text not null default 'Person' check (type in ('Person','Organization')),
  role          text,
  bio           text,
  expertise     text[] default '{}',
  image_url     text,
  same_as       text[] default '{}',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Articles (blog) ------------------------------------------------------------
create table if not exists public.articles (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  intent        text,
  excerpt       text,
  category      text,
  read_time     text,
  intro         text,
  image_url     text,
  author_id     uuid references public.authors(id) on delete set null,
  published_at  date,
  is_published  boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Article body sections (ordered) -------------------------------------------
create table if not exists public.article_sections (
  id          uuid primary key default gen_random_uuid(),
  article_id  uuid not null references public.articles(id) on delete cascade,
  position    int not null default 0,
  heading     text,
  body        text[] default '{}'
);

-- Bhagavad Gita --------------------------------------------------------------
create table if not exists public.gita_chapters (
  number        int primary key,
  name          text not null,
  translation   text,
  summary       text,
  verses_count  int default 0
);

create table if not exists public.gita_verses (
  id              uuid primary key default gen_random_uuid(),
  chapter_number  int not null references public.gita_chapters(number) on delete cascade,
  verse_number    int not null,
  sanskrit        text,
  transliteration text,
  meaning         text,
  unique (chapter_number, verse_number)
);

-- Quotes ---------------------------------------------------------------------
create table if not exists public.quotes (
  id          uuid primary key default gen_random_uuid(),
  text        text not null,
  source      text,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Polymorphic FAQs (festivals, vrats, articles, deities …) -------------------
create table if not exists public.faqs (
  id           uuid primary key default gen_random_uuid(),
  entity_type  text not null,          -- 'festival' | 'vrat' | 'article' | 'deity'
  entity_id    uuid not null,
  position     int not null default 0,
  question     text not null,
  answer       text not null
);
create index if not exists faqs_entity_idx on public.faqs (entity_type, entity_id);

-- ============================================================================
-- RELATIONSHIPS (many-to-many junctions — normalized, no duplicate data)
-- ============================================================================
create table if not exists public.mantra_intentions (
  mantra_id     uuid references public.mantras(id) on delete cascade,
  intention_id  uuid references public.intentions(id) on delete cascade,
  primary key (mantra_id, intention_id)
);

create table if not exists public.festival_mantras (
  festival_id uuid references public.festivals(id) on delete cascade,
  mantra_id   uuid references public.mantras(id) on delete cascade,
  primary key (festival_id, mantra_id)
);

create table if not exists public.festival_deities (
  festival_id uuid references public.festivals(id) on delete cascade,
  deity_id    uuid references public.deities(id) on delete cascade,
  primary key (festival_id, deity_id)
);

create table if not exists public.temple_festivals (
  temple_id   uuid references public.temples(id) on delete cascade,
  festival_id uuid references public.festivals(id) on delete cascade,
  primary key (temple_id, festival_id)
);

create table if not exists public.deity_mantras (
  deity_id  uuid references public.deities(id) on delete cascade,
  mantra_id uuid references public.mantras(id) on delete cascade,
  primary key (deity_id, mantra_id)
);

-- ============================================================================
-- MULTILINGUAL — one row per (entity, field, locale). Falls back to base table.
-- ============================================================================
create table if not exists public.translations (
  id           uuid primary key default gen_random_uuid(),
  entity_type  text not null,          -- 'mantra' | 'festival' | ...
  entity_id    uuid not null,
  field        text not null,          -- 'name' | 'meaning' | 'story' ...
  locale       text not null,          -- 'hi' | 'en' | 'ta' ...
  value        text not null,
  unique (entity_type, entity_id, field, locale)
);
create index if not exists translations_lookup_idx
  on public.translations (entity_type, entity_id, locale);

-- ============================================================================
-- RUNTIME / DYNAMIC tables
-- ============================================================================

-- panchang: created in schema.sql (id, tithi, nakshatra, rahu_kal, sunrise,
-- sunset, created_at). Kept there; not redefined here.

-- Daily curated content (home page rotation) --------------------------------
create table if not exists public.daily_content (
  date          date primary key,
  quote_id      uuid references public.quotes(id) on delete set null,
  mantra_id     uuid references public.mantras(id) on delete set null,
  article_id    uuid references public.articles(id) on delete set null,
  gita_chapter  int,
  gita_verse    int,
  created_at    timestamptz not null default now()
);

-- Bookmarks / favorites (generalized, any entity) ---------------------------
create table if not exists public.bookmarks (
  user_id     uuid not null references auth.users(id) on delete cascade,
  entity_type text not null,           -- 'mantra' | 'temple' | 'festival' | 'vrat' ...
  entity_id   text not null,           -- slug or uuid
  created_at  timestamptz not null default now(),
  primary key (user_id, entity_type, entity_id)
);

-- Detailed jaap sessions (richer than jap_logs daily buckets) ---------------
create table if not exists public.jaap_sessions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  mantra       text,
  deity        text,
  count        int not null default 0 check (count >= 0),
  mala_size    int not null default 108,
  duration_sec int not null default 0,
  started_at   timestamptz,
  ended_at     timestamptz default now(),
  created_at   timestamptz not null default now()
);
create index if not exists jaap_sessions_user_idx on public.jaap_sessions (user_id, created_at desc);

-- Notifications (per-user or broadcast when user_id is null) -----------------
create table if not exists public.notifications (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,  -- null = broadcast
  title       text not null,
  body        text,
  type        text default 'info',     -- 'info' | 'festival' | 'reminder'
  link        text,
  is_read     boolean not null default false,
  created_at  timestamptz not null default now()
);
create index if not exists notifications_user_idx on public.notifications (user_id, created_at desc);

-- User activity log ----------------------------------------------------------
create table if not exists public.user_activity (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  action      text not null,           -- 'view' | 'chant' | 'favorite' ...
  entity_type text,
  entity_id   text,
  created_at  timestamptz not null default now()
);
create index if not exists user_activity_user_idx on public.user_activity (user_id, created_at desc);

-- App settings (key/value JSON for the admin panel) -------------------------
create table if not exists public.app_settings (
  key         text primary key,
  value       jsonb not null default '{}',
  updated_at  timestamptz not null default now()
);

-- ============================================================================
-- INDEXES (slug lookups + published filters for fast mobile reads)
-- ============================================================================
create index if not exists mantras_published_idx   on public.mantras (is_published, sort_order);
create index if not exists temples_state_idx        on public.temples (state);
create index if not exists festivals_isodate_idx    on public.festivals (iso_date);
create index if not exists articles_published_idx   on public.articles (is_published, published_at desc);

-- ============================================================================
-- updated_at TRIGGERS
-- ============================================================================
do $$
declare t text;
begin
  foreach t in array array[
    'deities','mantras','temples','festivals','vrats','intentions',
    'authors','articles'
  ]
  loop
    execute format(
      'drop trigger if exists set_updated_at on public.%I;
       create trigger set_updated_at before update on public.%I
       for each row execute function public.set_updated_at();', t, t);
  end loop;
end $$;

-- ============================================================================
-- ROW LEVEL SECURITY
--   • Content + relationships + i18n  → public READ, admin WRITE
--   • User data (bookmarks, sessions, activity, notifications) → owner only
--   • app_settings → public read, admin write
-- ============================================================================
do $$
declare t text;
begin
  -- Public-readable, admin-writable content tables
  foreach t in array array[
    'deities','mantras','temples','festivals','vrats','intentions','authors',
    'articles','article_sections','gita_chapters','gita_verses','quotes','faqs',
    'mantra_intentions','festival_mantras','festival_deities','temple_festivals',
    'deity_mantras','translations','daily_content','app_settings'
  ]
  loop
    execute format('alter table public.%I enable row level security;', t);

    execute format('drop policy if exists "%I public read" on public.%I;', t, t);
    execute format(
      'create policy "%I public read" on public.%I for select using (true);', t, t);

    execute format('drop policy if exists "%I admin write" on public.%I;', t, t);
    execute format(
      'create policy "%I admin write" on public.%I for all
         using (public.is_admin()) with check (public.is_admin());', t, t);
  end loop;
end $$;

-- Owner-only user data
alter table public.bookmarks      enable row level security;
alter table public.jaap_sessions  enable row level security;
alter table public.user_activity  enable row level security;
alter table public.notifications  enable row level security;

drop policy if exists "bookmarks owner" on public.bookmarks;
create policy "bookmarks owner" on public.bookmarks for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "jaap owner" on public.jaap_sessions;
create policy "jaap owner" on public.jaap_sessions for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "activity owner" on public.user_activity;
create policy "activity owner" on public.user_activity for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Notifications: read your own + broadcasts; admin can write any.
drop policy if exists "notif read" on public.notifications;
create policy "notif read" on public.notifications for select
  using (user_id is null or auth.uid() = user_id);
drop policy if exists "notif owner update" on public.notifications;
create policy "notif owner update" on public.notifications for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "notif admin write" on public.notifications;
create policy "notif admin write" on public.notifications for all
  using (public.is_admin()) with check (public.is_admin());

-- ============================================================================
-- SEED (minimal; bulk content is migrated from lib/data/* — see notes)
-- ============================================================================
insert into public.app_settings (key, value) values
  ('default_locale', '"en"'),
  ('panchang_location', '{"lat":28.6139,"lng":77.209,"label":"New Delhi"}'),
  ('daily_jap_goal', '108')
on conflict (key) do nothing;

insert into public.quotes (text, source) values
  ('Set thy heart upon thy work, but never on its reward.', 'Bhagavad Gita 2.47')
on conflict do nothing;
