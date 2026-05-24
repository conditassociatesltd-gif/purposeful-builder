import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Austin Okechukwu — The Purposeful Builder",
  description: "Writing for boys becoming men, men becoming whole, and builders learning that structure begins in silence.",
  openGraph: {
    title: "Austin Okechukwu — The Purposeful Builder",
    description: "Essays on identity, faith, purpose, masculinity, building, and wealth.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
