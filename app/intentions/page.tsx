import { Target } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { IntentionCard } from "@/components/cards/intention-card";
import { Disclaimer } from "@/components/shared/disclaimer";
import { intentions, INTENTION_DISCLAIMER } from "@/lib/data/intentions";

export const metadata = { title: "Mantras by Intention — Bhakti" };

export default function IntentionsPage() {
  return (
    <div className="container py-6 lg:py-10">
      <PageHeader
        title="Mantras by Intention"
        description="Tell us what you seek, and discover mantras traditionally associated with it."
        icon={<Target className="h-6 w-6" />}
      />

      <div className="mb-6">
        <Disclaimer text={INTENTION_DISCLAIMER} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {intentions.map((intention, i) => (
          <IntentionCard key={intention.id} intention={intention} index={i} />
        ))}
      </div>
    </div>
  );
}
