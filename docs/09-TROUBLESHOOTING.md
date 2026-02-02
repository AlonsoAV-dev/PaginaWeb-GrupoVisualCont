# 🔧 Troubleshooting

Solución a problemas comunes en Visual ERP.

## 📋 Índice
- [Build Errors](#-build-errors)
- [Database Errors](#-database-errors)
- [Runtime Errors](#-runtime-errors)
- [Authentication Issues](#-authentication-issues)
- [Performance Issues](#-performance-issues)
- [Deployment Issues](#-deployment-issues)

---

## 🏗️ Build Errors

### Error: Module not found: Can't resolve '@/lib/...'

**Mensaje:**
```
Module not found: Can't resolve '@/lib/pageKeywords'
```

**Causa:** Archivo faltante o ruta incorrecta en `jsconfig.json`

**Solución:**
```bash
# 1. Verificar que el archivo existe
ls src/lib/pageKeywords.js

# 2. Verificar jsconfig.json
cat jsconfig.json

# 3. Si falta, crear el archivo
touch src/lib/pageKeywords.js

# 4. Rebuild
npm run build
```

---

### Error: Turbopack cache corrupted

**Mensaje:**
```
Failed to restore task data (corrupted database or bug)
Unable to open static sorted file 00000043.sst
```

**Causa:** Cache de Turbopack corrupta

**Solución:**
```bash
# Windows
Remove-Item -Recurse -Force ".next"
npm run build

# Linux/Mac
rm -rf .next
npm run build
```

---

### Error: Parsing error in metadata

**Mensaje:**
```
'}' expected
'import', and 'export' cannot be used outside of module code
```

**Causa:** Indentación incorrecta en objeto metadata

**Solución:**
```javascript
// ❌ Incorrecto (4 espacios)
export async function generateMetadata() {
  return {
    title: "...",
    openGraph: {  // 4 espacios
      type: "website",
    },
  };
}

// ✅ Correcto (6 espacios para objetos anidados)
export async function generateMetadata() {
  return {
    title: "...",
    openGraph: {      // 6 espacios
      type: "website",
    },
  };
}
```

---

### Error: ESLint warnings

**Mensaje:**
```
Warning: React Hook useEffect has missing dependencies
```

**Solución:**
```javascript
// Agregar dependencias al array
useEffect(() => {
  fetchData();
}, [fetchData]); // ← Agregar aquí

// O deshabilitar ESLint para esa línea
// eslint-disable-next-line react-hooks/exhaustive-deps
```

---

## 🗄️ Database Errors

### Error: Unknown column 'k.keyword' in 'field list'

**Mensaje:**
```sql
ER_BAD_FIELD_ERROR: Unknown column 'k.keyword' in 'field list'
```

**Causa:** La columna en la tabla `keywords` es `nombre`, no `keyword`

**Solución:**
```javascript
// ❌ Incorrecto
SELECT k.id_keyword, k.keyword FROM keywords k

// ✅ Correcto
SELECT k.id_keyword, k.nombre as keyword FROM keywords k
```

---

### Error: You have an error in your SQL syntax near '?'

**Mensaje:**
```
You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '?' at line 1
```

**Causa:** Usando `pool.query()` en lugar de `pool.execute()` para prepared statements

**Solución:**
```javascript
// ❌ Incorrecto
const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

// ✅ Correcto
const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
```

---

### Error: ER_NO_SUCH_TABLE: Table 'visualerp.page_keywords' doesn't exist

**Causa:** Tabla no creada en base de datos

**Solución:**
```bash
# Importar schema completo
mysql -u root -p visualerp < database/schema.sql

# O crear solo esta tabla
mysql -u root -p visualerp

CREATE TABLE page_keywords (
    page_name VARCHAR(50) NOT NULL,
    id_keyword INT NOT NULL,
    PRIMARY KEY (page_name, id_keyword),
    FOREIGN KEY (id_keyword) REFERENCES keywords(id_keyword) ON DELETE CASCADE
);
```

---

### Error: Connection refused to MySQL

**Mensaje:**
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Causa:** MySQL no está corriendo

**Solución:**
```bash
# Windows
net start MySQL80

# Linux
sudo service mysql start

# Mac
brew services start mysql

# Verificar
mysql --version
```

---

### Error: Access denied for user

**Mensaje:**
```
ER_ACCESS_DENIED_ERROR: Access denied for user 'root'@'localhost' (using password: YES)
```

**Causa:** Credenciales incorrectas en `.env.local`

**Solución:**
```bash
# 1. Verificar credenciales
cat .env.local

# 2. Test de conexión
mysql -u root -p

# 3. Si olvidaste password, resetear:
# Linux
sudo mysql_secure_installation

# Windows
# Reiniciar MySQL sin grant tables y cambiar password
```

---

## ⚛️ Runtime Errors

### Error: Objects are not valid as a React child

**Mensaje:**
```
Error: Objects are not valid as a React child (found: object with keys {id_keyword, keyword})
```

**Causa:** Intentando renderizar un objeto en lugar de una propiedad específica

**Solución:**
```jsx
// ❌ Incorrecto
{keywords.map(kw => (
  <span key={kw.id_keyword}>{kw}</span> // Renderizando objeto completo
))}

// ✅ Correcto
{keywords.map(kw => (
  <span key={kw.id_keyword}>{kw.keyword}</span> // Propiedad específica
))}
```

---

### Error: Hydration failed

**Mensaje:**
```
Hydration failed because the initial UI does not match what was rendered on the server
```

**Causa:** Diferencias entre HTML del servidor y cliente

**Soluciones comunes:**
```jsx
// 1. No usar Math.random() o Date.now() directamente en JSX
// ❌ Incorrecto
<div key={Math.random()}>...</div>

// ✅ Correcto (generar en useEffect)
const [key, setKey] = useState(null);
useEffect(() => setKey(Math.random()), []);

// 2. No usar localStorage en render inicial
// ❌ Incorrecto
const theme = localStorage.getItem('theme');

// ✅ Correcto
const [theme, setTheme] = useState(null);
useEffect(() => {
  setTheme(localStorage.getItem('theme'));
}, []);

// 3. Verificar que HTML anidado sea válido
// ❌ <div> dentro de <p>
// ✅ Usar elementos permitidos
```

---

### Error: Cannot read properties of undefined

**Mensaje:**
```
TypeError: Cannot read properties of undefined (reading 'keyword')
```

**Causa:** Accediendo a propiedad de objeto no definido

**Solución:**
```javascript
// ❌ Sin validación
const keyword = data.keywords[0].keyword;

// ✅ Con validación
const keyword = data?.keywords?.[0]?.keyword || 'default';

// ✅ O con condicional
if (data && data.keywords && data.keywords.length > 0) {
  const keyword = data.keywords[0].keyword;
}
```

---

## 🔐 Authentication Issues

### No puedo hacer login

**Síntomas:**
- Credenciales correctas pero no entra
- Redirect a `/admin` después de login

**Diagnóstico:**
```bash
# 1. Verificar usuario en DB
mysql -u root -p visualerp

SELECT * FROM usuarios WHERE email = 'admin@blog.com';

# 2. Verificar JWT_SECRET
cat .env.local | grep JWT_SECRET

# 3. Test de hash de password
node -e "
const bcrypt = require('bcrypt');
const hash = '$2b$10$tu_hash_aqui';
console.log(bcrypt.compareSync('tu_password', hash));
"
```

**Soluciones:**
1. **Password incorrecto:** Resetear password
```sql
UPDATE usuarios 
SET password = '$2b$10$nuevo_hash' 
WHERE email = 'admin@blog.com';
```

2. **JWT_SECRET diferente:**
```bash
# Usar mismo secret en dev y prod
JWT_SECRET=el-mismo-secret-en-todos-lados
```

3. **Cookies bloqueadas:**
- Permitir cookies en navegador
- Verificar `httpOnly` y `secure` en producción

---

### Session expira muy rápido

**Causa:** Expiración del JWT configurada muy corta

**Solución:**
```javascript
// src/lib/auth.js
const token = jwt.sign(
  { ...userData },
  JWT_SECRET,
  { expiresIn: '7d' } // ← Cambiar aquí
);
```

---

## 🐢 Performance Issues

### Página carga muy lento

**Diagnóstico:**
```bash
# 1. Lighthouse audit
# Chrome DevTools → Lighthouse → Generate Report

# 2. Bundle size
npm run build

# 3. Verificar imágenes
ls -lh public/images/**/*.{jpg,png,webp}
```

**Soluciones:**

1. **Optimizar imágenes:**
```bash
# Convertir a WebP
npm install sharp
node scripts/convert-to-webp.js
```

2. **Lazy loading:**
```jsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Cargando...</p>
});
```

3. **Reducir JavaScript:**
```javascript
// Usar Server Components por defecto
// Solo agregar "use client" cuando sea necesario
```

---

### Core Web Vitals bajos

**LCP > 2.5s:**
- Optimizar imagen hero (WebP, dimensiones correctas)
- Usar `priority={true}` en imagen principal
- Implementar CDN

**FID > 100ms:**
- Reducir JavaScript
- Lazy load componentes no críticos
- Usar React Server Components

**CLS > 0.1:**
- Definir dimensiones en todas las imágenes
- Evitar insertar contenido dinámico arriba del fold
- Reservar espacio para ads/embeds

---

## 🚀 Deployment Issues

### Build funciona local pero falla en producción

**Causa:** Variables de entorno faltantes

**Solución:**
```bash
# Vercel
# Dashboard → Settings → Environment Variables
# Agregar todas las variables de .env.local

# Verificar que NODE_ENV=production
echo $NODE_ENV
```

---

### Cambios no se reflejan en producción

**Causa:** Cache de Next.js o CDN

**Solución:**
```bash
# 1. Limpiar cache local
rm -rf .next
npm run build

# 2. Hard refresh en navegador
Ctrl + Shift + R

# 3. Purge cache de Vercel
vercel --prod --force

# 4. Verificar que cambios estén en git
git status
git push origin main
```

---

### Error 502/504 en producción

**Causa:** Servidor sobrecargado o timeout

**Solución:**
```bash
# PM2: Verificar logs
pm2 logs visualerp

# Restart
pm2 restart visualerp

# Si persiste, aumentar recursos del servidor
# O implementar caching
```

---

## 🛠️ Comandos Útiles de Diagnóstico

### Verificar estado general

```bash
# Node version
node --version

# npm version
npm --version

# Dependencies instaladas
npm list --depth=0

# Verificar .env
cat .env.local | grep -v PASSWORD

# Build test
npm run build 2>&1 | tee build.log

# MySQL status
mysql -u root -p -e "SHOW DATABASES;"
```

---

### Logs

```bash
# Next.js development
npm run dev > dev.log 2>&1

# PM2 production
pm2 logs visualerp --lines 100

# MySQL logs (Linux)
sudo tail -f /var/log/mysql/error.log
```

---

## 📞 Obtener Ayuda

Si el problema persiste:

1. **Revisar documentación:**
   - [Next.js Docs](https://nextjs.org/docs)
   - [MySQL Docs](https://dev.mysql.com/doc/)
   - [React Docs](https://react.dev)

2. **Buscar errores:**
   - Google el mensaje de error exacto
   - Stack Overflow
   - GitHub Issues del proyecto

3. **Contactar soporte:**
   - Email: soporte@grupovisualcont.com
   - WhatsApp: +51 956 703 375

---

## 🎯 Próximos Pasos

- 🔙 [Volver al inicio](../README.md)
- 📖 [Revisar Arquitectura](02-ARQUITECTURA.md)
- 🗄️ [Base de Datos](03-DATABASE.md)
