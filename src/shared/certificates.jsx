import Link from "next/link";
import Image from "next/image";

const certificates = [
  {
    name: "AWS",
    logo: "/images/home/cert-logo-aws.webp",
    alt: "AWS Certificado",
  },
  {
    name: "Colegio Contadores",
    logo: "/images/home/cert-logo-colegio.webp",
    alt: "Colegio Contadores Certificado",
  },
  {
    name: "Indecopi",
    logo: "/images/home/cert-logo-indecopi.webp",
    alt: "Indecopi Certificado",
  },
  {
    name: "ISO 27001",
    logo: "/images/home/cert-logo-iso.webp",
    alt: "ISO 27001 Certificado",
  },
  {
    name: "SUNAT",
    logo: "/images/home/cert-logo-sunat.webp",
    alt: "SUNAT Certificado",
    routeFile: "/docs/certificado-sunat.pdf",
  },
];

export default function Certificates({ className }) {
  return (
    <section
      className={`${className ? "" : "pt-16 md:pt-24"}`}
      id="certificates"
      role="region"
      aria-labelledby="certificates-title"
    >
      <div
        className={`rounded-2xl bg-gradient-to-r from-[#021349] to-[#257CD0] items-center ${
          className
            ? className
            : "grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-16 py-10 xl:py-14 px-6 xl:px-12"
        }`}
      >
        {/* Title and Subtitle */}
        <div className="space-y-4">
          <h2
            className="text-5xl text-white font-semibold mb-7 text-center lg:text-left"
            id="certificates-title"
          >
            Ellos nos certifican
          </h2>
          <p className="text-lg text-white leading-8 mb-12 text-center lg:text-left">
            Garantizamos la calidad y la seguridad en cada una de nuestras
            soluciones.
          </p>
        </div>

        {/* Certificates Container */}
        <div className="flex justify-center lg:justify-end col-span-2 bg-white p-6 rounded-xl">
          <div className="flex  items-center justify-evenly md:justify-center gap-6 lg:gap-14 flex-wrap">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="w-20 h-20 flex items-center justify-center overflow-hidden hover:scale-[1.2] transition-transform duration-200"
              >
                {cert.routeFile ? (
                  <Link
                    href={cert.routeFile}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={cert.logo || "/placeholder.svg"}
                      alt={cert.alt}
                      width={200}
                      height={50}
                      className="w-15 h-15 object-contain"
                      priority
                    />
                  </Link>
                ) : (
                  <Image
                    src={cert.logo || "/placeholder.svg"}
                    alt={cert.alt}
                    width={200}
                    height={50}
                    className="w-15 h-15 object-contain"
                    priority
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
