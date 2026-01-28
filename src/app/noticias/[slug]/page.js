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

  // Extraer keywords como array de strings
  const keywordsList = noticia.keywords?.map(k => k.nombre) || [];
  const keywordsString = keywordsList.join(", ");

  return {
    title: `${noticia.titulo} | Visual Noticias`,
    description: noticia.descripcion_corta || noticia.titulo,
    alternates: {
      canonical: `/noticias/${noticia.slug}`,
    },
    openGraph: {
      title: `${noticia.titulo} | Visual Noticias`,
      description: noticia.descripcion_corta || noticia.titulo,
      url: `https://grupovisualcont.com/noticias/${noticia.slug}`,
      type: "article",
      siteName: "Visual ERP",
      locale: "es_PE",
      authors: [noticia.autor_nombre || "Visual ERP"],
      publishedTime: noticia.fecha_publicacion || noticia.creado_en,
      modifiedTime: noticia.fecha_publicacion || noticia.creado_en,
      section: noticia.categoria_nombre || "Noticias",
      tags: keywordsList,
      images: noticia.imagen_principal
        ? [
            {
              url: `https://grupovisualcont.com${noticia.imagen_principal}`,
              width: 1200,
              height: 630,
              alt: noticia.titulo,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: `${noticia.titulo}`,
      description: noticia.descripcion_corta || noticia.titulo,
      images: noticia.imagen_principal
        ? [`https://grupovisualcont.com${noticia.imagen_principal}`]
        : [],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    other: {
      "article:published_time": noticia.fecha_publicacion || noticia.creado_en,
      "article:author": noticia.autor_nombre || "Visual ERP",
      "article:section": noticia.categoria_nombre || "Noticias",
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

  // Extraer keywords para Schema
  const keywordsList = noticia.keywords?.map(k => k.nombre) || [];

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
            image: noticia.imagen_principal ? abs(noticia.imagen_principal) : undefined,
            datePublished: noticia.fecha_publicacion || noticia.creado_en,
            dateModified: noticia.fecha_publicacion || noticia.creado_en,
            author: {
              "@type": "Person",
              name: noticia.autor_nombre || "Visual ERP",
            },
            publisher: {
              "@type": "Organization",
              name: "Visual ERP",
              logo: {
                "@type": "ImageObject",
                url: abs("/images/Logos/LogVBlancoRelleno.svg"),
              },
            },
            keywords: keywordsList.join(", "),
            articleSection: noticia.categoria_nombre || "Noticias",
            inLanguage: "es-PE",
            about: keywordsList.map(keyword => ({
              "@type": "Thing",
              name: keyword
            })),
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
