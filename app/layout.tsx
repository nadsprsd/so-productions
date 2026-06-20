import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { PageTransition } from "@/components/ui/PageTransition";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://soproductions.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "So Productions | Premium Sound & Event Production", template: "%s | So Productions" },
  description: "So Productions delivers world-class sound engineering, music production, DJ services, stage systems, and live event audio across South Africa.",
  keywords: ["sound production","event production","sound engineering","DJ services","music production","stage sound","South Africa","Johannesburg","Cape Town"],
  openGraph: {
    type: "website", locale: "en_ZA", url: siteUrl, siteName: "So Productions",
    title: "So Productions | Premium Sound & Event Production",
    description: "World-class sound engineering, music production, DJ services, and live event audio.",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "So Productions" }],
  },
  twitter: { card: "summary_large_image", title: "So Productions | Premium Sound & Event Production", description: "World-class sound engineering and event production.", images: ["/images/og-default.jpg"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
