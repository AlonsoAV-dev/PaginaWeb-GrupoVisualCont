# 🏗️ Arquitectura del Proyecto

Estructura y organización del código de Visual ERP.

## 📂 Estructura de Directorios

```
grupovisualcont.com/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.js              # Layout principal
│   │   ├── page.js                # Home page
│   │   ├── globals.css            # Estilos globales
│   │   ├── fontawesome.js         # Configuración FA
│   │   │
│   │   ├── api/                   # API Routes
│   │   │   ├── auth/             # Autenticación
│   │   │   │   ├── login/
│   │   │   │   ├── logout/
│   │   │   │   └── me/
│   │   │   ├── noticias/         # CRUD noticias
│   │   │   ├── keywords/         # CRUD keywords
│   │   │   ├── categorias/       # CRUD categorías
│   │   │   ├── comentarios/      # CRUD comentarios
│   │   │   ├── usuarios/         # CRUD usuarios
│   │   │   └── pages/
│   │   │       └── keywords/     # Keywords por página
│   │   │
│   │   ├── admin/                 # Panel administrativo
│   │   │   ├── layout.js         # Layout admin
│   │   │   ├── page.js           # Login/Dashboard
│   │   │   ├── dashboard/
│   │   │   ├── noticias/
│   │   │   ├── keywords/
│   │   │   ├── page-keywords/    # Keywords por página
│   │   │   ├── categorias/
│   │   │   ├── comentarios/
│   │   │   └── usuarios/
│   │   │
│   │   ├── contable/              # Landing contable
│   │   │   └── page.js
│   │   ├── erp/                   # Landing ERP
│   │   │   └── page.js
│   │   ├── facturador/            # Landing facturador
│   │   │   └── page.js
│   │   ├── planilla/              # Landing planilla
│   │   │   └── page.js
│   │   ├── nosotros/              # Nosotros
│   │   │   └── page.js
│   │   ├── noticias/              # Blog
│   │   │   ├── page.js           # Listado
│   │   │   └── [slug]/           # Detalle
│   │   │       └── page.js
│   │   └── cotizar/               # Formulario
│   │       └── page.js
│   │
│   ├── components/                 # Componentes por módulo
│   │   ├── home/                  # Componentes home
│   │   ├── services/              # Componentes servicios
│   │   ├── notices/               # Componentes blog
│   │   ├── admin/                 # Componentes admin
│   │   ├── quote/                 # Componentes cotización
│   │   └── aboutUs/               # Componentes nosotros
│   │
│   ├── shared/                     # Componentes compartidos
│   │   ├── navbar.jsx             # Navegación
│   │   ├── footer.jsx             # Footer
│   │   ├── noticeCard.jsx         # Card de noticia
│   │   ├── noticeDetail.jsx       # Detalle noticia
│   │   ├── keywordTags.jsx        # Tags de keywords
│   │   ├── pagination.jsx         # Paginación
│   │   ├── themeToggle.jsx        # Switch tema
│   │   ├── whatsappFab.jsx        # Botón WhatsApp
│   │   └── chatBotBar.jsx         # Botón chatbot
│   │
│   ├── lib/                        # Utilidades y helpers
│   │   ├── auth.js                # JWT helpers
│   │   ├── db.js                  # Conexión MySQL
│   │   ├── pageKeywords.js        # Keywords helpers
│   │   └── Utils.ts               # Utilidades varias
│   │
│   └── ui/                         # Componentes UI base
│       └── button.jsx             # Botón reutilizable
│
├── public/                         # Archivos estáticos
│   ├── images/                    # Imágenes
│   │   ├── banner/
│   │   ├── home/
│   │   ├── contable/
│   │   ├── erp/
│   │   ├── facturador/
│   │   ├── planilla/
│   │   ├── nosotros/
│   │   ├── noticias/
│   │   └── logos/
│   ├── docs/                      # PDFs descargables
│   ├── robots.txt
│   ├── sitemap.xml
│   └── sitemap-0.xml
│
├── database/                       # Schemas SQL
│   └── schema.sql
│
├── docs/                           # Documentación
│   ├── 01-SETUP.md
│   ├── 02-ARQUITECTURA.md
│   └── ...
│
├── middleware.js                   # Middleware autenticación
├── next.config.mjs                 # Config Next.js
├── tailwind.config.js              # Config Tailwind
├── jsconfig.json                   # Alias de rutas
├── package.json
└── README.md
```

---

## 🎯 Patrones de Diseño

### 1. App Router (Next.js 13+)

```javascript
// Server Component (default)
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Client Component (interactividad)
"use client";
export default function Interactive() {
  const [state, setState] = useState();
  return <button onClick={() => setState(...)}>Click</button>;
}
```

### 2. API Routes

```javascript
// src/app/api/noticias/route.js
export async function GET(request) {
  // Lógica
  return Response.json({ data });
}

export async function POST(request) {
  const body = await request.json();
  // Lógica
  return Response.json({ success: true });
}
```

### 3. Metadata Dinámica

```javascript
export async function generateMetadata() {
  const keywords = await getPageKeywords('contable');
  
  return {
    title: "Título SEO",
    description: "...",
    keywords: formatKeywordsForMetadata(keywords),
    openGraph: { ... },
  };
}
```

---

## 🔌 Flujo de Datos

### Landing Pages → Keywords

