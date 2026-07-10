import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import BucketCounter from "@/components/kids-jaap/bucket-counter";
import { FaqSection } from "@/components/shared/faq-section";
import { JsonLd } from "@/components/shared/json-ld";
import {
  buildMetadata,
  breadcrumbSchema,
  howToSchema,
  absoluteUrl,
  SITE_NAME,
  SITE_URL,
  ORG_ID,
} from "@/lib/seo";

const PATH = "/kids-naam-jaap-counter";

// Serif display font used for the big playful headings, exposed to the ported
// stylesheet as --font-cormorant.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------

export const metadata: Metadata = buildMetadata({
  title: "Kids Naam Jaap Counter — Cute 108 Naam Bhakti Bucket Game",
  description:
    "A free kids-only Naam Jaap counter where children fill a cute bhakti bucket with flowers, stars, makhan or lotus rewards as they chant 108 names. Simple mantras, big buttons, no login — private by default.",
  path: PATH,
  keywords: [
    "Kids Naam Jaap Counter",
    "Digital Mala for Kids",
    "Online Jaap Counter",
    "Mantra Counter for Children",
    "Free Kids Chant Counter",
    "108 Naam Jaap Counter",
    "Kids Meditation Counter",
    "Ram Naam Counter",
    "Krishna Jaap Counter",
    "Radhe Radhe Counter",
  ],
});

const FAQS = [
  {
    q: "How is this different from an adult jaap counter?",
    a: "Instead of showing a serious mala dashboard, the kids counter uses a simple story: every naam adds a blessing and 108 names fill a bhakti bucket. Big buttons, cute artwork and clear progress make it easy for young children.",
  },
  {
    q: "Which mantras are included?",
    a: "Simple one-tap options include Radhe Radhe, Hare Krishna, Ram Ram, Om Namah Shivaya and Waheguru, each shown with its Hindi spelling so parents can read along.",
  },
  {
    q: "What are the reward worlds?",
    a: "As the bucket fills, kids collect a reward world — Flower bucket, Star sky, Makhan pot, Lotus pond, Rainbow blessing or Temple bells. After every full 108 the next reward changes by surprise.",
  },
  {
    q: "Does the kids counter save data online?",
    a: "No. Completed buckets are saved only in the browser's local storage on the same device. Nothing is uploaded, there is no login, and no personal information is collected.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. Once the page has loaded it works fully offline. The gentle chime is generated on the device, so it stays fast and works anywhere.",
  },
  {
    q: "Is it safe and free for kids?",
    a: "Completely. It is 100% free, needs no sign-up and shows no ads to children. It is designed for children with a parent or guardian nearby.",
  },
];

// Structured data ------------------------------------------------------------

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Kids Naam Jaap Counter", path: PATH },
]);

const howTo = howToSchema({
  name: "How to use the Kids Naam Jaap Counter with a child",
  description: "Help a child chant a naam and fill a cute bhakti bucket to 108.",
  path: PATH,
  steps: [
    { name: "Choose a naam", text: "Pick a simple naam like Radhe Radhe, Ram Ram or Hare Krishna." },
    { name: "Explain the game", text: "Tell the child every naam adds one blessing to the bucket." },
    { name: "Tap the bucket", text: "Tap the big bucket once after each chant." },
    { name: "Fill 108", text: "At 108 the bucket is full — celebrate one full bhakti bucket." },
    { name: "Keep it happy", text: "Keep the session short and warm. Devotion should feel joyful, not forced." },
  ],
});

const webPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": absoluteUrl(PATH),
  url: absoluteUrl(PATH),
  name: "Kids Naam Jaap Counter",
  description:
    "A free, kids-only online jaap counter — tap to fill a cute bhakti bucket with 108 names and surprise reward worlds.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  breadcrumb: { "@id": `${absoluteUrl(PATH)}#breadcrumb` },
};

const softwareApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kids Naam Jaap Counter",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  url: absoluteUrl(PATH),
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  audience: {
    "@type": "Audience",
    audienceType: "Children with parent or guardian guidance",
  },
  featureList: [
    "108-count kids jaap counter",
    "Bhakti bucket filling animation",
    "Krishna inspired child-friendly artwork",
    "Simple mantra choices",
    "Sound and chime feedback",
    "Local-only saved completed buckets",
  ],
  publisher: { "@id": ORG_ID },
  description:
    "A free kids-only Naam Jaap counter where children fill a cute bhakti bucket with flowers, stars, makhan or lotus rewards as they chant 108 names.",
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function KidsNaamJaapCounterPage() {
  return (
    <div className={cormorant.variable}>
      <JsonLd data={[breadcrumb, howTo, webPage, softwareApp]} />

      {/* The interactive "Fill the Bhakti Bucket" game */}
      <div className="px-2 pt-3 sm:px-4">
        <BucketCounter />
      </div>

      {/* SEO / helpful content for parents */}
      <section className="container py-12" aria-labelledby="kids-seo-title">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-saffron-600">
            Free kids spiritual tool
          </p>
          <h2
            id="kids-seo-title"
            className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Kids Naam Jaap Counter with a cute 108-name bucket game
          </h2>
          <p className="mt-3 text-muted-foreground">
            Most jaap counters are designed for adults. This one is made for
            children: easy words, big buttons, a cute devotional world, and a
            simple idea that makes sense to a child. Say one naam, add one
            blessing. At 108, the bucket is full.
          </p>

          <h3 className="mt-8 text-lg font-bold">
            Why a kids counter needs a different design
          </h3>
          <p className="mt-2 text-muted-foreground">
            Children do not need a heavy dashboard with stats first. They need a
            clear story, friendly feedback, and a visible reward. The bucket
            makes 108 feel concrete: empty at the start, slowly filling with
            flowers, stars, makhan or lotus blessings.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { h: "Simple story", p: "Every naam fills the bhakti bucket. The child sees progress without reading complex numbers." },
              { h: "Parent guided", p: "Parents can read the mantra line and the child taps after saying one naam." },
              { h: "Private by default", p: "Completed buckets save only on the same device in browser local storage." },
            ].map((c) => (
              <article key={c.h} className="rounded-2xl border bg-card p-5 shadow-sm">
                <h4 className="font-bold">{c.h}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{c.p}</p>
              </article>
            ))}
          </div>

          <h3 className="mt-8 text-lg font-bold">How to use with a child</h3>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
            <li>Choose a simple naam like Radhe Radhe, Ram Ram or Hare Krishna.</li>
            <li>Tell the child: every naam adds one blessing to the bucket.</li>
            <li>Tap the big bucket after each chant.</li>
            <li>At 108, celebrate one full bhakti bucket.</li>
            <li>Keep the session short and happy. Devotion should feel warm, not forced.</li>
          </ol>

          <div className="mt-10">
            <FaqSection
              title="Frequently Asked Questions"
              subtitle="Everything parents ask about the Kids Naam Jaap Counter."
              faqs={FAQS}
            />
          </div>

          <h3 className="mt-10 text-lg font-bold">Related tools</h3>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link href="/jap" className="rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md">
              <strong className="block">Jap Counter</strong>
              <span className="text-sm text-muted-foreground">The main 108 mala counter for everyone.</span>
            </Link>
            <Link href="/mantras" className="rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md">
              <strong className="block">Mantra Library</strong>
              <span className="text-sm text-muted-foreground">Explore mantras with meaning and audio.</span>
            </Link>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Made with love by {SITE_NAME}. A free tool for children and families —
            no login, no ads for kids, and no personal data collected.
          </p>
        </div>
      </section>
    </div>
  );
}
