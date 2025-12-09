// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ana-barbara.com";

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
    // add an image later if you have one:
    // images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Ana Bárbara" }],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black">{children}</body>
    </html>
  );
}
