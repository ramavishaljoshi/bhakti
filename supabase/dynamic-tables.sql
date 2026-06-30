-- ============================================================================
-- Bhakti — Dynamic content tables (SIMPLE / paste-ready, panchang-style)
-- FULLY RE-RUNNABLE: create if not exists + on conflict do nothing.
-- Supabase SQL Editor me poora paste karke "Run" dabao — kitni bhi baar, error nahi.
-- (panchang table aap pehle hi bana chuke ho — yahan dobara nahi hai.)
-- ============================================================================

-- ====================== GODS / DEITIES ======================
create table if not exists public.gods (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  title text,
  introduction text,
  story text,
  image_url text,
  color text,
  created_at timestamptz not null default now()
);
alter table public.gods enable row level security;
drop policy if exists "gods read" on public.gods;
create policy "gods read" on public.gods for select to anon, authenticated using (true);
drop policy if exists "gods insert" on public.gods;
create policy "gods insert" on public.gods for insert to anon, authenticated with check (true);
insert into public.gods (slug, name, title, introduction, image_url, color) values
  ('shiva','Lord Shiva','The Destroyer','Shiva creates, protects and transforms the universe.','/assets/shiva-artwork.jpg','#6366f1'),
  ('ganesha','Lord Ganesha','Remover of Obstacles','The elephant-headed god of beginnings and wisdom.','/assets/festivals/ganesh.jpg','#f59e0b')
on conflict (slug) do nothing;

-- ====================== MANTRAS ======================
create table if not exists public.mantras (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  sanskrit text,
  transliteration text,
  deity text,
  category text,
  meaning text,
  benefits text[] default '{}',
  image_url text,
  audio_url text,
  created_at timestamptz not null default now()
);
alter table public.mantras enable row level security;
drop policy if exists "mantras read" on public.mantras;
create policy "mantras read" on public.mantras for select to anon, authenticated using (true);
drop policy if exists "mantras insert" on public.mantras;
create policy "mantras insert" on public.mantras for insert to anon, authenticated with check (true);
insert into public.mantras (slug, name, sanskrit, transliteration, deity, category, meaning, image_url) values
  ('om-namah-shivaya','Om Namah Shivaya','ॐ नमः शिवाय','Om Namah Shivaya','Shiva','Shaiva','I bow to Lord Shiva.','/assets/mantras/hanuman-chalisa.jpg'),
  ('hanuman-chalisa','Hanuman Chalisa','हनुमान चालीसा','Hanuman Chalisa','Hanuman','Devotional','Forty verses praising Lord Hanuman.','/assets/mantras/hanuman-chalisa.jpg')
on conflict (slug) do nothing;

-- ====================== FESTIVALS ======================
create table if not exists public.festivals (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  date_label text,
  iso_date date,
  story text,
  why_celebrate text,
  image_url text,
  created_at timestamptz not null default now()
);
alter table public.festivals enable row level security;
drop policy if exists "festivals read" on public.festivals;
create policy "festivals read" on public.festivals for select to anon, authenticated using (true);
drop policy if exists "festivals insert" on public.festivals;
create policy "festivals insert" on public.festivals for insert to anon, authenticated with check (true);
insert into public.festivals (slug, name, date_label, iso_date, why_celebrate, image_url) values
  ('diwali','Diwali','October / November','2026-11-08','Triumph of light over darkness.','/assets/festivals/diwali.jpg'),
  ('holi','Holi','March','2026-03-04','Arrival of spring and victory of good over evil.','/assets/festivals/holi.jpg')
on conflict (slug) do nothing;

-- ====================== VRATS (fasting) ======================
create table if not exists public.vrats (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  deity text,
  observed_on text,
  significance text,
  image_url text,
  created_at timestamptz not null default now()
);
alter table public.vrats enable row level security;
drop policy if exists "vrats read" on public.vrats;
create policy "vrats read" on public.vrats for select to anon, authenticated using (true);
drop policy if exists "vrats insert" on public.vrats;
create policy "vrats insert" on public.vrats for insert to anon, authenticated with check (true);
insert into public.vrats (slug, name, deity, observed_on, significance, image_url) values
  ('ekadashi-vrat','Ekadashi Vrat','Lord Vishnu','11th lunar day, twice a month','A purifying fast devoted to Lord Vishnu.','/assets/temples/tirupati-balaji.jpg'),
  ('somvar-vrat','Somvar Vrat','Lord Shiva','Every Monday','Monday fast for Lord Shiva.','/assets/shiva-artwork.jpg')
