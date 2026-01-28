"use client";

import { useCallback } from "react";

export default function ChatBotBar() {
  const handleClick = useCallback(() => {
    const df = document.querySelector("df-messenger");
    if (!df || !df.shadowRoot) return;

    const root = df.shadowRoot;
    const icon =
      root.querySelector(".df-chat-icon") || root.querySelector("button");
    if (!icon) return;
    icon.click();
  }, []);

  return (
    <button
      onClick={handleClick}
      className="
        fixed
        bottom-6 right-16
        md:right-20 md:bottom-8
        flex items-start gap-3
        bg-[#1F4C8F] text-white
        px-4 py-2 rounded-full
        shadow-lg
        z-50
        hover:brightness-110 transition
        mr-4
      "
      aria-label="Abrir chat VisualCont"
    >
      <div className="h-10 w-10 rounded-full overflow-hidden bg-white shadow flex items-center justify-center">
        <img
          src="/images/banner/visualBanner.jpg" 
          alt="Asistente Virtual VisualCont - Soporte en línea"
          title="Haz clic para abrir el chat de soporte"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col leading-tight text-left">
        <span className="text-xs opacity-90">¿Necesitas ayuda?</span>
        <span className="text-sm font-semibold italic">
          Pregúntale a VisualCont
        </span>
      </div>

      <span className="ml-auto text-lg font-bold opacity-90">⌄</span>
    </button>
  );
}
