# 👤 Panel de Administración

Guía completa del panel administrativo de Visual ERP.

## 🔐 Acceso

**URL:** `/admin`

**Roles:**
- **Admin:** Acceso completo a todas las funciones
- **Editor:** Acceso limitado (sin gestión de usuarios)

**Credenciales de desarrollo:**
- Email: `admin@grupovisualcont.com`
- Password: `tu_password_admin`

---

## 📊 Dashboard

**Ruta:** `/admin/dashboard`

### Métricas Principales
- Total de noticias publicadas
- Noticias en borrador
- Comentarios pendientes de moderación
- Usuarios registrados (solo admin)

### Accesos Rápidos
- Crear nueva noticia
- Ver comentarios pendientes
- Gestionar keywords
- Asignar keywords a páginas

---

## 📰 Gestión de Noticias

### Listar Noticias

**Ruta:** `/admin/noticias`

**Características:**
- Tabla con todas las noticias
- Filtros por estado (borrador, publicado, archivado)
- Búsqueda por título
- Paginación (10 por página)
- Acciones: Editar, Eliminar, Ver

**Columnas:**
- Título
- Categoría
- Fecha de publicación
- Estado
- Vistas
- Acciones

---

### Crear Noticia

**Ruta:** `/admin/noticias/nueva`

**Campos:**

1. **Título** (requerido)
   - Máx 255 caracteres
   - Se genera slug automáticamente

2. **Slug** (auto-generado, editable)
   - URL-friendly
   - Único en base de datos

3. **Resumen** (requerido)
   - Texto corto (150-200 caracteres)
   - Para cards y SEO

4. **Contenido** (requerido)
   - Editor HTML/Markdown
   - Soporte para imágenes, links, listas

5. **Imagen Principal**
   - URL de la imagen destacada
   - Recomendado: 1200x630px

6. **Categoría** (opcional)
   - Dropdown con categorías existentes

7. **Autor** (opcional)
   - Dropdown con autores registrados

8. **Fecha de Publicación** (requerido)
   - Date picker
   - Por defecto: fecha actual

9. **Estado** (requerido)
   - Borrador
   - Publicado
   - Archivado

10. **Keywords** (opcional)
    - Selector múltiple
    - Buscar y agregar keywords

**Botones:**
- **Guardar** → Crear noticia
- **Cancelar** → Volver al listado

---

### Editar Noticia

**Ruta:** `/admin/noticias/[id]`

Mismos campos que crear, pre-llenados con datos existentes.

**Funciones adicionales:**
- Ver contador de vistas
- Historial de cambios (si se implementa)

---

### Eliminar Noticia

**Confirmación:** Modal de confirmación antes de eliminar

**Acción:** Elimina noticia y relaciones (keywords, comentarios)

---

## 🔑 Gestión de Keywords

### Listar Keywords

**Ruta:** `/admin/keywords`

**Características:**
- Tabla con todas las keywords
- Búsqueda por nombre
- Contador de uso (en cuántas noticias/páginas)
- Acciones: Editar, Eliminar

