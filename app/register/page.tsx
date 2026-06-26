"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AuthShell, Field } from "@/components/auth/auth-shell";
import { FormMessage } from "@/components/shared/form-message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/use-auth";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [sankalp, setSankalp] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [confirmEmail, setConfirmEmail] = React.useState<string | null>(null);

  const validate = (): string | null => {
    if (!name.trim()) return "Please enter your full name.";
    if (!email.trim()) return "Please enter your email address.";
    if (!EMAIL_RE.test(email.trim())) return "Please enter a valid email address.";
    if (!password) return "Please enter a password.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirm) return "Passwords do not match.";
    return null;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setLoading(true);
    const res = await register({ name, email, password, sankalp });
    if (!res.ok) {
      setError(res.error);
      setLoading(false);
      return;
    }
    if (res.needsConfirmation) {
      setConfirmEmail(email.trim().toLowerCase());
      setLoading(false);
      return;
    }
    // Register → Login: send them to sign in with their new credentials.
    router.push("/login?registered=1");
  };

  if (confirmEmail) {
    return (
      <AuthShell
        title="Check your inbox 📿"
        subtitle="One last step to begin your journey."
        footer={
          <>
            Already confirmed?{" "}
            <Link
              href="/login"
              className="font-semibold text-saffron-600 hover:text-saffron-700 dark:text-saffron-400"
            >
              Sign in
            </Link>
          </>
        }
      >
        <div className="space-y-4 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-saffron-100 text-3xl dark:bg-saffron-900/30">
            🪔
          </span>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent a verification link to{" "}
            <span className="font-semibold text-foreground">{confirmEmail}</span>
            . Click it to activate your account, then sign in to start your
            sadhana.
          </p>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Begin your sadhana ✨"
      subtitle="Create your free account and set your spiritual intention."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-saffron-600 hover:text-saffron-700 dark:text-saffron-400"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} noValidate className="space-y-4">
        {error && <FormMessage type="error">{error}</FormMessage>}

        <Field label="Full name">
          <Input
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Field>

        <Field label="Email">
          <Input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>

        <Field label="Password">
          <Input
            type="password"
            autoComplete="new-password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>

        <Field label="Confirm password">
          <Input
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </Field>

        <Field label="Your sankalp (intention) — optional">
          <Input
            placeholder="e.g. Chant 108 times daily with devotion"
            value={sankalp}
            onChange={(e) => setSankalp(e.target.value)}
          />
        </Field>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Create Account
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By continuing you agree to walk this path mindfully. 🪔
        </p>
      </form>
    </AuthShell>
  );
}
