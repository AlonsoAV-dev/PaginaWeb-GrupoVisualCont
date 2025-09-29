import Navbar from "@/shared/navbar";
import Footer from "@/shared/footer";
import Form from "@/components/quote/form";
import Faq from "@/shared/faq";
import WhatsAppFab from "@/shared/whatsappFab";
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
        url: "https://www.softwarecontableerp.com/images/logos/LogVBlancoRelleno.svg",
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

function Cotizar() {
  return (
    <>
      <Navbar />
      <div className="container pt-4">
        <Form />
        <Faq />
      </div>
      <Footer />

      {/* Whatsapp Icono Flotante */}
      <WhatsAppFab href="https://wa.me/51956703375?text=Hola%2C%20%C2%BFMe%20puede%20explicar%20como%20el%20sistema%20me%20puede%20dar%20mejores%20resultados%3F%20%C2%BFMe%20podr%C3%ADa%20agendar%20una%20demo%3F%20Much%C3%ADsimas%20gracias" />

      {/* JSON-LD: Contact/Quote Page + secciones */}
      <Script
        id="ld-contactpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "@id": "https://www.softwarecontableerp.com/cotizar#contact",
            url: "https://www.softwarecontableerp.com/cotizar",
            name: "Cotizar | Visual ERP",
            description:
              "Página de cotización para solicitar una propuesta personalizada de Visual ERP.",
            inLanguage: "es-PE",
            isPartOf: {
              "@type": "WebSite",
              name: "Visual ERP",
              url: "https://www.softwarecontableerp.com/",
            },
            hasPart: [
              {
                "@type": "WebPageElement",
                name: "Formulario de cotización",
                url: "https://www.softwarecontableerp.com/cotizar#quote-form",
                description:
                  "Formulario para enviar tus datos y recibir una propuesta personalizada.",
              },
              {
                "@type": "FAQPage",
                name: "Preguntas frecuentes",
                url: "https://www.softwarecontableerp.com/cotizar#faq",
                mainEntity: [], // si tu componente FAQ ya inyecta JSON-LD de FAQPage, déjalo vacío aquí
              },
            ],
            potentialAction: {
              "@type": "SubmitAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://www.softwarecontableerp.com/api/formulario", // ajusta a tu endpoint real
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
                item: "https://www.softwarecontableerp.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Cotizar",
                item: "https://www.softwarecontableerp.com/cotizar",
              },
            ],
          }),
        }}
      />
    </>
  );
}

export default Cotizar;
