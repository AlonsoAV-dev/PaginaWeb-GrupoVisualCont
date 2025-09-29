import Navbar from "@/shared/navbar";
import Footer from "@/shared/footer";
import Hero from "@/components/services/hero";
import Features from "@/components/services/features";
import Capabilities from "@/components/services/capabilities";
import Pricing from "@/components/services/pricing";
import Demo from "@/shared/demo";
import WhatsAppFab from "@/shared/whatsappFab";
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

export const metadata = {
  title: "Software Contable VisualCONT | Optimización y Confianza",
  description:
    "Registra tus asientos contables de forma rápida y práctica, presenta tu contabilidad al día, genera libros electrónicos ple y sire sunat conforme a las normas tributarias, emite estados financieros e informes gerenciales en automático, integra con la API de sunat y software integrado ERP, solicita una demo sin costo alguno.",
  alternates: {
    canonical: "/contable",
  },
  keywords: [
    "software contable",
    "contabilidad Perú",
    "libros electrónicos SUNAT",
    "PDT",
    "reportes contables",
    "VisualCONT",
  ],
  openGraph: {
    type: "website",
    url: "/contable",
    title: "Software de Contabilidad | VisualCONT",
    description:
      "Con visualCONT registra tus asientos contables de forma rápida y práctica, presenta tu contabilidad al día, genera libros electrónicos ple y sire sunat conforme a las normas tributarias.",
    images: [
      {
        url: "https://www.softwarecontableerp.com/images/logos/LogVBlancoRelleno.svg",
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
    title: "Software multiempresas",
    description: "Gestiona múltiple cantidad de empresas desde una sola plataforma.",
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
    title: "Licencia ilimitada",
    description:
      "Sin restricciones de tiempo o usuarios en nuestros planes empresariales.",
    icon: Infinity,
    color: "bg-[#257CD0]",
  },
  {
    id: 7,
    title: "Exportación DAOT/PDT",
    description:
      "Genera y exporta fácilmente tus declaraciones para presentar ante SUNAT.",
    icon: FolderOutput,
    color: "bg-[#257CD0]",
  },
  {
    id: 8,
    title: "Consulta RUC y DNI",
    description:
      "Verifica la información de tus clientes y proveedores directamente desde el sistema.",
    icon: Search,
    color: "bg-[#257CD0]",
  },
];

const capabilitiesData = [
  {
    title: "Accede, integra y protege tu contabilidad con confianza",
    content: [
      "Maneja tu contabilidad en línea desde cualquier lugar y dispositivo, sin instalaciones ni complicaciones técnicas",
      "Conecta tu gestión directamente con SUNAT y automatiza procesos contables clave",
      "Genera y presenta de forma ágil el PLE, PLAME y Estados Financieros cumpliendo la normativa tributaria",
    ],
    description:
      "Una solución diseñada para simplificar tu trabajo contable: accesible, automatizada y segura en todo momento.",
    buttonText: "Pruébalo gratis",
    image: "/images/contable/contable-capacidad.webp",
    reverse: false,
  },
];

const plans = [
  {
    name: "Básico",
    monthly: 39,
    annual: 390,
    highlighted: false,
    cta: "Elegir Básico",
    features: [
      "Ingreso de compras, ventas y diario",
      "Estado de Situación Financiera",
      "Estado de Resultados",
      "Conciliación bancaria",
      "DAOT – envío directo al PDT",
      "Libros electrónicos SIRE SUNAT",
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
    monthly: 68,
    annual: 680,
    highlighted: true, // favorito
    cta: "Elegir Intermedio",
    features: [
      "Ingreso de compras, ventas y diario",
      "Reportes en moneda extranjera",
      "Análisis de cuentas corrientes",
      "Cierre anual y asiento de apertura automático",
      "Módulo de activos fijos (depreciación automática)",
      "Informes gerenciales",
      "4 horas de capacitación",
    ],
    ctaAnnualUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+INTERMEDIO+ANUAL+del+Software+de+Contabilidad+web.%0A%C2%BFPodr%C3%ADan+explicarme+los+beneficios+y+ventajas+de+esta+modalidad%3F&type=phone_number&app_absent=0",
    ctaMonthlyUrl:
      "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+me+interesa+contratar+el+PLAN+INTERMEDIO+MENSUAL+del+Software+de+Contabilidad+web.%0A%C2%BFPodr%C3%ADan+contarme+m%C3%A1s+detalles+sobre+las+funcionalidades+y+beneficios%3F&type=phone_number&app_absent=0",
    currency: "USD",
  },
  {
    name: "Avanzado",
    monthly: 99,
    annual: 990,
    highlighted: false,
    cta: "Elegir Avanzado",
    features: [
      "Ingreso de compras, ventas y diario",
      "Reportes en moneda extranjera",
      "Análisis de cuentas corrientes",
      "Créditos y cobranzas",
      "Analizadores de datos",
      "Reporte de centro de costos",
      "Administrador de usuarios",
      "6 horas de capacitación",
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

export default function SistemaContable() {
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
          content="Nuestro Sistema Contable está diseñado para simplificar y automatizar la gestión financiera de tu empresa. Ahorra tiempo y reduce errores con nuestro sistema confiable y eficiente."
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
          coloredTitle="Repotencia tu contabilidad"
          capabilities={capabilitiesData}
        />
        <Pricing plans={plans} />
        <Demo data={demoData} />
      </div>
      <Footer />

      {/* Whatsapp Icono Flotante */}
      <WhatsAppFab href="https://wa.me/51956703375?text=Hola%2C%20%C2%BFMe%20puede%20explicar%20c%C3%B3mo%20el%20sistema%20me%20puede%20dar%20mejores%20resultados%3F%20%C2%BFMe%20podr%C3%ADa%20agendar%20una%20demo%3F%20Much%C3%ADsimas%20gracias" />

      {/* JSON-LD: Software + planes (OfferCatalog) */}
      <Script
        id="ld-software-contabilidad"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "VisualCONT - Software de Contabilidad",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "Software contable para empresas: libros electrónicos, reportes, /PDT, integración con SUNAT y consultas RUC/DNI.",
            url: "https://www.softwarecontableerp.com/contable",
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
              url: "https://www.softwarecontableerp.com/contable#pricing",
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
              url: "https://www.softwarecontableerp.com/contable",
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
            "@id": "https://www.softwarecontableerp.com/contable#webpage",
            url: "https://www.softwarecontableerp.com/contable",
            name: "Software de Contabilidad | VisualCONT",
            description:
              "Automatiza contabilidad, libros electrónicos, reportes y PDT con integración SUNAT. Demo gratis 15 días.",
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
                url: "https://www.softwarecontableerp.com/contable#hero",
                description:
                  "Propuesta de valor y llamada a la acción para contactar al equipo.",
              },
              {
                "@type": "WebPageElement",
                name: "Características",
                url: "https://www.softwarecontableerp.com/contable#features",
                description:
                  "Importación de compras, integración con planillas, multiempresa, reportes, validación de comprobantes.",
              },
              {
                "@type": "WebPageElement",
                name: "Capacidades",
                url: "https://www.softwarecontableerp.com/contable#capabilities",
                description:
                  "Acceso web, integración SUNAT, seguridad y cifrado, automatizaciones contables.",
              },
              {
                "@type": "WebPageElement",
                name: "Precios",
                url: "https://www.softwarecontableerp.com/contable#pricing",
                description:
                  "Planes Básico, Intermedio y Avanzado en modalidad mensual y anual.",
              },
              {
                "@type": "WebPageElement",
                name: "Demo",
                url: "https://www.softwarecontableerp.com/contable#demo",
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
                item: "https://www.softwarecontableerp.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Contabilidad",
                item: "https://www.softwarecontableerp.com/contable",
              },
            ],
          }),
        }}
      />
    </>
  );
}
