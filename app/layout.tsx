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
import { SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/constants";

const inter     = Inter          ({ subsets: ["latin"], variable: "--font-sans" });
const playfair  = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", style: ["normal","italic"] });
const jetbrains = JetBrains_Mono ({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rajat Lakhina — Engineering Leader · Mobile Platforms · ThoughtWorks",
    template: "%s | Rajat Lakhina",
  },
  description:
    "Senior engineering leader with 10+ years building and scaling mobile teams at scale. iOS platform architect, AI-First development advocate, ThoughtWorks Senior Consultant. Open to engineering management and Staff+ roles.",
  keywords: [
    "Engineering Manager",
    "Mobile Platform Lead",
    "iOS Engineering Manager",
    "ThoughtWorks",
    "Swift",
    "SwiftUI",
    "AI-First Development",
    "Engineering Leadership",
    "Mobile Architecture",
    "Rajat Lakhina",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    title: "Rajat Lakhina — Engineering Leader",
    description:
      "Senior engineering leader with 10+ years building high-performing mobile teams. Open to EM and Staff+ roles.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
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
  sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.medium],
  jobTitle: "Engineering Leader",
  worksFor: { "@type": "Organization", name: "ThoughtWorks" },
  email: SOCIAL_LINKS.email, telephone: SOCIAL_LINKS.phone,
  address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressRegion: "HR", addressCountry: "IN" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${inter.className} antialiased cursor-none`}>
        <BootSequence />
        <CustomCursor />
        <BackgroundEffects />
        <Header />
        <main className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
