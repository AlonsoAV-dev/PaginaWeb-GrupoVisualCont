"use client";

import Image from "next/image";
import DefaultButton from "@/shared/defaultButton";
import { useState, useEffect } from "react";

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

function Hero({
  logoLight,
  logoDark,
  heroImageSrc,
  serviceName,
  title,
  titleColored,
  content,
  button,
}) {
  const isDarkMode = useTheme();
  const getLogoSrc = () => {
    return isDarkMode ? logoDark : logoLight;
  };
  return (
    <section className="card mt-8 mb-3 relative overflow-hidden shadow-md" id="hero" role="region" aria-labelledby="hero-title">
      <div className="p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-start">
        <div className="w-full md:w-3/5 z-10">
          {/* Logo Image */}
          <Image
            src={getLogoSrc()}
            alt={serviceName}
            width={200}
            height={100}
            className="mb-4 md:mb-6 -ms-2"
          />

          {/* Title */}
          <h1 className="text-black dark:text-white" id="hero-title">
            {title}
            <span className="block text-[#00AEEF] dark:text-[#00AEEF]">
              {titleColored}
            </span>
          </h1>

          {/* Content Description */}
          <p className="my-6 text-sm md:text-base max-w-md text-gray-700 dark:text-gray-300">
            {content}
          </p>

          {/* Button */}
          <DefaultButton>{button}</DefaultButton>
        </div>
        <div className="hidden md:block md:w-2/5 md:absolute md:right-0 md:top-0 md:bottom-0 md:items-center">
          <Image
            src={heroImageSrc}
            alt={serviceName}
            width={500}
            height={500}
            className="w-full h-auto md:h-full md:w-auto md:object-cover md:object-left"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
