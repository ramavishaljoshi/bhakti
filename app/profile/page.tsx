"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Loader2,
  Save,
  Eye,
  EyeOff,
  UserRound,
  KeyRound,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import { FormMessage } from "@/components/shared/form-message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/use-auth";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

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

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="ml-0.5 text-destructive">*</span>}
        </span>
        {hint && (
          <span className="text-xs text-muted-foreground">{hint}</span>
        )}
      </span>
      {children}
    </label>
  );
}

function SectionCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-8">
      <div className="flex items-start gap-3.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-saffron-100 text-saffron-600 dark:bg-saffron-900/30 dark:text-saffron-300">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-lg font-bold tracking-tight">
            {title}
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, ready, updateAccount } = useAuth();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);

  // Restrict the profile page to authenticated users.
  React.useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  // Populate the form once the user has loaded.
  React.useEffect(() => {
    if (user && !hydrated) {
      setName(user.name);
      setEmail(user.email);
      setHydrated(true);
    }
  }, [user, hydrated]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim()) return setError("Please enter your name.");
    if (!email.trim()) return setError("Please enter your email address.");
    if (!EMAIL_RE.test(email.trim()))
      return setError("Please enter a valid email address.");
    if (password && password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (password && !confirmPassword)
      return setError("Please confirm your new password.");
    if (password && password !== confirmPassword)
      return setError("Passwords do not match.");

    setSaving(true);
    const res = await updateAccount({
      name,
      // Only send email if it actually changed (an email change triggers a
      // confirmation flow on Supabase).
      email: user && email.trim().toLowerCase() !== user.email ? email : undefined,
      password: password || undefined,
    });
    setSaving(false);

    if (!res.ok) return setError(res.error);

    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setSuccess(
      res.needsConfirmation
        ? "Saved. Check your new email inbox to confirm the address change."
        : "Your changes have been saved."
    );
  };

  if (!ready || !user) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-saffron-500" />
      </div>
    );
  }

  return (
    <div
      className="mx-auto px-6 py-8 lg:py-12"
      style={{ maxWidth: "75rem", width: "100%" }}
    >
      {/* Identity header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative mb-6 overflow-hidden rounded-4xl bg-warm-gradient p-6 text-white shadow-glow sm:p-7"
      >
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute -right-10 -top-12 h-48 w-48 rounded-full bg-white/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
        </div>
        <div className="relative flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white/20 text-xl font-bold backdrop-blur ring-2 ring-white/40">
            {initials(name || user.name)}
          </div>
          <div className="min-w-0">
            <h1 className="truncate font-display text-2xl font-bold sm:text-3xl">
              {name || user.name}
            </h1>
            <p className="truncate text-sm text-white/80">{user.email}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-white/70">
              <CalendarDays className="h-3.5 w-3.5" />
              Seeker since {fmtDate(user.createdAt)}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        onSubmit={submit}
        noValidate
        className="space-y-6"
      >
        {error && <FormMessage type="error">{error}</FormMessage>}
        {success && <FormMessage type="success">{success}</FormMessage>}

        <SectionCard
          icon={UserRound}
          title="Profile information"
          description="Your name and email used for login and notifications."
        >
          <div className="space-y-4">
            <Field label="Name" required>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                required
              />
            </Field>

            <Field label="Email address" required>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </Field>
          </div>
        </SectionCard>

        <SectionCard
          icon={KeyRound}
          title="Change password"
          description="Leave blank to keep your current password."
        >
          <div className="space-y-4">
            <Field label="New password" hint="At least 6 characters">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </Field>

            <Field label="Confirm new password" required={Boolean(password)}>
              <Input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </Field>
          </div>
        </SectionCard>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => router.push("/")}
            disabled={saving}
            className="sm:order-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="lg"
            disabled={saving}
            className="sm:order-2"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : success ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save changes
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
