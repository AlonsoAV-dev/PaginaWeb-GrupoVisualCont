"use client";

import ChatBotBar from "./chatBotBar";
import WhatsAppFab from "./whatsappFab";

export default function IconsGroup() {
  return (
    <div
      className="
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        justify-content: center;
      "
    >
      {/* Barra del chatbot tipo SUNAT */}
    
      <ChatBotBar  />
       <WhatsAppFab /> 
      {/* Botón flotante de WhatsApp */}
      {/* <WhatsAppFab className="!static !bottom-auto !right-auto" /> */}
      
    </div>
  );
}
