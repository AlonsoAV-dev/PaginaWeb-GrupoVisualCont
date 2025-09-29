import AboutUsCard from "@/shared/aboutUsCard";

const aboutData = [
  {
    title: "Nuestra Misión",
    content: [
      "Brindar soluciones tecnológicas accesibles y confiables",
      "Impulsar la transformación digital de empresas y profesionales",
      "Contribuir a mejorar la eficiencia y productividad de nuestros clientes",
    ],
    description:
      "Nuestra misión es ofrecer herramientas innovadoras que simplifiquen los procesos de gestión, fomenten la transparencia y permitan a las organizaciones crecer de manera sostenible.",
    image: "/images/nosotros/nosotros-mision.webp",
    reverse: false,
  },
  {
    title: "Nuestra Visión",
    content: [
      "Ser líderes en innovación tecnológica a nivel regional",
      "Consolidarnos como aliados estratégicos de nuestros clientes",
      "Promover un futuro digital inclusivo y sostenible",
    ],
    description:
      "Nuestra visión es convertirnos en referentes del sector, creando un ecosistema de soluciones que empoderen a las empresas y personas, generando un impacto positivo en la sociedad y en la economía.",
    image: "/images/nosotros/nosotros-vision.webp",
    reverse: true,
  },
];

function About() {
  return (
    <section className="pt-16 md:pt-24 space-y-16 md:space-y-22" id="about" role="region" aria-labelledby="about-title">
      <div className="text-center w-full">
        <h2 className="text-black dark:text-white" id="about-title">
          Conoce cuales son 
          <span className="block text-[#257CD0] dark:text-[#257CD0]">
            nuestras motivaciones
          </span>
        </h2>
      </div>
      {aboutData.map((data, index) => (
        <AboutUsCard key={index} aboutData={data} />
      ))}
    </section>
  );
}

export default About;
