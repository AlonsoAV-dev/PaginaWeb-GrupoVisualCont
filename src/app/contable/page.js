import Navbar from "@/shared/navbar";
import Footer from "@/shared/footer";
import Hero from "@/components/services/hero";
import Features from "@/components/services/features";
import Capabilities from "@/components/services/capabilities";
import Pricing from "@/components/services/pricing";
import Demo from "@/shared/demo";
import IconsGroup from "@/shared/iconsGroup";
import KeywordTags from "@/shared/keywordTags";
import {
  FolderInput,
  HandCoins,
  Building2,
  ChartSpline,
  Receipt,
  Infinity,
  FolderOutput,
  Search,
} from "lucide-react";
import Script from "next/script";
import { getPageKeywords, formatKeywordsForMetadata, formatKeywordsForSchema, formatKeywordsAsThings } from '@/lib/pageKeywords';

export async function generateMetadata() {
  const keywords = await getPageKeywords('contable');
  
  return {
    title: "Software Contable VisualCONT | Optimización y Confianza",
    description: "Registra tus asientos contables de forma rápida y práctica, presenta tu contabilidad al día, genera libros electrónicos ple y sire sunat conforme a las normas tributarias, emite estados financieros e informes gerenciales en automático, integra con la API de sunat y software integrado ERP, solicita una demo sin costo alguno.",
    alternates: {
      canonical: "/contable",
    },
    keywords: formatKeywordsForMetadata(keywords),
    openGraph: {
      type: "website",
      url: "/contable",
      title: "Software de Contabilidad | VisualCONT",
      description:
        "Con visualCONT registra tus asientos contables de forma rápida y práctica, presenta tu contabilidad al día, genera libros electrónicos ple y sire sunat conforme a las normas tributarias.",
      images: [
        {
          url: "/images/banner/visualBanner.jpg",
          alt: "VisualCONT",
        },
      ],
      siteName: "Visual ERP",
      locale: "es_PE",
    },
    twitter: {
      card: "summary_large_image",
      title: "Software de Contabilidad | VisualCONT",
      description:
        "Con visualCONT registra tus asientos contables de forma rápida y práctica, presenta tu contabilidad al día, genera libros electrónicos ple y sire sunat conforme a las normas tributarias.",
      images: ["/images/banner/visualBanner.jpg"],
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
    title: "Integrado con API SIRE SUNAT",
    description: "Exporta tu propuesta SIRE automáticamente.",
    icon: FolderInput,
    color: "bg-[#257CD0]",
  },
  {
    id: 2,
    title: "Integración con planilla",
    description: "Conecta tu nómina con la contabilidad de forma automática.",
    icon: HandCoins,
    color: "bg-[#257CD0]",
  },
  {
    id: 3,
    title: "Conciliación bancaria",
    description:
      "Integra las cuentas bancarias con la contabilidad para agilizar el proceso de conciliación.",
    icon: Building2,
    color: "bg-[#257CD0]",
  },
  {
    id: 4,
    title: "Reportes contables",
    description:
      "Genera informes detallados para una mejor toma de decisiones.",
    icon: ChartSpline,
    color: "bg-[#257CD0]",
  },
  {
    id: 5,
    title: "Validación de comprobantes",
    description:
      "Verifica tus comprobantes electrónicos contra los registros de SUNAT.",
    icon: Receipt,
    color: "bg-[#257CD0]",
  },
  {
    id: 6,
    title: "Cuentas por cobrar y pagar",
    description:
      "Gestiona transacciones y saldos pendientes para mantener un flujo de efectivo saludable.",
    icon: Infinity,
    color: "bg-[#257CD0]",
  },
  {
    id: 7,
    title: "Control de activos fijos",
    description:
      "Administra tus activos fijos y genera automáticamente los asientos de depreciación.",
    icon: FolderOutput,
    color: "bg-[#257CD0]",
  },
  {
    id: 8,
    title: "Análisis comparativos mensuales",
    description:
      "Obtén reportes comparativos, consolidados y combinados de los estados financieros.",
    icon: Search,
    color: "bg-[#257CD0]",
  },
];

const capabilitiesData = [
  {
    title: "Accede, integra y protege tu contabilidad con confianza",
    content: [
      "Maneja tu contabilidad en línea desde cualquier lugar y dispositivo, sin instalaciones ni complicaciones técnicas",
      "Conecta tu gestión directamente con SUNAT y automatiza procesos clave en tu gestión contable",
      "Genera y presenta de forma ágil el PLE, PLAME y Estados Financieros cumpliendo la normativa tributaria",
    ],
    description:
      "Una solución diseñada para optimizar tu trabajo contable: accesible, automatizada y segura en todo momento.",
    buttonText: "Pruébalo gratis",
    image: "/images/contable/contable-capacidad.webp",
    reverse: false,
  },
];

const plans = [
  {
    name: "Básico",
    monthly: 3,
    annual: 190,
    monthlyOld: 19,
    annualOld: 190,
    highlighted: false,
    cta: "Elegir Básico",
    features: [
      "Contabilidad hasta 5 empresas",
      "1 Usuario",
      "256 MB de almacenamiento",
      "Activación de sistema contable",
      "Conexión con registros electrónicos SIRE SUNAT",
      "Sistema contable en la nube",
      "Última versión del Plan Contable",
      "Régimen Especial, MYPE Tributario o General",
      "Importación y exportación Microsoft Excel",
      "Registro de compras",
      "Registro de ventas e ingresos",
      "Libro Diario de formato simplificado,Libro Diario y Libro Mayor",
      "Detracciones, retenciones y percepciones",
      "Balance de comprobación (general y analítico)",
      "Estado de situación financiera y estado de resultados",
      "Validación de comprobantes automático con SUNAT",
      "Plan contable para cada empresa",
      "Asientos automáticos y voucher contable",
      "Centro de costos y proyectos de inversión",
      "4 horas de capacitación",
    ],

    ctaAnnualUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+B%C3%81SICO+ANUAL+del+Software+de+Contabilidad+web.%0A%C2%BFPodr%C3%ADan+explicarme+los+beneficios+y+ventajas+de+esta+modalidad%3F&type=phone_number&app_absent=0",
    ctaMonthlyUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+B%C3%81SICO+MENSUAL+del+Software+de+Contabilidad+web.%0A%C2%BFPodr%C3%ADan+contarme+m%C3%A1s+detalles+sobre+las+funcionalidades+y+beneficios%3F&type=phone_number&app_absent=0",
    currency: "USD",
  },
  {
    name: "Intermedio",
    monthly: 5,
    annual: 490,
    monthlyOld: 49,
    annualOld: 490,
    highlighted: true, // favorito
    cta: "Elegir Intermedio",
    features: [
      "Contabilidad hasta 50 empresas",
      "5 Usuarios",
      "512 MB de almacenamiento",
      "Activación de sistema contable",
      "Conexión con registros electrónicos SIRE SUNAT",
      "Sistema contable en la nube",
      "Última versión del Plan Contable",
      "Régimen Especial, MYPE Tributario o General",
      "Importación y exportación Microsoft Excel",
      "Registro de compras",
      "Registro de ventas e ingresos",
      "Libro Diario de formato simplificado,Libro Diario y Libro Mayor",
      "Detracciones, retenciones y percepciones",
      "Balance de comprobación (general y analítico)",
      "Estado de situación financiera y estado de resultados",
      "Validación de comprobantes automático con SUNAT",
      "Plan contable para cada empresa",
      "Asientos automáticos y voucher contable",
      "Centro de costos y proyectos de inversión",
      "NUEVO: Descarga facturas electrónicas con el detalle de sus ítems (PDF, CDR, XML y Excel)",
      "8 horas de capacitación",
    ],
    ctaAnnualUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+INTERMEDIO+ANUAL+del+Software+de+Contabilidad+web.%0A%C2%BFPodr%C3%ADan+explicarme+los+beneficios+y+ventajas+de+esta+modalidad%3F&type=phone_number&app_absent=0",
    ctaMonthlyUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+INTERMEDIO+MENSUAL+del+Software+de+Contabilidad+web.%0A%C2%BFPodr%C3%ADan+contarme+m%C3%A1s+detalles+sobre+las+funcionalidades+y+beneficios%3F&type=phone_number&app_absent=0",
    currency: "USD",
  },
  {
    name: "Avanzado",
    monthly: 10,
    annual: 990,
    monthlyOld: 99,
    annualOld: 990,
    highlighted: false,
    cta: "Elegir Avanzado",
    features: [
      "Contabilidad ilimitada multiempresas",
      "Usuarios ilimitados",
      "1512 MB de almacenamiento",
      "Activación de sistema contable",
      "Conexión con registros electrónicos SIRE SUNAT",
      "Sistema contable en la nube",
      "Última versión del Plan Contable",
      "Régimen Especial, MYPE Tributario o General",
      "Importación y exportación Microsoft Excel",
      "Registro de compras",
      "Registro de ventas e ingresos",
      "Libro Diario de formato simplificado,Libro Diario y Libro Mayor",
      "Detracciones, retenciones y percepciones",
      "Balance de comprobación (general y analítico)",
      "Estado de situación financiera y estado de resultados",
      "Validación de comprobantes automático con SUNAT",
      "Plan contable para cada empresa",
      "Asientos automáticos y voucher contable",
      "Centro de costos y proyectos de inversión",
      "NUEVO: Descarga facturas electrónicas con el detalle de sus ítems (PDF, CDR, XML y Excel)",
      "Libros Electrónicos PLE SUNAT (incluye LIB)",
      "20 horas de capacitación",
    ],
    ctaAnnualUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+AVANZADO+ANUAL+del+Software+de+Contabilidad+web.%0A%C2%BFPodr%C3%ADan+explicarme+los+beneficios+y+ventajas+de+esta+modalidad%3F&type=phone_number&app_absent=0",
    ctaMonthlyUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+AVANZADO+MENSUAL+del+Software+de+Contabilidad+web.%0A%C2%BFPodr%C3%ADan+contarme+m%C3%A1s+detalles+sobre+las+funcionalidades+y+beneficios%3F&type=phone_number&app_absent=0",
    currency: "USD",
  },
];

const demoData = {
  title: "¿Listo para transformar ",
  title2: "tu negocio?",
  description:
    "No esperes más, transforma tu negocio hoy mismo con nuestro sistema ERP todo en uno, diseñado para simplificar tus operaciones y potenciar tu crecimiento.",
  button: "Háblanos de tu negocio",
  route:
    "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20el%20Software%20de%20Contabilidad.%0D%0A%C2%BFPodr%C3%ADan%20indicarme%20funciones%20clave%2C%20requisitos%20y%20precios%3F%20%C2%BFTienen%20demo%20de%2015%20d%C3%ADas%3F%0D%0AMuchas%20gracias.&type=phone_number&app_absent=0",
};

export default async function SistemaContable() {
  const keywords = await getPageKeywords('contable');
  
  return (
    <>
      <Navbar />
      <div className="container">
        <Hero
          logoLight="/images/contable/visualCONT.webp"
          logoDark="/images/contable/visualCONT-b.webp"
          heroImageSrc="/images/contable/contable-image.webp"
          serviceName="Sistema Contable"
          title="Optimiza tu gestión financiera con nuestro"
          titleColored="Sistema Contable"
          content="Un software pensado para contadores, diseñado para facilitar la gestión contable, ayudándote a concentrarte en lo realmente importa: brindar un servicio de excelencia."
          button="Contáctanos"
        />
        <Features
          title="Solo funcionalidades clave para "
          coloredTitle="impulsar tu gestión contable"
          description="Ofrecemos una variedad de servicios para optimizar la gestión contable de tu empresa."
          services={services}
        />
        <Capabilities
          service="VisualCONT"
          coloredTitle="Repotencia tu gestion Contable"
          capabilities={capabilitiesData}
        />
        <Pricing plans={plans} hasMonthly={true} hasAnnual={false} />
        <Demo data={demoData} />
        {/* Visualizar las keywords en la página (software contable) 
        <KeywordTags keywords={keywords} />
        */}
      </div>
      <Footer />

      {/* Grupo de Iconos*/}
      <IconsGroup />

      {/* JSON-LD: Software + planes (OfferCatalog) */}
      <Script
        id="ld-software-contabilidad"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "VisualCONT - Software de Contabilidad",
            "keywords": formatKeywordsForSchema(keywords),
            "about": formatKeywordsAsThings(keywords),
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "Software contable para empresas: libros electrónicos, reportes, /PDT, integración con SUNAT y consultas RUC/DNI.",
            url: "https://grupovisualcont.com/contable",
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
            brand: { "@type": "Brand", name: "VisualCONT" },
            featureList: [
              "Libros y libros electrónicos SUNAT",
              "Reportes contables y gerenciales",
              "Exportación PDT",
              "Consultas RUC y DNI",
              "Múltiples empresas",
              "Cierre anual automático",
            ],
            offers: {
              "@type": "OfferCatalog",
              name: "Planes de VisualCONT",
              url: "https://grupovisualcont.com/contable#pricing",
              itemListElement: [
                {
                  "@type": "Offer",
                  name: "Básico mensual",
                  priceCurrency: "USD",
                  price: 39,
                  url: "https://api.whatsapp.com/send/?phone=51956703375",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
                {
                  "@type": "Offer",
                  name: "Básico anual",
                  priceCurrency: "USD",
                  price: 390,
                  url: "https://api.whatsapp.com/send/?phone=51956703375",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
                {
                  "@type": "Offer",
                  name: "Intermedio mensual",
                  priceCurrency: "USD",
                  price: 68,
                  url: "https://api.whatsapp.com/send/?phone=51956703375",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
                {
                  "@type": "Offer",
                  name: "Intermedio anual",
                  priceCurrency: "USD",
                  price: 680,
                  url: "https://api.whatsapp.com/send/?phone=51956703375",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
                {
                  "@type": "Offer",
                  name: "Avanzado mensual",
                  priceCurrency: "USD",
                  price: 99,
                  url: "https://api.whatsapp.com/send/?phone=51956703375",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
                {
                  "@type": "Offer",
                  name: "Avanzado anual",
                  priceCurrency: "USD",
                  price: 990,
                  url: "https://api.whatsapp.com/send/?phone=51956703375",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
              ],
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              url: "https://grupovisualcont.com/contable",
            },
          }),
        }}
      />

      {/* JSON-LD: Describe la página y sus secciones */}
      <Script
        id="ld-webpage-contabilidad"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://grupovisualcont.com/contable#webpage",
            url: "https://grupovisualcont.com/contable",
            name: "Software de Contabilidad | VisualCONT",
            description:
              "Automatiza contabilidad, libros electrónicos, reportes y PDT con integración SUNAT. Demo gratis 15 días.",
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
                url: "https://grupovisualcont.com/contable#hero",
                description:
                  "Propuesta de valor y llamada a la acción para contactar al equipo.",
              },
              {
                "@type": "WebPageElement",
                name: "Características",
                url: "https://grupovisualcont.com/contable#features",
                description:
                  "Importación de compras, integración con planillas, multiempresa, reportes, validación de comprobantes.",
              },
              {
                "@type": "WebPageElement",
                name: "Capacidades",
                url: "https://grupovisualcont.com/contable#capabilities",
                description:
                  "Acceso web, integración SUNAT, seguridad y cifrado, automatizaciones contables.",
              },
              {
                "@type": "WebPageElement",
                name: "Precios",
                url: "https://grupovisualcont.com/contable#pricing",
                description:
                  "Planes Básico, Intermedio y Avanzado en modalidad mensual y anual.",
              },
              {
                "@type": "WebPageElement",
                name: "Demo",
                url: "https://grupovisualcont.com/contable#demo",
                description:
                  "WhatsApp para solicitar una demo gratuita de 15 días.",
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: Migas de pan */}
      <Script
        id="ld-breadcrumbs-contabilidad"
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
                name: "Contabilidad",
                item: "https://grupovisualcont.com/contable",
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: Software Application */}
      <Script
        id="ld-software-contable"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "VisualCONT - Software Contable",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Windows, Web",
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "PEN",
              lowPrice: "99",
              highPrice: "349",
              offerCount: "3",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "150",
            },
            description: "Software contable integrado con SUNAT para registrar asientos, generar libros electrónicos PLE y SIRE, y presentar estados financieros automatizados.",
            featureList: [
              "Integración con API SIRE SUNAT",
              "Generación de libros electrónicos PLE",
              "Reportes contables automáticos",
              "Conciliación bancaria",
              "Estados financieros",
              "Validación de comprobantes",
            ],
            screenshot: "https://grupovisualcont.com/images/contable/screenshot.jpg",
            softwareVersion: "2024",
            releaseNotes: "Integración completa con SUNAT, nuevas automatizaciones contables",
            provider: {
              "@type": "Organization",
              name: "Grupo Visual Cont",
              url: "https://grupovisualcont.com",
            },
            offers: [
              {
                "@type": "Offer",
                name: "Plan Básico",
                price: "99",
                priceCurrency: "PEN",
                billingIncrement: "Mensual",
              },
              {
                "@type": "Offer",
                name: "Plan Intermedio",
                price: "199",
                priceCurrency: "PEN",
                billingIncrement: "Mensual",
              },
              {
                "@type": "Offer",
                name: "Plan Avanzado",
                price: "349",
                priceCurrency: "PEN",
                billingIncrement: "Mensual",
              },
            ],
          }),
        }}
      />
    </>
  );
}
