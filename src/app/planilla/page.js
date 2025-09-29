import Navbar from "@/shared/navbar";
import Footer from "@/shared/footer";
import Hero from "@/components/services/hero";
import Features from "@/components/services/features";
import Capabilities from "@/components/services/capabilities";
import Pricing from "@/components/services/pricing";
import Demo from "@/shared/demo";
import WhatsAppFab from "@/shared/whatsappFab";
import {
  Database,
  ReceiptText,
  Building,
  PiggyBank,
  HardHat,
  FolderOutput,
  CalendarDays,
  Landmark,
} from "lucide-react";
import Script from "next/script";

export const metadata = {
  title: "Software de Planilla VisualPLAN | Seguridad y confianza",
  description:
    "Administra tu planilla electrónica de trabajadores y recursos humanos, cumple con obligaciones laborales y tributarias, con el software de planillas VisualPlan podrás controlar: cuentas corrientes, cts, vacaciones, gratificaciones, eps, afp, t-registro, plame, contratos, horas trabajadas con dispositivo de asistencia biométrica y con integración api para la contabilidad. Solicita demo sin costo.",
  alternates: {
    canonical: "/planilla",
  },
  keywords: [
    "software de planilla",
    "recursos humanos",
    "RR.HH.",
    "planilla Perú",
    "PLAME",
    "T-Registro",
    "AFP NET",
    "CTS",
    "gratificaciones",
    "VisualPLAN",
  ],
  openGraph: {
    type: "website",
    url: "/planilla",
    title: "Software de Planilla y RR.HH. | VisualPLAN",
    description:
      "Con VisualPlAN Automatiza remuneraciones, AFP/ONP, PLAME y T-Registro. Gratificaciones, CTS y vacaciones. Multiempresa y seguridad de datos.",
    images: [
      {
        url: "https://www.softwarecontableerp.com/images/logos/LogVBlancoRelleno.svg",
        alt: "VisualPLAN",
      },
    ],
    siteName: "Visual ERP",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software de Planilla y RR.HH. | VisualPLAN",
    description:
      "Cálculo de planillas, AFP/ONP, PLAME y T-Registro con AFP.NET integrado. Pruébalo 15 días gratis.",
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
    title: "Base de datos completa",
    description: "Registro de empleados con backup automático y restauración.",
    icon: Database,
    color: "bg-[#257CD0]",
  },
  {
    id: 2,
    title: "Emisión de boletas",
    description: "Genera boletas con centros de costo, proyectos y áreas.",
    icon: ReceiptText,
    color: "bg-[#257CD0]",
  },
  {
    id: 3,
    title: "Sistema multiempresas",
    description: "Administra varias empresas desde una sola plataforma.",
    icon: Building,
    color: "bg-[#257CD0]",
  },
  {
    id: 4,
    title: "Fondos de pensiones",
    description: "Gestiona AFP y ONP con haberes, descuentos y aportes.",
    icon: PiggyBank,
    color: "bg-[#257CD0]",
  },
  {
    id: 5,
    title: "Construcción civil",
    description:
      "Nuevo acuerdo con la tabla de costos laborales entre la FTCCP y la CAPECO.",
    icon: HardHat,
    color: "bg-[#257CD0]",
  },
  {
    id: 6,
    title: "Exportación PLAME",
    description: "Genera archivos para T-Registro y PLAME ante SUNAT.",
    icon: FolderOutput,
    color: "bg-[#257CD0]",
  },
  {
    id: 7,
    title: "Cálculo de quincena",
    description: "Adelantos quincenales y reportes exportables a Excel.",
    icon: CalendarDays,
    color: "bg-[#257CD0]",
  },
  {
    id: 8,
    title: "AFP.NET integrado",
    description: "Genera archivos TXT automáticos según estructura AFP.",
    icon: Landmark,
    color: "bg-[#257CD0]",
  },
];

const capabilitiesData = [
  {
    title: "Un sistema confiable para tu gestión de planillas",
    content: [
      "Obtén tu planilla de sueldos en segundos con todos los cálculos de aportes, descuentos y beneficios automatizados.",
      "Integra fácilmente con PLAME y cumple con tus obligaciones laborales de forma ágil y segura.",
      "Administra contratos, boletas y documentación laboral en un solo lugar, siempre actualizada y accesible.",
    ],
    description:
      "Optimiza el cálculo de sueldos, beneficios y obligaciones laborales con una plataforma rápida, segura y siempre acompañada por soporte experto.",
    buttonText: "Pruébalo gratis",
    image: "/images/planilla/planilla-capacidad.webp",
    reverse: false,
  },
];

