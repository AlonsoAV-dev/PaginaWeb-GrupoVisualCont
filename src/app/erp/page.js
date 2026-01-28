import Navbar from "@/shared/navbar";
import Footer from "@/shared/footer";
import Hero from "@/components/services/hero";
import Features from "@/components/services/features";
import Capabilities from "@/components/services/capabilities";
import Pricing from "@/components/services/pricing";
import Demo from "@/shared/demo";
import IconsGroup from "@/shared/iconsGroup";
import {
  Warehouse,
  Receipt,
  ShoppingCart,
  Landmark,
  CalendarCheck2,
  Network,
  Factory,
  CloudCheck,
} from "lucide-react";
import Script from "next/script";
import { getPageKeywords, formatKeywordsForMetadata, formatKeywordsForSchema, formatKeywordsAsThings } from '@/lib/pageKeywords';

export async function generateMetadata() {
  const keywords = await getPageKeywords('erp');
  
  return {
    title: "Software ERP Integrado VisualERP",
    description: "Nuestro sistema web VisualERP cuenta con inventarios (KARDEX SUNAT), ventas y facturación, compras, tesorería y bancos, cierre contable (EEFF) y multiempresa. Accede a una demo gratis por 15 días.",
    alternates: {
      canonical: "/erp",
    },
    keywords: formatKeywordsForMetadata(keywords),
    openGraph: {
      type: "website",
      url: "/erp",
      title: "Software ERP Integrado | VisualERP",
      description:
        "Control total: inventarios, ventas, compras, tesorería y cierre contable. Multiempresa y 100% web.",
      images: [
        {
          url: "/images/banner/visualBanner.jpg",
          alt: "VisualERP",
        },
      ],
      siteName: "Visual ERP",
      locale: "es_PE",
    },
    twitter: {
      card: "summary_large_image",
      title: "Software ERP Integrado | VisualERP",
      description:
        "ERP web escalable con módulos de inventario, ventas, compras y tesorería. Pruébalo 15 días gratis.",
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
    title: "Almacén e Inventario",
    description:
      "Controla ingresos, salidas, transferencias y stock con KARDEX SUNAT.",
    icon: Warehouse,
    color: "bg-[#257CD0]",
  },
  {
    id: 2,
    title: "Ventas y Facturación",
    description:
      "Cotizaciones, facturas, boletas, guías y notas de crédito/débito.",
    icon: Receipt,
    color: "bg-[#257CD0]",
  },
  {
    id: 3,
    title: "Conexión API",
    description: "Integra contabilidad, inventario y ventas en una sola plataforma",
    icon: ShoppingCart,
    color: "bg-[#257CD0]",
  },
  {
    id: 4,
    title: "Tesorería y Bancos",
    description: "Caja chica, pagos, emisión de cheques y transferencias.",
    icon: Landmark,
    color: "bg-[#257CD0]",
  },
  {
    id: 5,
    title: "Cierre Contable",
    description: "Cierre mensual automatizado con reportes gerenciales.",
    icon: CalendarCheck2,
    color: "bg-[#257CD0]",
  },
  {
    id: 6,
    title: "Inteligencia Artificial",
    description:
      "Anticipa las ventas y tendencias para planificar mejor.",
    icon: Network,
    color: "bg-[#257CD0]",
  },
  {
    id: 7,
    title: "Inventario en tiempo real",
    description: "Controla entradas, salidas y niveles de stock al instante.",
    icon: Factory,
    color: "bg-[#257CD0]",
  },
  {
    id: 8,
    title: "Ecommerce y facturación electrónica",
    description: "Conecta tu negocio online, gestiona pedidos y emite comprobantes.",
    icon: CloudCheck,
    color: "bg-[#257CD0]",
  },
];

const capabilitiesData = [
  {
    title: "Un ERP sólido listo para crecer contigo y tu negocio",
    content: [
      "Soporte especializado y constante para garantizar continuidad en tus operaciones",
      "Plataforma escalable que centraliza finanzas, clientes y procesos clave en un unico sistema",
      "Seguridad de primer nivel respaldada por AWS, asegurando la integridad y disponibilidad de tu información",
    ],
    description:
      "Con VisualERP tu organización logra un control total de sus procesos, con soporte permanente, tecnología escalable y la seguridad de trabajar en la nube con estándares internacionales.",
    buttonText: "Pruébalo gratis",
    image: "/images/integrado/integrado-capacidad.webp",
    reverse: true,
  },
];

const plans = [
  {
    name: "Básico",
    monthly: null,
    annual: 2160,
    custom: false,
    highlighted: true,
    cta: "Elegir Básico",
    features: [
      "Almacén y control de inventarios",
      "Ventas y facturación básica",
      "Cuentas por cobrar y por pagar",
      "Tesorería básica",
      "Configuración de parámetros",
      "Movimientos de caja y bancos",
      "Soporte técnico incluido",
    ],
    ctaMonthlyUrl: null,
    ctaAnnualUrl:
      "https://api.whatsapp.com/send/?phone=51987286231&text=Hola%2C+quiero+informaci%C3%B3n+para+contratar+el+PLAN+B%C3%81SICO+ANUAL+del+Software+ERP+Integrado+web.%0A%C2%BFPodr%C3%ADan+darme+detalles+sobre+los+beneficios+y+funcionalidades+incluidas%3F&type=phone_number&app_absent=0",
  },
  {
    name: "Avanzado",
    monthly: null,
    annual: null,
    custom: true,
    highlighted: false,
    cta: "Cotizar Ahora",
    features: [
      "Todo lo del plan Básico",
      "Módulos avanzados de ventas",
      "Control de inventario completo",
      "Tesorería avanzada",
      "Informes gerenciales",
      "Personalización mejorada",
      "Soporte técnico prioritario",
    ],
    ctaMonthlyUrl: null,
    ctaAnnualUrl:
      "https://api.whatsapp.com/send/?phone=51987286231&text=Hola%2C+quisiera+una+COTIZACI%C3%93N+PERSONALIZADA+del+PLAN+AVANZADO+ANUAL+del+Software+ERP+Integrado+web.%0A%C2%BFPodr%C3%ADan+asesorarme+sobre+las+funcionalidades+y+adaptaciones+que+incluye%3F&type=phone_number&app_absent=0",
  },
];

const demoData = {
  title: "¿Listo para transformar ",
  title2: "tu negocio?",
  description:
    "No esperes más, transforma tu negocio hoy mismo con nuestro sistema ERP todo en uno, diseñado para simplificar tus operaciones y potenciar tu crecimiento.",
  button: "Hablanos de tu negocio",
  route:
    "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C%20me%20gustar%C3%ADa%20evaluar%20el%20Software%20de%20ERP%20Integrado.%0D%0A%C2%BFQu%C3%A9%20%C3%A1reas%20cubre%20%28ventas%2C%20compras%2C%20inventarios%2C%20contabilidad%29%20y%20c%C3%B3mo%20se%20adapta%20a%20mi%20negocio%3F%20%C2%BFPuedo%20agendar%20una%20demo%20de%2015%20d%C3%ADas%20y%20recibir%20precios%3F%0D%0AGracias.&type=phone_number&app_absent=0",
};

export default async function SistemaIntegrado() {
  const keywords = await getPageKeywords('erp');
  
  return (
    <>
      <Navbar />
      <div className="container pt-4">
        <Hero
          logoLight="/images/integrado/visualERP.webp"
          logoDark="/images/integrado/visualERP-b.webp"
          heroImageSrc="/images/integrado/integrado-image.webp"
          serviceName="Sistema ERP Integrado"
          title="Optimiza tu gestión financiera con nuestro"
          titleColored="Sistema ERP"
          content="ERP integrado que conecta todas las áreas, optimiza recursos y centraliza la información de clientes, ofreciendo análisis avanzados para mejorar la gestión y la toma de decisiones."
          button="Contáctanos"
        />
        <Features
          title="Descubre las funcionalidades mas importantes del "
          coloredTitle="Sistema ERP"
          description="Ofrecemos una variedad de servicios para optimizar la gestión integrada de tu empresa."
          services={services}
        />
        <Capabilities
          service="VisualERP"
          coloredTitle="Repotencia todas las gestiones de tu negocio"
          capabilities={capabilitiesData}
        />
        <Pricing plans={plans} hasMonthly={false} hasAnnual={true} />
        <Demo data={demoData} />
      </div>
      <Footer />

      {/* Grupo de Iconos*/}
      <IconsGroup />

      {/* JSON-LD: ERP Integrado + planes */}
      <Script
        id="ld-software-erp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "VisualERP - ERP Integrado",
            "keywords": formatKeywordsForSchema(keywords),
            "about": formatKeywordsAsThings(keywords),
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "ERP web para empresas: almacén e inventarios (KARDEX SUNAT), ventas y facturación, compras y CxP, tesorería y bancos, cierre contable y multiempresa.",
            url: "https://grupovisualcont.com/erp",
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
            brand: { "@type": "Brand", name: "VisualERP" },
            featureList: [
              "Almacén e inventario con KARDEX SUNAT",
              "Ventas y facturación (cotizaciones, guías, notas)",
              "Compras y cuentas por pagar",
              "Tesorería y bancos (pagos, cheques, transferencias)",
              "Cierre contable y reportes gerenciales",
              "Multiempresa y trabajo en red",
              "100% web con base de datos SQL",
            ],
            offers: {
              "@type": "OfferCatalog",
              name: "Planes de VisualERP",
              url: "https://grupovisualcont.com/erp#pricing",
              itemListElement: [
                {
                  "@type": "Offer",
                  name: "Básico anual",
                  priceCurrency: "PEN",
                  price: 2160,
                  url: "https://api.whatsapp.com/send/?phone=51987286231",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
                {
                  "@type": "Offer",
                  name: "Custom",
                  priceCurrency: "PEN",
                  price: 0,
                  url: "https://api.whatsapp.com/send/?phone=51987286231",
                  availability: "https://schema.org/InStock",
                  eligibleRegion: "PE",
                  category: "subscription",
                },
              ],
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              url: "https://grupovisualcont.com/erp",
            },
          }),
        }}
      />

      {/* JSON-LD: Describe la página y sus secciones */}
      <Script
        id="ld-webpage-erp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://grupovisualcont.com/erp#webpage",
            url: "https://grupovisualcont.com/erp",
            name: "Software ERP Integrado | VisualERP",
            description:
              "ERP web con inventarios, ventas, compras, tesorería y cierre contable. Multiempresa y escalable.",
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
                url: "https://grupovisualcont.com/erp#hero",
                description: "Propuesta de valor y llamada a la acción.",
              },
              {
                "@type": "WebPageElement",
                name: "Características",
                url: "https://grupovisualcont.com/erp#features",
                description:
                  "Inventario (KARDEX SUNAT), ventas y facturación, compras y CxP, tesorería y bancos, cierre contable.",
              },
              {
                "@type": "WebPageElement",
                name: "Capacidades",
                url: "https://grupovisualcont.com/erp#capabilities",
                description:
                  "Soporte especializado, plataforma escalable y seguridad en la nube.",
              },
              {
                "@type": "WebPageElement",
                name: "Precios",
                url: "https://grupovisualcont.com/erp#pricing",
                description:
                  "Planes Básico, Mype y Pyme en modalidad mensual y anual.",
              },
              {
                "@type": "WebPageElement",
                name: "Demo",
                url: "https://grupovisualcont.com/erp#demo",
                description:
                  "WhatsApp para solicitar demo gratuita de 15 días.",
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: Migas de pan */}
      <Script
        id="ld-breadcrumbs-erp"
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
                name: "ERP Integrado",
                item: "https://grupovisualcont.com/erp",
              },
            ],
          }),
        }}
      />
    </>
  );
}
