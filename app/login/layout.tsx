import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Log In",
  description: "Log in to Bhakti by Agentic Vani to sync your jap progress and favourites.",
  path: "/login",
  noindex: true,
});

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
