"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Debug: Monitorear cambios de pathname
  useEffect(() => {
    console.log("Pathname changed:", pathname);
  }, [pathname]);

  // Ensure component is mounted before rendering theme-dependent elements
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine which logo to show based on theme
  const logoSrc =
    mounted && resolvedTheme === "dark"
      ? "/images/logo-light.png"
      : "/images/logo-dark.png";

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16 md:mt-24">
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Logo and Description Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              {mounted ? (
                <Image
                  src={logoSrc || "/placeholder.svg"}
                  alt="Visual Logo"
                  width={200}
                  height={50}
                  className="-mx-5 h-10 w-auto"
                />
              ) : (
                <div className="h-10 w-[200px]" />
              )}
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
              Somos ITS Business S.A.C., empresa sólida orgullosamente peruana con
              más de 20 años en el mercado, especialistas en softwares,
              diseñados para todo tipo de empresas, nos encargamos de facilitar
              la gestión, organización y automatización de procesos de una
              manera eficiente.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {/* LinkedIn */}
              <Link
                href="https://www.linkedin.com/company/visual-cont/"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>

              {/* Facebook */}
              <Link
                href="https://www.facebook.com/grupovisualpe/"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.597 0 0 .598 0 1.333v21.333C0 23.403.597 24 1.325 24H12.82V14.706h-3.17v-3.62h3.17V8.413c0-3.134 1.917-4.84 4.72-4.84 1.34 0 2.493.099 2.829.143v3.28l-1.942.001c-1.523 0-1.819.724-1.819 1.785v2.34h3.635l-.474 3.62h-3.161V24h6.2c.729 0 1.325-.597 1.325-1.334V1.333C24 .598 23.403 0 22.675 0z" />
                </svg>
              </Link>

              {/* TikTok */}
              <Link
                href="https://www.tiktok.com/@visual.cont"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c1.19 0 2.39.356 3.429 1.07.79.544 1.387 1.316 1.72 2.198.76.197 1.525.292 2.33.292v3.332a7.78 7.78 0 0 1-4.05-1.124v7.61a5.875 5.875 0 1 1-5.875-5.876c.25 0 .497.02.74.06v3.6a2.542 2.542 0 1 0 1.49 2.31V2h2.216z" />
                </svg>
              </Link>

              {/* YouTube */}
              <Link
                href="https://www.youtube.com/channel/UCN6KpWLS895oDv2ifk1nKgA"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a2.974 2.974 0 0 0-2.09-2.103C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.408.583a2.974 2.974 0 0 0-2.09 2.103A31.3 31.3 0 0 0 .5 12a31.3 31.3 0 0 0 .002 5.814 2.974 2.974 0 0 0 2.09 2.103C4.495 20.5 12 20.5 12 20.5s7.505 0 9.408-.583a2.974 2.974 0 0 0 2.09-2.103A31.3 31.3 0 0 0 23.5 12a31.3 31.3 0 0 0-.002-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
                </svg>
              </Link>

              {/* Instagram */}
              <Link
                href="https://www.instagram.com/visualperuoficial/"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.34 3.608 1.316.975.975 1.254 2.242 1.316 3.608.058 1.266.07 1.646.07 4.843s-.012 3.577-.07 4.843c-.062 1.366-.34 2.633-1.316 3.608-.975.975-2.242 1.254-3.608 1.316-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.34-3.608-1.316-.975-.975-1.254-2.242-1.316-3.608C2.175 15.577 2.163 15.197 2.163 12s.012-3.577.07-4.843c.062-1.366.34-2.633 1.316-3.608.975-.975 2.242-1.254 3.608-1.316C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.44 3.635 1.406 2.67 2.372 2.36 3.545 2.302 4.822.013 8.741 0 9.15 0 12s.013 3.259.072 4.548c.058 1.277.368 2.45 1.334 3.416.966.967 2.139 1.276 3.416 1.334C8.332 23.987 8.741 24 12 24s3.259-.013 4.548-.072c1.277-.058 2.45-.368 3.416-1.334.967-.966 1.276-2.139 1.334-3.416.059-1.289.072-1.698.072-4.548s-.013-3.259-.072-4.548c-.058-1.277-.368-2.45-1.334-3.416C19.0 2.44 17.827 2.131 16.55 2.072 15.259 2.013 14.85 2 12 2z" />
                  <circle cx="12" cy="12" r="3.5" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Sections Column */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Secciones
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className={`${
                    pathname === "/"
                      ? "text-[#0070F2] dark:text-[#0070F2] text-sm"
                      : "hover:text-[#0070F2] text-sm text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  }`}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/cotizar"
                  className={`${
                    pathname === "/cotizar"
                      ? "text-[#0070F2] dark:text-[#0070F2] text-sm"
                      : "hover:text-[#0070F2] text-sm text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  }`}
                >
                  Cotiza
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className={`${
                    pathname === "/nosotros"
                      ? "text-[#0070F2] dark:text-[#0070F2] text-sm"
                      : "hover:text-[#0070F2] text-sm text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  }`}
                >
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Productos
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contable"
                  className={`${
                    pathname === "/contable"
                      ? "text-[#0070F2] dark:text-[#0070F2] text-sm"
                      : "hover:text-[#0070F2] text-sm text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  }`}
                >
                  Sistema Contable
                </Link>
              </li>
              <li>
                <Link
                  href="/facturador"
                  className={`${
                    pathname === "/facturador"
                      ? "text-[#0070F2] dark:text-[#0070F2] text-sm"
                      : "hover:text-[#0070F2] text-sm text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  }`}
                >
                  Sistema Facturador
                </Link>
              </li>
              <li>
                <Link
                  href="/erp"
                  className={`${
                    pathname === "/erp"
                      ? "text-[#0070F2] dark:text-[#0070F2] text-sm"
                      : "hover:text-[#0070F2] text-sm text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  }`}
                >
                  Sistema ERP
                </Link>
              </li>
              <li>
                <Link
                  href="/planilla"
                  className={`${
                    pathname === "/planilla"
                      ? "text-[#0070F2] dark:text-[#0070F2] text-sm"
                      : "hover:text-[#0070F2] text-sm text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  }`}
                >
                  Sistema Planilla
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Novedades
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className={`${
                    pathname === "/noticias"
                      ? "text-[#0070F2] dark:text-[#0070F2] text-sm"
                      : "text-sm text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  } cursor-not-allowed`}
                >
                  {/* hover:text-[#0070F2] // color cuando este activado*/}
                  Noticias
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className={`${
                    pathname === "/blog"
                      ? "text-[#0070F2] dark:text-[#0070F2] text-sm"
                      : "text-sm text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  } cursor-not-allowed`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className={`${
                    pathname === "/cursos"
                      ? "text-[#0070F2] dark:text-[#0070F2] text-sm"
                      : "text-sm text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  } cursor-not-allowed`}
                >
                  Cursos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            © {new Date().getFullYear()} Visual. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
