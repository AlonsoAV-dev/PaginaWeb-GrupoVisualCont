import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const TOKEN_NAME = 'auth-token';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Proteger rutas de admin
  if (pathname.startsWith('/admin')) {
    // Leer cookie directamente del request (no usar cookies() de next/headers)
    const token = request.cookies.get(TOKEN_NAME)?.value;
    
    let user = null;
    if (token) {
      try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        user = payload;
      } catch (error) {
        // Token inválido
        user = null;
      }
    }
    
    // Si no hay usuario, redirigir a la página de noticias
    if (!user) {
      return NextResponse.redirect(new URL('/noticias', request.url));
    }
    
    // Si el usuario está logueado y está en /admin o /admin/, redirigir al dashboard
    if ((pathname === '/admin' || pathname === '/admin/') && user) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    
    // Verificar que el usuario tenga rol de admin o editor
    if (!['admin', 'editor'].includes(user.rol)) {
      return NextResponse.redirect(new URL('/noticias', request.url));
    }

    // Proteger ruta de usuarios solo para admins
    if (pathname.startsWith('/admin/usuarios') && user.rol !== 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/',
    '/admin/:path*'
  ],
};
