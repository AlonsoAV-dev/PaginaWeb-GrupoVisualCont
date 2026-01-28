# 🔑 Sistema de Keywords por Página - Guía Completa

## 📋 Índice
1. [¿Qué es?](#qué-es)
2. [Instalación](#instalación)
3. [Cómo usar](#cómo-usar)
4. [Integración en páginas](#integración-en-páginas)
5. [Ejemplos prácticos](#ejemplos-prácticos)

---

## 🎯 ¿Qué es?

Un sistema que permite **asignar keywords específicas a cada página** de tu sitio (Home, Contable, ERP, Facturador, Planilla, Nosotros) para mejorar el SEO de forma independiente.

### Diferencias con Keywords de Noticias:
- **Noticias**: Keywords dinámicas para cada artículo del blog
- **Páginas**: Keywords estáticas para landing pages principales

---

## 🛠 Instalación

### Paso 1: Crear la tabla en la base de datos

Ejecuta este SQL en tu base de datos MySQL:

\`\`\`sql
CREATE TABLE page_keywords (
    page_name VARCHAR(50) NOT NULL,
    id_keyword INT NOT NULL,
    PRIMARY KEY (page_name, id_keyword),
    FOREIGN KEY (id_keyword) REFERENCES keywords(id_keyword)
);
\`\`\`

### Paso 2: Verificar archivos creados

✅ `/src/app/api/pages/keywords/route.js` - API para gestionar keywords por página
✅ `/src/app/admin/page-keywords/page.js` - Panel de administración
✅ `/lib/pageKeywords.js` - Funciones helper
✅ Tabla `page_keywords` actualizada en `/database/schema.sql`

---

## 🖥 Cómo usar

### 1. Acceder al Panel de Admin

1. Inicia sesión en el admin: `/admin`
2. Ve a la sección: **"Keywords por Página"** (necesitas agregar el link en el menú)
3. O accede directamente a: `/admin/page-keywords`

### 2. Asignar Keywords a una Página

1. **Selecciona una página** del listado:
   - Página de Inicio (Home)
   - Software Contable
   - ERP Integrado
   - Facturador Electrónico
   - Planilla Electrónica
   - Nosotros

2. **Marca las keywords relevantes** con los checkboxes

3. **Click en "Guardar Cambios"**

### Ejemplo para Página "Software Contable":
```
✅ software contable
✅ contabilidad Perú
✅ libros electrónicos SUNAT
✅ PDT
✅ reportes contables
✅ VisualCONT
```

---

## 🔌 Integración en Páginas

### Opción 1: Usando el helper (Recomendado)

Edita tu página para cargar keywords dinámicamente:

\`\`\`javascript
// src/app/contable/page.js
import { getPageKeywords, formatKeywordsForMetadata, formatKeywordsForSchema } from '@/lib/pageKeywords';

export async function generateMetadata() {
  // Cargar keywords desde la base de datos
  const keywords = await getPageKeywords('contable');
  
  return {
    title: "Software Contable VisualCONT",
    description: "...",
    keywords: formatKeywordsForMetadata(keywords), // Array de strings
    // ... resto del metadata
  };
}

export default async function ContablePage() {
  const keywords = await getPageKeywords('contable');
  
  return (
    <>
      <Navbar />
      <Hero />
      {/* ... contenido ... */}
      
      {/* Schema con keywords dinámicas */}
      <Script
        id="ld-software-contable"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "VisualCONT",
            "keywords": formatKeywordsForSchema(keywords), // String separado por comas
            "about": formatKeywordsAsThings(keywords), // Array de Things
            // ... resto del schema
          }),
        }}
      />
    </>
  );
}
\`\`\`

### Opción 2: Llamada directa al API (Para componentes cliente)

\`\`\`javascript
'use client';
import { useEffect, useState } from 'react';

export default function MyComponent() {
  const [keywords, setKeywords] = useState([]);
  
  useEffect(() => {
    async function loadKeywords() {
      const res = await fetch('/api/pages/keywords?page=contable');
      const data = await res.json();
      setKeywords(data.keywords || []);
    }
    loadKeywords();
  }, []);
  
  // Usar keywords...
}
\`\`\`

---

## 🎨 Ejemplos Prácticos

### Ejemplo 1: Home Page con Keywords

\`\`\`javascript
// src/app/page.js
import { getPageKeywords, formatKeywordsAsThings } from '@/lib/pageKeywords';

export async function generateMetadata() {
  const keywords = await getPageKeywords('home');
  
  return {
    title: "Visual ERP - Software Contable para Empresas",
    keywords: keywords.map(k => k.nombre),
    // ...
  };
}

export default async function Home() {
  const keywords = await getPageKeywords('home');
  
  return (
    <>
      {/* Contenido */}
      
      <Script
        id="home-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Visual ERP",
            "about": formatKeywordsAsThings(keywords),
          }),
        }}
      />
    </>
  );
}
\`\`\`

### Ejemplo 2: Keywords Recomendadas por Página

#### **Home**
- software ERP Perú
- gestión empresarial
- software contable
- facturación electrónica
- planilla electrónica

#### **Contable**
- software contable Perú
- libros electrónicos SUNAT
- PDT
- estados financieros
- contabilidad en la nube
- SIRE SUNAT

#### **ERP**
- ERP integrado
- sistema ERP Perú
- inventarios KARDEX
- gestión empresarial
- multiempresa

#### **Facturador**
- facturación electrónica SUNAT
- comprobantes electrónicos
- PSE SUNAT
- factura electrónica
- boletas electrónicas

#### **Planilla**
- planilla electrónica
- PLAME
- recursos humanos
- AFP
- gratificaciones
- CTS

---

## 📊 Beneficios SEO

### ✅ Ventajas:
1. **Keywords específicas por página** → Mejor ranking en búsquedas específicas
2. **Schema.org mejorado** → Rich snippets en Google
3. **Metadata optimizada** → Mejor CTR en resultados
4. **Gestión centralizada** → Todo desde el panel admin
5. **Reutilización** → Mismas keywords para múltiples propósitos

### 📈 Impacto esperado:
- **Mes 1-2**: Mejora en indexación de páginas específicas
- **Mes 3-4**: Aumento de tráfico orgánico en keywords long-tail
- **Mes 5-6**: Mejora en posiciones para keywords principales

---

## 🔧 Mantenimiento

### Actualizar Keywords
1. Monitorea rendimiento en Google Search Console
2. Identifica keywords de alto rendimiento
3. Ajusta asignaciones en el panel admin
4. Las páginas se revalidan automáticamente

### Mejores Prácticas
- ✅ Usa 5-8 keywords por página
- ✅ Mezcla keywords genéricas y long-tail
- ✅ Incluye keywords locales (Perú, Lima)
- ✅ Revisa mensualmente el rendimiento
- ❌ No uses más de 10 keywords por página
- ❌ No dupliques todas las keywords en todas las páginas

---

## 🚀 Próximos Pasos

1. **Ejecutar el SQL** para crear la tabla `page_keywords`
2. **Acceder al panel** `/admin/page-keywords`
3. **Asignar keywords** a cada página principal
4. **Integrar en las páginas** usando los helpers
5. **Monitorear resultados** en Google Search Console

---

## ❓ Preguntas Frecuentes

**P: ¿Puedo usar las mismas keywords en páginas y noticias?**
R: Sí, las keywords son compartidas. Se gestionan en `/admin/keywords` y se asignan en diferentes lugares.

**P: ¿Las keywords se actualizan automáticamente en las páginas?**
R: Sí, cuando guardas cambios se llama a `revalidatePath()` para actualizar el cache.

**P: ¿Necesito hacer algo después de asignar keywords?**
R: No, solo guarda los cambios. Las páginas cargarán las keywords automáticamente si las integraste correctamente.

**P: ¿Cuántas keywords debo usar?**
R: Entre 5-8 keywords por página es lo ideal. No te excedas para mantener relevancia.

---

## 📝 Notas Técnicas

- Las keywords se almacenan en `page_keywords` (relación muchos a muchos)
- API disponible en `/api/pages/keywords`
- Helpers en `/lib/pageKeywords.js`
- Revalidación automática de cache con Next.js
- Compatible con Server Components y Client Components
