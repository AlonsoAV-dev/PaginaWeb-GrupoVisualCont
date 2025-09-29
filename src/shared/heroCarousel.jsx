"use client";

import HeroCardCarousel from "./heroCardCarousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./carouselArrowButtons";
import { useEffect } from "react";

const heroContent = [
  {
    title: "Automatiza ",
    titleBlue: "tu negocio con el Software de Contabilidad ",
    title2: "y Factura Electrónica",
    contentDescription:
      "Optimiza cada decisión de tu empresa con un sistema que automatiza procesos y te permite trabajar de manera rápida, práctica y segura desde cualquier lugar y dispositivo.",
    button: "Empieza tus 15 días gratis",
    imageSrc: "/images/home/hero-business-woman.webp",
  },
  {
    title: "Nueva tecnología ",
    titleBlue: "API SUNAT para SIRE ",
    title2: "y Sistema de Factura Electrónica",
    contentDescription:
      "Conecta tu Sistema Integrado ERP con la API oficial de SUNAT para SIRE y facturación electrónica, e integra aplicaciones de otros proveedores con total seguridad.",
    button: "Empieza tus 15 días gratis",
    imageSrc: "/images/home/hero-afpnet.webp",
  },
  {
    title: "¿Cómo puedo ",
    titleBlue: "evitar las fiscalizaciones de SUNAFIL ",
    title2: " para mi negocio?",
    contentDescription:
      "Digitaliza la gestión de tus trabajadores con VISUALPLAN, el software de planillas que garantiza cumplimiento laboral, control eficiente y firma electrónica en todos tus procesos.",
    button: "Empieza tus 15 días gratis",
    imageSrc: "/images/home/hero-business-men.webp",
  },
];

function HeroCarousel(props) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  useEffect(() => {
    if (emblaApi) console.log(emblaApi.slideNodes());
  }, [emblaApi]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi || null);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <section
                id="hero"
                className="card mt-8 mb-3 relative overflow-hidden shadow-md"
                role="region"
                aria-labelledby="hero-title"
              >
                <HeroCardCarousel
                  key={index}
                  title={heroContent[index].title}
                  titleBlue={heroContent[index].titleBlue}
                  title2={heroContent[index].title2}
                  index={index}
                  button={heroContent[index].button}
                  contentDescription={heroContent[index].contentDescription}
                  imageSrc={heroContent[index].imageSrc}
                  subContentDescription={
                    heroContent[index].subContentDescription
                  }
                />
                
                {/* Botones posicionados absolutamente dentro del card */}
                {emblaApi && (
                  <>
                    <PrevButton
                      onClick={onPrevButtonClick}
                      disabled={prevBtnDisabled}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 embla__button--overlay"
                    />
                    <NextButton
                      onClick={onNextButtonClick}
                      disabled={nextBtnDisabled}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 embla__button--overlay"
                    />
                  </>
                )}
              </section>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;