import TestimonialsCarousel from "../../shared/testimonialsCarousel";
import "../../css/baseCarousel.css";

const OPTIONS = { loop: true, duration: 30 };
const SLIDE_COUNT = 4;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Testimonials() {
  return (
    <section
      className="pt-16 md:pt-24"
      id="testimonials"
      role="region"
      aria-labelledby="testimonials-title"
    >
      <div className="text-center mb-12">
        <h2 className="text-black dark:text-white mb-6" id="testimonials-title">
          Qué
          <span className="text-[#257CD0] dark:text-[#257CD0]"> dicen </span>
          de nosotros
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Esta y otras historias de éxito de empresarios que usan nuestro
          sistema ERP.
        </p>
      </div>

      <TestimonialsCarousel options={OPTIONS} slides={SLIDES} />
    </section>
  );
}
