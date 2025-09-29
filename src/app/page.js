// app/page.js
import Navbar from "@/shared/navbar";
import Hero from "@/components/home/hero";
import CTA from "@/components/home/cta";
import Products from "@/components/home/products";
import Certificates from "@/shared/certificates";
import Clients from "@/shared/clients";
import Demo from "@/shared/demo";
import Testimonials from "@/components/home/testimonials";
import Footer from "@/shared/footer";
import WhatsAppFab from "@/shared/whatsappFab";
import Script from "next/script";

export const metadata = {
  title: "Software Contable Visual | Eficiencia y Seguridad",
  description:
    "Administra contabilidad, informes SUNAT, tesorería y más. Todo automatizado y adaptable a tu empresa.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "VisualERP en el Perú: contabilidad, facturación, sistema de planillas, y ERP integrado.",
    url: "/",
    images: [
      {
        url: "https://www.softwarecontableerp.com/images/logos/LogVBlancoRelleno.svg",
      },
    ],
  },
  twitter: {
    title: "Software Contable Visual | Eficiencia y Seguridad",
    images: [
      "https://www.softwarecontableerp.com/images/logos/LogVBlancoRelleno.svg",
    ],
    card: "summary_large_image"
  },
};

const demoData = {
  title: "¿Listo para transformar ",
  title2: "tu negocio?",
  description:
    "No esperes más: transforma tu negocio hoy mismo con nuestro sistema ERP todo en uno, diseñado para simplificar tus operaciones y potenciar tu crecimiento.",
  button: "Háblanos de tu negocio",
  route:
    "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+estoy+interesado%28a%29+en+acceder+a+la+demo+gratuita+de+15+d%C3%ADas.%0D%0A%0D%0A%C2%BFPodr%C3%ADa+indicarme+si+es+posible+acceder+y+explicarme+con+m%C3%A1s+detalle+sobre+los+servicios+disponibles%3F%0D%0A-+Contabilidad%0D%0A-+Facturaci%C3%B3n%0D%0A-+Planillas%0D%0A-+ERP%0D%0AMuchas+gracias.&type=phone_number&app_absent=0",
  image: "/images/home/demo-business-men.webp",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Hero />
        <CTA />
        <Products />
        <Certificates />
        <Clients />
        <Demo data={demoData} />
        <Testimonials />
      </div>
      <Footer />

      {/* WhatsApp: ícono flotante */}
      <WhatsAppFab href="https://wa.me/51956703375?text=Hola%2C%20%C2%BFme%20puede%20explicar%20c%C3%B3mo%20el%20sistema%20me%20puede%20dar%20mejores%20resultados%3F%20%C2%BFMe%20podr%C3%ADa%20agendar%20una%20demo%3F%20Much%C3%ADsimas%20gracias" />

      {/* JSON-LD: describe la página y sus secciones (no cambia tus h1/h2/p) */}
      <Script
        id="ld-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://www.softwarecontableerp.com/",
            url: "https://www.softwarecontableerp.com/",
            logo: "https://www.softwarecontableerp.com/images/logos/LogVBlancoRelleno.svg",
            name: "Visual - Sistema ERP",
            description:
              "ERP con contabilidad, facturación electrónica, planillas y tesorería. Cumplimiento SUNAT y automatización.",
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
                url: "https://www.softwarecontableerp.com/#hero",
                description:
                  "Propuesta de valor y llamada a la acción para agendar demo.",
              },
              {
                "@type": "WebPageElement",
                name: "CTA",
                url: "https://www.softwarecontableerp.com/#cta",
                description:
                  "Sección de beneficios rápidos y botón de contacto.",
              },
              {
                "@type": "WebPageElement",
                name: "Productos",
                url: "https://www.softwarecontableerp.com/#products",
                description:
                  "Módulos: contabilidad, facturación, sistema de planillas y ERP integrado.",
              },
              {
                "@type": "WebPageElement",
                name: "Certificaciones",
                url: "https://www.softwarecontableerp.com/#certificates",
                description: "Acreditaciones e integraciones (incluida SUNAT).",
              },
              {
                "@type": "WebPageElement",
                name: "Clientes",
                url: "https://www.softwarecontableerp.com/#clients",
                description: "Logos de empresas y sectores atendidos.",
              },
              {
                "@type": "WebPageElement",
                name: "Demo",
                url: "https://www.softwarecontableerp.com/#demo",
                description:
                  "Formulario/WhatsApp para solicitar demo de 15 días.",
              },
              {
                "@type": "WebPageElement",
                name: "Testimonios",
                url: "https://www.softwarecontableerp.com/#testimonials",
                description: "Opiniones de clientes y casos de éxito.",
              },
            ],
          }),
        }}
      />

      {/* JSON-LD opcional: si tu sección de Productos lista módulos, márcala como OfferCatalog */}
      <Script
        id="ld-offercatalog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "Visual ERP - Módulos",
            url: "https://https://www.softwarecontableerp.com/#products",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Contabilidad",
                  areaServed: "PE",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Facturación electrónica",
                  areaServed: "PE",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Planillas",
                  areaServed: "PE",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "ERP Integrado",
                  areaServed: "PE",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
