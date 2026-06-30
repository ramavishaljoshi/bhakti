import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Create Account",
  description: "Create a free Bhakti by Agentic Vani account to save your jap progress, streak and favourites.",
  path: "/register",
  noindex: true,
});

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
