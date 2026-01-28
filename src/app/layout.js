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
  authors: [{ name: "Visual", url: "https://grupovisualcont.com" }],
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
    url: "https://grupovisualcont.com/",
    siteName: "Visual ERP - Software Contable",
    title: "Visual - Software Contable y ERP para Empresas en Perú",
    description:
      "ERP con módulos de contabilidad, facturación electrónica SUNAT, planillas y tesorería. Cumple con normativas peruanas y automatiza todos tus procesos empresariales.",
    images: [
      {
        url: "https://grupovisualcont.com/images/banner/visualBanner.jpg",
        width: 1200,
        height: 630,
        alt: "Visual ERP - Software Contable para Empresas Peruanas",
      },
    ],
    locale: "es_PE",
    countryName: "Perú",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Contable Visual",
    description:
      "Software Contable ERP VisualCont: administra contabilidad, informes SUNAT, tesorería y más. ¡Prueba gratis!",
    images: ["/images/banner/visualBanner.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
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

        {/* Schema Organization - SEO */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Grupo Visual Cont",
              "alternateName": "Visual ERP",
              "url": "https://grupovisualcont.com",
              "logo": "https://grupovisualcont.com/images/logos/visual-logo.png",
              "description": "Empresa peruana líder en desarrollo de software contable, ERP, facturación electrónica y sistemas de gestión empresarial.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "PE",
                "addressLocality": "Lima",
                "addressRegion": "Lima"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+51-956-703-375",
                "contactType": "sales",
                "areaServed": "PE",
                "availableLanguage": ["Spanish"]
              },
              "sameAs": [
                "https://www.facebook.com/grupovisualcont",
                "https://www.linkedin.com/company/grupovisualcont"
              ],
              "founder": {
                "@type": "Organization",
                "name": "Grupo Visual Cont"
              }
            })
          }}
        />

        {/* Schema WebSite - SEO */}
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Visual ERP",
              "url": "https://grupovisualcont.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://grupovisualcont.com/noticias?search={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

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
