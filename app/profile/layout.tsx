import { buildMetadata } from "@/lib/seo";

// Covers /profile and /profile/edit — private, signed-in only, kept out of search.
export const metadata = buildMetadata({
  title: "Your Profile",
  description: "Manage your Bhakti profile, spiritual stats and preferences.",
  path: "/profile",
  noindex: true,
});

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
