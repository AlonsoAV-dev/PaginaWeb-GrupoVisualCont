"use client";

import { dlEvent } from "../../../lib/datalayer";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function mpBeacon(event, params = {}) {
  try {
    const url = new URL("https://www.google-analytics.com/g/collect");
    const search = new URLSearchParams({
      v: "2",
      tid: GA_ID,
      cid: "wapp." + (crypto?.randomUUID?.() || Date.now()),
      sid: String(Math.floor(Date.now() / 1000)),
      sct: "1",
      seg: "1",
      _s: "1",
      dl: typeof window !== "undefined" ? window.location.href : "",
      dt: typeof document !== "undefined" ? document.title : "",
      sr: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
      ul: (navigator.language || "es-es").toLowerCase(),
      en: event,
      "ep.type": params.type,
      "ep.plan": params.plan,
      "ep.service": params.service,
      "ep.price": params.price,
    }).toString();
    url.search = search;
    if (navigator.sendBeacon) navigator.sendBeacon(url.toString());
    else fetch(url.toString(), { method: "GET", keepalive: true });
  } catch {}
}

function Pricing({
  title = "Planes y ",
  coloredTitle = "Precios",
  subtitle = "Elige el plan que mejor se adapte a tu operación",
  plans = [],
  hasMonthly = true,
  hasAnnual = true,
  pathname = usePathname(),
}) {
  const onClick = ({ params }) => {
    dlEvent("choose_plan", params);

    // Fallback si no existe GA/GTM
    const hasGtag =
      typeof window !== "undefined" && typeof window.gtag === "function";
    const hasGTM =
      typeof window !== "undefined" &&
      typeof window.google_tag_manager !== "undefined";
    if (!hasGtag && !hasGTM) {
      mpBeacon("choose_plan", params);
    }
  };

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
        {/* Toggle Mensual / Anual */}
        <div className="ml-auto">
          <div
            className={`inline-flex items-center rounded-full border border-slate-200 p-1 bg-[#FAFBFF] dark:bg-slate-900`}
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

            className={`card h-fit w-full max-h- rounded-2xl flex flex-col shadow-sm hover:shadow-md transition overflow-hidden ${
              plan.highlighted
                ? `border-4 border-[#1F4C8F]`
                : `border border-slate-200 dark:border-slate-700`
            }`}
          >
            {/* Header del plan */}
            <div
              className={`relative bg-[#1F4C8F] text-white px-6 py-3.5 flex items-center text-center ${
                plan.highlighted
                  ? "justify-start pl-10 pr-20"
                  : "justify-center"
              }`}
            >
              {/* Título del plan */}
              <h3 className="text-lg md:text-xl font-semibold tracking-wide uppercase w-full text-center">
                {plan.name}
              </h3>

              {/* Badge recomendado */}
              {plan.highlighted && (
                <div className="absolute right-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white text-[#1F4C8F] shadow-sm">
                    ★ Más popular
                  </span>
                </div>
              )}
            </div>

            {/* Badge favorito */}

            {/* Contenido del card */}
            <div className="p-6 md:p-6 flex flex-col flex-1">          
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
                    ¡Personalízalo según tus necesidades!
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  {/* Precio anterior tachado - Solo para mensual */}
                  {billing === "monthly" && plan.monthlyOld && (
                    <div className="flex items-center justify-center mb-2">
                      <span
                        className={`text-sm md:text-lg text-slate-500 dark:text-slate-300 line-through`}
                      >
                        {plan.currency === "USD" ? "$" : "S/."}
                        {plan.monthlyOld}
                      </span>
                    </div>
                  )}

                  {/* Precio actual */}
                  <div className="mt-0 flex items-baseline justify-center gap-2">
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
                  {billing === "monthly" && plan.monthlyOld &&!pathname.includes("facturador") && (
                    <p className={`mt-0 text-sm tracking-wide text-zinc-800`}>
                      ${plan.monthlyOld - plan.monthly} de descuento por los primeros 3 meses
                    </p>
                  )}
                  {billing === "annual" && (
                    <p className={`mt-0 text-xs uppercase tracking-wide text-black dark:text-white`}>
                      Versión: Anual
                    </p>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="mt-5 max-w-full">
                <Link
                  href={
                    billing === "annual"
                      ? plan.ctaAnnualUrl
                      : plan.ctaMonthlyUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  type="button"
                  className={`${
                    plan.highlighted
                      ? `bg-[#1F4C8F] hover:bg-[#00AEEF] text-white transition duration-300`
                      : `border-gray-300 border-2 dark:border-gray-600 hover:border-[#1F4C8F] dark:hover:border-[#1F4C8F]`
                  } px-7 py-2.5 rounded-md text-base font-medium w-full text-center block`}
                  onClick={() => {
                    const params = {
                      type: billing === "annual" ? "Anual" : "Mensual",
                      plan: plan.name,
                      service: pathname,
                      price: billing === "annual" ? plan.annual : plan.monthly,
                    };
                    onClick({ params });
                  }}
                >
                  {plan.cta}
                </Link>
              </div>

              {/* Divider */}
              <div className={`my-6 h-px w-full bg-slate-200`} />

              {/* Features */}
              <ul className="mt-2 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-3 ${
                      f.toLowerCase().includes("nuevo")
                        ? "font-semibold text-[#1F4C8F]"
                        : ""
                    }`}
                  >
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#1F4C8F]" />
                    <span className="text-slate-700 dark:text-slate-300">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;
