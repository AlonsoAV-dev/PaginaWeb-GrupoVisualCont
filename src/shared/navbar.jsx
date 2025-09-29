"use client";

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
      title: "Software Integra ERP",
      description: "Automatiza la gestión de tu empresa",
      href: "/erp",
      icon: Network,
      color: iconColors.resources.erp,
      external: false,
    },
  ],
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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
      ? "/images/logo-light.png"
      : "/images/logo-dark.png";

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
            <Link
              href="/"
              className="flex items-center -ms-5"
              onClick={handleLogoClick}
            >
              {mounted ? (
                <Image
                  src={logoSrc || "/images/logo-dark.png"}
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
              <li className="hidden md:block">
                <NavDropdown
                  trigger="Soluciones"
                  items={resourcesDropdownData}
                  columns={2}
                />
              </li>
              <li className="hidden md:block">
                <Link
                  href="/nosotros"
                  className={`transition-colors ${
                    mounted && pathname === "/nosotros"
                      ? "text-[#0070F2] dark:text-[#0070F2] font-medium underline underline-offset-[6px] decoration-1"
                      : "text-black dark:text-white hover:text-[#0070F2] dark:hover:text-[#0070F2] underlineText"
                  }`}
                >
                  Nosotros
                </Link>
              </li>
              <li className="hidden md:block">
                <Link
                  href="/"
                  className={` ${
                    mounted && pathname === "/noticias"
                      ? "text-[#021349] dark:text-[#021349] "
                      : "text-black dark:text-white"
                      // transition-colors
                      //  font-medium underline underline-offset-[6px] decoration-1
                      // hover:text-[#0070F2] dark:hover:text-[#0070F2] underlineText
                  } cursor-not-allowed`}
                >
                  Noticias
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <nav className="hidden lg:block space-x-4">
              <DefaultButton
                className=" text-sm font-medium underlineText text-black dark:text-white hover:text-[#0070F2] dark:hover:text-[#0070F2]"
                target="_blank"
                rel="noopener noreferrer"
                route={
                  "https://api.whatsapp.com/send/?phone=51956703375&text=Hola%2C+estoy+interesad%40+en+acceder+a+la+demo+gratuita+de+15+d%C3%ADas.%0D%0A%0D%0A%C2%BFPodr%C3%ADa+indicarme+si+es+posible+acceder+y+explicarme+m%C3%A1s+en+detalle+acerca+de+los+servicios+disponibles%3F%0D%0A-+Contabilidad%0D%0A-+Facturaci%C3%B3n%0D%0A-+Planilla%0D%0A-+ERP+-%0D%0AMuchas+gracias.&type=phone_number&app_absent=0"
                }
              >
                Demo Gratis
              </DefaultButton>
              <DefaultButton route={"/cotizar"}>Cotiza Ya</DefaultButton>
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
