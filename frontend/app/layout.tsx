// app/layout.tsx
import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ana-barbara.com";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Ana Bárbara — Artist Portfolio",
    template: "%s — Ana Bárbara",
  },
  description: "Mexican multidisciplinary artist based in Paris",

  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      es: "/es",
      fr: "/fr",
    },
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Ana Bárbara — Artist Portfolio",
    description: "Mexican multidisciplinary artist based in Paris",
    siteName: "Ana Bárbara",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plexMono.variable}>
      <body className="antialiased bg-white text-black">
      {children}
      <Script
        defer
        src="https://annex.fuentes.it.com/script.js"
        data-website-id="0b984433-d48a-46d4-9440-b3d92063aa25"
        data-host-url="https://annex.fuentes.it.com"
        strategy="afterInteractive"
      />
      </body>
    </html>
  );
}
