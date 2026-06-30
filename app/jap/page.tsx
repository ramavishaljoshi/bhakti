import { Suspense } from "react";
import { CircleDot } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { JapCounterSection } from "@/components/jap/jap-counter-section";
import { FaqSection } from "@/components/shared/faq-section";
import { JsonLd } from "@/components/shared/json-ld";
import { buildMetadata, howToSchema } from "@/lib/seo";

const JAP_FAQS = [
  {
    q: "What is jap (jaap)?",
    a: "Jap (ya jaap) ka matlab hai kisi mantra ya ishvar ke naam ko shraddha ke saath baar-baar dohrana. Traditionally ise mala par 108 baar kiya jaata hai. Maana jaata hai ki regular jap se mann shaant aur ekagra hota hai.",
  },
  {
    q: "How does the online jap counter work?",
    a: "Bas screen par tap kijiye aur har chant ke saath count badhta jaata hai — koi physical mala ki zaroorat nahi. Aapka daily count aur streak apne aap save hote hain, aur sign in karne par progress sab devices par sync rehti hai.",
  },
  {
    q: "Why is 108 considered significant?",
    a: "Hindu traditions mein 108 ko ek pavitra sankhya maana jaata hai, aur isiliye ek mala mein 108 manke (beads) hote hain. Bahut se devotees ek poori mala — yaani 108 jap — karna pasand karte hain.",
  },
  {
    q: "Is my jap count saved automatically?",
    a: "Yes. Guest ke roop mein aapka count aapke device par save rehta hai, aur sign in karne par yeh aapke account se securely sync ho jaata hai — taaki aapki streak kabhi na toote.",
  },
  {
    q: "Do I need a physical mala to use the counter?",
    a: "Bilkul nahi. The digital counter ek mala ki tarah hi kaam karta hai — kabhi bhi, kahin bhi. Agar aap physical mala use karna chahein to bhi, app aapka count rakhne mein madad karta hai.",
  },
];

export const metadata = buildMetadata({
  title: "Online Jap Counter — Free Digital Mantra Counter",
  description:
    "A free online jap counter to chant mantras mindfully. Track your daily count and streak — apne jap ko count kijiye, progress apne aap save hoti hai.",
  path: "/jap",
  keywords: [
    "online jap counter",
    "digital mantra counter",
    "jaap counter",
    "mala counter online",
    "free jap counter",
  ],
});

const HOW_TO_JAP = howToSchema({
  name: "How to do mantra jap with a jap counter",
  description:
    "Chant a mantra mindfully and keep an accurate count using the online jap counter.",
  path: "/jap",
  steps: [
    { name: "Choose a mantra", text: "Pick a mantra such as Om Namah Shivaya or the Hanuman Chalisa." },
    { name: "Sit calmly", text: "Sit in a comfortable, quiet place and take a few slow breaths to settle the mind." },
    { name: "Chant and tap", text: "Chant the mantra once and tap the counter; repeat at a steady, relaxed pace." },
    { name: "Complete a mala", text: "Continue until you reach 108 repetitions — one full mala — or your chosen goal." },
    { name: "Track your streak", text: "Your daily count and streak save automatically, so you can build a steady practice." },
  ],
});

export default function JapPage() {
  return (
    <div className="container py-6 lg:py-10">
      <JsonLd data={HOW_TO_JAP} />
      <PageHeader
        title="Digital Jap Counter"
        description="Count your chants mindfully. Your progress is saved automatically and works offline."
        icon={<CircleDot className="h-6 w-6" />}
      />
      <Suspense fallback={null}>
        <JapCounterSection />
      </Suspense>

      <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        A jap counter helps you chant mantras mindfully without losing count.
        Screen par tap kijiye, har chant gina jaata hai, aur aapki daily streak
        apne aap save hoti hai. Chahe aap Om Namah Shivaya karein ya Hanuman
        Chalisa — yeh free online jaap counter aapke saath har kadam par hai.
      </p>

      <div className="mt-10">
        <FaqSection
          subtitle="Jap, mala aur is counter ke baare mein aapke sawaal."
          faqs={JAP_FAQS}
        />
      </div>
    </div>
  );
}
