import { Suspense } from "react";
import { CircleDot } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { JapCounterSection } from "@/components/jap/jap-counter-section";
import { buildMetadata } from "@/lib/seo";

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

export default function JapPage() {
  return (
    <div className="container py-6 lg:py-10">
      <PageHeader
        title="Digital Jap Counter"
        description="Count your chants mindfully. Your progress is saved automatically and works offline."
        icon={<CircleDot className="h-6 w-6" />}
      />
      <Suspense fallback={null}>
        <JapCounterSection />
      </Suspense>
    </div>
  );
}
