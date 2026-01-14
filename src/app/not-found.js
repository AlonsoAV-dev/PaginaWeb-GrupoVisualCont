import Link from "next/link";
import Navbar from "@/shared/navbar";
import Footer from "@/shared/footer";
import WhatsAppFab from "@/shared/whatsappFab";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            Ups... Página no encontrada
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Lamentamos el inconveniente pero, la página que buscas no existe.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
                href={"/"}
                className="rounded-md bg-[#1F4C8F] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#1F4C8F]/80 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
                Volver al inicio
            </Link>
          </div>
        </div>
      </main>
      <Footer />

      <WhatsAppFab />
    </>
  );
}
