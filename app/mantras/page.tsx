import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { MantraLibrary } from "@/components/mantras/mantra-library";

export const metadata = { title: "Mantra Library — Bhakti" };

export default function MantrasPage() {
  return (
    <div className="container py-6 lg:py-10">
      <PageHeader
        title="Mantra Library"
        description="Sacred sounds for every deity and intention. Explore meanings, pronunciation and benefits."
        icon={<BookOpen className="h-6 w-6" />}
      />
      <MantraLibrary />
    </div>
  );
}
