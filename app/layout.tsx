// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import BackgroundEffects from "@/components/effects/BackgroundEffects";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL, SOCIAL_LINKS } from "@/constants";

const inter    = Inter          ({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", style: ["normal", "italic"] });
const jetbrains = JetBrains_Mono ({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:  { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: ["Rajat Lakhina","Mobile Architect","iOS Developer","SwiftUI","ThoughtWorks","Portfolio"],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: "website", locale: "en_US", url: SITE_URL,
    title: SITE_TITLE, description: SITE_DESCRIPTION, siteName: SITE_NAME,
    images: [{ url: `${SITE_URL}/rajat-profile.webp`, width: 400, height: 400, alt: SITE_NAME }],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/apple-touch-icon.svg" },
  manifest: `${SITE_URL}/manifest.json`,
};

const jsonLd = {
  "@context": "https://schema.org", "@type": "Person",
  name: "Rajat S. Lakhina", url: SITE_URL,
  sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.medium],
  jobTitle: "Mobile Development Professional",
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
      <body className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${inter.className} antialiased`}>
        <BackgroundEffects />
        <Header />
        <main className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
