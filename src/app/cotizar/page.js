import Navbar from "@/shared/navbar";
import Footer from "@/shared/footer";
import Form from "@/components/quote/form";
import Faq from "@/shared/faq";
import IconsGroup from "@/shared/iconsGroup";
import Script from "next/script";

export const metadata = {
  title: "Cotizar | Visual ERP",
  description:
    "Solicita una cotización personalizada de Visual ERP. Te ayudamos a elegir el plan y módulos adecuados para tu empresa.",
  alternates: { canonical: "/cotizar" },
  openGraph: {
    type: "website",
    url: "/cotizar",
    title: "Cotizar | Visual ERP",
    description:
      "Completa el formulario para recibir una propuesta a medida: contabilidad, facturación, planillas y ERP integrado.",
    images: [
      {
        url: "/images/banner/visualBanner.jpg",
        alt: "Visual ERP",
      },
    ],
    siteName: "Visual ERP",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cotizar | Visual ERP",
    description:
      "Pide tu cotización personalizada de Visual ERP para tu empresa.",
    images: ["/images/banner/visualBanner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

function Cotizar() {
  return (
    <>
      <Navbar />
      <div className="container pt-4">
        <Form />
        <Faq />
      </div>
      <Footer />

      {/* Grupo de Iconos*/}
      <IconsGroup />

      {/* JSON-LD: Contact/Quote Page + secciones */}
      <Script
        id="ld-contactpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": "https://grupovisualcont.com/cotizar#contact",
            url: "https://grupovisualcont.com/cotizar",
            name: "Cotizar | Visual ERP",
            description:
              "Página de cotización para solicitar una propuesta personalizada de Visual ERP.",
            inLanguage: "es-PE",
            isPartOf: {
              "@type": "WebSite",
              name: "Visual ERP",
              url: "https://grupovisualcont.com/",
            },
            hasPart: [
              {
                "@type": "WebPageElement",
                name: "Formulario de cotización",
                url: "https://grupovisualcont.com/cotizar#quote-form",
                description:
                  "Formulario para enviar tus datos y recibir una propuesta personalizada.",
              },
              {
                "@type": "FAQPage",
                name: "Preguntas frecuentes",
                url: "https://grupovisualcont.com/cotizar#faq",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "¿El software cumple con las normativas fiscales según SUNAT?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "<p>Sí, nuestro software cumple al 100% con las normativas fiscales establecidas por la SUNAT (Superintendencia Nacional de Administración Tributaria del Perú). Está diseñado y actualizado continuamente para adaptarse a los requisitos tributarios vigentes.</p>",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿El software está actualizado conforme a las últimas disposiciones de SUNAT sobre el SIRE?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "<p>Sí, nuestro sistema se actualiza automáticamente para cumplir con los cambios normativos y garantizar que siempre estés en regla.</p>",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿El sistema calcula automáticamente IGV, detracciones, percepciones y retenciones?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "<p>Sí, puedes configurar estos conceptos para que el sistema los aplique automáticamente en las operaciones.</p>",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Puedo personalizar los reportes o comprobantes?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "<p>Sí, puedes personalizar los formatos de comprobantes (con tu logo, colores, datos), y también configurar reportes y de gestión según tus necesidades.</p>",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Funciona en la nube o es local?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "<p>Ofrecemos ambas opciones: versión en la nube (para acceder desde cualquier lugar) y versión local (instalada en tu equipo). Tú eliges la que prefieras.</p>",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Puedo usarlo si tengo un negocio pequeño o recién estoy empezando?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "<p>Claro que sí. Tenemos planes diseñados especialmente para emprendedores y pequeñas empresas que necesitan una solución simple, eficiente y económica.</p>",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Entregan manuales o material de apoyo?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "<p>Sí, incluimos manuales, videotutoriales y acceso a nuestra base de conocimientos en línea.</p>",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Qué necesito para empezar a usar el software?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "<p>Solo necesitas definir el plan que se ajuste a tu negocio, brindarnos algunos datos básicos y ¡listo! Agendamos la instalación y capacitación.</p>",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "¿Puedo ver una demostración antes de comprar?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "<p>Sí, puedes solicitar una demo gratuita para ver el sistema en funcionamiento y resolver todas tus dudas.</p>",
                    },
                  },
                ],
              },
            ],
            potentialAction: {
              "@type": "SubmitAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://visual-api-gray.vercel.app/api/formulario",
                actionPlatform: [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform",
                ],
              },
              name: "Enviar cotización",
              description:
                "Envía tu solicitud para recibir una cotización y asesoría personalizada.",
            },
          }),
        }}
      />

      {/* JSON-LD: Migas de pan */}
      <Script
        id="ld-breadcrumbs-quote"
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
                name: "Cotizar",
                item: "https://grupovisualcont.com/cotizar",
              },
            ],
          }),
        }}
      />
    </>
  );
}

export default Cotizar;
