import DefaultButton from "../../shared/defaultButton";
import Image from "next/image";

export default function CTA() {
  return (
    <section
      className="pt-16 md:pt-24"
      id="cta"
      role="region"
      aria-labelledby="cta-title"
    >
      <div className="mx-auto">
        <div
          className="md:py-14 md:px-20 sm:py-14 sm:px-20  p-10 lg:gap-20 gap-10 
                rounded-2xl bg-gradient-to-r from-[#021349] to-[#257CD0] 
                flex lg:flex-row justify-between flex-col-reverse overflow-hidden"
        >
          <div className="w-full lg:w-2/6 relative">
            <div
              className="relative xl:bottom-0 rounded-t-3xl
              -mb-14 lg:-mb-16 xl:-mb-24 mx-auto
              aspect-[1028/1388] overflow-hidden"
            >
              <div className="cta-fade">
                {/* Slide 1 */}
                <div className="cta-fade__slide">
                  <Image
                    src="/images/cta/image1.webp"
                    alt="slide 1"
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover rounded-t-3xl"
                    priority
                  />
                </div>

                {/* Slide 2 */}
                <div className="cta-fade__slide">
                  <Image
                    src="/images/cta/image2.webp"
                    alt="slide 2"
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover rounded-t-3xl"
                  />
                </div>

                {/* Slide 3 */}
                <div className="cta-fade__slide">
                  <Image
                    src="/images/cta/image3.webp"
                    alt="slide 3"
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover rounded-t-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/6 text-center lg:text-left">
            <h2
              className="text-3xl md:text-5xl text-white font-semibold mb-7"
              id="cta-title"
            >
              SUNAT facilita el uso del SIRE 2025
            </h2>
            <p className="text-base md:text-lg text-white md:leading-8 mb-7 ">
              La Superintendencia Nacional de Aduanas y de Administración
              Tributaria (SUNAT) postergó hasta julio de 2025 la obligatoriedad
              del uso del Sistema Integrado de Registros Electrónicos (SIRE)
              para un grupo de contribuyentes cuya obligación debía iniciar en
              enero de 2025.
            </p>
            <DefaultButton className="bg-white px-7 py-2.5 rounded-md transition-all text-[#1f4c8f] text-base font-medium shadow-sm hover:bg-[#1f4c8f] hover:ring-2 hover:ring-white hover:text-white">
              Comienza ya
            </DefaultButton>
          </div>
        </div>
      </div>
    </section>
  );
}