on conflict (slug) do nothing;

-- ====================== TEMPLES ======================
create table if not exists public.temples (
  id bigint generated always as identity primary key,
  slug text unique not null,
  name text not null,
  deity text,
  state text,
  city text,
  history text,
  image_url text,
  created_at timestamptz not null default now()
);
alter table public.temples enable row level security;
drop policy if exists "temples read" on public.temples;
create policy "temples read" on public.temples for select to anon, authenticated using (true);
drop policy if exists "temples insert" on public.temples;
create policy "temples insert" on public.temples for insert to anon, authenticated with check (true);
insert into public.temples (slug, name, deity, state, city, image_url) values
  ('kedarnath-temple','Kedarnath Temple','Shiva','Uttarakhand','Kedarnath','/assets/temples/kedarnath-temple.jpg'),
  ('tirupati-balaji','Tirupati Balaji','Vishnu','Andhra Pradesh','Tirupati','/assets/temples/tirupati-balaji.jpg')
on conflict (slug) do nothing;

-- ====================== QUOTES (daily) ======================
create table if not exists public.quotes (
  id bigint generated always as identity primary key,
  text text unique not null,
  source text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.quotes enable row level security;
drop policy if exists "quotes read" on public.quotes;
create policy "quotes read" on public.quotes for select to anon, authenticated using (true);
drop policy if exists "quotes insert" on public.quotes;
create policy "quotes insert" on public.quotes for insert to anon, authenticated with check (true);
insert into public.quotes (text, source) values
  ('Set thy heart upon thy work, but never on its reward.','Bhagavad Gita 2.47'),
  ('You have the right to work, but never to the fruit of work.','Bhagavad Gita 2.47')
on conflict (text) do nothing;

-- ====================== DAILY CONTENT (home rotation) ======================
create table if not exists public.daily_content (
  id bigint generated always as identity primary key,
  date date unique not null,
  quote text,
  source text,
  mantra_slug text,
  created_at timestamptz not null default now()
);
alter table public.daily_content enable row level security;
drop policy if exists "daily read" on public.daily_content;
create policy "daily read" on public.daily_content for select to anon, authenticated using (true);
drop policy if exists "daily insert" on public.daily_content;
create policy "daily insert" on public.daily_content for insert to anon, authenticated with check (true);
insert into public.daily_content (date, quote, source, mantra_slug) values
  ('2026-06-30','Set thy heart upon thy work, but never on its reward.','Bhagavad Gita 2.47','om-namah-shivaya')
on conflict (date) do nothing;

-- ====================== NOTIFICATIONS (broadcast) ======================
create table if not exists public.notifications (
  id bigint generated always as identity primary key,
  title text not null,
  body text,
  type text default 'info',
  link text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.notifications enable row level security;
drop policy if exists "notifications read" on public.notifications;
create policy "notifications read" on public.notifications for select to anon, authenticated using (true);
drop policy if exists "notifications insert" on public.notifications;
create policy "notifications insert" on public.notifications for insert to anon, authenticated with check (true);
insert into public.notifications (title, body, type)
select 'Welcome to Bhakti','Aapka aadhyatmik saathi taiyaar hai.','info'
where not exists (select 1 from public.notifications where title = 'Welcome to Bhakti');

-- ====================== APP SETTINGS (admin key/value) ======================
create table if not exists public.app_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);
alter table public.app_settings enable row level security;
drop policy if exists "settings read" on public.app_settings;
create policy "settings read" on public.app_settings for select to anon, authenticated using (true);
drop policy if exists "settings insert" on public.app_settings;
create policy "settings insert" on public.app_settings for insert to anon, authenticated with check (true);
insert into public.app_settings (key, value) values
  ('daily_jap_goal','108'),
  ('panchang_location','New Delhi')
on conflict (key) do nothing;

-- ====================== BOOKMARKS (per-user, login required) ======================
create table if not exists public.bookmarks (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  entity_type text not null,
  entity_id text not null,
  created_at timestamptz not null default now(),
  unique (user_id, entity_type, entity_id)
);
alter table public.bookmarks enable row level security;
drop policy if exists "bookmarks owner" on public.bookmarks;
create policy "bookmarks owner" on public.bookmarks for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ====================== JAAP SESSIONS (per-user, login required) ======================
create table if not exists public.jaap_sessions (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  mantra text,
  deity text,
  count int not null default 0,
  duration_sec int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.jaap_sessions enable row level security;
drop policy if exists "jaap owner" on public.jaap_sessions;
create policy "jaap owner" on public.jaap_sessions for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
