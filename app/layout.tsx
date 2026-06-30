import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileStickyCTA } from "@/components/MobileStickyCTA";
import { siteConfig } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Fixaro AC Service Company | AC Service & Repair in Bangalore",
    template: "%s | Fixaro",
  },
  description:
    "Premium AC service, repair, gas refilling and installation in Bangalore with transparent pricing, trained technicians and written warranty terms.",
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Fixaro AC Service Company | AC Service & Repair in Bangalore",
    description:
      "Premium AC service, repair, gas refilling and installation in Bangalore with transparent pricing, trained technicians and written warranty terms.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/ac-hero.svg",
        width: 1200,
        height: 630,
        alt: "Fixaro premium AC service in Bangalore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fixaro AC Service Company | AC Service & Repair in Bangalore",
    description:
      "Premium AC service, repair, gas refilling and installation in Bangalore with transparent pricing, trained technicians and written warranty terms.",
    images: ["/images/ac-hero.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${manrope.variable} h-full antialiased`}>
      <body id="top" className="flex min-h-full flex-col">
        <Header />
        <main className="mobile-safe-bottom flex-1 md:pb-0">{children}</main>
        <Footer />
        <MobileStickyCTA />
      </body>
    </html>
  );
}
