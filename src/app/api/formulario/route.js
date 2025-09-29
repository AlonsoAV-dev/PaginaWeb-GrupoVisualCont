// app/api/formulario/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Esquema de validación backend (usa Zod para reforzar la validación del frontend)
const bodySchema = z.object({
  firstAndLastName: z.string().trim().min(2),
  ruc: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ?? "").replace(/\D/g, ""))
    .refine((v) => !v || v.length === 11, {
      message: "RUC debe tener 11 dígitos",
    }),
  razonSocial: z.string().trim().optional(),
  email: z.string().trim().email(),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || v.length === 9, { message: "Teléfono inválido" })
    .refine((v) => !v || /^[\d+\s()-]{6,}$/.test(v), {
      message: "Teléfono inválido",
    }),
  service: z.enum(["VisualCont", "VisualFact", "VisualPlan", "VisualInt"]),
  message: z.string().trim().min(10).optional(),
  turnstileToken: z.string().min(1),
});

export async function POST(req) {
  const startedAt = Date.now();

  // Captura de metadatos básicos (IP, User-Agent, Origin) solo para fines de trazabilidad
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";
  const ua = req.headers.get("user-agent") || "unknown";
  const origin = req.headers.get("origin") || "unknown";

  try {
    // Verificación de que todas las variables de entorno requeridas estén configuradas
    const missing = [];
    if (!process.env.TURNSTILE_SECRET_KEY) missing.push("TURNSTILE_SECRET_KEY");
    if (!process.env.RESEND_API_KEY) missing.push("RESEND_API_KEY");
    if (!process.env.CONTACT_FROM_EMAIL) missing.push("CONTACT_FROM_EMAIL");
    if (!process.env.CONTACT_TO_EMAIL) missing.push("CONTACT_TO_EMAIL");
    if (!process.env.COPY_CONTACT_TO_EMAIL_ONE)
      missing.push("COPY_CONTACT_TO_EMAIL_ONE");
    if (!process.env.COPY_CONTACT_TO_EMAIL_TWO)
      missing.push("COPY_CONTACT_TO_EMAIL_TWO");

    if (missing.length) {
      console.error("[formulario] Missing env vars:", missing);
      return NextResponse.json(
        { error: "Server misconfigured" },
        { status: 500 }
      );
    }

    // Parseo del cuerpo de la petición
    const json = await req.json();

    // Honeypot: si el campo oculto "website" viene con datos, se ignora el envío
    if (typeof json?.website === "string" && json.website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    // Validación estricta de datos recibidos
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      console.warn("[formulario] Invalid body:", parsed.error.issues);
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    const {
      firstAndLastName,
      ruc,
      razonSocial,
      email,
      phone,
      service,
      message,
      turnstileToken,
    } = parsed.data;

    // Verificación server-side de Cloudflare Turnstile
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: ip, // si se desea enviar la ip del usuario
        }),
      }
    );

    const verifyJson = await verifyRes.json();
    if (!verifyRes.ok || !verifyJson?.success) {
      console.error("[formulario] Turnstile fail:", {
        status: verifyRes.status,
        verifyJson,
      });
      return NextResponse.json(
        { error: "Verificación fallida" },
        { status: 400 }
      );
    }

    // Configuración de envío de email con Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.CONTACT_TO_EMAIL;
    const cc_one = process.env.COPY_CONTACT_TO_EMAIL_ONE;
    const cc_two = process.env.COPY_CONTACT_TO_EMAIL_TWO;
    const from = process.env.CONTACT_FROM_EMAIL;
    const subject = `[Lead] ${service} — ${firstAndLastName} ${firstAndLastName}`;

    // Construcción del contenido en texto plano
    const text = [
      `Nuevo lead de cotización`,
      `----------------------------------------`,
      `Nombre:   ${firstAndLastName}`,
      razonSocial ? `Razón social: ${razonSocial}` : "",
      ruc ? `RUC: ${ruc}` : "",
      `Email:    ${email}`,
      phone ? `Teléfono: ${phone}` : "",
      `Servicio: ${service}`,
      "",
      message ? `Mensaje:\n${message}\n` : "",
      "— Metadatos —",
      `IP: ${ip}`,
      `UA: ${ua}`,
      `Origin: ${origin}`,
      `Fecha: ${new Date().toISOString()}`,
    ]
      .filter(Boolean)
      .join("\n");

    // Construcción del contenido en HTML (con escape para evitar inyección)
    const html = `
      <div style="font:14px/1.45 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial">
        <h2 style="margin:0 0 8px">Nuevo lead de cotización</h2>
        <table style="border-collapse:collapse">
          <tr><td><b>Nombre:</b></td><td>${escapeHtml(firstAndLastName)}
    </td></tr>
          ${
            razonSocial
              ? `<tr><td><b>Razón social:</b></td><td>${escapeHtml(
                  razonSocial
                )}</td></tr>`
              : ""
          }
          ${
            ruc
              ? `<tr><td><b>RUC:</b></td><td>${escapeHtml(ruc)}</td></tr>`
              : ""
          }
          <tr><td><b>Email:</b></td><td>${escapeHtml(email)}</td></tr>
          ${
            phone
              ? `<tr><td><b>Teléfono:</b></td><td>${escapeHtml(
                  phone
                )}</td></tr>`
              : ""
          }
          <tr><td><b>Servicio:</b></td><td>${escapeHtml(service)}</td></tr>
        </table>
        ${
          message
            ? `<hr style="margin:12px 0;border:none;border-top:1px solid #eee" />
               <p style="white-space:pre-wrap;margin:0"><b>Mensaje:</b>\n${escapeHtml(
                 message
               )}</p>`
            : ""
        }
        <hr style="margin:12px 0;border:none;border-top:1px solid #eee" />
        <p style="color:#666;margin:0">
          <b>Meta:</b> IP ${escapeHtml(ip)} · ${escapeHtml(ua)} · ${escapeHtml(
      origin
    )} · ${new Date().toISOString()}
        </p>
      </div>
    `;

    // Envío del correo
    const { data, error } = await resend.emails.send({
      from,
      to,
      cc: [
        cc_one,
        cc_two,
      ],
      subject,
      text,
      html,
      reply_to: email,
      headers: { "X-Lead-Source": "cotizador-web" },
    });

    if (error) {
      console.error("[formulario] Resend error:", error);
      return NextResponse.json(
        { error: "No se pudo enviar el email" },
        { status: 502 }
      );
    }

    // Respuesta exitosa con logging
    // console.log("[formulario] OK", {
    //   id: data?.id,
    //   tookMs: Date.now() - startedAt,
    // });
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("[formulario] Unhandled:", err?.message || err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// Utilidad para escapar caracteres especiales en HTML y evitar inyecciones
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
