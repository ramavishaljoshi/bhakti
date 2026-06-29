"use client";

import * as React from "react";
import { Loader2, Send, Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { FormMessage } from "@/components/shared/form-message";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

const channels = [
  {
    icon: Mail,
    title: "Email",
    text: "hello@agenticvani.com",
  },
  {
    icon: MessageCircle,
    title: "Response time",
    text: "We usually reply within 2–3 working days.",
  },
  {
    icon: MapPin,
    title: "Made in",
    text: "India 🇮🇳, with devotion.",
  },
];

export default function ContactPage() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [sending, setSending] = React.useState(false);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!form.message.trim()) {
      setError("Please write a message.");
      return;
    }

    setSending(true);
    // No backend endpoint yet — open the user's mail client with the message
    // pre-filled so the enquiry can be sent.
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    const mailto = `mailto:hello@agenticvani.com?subject=${encodeURIComponent(
      form.subject.trim() || "Bhakti enquiry"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSending(false);
    setSuccess(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container max-w-5xl py-6 lg:py-10">
      <PageHeader
        title="Contact Us"
        description="Have a question, suggestion or blessing to share? We'd love to hear from you."
        icon={<Mail className="h-6 w-6" />}
        backHref="/"
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <form
          onSubmit={submit}
          noValidate
          className="space-y-4 rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-8"
        >
          {error && <FormMessage type="error">{error}</FormMessage>}
          {success && (
            <FormMessage type="success">
              Thank you! Your message is ready to send from your email app.
            </FormMessage>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" required>
              <Input
                value={form.name}
                onChange={set("name")}
                placeholder="Your name"
                required
              />
            </Field>
            <Field label="Email" required>
              <Input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@example.com"
                required
              />
            </Field>
          </div>

          <Field label="Subject">
            <Input
              value={form.subject}
              onChange={set("subject")}
              placeholder="What is this about?"
            />
          </Field>

          <Field label="Message" required>
            <Textarea
              value={form.message}
              onChange={set("message")}
              placeholder="Write your message…"
              rows={6}
            />
          </Field>

          <div className="pt-2">
            <Button type="submit" size="lg" disabled={sending}>
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Send Message
            </Button>
          </div>
        </form>

        <aside className="space-y-4">
          {channels.map((c) => (
            <div
              key={c.title}
              className="flex gap-4 rounded-4xl border border-border bg-card p-5 shadow-soft"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-saffron-100 text-saffron-600 dark:bg-saffron-900/30 dark:text-saffron-300">
                <c.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
