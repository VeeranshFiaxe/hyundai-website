import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/data";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const title = "New Hyundai Cars, Test Drives & Authorised Service in Mumbai | Modi Hyundai";
const description =
  "Compare new Hyundai cars, variants, colours and prices at Modi Hyundai. Book a test drive, request a transparent quote or schedule authorised Hyundai service across Mumbai, Thane, Vasai, Virar and Wada.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Modi Hyundai",
  },
  description,
  applicationName: "Modi Hyundai",
  keywords: [
    "Modi Hyundai",
    "Hyundai dealer Mumbai",
    "Hyundai showroom Mumbai",
    "Hyundai test drive",
    "Hyundai service Mumbai",
    "Hyundai Creta price",
    "Hyundai Venue",
    "Hyundai Alcazar",
    "Hyundai Exter",
    "authorised Hyundai dealer Thane",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: "Modi Hyundai",
    title,
    description,
    url: SITE_URL,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${sora.variable}`}>
      <body className="min-h-screen antialiased">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
