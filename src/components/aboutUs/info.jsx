function Info() {
  return (
    <section
      className="pt-16 md:pt-24"
      id="info"
      role="region"
      aria-labelledby="info-title"
    >
      <div className="text-center w-full mb-12">
        <h2 className="text-black dark:text-white mb-6" id="info-title">
          Dale un impulso a tu negocio con
          <span className="block text-[#257CD0] dark:text-[#257CD0]">
            Nuestras soluciones ERP
          </span>
        </h2>
      </div>
      <div className="card grid grid-cols-1 md:grid-cols-[1fr_24px_1fr_24px_1fr] gap-5 md:gap-8 text-center md:py-10 py-8">
        <div className="">
          <h2 className="text-5xl md:text-6xl text-[#00AEEF] dark:text-[#00AEEF]">
            +4.000
          </h2>
          <p className="text-lg">Empresas</p>
        </div>
        <div
          aria-hidden="true"
          className="hidden md:block top-5 h-full w-[4px] bg-gray-300 z-0"
        />
        <div className="">
          <h2 className="text-5xl md:text-6xl text-[#00AEEF] d    ark:text-[#00AEEF]">
            +20
          </h2>
          <p className="text-lg">Años en el mercado</p>
        </div>
        <div
          aria-hidden="true"
          className="hidden md:block top-5 h-full w-[4px] bg-gray-300 z-0"
        />
        <div className="">
          <h2 className="text-5xl md:text-6xl text-[#00AEEF] dark:text-[#00AEEF]">
            +8.000
          </h2>
          <p className="text-lg">Usuarios a nivel nacional</p>
        </div>
      </div>
    </section>
  );
}

export default Info;
