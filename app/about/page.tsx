import {
  Heart,
  Sparkles,
  BookOpen,
  Landmark,
  Bot,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";

export const metadata = { title: "About — Bhakti" };

const offerings = [
  {
    icon: BookOpen,
    title: "Mantras & Chalisa",
    text: "A growing library of mantras, chalisas and the Bhagavad Gita — with meaning, transliteration and audio guidance.",
  },
  {
    icon: Landmark,
    title: "Temples & Festivals",
    text: "Discover sacred temples across India and the stories behind the festivals we celebrate.",
  },
  {
    icon: Sparkles,
    title: "Daily Practice",
    text: "A Jap counter, intentions, daily Panchang and gentle reminders to keep your sadhana alive.",
  },
  {
    icon: Bot,
    title: "AI Guru",
    text: "Ask questions and receive grounded guidance drawn from scripture — available in multiple languages.",
  },
];

export default function AboutPage() {
  return (
    <div className="container py-6 lg:py-10">
      <PageHeader
        title="About Bhakti"
        description="A modern spiritual companion, crafted with devotion by Agentic Vani."
        icon={<Heart className="h-6 w-6" />}
        backHref="/"
      />

      <div className="space-y-10">
        <section className="rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <h2 className="font-display text-xl font-bold tracking-tight">
            Our mission
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Bhakti brings the timeless wisdom of Sanatana Dharma into everyday
            life. We believe spiritual practice should feel calm, accessible and
            personal — whether you have five minutes before sunrise or an hour
            for deep contemplation. Our goal is to help you build a steady,
            joyful relationship with the divine.
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-bold tracking-tight sm:text-2xl">
            What you&apos;ll find here
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {offerings.map((o) => (
              <div
                key={o.title}
                className="flex gap-4 rounded-4xl border border-border bg-card p-5 shadow-soft"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-saffron-100 text-saffron-600 dark:bg-saffron-900/30 dark:text-saffron-300">
                  <o.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display font-semibold">{o.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{o.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
            <Users className="h-5 w-5 text-saffron-500" />
            Crafted by Agentic Vani
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Bhakti is built by a small team that cares deeply about both
            tradition and craft. We work closely with practitioners to keep the
            content authentic and the experience respectful. Have a suggestion,
            correction or blessing to share? We&apos;d love to hear from you.
          </p>
        </section>
      </div>
    </div>
  );
}
