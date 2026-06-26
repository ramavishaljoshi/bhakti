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

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [registered, setRegistered] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // Show a success note when arriving from registration (?registered=1).
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setRegistered(new URLSearchParams(window.location.search).has("registered"));
    }
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return setError("Please enter your email address.");
    if (!EMAIL_RE.test(email.trim()))
      return setError("Please enter a valid email address.");
    if (!password) return setError("Please enter your password.");

    setError(null);
    setLoading(true);
    const res = await login(email, password);
    if (!res.ok) {
      setError(res.error);
      setLoading(false);
      return;
    }
    router.push("/profile");
    router.refresh();
  };

  return (
    <AuthShell
      title="Welcome back 🙏"
      subtitle="Sign in to continue your spiritual journey."
      footer={
        <>
          New to Bhakti?{" "}
          <Link
            href="/register"
            className="font-semibold text-saffron-600 hover:text-saffron-700 dark:text-saffron-400"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={submit} noValidate className="space-y-4">
        {registered && !error && (
          <FormMessage type="success">
            Registration successful! Please sign in with your credentials.
          </FormMessage>
        )}
        {error && <FormMessage type="error">{error}</FormMessage>}

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
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>
    </AuthShell>
  );
}
