// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import BackgroundEffects from "@/components/effects/BackgroundEffects";
import CustomCursor from "@/components/effects/CustomCursor";
import BootSequence from "@/components/effects/BootSequence";
import OpenToWorkBanner from "@/components/ui/open-to-work-banner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SITE_NAME, SITE_URL, CONTACT_DETAILS } from "@/constants";

const inter     = Inter          ({ subsets: ["latin"], variable: "--font-sans" });
const playfair  = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", style: ["normal","italic"] });
const jetbrains = JetBrains_Mono ({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rajat Lakhina — Senior Consultant · iOS Platform · ThoughtWorks",
    template: "%s | Rajat Lakhina",
  },
  description:
    "Senior Consultant at ThoughtWorks with 10+ years architecting and shipping high-performance iOS platforms. Tech Lead, AI-First development advocate. Open to Tech Lead and Staff+ roles.",
  keywords: [
    "iOS Tech Lead", "Mobile Platform Lead", "Senior Consultant", "ThoughtWorks",
    "Swift", "SwiftUI", "AI-First Development", "Mobile Architecture", "Rajat Lakhina",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    title: "Rajat Lakhina — Senior Consultant · iOS",
    description: "Senior Consultant at ThoughtWorks with 10+ years building high-performance iOS platforms.",
    url: SITE_URL,
    siteName: "Rajat Lakhina",
    images: [{ url: "/rajat-profile.webp", width: 800, height: 800, alt: "Rajat Lakhina" }],
    locale: "en_US",
    type: "website",
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/apple-touch-icon.svg" },
  manifest: `${SITE_URL}/manifest.json`,
};

const jsonLd = {
  "@context": "https://schema.org", "@type": "Person",
  name: "Rajat S. Lakhina", url: SITE_URL,
  sameAs: [CONTACT_DETAILS.linkedin, CONTACT_DETAILS.medium],
  jobTitle: "Senior Consultant",
  worksFor: { "@type": "Organization", name: "ThoughtWorks" },
  email: CONTACT_DETAILS.email,
  address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressRegion: "HR", addressCountry: "IN" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${inter.className} antialiased cursor-none`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <BootSequence />
          <CustomCursor />
          <BackgroundEffects />
          <OpenToWorkBanner />
          <Header />
          <main className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
