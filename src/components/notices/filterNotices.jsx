"use client"

export default function FilterNotices({ activeFilter, setActiveFilter, categorias }) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <button
        onClick={() => setActiveFilter("all")}
        className={`px-4 py-2 rounded-md text-sm transition-colors ${
          activeFilter === "all"
            ? "bg-[#247cd1] text-white"
            : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
        }`}
      >
        Todas las Noticias
      </button>
      {categorias.map((categoria) => (
        <button
          key={categoria.id_categoria}
          onClick={() => setActiveFilter(categoria.id_categoria.toString())}
          className={`px-4 py-2 rounded-md text-sm transition-colors ${
            activeFilter === categoria.id_categoria.toString()
              ? "bg-[#247cd1] text-white"
              : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {categoria.nombre}
        </button>
      ))}
    </div>
  )
}