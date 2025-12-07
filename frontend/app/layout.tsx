// app/layout.tsx
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ana Bárbara - Artist Portfolio",
  description: "Mexican multidisciplinary artist based in Paris",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black">
        <Sidebar />

        <main className="min-h-screen pt-6 pr-6 pb-6 pl-[calc(14rem+1.5rem)]">
          {children}
        </main>
      </body>
    </html>
  );
}