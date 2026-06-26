import { Suspense } from "react";
import { CircleDot } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { JapCounterSection } from "@/components/jap/jap-counter-section";

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
