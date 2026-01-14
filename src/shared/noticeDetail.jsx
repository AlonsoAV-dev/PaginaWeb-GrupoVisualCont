import Navbar from "@/shared/navbar";
import Footer from "@/shared/footer";
import Link from "next/link";
import WhatsAppFab from "@/shared/whatsappFab";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import NoticeAuthorCard from "./noticeAuthorCard";
import { sidebarImages, visualSolutions } from "../../lib/utils";

function NoticeDetail({ selectedNotice }) {
  return (
    <>
      <Navbar />
      <div className="container pt-4">
        {/* Seccion de titulo */}
        <Link
          href="/noticias"
          className="inline-flex items-center text-gray-400 hover:text-[#0070F2] mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Regresar a Noticias
        </Link>

        {/* Seccion de contenido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Primera Columna */}
          <div className="lg:col-span-2">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-8 flex items-center justify-center">
              <Image
                src={selectedNotice.mainImage || "/images/placeholder.jpg"}
                alt={selectedNotice.title || "Visual Notice"}
                width={1200}
                height={675}
                className="max-w-full h-auto object-contain max-h-[600px]"
                priority
              />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: selectedNotice.content }}
              />
            </div>
            <NoticeAuthorCard selectedAuthor={selectedNotice.author} />
          </div>

          {/* Segunda Columna */}
          <div className="lg:col-span-1">
            {/* Titulo */}
            <div className="card bg-white dark:bg-[#272829] p-6 rounded-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {selectedNotice.title}
                  </h1>
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedNotice.shortDescription}
                  </p>
                </div>
              </div>

              {selectedNotice.projectUrl && (
                <a
                  href={selectedNotice.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#1f4c8f] text-white rounded-lg text-base font-medium hover:bg-[#00AEEF] transition-colors"
                >
                  Mas información
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Categorias
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedNotice.categories
                    ?.filter((cat) => cat !== "all")
                    .map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-800 dark:text-gray-200"
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                    ))}
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Fecha de publicación
                </h3>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-800 dark:text-gray-200">
                  {selectedNotice.pubDate}
                </span>
              </div>
            </div>
            {/* Promociones */}
            <div className="hidden md:block">
              <div className="overflow-hidden grid grid-cols-1 gap-4 pt-8">
                <div className="bg-[#257CD0] text-center text-white rounded-bl-xl rounded-tr-xl">
                  <h2 className="text-lg py-2 font-semibold">
                    ¡Lo mejor para tu negocio!
                  </h2>
                </div>
                <div className="w-full overflow-hidden">
                  <div className="solutions-fade">
                    {visualSolutions.map((solution, index) => (
                      <div key={index} className="solutions-fade__slide">
                        <Link
                          href={solution.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          type="button"
                        >
                          <Image
                            className="w-full"
                            src={solution.src}
                            alt={solution.alt}
                            width={400}
                            height={0}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#257CD0] text-center text-white rounded-bl-xl rounded-tr-xl">
                  <h2 className="text-lg py-2 font-semibold">
                    ¿Quienes nos apoyan?
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {sidebarImages.map((image, index) => (
                    <div key={index} className="w-full overflow-hidden">
                      <Link
                        href={image.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        type="button"
                      >
                        <Image
                          className="image-sidebar"
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          width={400}
                          height={0}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <WhatsAppFab />
    </>
  );
}

export default NoticeDetail;
