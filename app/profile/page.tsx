"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Flame,
  Sparkles,
  Heart,
  LogOut,
  Settings,
  ChevronRight,
  Award,
  CalendarDays,
  Quote,
  Loader2,
  Pencil,
  MapPin,
  Phone,
  Sparkle,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import {
  LotusIcon,
  MalaIcon,
  DiyaIcon,
  TempleIcon,
} from "@/components/shared/spiritual-icons";
import { useAuth, type BhaktiUser } from "@/lib/use-auth";
import { useFavorites } from "@/lib/use-favorites";
import { useJap } from "@/lib/use-jap";
import { useProfile } from "@/lib/use-profile";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function fmtDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ---------- Stat tile ---------- */
function Stat({
  icon: Icon,
  value,
  label,
  tint,
  accent,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  tint: string;
  accent: string;
}) {
  return (
    <div className={`flex flex-col gap-2 rounded-3xl ${tint} p-5`}>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 ${accent}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <p className="font-display text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-secondary/40 px-4 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-saffron-100 text-saffron-600 dark:bg-saffron-900/30 dark:text-saffron-300">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="truncate text-sm font-medium">
          {value ? value : <span className="text-muted-foreground">—</span>}
        </p>
      </div>
    </div>
  );
}

/* ---------- Authenticated dashboard ---------- */
function ProfileDashboard({
  user,
  onLogout,
}: {
  user: BhaktiUser;
  onLogout: () => void;
}) {
  const { favorites } = useFavorites();
  const jap = useJap();
  const { profile } = useProfile();

  const streak = jap.streak;
  const totalJap = jap.total;
  const malaCount = Math.floor(totalJap / 108);

  const name = profile?.name || user.name;
  const sankalp = profile?.sankalp || user.sankalp;
  const profileIncomplete =
    !profile?.city && !profile?.favorite_deity && !profile?.bio && !profile?.phone;

  const achievements = [
    { icon: DiyaIcon, label: "First Diya", desc: "Complete your first jap", earned: totalJap > 0 },
    { icon: MalaIcon, label: "Mala Master", desc: "Finish 108 chants", earned: malaCount >= 1 },
    { icon: Flame, label: "7-Day Flame", desc: "7-day chanting streak", earned: streak >= 7 },
    { icon: TempleIcon, label: "Pilgrim", desc: "Save a temple", earned: favorites.some((f) => f.type === "temple") },
    { icon: Heart, label: "Devoted Heart", desc: "Save 5 favourites", earned: favorites.length >= 5 },
    { icon: Sparkles, label: "Sahasra", desc: "1,000 total chants", earned: totalJap >= 1000 },
  ];
  const earnedCount = achievements.filter((a) => a.earned).length;

  return (
    <div className="container space-y-6 py-6 lg:py-10">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-4xl bg-warm-gradient p-6 text-white shadow-glow sm:p-8"
      >
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute -right-8 -top-10 h-52 w-52 rounded-full bg-white/40 blur-3xl" />
          <LotusIcon className="absolute -bottom-6 right-6 h-40 w-40 text-white/20" />
        </div>

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-2xl font-bold backdrop-blur ring-2 ring-white/40">
              {initials(name)}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold sm:text-3xl">
                {name}
              </h1>
              <p className="text-sm text-white/80">{user.email}</p>
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-white/70">
                <CalendarDays className="h-3.5 w-3.5" />
                Seeker since {fmtDate(user.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              asChild
              variant="secondary"
              className="bg-white text-saffron-700 hover:bg-white/90"
            >
              <Link href="/profile/edit">
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
            <Button
              variant="secondary"
              className="bg-white/20 text-white backdrop-blur hover:bg-white/30"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        {sankalp && (
          <div className="relative mt-6 flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
            <Quote className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">
                My Sankalp
              </p>
              <p className="text-sm">{sankalp}</p>
            </div>
          </div>
        )}
      </motion.section>

      {/* Complete-profile prompt */}
      {profileIncomplete && (
        <Link
          href="/profile/edit"
          className="flex items-center justify-between gap-3 rounded-2xl border border-saffron-200 bg-tint-saffron px-4 py-3 text-sm transition-colors hover:brightness-[0.98] dark:border-saffron-900/40"
        >
          <span className="flex items-center gap-2 font-medium text-foreground">
            <Sparkle className="h-4 w-4 text-saffron-600" />
            Complete your profile to personalise your spiritual journey.
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-saffron-600" />
        </Link>
      )}

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat icon={Flame} value={`${streak}`} label="Day streak" tint="bg-tint-peach" accent="text-orange-500" />
        <Stat icon={Sparkles} value={totalJap.toLocaleString("en-IN")} label="Total jap" tint="bg-tint-saffron" accent="text-saffron-600" />
        <Stat icon={MalaIcon} value={`${malaCount}`} label="Malas done" tint="bg-tint-lemon" accent="text-amber-600" />
        <Stat icon={Heart} value={`${favorites.length}`} label="Favourites" tint="bg-tint-rose" accent="text-rose-500" />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Profile details */}
          <section className="rounded-4xl border border-border bg-card p-5 shadow-soft sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCircle className="h-5 w-5 text-saffron-500" />
                <h2 className="font-display text-xl font-bold tracking-tight">
                  Profile Details
                </h2>
              </div>
              <Button asChild variant="soft" size="sm">
                <Link href="/profile/edit">
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Link>
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <DetailRow icon={MapPin} label="City" value={profile?.city} />
              <DetailRow icon={Sparkle} label="Favourite Deity" value={profile?.favorite_deity} />
              <DetailRow icon={Phone} label="Phone" value={profile?.phone} />
              <DetailRow icon={UserCircle} label="Email" value={user.email} />
            </div>
            {profile?.bio && (
              <div className="mt-3 rounded-2xl bg-secondary/40 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  About
                </p>
                <p className="mt-1 text-sm">{profile.bio}</p>
              </div>
            )}
          </section>

          {/* Achievements */}
          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight">
                  Spiritual Milestones
                </h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {earnedCount} of {achievements.length} blessings earned
                </p>
              </div>
              <Award className="h-6 w-6 text-saffron-500" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-3 rounded-3xl border p-4 transition-colors ${
                    a.earned
                      ? "border-saffron-200 bg-card dark:border-saffron-900/40"
                      : "border-dashed border-border bg-secondary/40 opacity-60"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                      a.earned
                        ? "bg-saffron-100 text-saffron-600 dark:bg-saffron-900/30 dark:text-saffron-300"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <a.icon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{a.label}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {a.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Side column: favourites + settings */}
        <div className="space-y-6">
          {/* Favourites */}
          <section className="rounded-4xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold">My Favourites</h2>
              <Heart className="h-5 w-5 text-rose-500" />
            </div>
            {favorites.length === 0 ? (
              <div className="rounded-3xl bg-secondary/50 px-4 py-8 text-center">
                <LotusIcon className="mx-auto h-8 w-8 text-saffron-400" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No favourites yet. Tap the heart on any mantra to save it here.
                </p>
                <Button asChild variant="soft" size="sm" className="mt-4">
                  <Link href="/mantras">Explore mantras</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-2">
                {favorites.slice(0, 6).map((f) => (
                  <li key={`${f.type}-${f.id}`}>
                    <Link
                      href={f.href}
                      className="flex items-center justify-between gap-2 rounded-2xl px-3 py-2.5 transition-colors hover:bg-secondary"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="rounded-lg bg-saffron-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-saffron-700 dark:bg-saffron-900/30 dark:text-saffron-300">
                          {f.type}
                        </span>
                        <span className="truncate text-sm font-medium">
                          {f.title}
                        </span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Settings */}
          <section className="rounded-4xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-2">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-display text-lg font-bold">Settings</h2>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-secondary/50 px-4 py-3">
              <div>
                <p className="text-sm font-medium">Appearance</p>
                <p className="text-xs text-muted-foreground">
                  Switch light / dark theme
                </p>
              </div>
              <ThemeToggle />
            </div>
            <Button
              variant="outline"
              className="mt-3 w-full justify-between text-destructive hover:bg-destructive/10"
              onClick={onLogout}
            >
              Sign out of this device
              <LogOut className="h-4 w-4" />
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, ready, logout } = useAuth();
  const router = useRouter();

  // Restrict the profile page to authenticated users.
  React.useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-saffron-500" />
      </div>
    );
  }

  return <ProfileDashboard user={user} onLogout={logout} />;
}
