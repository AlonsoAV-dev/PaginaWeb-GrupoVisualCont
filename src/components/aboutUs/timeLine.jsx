import React from "react";

export default function Timeline({ items = [] }) {
  // Helper para alternar lado en md+: izquierda si index par, derecha si impar
  const side = (i) => (i % 2 === 0 ? "left" : "right");

  return (
    <section className="pt-16 md:pt-24 space-y-16 md:space-y-22" id="timeline" role="region" aria-labelledby="timeline-title">
      <div className="text-center w-full mb-12">
        <h2 className="text-black dark:text-white mb-6" id="timeline-title">
          Un poco de nuestra
          <span className="block text-[#257CD0] dark:text-[#257CD0]">
            Historia
          </span>
        </h2>
      </div>

      {/* Contenedor en grid: 3 columnas en md+; 1 columna en móvil */}
      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_24px_1fr]">
        {/* Línea vertical central (SOLO md+) */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-5 h-full w-[4px] bg-gray-300 z-0"
        />

        {/* Map de items */}
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {/* Columna izquierda (card si lado=left) — OCULTA en móvil */}
            <div className="hidden md:block md:col-start-1 md:pr-6">
              {side(i) === "left" && <Card item={item} align="end" />}
            </div>

            {/* Columna central: el punto — OCULTA en móvil */}
            <div className="hidden md:flex items-start justify-center md:col-start-2">
              <span
                className="mt-3 inline-block h-5 w-5 rounded-full bg-[#01aeef] shadow z-10"
                aria-hidden="true"
              />
            </div>

            {/* Columna derecha (card si lado=right) — OCULTA en móvil */}
            <div className="hidden md:block md:col-start-3 md:pl-6">
              {side(i) === "right" && <Card item={item} align="start" />}
            </div>

            {/* En mobile: una sola columna con línea a la izquierda del card */}
            <div className="md:hidden relative pl-6">
              {/* Línea lateral para mobile */}
              <span
                aria-hidden="true"
                className="absolute left-2 top-0 bottom-0 w-px bg-zinc-300"
              />
              {/* Punto */}
              <span
                aria-hidden="true"
                className="absolute left-[7px] top-4 h-3 w-3 -translate-x-1/2 rounded-full bg-[#1F4C8F] ring-4 ring-zinc-300 dark:ring-white shadow"
              />
              <Card item={item} align="start" />
            </div>
          </React.Fragment>
        ))}


      </div>
    </section>
  );
}

function Card({ item, align = "start" }) {
  const { date, title, description } = item;
  return (
    <article
      className={
        "card px-8 py-8 relative mb-10 rounded-xl hover:ring-[#257CD0] hover:ring-2 transition-shadow duration-300" +
        (align === "end" ? " text-right" : "")
      }
    >
      <div className="text-sm uppercase tracking-wide text-zinc-400">
        {date}
      </div>
      <h3 className="mt-1 text-xl font-semibold text-[#01aeef]">{title}</h3>
      {description && (
        <p className="text-base leading-6 text-zinc-600 dark:text-zinc-300">
          {description}
        </p>
      )}
    </article>
  );
}
