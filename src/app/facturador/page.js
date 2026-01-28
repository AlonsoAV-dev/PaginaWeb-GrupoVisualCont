import Navbar from "@/shared/navbar";
import Footer from "@/shared/footer";
import Hero from "@/components/services/hero";
import Features from "@/components/services/features";
import Capabilities from "@/components/services/capabilities";
import Pricing from "@/components/services/pricing";
import Demo from "@/shared/demo";
import IconsGroup from "@/shared/iconsGroup";
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
import { getPageKeywords, formatKeywordsForMetadata, formatKeywordsForSchema, formatKeywordsAsThings } from '@/lib/pageKeywords';

export async function generateMetadata() {
  const keywords = await getPageKeywords('facturador');
  
  return {
    title: "Software de Facturación Electrónica VisualFACT | SUNAT",
    description: "Con nuestro facturador electrónico, emite facturas y boletas electrónicas válidas ante SUNAT, guías de remisión, notas de crédito, informes gerenciales, integración API sunat y sistemas ERP, demo gratis por 15 días.",
    alternates: {
      canonical: "/facturador",
    },
    keywords: formatKeywordsForMetadata(keywords),
    openGraph: {
      type: "website",
      url: "/facturador",
      title: "Software de Facturación Electrónica sunat | VisualFACT",
      description:
        "Facturación electrónica 100% web y válida ante SUNAT. Reportes, Excel, importaciones masivas y firma digital.",
      images: [
        {
          url: "/images/banner/visualBanner.jpg",
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
        "/images/banner/visualBanner.jpg",
      ],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
}

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
    title: "Facturación automatizada y precisa",
    description: "Emite comprobantes con total exactitud, reduciendo errores y ahorrando tiempo.",
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
    title: "Gestión ágil de cobros y pagos",
    description: "Optimiza transacciones y mejora el flujo para mantener tus finanzas en orden.",
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
      "Emite boletas y facturas electrónicas homologadas con SUNAT en tan solo unos segundos",
      "Genera notas de crédito, débito y guías de remisión electrónicas de manera sencilla",
      "Accede en cualquier momento a reportes generados automaticamente de tus ventas",
    ],
    description:
      "Cumple con la normativa nacional sin complicaciones: un sistema ágil, seguro y listo para facturar desde el primer día.",
    buttonText: "Pruébalo gratis",
    image: "/images/facturador/facturador-capacidad.webp",
    reverse: true,
  },
];

