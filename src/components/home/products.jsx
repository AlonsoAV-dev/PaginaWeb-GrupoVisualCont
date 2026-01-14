"use client";

import { useState } from "react";
import { Button } from "../../ui/button";
import DefaultButton from "../../shared/defaultButton";
import Image from "next/image";

const products = [
  {
    id: "contabilidad",
    name: "Software de Contabilidad",
    description:
      "Lleva la contabilidad al día, con los libros electrónicos ple y sire sunat, automatiza las áreas de la empresa integrando con el sistema integrado ERP y con la API de visualCONT.",
    features: [
      "Integración con cualquier sistema integrado ERP",
      "Conexión con API sunat",
      "Validación de comprobantes electrónicos",
      "Mira la propuesta del registro de compras y el registro de ventas SIRE sunat", // observa por mira
      "Software Multiempresa",
      "Libros de contabilidad automáticos",
      "Exportación a Excel y cualquier formato",
      "Consulta ruc y dni",
    ],
    image: "/images/contable/contable-producto.webp",
    href: "/contable",
  },
  {
    id: "facturacion",
    name: "Software de Facturación",
    description:
      "Simplifica la emisión de tus comprobantes electrónicos see sunat, tus guías de remisión y notas de créditos serán validadas y aceptadas por sunat en tiempo real y ahora tus declaraciones de impuestos estarán en la propuesta.",
    features: [
      "Certificado digital incluido",
      "Personaliza colores y logotipo de tu empresa",
      "Homologación con sunat exonerada",
      "Envío por email a tus clientes",
      "Soporte técnico permanente",
      "Puedes trabajar con varios establecimientos a la vez",
      "Conexión API con cualquier software ERP",
      "Integramos tu contabilidad, inventario y ventas a nuestras soluciones.",
    ],
    image: "/images/facturador/facturador-producto.webp",
    href: "/facturador",
  },
  {
    id: "planilla",
    name: "Software de Planillas",
    description:
      "Gestiona a tus colaboradores cumpliendo con normas y regulaciones laborales. Genera contratos, planillas electrónicas, beneficios sociales, AFP, PLAME, T-Registro, bancos y más de manera segura y eficiente.",
    features: [
      "Optimiza la gestión de tu fuerza laboral para potenciar el negocio",
      "Centraliza datos de personas y habilidades en una sola plataforma",
      "Actualizaciones automáticas ante cambios legales y regulatorios",
      "Obtén planillas de sueldos en segundos con cálculos automatizados",
      "Permite la firma electrónica de documentos",
      "Controla asistencia y horarios de tus colaboradores",
    ],
    image: "/images/planilla/planilla-producto.webp",
    href: "/planilla",
  },
  {
    id: "integrado",
    name: "Software ERP Integrado",
    description:
      "Centraliza y automatiza funciones clave de tu negocio: compras, ventas, inventarios, tesorería y contabilidad. Escalable y adaptable, con integraciones API a SUNAT y otros softwares. Incluye capacitación y soporte técnico.",
    features: [
      "Registra y controla inventarios, operaciones de entrada y salida",
      "Gestión multi-almacén con control de ubicaciones",
      "Inventarios en tiempo real con lotes y ajustes automáticos",
      "Tesorería y flujo de caja, optimiza tu sistema de tesoreria",
      "Integra tu ecommerce con inventarios, pedidos y facturación electrónica",
      "Automatiza tu contabilidad con compras, ventas y reportes",
      "Genera libros electrónicos PLE y SIRE SUNAT con total seguridad",
    ],
    image: "/images/integrado/integrado-producto.webp",
    href: "/erp",
  },
  

];

export default function Products() {
  const [activeProduct, setActiveProduct] = useState(products[0]);

  return (
    <section
      className="pt-16 md:pt-24"
      id="products"
      role="region"
      aria-labelledby="products-title"
    >
      <div className="text-center mb-12">
        <h2 className="text-black dark:text-white mb-6" id="products-title">
          Nuestras
          <span className="text-[#257CD0] dark:text-[#257CD0]">
            {" "}
            Soluciones
          </span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Con nuestro sistema de contabilidad controla los procesos de tu
          negocio de forma rápida y eficiente.
        </p>
      </div>

      {/* Product Tabs */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
        {products.map((product) => (
          <Button
            key={product.id}
            variant={activeProduct.id === product.id ? "default" : "outline"}
            onClick={() => setActiveProduct(product)}
            className={`px-7 py-2.5 rounded-md text-base font-medium w-full md:w-1/4 transition duration-300 ${
              activeProduct.id === product.id
                ? "bg-[#1F4C8F] hover:bg-[#00AEEF] text-white"
                : "ring-1 ring-gray-300 dark:ring-gray-700 hover:ring-[#1F4C8F] dark:hover:ring-[#1F4C8F]"
            }`}
          >
            {product.name}
          </Button>
        ))}
      </div>

      {/* Product Content */}
      <div className="card border-gray-200 dark:border-gray-700">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="p-8 md:p-10 lg:p-12">
            <h3 className=" pb-4 text-4xl md:text-5xl font-semibold text-[#1F4C8F] dark:text-white">
              {activeProduct.name}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
              {activeProduct.description}
            </p>
            <ul className="space-y-3">
              {activeProduct.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#257CD0] rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex gap-10 justify-start items-center mt-6">
              <DefaultButton> Conoce mas </DefaultButton>
              <DefaultButton
                className="text-sm font-medium underlineText text-black dark:text-white hover:text-[#0070F2] dark:hover:text-[#0070F2]"
                route={activeProduct.href}
              >
                Ir al producto
              </DefaultButton>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src={activeProduct.image || "/placeholder.svg"}
              alt={activeProduct.name}
              width={300}
              height={300}
              className="rounded-lg w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
