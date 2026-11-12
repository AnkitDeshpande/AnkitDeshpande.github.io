import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://ankitdeshpande.vercel.app"),
  title: {
    default: "Ankit Deshpande · Backend Engineer",
    template: "%s | Ankit Deshpande",
  },
  description: "Backend engineer crafting scalable systems with Java, Spring Boot, and cloud-native architectures. 3+ years building resilient, observable backend services.",
  keywords: [
    "Backend Engineer",
    "Java",
    "Spring Boot",
    "Microservices",
    "Cloud Architecture",
    "System Design",
    "Kubernetes",
    "AWS",
    "PostgreSQL",
    "Redis",
  ],
  authors: [{ name: "Ankit Deshpande" }],
  creator: "Ankit Deshpande",
  publisher: "Ankit Deshpande",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ankitdeshpande.vercel.app",
    siteName: "Ankit Deshpande",
    title: "Ankit Deshpande · Backend Engineer",
    description: "Backend engineer crafting scalable systems with Java, Spring Boot, and cloud-native architectures.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Deshpande · Backend Engineer",
    description: "Backend engineer crafting scalable systems with Java, Spring Boot, and cloud-native architectures.",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
    { media: "(prefers-color-scheme: light)", color: "#1a1a2e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
        <link rel="dns-prefetch" href="https://github-readme-stats.vercel.app" />
        <link rel="dns-prefetch" href="https://ghchart.rshah.org" />
      </head>
      <body className="min-h-screen bg-bg text-fg">
        <Providers>
          <Header />
          <div className="pt-16 lg:pt-20">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}