# 🛠️ Instalación y Configuración

Guía completa para configurar el proyecto Visual ERP desde cero.

## 📋 Requisitos Previos

### Software Necesario
- **Node.js** 20.x o superior ([Descargar](https://nodejs.org/))
- **MySQL** 8.0 o superior ([Descargar](https://dev.mysql.com/downloads/))
- **Git** ([Descargar](https://git-scm.com/))
- **Editor de código** (VS Code recomendado)

### Verificar Instalaciones
```bash
node --version    # v20.x.x o superior
npm --version     # v10.x.x o superior
mysql --version   # 8.0.x o superior
git --version     # 2.x.x o superior
```

---

## 📥 Instalación

### 1. Clonar el Repositorio

```bash
# HTTPS
git clone https://github.com/tu-usuario/grupovisualcont.com.git

# SSH (si tienes configurado)
git clone git@github.com:tu-usuario/grupovisualcont.com.git

# Entrar al directorio
cd grupovisualcont.com
```

### 2. Instalar Dependencias

```bash
npm install
```

**Tiempo estimado:** 2-3 minutos

---

## 🗄️ Configurar Base de Datos

### 1. Crear Base de Datos

```bash
# Conectar a MySQL
mysql -u root -p

# Crear base de datos
CREATE DATABASE visualerp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Crear Usuario (Opcional pero recomendado)

```sql
CREATE USER 'visualerp_user'@'localhost' IDENTIFIED BY 'tu_password_seguro';
GRANT ALL PRIVILEGES ON visualerp.* TO 'visualerp_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Importar Schema

```bash
# Importar tablas
mysql -u root -p visualerp < database/schema.sql
```

### 4. Verificar Tablas

```bash
mysql -u root -p visualerp

SHOW TABLES;
```

**Deberías ver:**
```
+---------------------+
| Tables_in_visualerp |
+---------------------+
| autores             |
| categorias          |
| comentarios         |
| keywords            |
| noticias            |
| noticias_keywords   |
| page_keywords       |
| usuarios            |
+---------------------+
```

---

## ⚙️ Variables de Entorno

### 1. Crear archivo `.env.local`

```bash
cp .env.example .env.local
```

### 2. Configurar variables

```env
# Base de datos MySQL
DB_HOST=localhost
DB_USER=visualerp_user
DB_PASSWORD=tu_password_seguro
DB_NAME=visualerp

# JWT para autenticación (genera uno único)
JWT_SECRET=tu_secreto_jwt_muy_largo_y_aleatorio_minimo_32_caracteres

# URL del sitio
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Cloudflare Turnstile (Opcional - para producción)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

### 3. Generar JWT_SECRET seguro

```bash
# Opción 1: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Opción 2: OpenSSL
openssl rand -hex 32

# Opción 3: Online
# https://generate-random.org/api-token-generator
```

---

## 👤 Crear Usuario Admin

### 1. Hashear contraseña

```bash
node -e "console.log(require('bcrypt').hashSync('tu_password', 10))"
```

### 2. Insertar en base de datos

```sql
INSERT INTO usuarios (email, password, nombre, rol) 
VALUES (
    'admin@grupovisualcont.com',
    '$2b$10$hashedPasswordAqui',
    'Administrador',
    'admin'
);
```

**Credenciales de prueba:**
- Email: `admin@grupovisualcont.com`
- Password: `tu_password`

---

## 🚀 Iniciar Servidor de Desarrollo

```bash
npm run dev
```

**Consola esperada:**
```
▲ Next.js 16.1.4 (Turbopack)
- Local:        http://localhost:3000
- Network:      http://192.168.1.x:3000

✓ Ready in 1.5s
```

### Verificar funcionamiento:

1. **Home:** http://localhost:3000
2. **Admin:** http://localhost:3000/admin (usar credenciales creadas)
3. **API Test:** http://localhost:3000/api/noticias

---

## 🔧 Configuración Adicional

### VS Code Extensions (Recomendadas)

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "dsznajder.es7-react-js-snippets"
  ]
}
```

### Configurar ESLint

```bash
npm run lint
```

### Optimizar Imágenes (Opcional)

Si necesitas optimizar imágenes existentes:

```bash
# Instalar Sharp (ya incluido)
npm install sharp

# Convertir imágenes a WebP
node scripts/optimize-images.js
```

---

## 📦 Datos de Prueba (Opcional)

### Insertar contenido de ejemplo

```sql
-- Categorías
INSERT INTO categorias (nombre, slug) VALUES
('Contabilidad', 'contabilidad'),
('Facturación', 'facturacion'),
('Normativas', 'normativas');

-- Keywords
INSERT INTO keywords (nombre) VALUES
('software contable'),
('facturación electrónica'),
('SUNAT'),
('libros electrónicos'),
('PLE');

-- Autor
INSERT INTO autores (nombre, descripcion) VALUES
('Equipo Visual ERP', 'Expertos en software empresarial');
```

---

## ✅ Checklist de Instalación

- [ ] Node.js 20+ instalado
- [ ] MySQL 8+ instalado y corriendo
- [ ] Repositorio clonado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Base de datos creada
- [ ] Schema importado
- [ ] `.env.local` configurado con todas las variables
- [ ] Usuario admin creado
- [ ] Servidor de desarrollo corriendo
- [ ] Acceso a http://localhost:3000 exitoso
- [ ] Login en `/admin` exitoso

---

## 🐛 Problemas Comunes

### Error: "Cannot connect to database"

**Solución:**
```bash
# Verificar que MySQL esté corriendo
# Windows
net start MySQL80

# Linux/Mac
sudo service mysql start

# Verificar credenciales en .env.local
```

### Error: "Module not found"

**Solución:**
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 already in use"

**Solución:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9

# O usar otro puerto
npm run dev -- -p 3001
```

### Error de permisos MySQL

**Solución:**
```sql
GRANT ALL PRIVILEGES ON visualerp.* TO 'tu_usuario'@'localhost';
FLUSH PRIVILEGES;
```

---

## 🎯 Próximos Pasos

1. ✅ Instalación completada
2. 📖 Lee [Arquitectura del Proyecto](02-ARQUITECTURA.md)
3. 🗄️ Revisa [Estructura de Base de Datos](03-DATABASE.md)
4. 🔌 Consulta [API Reference](04-API.md)

---

## 📞 Ayuda

Si tienes problemas:
1. Revisa [Troubleshooting](09-TROUBLESHOOTING.md)
2. Contacta a soporte@grupovisualcont.com
3. WhatsApp: +51 956 703 375
