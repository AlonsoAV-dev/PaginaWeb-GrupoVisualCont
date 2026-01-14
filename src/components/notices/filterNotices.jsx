"use client"

import { id } from "zod/v4/locales"

export default function FilterNotices({ activeFilter, setActiveFilter }) {
  const filters = [
    { id: "all", label: "Todas las Noticias" },
    { id: "tributación", label: "Tributación" },
    { id: "contabilidad", label: "Contabilidad" },
    { id: "laboral", label: "Laboral" },
    { id: "finanzas", label: "Finanzas" },
    { id: "economía", label: "Economía" },
    { id: "tecnología", label: "Tecnología" },
    { id: "coaching", label: "Coaching" },
  ]

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`px-4 py-2 rounded-md text-sm transition-colors ${
            activeFilter === filter.id
              ? "bg-[#247cd1] text-white"
              : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}