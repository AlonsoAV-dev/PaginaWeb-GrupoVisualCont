"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { z } from "zod";
import Script from "next/script";
import { zodResolver } from "@hookform/resolvers/zod";
import Certificates from "@/shared/certificates";
import { dlEvent } from "../../../lib/datalayer";
import { usePathname } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GA_MEAS_ID = process.env.NEXT_PUBLIC_GA_ID || "";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

// --- Reglas (frontend, JS) ---
const schema = z.object({
  firstAndLastName: z.string().trim().min(2, "Ingresa tu nombre y apellido"),
  ruc: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ?? "").replace(/\D/g, "")) // solo dígitos
    .refine((v) => !v || v.length === 11, {
      message: "RUC debe tener 11 dígitos",
    }),
  razonSocial: z.string().trim().optional(),
  email: z.string().trim().email("Correo inválido"),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || v.length === 9, { message: "Teléfono invalido" })
    .refine((v) => !v || /^[\d+\s()-]{6,}$/.test(v), {
      message: "Teléfono inválido",
    }),
  service: z.enum(["VisualCont", "VisualFact", "VisualPlan", "VisualInt"], {
    required_error: "Selecciona un servicio",
    invalid_type_error: "Selecciona un servicio",
    message: "Selecciona un servicio",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mín. 10 caracteres)")
    .optional(),
  turnstileToken: z.string().min(1, "Verificación requerida"),
});

function ErrorText({ children }) {
  if (!children) return null;
  return <p className="text-sm text-red-500">{children}</p>;
}

function mpBeacon(eventName, params = {}) {
  try {
    const url = new URL("https://www.google-analytics.com/g/collect");
    const search = new URLSearchParams({
      v: "2",
      tid: GA_MEAS_ID,
      // client/session mínimos para que GA4 “cuente”
      cid: "lead." + (crypto?.randomUUID?.() || Date.now()),
      sid: String(Math.floor(Date.now() / 1000)),
      sct: "1",
      seg: "1",
      _s: "1",
      dl: typeof window !== "undefined" ? window.location.href : "",
      dt: typeof document !== "undefined" ? document.title : "",
      sr:
        typeof window !== "undefined"
          ? `${window.screen?.width || 0}x${window.screen?.height || 0}`
          : "0x0",
      ul:
        typeof navigator !== "undefined"
          ? (navigator.language || "es-es").toLowerCase()
          : "es-es",
      en: eventName,
      // params -> ep.*
      ...Object.fromEntries(
        Object.entries(params).map(([k, v]) => [`ep.${k}`, String(v ?? "")])
      ),
    }).toString();
    url.search = search;

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(url.toString());
    } else {
      fetch(url.toString(), { method: "GET", keepalive: true });
    }
  } catch {}
}

function sendGA(eventName, params = {}) {
  dlEvent(eventName, params);

  const hasGtag =
    typeof window !== "undefined" && typeof window.gtag === "function";
  const hasGTM =
    typeof window !== "undefined" &&
    typeof window.google_tag_manager !== "undefined";

  if (!hasGtag && !hasGTM) {
    mpBeacon(eventName, params);
  }
}

