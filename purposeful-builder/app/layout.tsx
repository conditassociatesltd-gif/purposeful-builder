import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  style: ["normal", "italic"],
});

const BASE_URL = "https://austinokechukwu.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Austin Okechukwu — The Purposeful Builder",
    template: "%s — Austin Okechukwu",
  },
  description:
    "Writing for boys becoming men, men becoming whole, and builders learning that structure begins in silence.",
  keywords: [
    "Austin Okechukwu",
    "The Purposeful Builder",
    "masculinity",
    "identity",
    "faith",
    "purpose",
    "building",
    "wealth",
    "discipline",
    "essays",
    "Condit Associates",
  ],
  authors: [{ name: "Austin Okechukwu", url: BASE_URL }],
  creator: "Austin Okechukwu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "The Purposeful Builder",
    title: "Austin Okechukwu — The Purposeful Builder",
    description:
      "Essays on identity, faith, purpose, masculinity, building, and wealth.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Austin Okechukwu — The Purposeful Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Austin Okechukwu — The Purposeful Builder",
    description:
      "Essays on identity, faith, purpose, masculinity, building, and wealth.",
    images: ["/images/og-default.jpg"],
    creator: "@arc__austin",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: BASE_URL,
  },
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
