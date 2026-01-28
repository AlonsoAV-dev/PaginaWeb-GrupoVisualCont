// Sitemap dinámico para Next.js
export default async function sitemap() {
  const baseUrl = 'https://www.grupovisualcont.com';

  // Rutas estáticas
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/noticias/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contable/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/facturador/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/erp/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/planilla/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nosotros/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cotizar/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Obtener noticias dinámicas
  try {
    // Usar localhost para builds locales, URL pública para producción
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.grupovisualcont.com';
    const res = await fetch(`${apiUrl}/api/noticias?estado=publicada&limit=1000`, {
      next: { revalidate: 3600 }, // Revalidar cada hora
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (res.ok) {
      const data = await res.json();
      const noticias = data.noticias || [];

      const noticiasRoutes = noticias.map((noticia) => ({
        url: `${baseUrl}/noticias/${noticia.slug}/`,
        lastModified: new Date(noticia.fecha_publicacion || noticia.creado_en),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));

      return [...routes, ...noticiasRoutes];
    }
  } catch (error) {
    console.error('Error fetching noticias for sitemap:', error);
    // Retornar solo las rutas estáticas en caso de error
  }

  return routes;
}
