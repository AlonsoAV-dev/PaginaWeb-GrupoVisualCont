// app/layout.js
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import FontAwesomeConfig from "./fontawesome";
import ChatBotBar from "@/shared/chatBotBar";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

/** @type {import('next').Metadata} */
export const metadata = {
  metadataBase: new URL("https://grupovisualcont.com/"),
  title: { default: "Software Contable Visual", template: "%s | Visual" },
  description:
    "Software Contable ERP Visual: administra contabilidad, facturación electrónica, sistema de planillas, tesorería e informes SUNAT. Automatiza y escala tu empresa.",
  applicationName: "Visual",
  generator: "Next.js",
  keywords: [
    "ERP Perú",
    "software contable",
    "sistema contable",
    "grupovisualcont",
    "facturación electrónica",
    "planillas",
    "SUNAT",
    "tesorería",
    "VisualERP",
  ],
  authors: [{ name: "Visual" }],
  creator: "Visual",
  publisher: "Visual",
  alternates: {
    canonical: "https://grupovisualcont.com/",
    languages: { "es-PE": "https://grupovisualcont.com/" },
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
    siteName: "VisualERP",
    title: "Visual - Sistema",
    description:
      "ERP con módulos de contabilidad, facturación, planillas y tesorería. Cumple con SUNAT y automatiza todos tus procesos.",
    images: [
      {
        url: "/images/banner/visualBanner.jpg",
        width: 1200,
        height: 630,
        alt: "Visual ERP",
      },
    ],
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Contable Visual",
    description:
      "Software Contable ERP VisualCont: administra contabilidad, informes SUNAT, tesorería y más. ¡Prueba gratis!",
    images: ["/images/banner/visualBanner.jpg"],
  },
  icons: {
    icon: [
      { url: "/images/logos/LogVBlancoRelleno.svg", type: "image/svg+xml" },
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
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }) {
  //GTM
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="es" className={outfit.variable} suppressHydrationWarning>
      <head>
        <FontAwesomeConfig />
        <Script id="dataLayer-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
              analytics_storage: 'granted'
            });
          `}
        </Script>

        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}
      </head>

      <body className={outfit.className} suppressHydrationWarning>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID || ""}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
          />
        </ThemeProvider>
        {/* Dialogflow Messenger */}
        
        <Script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1" />
        <df-messenger
          intent="WELCOME"
          chat-title="VisualCont - Asesor en Linea"
          chat-icon="https://img.icons8.com/?size=100&id=g3YMw7LYW7Kp&format=png&color=FFFFFF"
          agent-id="2d3697f6-823e-4846-8861-fd845a558fb4"
          language-code="es"
        ></df-messenger>

      </body>
    </html>
  );
}
