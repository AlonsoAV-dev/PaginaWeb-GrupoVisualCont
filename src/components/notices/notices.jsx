"use client";
import NoticeCard from "@/shared/noticeCard";
import { useState, useMemo, useEffect } from "react";
import { NoticeData } from "../../../lib/utils";
import Image from "next/image";
import Link from "next/link";
import FilterNotices from "./filterNotices";
import { sidebarImages, visualSolutions } from "../../../lib/utils";
import Pagination from "@/shared/pagination";
import { paginateNotices } from "../../../lib/utils";

function Notices() {
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredNotices =
    activeFilter === "all"
      ? NoticeData
      : NoticeData.filter((notice) => notice.categories.includes(activeFilter));
  const [currentPage, setCurrentPage] = useState(1);

  const { notices, pagination } = useMemo(() => {
    return paginateNotices(filteredNotices, currentPage);
  }, [filteredNotices, currentPage]);

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
        />

        <div className="grid grid-cols-4 gap-6">
          {/* Contenido */}
          <div className="col-span-full md:col-span-3">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {notices.map((notice) => (
                <NoticeCard key={notice.slug} notice={notice} />
              ))}
            </div>
          </div>
          {/* Sidebar */}
          <div className="px-2 hidden md:block">
            <div className="overflow-hidden grid grid-cols-1 gap-4">
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

        <Pagination pagination={pagination} onPageChange={handlePageChange} />

      </div>
    </section>
  );
}

export default Notices;
