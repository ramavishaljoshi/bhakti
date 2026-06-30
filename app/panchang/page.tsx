import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";
import { computePanchang, DEFAULT_LOCATION } from "@/lib/panchang";

// Panchang values change with the day — recompute hourly so the page always
// reflects "today" for the default reference location.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Today's Panchang — Tithi, Nakshatra, Rahu Kaal & Muhurat | Bhakti",
  description:
    "Today's Hindu Panchang for New Delhi: Tithi, Nakshatra, Rahu Kaal, sunrise and sunset timings. Updated daily with simple explanations of each element.",
  alternates: { canonical: "/panchang" },
};

const FAQ = [
  {
    q: "What is Panchang?",
    a: "Panchang is the traditional Hindu calendar that records the five limbs (panch-ang) of a day — Tithi (lunar day), Vaar (weekday), Nakshatra (lunar mansion), Yoga and Karana. It is used to choose auspicious timings (muhurat) for pujas, festivals and important life events.",
  },
  {
    q: "What is Tithi?",
    a: "A Tithi is a lunar day — the time the Moon takes to move 12° away from the Sun. There are 30 tithis in a lunar month, split into the bright fortnight (Shukla Paksha) and the dark fortnight (Krishna Paksha).",
  },
  {
    q: "What is Nakshatra?",
    a: "Nakshatra is the lunar mansion the Moon occupies. The zodiac is divided into 27 nakshatras, each governing different qualities used in astrology and in choosing auspicious moments.",
  },
  {
    q: "What is Rahu Kaal and why is it important?",
    a: "Rahu Kaal is an inauspicious period of roughly 90 minutes each day, traditionally avoided for starting new or important work. It falls in a different segment of daytime depending on the weekday.",
  },
];

function formatToday(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export default function PanchangPage() {
  const now = new Date();
  const items = computePanchang(now);
  const today = formatToday(now);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="container py-6 lg:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHeader
        title="Today's Panchang"
        description={`${today} · ${DEFAULT_LOCATION.label}`}
        icon={<CalendarDays className="h-6 w-6" />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <div
            key={p.label}
            className="flex items-center gap-4 rounded-4xl border border-border bg-card p-5 shadow-soft"
          >
            <span
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                p.color
              )}
            >
              <Icon name={p.icon} className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {p.label}
              </p>
              <p className="truncate text-lg font-semibold leading-tight">
                {p.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-12 max-w-2xl space-y-8">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight">
            What is Panchang?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Panchang (Sanskrit <em>pancha-anga</em>, &ldquo;five limbs&rdquo;) is
            the traditional Hindu almanac. It tracks the five elements of each
            day — Tithi, Vaar, Nakshatra, Yoga and Karana — along with sunrise,
            sunset and inauspicious periods like Rahu Kaal. Devotees consult it
            to find the most auspicious timings (muhurat) for prayers,
            ceremonies and new beginnings. The values shown above are calculated
            for {DEFAULT_LOCATION.label} and update each day.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <dl className="mt-4 space-y-5">
            {FAQ.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold">{f.q}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