const plans = [
  {
    name: "Básico",
    monthly: 100,
    annual: 1200,
    highlighted: false,
    cta: "Elegir Básico",
    features: [
      "Base de datos: Empleados y Obreros",
      "Registra datos de trabajadores",
      "Generador y restaurador de backup",
      "Emisión boleta de pago",
      "Centro de costo, proyectos y áreas",
      "Fondo de pensiones: AFP y ONP",
      "2 Horas de Capacitación",
    ],
    ctaMonthlyUrl:
      "https://api.whatsapp.com/send/?phone=51987286231&text=Hola%2C+quiero+informaci%C3%B3n+para+contratar+el+PLAN+B%C3%81SICO+MENSUAL+del+Software+de+Planillas+web.%0A%C2%BFPodr%C3%ADan+darme+detalles+sobre+sus+funcionalidades+y+beneficios%3F&type=phone_number&app_absent=0",
    ctaAnnualUrl:
      "https://api.whatsapp.com/send/?phone=51987286231&text=Hola%2C+quiero+informaci%C3%B3n+para+contratar+el+PLAN+B%C3%81SICO+ANUAL+del+Software+de+Planillas+web.%0A%C2%BFPodr%C3%ADan+explicarme+las+ventajas+y+lo+que+incluye%3F&type=phone_number&app_absent=0",
  },
  {
    name: "Mype",
    monthly: 133,
    annual: 1600,
    highlighted: true, // favorito
    cta: "Elegir Mype",
    features: [
      "Todo lo del plan Básico",
      "Configuración haber - descuento - aporte",
      "Exportación al T-Registro y PLAME",
      "Cálculo de quincena",
      "Exportación de reportes a Excel",
      "Cálculo de renta de 5ta",
      "4 horas de Capacitación",
    ],
    ctaMonthlyUrl:
      "https://api.whatsapp.com/send/?phone=51987286231&text=Hola%2C+quiero+informaci%C3%B3n+para+contratar+el+PLAN+MYPE+MENSUAL+del+Software+de+Planillas+web.%0A%C2%BFPodr%C3%ADan+darme+detalles+sobre+sus+funcionalidades+y+beneficios%3F&type=phone_number&app_absent=0",
    ctaAnnualUrl:
      "https://api.whatsapp.com/send/?phone=51987286231&text=Hola%2C+quiero+informaci%C3%B3n+para+contratar+el+PLAN+MYPE+ANUAL+del+Software+de+Planillas+web.%0A%C2%BFPodr%C3%ADan+explicarme+las+ventajas+y+lo+que+incluye%3F&type=phone_number&app_absent=0",
  },
  {
    name: "Pyme",
    monthly: 216,
    annual: 2600,
    highlighted: false,
    cta: "Elegir Pyme",
    features: [
      "Todo lo del plan Mype",
      "Estructura costos - construcción civil",
      "Plantillas de importación (datos variables)",
      "Cálculo de gratificaciones, vacaciones y CTS",
      "AFP NET integrado",
      "2 Computadoras en Red",
      "8 Horas de Capacitación Premium",
    ],
    ctaMonthlyUrl:
      "https://api.whatsapp.com/send/?phone=51987286231&text=Hola%2C+quiero+informaci%C3%B3n+para+contratar+el+PLAN+PYME+MENSUAL+del+Software+de+Planillas+web.%0A%C2%BFPodr%C3%ADan+darme+detalles+sobre+sus+funcionalidades+y+beneficios%3F&type=phone_number&app_absent=0",
    ctaAnnualUrl:
      "https://api.whatsapp.com/send/?phone=51987286231&text=Hola%2C+quiero+informaci%C3%B3n+para+contratar+el+PLAN+PYME+ANUAL+del+Software+de+Planillas+web.%0A%C2%BFPodr%C3%ADan+explicarme+las+ventajas+y+lo+que+incluye%3F&type=phone_number&app_absent=0",
  },
];

const demoData = {
  title: "¿Listo para transformar ",
  title2: "tu negocio?",
  description:
    "No esperes más, transforma tu negocio hoy mismo con nuestro sistema ERP todo en uno, diseñado para simplificar tus operaciones y potenciar tu crecimiento.",
  button: "Háblanos de tu negocio",
  route:
    "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C%20me%20interesa%20el%20Software%20de%20Planilla.%0D%0A%C2%BFQu%C3%A9%20m%C3%B3dulos%20incluye%20%28remuneraciones%2C%20AFP%2FONP%2C%20PDT%2FPLAME%29%20y%20c%C3%B3mo%20se%20integra%20con%20mi%20contabilidad%3F%20%C2%BFTienen%20demo%20y%20precios%3F%0D%0AMuchas%20gracias.&type=phone_number&app_absent=0",
};

