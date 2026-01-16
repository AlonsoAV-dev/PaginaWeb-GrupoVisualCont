"use client";
import NoticeCard from "@/shared/noticeCard";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import FilterNotices from "./filterNotices";
import { sidebarImages, visualSolutions } from "../../../lib/Utils";
import Pagination from "@/shared/pagination";
import { paginateNotices, NOTICES_PER_PAGE } from "../../../lib/Utils";
import QuickLogin from "./quickLogin";

function Notices() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [noticias, setNoticias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Cargar categorías solo una vez
  useEffect(() => {
    loadCategorias();
  }, []);

  // Cargar noticias cuando cambie filtro o página
  useEffect(() => {
    loadNoticias();
  }, [activeFilter, currentPage]);

  const loadNoticias = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        estado: 'publicada',
        page: currentPage.toString(),
        limit: '12'
      });
      
      if (activeFilter !== 'all') {
        params.append('categoria', activeFilter);
      }
      
      const res = await fetch(`/api/noticias?${params}`, {
        next: { revalidate: 60 } // Revalidar cada 60 segundos
      });
      const data = await res.json();
      setNoticias(data.noticias || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotal(data.pagination?.total || 0);
    } catch (error) {
      console.error('Error al cargar noticias:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategorias = async () => {
    try {
      const res = await fetch('/api/categorias', {
        next: { revalidate: 3600 } // Revalidar cada hora
      });
      const data = await res.json();
      setCategorias(data.categorias || []);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  return (
    <section id="notices" role="region" aria-labelledby="notices-title">
      <div className="mx-auto">
        {/* Titulo */}
        <div className="text-center mb-12">
          <h2 className="text-black dark:text-white mb-6" id="products-title">
            Conoce las ultimas
            <span className="text-[#257CD0] dark:text-[#257CD0]">
              {" "}
              Novedades
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explora las ultimas novedades y noticias dentro del mundo contable y
            tributario.
          </p>
        </div>

        {/* Filtros */}
        <FilterNotices
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          categorias={categorias}
        />

        {/* Contenido */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-full md:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#257CD0]"></div>
                <p className="text-gray-600 dark:text-gray-400 mt-4">Cargando noticias...</p>
              </div>
            ) : noticias.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {noticias.map((notice) => (
                  <NoticeCard key={notice.id_noticia} notice={notice} />
                ))}
              </div>
            ) : (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  {activeFilter !== 'all' 
                    ? 'No hay noticias en esta categoría' 
                    : 'No hay noticias disponibles'}
                </p>
              </div>
            )}
          </div>
          {/* Sidebar */}
          <div className="px-2 hidden md:block">
            <div className="overflow-hidden grid grid-cols-1 gap-4">
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

        {!loading && totalPages > 1 && (
          <Pagination 
            pagination={{ totalPages, currentPage }} 
            onPageChange={handlePageChange} 
          />
        )}

      </div>
    </section>
  );
}

export default Notices;
