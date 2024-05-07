import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PHProvider } from "@/app/providers";
import PostHogPageView from "@/app/PostHogPageView";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
  alternates: {
    canonical: '/',
  },
  title: "Klasse B kontrollspørsmål quiz - B-Lappen",
  description: "Orker ikke å lese boka? Test deg selv her med kontrollspørsmål til klasse B førerkort!",
  keywords: ["klasse B", "kontrollspørsmål", "quiz", "førerkort", "trening", "kjøretillatelse", "trafikkregler", "kjøreopplæring", "kjøretøy", "eksamen", "teoriprøve", "bilfører", "sikkerhet", "førerlisens", "trafikkskole", "bilopplæring"],
  authors: [{ name: 'B-Lappen', url: process.env.NEXT_PUBLIC_BASE_URL }],
  openGraph: {
    type: 'website',
    locale: 'no_NO',
    siteName: 'B-Lappen',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    title: 'Klasse B kontrollspørsmål quiz - B-Lappen',
    description: 'Orker ikke å lese boka? Test deg selv her med kontrollspørsmål til klasse B førerkort!',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klasse B kontrollspørsmål quiz - B-Lappen',
    description: 'Orker ikke å lese boka? Test deg selv her med kontrollspørsmål til klasse B førerkort!',
    site: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <PHProvider>
      <body className={inter.className}>
      <PostHogPageView />
      {children}
      </body>
    </PHProvider>
    </html>
  );
}
