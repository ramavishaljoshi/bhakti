import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Bhakti by Agentic Vani collects, uses and protects your data. Aapki privacy aur jankari hamare liye important hai.",
  path: "/privacy",
});

const sections = [
  {
    title: "Information we collect",
    body: [
      "Account details you provide when you register — such as your name, email address and profile preferences.",
      "Activity within the app, such as your Jap counts, favourites, intentions and journal entries, so we can save your progress.",
      "Basic technical data (device type, browser and approximate location) used to keep the app secure and working well.",
    ],
  },
  {
    title: "How we use your information",
    body: [
      "To provide and personalise your spiritual practice — remembering your mantras, progress and preferences.",
      "To show locally relevant content such as the daily Panchang, sunrise and sunset timings.",
      "To improve Bhakti, fix problems and keep your account secure.",
    ],
  },
  {
    title: "Your data, your choice",
    body: [
      "Your journal entries and personal reflections are private to your account.",
      "You can view and update your profile at any time, and request deletion of your account and associated data.",
      "We never sell your personal information.",
    ],
  },
  {
    title: "Third-party services",
    body: [
      "We use trusted providers (for example, for authentication and hosting) that process data on our behalf under their own security commitments.",
      "Some features, such as the AI Guru, may send your questions to a language model provider to generate a response. We do not share your identity with these requests.",
    ],
  },
  {
    title: "Data security & retention",
    body: [
      "We apply reasonable technical and organisational measures to protect your information.",
      "We keep your data only for as long as your account is active or as needed to provide the service and meet legal obligations.",
    ],
  },
  {
    title: "Contact us",
    body: [
      "If you have any questions about this policy or your data, please reach out to us through the app. We'll respond as soon as we can.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="container py-6 lg:py-10">
      <PageHeader
        title="Privacy Policy"
        description="How Bhakti by Agentic Vani collects, uses and protects your information."
        icon={<ShieldCheck className="h-6 w-6" />}
        backHref="/"
      />

      <p className="mb-8 text-sm text-muted-foreground">
        Last updated: 26 June 2026
      </p>

      <div className="space-y-6">
        {sections.map((s) => (
          <section
            key={s.title}
            className="rounded-4xl border border-border bg-card p-6 shadow-soft sm:p-8"
          >
            <h2 className="font-display text-lg font-bold tracking-tight sm:text-xl">
              {s.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {s.body.map((line, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-400" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
