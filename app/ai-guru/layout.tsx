import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Guru — Ask Your Spiritual Questions",
  description:
    "Ask the AI Guru about mantras, gods, festivals, the Bhagavad Gita and spiritual life. Apne mann ke sawaalon ke shaant, samajhdaar jawaab paayein.",
  path: "/ai-guru",
  keywords: [
    "ai spiritual guru",
    "ask spiritual questions",
    "bhagavad gita ai",
    "hindu spirituality chat",
  ],
});

export default function AiGuruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
