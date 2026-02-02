# 🗄️ Base de Datos

Estructura y esquema de la base de datos MySQL.

## 📊 Diagrama ER

```
┌──────────────┐
│   usuarios   │
└──────┬───────┘
       │ 1
       │
       │ N
┌──────▼───────┐         ┌─────────────┐
│   noticias   │ N ───── │  categorias │
└──────┬───────┘   1     └─────────────┘
       │ N
       │           ┌─────────────┐
       │ 1         │   autores   │
       │           └─────────────┘
       │                   1
       │ N                 │
       ├───────────────────┘
       │
       │ N
       │
┌──────▼────────────────┐
│ noticias_keywords     │ (Junction)
└──────┬────────────────┘
       │ N
       │
       │ 1
┌──────▼───────┐
│   keywords   │
└──────┬───────┘
       │ 1
       │
       │ N
┌──────▼────────────────┐
│  page_keywords        │ (Junction)
└───────────────────────┘
       
┌──────────────┐
│ comentarios  │
└──────┬───────┘
       │ N
       │
       │ 1
       └───► noticias
```

---

## 📋 Tablas

### 1. `usuarios`

Gestión de usuarios del sistema (admin/editor).

```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    rol ENUM('admin', 'editor') NOT NULL DEFAULT 'editor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- `id`: Identificador único
- `email`: Email único para login
- `password`: Hash bcrypt de la contraseña
- `nombre`: Nombre completo del usuario
- `rol`: `admin` (acceso total) o `editor` (acceso limitado)
- `created_at`: Fecha de creación
- `updated_at`: Fecha de última actualización

**Índices:**
- PRIMARY KEY: `id`
- UNIQUE: `email`

---

### 2. `categorias`

Categorías para clasificar noticias.

```sql
CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- `id_categoria`: Identificador único
- `nombre`: Nombre de la categoría
- `slug`: URL-friendly (ej: `contabilidad`)
- `descripcion`: Descripción opcional
- `created_at`: Fecha de creación

**Ejemplos:**
```sql
INSERT INTO categorias (nombre, slug, descripcion) VALUES
('Contabilidad', 'contabilidad', 'Noticias sobre contabilidad empresarial'),
('Facturación', 'facturacion', 'Comprobantes y facturación electrónica'),
('Normativas', 'normativas', 'Cambios normativos SUNAT');
```

---

### 3. `autores`

Autores de las noticias del blog.

