// frontend/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ana Bárbara - Artist Portfolio",
  description: "Mexican multidisciplinary artist based in Paris",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}