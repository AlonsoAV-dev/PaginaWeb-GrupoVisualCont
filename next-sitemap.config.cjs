/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.grupovisualcont.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin/*", "/api/*", "/admin", "/noticias/[slug]", "/noticias/[cod_unico]"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
    additionalSitemaps: [
      "https://www.grupovisualcont.com/sitemap.xml",
    ],
  },
  transform: async (config, path) => {
    // Prioridades personalizadas por ruta
    let priority = 0.7;
    let changefreq = "weekly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path.startsWith("/noticias") && path !== "/noticias/") {
      priority = 0.8;
      changefreq = "daily";
    } else if (path === "/noticias/") {
      priority = 0.9;
      changefreq = "daily";
    } else if (
      path === "/contable/" ||
      path === "/facturador/" ||
      path === "/erp/" ||
      path === "/planilla/"
    ) {
      priority = 0.9;
      changefreq = "monthly";
    } else if (path === "/nosotros/" || path === "/cotizar/") {
      priority = 0.8;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};