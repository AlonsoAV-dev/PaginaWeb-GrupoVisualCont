// app/layout.js
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

/** @type {import('next').Metadata} */
export const metadata = {
  metadataBase: new URL("https://www.softwarecontableerp.com/"),
  title: {
    default: "Software Contable Visual",
    template: "%s | Visual",
  },
  description:
    "Software Contable ERP Visual: administra contabilidad, facturación electrónica, sistema de planillas, tesorería e informes SUNAT. Automatiza y escala tu empresa.",
  applicationName: "Visual",
  generator: "Next.js",
  keywords: [
    "ERP Perú",
    "software contable",
    "facturación electrónica",
    "planillas",
    "SUNAT",
    "tesorería",
    "Visual ERP",
  ],
  authors: [{ name: "Visual" }],
  creator: "Visual",
  publisher: "Visual",
  alternates: {
    canonical: "https://www.softwarecontableerp.com/",
    languages: {
      "es-PE": "https://www.softwarecontableerp.com/",
    },
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Visual",
    title: "Visual - Sistema",
    description:
      "ERP con módulos de contabilidad, facturación, planillas y tesorería. Cumple con SUNAT y automatiza todos tus procesos.",
    images: [
      {
        url: "/images/logos/LogVBlancoRelleno.svg",
        width: 1200,
        height: 630,
        alt: "Suite Visual ERP",
      },
    ],
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Contable Visual", 
    description:
      "Software Contable ERP VisualCont: administra contabilidad, informes SUNAT, tesorería y más. ¡Prueba gratis!",
    images: ["/images/logos/LogVBlancoRelleno.svg"],
  },
  icons: {
    icon: [
      { url: "/images/logos/LogVBlancoRelleno.svg", type: "image/svg+xml" },
      { url: "/images/logos/LogVBlancoRelleno.svg", type: "image/svg+xml" },
      { url: "/images/logos/LogVBlancoRelleno.svg" },
    ],
  },
  category: "software",
  referrer: "origin-when-cross-origin",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" }
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={outfit.variable}>
      <body className={outfit.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
