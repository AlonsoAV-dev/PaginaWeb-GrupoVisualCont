"use client";

import TestimonialsCardCarousel from './testimonialsCardCarousel';
import useEmblaCarousel from "embla-carousel-react";

import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from "./carouselArrowButtons";
import { DotButton, useDotButton } from "./carouselDotButton";
import { useEffect } from "react";


const testimonials = [
    {
        id: 1,
        name: "Nancy Sanchez",
        role: "Area Contable",
        content:
            "Gracias a VisualFact y VisualInt Manufactura Charles S.A.C. a lo largo de 7 largos años ha logrado abrir 5 grandes tiendas en el emporio de gamarra, todo gracias a la confiabilidad y soporte de Visual.",
        rating: 5,
        avatar: "/images/testimonios/Nancy.webp",
    },
    {
        id: 2,
        name: "Yamilet",
        role: "Encargada Area Ventas",
        content:
            "Utilizamos VisualFACT en todas sus tiendas para la emisión de sus boletas o facturas y asi poder llevar el control de todos sus productos, gracias a la facilidad y el soporte constante se les es muy facil adaptarse a Visual.",
        rating: 4,
        avatar: "/images/testimonios/Yamilet.webp",
    },
    {
        id: 3,
        name: "Roxana Lopez",
        role: "Distribuidora Cabana",
        content:
            "Distruidora cabana contaba con un problema de lentitud e inventario desordenado, gracias a VisualCont Roxana ha podido solucionar sus problemas de lentitud y ha repotenciado un mayor número de ventas.",
        rating: 5,
        avatar: "/images/testimonios/Roxana.webp",
    },
    {
        id: 4,
        name: "Augusto Sanchez",
        role: "Dueño cevicheria",
        content:
            "El restaurante presentaba problema con las comandas, pedidos retrasados confusiones con los montos de caja, VisualFOOD llego para potenciar un mejor orden en temas de comandas y resolver el problema.",
        rating: 5,
        avatar: "/images/testimonios/Augusto.webp",
    },
]

function TestimonialsCarousel(props) {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    useEffect(() => {
        if (emblaApi) console.log(emblaApi.slideNodes())
    }, [emblaApi])

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi || null)
    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    return (
        <section className="emblaTestimonials">
            <div className="emblaTestimonials__viewport" ref={emblaRef}>
                <div className="emblaTestimonials__container">
                    {slides.map((index) => (
                        <div className="emblaTestimonials__slide" key={index}>
                            <div className="mb-3">
                                <TestimonialsCardCarousel
                                    id={testimonials[index].id}
                                    rating={testimonials[index].rating}
                                    content={testimonials[index].content}
                                    avatar={testimonials[index].avatar}
                                    name={testimonials[index].name}
                                    role={testimonials[index].role}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>

                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TestimonialsCarousel;
