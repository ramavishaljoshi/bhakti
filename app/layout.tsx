import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AppShell } from "@/components/layout/app-shell";

const poppins = Poppins({
  subsets: ["latin"],
  // Only the weights actually used in the UI (400/500/600/700). Dropping the
  // unused 300 & 800 cuts two woff2 files off the critical request path.
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhakti by Agentic Vani — Your Spiritual Companion",
  description:
    "A premium, mindful Indian spirituality app. Digital jap counter, mantra library, gods, temples, festivals, Bhagavad Gita and your daily spiritual routine — beautifully designed.",
  keywords: ["bhakti", "mantra", "jap", "meditation", "spirituality", "hindu", "temple"],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF8F2" },
    { media: "(prefers-color-scheme: dark)", color: "#171310" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
