import { ScrollText } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The terms for using Bhakti by Agentic Vani. Please read these terms before using the app.",
  path: "/terms",
});

const sections = [
  {
    title: "Acceptance of terms",
    body: [
      "By accessing or using Bhakti by Agentic Vani (the “app”), you agree to be bound by these Terms of Service. If you do not agree, please do not use the app.",
    ],
  },
  {
    title: "Using the app",
    body: [
      "You may use Bhakti for personal, non-commercial spiritual practice.",
      "You agree not to misuse the app, attempt to disrupt it, or access it in ways not permitted by these terms or applicable law.",
      "Some features require an account. You are responsible for keeping your login details secure and for activity under your account.",
    ],
  },
  {
    title: "Content & accuracy",
    body: [
      "Mantras, scriptures, Panchang timings, festival dates and other content are provided for devotional and informational purposes.",
      "While we strive for accuracy, we cannot guarantee that all content or computed timings are error-free, and they should not replace authoritative religious or astrological guidance.",
      "AI Guru responses are generated automatically and may be incomplete or imperfect; please use your own judgement.",
    ],
  },
  {
    title: "Your content",
    body: [
      "You retain ownership of the journal entries, intentions and other content you create.",
      "You grant us the limited permission needed to store and display this content back to you as part of providing the service.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      "The Bhakti name, logo, design and original content are owned by Agentic Vani and protected by applicable laws.",
      "You may not copy, distribute or create derivative works from the app without our permission.",
    ],
  },
  {
    title: "Disclaimer & liability",
    body: [
      "The app is provided “as is” without warranties of any kind.",
      "To the extent permitted by law, Agentic Vani is not liable for any indirect or consequential loss arising from your use of the app.",
    ],
  },
  {
    title: "Changes to these terms",
    body: [
      "We may update these terms from time to time. Continued use of the app after changes take effect means you accept the revised terms.",
    ],
  },
  {
    title: "Contact",
    body: [
      "Questions about these terms? Please reach out through our Contact page.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="container py-6 lg:py-10">
      <PageHeader
        title="Terms of Service"
        description="The terms under which you may use Bhakti by Agentic Vani."
        icon={<ScrollText className="h-6 w-6" />}
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
