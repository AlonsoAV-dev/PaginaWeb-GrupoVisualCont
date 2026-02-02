# 🎯 SEO y Optimización

Estrategia SEO implementada en Visual ERP.

## 📋 Resumen

El proyecto implementa una estrategia SEO completa con:
- ✅ Keywords dinámicas por página
- ✅ Schema.org JSON-LD
- ✅ Open Graph y Twitter Cards
- ✅ Sitemap automático
- ✅ URLs semánticas
- ✅ Metadata optimizada
- ✅ Accesibilidad (alt, aria-labels)

---

## 🔑 Sistema de Keywords

### Keywords por Página

Ver documentación completa en [KEYWORDS-PAGINAS.md](../KEYWORDS-PAGINAS.md)

**Páginas soportadas:**
- `home` - Página principal
- `contable` - Software Contable
- `erp` - ERP Integrado
- `facturador` - Facturador Electrónico
- `planilla` - Planilla Electrónica
- `nosotros` - Nosotros

### Implementación

```javascript
// Cargar keywords desde BD
const keywords = await getPageKeywords('contable');

// 1. Metadata HTML
keywords: formatKeywordsForMetadata(keywords)
// → ["software contable", "ple", "sunat"]

// 2. Schema.org
"keywords": formatKeywordsForSchema(keywords)
// → "software contable, ple, sunat"

// 3. Schema.org Things
"about": formatKeywordsAsThings(keywords)
// → [{"@type": "Thing", "name": "software contable"}]

// 4. Tags visuales
<KeywordTags keywords={keywords} />
```

---

## 📊 Metadata Dinámica

### Estructura Base

```javascript
export async function generateMetadata() {
  const keywords = await getPageKeywords('pageName');
  
  return {
    title: "Título optimizado | VisualCONT",
    description: "Descripción de 150-160 caracteres con keywords principales y llamado a la acción.",
    keywords: formatKeywordsForMetadata(keywords),
    alternates: {
      canonical: "/ruta-de-pagina",
    },
    openGraph: {
      type: "website",
      url: "/ruta-de-pagina",
      title: "Título para redes sociales",
      description: "Descripción para compartir en redes",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Descripción de imagen",
        },
      ],
      siteName: "Visual ERP",
      locale: "es_PE",
    },
    twitter: {
      card: "summary_large_image",
      title: "Título para Twitter",
      description: "Descripción para Twitter",
      images: ["/images/twitter-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
}
```

---

## 🏷️ Schema.org

### SoftwareApplication (Servicios)

```javascript
<Script
  id="ld-software"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "VisualCONT - Software de Contabilidad",
      keywords: formatKeywordsForSchema(keywords),
      about: formatKeywordsAsThings(keywords),
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Software contable para empresas...",
      url: "https://grupovisualcont.com/contable",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "39",
        highPrice: "99",
      },
    }),
  }}
/>
```

### WebPage

```javascript
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://grupovisualcont.com/contable#webpage",
  url: "https://grupovisualcont.com/contable",
  name: "Software de Contabilidad | VisualCONT",
  description: "...",
  inLanguage: "es-PE",
  isPartOf: {
    "@type": "WebSite",
    name: "Visual ERP",
    url: "https://grupovisualcont.com/",
  },
}
```

### BreadcrumbList

```javascript
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: "https://grupovisualcont.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contabilidad",
      item: "https://grupovisualcont.com/contable",
    },
  ],
}
```

### BlogPosting (Noticias)

```javascript
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Título de la noticia",
  image: "https://grupovisualcont.com/images/noticia.jpg",
  datePublished: "2026-01-28",
  dateModified: "2026-01-28",
  author: {
    "@type": "Person",
    name: "Equipo Visual ERP",
  },
  publisher: {
    "@type": "Organization",
    name: "Visual ERP",
    logo: {
      "@type": "ImageObject",
      url: "https://grupovisualcont.com/images/logo.png",
    },
  },
  keywords: ["keyword1", "keyword2"],
}
```

---

## 🗺️ Sitemap

### Configuración

**Archivo:** `next-sitemap.config.js`

```javascript
module.exports = {
  siteUrl: 'https://grupovisualcont.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
  },
};
```

### Generación

```bash
npm run postbuild
```

**Genera:**
- `public/sitemap.xml` - Sitemap principal
- `public/sitemap-0.xml` - URLs específicas
- `public/robots.txt` - Actualizado automáticamente

---

## 🖼️ Optimización de Imágenes

### Formato WebP

Todas las imágenes principales están en WebP:
- Menor tamaño (20-30% vs JPEG)
- Calidad equivalente
- Soporte en navegadores modernos

### Next.js Image

```jsx
import Image from "next/image";

<Image
  src="/images/contable/visualCONT.webp"
  alt="Software Contable VisualCONT - Gestión empresarial"
  width={600}
  height={400}
  priority={true} // Para hero images
  loading="lazy"  // Para imágenes below-the-fold
/>
```

### Atributos Alt

