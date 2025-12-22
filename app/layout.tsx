// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import DisableRightClick from "@/components/system/DisableRightClick";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Rajat Lakhina", "Mobile Architect", "iOS Developer", "SwiftUI",
    "Mobile Development Professional", "ThoughtWorks", "Next.js", "Portfolio"
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.png`, // Create and add an OG image to /public
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },

  // Icons
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },

  // Manifest
  manifest: `${SITE_URL}/site.webmanifest`,
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rajat S. Lakhina",
  "url": SITE_URL,
  "sameAs": [
    "https://www.linkedin.com/in/rajat-s-lakhina-952785107/",
    "https://medium.com/@er.rajatlakhina"
  ],
  "jobTitle": "Mobile Development Professional",
  "worksFor": {
    "@type": "Organization",
    "name": "ThoughtWorks"
  },
  "email": "er.rajatlakhina@gmail.com",
  "telephone": "+91-9499109991",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Gurugram",
    "addressRegion": "HR",
    "addressCountry": "IN"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DisableRightClick />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}