import NoticeDetail from "@/shared/noticeDetail";
import { NoticeData } from "../../../../lib/utils";
import { notFound } from "next/navigation";
import Script from "next/script";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const notice = NoticeData.find((item) => item.slug === slug);

  if (!notice) {
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
    title: `${notice.title} | Visual Noticias`,
    description: notice.shortDescription,
    alternates: {
      canonical: `/noticias/${notice.slug}`,
    },
    openGraph: {
      title: `${notice.title} | Visual Noticias`,
      description: notice.shortDescription,
      url: `/noticias/${notice.slug}`,
      type: "article",
      siteName: "Visual ERP",
      locale: "es_PE",
      authors: ["Visual ERP"],
    },

    twitter: {
      card: "summary_large_image",
      title: `${notice.title}`,
      description: `${notice.description}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Detail({ params }) {
  const { slug } = await params;
  const notice = NoticeData.find((item) => item.slug === slug);

  if (!notice) {
    notFound();
  }

  const abs = (p) =>
    p?.startsWith("http") ? p : `https://www.grupovisualcont.com${p || ""}`;

  return (
    <>
      <NoticeDetail selectedNotice={notice} />

      <Script
        id="ld-news-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            mainEntityOfPage: abs(`/noticias/${notice.slug}`),
            headline: notice.title,
            description: notice.description,
            author: { "@type": "Organization", name: "Visual ERP" },
            publisher: {
              "@type": "Organization",
              name: "Visual ERP",
              logo: {
                "@type": "ImageObject",
                url: abs("/images/Logos/LogVBlancoRelleno.svg"),
              },
            },
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
                name: notice.title,
                item: `https://grupovisualcont.com/noticias/${notice.slug}`,
              },
            ],
          }),
        }}
      />
    </>
  );
}

export function generateStaticParams() {
  const noticeData = NoticeData;

  return noticeData.map((item) => ({
    slug: item.slug,
  }));
}
