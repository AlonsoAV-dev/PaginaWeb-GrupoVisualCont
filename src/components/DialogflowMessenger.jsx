"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DialogflowMessenger() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  useEffect(() => {
    // Ocultar/mostrar el df-messenger basado en la ruta
    const dfMessenger = document.querySelector('df-messenger');
    if (dfMessenger) {
      if (isAdminRoute) {
        dfMessenger.style.display = 'none';
      } else {
        dfMessenger.style.display = '';
      }
    }
  }, [isAdminRoute]);

  return null;
}
