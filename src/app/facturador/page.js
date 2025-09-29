import Navbar from "@/shared/navbar";
import Footer from "@/shared/footer";
import Hero from "@/components/services/hero";
import Features from "@/components/services/features";
import Capabilities from "@/components/services/capabilities";
import Pricing from "@/components/services/pricing";
import Demo from "@/shared/demo";
import WhatsAppFab from "@/shared/whatsappFab";
import {
  CircleUserRound,
  ChartBar,
  CloudCheck,
  SquarePen,
  Import,
  Sheet,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import Script from "next/script";

export const metadata = {
  title: "Software de Facturación Electrónica VisualFACT | SUNAT",
  description:
    "Con nuestro facturador electrónico, emite facturas y boletas electrónicas válidas ante SUNAT, guías de remisión, notas de crédito, informes gerenciales, integración API sunat y sistemas ERP, demo gratis por 15 días.",
  alternates: {
    canonical: "/facturador",
  },
  keywords: [
    "facturación electrónica",
    "boletas electrónicas",
    "facturas electrónicas",
    "SUNAT",
    "PSE",
    "firma digital",
    "VisualFACT",
  ],
  openGraph: {
    type: "website",
    url: "/facturador",
    title: "Software de Facturación Electrónica sunat | VisualFACT",
    description:
      "Facturación electrónica 100% web y válida ante SUNAT. Reportes, Excel, importaciones masivas y firma digital.",
    images: [
      {
        url: "https://www.softwarecontableerp.com/images/logos/LogVBlancoRelleno.svg",
        alt: "VisualFACT",
      },
    ],
    siteName: "Visual ERP",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software de Facturación Electrónica sunat | VisualFACT",
    description:
      "Emisión electrónica homologada con SUNAT, reportes avanzados y Excel. Pruébalo 15 días gratis.",
    images: [
      "https://www.softwarecontableerp.com/images/logos/LogVBlancoRelleno.svg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

const services = [
  {
    id: 1,
    title: "Autorizado por SUNAT",
    description: "Resolución de Intendencia N° 094-005-0001933/SUNAT",
    icon: CircleUserRound,
    color: "bg-[#257CD0]",
    routeFile: "docs/certificado-sunat.pdf",
  },
  {
    id: 2,
    title: "Certificado digital",
    description: "Incluye firma digital y consulta de RUC y DNI en línea.",
    icon: ShieldCheck,
    color: "bg-[#257CD0]",
  },
  {
    id: 3,
    title: "100% web",
    description: "Accede sin instalación desde cualquier navegador 24/7.",
    icon: CloudCheck,
    color: "bg-[#257CD0]",
  },
  {
    id: 4,
    title: "Guía de Remisión Electrónica SUNAT",
    description: "Emite tus guías conforme a las normas tributarias.",
    icon: SquarePen,
    color: "bg-[#257CD0]",
  },
  {
    id: 5,
    title: "Conexión mediante API",
    description:
      "Se integra con SUNAT y con software de terceros mediante una API.",
    icon: Import,
    color: "bg-[#257CD0]",
  },
  {
    id: 6,
    title: "Exportación a Excel",
    description: "Genera reportes y consolidados de ventas en Excel.",
    icon: Sheet,
    color: "bg-[#257CD0]",
  },
  {
    id: 7,
    title: "Controla almacén e inventarios",
    description: "Con la versión del software integrado ERP.",
    icon: RefreshCw,
    color: "bg-[#257CD0]",
  },
  {
    id: 8,
    title: "Reportes avanzados",
    description: "Ventas, compras y analíticas con gráficos detallados.",
    icon: ChartBar,
    color: "bg-[#257CD0]",
  },
];

const capabilitiesData = [
  {
    title: "Facturación electrónica simple y 100% válida ante SUNAT",
    content: [
      "Emite boletas y facturas electrónicas homologadas con SUNAT en segundos",
      "Genera notas de crédito, débito y guías de remisión de forma sencilla",
      "Accede a reportes automáticos de tus ventas",
    ],
    description:
      "Cumple con la normativa peruana sin complicaciones: un sistema ágil, seguro y listo para facturar desde el primer día.",
    buttonText: "Pruébalo gratis",
    image: "/images/facturador/facturador-capacidad.webp",
    reverse: true,
  },
];

const plans = [
  {
    name: "Súper Micro",
    monthly: 40,
    annual: 348,
    custom: false,
    highlighted: false,
    cta: "Elegir Súper Micro",
    features: [
      "Boletas electrónicas",
      "Notas de crédito electrónicas",
      "Notas de débito electrónicas",
      "Registro de hasta 50 comprobantes",
      "Gestión sencilla para pequeñas empresas",
      "Soporte técnico incluido",
      "Capacitación básica",
    ],
    ctaAnnualUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+S%C3%9APER+MICRO+ANUAL+del+Software+de+Facturaci%C3%B3n+web.%0A%C2%BFPodr%C3%ADan+contarme+m%C3%A1s+detalles+sobre+las+ventajas+y+funciones+incluidas%3F&type=phone_number&app_absent=0",
    ctaMonthlyUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+S%C3%9APER+MICRO+MENSUAL+del+Software+de+Facturaci%C3%B3n+web.%0A%C2%BFPodr%C3%ADan+contarme+m%C3%A1s+detalles+sobre+las+ventajas+y+funciones+incluidas%3F&type=phone_number&app_absent=0",
  },
  {
    name: "Mype",
    monthly: 100,
    annual: 960,
    custom: false,
    highlighted: true, // favorito
    cta: "Elegir Mype",
    features: [
      "Facturas y boletas electrónicas",
      "Notas de crédito y débito electrónicas",
      "PLE – registro de ventas 14.1",
      "Interfaz integrada con software contable",
      "Registro de compras automatizado",
      "Comprobantes ilimitados",
      "Soporte técnico especializado",
      "Capacitación incluida",
    ],
    ctaAnnualUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+MYPE+ANUAL+del+Software+de+Facturaci%C3%B3n+web.%0A%C2%BFPodr%C3%ADan+contarme+m%C3%A1s+detalles+sobre+las+ventajas+y+funciones+incluidas%3F&type=phone_number&app_absent=0",
    ctaMonthlyUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+MYPE+MENSUAL+del+Software+de+Facturaci%C3%B3n+web.%0A%C2%BFPodr%C3%ADan+contarme+m%C3%A1s+detalles+sobre+las+ventajas+y+funciones+incluidas%3F&type=phone_number&app_absent=0",
  },
  {
    name: "Premium",
    monthly: 150,
    annual: 1500,
    custom: false,
    highlighted: false,
    cta: "Elegir Premium",
    features: [
      "Facturas, boletas y guías electrónicas",
      "Notas de crédito, débito, retención y percepción",
      "Registro y deducción de anticipos",
      "PLE – registro de ventas 14.1",
      "Módulo completo de compras e inventario",
      "Tesorería: cuentas por cobrar y pagar",
      "Movimientos de caja y bancos",
      "Comprobantes ilimitados",
    ],
    ctaAnnualUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+PREMIUM+ANUAL+del+Software+de+Facturaci%C3%B3n+web.%0A%C2%BFPodr%C3%ADan+contarme+m%C3%A1s+detalles+sobre+las+ventajas+y+funciones+incluidas%3F&type=phone_number&app_absent=0",
    ctaMonthlyUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+PREMIUM+MENSUAL+del+Software+de+Facturaci%C3%B3n+web.%0A%C2%BFPodr%C3%ADan+contarme+m%C3%A1s+detalles+sobre+las+ventajas+y+funciones+incluidas%3F&type=phone_number&app_absent=0",
  },
];

const demoData = {
  title: "¿Listo para transformar ",
  title2: "tu negocio?",
  description:
    "No esperes más, transforma tu negocio hoy mismo con nuestro sistema ERP todo en uno, diseñado para simplificar tus operaciones y potenciar tu crecimiento.",
  button: "Háblanos de tu negocio",
  route:
    "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C%20quiero%20informaci%C3%B3n%20del%20Software%20de%20Facturaci%C3%B3n.%0D%0A%C2%BFC%C3%B3mo%20manejan%20facturas%20electr%C3%B3nicas%2C%20boletas%2C%20notas%20y%20conexi%C3%B3n%20con%20SUNAT%3F%20%C2%BFPuedo%20probar%20una%20demo%20de%2015%20d%C3%ADas%20y%20ver%20precios%3F%0D%0AGracias.&type=phone_number&app_absent=0",
};

export default function SistemaFacturador() {
  return (
    <>
      <Navbar />
      <div className="container pt-4">
        <Hero
          logoLight="/images/facturador/visualFACT.webp"
          logoDark="/images/facturador/visualFACT-b.webp"
          heroImageSrc="/images/facturador/facturador-image.webp"
          serviceName="Sistema Facturador"
          title="Optimiza tu gestión financiera con nuestro"
          titleColored="Sistema Facturador"
          content="Nuestro Sistema de Facturación Electrónica está diseñado para simplificar y automatizar la gestión financiera de tu empresa. Ahorra tiempo y reduce errores con nuestro sistema confiable y eficiente."
          button="Contáctanos"
        />
        <Features
          title="Las funcionalidades más importantes para tu "
          coloredTitle="Facturador Electrónico"
          description="Ofrecemos una variedad de servicios para optimizar la gestión de tu empresa."
          services={services}
        />
        <Capabilities
          service="VisualFACT"
          coloredTitle="repotencia tu Sistema de Facturación"
          capabilities={capabilitiesData}
        />
        <Pricing plans={plans} />
        <Demo data={demoData} />
      </div>
      <Footer />

      {/* Whatsapp Icono Flotante */}
      <WhatsAppFab href="https://wa.me/51956703375?text=Hola%2C%20%C2%BFMe%20puede%20explicar%20c%C3%B3mo%20el%20sistema%20me%20puede%20dar%20mejores%20resultados%3F%20%C2%BFMe%20podr%C3%ADa%20agendar%20una%20demo%3F%20Much%C3%ADsimas%20gracias" />

      {/* JSON-LD: Software de Facturación + planes */}
      <Script
        id="ld-software-facturacion"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "VisualFACT - Software de Facturación Electrónica",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "Facturación electrónica en Perú: facturas y boletas, notas, guías, reportes y Excel. Válido ante SUNAT con firma digital.",
            url: "https://www.softwarecontableerp.com/facturador",
            logo: "https://www.softwarecontableerp.com/images/logos/LogVBlancoRelleno.svg",
            inLanguage: "es-PE",
            areaServed: "PE",
            provider: {
              "@type": "Organization",
              name: "Visual ERP",
              url: "https://www.softwarecontableerp.com/",
            },
            publisher: {
              "@type": "Organization",
              name: "Visual ERP",
              url: "https://www.softwarecontableerp.com/",
            },
            brand: { "@type": "Brand", name: "VisualFACT" },
            featureList: [
              "Autorizado por SUNAT (Resolución de Intendencia N° 094-005-0001933/SUNAT)",
              "Facturas, boletas, notas de crédito/débito y guías",
              "Reportes avanzados y exportación a Excel",
              "100% web con firma digital incluida",
              "Importación masiva de artículos y clientes",
              "Actualizaciones conforme a normativa SUNAT",
            ],
            offers: {
              "@type": "OfferCatalog",
              name: "Planes de VisualFACT",
              url: "https://www.softwarecontableerp.com/facturador#pricing",
              itemListElement: [
                {
                  "@type": "Offer",
                  name: "Super-Micro mensual",
                  priceCurrency: "PEN",
                  price: 40,
                  url: "https://api.whatsapp.com/send/?phone=51956703375",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
                {
                  "@type": "Offer",
                  name: "Super-Micro anual",
                  priceCurrency: "PEN",
                  price: 348,
                  url: "https://api.whatsapp.com/send/?phone=51956703375",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
                {
                  "@type": "Offer",
                  name: "Mype mensual",
                  priceCurrency: "PEN",
                  price: 100,
                  url: "https://api.whatsapp.com/send/?phone=51956703375",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
                {
                  "@type": "Offer",
                  name: "Mype anual",
                  priceCurrency: "PEN",
                  price: 960,
                  url: "https://api.whatsapp.com/send/?phone=51956703375",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
                {
                  "@type": "Offer",
                  name: "Premium mensual",
                  priceCurrency: "PEN",
                  price: 150,
                  url: "https://api.whatsapp.com/send/?phone=51956703375",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
                {
                  "@type": "Offer",
                  name: "Premium anual",
                  priceCurrency: "PEN",
                  price: 1500,
                  url: "https://api.whatsapp.com/send/?phone=51956703375",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
              ],
            },
            // Documento de autorización SUNAT expuesto como recurso informativo
            mainEntityOfPage: {
              "@type": "WebPage",
              url: "https://www.softwarecontableerp.com/facturador",
            },
          }),
        }}
      />

      {/* JSON-LD: Describe la página y sus secciones */}
      <Script
        id="ld-webpage-facturacion"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://www.softwarecontableerp.com/facturador#webpage",
            url: "https://www.softwarecontableerp.com/facturador",
            name: "Software de Facturación Electrónica en Perú | VisualFACT",
            description:
              "Emite comprobantes electrónicos válidos ante SUNAT y gestiona reportes y Excel. Demo gratuita de 15 días.",
            inLanguage: "es-PE",
            isPartOf: {
              "@type": "WebSite",
              name: "Visual ERP",
              url: "https://www.softwarecontableerp.com/",
            },
            hasPart: [
              {
                "@type": "WebPageElement",
                name: "Hero",
                url: "https://www.softwarecontableerp.com/facturador#hero",
                description: "Propuesta de valor y llamada a la acción.",
              },
              {
                "@type": "WebPageElement",
                name: "Características",
                url: "https://www.softwarecontableerp.com/facturador#features",
                description:
                  "Autorización SUNAT, 100% web, reportes, importaciones, Excel, firma digital.",
              },
              {
                "@type": "WebPageElement",
                name: "Capacidades",
                url: "https://www.softwarecontableerp.com/facturador#capabilities",
                description:
                  "Emisión de comprobantes, notas y guías; analítica de ventas.",
              },
              {
                "@type": "WebPageElement",
                name: "Precios",
                url: "https://www.softwarecontableerp.com/facturador#pricing",
                description:
                  "Planes Super-Micro, Micro y Básico en modalidad mensual y anual.",
              },
              {
                "@type": "WebPageElement",
                name: "Demo",
                url: "https://www.softwarecontableerp.com/facturador#demo",
                description:
                  "WhatsApp para solicitar la demo gratuita de 15 días.",
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: Migas de pan */}
      <Script
        id="ld-breadcrumbs-facturacion"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Inicio",
                item: "https://www.softwarecontableerp.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Facturación",
                item: "https://www.softwarecontableerp.com/facturador",
              },
            ],
          }),
        }}
      />
    </>
  );
}
