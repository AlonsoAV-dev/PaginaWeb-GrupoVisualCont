"use client";

import { useState } from "react";
import Link from "next/link";

function Pricing({
  title = "Planes y ",
  coloredTitle = "Precios",
  subtitle = "Elige el plan que mejor se adapte a tu operación",
  plans = [],
  hasMonthly = true,  // Nueva prop para controlar disponibilidad
  hasAnnual = true,   // Nueva prop para controlar disponibilidad
}) {
  const [billing, setBilling] = useState(hasMonthly ? "monthly" : "annual");

  return (
    <section
      className="pt-16 md:pt-24"
      id="pricing"
      role="region"
      aria-labelledby="pricing-title"
    >
      {/* Header */}
      <div className="max-w-6xl  mx-auto flex items-start justify-between gap-6">
        <h2 className="text-black dark:text-white mb-6" id="pricing-title">
          {title}
          <span className="text-[#257CD0] dark:text-[#257CD0]">
            {coloredTitle}
          </span>
        </h2>

        {/* Toggle Mensual / Anual */}
        <div className="ml-auto">
          <div
            className={`inline-flex items-center rounded-full border border-slate-200 p-1 bg-white dark:bg-slate-900`}
          >
            <button
              type="button"
              onClick={() => hasMonthly && setBilling("monthly")}
              disabled={!hasMonthly}
              aria-pressed={billing === "monthly"}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                billing === "monthly"
                  ? `bg-[#1F4C8F] text-white shadow`
                  : hasMonthly
                  ? "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  : "text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-50"
              }`}
            >
              Mensual
            </button>
            <button
              type="button"
              onClick={() => hasAnnual && setBilling("annual")}
              disabled={!hasAnnual}
              aria-pressed={billing === "annual"}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                billing === "annual"
                  ? `bg-[#1F4C8F] text-white shadow`
                  : hasAnnual
                  ? "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  : "text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-50"
              }`}
            >
              Anual
            </button>
          </div>
        </div>
      </div>

      <p className="max-w-2xl text-gray-700 dark:text-gray-300">{subtitle}</p>

      {/* Cards */}
      <div
        className={`mx-auto mt-10 grid gap-6 lg:gap-8 md:justify-items-center ${
          plans.length === 2
            ? "grid-cols-1 lg:grid-cols-2"
            : "grid-cols-1 lg:grid-cols-3"
        }`}
      >
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`card w-full rounded-2xl p-6 md:p-7 flex flex-col shadow-sm hover:shadow-md transition ${
              plan.highlighted
                ? `border-2 border-[#1F4C8F]`
                : `border border-slate-200 dark:border-slate-700`
            }`}
          >
            <div className="flex flex-row justify-between">
              {/* Nombre del plan */}
              <h3 className="text-xl md:text-2xl font-semibold text-black dark:text-white">
                {plan.name}
              </h3>

              {/* Badge favorito */}
              {plan.highlighted && (
                <div className="mb-4">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#1F4C8F] text-white`}
                  >
                    ★ Más popular
                  </span>
                </div>
              )}
            </div>

            {/* Precio + versión */}
            {plan.custom ? (
              <div>
                <div className="mt-3 pt-3 flex items-baseline gap-2">
                  <span
                    className={`text-3xl md:text-4xl font-bold text-[#1F4C8F] dark:text-white`}
                  >
                    ¡Cotiza Ahora!
                  </span>
                </div>
                <p
                  className={`mt-1 text-xs uppercase tracking-wide text-black dark:text-white`}
                >
                  ¡Personalizalo segun tus necesidades!
                </p>
              </div>
            ) : (
              <div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span
                    className={`text-3xl md:text-4xl font-bold text-[#1F4C8F] dark:text-white`}
                  >
                    {plan.currency === "USD" ? "$" : "S/."}
                    {billing === "annual" ? plan.annual : plan.monthly}
                  </span>
                  <span className={`text-sm text-black dark:text-white`}>
                    / {billing === "annual" ? "año" : "mes"}
                  </span>
                </div>
                <p
                  className={`mt-1 text-xs uppercase tracking-wide text-black dark:text-white`}
                >
                  Versión: {billing === "annual" ? "Anual" : "Mensual"}
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-5 max-w-full">
              <Link
                href={
                  billing === "annual" ? plan.ctaAnnualUrl : plan.ctaMonthlyUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                type="button"
                className={`${
                  plan.highlighted
                    ? `bg-[#1F4C8F] hover:bg-[#00AEEF] text-white transition duration-300`
                    : `border-gray-300 border-2 dark:border-gray-600 hover:border-[#1F4C8F] dark:hover:border-[#1F4C8F]`
                } px-7 py-2.5 rounded-md text-base font-medium w-full text-center block`}
              >
                {plan.cta}
              </Link>
            </div>

            {/* Divider */}
            <div className={`my-6 h-px w-full bg-slate-200`} />

            {/* Features */}
            <ul className="mt-2 space-y-3 text-sm">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span
                    className={`mt-1 inline-block h-2 w-2 rounded-full bg-[#1F4C8F]`}
                  />
                  <span className="text-slate-700 dark:text-slate-300">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;