# 🧩 Componentes

Documentación de componentes reutilizables del proyecto.

## 📂 Organización

```
src/
├── components/        # Componentes específicos por módulo
│   ├── home/
│   ├── services/
│   ├── notices/
│   ├── admin/
│   ├── quote/
│   └── aboutUs/
│
├── shared/            # Componentes compartidos globalmente
│   ├── navbar.jsx
│   ├── footer.jsx
│   ├── keywordTags.jsx
│   └── ...
│
└── ui/                # Componentes UI primitivos
    └── button.jsx
```

---

## 🌐 Componentes Compartidos (Shared)

### Navbar

Barra de navegación principal con tema oscuro/claro.

**Ubicación:** `src/shared/navbar.jsx`

**Props:** Ninguna

**Uso:**
```jsx
import Navbar from "@/shared/navbar";

<Navbar />
```

**Características:**
- Responsive con menú móvil (hamburguesa)
- Dropdown para servicios
- Theme toggle integrado
- Sticky on scroll

---

### Footer

Footer con enlaces, certificados y redes sociales.

**Ubicación:** `src/shared/footer.jsx`

**Props:** Ninguna

**Uso:**
```jsx
import Footer from "@/shared/footer";

<Footer />
```

**Secciones:**
- Información de empresa
- Enlaces rápidos (servicios, nosotros, noticias)
- Certificados ISO
- Redes sociales
- Copyright

---

### KeywordTags

Muestra keywords como badges visuales.

**Ubicación:** `src/shared/keywordTags.jsx`

**Props:**
```typescript
{
  keywords: Array<{
    id_keyword: number;
    keyword: string;
  }>;
}
```

**Uso:**
```jsx
import KeywordTags from "@/shared/keywordTags";

const keywords = [
  { id_keyword: 1, keyword: "software contable" },
  { id_keyword: 2, keyword: "SUNAT" }
];

<KeywordTags keywords={keywords} />
```

**Renderizado:**
```html
Temas relacionados: [software contable] [SUNAT]
```

---

### NoticeCard

Card de noticia para listados.

**Ubicación:** `src/shared/noticeCard.jsx`

**Props:**
```typescript
{
  noticia: {
    slug: string;
    imagen_principal: string;
    titulo: string;
    resumen: string;
    fecha_publicacion: string;
    categoria?: string;
    autor?: string;
    autor_foto?: string;
  };
}
```

**Uso:**
```jsx
import NoticeCard from "@/shared/noticeCard";

<NoticeCard noticia={noticia} />
```

---

### NoticeDetail

Componente de detalle de noticia (sidebar, contenido).

**Ubicación:** `src/shared/noticeDetail.jsx`

**Props:**
```typescript
{
  noticia: {
    titulo: string;
    contenido: string;
    fecha_publicacion: string;
    autor: string;
    autor_foto?: string;
    imagen_principal: string;
    keywords?: string[];
  };
}
```

---

### Pagination

Paginación para listados.

**Ubicación:** `src/shared/pagination.jsx`

**Props:**
```typescript
{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
```

**Uso:**
```jsx
import Pagination from "@/shared/pagination";

<Pagination
  currentPage={1}
  totalPages={5}
  onPageChange={(page) => console.log(page)}
/>
```

---

### ThemeToggle

Switch para cambiar entre modo oscuro/claro.

**Ubicación:** `src/shared/themeToggle.jsx`

**Props:** Ninguna

**Uso:**
```jsx
import ThemeToggle from "@/shared/themeToggle";

<ThemeToggle />
```

---

### WhatsAppFAB

Botón flotante de WhatsApp.

**Ubicación:** `src/shared/whatsappFab.jsx`

**Props:** Ninguna

**Uso:**
```jsx
import WhatsAppFAB from "@/shared/whatsappFab";

<WhatsAppFAB />
```

**Características:**
- Fijo en esquina inferior derecha
- Enlace directo a WhatsApp Business
- Icono animado

---

### ChatBotBar

Botón para abrir Dialogflow Messenger.

**Ubicación:** `src/shared/chatBotBar.jsx`

**Props:** Ninguna

**Uso:**
```jsx
import ChatBotBar from "@/shared/chatBotBar";

<ChatBotBar />
```

**Características:**
- No se muestra en rutas `/admin/*`
- Click abre el chat de Dialogflow
- Diseño tipo "asistente virtual"

---

## 🏠 Componentes Home

### Hero (Home)

Hero principal de la página de inicio.

**Ubicación:** `src/components/home/hero.jsx`

**Props:**
```typescript
{
  title?: string;
  subtitle?: string;
  cta?: string;
}
```

---

## 🛠️ Componentes Services

### Hero (Services)

Hero para páginas de servicios.

**Ubicación:** `src/components/services/hero.jsx`

**Props:**
```typescript
{
  logoLight: string;
  logoDark: string;
  heroImageSrc: string;
  serviceName: string;
  title: string;
  titleColored: string;
  content: string;
  button?: string;
}
```

