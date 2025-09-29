import CapabilitiesCard from "@/shared/capabilitiesCard"

function Capabilities({ service, coloredTitle, capabilities }) {
  return (
    <section className="pt-16 md:pt-24" id="capabilities" role="region" aria-labelledby="capabilities-title">
      {/* titulo */}
      <h2 className="text-black dark:text-white mb-12" id="capabilities-title">
        Con {service}
        <span className="block text-[#257CD0] dark:text-[#257CD0]">
          {coloredTitle}
        </span>
      </h2>
      {/* contenido */}
      <div className="space-y-16">
        {capabilities.map((capability, index) => (
          <CapabilitiesCard 
            key={index} 
            capabilitiy={capability} 
          />
        ))}
      </div>
    </section>
  );
}

export default Capabilities;
