import DefaultButton from "@/shared/defaultButton";
import Image from "next/image";

function AboutUsCard({ aboutData }) {

    const { title, content = [], description, image, reverse } = aboutData || {};

    return (
        <div
            className={`items-center flex flex-col md:gap-6 ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
            {/* Texto */}
            <div className="flex-1 md:w-1/2">
                {title && (
                    <h3 className="text-4xl md:text-5xl font-semibold text-[#1F4C8F] dark:text-white mb-4">
                        {title}
                    </h3>
                )}

                {Array.isArray(content) && content.length > 0 && (
                    <ul className="space-y-3">
                        {content.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="mt-2 w-2 h-2 bg-[#257CD0] rounded-full shrink-0" />
                                <span className="text-gray-700 dark:text-gray-300 text-base md:text-lg">{item}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {description && (
                    <p className="mt-4 mb-4 md:mb-0 text-gray-700 dark:text-gray-300 text-base md:text-lg">{description}</p>
                )}
            </div>

            {/* Imagen con contenedor anidado */}
            <div className={`w-full md:w-1/2 shrink-0 ${reverse ? "md:pe-4" : "md:ps-4"}`}>
                <div className="relative h-64 md:h-[300px] rounded-lg overflow-hidden">
                    {image && (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AboutUsCard;