```
┌─────────────────────┐
│  Landing Page       │
│  (contable/page.js) │
└──────────┬──────────┘
           │
           │ await getPageKeywords('contable')
           ▼
┌─────────────────────┐
│  pageKeywords.js    │
│  (Helper Library)   │
└──────────┬──────────┘
           │
           │ SQL Query
           ▼
┌─────────────────────┐
│  MySQL Database     │
│  page_keywords →    │
│  keywords           │
└──────────┬──────────┘
           │
           │ [{id_keyword: 1, keyword: "..."}]
           ▼
┌─────────────────────┐
│  3 Destinos:        │
│  1. Metadata        │
│  2. Schema.org      │
│  3. KeywordTags     │
└─────────────────────┘
```

### Admin Panel → API → Database

```
┌─────────────────────┐
│  Admin UI           │
│  /admin/keywords    │
└──────────┬──────────┘
           │
           │ POST /api/keywords
           ▼
┌─────────────────────┐
│  API Route          │
│  Middleware Auth    │
└──────────┬──────────┘
           │
           │ validateToken()
           ▼
┌─────────────────────┐
│  Database Layer     │
│  lib/db.js          │
└──────────┬──────────┘
           │
           │ pool.execute()
           ▼
┌─────────────────────┐
│  MySQL              │
│  Commit Transaction │
└─────────────────────┘
```

---

## 🔐 Autenticación

### Flujo de Login

```
Usuario ingresa credenciales
           │
           ▼
    POST /api/auth/login
           │
           ▼
    Validar con bcrypt
           │
           ▼
    Generar JWT (7 días)
           │
           ▼
    Guardar en cookie httpOnly
           │
           ▼
    Redirect /admin/dashboard
```

### Middleware Protection

```javascript
// middleware.js
export function middleware(request) {
  const token = request.cookies.get('token');
  
  if (!token) {
    return NextResponse.redirect('/admin');
  }
  
  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect('/admin');
  }
}

export const config = {
  matcher: ['/admin/:path*']
};
```

---

## 🎨 Componentes

### Jerarquía de Componentes

```
App Layout
├── ThemeProvider
│   ├── Navbar
│   │   ├── ThemeToggle
│   │   ├── NavDropdown
│   │   └── MobileMenu
│   │
│   ├── Page Content
│   │   ├── Hero
│   │   ├── Features
│   │   ├── Capabilities
│   │   ├── Pricing
│   │   ├── Demo
│   │   └── KeywordTags
│   │
│   ├── Footer
│   │   ├── Certificates
│   │   └── Social Links
│   │
│   ├── IconsGroup (WhatsApp, Messenger)
│   ├── WhatsAppFAB
│   ├── ChatBotBar
│   └── DialogflowMessenger
```

---

## 🗄️ Base de Datos

### Relaciones Principales

```
usuarios (1) ──────────────── (N) noticias
                                    │
                                    │
categorias (1) ─────────────── (N) │
                                    │
                                    │
autores (1) ────────────────── (N) │
                                    │
                                    │
noticias (N) ──── noticias_keywords ──── (N) keywords
                                              │
                                              │
pages (N) ────── page_keywords ───────────── (N)
```

---

## 🚀 Build Process

```
npm run build
     │
     ▼
┌──────────────────┐
│  TypeScript      │
│  Compilation     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Turbopack       │
│  Bundling        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Route           │
│  Generation      │
│  (Static/Dynamic)│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Optimize        │
│  Images/CSS/JS   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Generate        │
│  Sitemap         │
└────────┬─────────┘
         │
         ▼
    .next/ folder
```

---

## 📦 Dependencias Clave

### Producción
```json
{
  "next": "16.1.4",
  "react": "19.0.0",
  "react-dom": "19.0.0",
  "mysql2": "^3.11.5",
  "bcrypt": "^5.1.1",
  "jsonwebtoken": "^9.0.2",
  "embla-carousel-react": "^8.5.2"
}
```

### Desarrollo
```json
{
  "eslint": "^9",
  "eslint-config-next": "16.1.4",
  "postcss": "^8",
  "tailwindcss": "^3.4.1"
}
```

---

## 🎯 Convenciones de Código

### Nombres de Archivos
- **Componentes:** `PascalCase.jsx` o `camelCase.jsx`
- **Rutas:** `page.js`, `layout.js`, `route.js`
- **Utilidades:** `camelCase.js`
- **Estilos:** `kebab-case.css`

### Estructura de Componentes
```javascript
// Imports
import { ... } from '...';

// Types (si aplica)
// interface Props { ... }

// Component
export default function ComponentName() {
  // Hooks
  const [state, setState] = useState();
  
  // Funciones
  const handleClick = () => { ... };
  
  // Render
  return ( ... );
}
```

### Nombres de Variables
- **useState:** `[value, setValue]`
- **useEffect:** Descriptivo del efecto
- **Constantes:** `UPPER_SNAKE_CASE`
- **Funciones:** `camelCase`

---

## 🔄 Ciclo de Vida

### Server Component
```
Request → Server Fetch → Render HTML → Send to Client
```

### Client Component
```
Request → Send JS Bundle → Hydrate → Interactive
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
```javascript
sm: '640px'   // Móvil horizontal
md: '768px'   // Tablet
lg: '1024px'  // Desktop pequeño
xl: '1280px'  // Desktop
2xl: '1536px' // Desktop grande
```

---

## 🎯 Próximos Pasos

- 📖 [Base de Datos](03-DATABASE.md)
- 🔌 [API Reference](04-API.md)
- 🧩 [Componentes](05-COMPONENTES.md)
