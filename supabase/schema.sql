-- Bhakti — optional profiles table
-- Run this in your Supabase project: Dashboard → SQL Editor → New query → Run.
-- The app works without it (name/sankalp are also stored in auth metadata),
-- but this gives you a real, queryable profiles table with Row Level Security.

-- 1. Table -------------------------------------------------------------------
create table if not exists public.profiles (
  id              uuid primary key references auth.users (id) on delete cascade,
  name            text,
  sankalp         text,
  phone           text,
  city            text,
  favorite_deity  text,
  bio             text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Add the editable profile columns for anyone who created an earlier version.
alter table public.profiles add column if not exists phone text;
alter table public.profiles add column if not exists city text;
alter table public.profiles add column if not exists favorite_deity text;
alter table public.profiles add column if not exists bio text;
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

-- 2. Row Level Security ------------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by their owner" on public.profiles;
create policy "Profiles are viewable by their owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 3. Auto-create a profile row whenever a new auth user signs up -------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, sankalp)
  values (
    new.id,
    new.raw_user_meta_data ->> 'name',
    new.raw_user_meta_data ->> 'sankalp'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 4. Favourites --------------------------------------------------------------
create table if not exists public.favorites (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  item_type   text not null,
  item_id     text not null,
  title       text not null,
  href        text not null,
  created_at  timestamptz not null default now(),
  unique (user_id, item_type, item_id)
);

alter table public.favorites enable row level security;

drop policy if exists "Favorites are owner-only" on public.favorites;
create policy "Favorites are owner-only"
  on public.favorites for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 5. Jap logs (one row per user per day) -------------------------------------
create table if not exists public.jap_logs (
  user_id     uuid not null references auth.users (id) on delete cascade,
  day         date not null default current_date,
  count       integer not null default 0 check (count >= 0),
  mantra      text,
  updated_at  timestamptz not null default now(),
  primary key (user_id, day)
);

alter table public.jap_logs enable row level security;

drop policy if exists "Jap logs are owner-only" on public.jap_logs;
create policy "Jap logs are owner-only"
  on public.jap_logs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Atomic increment of today's jap count for the signed-in user.
create or replace function public.bump_jap(p_delta integer, p_mantra text default null)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.jap_logs (user_id, day, count, mantra, updated_at)
  values (auth.uid(), current_date, greatest(p_delta, 0), p_mantra, now())
  on conflict (user_id, day) do update
    set count = jap_logs.count + greatest(p_delta, 0),
        mantra = coalesce(excluded.mantra, jap_logs.mantra),
        updated_at = now();
end;
$$;
