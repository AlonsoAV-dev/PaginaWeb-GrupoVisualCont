import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

function NoticeCard({ notice }) {
  const [selectedNotice, setSelectedNotice] = useState(null);

  const openProjectPopup = (dataNotice) => {
    setSelectedNotice(dataNotice);
  };

  const closeProjectPopup = () => {
    setSelectedNotice(null);
  };

  return (
    <>
      <Link
        href={`/noticias/${notice.slug}`}
        className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-[#0070F2] dark:hover:text-[#0070F2] text-sm font-medium"
        onClick={closeProjectPopup}
      >
        <div
          key={notice.slug}
          className="card overflow-hidden rounded-3xl bg-white dark:bg-[#272829] border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg h-full cursor-pointer hover:ring-[#257CD0] hover:ring-2"
          onClick={() => openProjectPopup(notice)}
        >
          <div className="block h-full flex flex-col">
            <div className="flex items-center justify-center p-4 pt-6 bg-gray-100 dark:bg-gray-800 relative">
              <Image
                src={notice.mainImage || "/images/placeholder.jpg"}
                alt={notice.title}
                width={600}
                height={400}
                className="w-full h-auto object-contain max-h-[210px]"
              />
              {notice.categories && (
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full text-xs text-gray-800 dark:text-white">
                    {notice.categories[0].charAt(0).toUpperCase() +
                      notice.categories[0].slice(1).toLowerCase()}
                  </span>
                </div>
              )}
              {notice.pubDate && (
                <div className="absolute top-4 right-4 px-2 py-1">
                  <span className="px-2 py-1 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full text-xs text-gray-800 dark:text-white">
                    {notice.pubDate}
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 md:p-6 flex flex-col flex-grow">
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {notice.author.name}
              </span>
              <h3 className="font-medium text-gray-900 dark:text-white text-lg mb-2 line-clamp-2">
                {notice.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                {notice.shortDescription}
              </p>
              <div className="inline-flex items-center text-[#0070F2] text-sm font-medium mt-auto group">
                Ver Noticia{" "}
                <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default NoticeCard;
