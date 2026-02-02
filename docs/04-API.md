# 🔌 API Reference

Documentación completa de los endpoints de la API.

## 🔐 Autenticación

Todos los endpoints bajo `/api` (excepto login y consultas públicas) requieren autenticación JWT.

### Formato de Token

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

O mediante cookie `httpOnly`:
```
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🔑 Auth Endpoints

### POST /api/auth/login

Autenticación de usuarios.

**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@grupovisualcont.com",
  "password": "tu_password"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "admin@grupovisualcont.com",
    "nombre": "Administrador",
    "rol": "admin"
  }
}
```

**Response Error (401):**
```json
{
  "success": false,
  "message": "Credenciales inválidas"
}
```

**Cookies:**
- `token`: JWT con expiración de 7 días (httpOnly, secure en producción)

---

### POST /api/auth/logout

Cerrar sesión.

**Request:**
```http
POST /api/auth/logout
```

**Response (200):**
```json
{
  "success": true,
  "message": "Sesión cerrada"
}
```

---

### GET /api/auth/me

Obtener usuario actual.

**Request:**
```http
GET /api/auth/me
Cookie: token=...
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 2,
    "email": "editor@blog.com",
    "nombre": "Editor",
    "rol": "editor",
    "iat": 1769623010,
    "exp": 1770227810
  }
}
```

**Response Error (401):**
```json
{
  "success": false,
  "message": "No autenticado"
}
```

---

## 📰 Noticias Endpoints

### GET /api/noticias

Listar noticias con paginación.

**Query Parameters:**
- `page`: Número de página (default: 1)
- `limit`: Resultados por página (default: 10, max: 50)
- `estado`: Filtrar por estado (`borrador`, `publicado`, `archivado`)
- `categoria`: ID de categoría

**Request:**
```http
GET /api/noticias?page=1&limit=10&estado=publicado
```

**Response (200):**
```json
{
  "success": true,
  "noticias": [
    {
      "id_noticia": 1,
      "titulo": "Nueva normativa SUNAT 2026",
      "slug": "nueva-normativa-sunat-2026",
      "resumen": "Resumen corto...",
      "imagen_principal": "/images/noticias/noticia_01/principal.jpg",
      "fecha_publicacion": "2026-01-15",
      "categoria": "Normativas",
      "categoria_slug": "normativas",
      "autor": "Equipo Visual ERP",
      "autor_foto": "/images/noticias/autores/equipo.jpg",
      "vistas": 150
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

---

### GET /api/noticias/[id]

Obtener una noticia por ID.

**Request:**
```http
GET /api/noticias/12
```

**Response (200):**
```json
{
  "success": true,
  "noticia": {
    "id_noticia": 12,
    "titulo": "...",
    "slug": "...",
    "contenido": "<p>HTML content...</p>",
    "categoria": {...},
    "autor": {...},
    "keywords": ["software contable", "SUNAT"],
    "vistas": 200
  }
}
```

---

### GET /api/noticias/slug/[slug]

Obtener noticia por slug (para páginas públicas).

**Request:**
```http
GET /api/noticias/slug/nueva-normativa-sunat-2026
```

**Response:** Igual que GET por ID.

---

### POST /api/noticias

Crear nueva noticia (requiere autenticación).

**Request:**
```http
POST /api/noticias
Authorization: Bearer ...
Content-Type: application/json

{
  "titulo": "Mi nueva noticia",
  "slug": "mi-nueva-noticia",
  "resumen": "Resumen corto",
  "contenido": "<p>Contenido HTML completo</p>",
  "imagen_principal": "/images/noticias/noticia_01/principal.jpg",
  "id_categoria": 1,
  "id_autor": 1,
  "fecha_publicacion": "2026-01-28",
  "estado": "publicado",
  "keywords": [1, 3, 5]
}
```

**Response (201):**
```json
{
  "success": true,
  "id_noticia": 46,
  "message": "Noticia creada exitosamente"
}
```

---

### PUT /api/noticias/[id]

Actualizar noticia existente.

**Request:**
```http
PUT /api/noticias/46
Authorization: Bearer ...
Content-Type: application/json

{
  "titulo": "Título actualizado",
  ...
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Noticia actualizada"
}
```

---

### DELETE /api/noticias/[id]

Eliminar noticia (solo admin).

**Request:**
```http
DELETE /api/noticias/46
Authorization: Bearer ...
```

**Response (200):**
```json
{
  "success": true,
  "message": "Noticia eliminada"
}
```

---

## 🔑 Keywords Endpoints

### GET /api/keywords

Listar todas las keywords.

**Request:**
```http
GET /api/keywords
```

**Response (200):**
```json
{
  "success": true,
  "keywords": [
    {
      "id_keyword": 1,
      "nombre": "software contable"
    },
    {
      "id_keyword": 2,
      "nombre": "facturación electrónica"
    }
  ]
}
```

---

### POST /api/keywords

Crear nueva keyword.

**Request:**
```http
POST /api/keywords
Authorization: Bearer ...
Content-Type: application/json

