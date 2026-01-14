"use client";

import { dlEvent } from "../../lib/datalayer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons/faWhatsapp";

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
      "ep.cta_id": params.cta_id,
      "ep.method": params.method,
      "ep.product": params.product,
      "ep.page_location": params.page_location,
    }).toString();
    url.search = search;
    if (navigator.sendBeacon) navigator.sendBeacon(url.toString());
    else fetch(url.toString(), { method: "GET", keepalive: true });
  } catch {}
}

function WhatsAppFab({
  href = "https://wa.me/51987286231?text=Hola%2C%20%C2%BFPodr%C3%ADa%20darme%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20sistema%20y%20c%C3%B3mo%20podr%C3%ADa%20ayudar%20a%20mi%20empresa%3F%20Gracias.",
  ariaLabel = "Contactar por WhatsApp",
  cta_id = "whatsapp_float",
  className = "",
}) {
  const onClick = () => {
    const params = {
      method: "whatsapp",
      product: "VisualERP",
      cta_id,
      page_location: typeof window !== "undefined" ? window.location.href : "",
    };

    dlEvent("whatsapp_click", params);

    // Fallback si no existe GA/GTM
    const hasGtag =
      typeof window !== "undefined" && typeof window.gtag === "function";
    const hasGTM =
      typeof window !== "undefined" &&
      typeof window.google_tag_manager !== "undefined";
    if (!hasGtag && !hasGTM) {
      mpBeacon("whatsapp_click", params);
    }
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-3xl fixed bottom-6 left-4 md:bottom-8 md:left-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-1 ring-black/10 hover:brightness-95 hover:ring-2 hover:ring-offset-8 hover:ring-[#25d366] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition ${className}`}
    >
      {/* Ícono WhatsApp */}
      <FontAwesomeIcon icon={faWhatsapp} />
    </Link>
  );
}

export default WhatsAppFab;
