import { Target } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { IntentionCard } from "@/components/cards/intention-card";
import { Disclaimer } from "@/components/shared/disclaimer";
import { intentions, INTENTION_DISCLAIMER } from "@/lib/data/intentions";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata = buildMetadata({
  title: "Mantras by Intention — Peace, Health, Success & More",
  description:
    "Find mantras for what you seek — peace, health, prosperity, protection, focus and gratitude. Apni need batao aur uske liye sujhaaye gaye mantra paao.",
  path: "/intentions",
  keywords: [
    "mantras for peace",
    "mantra for success",
    "mantra for health",
    "mantra for protection",
    "mantra for prosperity",
  ],
});

export default function IntentionsPage() {
  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Intentions", path: "/intentions" },
        ])}
      />
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