export default function SistemaPlanilla() {
  return (
    <>
      <Navbar />
      <div className="container pt-4">
        <Hero
          logoLight="/images/planilla/visualPLAN.webp"
          logoDark="/images/planilla/visualPLAN-b.webp"
          heroImageSrc="/images/planilla/planilla-image.webp"
          serviceName="Sistema de Planilla"
          title="Optimiza tus gestiones con nuestro"
          titleColored="Sistema de Planillas"
          content="Nuestro Sistema de Planilla está diseñado para simplificar y automatizar la gestión financiera de tu empresa. Ahorra tiempo y reduce errores con nuestro sistema confiable y eficiente."
          button="Contáctanos"
        />
        <Features
          title="Todo lo indispensable para tu "
          coloredTitle="Sistema de Planillas"
          description="Ofrecemos una variedad de servicios para optimizar la gestión de tu empresa."
          services={services}
        />
        <Capabilities
          service="VisualPLAN"
          coloredTitle="Mejora tu planilla"
          capabilities={capabilitiesData}
        />
        <Pricing plans={plans} />
        <Demo data={demoData} />
      </div>
      <Footer />

      {/* Whatsapp Icono Flotante */}
      <WhatsAppFab href="https://wa.me/51956703375?text=Hola%2C%20%C2%BFMe%20puede%20explicar%20c%C3%B3mo%20el%20sistema%20me%20puede%20dar%20mejores%20resultados%3F%20%C2%BFMe%20podr%C3%ADa%20agendar%20una%20demo%3F%20Much%C3%ADsimas%20gracias" />

      {/* JSON-LD: Software de Planilla + planes */}
      <Script
        id="ld-software-planilla"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "VisualPLAN - Software de Planilla y RR.HH.",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "Planilla en Perú: remuneraciones, AFP/ONP, PLAME y T-Registro, gratificaciones, CTS y vacaciones. Multiempresa, AFP.NET integrado y exportación a Excel.",
            url: "https://www.softwarecontableerp.com/planilla",
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
            brand: { "@type": "Brand", name: "VisualPLAN" },
            featureList: [
              "Base de datos de empleados y obreros con backup",
              "Boletas de pago con centros de costo y proyectos",
              "Multiempresa",
              "AFP y ONP con haberes, descuentos y aportes",
              "Construcción civil (CAPECO)",
              "Exportación a T-Registro y PLAME",
              "Cálculo de quincena y renta de 5ta",
              "AFP.NET integrado y reportes a Excel",
            ],
            offers: {
              "@type": "OfferCatalog",
              name: "Planes de VisualPLAN",
              url: "https://www.softwarecontableerp.com/planilla#pricing",
              itemListElement: [
                {
                  "@type": "Offer",
                  name: "Básico mensual",
                  priceCurrency: "PEN",
                  price: 100,
                  url: "https://api.whatsapp.com/send/?phone=51987286231",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
                {
                  "@type": "Offer",
                  name: "Básico anual",
                  priceCurrency: "PEN",
                  price: 1200,
                  url: "https://api.whatsapp.com/send/?phone=51987286231",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
                {
                  "@type": "Offer",
                  name: "Mype mensual",
                  priceCurrency: "PEN",
                  price: 133,
                  url: "https://api.whatsapp.com/send/?phone=51987286231",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
                {
                  "@type": "Offer",
                  name: "Mype anual",
                  priceCurrency: "PEN",
                  price: 1600,
                  url: "https://api.whatsapp.com/send/?phone=51987286231",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
                {
                  "@type": "Offer",
                  name: "Pyme mensual",
                  priceCurrency: "PEN",
                  price: 216,
                  url: "https://api.whatsapp.com/send/?phone=51987286231",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
                {
                  "@type": "Offer",
                  name: "Pyme anual",
                  priceCurrency: "PEN",
                  price: 2600,
                  url: "https://api.whatsapp.com/send/?phone=51987286231",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
              ],
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              url: "https://www.softwarecontableerp.com/planilla",
            },
          }),
        }}
      />

      {/* JSON-LD: Describe la página y sus secciones */}
      <Script
        id="ld-webpage-planilla"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://www.softwarecontableerp.com/planilla#webpage",
            url: "https://www.softwarecontableerp.com/planilla",
            name: "Software de Planilla y RR.HH. | VisualPLAN",
            description:
              "Automatiza planillas: sueldos, AFP/ONP, PLAME y T-Registro, gratificaciones, CTS y vacaciones. Multiempresa con AFP.NET integrado.",
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
                url: "https://www.softwarecontableerp.com/planilla#hero",
                description: "Propuesta de valor y llamada a la acción.",
              },
              {
                "@type": "WebPageElement",
                name: "Características",
                url: "https://www.softwarecontableerp.com/planilla#features",
                description:
                  "Base de datos, boletas, multiempresa, AFP/ONP, construcción civil CAPECO, T-Registro y PLAME.",
              },
              {
                "@type": "WebPageElement",
                name: "Capacidades",
                url: "https://www.softwarecontableerp.com/planilla#capabilities",
                description:
                  "Implementación ágil, soporte especializado y seguridad de datos.",
              },
              {
                "@type": "WebPageElement",
                name: "Precios",
                url: "https://www.softwarecontableerp.com/planilla#pricing",
                description:
                  "Planes Básico, Mype y Pyme en modalidad mensual y anual.",
              },
              {
                "@type": "WebPageElement",
                name: "Demo",
                url: "https://www.softwarecontableerp.com/planilla#demo",
                description:
                  "WhatsApp para solicitar demo gratuita de 15 días.",
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: Migas de pan */}
      <Script
        id="ld-breadcrumbs-planilla"
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
                name: "Planilla",
                item: "https://www.softwarecontableerp.com/planilla",
              },
            ],
          }),
        }}
      />
    </>
  );
}
