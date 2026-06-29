import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { MantraLibrary } from "@/components/mantras/mantra-library";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata = buildMetadata({
  title: "Mantra Library — Sacred Hindu Mantras with Meaning",
  description:
    "Explore Hindu mantras with meaning, pronunciation and benefits — Om Namah Shivaya, Hanuman Chalisa, Gayatri Mantra & more. Har deity aur intention ke liye mantra.",
  path: "/mantras",
  keywords: [
    "hindu mantras",
    "mantra library",
    "mantra meaning",
    "om namah shivaya",
    "gayatri mantra",
    "powerful mantras",
  ],
});

export default function MantrasPage() {
  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Mantras", path: "/mantras" },
        ])}
      />
      <PageHeader
        title="Mantra Library"
        description="Sacred sounds for every deity and intention. Explore meanings, pronunciation and benefits."
        icon={<BookOpen className="h-6 w-6" />}
      />
      <MantraLibrary />
    </div>
  );
}