{
  "nombre": "nueva keyword"
}
```

**Response (201):**
```json
{
  "success": true,
  "id_keyword": 15,
  "message": "Keyword creada"
}
```

---

### DELETE /api/keywords/[id]

Eliminar keyword.

**Request:**
```http
DELETE /api/keywords/5
Authorization: Bearer ...
```

**Response (200):**
```json
{
  "success": true,
  "message": "Keyword eliminada"
}
```

---

## 📄 Page Keywords Endpoints

### GET /api/pages/keywords

Obtener keywords de una página específica.

**Query Parameters:**
- `page`: Nombre de la página (`home`, `contable`, `erp`, etc.)

**Request:**
```http
GET /api/pages/keywords?page=contable
```

**Response (200):**
```json
{
  "success": true,
  "keywords": [
    {
      "id_keyword": 1,
      "keyword": "software contable"
    },
    {
      "id_keyword": 4,
      "keyword": "libros electrónicos"
    }
  ]
}
```

---

### POST /api/pages/keywords

Asignar keywords a una página.

**Request:**
```http
POST /api/pages/keywords
Authorization: Bearer ...
Content-Type: application/json

{
  "page": "contable",
  "keywords": [1, 4, 5, 6]
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Keywords asignadas exitosamente"
}
```

---

## 📂 Categorías Endpoints

### GET /api/categorias

Listar todas las categorías.

**Response (200):**
```json
{
  "success": true,
  "categorias": [
    {
      "id_categoria": 1,
      "nombre": "Contabilidad",
      "slug": "contabilidad",
      "descripcion": "..."
    }
  ]
}
```

### POST /api/categorias

Crear categoría.

**Request:**
```json
{
  "nombre": "Nueva Categoría",
  "slug": "nueva-categoria",
  "descripcion": "Descripción opcional"
}
```

---

## 💬 Comentarios Endpoints

### GET /api/comentarios

Listar comentarios (admin).

**Query Parameters:**
- `estado`: `pendiente`, `aprobado`, `rechazado`

**Response (200):**
```json
{
  "success": true,
  "comentarios": [
    {
      "id_comentario": 1,
      "nombre": "Juan Pérez",
      "comentario": "Excelente artículo",
      "estado": "pendiente",
      "noticia_titulo": "Nueva normativa SUNAT",
      "created_at": "2026-01-27T10:30:00Z"
    }
  ]
}
```

---

### GET /api/comentarios/publicos

Obtener comentarios aprobados de una noticia (público).

**Query Parameters:**
- `id_noticia`: ID de la noticia

**Request:**
```http
GET /api/comentarios/publicos?id_noticia=12
```

**Response (200):**
```json
{
  "success": true,
  "comentarios": [
    {
      "id_comentario": 5,
      "nombre": "María López",
      "comentario": "Muy útil, gracias",
      "created_at": "2026-01-20T15:00:00Z"
    }
  ]
}
```

---

### POST /api/comentarios

Crear comentario (público).

**Request:**
```json
{
  "id_noticia": 12,
  "nombre": "Carlos Ruiz",
  "email": "carlos@example.com",
  "comentario": "Interesante artículo"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Comentario enviado. Pendiente de aprobación."
}
```

---

### PUT /api/comentarios/[id]

Moderar comentario (cambiar estado).

**Request:**
```json
{
  "estado": "aprobado"
}
```

---

## 👥 Usuarios Endpoints (Solo Admin)

### GET /api/usuarios

Listar usuarios.

**Response (200):**
```json
{
  "success": true,
  "usuarios": [
    {
      "id": 1,
      "email": "admin@blog.com",
      "nombre": "Admin",
      "rol": "admin",
      "created_at": "2025-12-01T10:00:00Z"
    }
  ]
}
```

---

### POST /api/usuarios

Crear usuario.

**Request:**
```json
{
  "email": "nuevo@blog.com",
  "password": "password123",
  "nombre": "Nuevo Editor",
  "rol": "editor"
}
```

---

## 📋 Códigos de Estado

| Código | Significado |
|--------|-------------|
| 200 | OK - Operación exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Parámetros inválidos |
| 401 | Unauthorized - No autenticado |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## 🔒 Middleware de Autenticación

Los endpoints protegidos verifican:
1. Existencia de token en cookie o header
2. Validez del token JWT
3. Rol del usuario (admin vs editor)

```javascript
// Ejemplo de uso desde el cliente
const response = await fetch('/api/noticias', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Incluir cookies
  body: JSON.stringify(data)
});
```

---

## 🎯 Próximos Pasos

- 🧩 [Componentes](05-COMPONENTES.md)
- 🎯 [SEO](06-SEO.md)
- 🚀 [Deployment](07-DEPLOYMENT.md)
