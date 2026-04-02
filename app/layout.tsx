import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Together Transformed — Are You Both Ready?",
  description:
    "Find out exactly what's keeping you both stuck — and what it would take to change everything in 12 weeks. Take the free 2-minute couple's assessment.",
  openGraph: {
    title: "Together Transformed — Are You Both Ready?",
    description:
      "Find out exactly what's keeping you both stuck — and what it would take to change everything in 12 weeks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${dmSans.variable} font-body antialiased bg-white text-body`}
      >
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7DE3VZS4ND"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){window.dataLayer.push(arguments);}
            window.gtag('js', new Date());
            window.gtag('config', 'G-7DE3VZS4ND');
          `}
        </Script>
      </body>
    </html>
  );
}
