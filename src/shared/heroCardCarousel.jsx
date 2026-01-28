import DefaultButton from "../shared/defaultButton";
import Image from "next/image";

function HeroCardCarousel({
  idTitle,
  className,
  title,
  titleBlue,
  title2,
  contentDescription,
  button,
  subContentDescription,
  imageSrc,
}) {
  return (
    <div className={`${className ? className : ""} `}>
      <div className="p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-start">
        <div className="w-full lg:w-3/5 z-10">
          <h1 className="text-black dark:text-white min-h-[288px] sm:min-h-full" id={idTitle}>
            {title}
            <span className="text-[#00AEEF] dark:text-[#00AEEF]">
              {titleBlue}
            </span>
            {title2}
          </h1>

          <p className="mb-5 mt-3 md:mt-5 text-sm md:text-base max-w-md text-gray-700 dark:text-gray-300">
            {contentDescription}
          </p>

          {subContentDescription && (
            <p className="text-sm md:text-base max-w-md text-gray-700 dark:text-gray-300">
              {subContentDescription}
            </p>
          )}

          {button && <DefaultButton>{button}</DefaultButton>}
        </div>

        {/* Image - hidden on mobile, visible on md and up */}
        <div className="hidden lg:block md:w-2/5 md:absolute md:right-0 md:top-0 md:bottom-0 md:items-center">
          <Image
            src={imageSrc}
            alt="Onda decorativa azul representando tecnología y software empresarial"
            width={500}
            height={500}
            className="w-full h-auto md:h-full md:w-auto md:object-cover md:object-left"
            title="Visual ERP - Software empresarial"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroCardCarousel;
