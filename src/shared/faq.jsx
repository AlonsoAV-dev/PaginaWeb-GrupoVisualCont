"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "¿El software cumple con las normativas fiscales según SUNAT?",
    answer:
      "Sí, nuestro software cumple al 100% con las normativas fiscales establecidas por la SUNAT (Superintendencia Nacional de Administración Tributaria del Perú). Está diseñado y actualizado continuamente para adaptarse a los requisitos tributarios vigentes.",
  },
  {
    id: 2,
    question:
      "¿El software está actualizado conforme a las últimas disposiciones de SUNAT sobre el SIRE?",
    answer:
      "Sí, nuestro sistema se actualiza automáticamente para cumplir con los cambios normativos y garantizar que siempre estés en regla.",
  },
  {
    id: 3,
    question:
      "¿El sistema calcula automáticamente IGV, detracciones, percepciones y retenciones?",
    answer:
      "Sí, puedes configurar estos conceptos para que el sistema los aplique automáticamente en las operaciones.",
  },
  {
    id: 4,
    question: "¿Puedo personalizar los reportes o comprobantes?",
    answer:
      "Sí, puedes personalizar los formatos de comprobantes (con tu logo, colores, datos), y también configurar reportes y de gestión según tus necesidades.",
  },
  {
    id: 5,
    question: "¿Funciona en la nube o es local?",
    answer:
      "Ofrecemos ambas opciones: versión en la nube (para acceder desde cualquier lugar) y versión local (instalada en tu equipo). Tú eliges la que prefieras.",
  },
  {
    id: 6,
    question:
      "¿Puedo usarlo si tengo un negocio pequeño o recién estoy empezando?",
    answer:
      "Claro que sí. Tenemos planes diseñados especialmente para emprendedores y pequeñas empresas que necesitan una solución simple, eficiente y económica.",
  },
  {
    id: 7,
    question: "¿Entregan manuales o material de apoyo?",
    answer:
      "Sí, incluimos manuales, videotutoriales y acceso a nuestra base de conocimientos en línea.",
  },
  {
    id: 8,
    question: "¿Qué necesito para empezar a usar el software?",
    answer:
      "Solo necesitas definir el plan que se ajuste a tu negocio, brindarnos algunos datos básicos y ¡listo! Agendamos la instalación y capacitación.",
  },
  {
    id: 9,
    question: "¿Puedo ver una demostración antes de comprar?",
    answer:
      "Sí, puedes solicitar una demo gratuita para ver el sistema en funcionamiento y resolver todas tus dudas.",
  },
];

function Faq() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section
      className="my-20"
      id="faq"
      role="region"
      aria-labelledby="faq-title"
    >
      <div className="card p-8 md:p-10 shadow-lg">
        <h2 className="text-black dark:text-white mb-6" id="faq-title">
          Todo lo que
          <span className="block text-[#257CD0] dark:text-[#257CD0]">
            Necesitas conocer
          </span>
        </h2>
        <p className="mb-8 max-w-2xl text-gray-700 dark:text-gray-300">
          Encuentra respuestas a las preguntas más comunes sobre nuestros
          sistemas ERP.
        </p>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border-b pb-4 border-gray-300 dark:border-gray-700"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="flex justify-between items-center w-full text-left py-2 font-medium text-black dark:text-white hover:text-[#257CD0] dark:hover:text-[#257CD0] transition-colors"
                aria-expanded={openItem === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openItem === faq.id ? "rotate-180 text-[#257CD0]" : ""
                  }`}
                />
              </button>
              {openItem === faq.id && (
                <div
                  id={`faq-answer-${faq.id}`}
                  className="mt-2 text-gray-700 dark:text-gray-300"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