**Uso:**
```jsx
<Hero
  logoLight="/images/contable/visualCONT.webp"
  logoDark="/images/contable/visualCONT-b.webp"
  heroImageSrc="/images/contable/contable-image.webp"
  serviceName="Sistema Contable"
  title="Optimiza tu gestión financiera con nuestro"
  titleColored="Sistema Contable"
  content="Un software pensado para contadores..."
  button="Contáctanos"
/>
```

---

### Features

Sección de características del servicio.

**Ubicación:** `src/components/services/features.jsx`

**Props:**
```typescript
{
  title: string;
  coloredTitle: string;
  description: string;
  services: Array<{
    id: number;
    title: string;
    description: string;
    icon: LucideIcon;
    color: string;
  }>;
}
```

**Uso:**
```jsx
import { FolderInput, HandCoins } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Integrado con API SIRE SUNAT",
    description: "Exporta tu propuesta SIRE automáticamente.",
    icon: FolderInput,
    color: "bg-[#257CD0]",
  },
  // ...
];

<Features
  title="Solo funcionalidades clave para "
  coloredTitle="impulsar tu gestión contable"
  description="Ofrecemos una variedad de servicios..."
  services={services}
/>
```

---

### Capabilities

Sección de capacidades con imagen.

**Ubicación:** `src/components/services/capabilities.jsx`

**Props:**
```typescript
{
  service: string;
  coloredTitle: string;
  capabilities: Array<{
    title: string;
    content: string[];
    description: string;
    buttonText: string;
    image: string;
    reverse: boolean;
  }>;
}
```

---

### Pricing

Tabla de planes y precios.

**Ubicación:** `src/components/services/pricing.jsx`

**Props:**
```typescript
{
  plans: Array<{
    name: string;
    monthly: number;
    annual: number;
    highlighted: boolean;
    cta: string;
    features: string[];
    ctaMonthlyUrl: string;
    ctaAnnualUrl: string;
    currency: string;
  }>;
  hasMonthly: boolean;
  hasAnnual: boolean;
}
```

**Uso:**
```jsx
const plans = [
  {
    name: "Básico",
    monthly: 39,
    annual: 390,
    highlighted: false,
    cta: "Elegir Básico",
    features: [
      "Contabilidad hasta 5 empresas",
      "1 Usuario",
      // ...
    ],
    ctaMonthlyUrl: "https://wa.me/...",
    ctaAnnualUrl: "https://wa.me/...",
    currency: "USD",
  },
];

<Pricing plans={plans} hasMonthly={true} hasAnnual={false} />
```

---

## 📰 Componentes Noticias

### NoticeList

Listado de noticias con paginación.

**Ubicación:** `src/components/notices/noticeList.jsx`

---

### CategoryFilter

Filtro por categorías en blog.

**Ubicación:** `src/components/notices/categoryFilter.jsx`

---

## 🎨 Componentes UI Base

### Button

Botón reutilizable con variantes.

**Ubicación:** `src/ui/button.jsx`

**Props:**
```typescript
{
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}
```

**Uso:**
```jsx
import { Button } from "@/ui/button";

<Button variant="primary" size="md">
  Click me
</Button>
```

---

## 👤 Componentes Admin

### LoginForm

Formulario de login del admin.

**Ubicación:** `src/components/admin/loginForm.jsx`

---

### NoticeEditor

Editor de noticias con Markdown/HTML.

**Ubicación:** `src/components/admin/noticeEditor.jsx`

---

### KeywordSelector

Selector múltiple de keywords.

**Ubicación:** `src/components/admin/keywordSelector.jsx`

---

## 🎯 Mejores Prácticas

### Estructura de un Componente

```jsx
"use client"; // Si necesita interactividad

import { useState } from "react";
import PropTypes from "prop-types"; // Opcional

/**
 * Descripción del componente
 * @param {Object} props - Props del componente
 */
export default function MyComponent({ title, items }) {
  // 1. Hooks
  const [state, setState] = useState(null);
  
  // 2. Funciones
  const handleClick = () => {
    setState(true);
  };
  
  // 3. Early returns
  if (!items) return null;
  
  // 4. Render
  return (
    <div>
      <h2>{title}</h2>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

// PropTypes (opcional)
MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array
};
```

---

### Naming Conventions

- **Componentes:** PascalCase (`NoticeCard`, `Hero`)
- **Props:** camelCase (`onClick`, `isActive`)
- **Archivos:** camelCase o PascalCase según componente

---

### Separación Server/Client

```jsx
// ✅ Server Component (por defecto)
export default async function ServerComponent() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// ✅ Client Component (interactividad)
"use client";
export default function ClientComponent() {
  const [state, setState] = useState();
  return <button onClick={...}>Click</button>;
}
```

---

## 🎯 Próximos Pasos

- 🎯 [SEO](06-SEO.md)
- 🚀 [Deployment](07-DEPLOYMENT.md)
- 👤 [Panel Admin](08-ADMIN-PANEL.md)
