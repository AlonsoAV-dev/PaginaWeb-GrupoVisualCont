"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedinIn,
  faFacebookF,
  faTiktok,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

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
      ? "/images/logo-light.webp"
      : "/images/logo-dark.webp";

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
              Somos ITS Business S.A.C., empresa sólida orgullosamente peruana
              con más de 20 años en el mercado, especialistas en softwares,
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
                <FontAwesomeIcon icon={faLinkedinIn} />
              </Link>

              {/* Facebook */}
              <Link
                href="https://www.facebook.com/grupovisualpe/"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </Link>

              {/* TikTok */}
              <Link
                href="https://www.tiktok.com/@visual.cont"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <FontAwesomeIcon icon={faTiktok} />
              </Link>

              {/* YouTube */}
              <Link
                href="https://www.youtube.com/channel/UCN6KpWLS895oDv2ifk1nKgA"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </Link>

              {/* Instagram */}
              <Link
                href="https://www.instagram.com/visualperuoficial/"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
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
                    pathname === "/cotizar/"
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
                    pathname === "/nosotros/"
                      ? "text-[#0070F2] dark:text-[#0070F2] text-sm"
                      : "hover:text-[#0070F2] text-sm text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  }`}
                >
                  Nosotros
                </Link>
              </li>
               <li>
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfvB_C0A74pLZreaDzkgPCjxI-lJjwj6TMvPmG-FP2K8g3K2A/viewform"
                  target="_blank "
                  rel="noopener noreferrer"
                  className={`${
                    pathname === "/reclamaciones/"
                      ? "text-[#0070F2] dark:text-[#0070F2] text-sm"
                      : "hover:text-[#0070F2] text-sm text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  }`}
                >
                  Libro de Reclamaciones
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
                    pathname === "/contable/"
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
                    pathname === "/facturador/"
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
                    pathname === "/erp/"
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
                    pathname === "/planilla/"
                      ? "text-[#0070F2] dark:text-[#0070F2] text-sm"
                      : "hover:text-[#0070F2] text-sm text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  }`}
                >
                  Sistema Planilla
                </Link>
              </li>
            </ul>
          </div>

          {/* News Column */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Novedades
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/noticias"
                  className={`${
                    pathname === "/noticias/"
                      ? "text-[#0070F2] dark:text-[#0070F2] text-sm"
                      : "hover:text-[#0070F2] text-sm text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  }`}
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
              <li>
                <Link
                  href="https://drive.google.com/drive/folders/1bO07KgV-luZ151mCt2GCRVm5nyooouQk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    pathname === ""
                      ? "text-[#0070F2] dark:text-[#0070F2] text-sm"
                      : "hover:text-[#0070F2] text-sm text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  }`}
                >
                  Videos Facturador
                </Link>
              </li>
              <li>
                <Link
                  href="https://drive.google.com/drive/folders/1ungowViNrcFX2wbqq19-xGTh0S-Vl85X"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    pathname === ""
                      ? "text-[#0070F2] dark:text-[#0070F2] text-sm"
                      : "hover:text-[#0070F2] text-sm text-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  }`}
                >
                  Manuales Facturador
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
