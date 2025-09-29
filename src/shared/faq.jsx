"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "¿Cómo se comparan sus costos con otros software contables?",
    answer:
      "Nuestro software contable ofrece la mejor relación costo-beneficio del mercado al ser desarrollado directamente por nuestra fábrica de sistemas.",
  },
  {
    id: 2,
    question: "¿Es complicado usar el sistema sin conocimientos técnicos?",
    answer:
      "Nuestros sistemas son intuitivos y fácil de usar, incluso sin experiencia previa. Ofrecemos tutoriales y soporte en vivo para ayudarte en cada paso. Simplifica tu facturación hoy mismo.",
  },
  {
    id: 3,
    question: "¿Los sistemas son compatibles con negocios de todos los tamaños?",
    answer:
      "¡Por supuesto! Nuestros sistemas son completamente escalables y están diseñados para adaptarse tanto a pequeñas empresas como a grandes corporaciones, garantizando la solución ideal sin importar el volumen de facturación.",
  },
  {
    id: 4,
    question: "¿Cómo protege el sistema mis datos y los de mis clientes?",
    answer:
      "Priorizamos la seguridad de tus datos con tecnología avanzada de cifrado y almacenamiento seguro, incluyendo copias de seguridad automáticas para proteger tu información empresarial.",
  },
  {
    id: 5,
    question: "¿Cuánto tiempo después de contratarlo puedo comenzar a usar el sistema?",
    answer:
      "¡Inmediatamente! Después de registrarte, podrás configurar y emitir facturas fácilmente. Nuestro proceso guiado y soporte constante garantizan que comiences sin demoras.",
  },
  {
    id: 6,
    question: "¿Puedo personalizar mis facturas con mi logo y colores corporativos?",
    answer:
      "Sí, puedes personalizar tu logo, colores y diseño de facturas para reflejar la imagen profesional de tu negocio.",
  },
]

function Faq() {
  const [openItem, setOpenItem] = useState(null)

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <section className="my-20" id="faq" role="region" aria-labelledby="faq-title">
      <div className="card p-8 md:p-10 shadow-lg">
        <h2 className="text-black dark:text-white mb-6" id="faq-title">
          Todo lo que 
          <span className="block text-[#257CD0] dark:text-[#257CD0]">Necesitas conocer</span>
        </h2>
        <p className="mb-8 max-w-2xl text-gray-700 dark:text-gray-300">
          Encuentra respuestas a las preguntas más comunes sobre nuestros sistemas ERP.
        </p>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b pb-4 border-gray-300 dark:border-gray-700">
              <button
                onClick={() => toggleItem(faq.id)}
                className="flex justify-between items-center w-full text-left py-2 font-medium text-black dark:text-white hover:text-[#257CD0] dark:hover:text-[#257CD0] transition-colors"
                aria-expanded={openItem === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openItem === faq.id ? "rotate-180 text-[#257CD0]" : ""}`}
                />
              </button>
              {openItem === faq.id && (
                <div id={`faq-answer-${faq.id}`} className="mt-2 text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq;