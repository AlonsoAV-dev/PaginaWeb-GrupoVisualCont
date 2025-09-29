import Link from "next/link";

function Features({ title, coloredTitle, description, services }) {
  return (
    <section className="pt-16 md:pt-24" id="features" role="region" aria-labelledby="features-title">
      <h2 className="text-black dark:text-white mb-6" id="features-title">
        {title}
        <span className="block text-[#257CD0] dark:text-[#257CD0]">
          {coloredTitle}
        </span>
      </h2>
      <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">
        {description}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`card p-6 shadow-md hover:shadow-lg hover:ring-[#257CD0] hover:ring-2 transition-shadow duration-300 md:text-start text-center ${
              index >= 4 ? "hidden md:block" : ""
            }`}
          >
            <div className="flex justify-center md:justify-start">
              <div
                className={`${service.color} w-12 h-12 rounded-full flex mb-4 shadow-sm justify-center items-center`}
              >
                <service.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
              {service.title}
            </h3>
            {service.routeFile ? (
              <Link
                href={service.routeFile}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-gray-700 dark:text-gray-300 underline">
                  {service.description}
                </p>
              </Link>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                {service.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
