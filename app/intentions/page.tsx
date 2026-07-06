import { Target } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { IntentionCard } from "@/components/cards/intention-card";
import { Disclaimer } from "@/components/shared/disclaimer";
import { QuickAnswer } from "@/components/shared/quick-answer";
import { FaqSection } from "@/components/shared/faq-section";
import { RelatedLinks } from "@/components/shared/related-links";
import { intentions, INTENTION_DISCLAIMER } from "@/lib/data/intentions";
import {
  buildMetadata,
  breadcrumbSchema,
  itemListSchema,
  speakableSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata = buildMetadata({
  title: "Find Mantras by Purpose — Peace, Health, Success & Protection",
  description:
    "Find the right mantra for your goal — mantras for peace, health, prosperity, protection, career, job, education, marriage and more. Apni need chuniye aur uske liye sujhaaye gaye mantra, meaning aur vidhi ke saath paaiye.",
  path: "/intentions",
  keywords: [
    "mantras by purpose",
    "find mantra for my goal",
    "mantras for peace",
    "mantra for success",
    "mantra for health",
    "mantra for protection",
    "mantra for prosperity",
    "mantra for job",
    "mantra for marriage",
  ],
});

// Hub-level FAQ — answers the "how do I pick / use a mantra" meta-questions and
// feeds FAQPage schema + People-Also-Ask.
const HUB_FAQS = [
  {
    q: "How do I choose the right mantra for my goal?",
    a: "Start with your purpose — peace, health, protection, prosperity, a job, marriage and so on. Each purpose below lists the mantras traditionally chanted for it, along with the deity, meaning and how to chant. Pick the one that resonates and stay with it.",
  },
  {
    q: "Can I chant more than one mantra?",
    a: "Yes, but for depth it is usually best to keep one primary mantra and chant it consistently. Many devotees add a short second prayer (for example Om Gam Ganapataye Namaha to remove obstacles) alongside their main mantra.",
  },
  {
    q: "How many times should I chant a mantra?",
    a: "The traditional unit is one mala — 108 repetitions. Even 5–10 minutes of unhurried chanting is beneficial. Consistency each day matters more than the count.",
  },
  {
    q: "Do I need initiation (diksha) to chant these mantras?",
    a: "The mantras listed here are widely and publicly chanted and need no formal initiation. Some tantric or guru-specific mantras traditionally require diksha, but the devotional mantras below are open to everyone.",
  },
  {
    q: "Are these mantras guaranteed to work?",
    a: "No. These recommendations are based on traditional spiritual practice and are meant for personal devotion, focus and comfort — not as guarantees of any material outcome.",
  },
];

export default function IntentionsPage() {
  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Mantras by Purpose", path: "/intentions" },
          ]),
          itemListSchema(
            intentions.map((i) => ({
              name: i.seoTitle ?? `Mantras for ${i.label}`,
              path: `/intentions/${i.id}`,
            })),
            { name: "Mantras by Purpose" }
          ),
          speakableSchema("/intentions"),
        ]}
      />
      <PageHeader
        title="Find Mantras by Purpose"
        description="Mantras for Peace, Health, Success, Protection & More"
        icon={<Target className="h-6 w-6" />}
      />

      <QuickAnswer label="In short">
        Choose a mantra by what you are seeking. Below are {intentions.length}{" "}
        purposes — from <strong>peace</strong>, <strong>health</strong> and{" "}
        <strong>protection</strong> to <strong>prosperity</strong>,{" "}
        <strong>a job</strong>, <strong>marriage</strong> and{" "}
        <strong>spiritual growth</strong> — each with the mantras traditionally
        chanted for it, their meaning and how to chant.
      </QuickAnswer>

      <div className="mt-6 max-w-3xl space-y-3 text-muted-foreground">
        <p>
          In the Hindu tradition, different mantras are turned to for different
          needs. A mantra for peace calms the mind; a mantra for protection
          invokes Hanuman or Durga; a mantra for prosperity calls on Lakshmi.
          The steady repetition (jap) of the right sacred sound focuses the mind
          and connects the practice to your intention.
        </p>
        <p>
          Select a purpose below to see its recommended mantras, the deity
          associated with it, the best time to chant, and answers to the
          questions people most often ask.
        </p>
      </div>

      <h2 className="mb-4 mt-10 font-display text-xl font-bold tracking-tight sm:text-2xl">
        Browse mantras by purpose
      </h2>
      <div className="mb-6">
        <Disclaimer text={INTENTION_DISCLAIMER} />
      </div>

      <nav aria-label="Mantra purposes">
        <ul className="grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-3 lg:grid-cols-4">
          {intentions.map((intention, i) => (
            <li key={intention.id}>
              <IntentionCard intention={intention} index={i} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-14">
        <FaqSection
          title="Frequently Asked Questions"
          subtitle="Choosing and chanting a mantra for your intention"
          faqs={HUB_FAQS}
        />
      </div>

      <RelatedLinks
        heading="Explore more"
        groups={[
          {
            title: "Browse",
            items: [
              { label: "All Mantras", href: "/mantras" },
              { label: "Gods & Goddesses", href: "/gods" },
              { label: "Temples", href: "/temples" },
              { label: "Festivals", href: "/festivals" },
            ],
          },
          {
            title: "Read & Practice",
            items: [
              { label: "Articles", href: "/articles" },
              { label: "Vrat & Fasting", href: "/vrat" },
              { label: "Bhagavad Gita", href: "/gita" },
              { label: "Jap Counter", href: "/jap" },
            ],
          },
          {
            title: "Ask",
            items: [{ label: "Ask the AI Guru", href: "/ai-guru" }],
          },
        ]}
      />
    </div>
  );
}
