import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us — Bhakti by Agentic Vani",
  description:
    "Get in touch with the Bhakti by Agentic Vani team. Questions, feedback ya suggestions — hum sunne ke liye yahaan hain.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
