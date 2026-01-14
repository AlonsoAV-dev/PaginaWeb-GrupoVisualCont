"use client";

import { dlEvent } from "../../lib/datalayer";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import DefaultButton from "./defaultButton";
import ThemeToggle from "./themeToggle";
import { Menu } from "lucide-react";
import MobileMenu from "./mobileMenu";
import NavDropdown from "./navDropdown";
import { iconColors } from "./colorUtils";
import { Calculator, ChartBarBig, FileText, Network } from "lucide-react";

const resourcesDropdownData = [
  [
    {
      title: "Software Contable",
      description: "Automatiza tus gestiones contables",
      href: "/contable",
      icon: ChartBarBig,
      color: iconColors.resources.contable,
      external: false,
    },
    {
      title: "Software Facturador Electronico",
      description: "Gestiona ventas, inventarios y tesorería",
      href: "/facturador",
      icon: FileText,
      color: iconColors.resources.facturador,
      external: false,
    },
    {
      title: "Software Recursos Humanos",
      description: "Automatiza la gestión de tu nómina",
      href: "/planilla",
      icon: Calculator,
      color: iconColors.resources.planilla,
      external: false,
    },
    {
      title: "Software ERP",
      description: "Automatiza la gestión de tu empresa",
      href: "/erp",
      icon: Network,
      color: iconColors.resources.erp,
      external: false,
    },
  ],
];

function mpBeacon(event, params = {}) {
  try {
    const url = new URL("https://www.google-analytics.com/g/collect");
    const search = new URLSearchParams({
      v: "2",
      tid: GA_ID,
      cid: "wapp." + (crypto?.randomUUID?.() || Date.now()),
      sid: String(Math.floor(Date.now() / 1000)),
      sct: "1",
      seg: "1",
      _s: "1",
      dl: typeof window !== "undefined" ? window.location.href : "",
      dt: typeof document !== "undefined" ? document.title : "",
      sr: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
      ul: (navigator.language || "es-es").toLowerCase(),
      en: event,
      "ep.cta_id": params.cta_id,
      "ep.page_location": params.page_location,
    }).toString();
    url.search = search;
    if (navigator.sendBeacon) navigator.sendBeacon(url.toString());
    else fetch(url.toString(), { method: "GET", keepalive: true });
  } catch {}
}

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const onClick = () => {
    const params = {
      method: "cotizar",
      page_location: typeof window !== "undefined" ? window.location.href : "",
    };

    dlEvent("cotizar_click", params);

    // Fallback si no existe GA/GTM
    const hasGtag =
      typeof window !== "undefined" && typeof window.gtag === "function";
    const hasGTM =
      typeof window !== "undefined" &&
      typeof window.google_tag_manager !== "undefined";
    if (!hasGtag && !hasGTM) {
      mpBeacon("cotizar_click", params);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Debug: Monitorear cambios de pathname
  useEffect(() => {
    console.log("Pathname changed:", pathname);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check in case page is loaded scrolled down
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoSrc =
    mounted && resolvedTheme === "dark"
      ? "/images/logo-light.webp"
      : "/images/logo-dark.webp";

  const handleLogoClick = (e) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled
            ? "bg-white/90 dark:bg-[#111111]/90 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Logo Visual */}
            <Link
              href="/"
              className="flex items-center -ms-5"
              onClick={handleLogoClick}
            >
              {mounted ? (
                <Image
                  src={logoSrc || "/images/logo-dark.webp"}
                  alt="Visual Logo"
                  width={200}
                  height={50}
                  className="h-12 w-auto"
                  priority
                />
              ) : (
                <div className="h-12 w-[200px]" />
              )}
            </Link>
            <ul className="flex space-x-6">
              {/* Soluciones Boton Menu-Normal */}
              <li className="hidden md:block">
                <NavDropdown
                  trigger="Soluciones"
                  items={resourcesDropdownData}
                  columns={2}
                />
              </li>
              {/* Nosotros Boton Menu-Normal*/}
              <li className="hidden md:block">
                <Link
                  href="/nosotros"
                  className={`transition-colors ${
                    mounted && pathname === "/nosotros/"
                      ? "text-[#0070F2] dark:text-[#0070F2] font-medium underline underline-offset-[6px] decoration-1"
                      : "text-black dark:text-white hover:text-[#0070F2] dark:hover:text-[#0070F2] underlineText"
                  }`}
                >
                  Nosotros
                </Link>
              </li>
              {/* Noticias Boton Menu-Normal */}
              <li className="hidden md:block">
                <Link
                  href="/noticias"
                  className={`transition-colors ${
                    mounted && pathname === "/noticias/"
                      ? "text-[#0070F2] dark:text-[#0070F2] font-medium underline underline-offset-[6px] decoration-1"
                      : "text-black dark:text-white hover:text-[#0070F2] dark:hover:text-[#0070F2] underlineText"
                  }`}
                >
                  Noticias
                </Link>
              </li>
            </ul>
          </div>

          {/* Botones de Accion Menu Normal */}
          <div className="flex items-center space-x-4">
            <nav className="hidden lg:block space-x-4">
              <DefaultButton
                className="text-base font-medium underlineText text-black dark:text-white hover:text-[#0070F2] dark:hover:text-[#0070F2]"
                target="_blank"
                rel="noopener noreferrer"
                route={"https://e-vf.softwareintegrado.com/vc-cpe/login"}
              >
                Ingresar Ahora
              </DefaultButton>
              <DefaultButton 
                route={"/cotizar"}
                action={onClick}
              >
                Cotiza Ya
              </DefaultButton>
            </nav>

            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-md bg-transparent hover:bg-gray-200/50 dark:hover:bg-gray-800/20 lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-black dark:text-white" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

export default Navbar;