**Columnas:**
- ID
- Nombre
- Usado en (# noticias)
- Acciones

---

### Crear Keyword

**Modal/Form:**

**Campos:**
- **Nombre** (requerido)
  - Único
  - Ejemplo: `software contable`

**Validación:**
- No permitir duplicados
- Lowercase automático
- Trim espacios

---

### Eliminar Keyword

**Confirmación:** "¿Estás seguro? Esta keyword se eliminará de todas las noticias y páginas."

**Acción:** `ON DELETE CASCADE` en base de datos

---

## 📄 Keywords por Página

### Asignar Keywords

**Ruta:** `/admin/page-keywords`

**Layout:** Grid de 6 páginas

**Páginas:**
1. Página de Inicio (Home)
2. Software Contable
3. ERP Integrado
4. Facturador Electrónico
5. Planilla Electrónica
6. Nosotros

**Por cada página:**
- Título de la página
- Lista de keywords con checkboxes
- Contador de keywords seleccionadas
- Botón "Guardar Cambios"

**Flujo:**
1. Cargar keywords existentes (checked)
2. Marcar/desmarcar keywords
3. Click "Guardar Cambios"
4. Confirmar guardado con toast/alert
5. Revalidar cache de la página

**Ejemplo:**
```
┌─────────────────────────────┐
│ Software Contable (4/10)    │
├─────────────────────────────┤
│ ☑ software contable         │
│ ☑ libros electrónicos       │
│ ☐ facturación electrónica   │
│ ☑ SUNAT                     │
│ ☑ PLE                       │
│ ☐ planilla                  │
│                              │
│ [Guardar Cambios]           │
└─────────────────────────────┘
```

---

## 📂 Gestión de Categorías

### Listar Categorías

**Ruta:** `/admin/categorias`

**Características:**
- Tabla con categorías
- Contador de noticias por categoría
- Acciones: Editar, Eliminar

---

### Crear/Editar Categoría

**Campos:**
- **Nombre** (requerido)
  - Ejemplo: `Contabilidad`
- **Slug** (auto-generado, editable)
  - Ejemplo: `contabilidad`
- **Descripción** (opcional)
  - Texto descriptivo

---

## 💬 Gestión de Comentarios

### Listar Comentarios

**Ruta:** `/admin/comentarios`

**Filtros:**
- Pendientes (default)
- Aprobados
- Rechazados

**Columnas:**
- Nombre del comentarista
- Email
- Comentario (preview)
- Noticia relacionada
- Fecha
- Estado
- Acciones

**Acciones:**
- Aprobar
- Rechazar
- Eliminar

---

### Moderar Comentario

**Estados:**
- **Pendiente** → Esperando revisión
- **Aprobado** → Visible en noticia
- **Rechazado** → Oculto, pero no eliminado

**Flujo:**
1. Usuario deja comentario → Estado: Pendiente
2. Admin revisa → Aprobar o Rechazar
3. Si aprobado → Aparece en página pública

---

## 👥 Gestión de Usuarios

**Ruta:** `/admin/usuarios` (Solo admin)

### Listar Usuarios

**Columnas:**
- ID
- Email
- Nombre
- Rol (admin/editor)
- Fecha de creación
- Acciones

---

### Crear Usuario

**Campos:**
- **Email** (requerido, único)
- **Nombre** (requerido)
- **Password** (requerido, mín 8 caracteres)
- **Rol** (requerido)
  - admin
  - editor

**Validación:**
- Email válido y único
- Password seguro (mín 8 caracteres, combinación de letras y números recomendada)

---

### Editar Usuario

**Campos editables:**
- Nombre
- Rol
- Password (opcional, solo si se quiere cambiar)

**Restricción:**
- Admin no puede cambiar su propio rol a editor
- Debe haber al menos 1 admin en el sistema

---

### Eliminar Usuario

**Confirmación:** "¿Estás seguro? Este usuario no podrá acceder al panel."

**Restricción:**
- No se puede auto-eliminar
- Las noticias del usuario NO se eliminan (quedan huérfanas)

---

## 🎨 UI/UX del Panel

### Layout

```
┌────────────────────────────────────────┐
│ Logo    Visual ERP Admin   [Tema] [👤]│
├────────┬───────────────────────────────┤
│        │                               │
│ 📊 Dash│   Contenido Principal        │
│ 📰 Noti│                               │
│ ├─ List│                               │
│ └─ Nuev│                               │
│ 💬 Come│                               │
│ 📂 Cate│                               │
│ 🔍 SEO │                               │
│ ├─ Keyw│                               │
│ └─ Page│                               │
│ 👥 Usua│                               │
│        │                               │
└────────┴───────────────────────────────┘
```

### Sidebar (Menú)

**Estructura:**
- Dashboard
- Noticias
  - Todas las noticias
  - Nueva noticia
- Comentarios
- Categorías
- **SEO** (collapsible)
  - Keywords
  - Keywords por Página
- Usuarios (solo admin)

### Theme

- Soporte para modo oscuro/claro
- Mantiene preferencia del usuario
- Sincronizado con tema público

---

## 🔐 Seguridad

### Autenticación

- JWT en cookies httpOnly
- Expiración: 7 días
- Renovación automática en cada request
- Logout limpia cookies

### Autorización

**Middleware protege rutas:**
```javascript
// Todas las rutas /admin/* requieren token válido
// Rutas específicas verifican rol:

/admin/usuarios → Solo admin
/admin/noticias → Admin y editor
/admin/keywords → Admin y editor
```

### Validación

- Input sanitization en formularios
- SQL injection prevention (prepared statements)
- XSS protection en contenido HTML
- CSRF tokens (Next.js lo maneja automáticamente)

---

## 📱 Responsiveness

El panel admin es **responsive**:
- Desktop: Sidebar fijo
- Tablet: Sidebar colapsable
- Mobile: Menú hamburguesa

---

## ⌨️ Atajos de Teclado (Opcional)

- `Ctrl + N`: Nueva noticia
- `Ctrl + S`: Guardar (en formularios)
- `Esc`: Cerrar modales

---

## 🎯 Flujo de Trabajo Típico

### Publicar una noticia

1. Login → `/admin`
2. "Noticias" → "Nueva noticia"
3. Completar campos:
   - Título: "Nueva normativa SUNAT 2026"
   - Resumen: "Texto corto..."
   - Contenido: "Artículo completo..."
   - Categoría: Normativas
   - Keywords: Seleccionar relevantes
4. Estado: Publicado
5. "Guardar"
6. Verificar en sitio público: `/noticias/nueva-normativa-sunat-2026`

### Asignar keywords a página

1. Login → `/admin`
2. "SEO" → "Keywords por Página"
3. Seleccionar página (ej: Software Contable)
4. Marcar keywords relevantes:
   - ☑ software contable
   - ☑ libros electrónicos
   - ☑ PLE
5. "Guardar Cambios"
6. Verificar en `/contable` (inspeccionar metadata)

### Moderar comentarios

1. Login → `/admin`
2. "Comentarios"
3. Filtrar: Pendientes
4. Leer comentario
5. Click "Aprobar" o "Rechazar"
6. Verificar en noticia pública

---

## 🐛 Troubleshooting

### No puedo hacer login

**Causas:**
- Credenciales incorrectas
- JWT_SECRET diferente entre dev/prod
- Cookies bloqueadas

**Solución:**
1. Verificar email/password en base de datos
2. Verificar JWT_SECRET en .env
3. Permitir cookies de terceros

### Las keywords no aparecen en la página

**Causas:**
- Tabla `page_keywords` vacía
- Cache de Next.js no invalidado

**Solución:**
1. Verificar en admin que keywords estén asignadas
2. Limpiar cache: `rm -rf .next && npm run build`
3. Verificar en DB: `SELECT * FROM page_keywords WHERE page_name = 'contable'`

---

## 🎯 Próximos Pasos

- 🔧 [Troubleshooting General](09-TROUBLESHOOTING.md)
- 🔙 [Volver al inicio](../README.md)
