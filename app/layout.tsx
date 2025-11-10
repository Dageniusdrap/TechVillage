import "./globals.css";
import type { ReactNode } from "react";
import Script from "next/script";
import VoiceAgent from "@/components/VoiceAgent";
import HeaderNav from "@/components/HeaderNav";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "TechVillage — Smart Living in Uganda",
    template: "%s — TechVillage",
  },
  description: "Uganda real estate: Entebbe Lakeside, Arua West Nile, Central Uganda — modern homes, secure communities.",
  openGraph: {
    title: "TechVillage — Smart Living in Uganda",
    description: "Uganda real estate: Entebbe Lakeside, Arua West Nile, Central Uganda — modern homes, secure communities.",
    type: "website",
    url: "/",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "TechVillage" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechVillage — Smart Living in Batam",
    description: "Modern smart homes with premium amenities and seamless community living.",
    images: ["/opengraph-image"],
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`min-h-dvh bg-white text-slate-900 antialiased font-sans`}>
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur">
          <div className="section py-4 flex items-center justify-between">
            <a href="/" className="text-lg font-semibold hover:opacity-80">TechVillage</a>
            <HeaderNav />
          
          </div>
        </header>
        {children}
        {/* Optional Voice Agent widget (Vapi) */}
        {/* Will render only if NEXT_PUBLIC_VAPI_PUBLIC_TOKEN is set */}
        {/* @ts-expect-error Server Component importing Client Component via dynamic string is okay when compiled */}
        <VoiceAgent />
        <Script id="ld-org" type="application/ld+json" strategy="afterInteractive">{`
          {
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "TechVillage",
            "url": "${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}",
            "telephone": "+256 700 000000",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Entebbe",
              "addressCountry": "UG"
            }
          }
        `}</Script>
      </body>
    </html>
  );
}
