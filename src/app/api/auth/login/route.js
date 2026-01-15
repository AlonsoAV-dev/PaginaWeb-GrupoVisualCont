import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyPassword, createToken, setAuthCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validación
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Buscar usuario
    const usuarios = await query(
      'SELECT * FROM usuarios WHERE email = ? AND estado = 1',
      [email]
    );

    if (usuarios.length === 0) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const usuario = usuarios[0];

    // Verificar contraseña
    const isValid = await verifyPassword(password, usuario.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Actualizar último login
    await query(
      'UPDATE usuarios SET ultimo_login = NOW() WHERE id_usuario = ?',
      [usuario.id_usuario]
    );

    // Crear token
    const token = await createToken({
      id: usuario.id_usuario,
      email: usuario.email,
      nombre: usuario.nombre,
      rol: usuario.rol,
    });

    // Establecer cookie
    await setAuthCookie(token);

    // Retornar usuario (sin password)
    const { password: _, ...usuarioSinPassword } = usuario;

    return NextResponse.json({
      success: true,
      usuario: usuarioSinPassword,
    });
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
