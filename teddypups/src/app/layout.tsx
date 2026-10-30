import type { Metadata } from "next";
import { Figtree, Fraunces, Shantell_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PawTrailCanvas } from "@/components/PawTrailCanvas";
import { PupJourney } from "@/components/PupJourney";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { site } from "@/lib/site";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const shantell = Shantell_Sans({
  subsets: ["latin"],
  variable: "--font-shantell",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.fullName} — Premium teacup puppies in Dubai`,
    template: `%s | ${site.fullName}`,
  },
  description:
    "Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${fraunces.variable} ${shantell.variable}`}
    >
      <body
        className="page-glow min-h-screen antialiased"
        style={
          {
            "--font-sans": "var(--font-figtree)",
            "--font-plush": "var(--font-fraunces)",
            "--font-scrawl": "var(--font-shantell)",
          } as React.CSSProperties
        }
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cocoa focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="relative outline-none">
          <div id="content" tabIndex={-1}>
            {children}
          </div>
        </main>
        <Footer />
        <WhatsAppFab />
        <PupJourney />
        <PawTrailCanvas />
      </body>
    </html>
  );
}
