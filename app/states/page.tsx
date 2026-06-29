import Link from "next/link";
import { MapPin, Landmark } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { getAllStates, getTemplesByState } from "@/lib/data/temples";
import { states as stateMeta } from "@/lib/data/misc";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata = buildMetadata({
  title: "Temples by State — Explore Sacred Sites Across India",
  description:
    "Find Hindu temples state by state — Uttarakhand, Tamil Nadu, Gujarat, Maharashtra & more. Apne rajya ke pramukh mandir, unke devta aur darshan ki jaankari.",
  path: "/states",
  keywords: [
    "temples by state",
    "temples in india by state",
    "uttarakhand temples",
    "tamil nadu temples",
    "gujarat temples",
  ],
});

// Pick a representative image: the curated state image if available, else the
// first temple's image from that state.
function stateImage(name: string): string {
  const meta = stateMeta.find((s) => s.name === name);
  if (meta) return meta.image;
  return getTemplesByState(name)[0]?.image ?? "/assets/temple-1.jpg";
}

export default function StatesPage() {
  const allStates = getAllStates();
  return (
    <div className="container py-6 lg:py-10">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "States", path: "/states" },
        ])}
      />
      <PageHeader
        title="Temples by State"
        description="Explore India's sacred temples region by region — from the Himalayas to the southern coasts."
        icon={<MapPin className="h-6 w-6" />}
      />

      <p className="-mt-2 mb-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        India ke har rajya ki apni pavitra parampara aur prasiddh mandir hain.
        Apna state chuniye aur wahan ke pramukh temples, unke devta aur darshan
        ki jaankari ek hi jagah par paaiye.
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {allStates.map((s) => (
          <Link
            key={s.slug}
            href={`/states/${s.slug}`}
            className="group relative overflow-hidden rounded-3xl border border-border shadow-soft transition-shadow hover:shadow-soft-lg"
          >
            <div className="relative aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stateImage(s.name)}
                alt={`Temples in ${s.name}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="font-display font-bold text-white">{s.name}</p>
              <p className="flex items-center gap-1 text-xs text-white/85">
                <Landmark className="h-3 w-3" />
                {s.count} {s.count === 1 ? "temple" : "temples"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
