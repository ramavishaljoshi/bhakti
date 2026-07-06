import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AppShell } from "@/components/layout/app-shell";
import { JsonLd } from "@/components/shared/json-ld";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  DEFAULT_OG_IMAGE,
  LOCALE,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";

const poppins = Poppins({
  subsets: ["latin"],
  // Only the weights actually used in the UI (400/500/600/700). Dropping the
  // unused 300 & 800 cuts two woff2 files off the critical request path.
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "A premium, mindful Indian spirituality app. Digital jap counter, mantra library, gods, temples, festivals, Bhagavad Gita and your daily spiritual routine — beautifully designed.",
  applicationName: SITE_NAME,
  keywords: [
    "bhakti",
    "mantra",
    "jap counter",
    "online mantra jap",
    "hanuman chalisa",
    "meditation",
    "spirituality",
    "hindu",
    "temples in india",
    "hindu festivals",
    "bhagavad gita",
    "aarti",
  ],
  authors: [{ name: "Agentic Vani" }],
  creator: "Agentic Vani",
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
    types: { "application/rss+xml": `${SITE_URL}/rss.xml` },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      // favicon.ico first for legacy crawlers; Google prefers a square PNG that
      // is a multiple of 48px, so favicon-48x48.png is declared explicitly.
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#FF7A4D" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Your daily spiritual companion — jap counter, mantras, gods, temples, festivals and the Bhagavad Gita. Roz ki bhakti, ek shaant aur premium experience ke saath.",
    locale: LOCALE,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Your daily spiritual companion — jap counter, mantras, gods, temples, festivals and the Bhagavad Gita.",
    images: [DEFAULT_OG_IMAGE],
  },
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
        {/* Apply saved accessibility preferences before paint (no flash). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=JSON.parse(localStorage.getItem('bhakti:a11y')||'{}');var m={text:['data-a11y-text','large'],contrast:['data-a11y-contrast','high'],font:['data-a11y-font','dyslexic'],motion:['data-a11y-motion','reduce']};var r=document.documentElement;for(var k in m){if(s[k])r.setAttribute(m[k][0],m[k][1]);}}catch(e){}})();",
          }}
        />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
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
