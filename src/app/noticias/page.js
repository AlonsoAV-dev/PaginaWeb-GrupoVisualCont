import Navbar from "@/shared/navbar";
import Footer from "@/shared/footer";
import IconsGroup from "@/shared/iconsGroup";
import Notices from "@/components/notices/notices";
import Script from "next/script";

export const metadata = {
  title: "Noticias | Visual ERP",
  description:
    "Visual ERP - Noticias y Novedades: Mantente informado con las últimas noticias sobre contabilidad, laboral, tributarias y tecnologias. Accede a esta informacion de calidad!",
  alternates: { canonical: "/noticias" },
  openGraph: {
    type: "website",
    url: "/noticias",
    title: "Noticias | Visual ERP",
    description:
      "Visual ERP - Noticias y Novedades: Mantente informado con las últimas noticias sobre contabilidad, laboral, tributarias y tecnologias. Accede a esta informacion de calidad!",
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
    title: "Noticias | Visual ERP",
    description:
      "Visual ERP - Noticias y Novedades: Mantente informado con las últimas noticias sobre contabilidad, laboral, tributarias y tecnologias. Accede a esta informacion de calidad!",
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

function Noticias() {
  return (
    <>
      <Navbar />
      <div className="container pt-4">
        <Notices />
      </div>
      <Footer />

      {/* Grupo de Iconos*/}
      <IconsGroup />

      <Script
        id="ld-breadcrumbs-news"
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
                name: "Noticias",
                item: "https://grupovisualcont.com/noticias",
              },
            ],
          }),
        }}
      />
      
    </>
  );
}

export default Noticias;