```jsx
// ❌ Mal
<img src="logo.png" alt="Logo" />

// ✅ Bien
<img 
  src="logo.png" 
  alt="Logo VisualCONT - Software Contable SUNAT" 
  title="VisualCONT - Sistema de Contabilidad"
/>
```

---

## 🔗 URLs Semánticas

### Estructura

```
✅ Buenas URLs:
/contable
/noticias/nueva-normativa-sunat-2026
/nosotros

❌ Malas URLs:
/page?id=123
/contenido.php?cat=5
/noticia?slug=nueva-normativa-sunat-2026
```

### Slugs

- Lowercase
- Sin espacios (usar guiones)
- Sin acentos en URLs
- Sin caracteres especiales

```javascript
// Generar slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Quitar acentos
    .replace(/[^a-z0-9]+/g, "-")     // Espacios → guiones
    .replace(/^-+|-+$/g, "");         // Trim guiones
}

// "Nueva Normativa SUNAT 2026" → "nueva-normativa-sunat-2026"
```

---

## 📈 Performance SEO

### Core Web Vitals

**LCP (Largest Contentful Paint):**
- Target: < 2.5s
- Hero images con `priority={true}`
- WebP format
- CDN para imágenes

**FID (First Input Delay):**
- Target: < 100ms
- JavaScript optimizado
- Lazy loading de componentes

**CLS (Cumulative Layout Shift):**
- Target: < 0.1
- Dimensiones explícitas en imágenes
- Reservar espacio para ads/embeds

### Lighthouse Score Objetivo

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 🔍 Google Search Console

### Setup

1. Registrar propiedad en [Google Search Console](https://search.google.com/search-console)
2. Verificar dominio (DNS o archivo HTML)
3. Enviar sitemap: `https://grupovisualcont.com/sitemap.xml`

### Monitorear

- **Cobertura:** Páginas indexadas vs excluidas
- **Rendimiento:** Impresiones, clics, CTR, posición promedio
- **Experiencia:** Core Web Vitals, usabilidad móvil
- **Mejoras:** Datos estructurados, breadcrumbs

---

## 🎯 Keywords Strategy

### Keywords Recomendadas

#### Home
- software erp perú
- gestión empresarial
- software contable perú
- facturación electrónica
- sistema erp integrado

#### Contable
- software contable sunat
- libros electrónicos ple
- sistema contable perú
- contabilidad en la nube
- sire sunat

#### ERP
- erp integrado perú
- sistema erp empresarial
- inventarios kardex
- gestión multiempresa
- erp pymes

#### Facturador
- facturación electrónica sunat
- comprobantes electrónicos
- pse sunat
- emisor electrónico
- factura electrónica perú

#### Planilla
- planilla electrónica
- plame sunat
- sistema de recursos humanos
- gestión de planillas
- cálculo de afp

---

## 📊 Herramientas Recomendadas

### Análisis
- **Google Search Console** ⭐⭐⭐⭐⭐ (Gratis)
- **Google Analytics 4** ⭐⭐⭐⭐⭐ (Gratis)
- **Ahrefs** ⭐⭐⭐⭐ (Pago)
- **SEMrush** ⭐⭐⭐⭐ (Pago)

### Auditoría Técnica
- **Lighthouse** (Chrome DevTools) ⭐⭐⭐⭐⭐ (Gratis)
- **Screaming Frog** ⭐⭐⭐⭐ (Freemium)
- **PageSpeed Insights** ⭐⭐⭐⭐⭐ (Gratis)

### Keywords
- **Google Keyword Planner** ⭐⭐⭐⭐ (Gratis)
- **Ubersuggest** ⭐⭐⭐ (Freemium)
- **AnswerThePublic** ⭐⭐⭐ (Freemium)

---

## ✅ Checklist SEO

### On-Page
- [ ] Títulos únicos y optimizados (50-60 caracteres)
- [ ] Descriptions únicas (150-160 caracteres)
- [ ] Headers jerárquicos (H1 → H2 → H3)
- [ ] Keywords en contenido (densidad 1-2%)
- [ ] URLs amigables
- [ ] Alt text en todas las imágenes
- [ ] Internal linking
- [ ] Schema.org implementado

### Technical
- [ ] Sitemap XML enviado
- [ ] robots.txt configurado
- [ ] HTTPS habilitado
- [ ] Mobile-friendly (responsive)
- [ ] Core Web Vitals optimizados
- [ ] Canonical tags
- [ ] 404 page personalizada

### Content
- [ ] Blog activo (2-4 posts/mes)
- [ ] Contenido único y original
- [ ] Keywords research completado
- [ ] Enlaces internos relevantes
- [ ] Multimedia (imágenes, videos)

---

## 🎯 Próximos Pasos

- 🚀 [Deployment](07-DEPLOYMENT.md)
- 👤 [Panel Admin](08-ADMIN-PANEL.md)
- 🔧 [Troubleshooting](09-TROUBLESHOOTING.md)
