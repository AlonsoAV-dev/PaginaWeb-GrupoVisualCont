import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const TOKEN_NAME = 'auth-token';

// Hash de contraseña
export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

// Verificar contraseña
export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Crear JWT token
export async function createToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

// Verificar JWT token
export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

// Obtener usuario actual desde cookies
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    
    if (!token) return null;
    
    const payload = await verifyToken(token);
    return payload;
  } catch (error) {
    return null;
  }
}

// Establecer cookie de autenticación
export async function setAuthCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: '/',
  });
}

// Eliminar cookie de autenticación
export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
}

// Middleware helper para proteger rutas
export async function requireAuth(requiredRole = null) {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('No autenticado');
  }
  
  if (requiredRole && user.rol !== requiredRole && user.rol !== 'admin') {
    throw new Error('No autorizado');
  }
  
  return user;
}
