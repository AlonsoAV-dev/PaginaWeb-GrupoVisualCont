import NoticeDetail from "@/shared/noticeDetail";
import { notFound } from "next/navigation";
import Script from "next/script";

async function getNoticia(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/noticias/slug/${slug}`,
      {
        next: { 
          revalidate: 300, // Revalidar cada 5 minutos
          tags: [`noticia-${slug}`] // Tag para revalidación bajo demanda
        }
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.noticia;
  } catch (error) {
    console.error('Error fetching noticia:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const noticia = await getNoticia(slug);

  if (!noticia) {
    return {
      title: "Pagina No Existente | Visual Noticias",
      description: "La pagina indicada no existe.",
      alternates: { canonical: "/noticias" },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    title: `${noticia.titulo} | Visual Noticias`,
    description: noticia.descripcion_corta || noticia.titulo,
    alternates: {
      canonical: `/noticias/${noticia.slug}`,
    },
    openGraph: {
      title: `${noticia.titulo} | Visual Noticias`,
      description: noticia.descripcion_corta || noticia.titulo,
      url: `/noticias/${noticia.slug}`,
      type: "article",
      siteName: "Visual ERP",
      locale: "es_PE",
      authors: [noticia.autor_nombre || "Visual ERP"],
      images: noticia.imagen_principal ? [noticia.imagen_principal] : [],
    },

    twitter: {
      card: "summary_large_image",
      title: `${noticia.titulo}`,
      description: noticia.descripcion_corta || noticia.titulo,
      images: noticia.imagen_principal ? [noticia.imagen_principal] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Detail({ params }) {
  const { slug } = await params;
  const noticia = await getNoticia(slug);

  if (!noticia) {
    notFound();
  }

  const abs = (p) =>
    p?.startsWith("http") ? p : `https://www.grupovisualcont.com${p || ""}`;

  return (
    <>
      <NoticeDetail selectedNotice={noticia} />

      <Script
        id="ld-news-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            mainEntityOfPage: abs(`/noticias/${noticia.slug}`),
            headline: noticia.titulo,
            description: noticia.descripcion_corta || noticia.titulo,
            author: { "@type": "Person", name: noticia.autor_nombre || "Visual ERP" },
            publisher: {
              "@type": "Organization",
              name: "Visual ERP",
              logo: {
                "@type": "ImageObject",
                url: abs("/images/Logos/LogVBlancoRelleno.svg"),
              },
            },
            datePublished: noticia.fecha_publicacion || noticia.creado_en,
            dateModified: noticia.creado_en,
          }),
        }}
      />

      <Script
        id="ld-breadcrumbs-article"
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
              {
                "@type": "ListItem",
                position: 3,
                name: noticia.titulo,
                item: `https://grupovisualcont.com/noticias/${noticia.slug}`,
              },
            ],
          }),
        }}
      />
    </>
  );
}
