import { CircleDot } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { JapCounter } from "@/components/jap/jap-counter";
import { mantras, getMantraBySlug } from "@/lib/data/mantras";

export default function JapPage({
  searchParams,
}: {
  searchParams: { mantra?: string };
}) {
  const mantra = searchParams.mantra
    ? getMantraBySlug(searchParams.mantra)
    : mantras[0];

  return (
    <div className="container py-6 lg:py-10">
      <PageHeader
        title="Digital Jap Counter"
        description="Count your chants mindfully. Your progress is saved automatically and works offline."
        icon={<CircleDot className="h-6 w-6" />}
      />
      <JapCounter mantraName={mantra?.name ?? "Om Namah Shivaya"} />
    </div>
  );
}
