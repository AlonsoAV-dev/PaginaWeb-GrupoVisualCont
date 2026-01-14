import Navbar from "@/shared/navbar";
import Footer from "@/shared/footer";
import WhatsAppFab from "@/shared/whatsappFab";
import Link from "next/link";

export default function NoticeNotFound() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      <Navbar />
      <div className="container py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-medium text-black dark:text-white mb-4">Noticia no encontrada</h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          La noticia que tratas de buscar no existe o ha sido movido.
        </p>
        <Link
          href="/noticias"
          className="inline-flex items-center justify-center px-6 py-3 bg-[#1f4c8f] text-white rounded-lg text-base font-medium hover:bg-[#00AEEF] transition-colors"
        >
          Regresar a noticias
        </Link>
      </div>
      <Footer />

      <WhatsAppFab />
    </main>
  )
}