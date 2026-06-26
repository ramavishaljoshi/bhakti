"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, UserCog } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { FormMessage } from "@/components/shared/form-message";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/use-auth";
import { useProfile, emptyProfile, type Profile } from "@/lib/use-profile";

const PHONE_RE = /^[+]?[\d\s-]{7,15}$/;

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}

export default function ProfileEditPage() {
  const router = useRouter();
  const { user, ready: authReady } = useAuth();
  const { profile, ready: profileReady, save } = useProfile();

  const [form, setForm] = React.useState<Profile>(emptyProfile);
  const [hydrated, setHydrated] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  // Restrict to authenticated users.
  React.useEffect(() => {
    if (authReady && !user) router.replace("/login");
  }, [authReady, user, router]);

  // Populate the form once the profile has loaded.
  React.useEffect(() => {
    if (profileReady && profile && !hydrated) {
      setForm({ ...emptyProfile, ...profile });
      setHydrated(true);
    }
  }, [profileReady, profile, hydrated]);

  const set = (key: keyof Profile) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (form.phone.trim() && !PHONE_RE.test(form.phone.trim())) {
      setError("Please enter a valid phone number.");
      return;
    }

    setSaving(true);
    const res = await save(form);
    setSaving(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }
    setSuccess(true);
    // Return to the profile dashboard after showing the success note.
    setTimeout(() => router.push("/profile"), 900);
  };

  if (!authReady || !user || !profileReady) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-saffron-500" />
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-6 lg:py-10">
      <PageHeader
        title="Edit Profile"
        description="Update your details to personalise your spiritual journey."
        backHref="/profile"
        icon={<UserCog className="h-6 w-6" />}
      />

      <form
        onSubmit={submit}
        noValidate
        className="space-y-4 rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-8"
      >
        {error && <FormMessage type="error">{error}</FormMessage>}
        {success && (
          <FormMessage type="success">
            Profile saved successfully! Redirecting…
          </FormMessage>
        )}

        <Field label="Full name" required>
          <Input
            value={form.name}
            onChange={set("name")}
            placeholder="Your name"
            required
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="City">
            <Input
              value={form.city}
              onChange={set("city")}
              placeholder="e.g. Varanasi"
            />
          </Field>
          <Field label="Phone">
            <Input
              type="tel"
              value={form.phone}
              onChange={set("phone")}
              placeholder="e.g. +91 98765 43210"
            />
          </Field>
        </div>

        <Field label="Favourite deity">
          <Input
            value={form.favorite_deity}
            onChange={set("favorite_deity")}
            placeholder="e.g. Lord Shiva"
          />
        </Field>

        <Field label="Sankalp (intention)">
          <Input
            value={form.sankalp}
            onChange={set("sankalp")}
            placeholder="e.g. Chant 108 times daily with devotion"
          />
        </Field>

        <Field label="About you">
          <Textarea
            value={form.bio}
            onChange={set("bio")}
            placeholder="Share a little about your spiritual path…"
          />
        </Field>

        <div className="flex gap-3 pt-2">
          <Button type="submit" size="lg" disabled={saving || success}>
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {!saving && <Save className="h-4 w-4" />}
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => router.push("/profile")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
