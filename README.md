# 🏢 Visual ERP - Sistema Web Completo

Sistema ERP integral para gestión empresarial con módulos de Contabilidad, Facturación, Planilla e Inventarios. Diseñado específicamente para empresas peruanas con integración SUNAT.

## 🚀 Quick Start

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/grupovisualcont.com.git
cd grupovisualcont.com

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📚 Documentación

- [📥 Instalación y Configuración](docs/01-SETUP.md)
- [🏗️ Arquitectura del Proyecto](docs/02-ARQUITECTURA.md)
- [🗄️ Base de Datos](docs/03-DATABASE.md)
- [🔌 API Reference](docs/04-API.md)
- [🧩 Componentes](docs/05-COMPONENTES.md)
- [🎯 SEO y Keywords](docs/06-SEO.md)
- [🚀 Deployment](docs/07-DEPLOYMENT.md)
- [👤 Panel de Administración](docs/08-ADMIN-PANEL.md)
- [🔧 Troubleshooting](docs/09-TROUBLESHOOTING.md)
- [🔑 Sistema de Keywords](KEYWORDS-PAGINAS.md)

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 16.1.4** - Framework React con App Router
- **React 19** - Biblioteca UI
- **TailwindCSS 3** - Estilos utility-first
- **Lucide React** - Iconos
- **FontAwesome** - Iconos adicionales
- **Embla Carousel** - Carruseles

### Backend
- **Next.js API Routes** - Endpoints REST
- **MySQL 8.0+** - Base de datos
- **mysql2** - Driver de base de datos
- **jsonwebtoken** - Autenticación JWT
- **bcrypt** - Hash de contraseñas

### SEO & Analytics
- **next-sitemap** - Generación de sitemap
- **Schema.org JSON-LD** - Datos estructurados
- **Dynamic Metadata** - Meta tags optimizados

### Integraciones
- **Dialogflow Messenger** - Chatbot
- **WhatsApp Business** - Comunicación directa
- **Google Fonts** - Tipografías (Roboto, Montserrat)

## 🌟 Características Principales

### Módulos de Negocio
- ✅ **Sistema Contable** - Libros electrónicos, PLE, SIRE SUNAT
- ✅ **Facturador Electrónico** - Comprobantes electrónicos PSE SUNAT
- ✅ **Planilla Electrónica** - PLAME, CTS, gratificaciones
- ✅ **ERP Integrado** - Inventarios KARDEX, multiempresa

### Panel de Administración
- ✅ Dashboard con métricas
- ✅ Gestión de noticias/blog
- ✅ Sistema de keywords por página
- ✅ Gestión de categorías y autores
- ✅ Administración de comentarios
- ✅ Control de usuarios y roles

### SEO & Marketing
- ✅ Keywords dinámicas por página
- ✅ Schema.org completo
- ✅ Open Graph y Twitter Cards
- ✅ Sitemap automático
- ✅ Blog optimizado para SEO

### UX/UI
- ✅ Modo oscuro/claro
- ✅ Diseño responsive
- ✅ Animaciones suaves
- ✅ Chatbot integrado
- ✅ WhatsApp FAB

## 📂 Estructura del Proyecto

```
grupovisualcont.com/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   ├── admin/             # Panel administrativo
│   │   ├── contable/          # Landing contable
│   │   ├── erp/               # Landing ERP
│   │   ├── facturador/        # Landing facturador
│   │   ├── planilla/          # Landing planilla
│   │   ├── nosotros/          # About us
│   │   ├── noticias/          # Blog
│   │   └── cotizar/           # Formulario cotización
│   ├── components/            # Componentes por módulo
│   ├── shared/                # Componentes compartidos
│   ├── lib/                   # Utilidades y helpers
│   └── ui/                    # Componentes UI base
├── public/                    # Archivos estáticos
│   ├── images/               # Imágenes optimizadas
│   └── docs/                 # Documentos descargables
├── database/                  # Schemas SQL
├── docs/                      # Documentación
└── middleware.js              # Middleware de autenticación
```

## 🔐 Autenticación

El sistema usa **JWT (JSON Web Tokens)** para autenticación:

- Tokens con expiración de 7 días
- Roles: `admin` y `editor`
- Middleware protege rutas `/admin/*`
- Cookies httpOnly para seguridad

## 🌐 URLs Principales

### Públicas
- `/` - Home
- `/contable` - Software Contable
- `/erp` - ERP Integrado
- `/facturador` - Facturador Electrónico
- `/planilla` - Planilla Electrónica
- `/nosotros` - Nosotros
- `/noticias` - Blog
- `/noticias/[slug]` - Detalle de noticia
- `/cotizar` - Formulario de cotización

### Admin (Requiere autenticación)
- `/admin` - Login/Dashboard
- `/admin/noticias` - Gestión de noticias
- `/admin/keywords` - Gestión de keywords
- `/admin/page-keywords` - Keywords por página
- `/admin/categorias` - Categorías
- `/admin/comentarios` - Comentarios
- `/admin/usuarios` - Usuarios (solo admin)

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo (Turbopack)

# Producción
npm run build        # Build optimizado
npm start            # Servidor de producción
npm run postbuild    # Genera sitemap

# Utilidades
npm run lint         # ESLint
```

## 📦 Variables de Entorno

```env
# Base de datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=visualerp

# JWT
JWT_SECRET=tu_secret_key_segura

# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Opcional: Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

## 👥 Roles y Permisos

| Rol | Permisos |
|-----|----------|
| **admin** | Acceso completo, gestión de usuarios |
| **editor** | Crear/editar noticias, keywords, categorías |

## 📞 Soporte y Contacto

- **Web:** [grupovisualcont.com](https://grupovisualcont.com)
- **Email:** soporte@grupovisualcont.com
- **WhatsApp:** +51 956 703 375
- **Horario:** Lun-Vie 9:00-18:00 (GMT-5)

## 📄 Licencia

© 2026 Grupo Visual Cont. Todos los derechos reservados.

---

## 🎯 Próximos Pasos

1. Lee la [Guía de Instalación](docs/01-SETUP.md)
2. Revisa la [Arquitectura](docs/02-ARQUITECTURA.md)
3. Consulta el [API Reference](docs/04-API.md)
4. Configura [Keywords SEO](KEYWORDS-PAGINAS.md)

**¿Primera vez configurando el proyecto?** → Empieza por [docs/01-SETUP.md](docs/01-SETUP.md)
