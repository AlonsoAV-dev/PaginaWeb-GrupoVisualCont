"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import Script from "next/script";
import { zodResolver } from "@hookform/resolvers/zod";
import Certificates from "@/shared/certificates";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const ORIGIN = typeof window !== "undefined" ? window.location.origin : "";

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
  return <p className="mt-1 text-sm text-red-500">{children}</p>;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    // @ts-ignore
    window.onTurnstile = (t) => {
      setValue("turnstileToken", t, { shouldValidate: true });
    };
  }, [setValue]);

  //aqui va a ir la logica para enviar el formulario al backend
  const onSubmit = async (data) => {
    // console.log('✅ Datos validados (front):', data);
    // alert('Formulario válido. (Aún no enviamos al backend)');

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      alert(j?.error || "No se pudo enviar. Intenta de nuevo.");
      return
    };
    const j = await res.json().catch(() => ({}));
    alert("¡Enviado! Te responderemos pronto.");
    reset();
  };

  return (
    <section id="quote-form" role="region" aria-labelledby="quote-form-title">
      <h2
        className="text-black dark:text-white text-4xl md:text-6xl font-medium text-center"
        id="quote-form-title"
      >
        Contáctanos a cualquier hora y <br />
        <span className="text-[#00AEEF] dark:text-[#00AEEF]">
          desde cualquier lugar
        </span>
      </h2>
      <p className="mt-6 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-center">
        Incluye capacitacion sin coste alguno y soporte tecnico, comunicate con
        nuestro team especializado. ¡Dinos cómo podemos ayudarte!
      </p>

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
          <h2 className="text-lg sm:text-xl font-semibold" id="quote-form-desc">
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
                  placeholder="+51 999 999 999"
                  className="w-full rounded-xl bg-[#E7E6E9] dark:bg-[#232428] px-4 py-3 text-black dark:text-white placeholder:text-neutral-400 outline-none transition focus:ring-4 focus:ring-[#00AEEF]/30"
                  aria-invalid={!!errors.phone}
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

            <div
              className="cf-turnstile"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              data-callback="onTurnstile"
            />

            {errors.turnstileToken && (
              <p className="error">{errors.turnstileToken.message}</p>
            )}
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