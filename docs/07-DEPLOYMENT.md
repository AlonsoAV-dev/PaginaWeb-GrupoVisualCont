# 🚀 Deployment

Guía completa para desplegar Visual ERP en producción.

## 📋 Pre-Deployment Checklist

### 1. Código
- [ ] Build sin errores: `npm run build`
- [ ] Tests pasando (si aplica)
- [ ] ESLint sin warnings críticos
- [ ] Código commiteado en git

### 2. Base de Datos
- [ ] Schema actualizado en producción
- [ ] Migrations ejecutadas
- [ ] Backup reciente disponible
- [ ] Credenciales seguras

### 3. Variables de Entorno
- [ ] `.env` configurado para producción
- [ ] JWT_SECRET único y seguro
- [ ] URLs actualizadas
- [ ] Claves API configuradas

### 4. SEO
- [ ] Sitemap generado: `npm run postbuild`
- [ ] robots.txt actualizado
- [ ] Meta tags verificados
- [ ] Schema.org validado

---

## 🏗️ Opciones de Deployment

### Opción 1: Vercel (Recomendado)

**Ventajas:**
- Deploy automático desde Git
- SSL gratis
- CDN global
- Zero-config para Next.js
- Previews automáticos

**Pasos:**

1. **Conectar repositorio**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Iniciar proyecto
vercel
```

2. **Configurar variables de entorno**
```
Dashboard → Settings → Environment Variables

DB_HOST=tu-db-host
DB_USER=tu-db-user
DB_PASSWORD=tu-db-password
DB_NAME=visualerp
JWT_SECRET=tu-jwt-secret
NEXT_PUBLIC_SITE_URL=https://grupovisualcont.com
```

3. **Deploy**
```bash
# Deploy a producción
vercel --prod
```

4. **Dominio personalizado**
```
Dashboard → Domains → Add Domain
grupovisualcont.com
```

---

### Opción 2: Hosting Tradicional (cPanel/VPS)

**Requisitos:**
- Node.js 20+
- MySQL 8+
- PM2 para gestión de procesos
- Nginx como reverse proxy

**Pasos:**

1. **Preparar servidor**
```bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2
sudo npm install -g pm2

# Instalar Nginx
sudo apt-get install nginx
```

2. **Clonar proyecto**
```bash
cd /var/www
git clone https://github.com/tu-usuario/grupovisualcont.com.git
cd grupovisualcont.com
npm install
```

3. **Configurar .env**
```bash
cp .env.example .env
nano .env
```

4. **Build**
```bash
npm run build
```

5. **Configurar PM2**
```bash
# Iniciar con PM2
pm2 start npm --name "visualerp" -- start

# Guardar configuración
pm2 save

# Autostart en reinicio
pm2 startup
```

6. **Configurar Nginx**
```nginx
# /etc/nginx/sites-available/grupovisualcont.com

server {
    listen 80;
    server_name grupovisualcont.com www.grupovisualcont.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Activar sitio
sudo ln -s /etc/nginx/sites-available/grupovisualcont.com /etc/nginx/sites-enabled/

# Test configuración
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

7. **SSL con Certbot**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d grupovisualcont.com -d www.grupovisualcont.com
```

---

## 🗄️ Base de Datos en Producción

### MariaDB (Banahosting)

1. **Acceder a cPanel**
2. **MySQL Databases → Create Database**
```
Nombre: visualerp_prod
```

3. **Create User**
```
Usuario: visualerp_user
Password: [contraseña segura]
```

4. **Add User to Database**
```
Usuario: visualerp_user
Base de datos: visualerp_prod
Privilegios: ALL PRIVILEGES
```

5. **Importar Schema**
```bash
# Desde phpMyAdmin
- Import → Elegir database/schema.sql

# O desde línea de comandos
mysql -h tu-host -u visualerp_user -p visualerp_prod < database/schema.sql
```

6. **Verificar conexión**
```javascript
// Prueba local con credenciales de producción
DB_HOST=tu-host-remoto
DB_USER=visualerp_user
DB_PASSWORD=tu-password
DB_NAME=visualerp_prod

npm run dev
```

---

## 🔐 Seguridad en Producción

### Variables de Entorno

```env
# NUNCA commitear este archivo
# Usar variables de entorno del hosting

# Producción
NODE_ENV=production
DB_HOST=db.grupovisualcont.com
DB_USER=prod_user
DB_PASSWORD=contraseña-muy-segura-32-chars+
DB_NAME=visualerp_prod
JWT_SECRET=otro-secreto-completamente-diferente-minimo-32-chars
NEXT_PUBLIC_SITE_URL=https://grupovisualcont.com
```

### Headers de Seguridad

**next.config.mjs:**
```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};
```

---

## 🔄 CI/CD con GitHub Actions

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📊 Monitoreo

### PM2 Monitoring

```bash
# Status
pm2 status

# Logs en tiempo real
pm2 logs visualerp

# Métricas
pm2 monit

# Restart
pm2 restart visualerp

# Reload (zero-downtime)
pm2 reload visualerp
```

### Health Check Endpoint

**src/app/api/health/route.js:**
```javascript
export async function GET() {
  try {
    // Check database connection
    const pool = await getConnection();
    await pool.query('SELECT 1');
    
    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (error) {
    return Response.json({
      status: 'unhealthy',
      error: error.message,
    }, { status: 500 });
  }
}
```

**Monitorear:**
```bash
curl https://grupovisualcont.com/api/health
```

---

## 🔙 Rollback

### Vercel

```bash
# Ver deployments
vercel ls

# Rollback a deployment anterior
vercel rollback [deployment-url]
```

### PM2

```bash
# Volver a versión anterior del código
git checkout main
git pull origin main~1  # Versión anterior
npm install
npm run build
pm2 restart visualerp
```

---

## 📦 Backup

### Base de Datos

```bash
# Backup automático diario
crontab -e

# Agregar:
0 2 * * * mysqldump -u user -p'password' visualerp_prod > /backups/visualerp_$(date +\%Y\%m\%d).sql
```

### Archivos

```bash
# Backup de imágenes y uploads
rsync -avz /var/www/grupovisualcont.com/public/images /backups/images_$(date +%Y%m%d)
```

---

## 🎯 Post-Deployment

1. **Verificar sitio**
   - [ ] Home page carga correctamente
   - [ ] Login admin funciona
   - [ ] API endpoints responden

2. **SEO**
   - [ ] Enviar sitemap a Google Search Console
   - [ ] Verificar Schema.org con Google Rich Results Test
   - [ ] Revisar robots.txt

3. **Monitoreo**
   - [ ] Configurar alertas (Uptime Robot, Pingdom)
   - [ ] Google Analytics funcionando
   - [ ] Error tracking (Sentry, opcional)

4. **Performance**
   - [ ] Lighthouse Score > 90
   - [ ] Core Web Vitals en verde
   - [ ] Tiempo de carga < 3s

---

## 🎯 Próximos Pasos

- 👤 [Panel de Administración](08-ADMIN-PANEL.md)
- 🔧 [Troubleshooting](09-TROUBLESHOOTING.md)
- 🔙 [Volver al inicio](../README.md)
