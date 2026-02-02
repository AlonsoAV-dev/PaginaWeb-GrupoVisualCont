import Navbar from "@/shared/navbar";
import Footer from "@/shared/footer";
import Link from "next/link";
import WhatsAppFab from "@/shared/whatsappFab";
import Image from "next/image";
import { ArrowLeft, ExternalLink } from "lucide-react";
import NoticeAuthorCard from "./noticeAuthorCard";
import { sidebarImages, visualSolutions } from "../../lib/Utils";
import CommentList from "@/components/notices/CommentList";
import CommentForm from "@/components/notices/CommentForm";
import QuickLogin from "@/components/notices/quickLogin";

// Función helper para decodificar entidades HTML
function decodeHTMLEntities(text) {
  if (!text) return text;
  
  const entidades = {
    '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
    '&#39;': "'", '&apos;': "'",
    '&aacute;': 'á', '&eacute;': 'é', '&iacute;': 'í', '&oacute;': 'ó', '&uacute;': 'ú',
    '&Aacute;': 'Á', '&Eacute;': 'É', '&Iacute;': 'Í', '&Oacute;': 'Ó', '&Uacute;': 'Ú',
    '&ntilde;': 'ñ', '&Ntilde;': 'Ñ',
    '&uuml;': 'ü', '&Uuml;': 'Ü',
    '&iexcl;': '¡', '&iquest;': '¿',
    '&deg;': '°', '&copy;': '©', '&reg;': '®', '&euro;': '€',
  };
  
  let decoded = text;
  // Reemplazar entidades nombradas
  decoded = decoded.replace(/&[a-zA-Z]+;/g, (match) => entidades[match] || match);
  // Reemplazar entidades numéricas
  decoded = decoded.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
  decoded = decoded.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
  
  return decoded;
}

function NoticeDetail({ selectedNotice }) {
  const formatFecha = (fecha) => {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
                src={selectedNotice.imagen_principal || "/images/placeholder.jpg"}
                alt={selectedNotice.titulo || "Visual Notice"}
                width={1200}
                height={675}
                className="max-w-full h-auto object-contain max-h-[600px]"
                priority
              />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: selectedNotice.contenido }}
              />
            </div>
            {selectedNotice.autor_nombre && (
              <NoticeAuthorCard selectedAuthor={{
                name: selectedNotice.autor_nombre,
                email: selectedNotice.autor_email
              }} />
            )}

            {/* Sección de comentarios */}
            <div className="mt-12 space-y-8">
              <CommentList noticiaId={selectedNotice.id_noticia} />
              <CommentForm noticiaId={selectedNotice.id_noticia} />
            </div>
          </div>

          {/* Segunda Columna */}
          <div className="lg:col-span-1">
            {/* Titulo */}
            <div className="card bg-white dark:bg-[#272829] p-6 rounded-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {selectedNotice.titulo}
                  </h1>
                  <p className="text-gray-700 dark:text-gray-300">
                    {decodeHTMLEntities(selectedNotice.descripcion_corta)}
                  </p>
                </div>
              </div>

              {selectedNotice.categoria_nombre && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Categoría
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-800 dark:text-gray-200">
                      {selectedNotice.categoria_nombre}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Fecha de publicación
                </h3>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm text-gray-800 dark:text-gray-200">
                  {formatFecha(selectedNotice.fecha_publicacion || selectedNotice.creado_en)}
                </span>
              </div>

              {selectedNotice.keywords && selectedNotice.keywords.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedNotice.keywords.map((keyword) => (
                      <span
                        key={keyword.id_keyword}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm text-blue-800 dark:text-blue-200"
                      >
                        {keyword.nombre}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Promociones */}
            <div className="hidden md:block">
              <div className="overflow-hidden grid grid-cols-1 gap-4 pt-8">
                              <div className="bg-[#257CD0] text-center text-white rounded-bl-xl rounded-tr-xl ">
                                <h2 className="text-lg py-2 font-semibold">
                                  Zona de Suscriptores
                                </h2>
                                <QuickLogin />
                              </div>
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