```sql
CREATE TABLE autores (
    id_autor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    foto VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- `id_autor`: Identificador único
- `nombre`: Nombre del autor
- `descripcion`: Bio corta
- `foto`: URL de la foto (relativa o absoluta)
- `created_at`: Fecha de creación

**Ejemplo:**
```sql
INSERT INTO autores (nombre, descripcion, foto) VALUES
('Equipo Visual ERP', 'Expertos en software empresarial', '/images/noticias/autores/equipo.jpg');
```

---

### 4. `noticias`

Artículos del blog.

```sql
CREATE TABLE noticias (
    id_noticia INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    resumen TEXT NOT NULL,
    contenido LONGTEXT NOT NULL,
    imagen_principal VARCHAR(255),
    id_categoria INT,
    id_autor INT,
    id_usuario INT NOT NULL,
    fecha_publicacion DATE NOT NULL,
    estado ENUM('borrador', 'publicado', 'archivado') DEFAULT 'borrador',
    vistas INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE SET NULL,
    FOREIGN KEY (id_autor) REFERENCES autores(id_autor) ON DELETE SET NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- `id_noticia`: Identificador único
- `titulo`: Título del artículo
- `slug`: URL amigable (ej: `nueva-normativa-sunat-2026`)
- `resumen`: Resumen corto (150-200 caracteres)
- `contenido`: Contenido completo en HTML
- `imagen_principal`: URL de la imagen destacada
- `id_categoria`: FK a categorías
- `id_autor`: FK a autores
- `id_usuario`: FK a usuarios (quien creó)
- `fecha_publicacion`: Fecha de publicación
- `estado`: `borrador`, `publicado`, `archivado`
- `vistas`: Contador de visitas
- `created_at`: Fecha de creación
- `updated_at`: Fecha de última edición

**Índices:**
- PRIMARY KEY: `id_noticia`
- UNIQUE: `slug`
- INDEX: `id_categoria`, `id_autor`, `id_usuario`, `fecha_publicacion`

---

### 5. `keywords`

Keywords globales reutilizables.

```sql
CREATE TABLE keywords (
    id_keyword INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- `id_keyword`: Identificador único
- `nombre`: Keyword (ej: `software contable`)
- `created_at`: Fecha de creación

**Ejemplos:**
```sql
INSERT INTO keywords (nombre) VALUES
('software contable'),
('facturación electrónica'),
('SUNAT'),
('libros electrónicos'),
('PLE'),
('SIRE'),
('planilla electrónica'),
('PLAME'),
('ERP integrado'),
('inventarios KARDEX');
```

---

### 6. `noticias_keywords` (Junction)

Relación muchos a muchos entre noticias y keywords.

```sql
CREATE TABLE noticias_keywords (
    id_noticia INT NOT NULL,
    id_keyword INT NOT NULL,
    PRIMARY KEY (id_noticia, id_keyword),
    FOREIGN KEY (id_noticia) REFERENCES noticias(id_noticia) ON DELETE CASCADE,
    FOREIGN KEY (id_keyword) REFERENCES keywords(id_keyword) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Uso:**
```sql
-- Asignar keywords a una noticia
INSERT INTO noticias_keywords (id_noticia, id_keyword) VALUES
(1, 1), -- noticia 1 → keyword 1
(1, 3), -- noticia 1 → keyword 3
(1, 5); -- noticia 1 → keyword 5
```

---

### 7. `page_keywords` (Junction)

Relación muchos a muchos entre páginas y keywords.

```sql
CREATE TABLE page_keywords (
    page_name VARCHAR(50) NOT NULL,
    id_keyword INT NOT NULL,
    PRIMARY KEY (page_name, id_keyword),
    FOREIGN KEY (id_keyword) REFERENCES keywords(id_keyword) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**page_name válidos:**
- `home`
- `contable`
- `erp`
- `facturador`
- `planilla`
- `nosotros`

**Uso:**
```sql
-- Asignar keywords a página
INSERT INTO page_keywords (page_name, id_keyword) VALUES
('contable', 1),  -- software contable
('contable', 4),  -- libros electrónicos
('contable', 5),  -- PLE
('contable', 6);  -- SIRE
```

---

### 8. `comentarios`

Comentarios públicos en noticias.

```sql
CREATE TABLE comentarios (
    id_comentario INT AUTO_INCREMENT PRIMARY KEY,
    id_noticia INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    comentario TEXT NOT NULL,
    estado ENUM('pendiente', 'aprobado', 'rechazado') DEFAULT 'pendiente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_noticia) REFERENCES noticias(id_noticia) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

**Campos:**
- `id_comentario`: Identificador único
- `id_noticia`: FK a noticias
- `nombre`: Nombre del comentarista
- `email`: Email (no se muestra públicamente)
- `comentario`: Texto del comentario
- `estado`: `pendiente` (moderación), `aprobado`, `rechazado`
- `created_at`: Fecha de creación

---

## 🔍 Queries Comunes

### Obtener noticias con categorías y autores

```sql
SELECT 
    n.id_noticia,
    n.titulo,
    n.slug,
    n.resumen,
    n.imagen_principal,
    n.fecha_publicacion,
    c.nombre AS categoria,
    c.slug AS categoria_slug,
    a.nombre AS autor,
    a.foto AS autor_foto
FROM noticias n
LEFT JOIN categorias c ON n.id_categoria = c.id_categoria
LEFT JOIN autores a ON n.id_autor = a.id_autor
WHERE n.estado = 'publicado'
ORDER BY n.fecha_publicacion DESC
LIMIT 10;
```

### Obtener keywords de una noticia

```sql
SELECT k.id_keyword, k.nombre
FROM noticias_keywords nk
INNER JOIN keywords k ON nk.id_keyword = k.id_keyword
WHERE nk.id_noticia = ?
ORDER BY k.nombre ASC;
```

### Obtener keywords de una página

```sql
SELECT k.id_keyword, k.nombre as keyword
FROM page_keywords pk
INNER JOIN keywords k ON pk.id_keyword = k.id_keyword
WHERE pk.page_name = ?
ORDER BY k.nombre ASC;
```

### Buscar noticias por keyword

```sql
SELECT DISTINCT n.*
FROM noticias n
INNER JOIN noticias_keywords nk ON n.id_noticia = nk.id_noticia
INNER JOIN keywords k ON nk.id_keyword = k.id_keyword
WHERE k.nombre = 'software contable'
  AND n.estado = 'publicado'
ORDER BY n.fecha_publicacion DESC;
```

### Noticias más leídas

```sql
SELECT n.*, c.nombre AS categoria
FROM noticias n
LEFT JOIN categorias c ON n.id_categoria = c.id_categoria
WHERE n.estado = 'publicado'
ORDER BY n.vistas DESC
LIMIT 5;
```

---

## 🔧 Mantenimiento

### Backup

```bash
# Backup completo
mysqldump -u root -p visualerp > backup_$(date +%Y%m%d).sql

# Backup solo estructura
mysqldump -u root -p --no-data visualerp > schema.sql

# Backup solo datos
mysqldump -u root -p --no-create-info visualerp > data.sql
```

### Restore

```bash
mysql -u root -p visualerp < backup_20260128.sql
```

### Optimizar tablas

```sql
OPTIMIZE TABLE noticias, keywords, page_keywords;
```

### Ver tamaño de tablas

```sql
SELECT 
    table_name AS 'Tabla',
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Tamaño (MB)'
FROM information_schema.TABLES
WHERE table_schema = 'visualerp'
ORDER BY (data_length + index_length) DESC;
```

---

## 📊 Índices y Performance

### Índices recomendados

```sql
-- Noticias
CREATE INDEX idx_slug ON noticias(slug);
CREATE INDEX idx_estado_fecha ON noticias(estado, fecha_publicacion);

-- Keywords
CREATE INDEX idx_nombre ON keywords(nombre);

-- Comentarios
CREATE INDEX idx_noticia_estado ON comentarios(id_noticia, estado);
```

---

## 🎯 Próximos Pasos

- 🔌 [API Reference](04-API.md)
- 🧩 [Componentes](05-COMPONENTES.md)
- 🎯 [SEO](06-SEO.md)
