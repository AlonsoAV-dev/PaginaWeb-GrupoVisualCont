import Image from "next/image";
import DefaultButton from "./defaultButton";

export default function Demo({ data }) {
  const { title, title2, description, button, route, image } = data || {};

  return (
    <section className="pt-16 md:pt-24" id="demo" role="region" aria-labelledby="demo-title">
      <div className="card relative overflow-hidden shadow-md flex flex-col md:flex-row items-center">
        {/* Contenido principal */}
        <div className="w-full md:w-3/5 z-10 text-center md:text-left p-8 md:p-10 lg:p-12">
          {/* Titulo */}
          {title && title2 && (
            <h2 className={`text-black dark:text-white ${!description ? "mb-8" : "mb-6"}`} id="demo-title">
              {title}
              <span className="block text-[#257CD0] dark:text-[#257CD0]">
                {title2}
              </span>
            </h2>
          )}
          {/* Descripcion */}
          {description && (
            <p className="mb-8 text-sm md:text-base max-w-md mx-auto md:mx-0 text-gray-700 dark:text-gray-300">
              {description}
            </p>
          )}
          {/* Boton */}
          {button && route && (
            <DefaultButton
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              route={route}
            >
              {button}
            </DefaultButton>
          )}
        </div>

        {/* Imagen */}
        <div className="hidden md:block md:w-2/5 md:absolute md:right-0 md:top-0 md:h-full">
          <Image
            src={image || "/images/home/demo-business-men.webp"}
            alt="Profesionales empresariales utilizando software Visual ERP"
            fill
            className="object-cover  pe-5"
          />
        </div>
      </div>
    </section>
  );
}