/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.grupovisualcont.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "weekly",
  priority: 1.0,
  exclude: ["/admin", "/api/*"],
};