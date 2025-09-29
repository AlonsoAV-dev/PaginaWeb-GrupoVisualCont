import Navbar from "@/shared/navbar";
import Footer from "@/shared/footer";
import HeroCardCarousel from "../../shared/heroCardCarousel";
import Demo from "../../shared/demo";
import Info from "@/components/aboutUs/info";
import About from "@/components/aboutUs/about";
import WhatsAppFab from "@/shared/whatsappFab";
import Certificates from "@/shared/certificates";
import TimeLine from "@/components/aboutUs/timeLine";
import Script from "next/script";

export const metadata = {
  title: "Nosotros | Visual ERP",
  description:
    "Conoce al equipo detrás de Visual ERP: nuestra historia, misión y compromiso con la innovación para pymes en Perú y LATAM.",
  alternates: {
    canonical: "/nosotros",
  },
  keywords: [
    "Visual ERP",
    "equipo",
    "historia",
    "nosotros",
    "mision",
    "vision",
    "Perú",
    "LATAM",
  ],
  openGraph: {
    type: "website",
    url: "/nosotros",
    title: "Nosotros | Visual ERP",
    description:
      "Somos un equipo apasionado por la tecnología que impulsa la eficiencia de las pymes.",
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
    title: "Nosotros | Visual ERP",
    description:
      "Conoce quiénes somos y cómo ayudamos a pymes a crecer con tecnología.",
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

const demoData = {
  title: "¡Ya nos conoces! Ahora ",
  title2: "nos gustaría conocer acerca de ti",
  button: "Háblanos de tu negocio",
  route:
    "https://wa.me/51956703375?text=Hola%2C%20%C2%BFMe%20puede%20explicar%20c%C3%B3mo%20el%20sistema%20me%20puede%20dar%20mejores%20resultados%3F%20%C2%BFMe%20podr%C3%ADa%20agendar%20una%20demo%3F%20Much%C3%ADsimas%20gracias",
};

const dataLine = [
  {
    date: "1999",
    title: "Inicios de VisualCONT",
    description:
      "En 1999, Roberto Maldonado y un grupo de socios, entre ingenieros y contadores públicos de Lima, con experiencia en tecnología de la información, obligaciones tributarias, laborales y administración de empresas, se unen e inician el desarrollo de un software adaptado al Perú, que sea práctico, rápido, seguro y, sobre todo, a un precio accesible, ya que en esos tiempos solo existían software complejos de usar y con precios demasiado altos que solo muy pocos podían implementar.",
  },
  {
    date: "2007",
    title: "Planilla Electrónica",
    description:
      "El año 2007 empezamos a actualizar el software VISUALPLAN, planilla de trabajadores, con la planilla electrónica de SUNAT y del Ministerio de Trabajo (T-Registro y PLAME). De esta forma se estaba digitalizando el área de Recursos Humanos. Luego hicimos campañas de educación sobre el uso de esta nueva herramienta electrónica por todo el Perú.",
  },
  {
    date: "2010",
    title: "Libros electrónicos y portal SUNAT",
    description:
      "El año 2010, el software de Contabilidad VISUALCONT se actualizó a las normas tributarias, que exigían un nuevo formato electrónico para la presentación de los libros de contabilidad. Hubo contratiempos para los contribuyentes por ser una nueva forma de trabajo y, además, con tecnología. Una vez más, hicimos campañas educativas para explicar con más detalle el funcionamiento de estos aplicativos.",
  },
  {
    date: "2012",
    title: "Factura Electrónica SEE y SUNAT",
    description:
      "El año 2012 nace, por ley, la nueva obligación de emitir comprobantes de pago en formato electrónico y muchos de nuestros clientes nos solicitaron desarrollar el software que cumpliera con estos requerimientos tributarios, ya que ingresaron a Perú muchas empresas extranjeras que hacían el trabajo con precios para empresas grandes y ahí entramos nosotros con costos para la gran mayoría de negocios peruanos.",
  },
  {
    date: "2025",
    title: "Nueva era tecnológica: IA",
    description:
      "Ahora, con la inteligencia artificial, estamos automatizando las operaciones de los negocios, desde el área de logística, compras y almacén hasta ventas, tesorería y contabilidad, para que sea más evidente el “Ahorro de tiempo y dinero”.",
  },
];

export default function Nosotros() {
  return (
    <>
      <Navbar />
      <div className="container">
        <HeroCardCarousel
          className={"card mt-8 mb-3 relative overflow-hidden shadow-md"}
          title={"Somos el equipo que promueve el "}
          titleBlue={"crecimiento sostenible "}
          title2={"de los negocios"}
          contentDescription={
            "Creemos en la fuerza de la innovación para transformar cómo las pymes gestionan su negocio día a día. Somos un equipo apasionado por la tecnología y la eficiencia, dedicados a brindar herramientas que simplifican la gestión empresarial."
          }
          imageSrc="/images/nosotros/nosotros-hero.webp"
        />
        <Info />
        <About />
        <TimeLine items={dataLine} />
        <Certificates />
        <Demo data={demoData} />
      </div>
      <Footer />

      {/* Whatsapp Icono Flotante */}
      <WhatsAppFab href="https://wa.me/51956703375?text=Hola%2C%20%C2%BFMe%20puede%20explicar%20como%20el%20sistema%20me%20puede%20dar%20mejores%20resultados%3F%20%C2%BFMe%20podr%C3%ADa%20agendar%20una%20demo%3F%20Much%C3%ADsimas%20gracias" />

      {/* JSON-LD: Organización */}
      <Script
        id="ld-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Visual ERP",
            url: "https://www.softwarecontableerp.com/",
            logo: "https://www.softwarecontableerp.com/images/logos/LogVBlancoRelleno.svg",
            sameAs: [
              "https://www.linkedin.com/company/visual-cont/",
              "https://www.facebook.com/grupovisualpe/",
              "https://www.tiktok.com/@visual.cont",
              "https://www.youtube.com/channel/UCN6KpWLS895oDv2ifk1nKgA",
              "https://www.instagram.com/visualperuoficial/",
            ],
            brand: { "@type": "Brand", name: "Visual" },
            areaServed: "PE",
          }),
        }}
      />

      {/* JSON-LD: AboutPage + secciones */}
      <Script
        id="ld-aboutpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": "https://www.softwarecontableerp.com/nosotros#about",
            url: "https://www.softwarecontableerp.com/nosotros",
            name: "Nosotros | Visual ERP",
            description:
              "Nuestra historia, misión, valores y equipo que impulsa la productividad de las pymes.",
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
                url: "https://www.softwarecontableerp.com/nosotros#hero",
                description: "Presentación y propuesta de valor del equipo.",
              },
              {
                "@type": "WebPageElement",
                name: "Info",
                url: "https://www.softwarecontableerp.com/nosotros#info",
                description: "Misión, visión y valores.",
              },
              {
                "@type": "WebPageElement",
                name: "Sobre nosotros",
                url: "https://www.softwarecontableerp.com/nosotros#about",
                description: "Quiénes somos y cómo trabajamos.",
              },
              {
                "@type": "WebPageElement",
                name: "Línea de tiempo",
                url: "https://www.softwarecontableerp.com/nosotros#timeline",
                description: "Hitos principales de la empresa.",
              },
              {
                "@type": "WebPageElement",
                name: "Certificaciones",
                url: "https://www.softwarecontableerp.com/nosotros#certificates",
                description: "Integraciones y acreditaciones.",
              },
              {
                "@type": "WebPageElement",
                name: "Demo",
                url: "https://www.softwarecontableerp.com/nosotros#demo",
                description: "Contacto para solicitar una demo.",
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: Migas de pan */}
      <Script
        id="ld-breadcrumbs-about"
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
                name: "Nosotros",
                item: "https://www.softwarecontableerp.com/nosotros",
              },
            ],
          }),
        }}
      />
    </>
  );
}