const plans = [
  {
    name: "Súper Micro",
    monthly: 29,
    monthlyOld: 49,
    annual: 290,
    custom: false,
    highlighted: false,
    cta: "Elegir Súper Micro",
    features: [
      "Emite hasta 50 comprobantes electrónicos",
      "Factura Electrónicas",
      "Boleta de Venta Electrónica",
      "Nota de Crédito / Débito",
      "Maneja hasta 3 series diferentes para tus comprobantes",
      "Gestiona un (01) Punto de Venta TPV POS",
      "Registra un (01) Usuario",
      "Envío automático de facturas por email a tus clientes.",
      "Validación automática de tus emisiones con SUNAT",
      "Gestión sencilla para pequeñas empresas",
      "Capacitación uso del sistema",
      "Soporte técnico",
    ],
    ctaAnnualUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+S%C3%9APER+MICRO+ANUAL+del+Software+de+Facturaci%C3%B3n+web.%0A%C2%BFPodr%C3%ADan+contarme+m%C3%A1s+detalles+sobre+las+ventajas+y+funciones+incluidas%3F&type=phone_number&app_absent=0",
    ctaMonthlyUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+S%C3%9APER+MICRO+MENSUAL+del+Software+de+Facturaci%C3%B3n+web.%0A%C2%BFPodr%C3%ADan+contarme+m%C3%A1s+detalles+sobre+las+ventajas+y+funciones+incluidas%3F&type=phone_number&app_absent=0",
  },
  {
    name: "Mype",
    monthly: 80,
    monthlyOld: 100,
    annual: 800,
    custom: false,
    highlighted: true, // favorito
    cta: "Elegir Mype",
    features: [
      "Emisión ilimitada de comprobantes electrónicos: Facturas, Boletas, Nota de Crédito/Débito, Guías Transportista y Remitente electrónicas",
      "Maneja hasta 10 series diferentes para tus comprobantes",
      "Emite Pedidos y cotizaciones",
      "Gestiona hasta 4 Puntos de Venta",
      "Registra hasta 4 usuarios",
      "Carga masiva de boletas y facturas desde Excel",
      "Obtén tu Reporte de Ventas Resumen y Detallado",
      "Descarga tu Reporte SIRE/PLE sunat de Ventas y Compras",
      "Formato y Reporte Contable de Ventas y Compras para pasar al software contable VisualCont, StarSoft, Concar, Contasis, Siscont y otros (previa evaluación)",
      "Personaliza tu factura con el logo, colores, formato de letras, mensajes predefinidos (hasta 2 veces al año)",
      "Soporte técnico por ticket, correo, WhatsApp y llamada. Actualizaciones sin costo adicional.",
      "También incluye todo el plan anterior",
    ],
    ctaAnnualUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+MYPE+ANUAL+del+Software+de+Facturaci%C3%B3n+web.%0A%C2%BFPodr%C3%ADan+contarme+m%C3%A1s+detalles+sobre+las+ventajas+y+funciones+incluidas%3F&type=phone_number&app_absent=0",
    ctaMonthlyUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+MYPE+MENSUAL+del+Software+de+Facturaci%C3%B3n+web.%0A%C2%BFPodr%C3%ADan+contarme+m%C3%A1s+detalles+sobre+las+ventajas+y+funciones+incluidas%3F&type=phone_number&app_absent=0",
  },
  {
    name: "Premium",
    monthly: 125,
    monthlyOld: 150,
    annual: 1250,
    custom: false,
    highlighted: false,
    cta: "Elegir Premium",
    features: [
      "Emisión ilimitada de comprobantes electrónicos: facturas, boletas, notas de crédito y débito, guías de transportista y remitente",
      "Manejo de hasta 20 series diferentes de comprobantes",
      "Emisión de pedidos y cotizaciones",
      "Gestión de hasta 7 puntos de venta",
      "Registro de hasta 7 usuarios",
      "Carga masiva de boletas y facturas desde Excel",
      "Reporte de ventas resumen y detallado",
      "Descarga de reportes SIRE / PLE SUNAT de ventas y compras",
      "Formato y reporte contable de ventas y compras compatible con VisualCont, StarSoft, Concar, Contasis, Siscont y otros (previa evaluación)",
      "Módulo de orden de compra",
      "Módulo de compra directa",
      "Reporte de registro de compras",
      "Módulo de ingreso de almacén",
      "Módulo de salida de almacén",
      "Módulo de base de datos de inventario",
      "Reporte de stock de inventario",
      "Reporte de control de inventario",
      "Reporte de catálogo de inventario",
      "Reporte de control de inventario en unidades físicas (Kardex)",
      "Personalización de factura con logo, colores, tipografía y mensajes predefinidos (hasta 2 veces al año)",
      "Soporte técnico por ticket, correo, WhatsApp y llamada, con actualizaciones sin costo adicional",
      "Incluye todas las funcionalidades del plan anterior",
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

export default async function SistemaFacturador() {
  const keywords = await getPageKeywords('facturador');
  
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
          content="Genera comprobantes electrónicos válidos en segundos, gestiona inventarios de forma automática y consulta tus reportes al instante."
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
          coloredTitle="Repotencia tu sistema de Facturación Electrónica"
          capabilities={capabilitiesData}
        />
        <Pricing plans={plans}  />
        <Demo data={demoData} />
      </div>
      <Footer />

      {/* Grupo de Iconos*/}
      <IconsGroup />

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
            url: "https://grupovisualcont.com/facturador",
            logo: "https://grupovisualcont.com/images/logos/LogVBlancoRelleno.svg",
            inLanguage: "es-PE",
            areaServed: "PE",
            provider: {
              "@type": "Organization",
              name: "Visual ERP",
              url: "https://grupovisualcont.com/",
            },
            publisher: {
              "@type": "Organization",
              name: "Visual ERP",
              url: "https://grupovisualcont.com/",
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
              url: "https://grupovisualcont.com/facturador#pricing",
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
              url: "https://grupovisualcont.com/facturador",
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
            "@id": "https://grupovisualcont.com/facturador#webpage",
            url: "https://grupovisualcont.com/facturador",
            name: "Software de Facturación Electrónica en Perú | VisualFACT",
            description:
              "Emite comprobantes electrónicos válidos ante SUNAT y gestiona reportes y Excel. Demo gratuita de 15 días.",
            inLanguage: "es-PE",
            isPartOf: {
              "@type": "WebSite",
              name: "Visual ERP",
              url: "https://grupovisualcont.com/",
            },
            hasPart: [
              {
                "@type": "WebPageElement",
                name: "Hero",
                url: "https://grupovisualcont.com/facturador#hero",
                description: "Propuesta de valor y llamada a la acción.",
              },
              {
                "@type": "WebPageElement",
                name: "Características",
                url: "https://grupovisualcont.com/facturador#features",
                description:
                  "Autorización SUNAT, 100% web, reportes, importaciones, Excel, firma digital.",
              },
              {
                "@type": "WebPageElement",
                name: "Capacidades",
                url: "https://grupovisualcont.com/facturador#capabilities",
                description:
                  "Emisión de comprobantes, notas y guías; analítica de ventas.",
              },
              {
                "@type": "WebPageElement",
                name: "Precios",
                url: "https://grupovisualcont.com/facturador#pricing",
                description:
                  "Planes Super-Micro, Micro y Básico en modalidad mensual y anual.",
              },
              {
                "@type": "WebPageElement",
                name: "Demo",
                url: "https://grupovisualcont.com/facturador#demo",
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
                item: "https://grupovisualcont.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Facturación",
                item: "https://grupovisualcont.com/facturador",
              },
            ],
          }),
        }}
      />
    </>
  );
}