export default function Form() {
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
    clearErrors,
    reset,
  } = useForm({ resolver: zodResolver(schema), mode: "onBlur" });

  const tsContainerRef = useRef(null);
  const tsWidgetIdRef = useRef(null);

  useEffect(() => {
    setValue("turnstileToken", "", { shouldValidate: true });
    clearErrors("turnstileToken");

    function renderTurnstile() {
      const ts = typeof window !== "undefined" ? window.turnstile : undefined;
      if (!ts || !tsContainerRef.current || !TURNSTILE_SITE_KEY) return;

      // Si ya existe un widget, lo reseteamos para forzar nuevo token
      if (tsWidgetIdRef.current) {
        try {
          ts.reset(tsWidgetIdRef.current);
        } catch {}
      } else {
        tsWidgetIdRef.current = ts.render(tsContainerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "auto",
          callback: (token) => {
            setValue("turnstileToken", token, { shouldValidate: true });
            clearErrors("turnstileToken");
          },
          "error-callback": () => {
            setError("turnstileToken", {
              type: "manual",
              message: "Vuelve a verificar",
            });
          },
          "timeout-callback": () => {
            setError("turnstileToken", {
              type: "manual",
              message: "La verificación expiró",
            });
          },
          "expired-callback": () => {
            setValue("turnstileToken", "", { shouldValidate: true });
            setError("turnstileToken", {
              type: "manual",
              message: "La verificación expiró",
            });
          },
        });
      }
    }

    // Si el script aún no está listo, reintenta suave
    let tries = 0;
    const id = setInterval(() => {
      if (typeof window !== "undefined" && window.turnstile) {
        clearInterval(id);
        renderTurnstile();
      } else if (++tries > 20) {
        clearInterval(id);
      }
    }, 150);

    return () => clearInterval(id);
  }, [pathname, setValue, setError, clearErrors]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        alert(j?.error || "No se pudo enviar. Intenta de nuevo.");
        return;
      }
      await res.json().catch(() => ({}));
      
      // ÉXITO
      sendGA("lead_form_submitted", {
        form_id: "cotizar",
        service: data.service || "(none)",
        method: "web",
      });
      alert("¡Enviado! Te responderemos pronto.");
      reset();

      // Reiniciamos Turnstile
      if (
        typeof window !== "undefined" &&
        window.turnstile &&
        tsWidgetIdRef.current
      ) {
        window.turnstile.reset(tsWidgetIdRef.current);
      }
    } catch (err) {
      alert("No se pudo enviar. Intenta de nuevo.");
    }
  };

  return (
    <section id="quote-form" role="region" aria-labelledby="quote-form-title">
      <div className="w-full flex flex-col md:flex-row gap-6 md:items-start pt-6 md:pt-12">
        <div className="flex flex-col w-full md:w-1/2">
          <Certificates className="grid grid-cols-1 gap-y-8 px-6 md:px-10 py-6 md:py-12" />
        </div>

        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />

        <form
          className="card p-6 sm:p-8 mx-auto w-full md:w-1/2 justify-center"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          role="form"
          aria-labelledby="quote-form-title"
          aria-describedby="quote-form-desc"
        >
          <h2
            className="text-lg sm:text-xl font-semibold"
            id="quote-form-title"
          >
            Solicita tu demo sin costo alguno.
          </h2>

          <div className="mt-6 grid gap-5">
            {/* Nombres & Apellidos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-medium"
                >
                  Nombres y Apellidos{" "}
                  <span aria-hidden className="text-[#00AEEF]">
                    *
                  </span>
                </label>
                <input
                  id="firstAndLastName"
                  {...register("firstAndLastName")}
                  placeholder="Juan Carlos"
                  className="w-full rounded-xl bg-[#E7E6E9] dark:bg-[#232428] px-4 py-3 text-black dark:text-white placeholder:text-neutral-400 outline-none transition focus:ring-4 focus:ring-[#00AEEF]/30"
                  aria-invalid={!!errors.firstAndLastName}
                />
                <ErrorText>{errors.firstAndLastName?.message}</ErrorText>
              </div>

              {/* RUC */}
              <div>
                <label htmlFor="ruc" className="mb-2 block text-sm font-medium">
                  RUC de la empresa
                </label>
                <input
                  id="ruc"
                  {...register("ruc")}
                  inputMode="numeric"
                  placeholder="2045XXXXXXXX"
                  className="w-full rounded-xl bg-[#E7E6E9] dark:bg-[#232428] px-4 py-3 text-black dark:text-white placeholder:text-neutral-400 outline-none transition focus:ring-4 focus:ring-[#00AEEF]/30"
                  aria-invalid={!!errors.ruc}
                  maxLength={11}
                />
                <ErrorText>{errors.ruc?.message}</ErrorText>
              </div>
            </div>

            {/* Razón Social */}
            <div>
              <label
                htmlFor="razonSocial"
                className="mb-2 block text-sm font-medium"
              >
                Razón social
              </label>
              <input
                id="razonSocial"
                {...register("razonSocial")}
                placeholder="Mi Empresa S.A.C."
                className="w-full rounded-xl bg-[#E7E6E9] dark:bg-[#232428] px-4 py-3 text-black dark:text-white placeholder:text-neutral-400 outline-none transition focus:ring-4 focus:ring-[#00AEEF]/30"
                aria-invalid={!!errors.razonSocial}
              />
              <ErrorText>{errors.razonSocial?.message}</ErrorText>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Correo electrónico{" "}
                  <span aria-hidden className="text-[#00AEEF]">
                    *
                  </span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="tucorreo@empresa.com"
                  className="w-full rounded-xl bg-[#E7E6E9] dark:bg-[#232428] px-4 py-3 text-black dark:text-white placeholder:text-neutral-400 outline-none transition focus:ring-4 focus:ring-[#00AEEF]/30"
                  aria-invalid={!!errors.email}
                />
                <ErrorText>{errors.email?.message}</ErrorText>
              </div>

              {/* Teléfono */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Teléfono
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  {...register("phone")}
                  placeholder="999 999 999"
                  className="w-full rounded-xl bg-[#E7E6E9] dark:bg-[#232428] px-4 py-3 text-black dark:text-white placeholder:text-neutral-400 outline-none transition focus:ring-4 focus:ring-[#00AEEF]/30"
                  aria-invalid={!!errors.phone}
                  maxLength={9}
                />
                <ErrorText>{errors.phone?.message}</ErrorText>
              </div>
            </div>

            {/* Servicio */}
            <div>
              <label
                htmlFor="service"
                className="mb-2 block text-sm font-medium"
              >
                ¿Por qué servicio estás interesada/o?{" "}
                <span aria-hidden className="text-[#00AEEF]">
                  *
                </span>
              </label>
              <select
                id="service"
                {...register("service")}
                defaultValue=""
                className="w-full rounded-xl bg-[#E7E6E9] dark:bg-[#232428] px-4 py-3 text-black dark:text-white outline-none transition focus:ring-4 focus:ring-[#00AEEF]/30"
                aria-invalid={!!errors.service}
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="VisualCont">Software de Contabilidad</option>
                <option value="VisualFact">Software de Facturación</option>
                <option value="VisualPlan">Software de Planilla</option>
                <option value="VisualInt">Software Integrado ERP</option>
              </select>
              <ErrorText>{errors.service?.message}</ErrorText>
            </div>

            {/* Mensaje */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                rows={4}
                {...register("message")}
                placeholder="Cuéntanos brevemente sobre tu necesidad o proyecto…"
                className="w-full resize-y rounded-xl bg-[#E7E6E9] dark:bg-[#232428] px-4 py-3 text-black dark:text-white placeholder:text-neutral-400 outline-none transition focus:ring-4 focus:ring-[#00AEEF]/30"
                aria-invalid={!!errors.message}
              />
              <ErrorText>{errors.message?.message}</ErrorText>
            </div>

            <div ref={tsContainerRef} className="mt-2" aria-live="polite" />
            <ErrorText>{errors.turnstileToken?.message}</ErrorText>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1F4C8F] px-5 py-2.5 font-medium text-white transition hover:bg-[#257cd0] focus:outline-none focus:ring-4 focus:ring-[#00AEEF]/30 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Enviar
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10.22 3.97a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06l3.97-3.97H3.75a.75.75 0 010-1.5h10.44l-3.97-3.97a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
