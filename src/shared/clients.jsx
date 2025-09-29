"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const clients = [
  {
    name: "Arq",
    logoDark: "/images/home/clientes-dark/LOGO-AGQ.webp",
    logoLight: "/images/home/clientes-light/LOGO-AGQ-L.webp",
  },
  {
    name: "Auxadi",
    logoDark: "/images/home/clientes-dark/LOGO-AUXADI.webp",
    logoLight: "/images/home/clientes-light/LOGO-AUXADI-L.webp",
  },
  {
    name: "Cacao",
    logoDark: "/images/home/clientes-dark/LOGO-CACAO.webp",
    logoLight: "/images/home/clientes-light/LOGO-CACAO-L.webp",
  },
  {
    name: "ComercioYProduccion",
    logoDark: "/images/home/clientes-dark/LOGO-COMERCIO-Y-PRODUCCION.webp",
    logoLight: "/images/home/clientes-light/LOGO-COMERCIO-Y-PRODUCCION-L.webp",
  },
  {
    name: "Constructora",
    logoDark: "/images/home/clientes-dark/LOGO-CONSTRUCTORA.webp",
    logoLight: "/images/home/clientes-light/LOGO-CONSTRUCTORA-L.webp",
  },
  {
    name: "Deviandes",
    logoDark: "/images/home/clientes-dark/LOGO-D-GALLIA.webp",
    logoLight: "/images/home/clientes-light/LOGO-D-GALLIA-L.webp",
  },
  {
    name: "Dgalia",
    logoDark: "/images/home/clientes-dark/LOGO-DEVIANDES.webp",
    logoLight: "/images/home/clientes-light/LOGO-DEVIANDES-L.webp",
  },
  {
    name: "GreenGrow",
    logoDark: "/images/home/clientes-dark/LOGO-GREEN-GROW.webp",
    logoLight: "/images/home/clientes-light/LOGO-GREEN-GROW-L.webp",
  },
  {
    name: "Gya",
    logoDark: "/images/home/clientes-dark/LOGO-GYA.webp",
    logoLight: "/images/home/clientes-light/LOGO-GYA-L.webp",
  },
  {
    name: "Jayo",
    logoDark: "/images/home/clientes-dark/LOGO-JAYO.webp",
    logoLight: "/images/home/clientes-light/LOGO-JAYO-L.webp",
  },
  {
    name: "LaPortuaria",
    logoDark: "/images/home/clientes-dark/LOGO-LA-PORTUARIA.webp",
    logoLight: "/images/home/clientes-light/LOGO-LA-PORTUARIA-L.webp",
  },
  {
    name: "MerkurGaming",
    logoDark: "/images/home/clientes-dark/LOGO-MERKUR-GAMING.webp",
    logoLight: "/images/home/clientes-light/LOGO-MERKUR-GAMING-L.webp",
  },
  {
    name: "Antares",
    logoDark: "/images/home/clientes-dark/LOGO-MINERA-ANTARES.webp",
    logoLight: "/images/home/clientes-light/LOGO-MINERA-ANTARES-L.webp",
  },
  {
    name: "Peruvians",
    logoDark: "/images/home/clientes-dark/LOGO-PERUVIANS.webp",
    logoLight: "/images/home/clientes-light/LOGO-PERUVIANS-L.webp",
  },
  {
    name: "Smp",
    logoDark: "/images/home/clientes-dark/LOGO-SAN-MARTNIN-DE-POR.webp",
    logoLight: "/images/home/clientes-light/LOGO-SAN-MARTNIN-DE-POR-L.webp",
  },
  {
    name: "Urano",
    logoDark: "/images/home/clientes-dark/LOGO-URANO.webp",
    logoLight: "/images/home/clientes-light/LOGO-URANO-L.webp",
  },
];

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDarkMode;
}

export default function ClientsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const isDarkMode = useTheme();

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(4); // lg: 4 items
      } else if (window.innerWidth >= 768) {
        setItemsPerView(3); // md: 3 items
      } else {
        setItemsPerView(2); // sm: 2 items
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getTranslateX = () => {
    return -(currentIndex * (100 / itemsPerView));
  };

  const getItemWidth = () => {
    if (itemsPerView === 4) return "w-1/4";
    if (itemsPerView === 3) return "w-1/3";
    return "w-1/2";
  };

  const getLogoSrc = (client) => {
    return isDarkMode ? client.logoDark : client.logoLight;
  };

  return (
    <section
      className="pt-16 md:pt-24"
      id="clients"
      role="region"
      aria-labelledby="clients-title"
    >
      <div className="text-center mb-12">
        <h2 className="text-black dark:text-white mb-6" id="clients-title">
          Ellos ya confían
          <span className="text-[#257CD0] dark:text-[#257CD0]">
            {" "}
            en nosotros
          </span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Más de 8,000 clientes en el Perú ya confían en nuestras soluciones.
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(${getTranslateX()}%)` }}
        >
          {[...clients, ...clients].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className={`flex-shrink-0 ${getItemWidth()} px-2 sm:px-4`}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center h-20 sm:h-24 hover:border-[#1F4C8F] dark:hover:border-white">
                <Image
                  src={getLogoSrc(client) || "/placeholder.svg"}
                  alt={client.name}
                  width={200}
                  height={50}
                  className="max-h-8 sm:max-h-12 max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
