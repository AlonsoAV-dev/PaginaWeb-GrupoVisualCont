import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';
import { hashPassword, requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET - Obtener todos los usuarios
export async function GET() {
  try {
    await requireAuth('admin');

    const usuarios = await query(
      `SELECT id_usuario, nombre, email, rol, estado, ultimo_login, creado_en 
       FROM usuarios 
       ORDER BY creado_en DESC`
    );

    return NextResponse.json({ success: true, usuarios });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: error.message === 'No autenticado' ? 401 : 500 }
    );
  }
}

// POST - Crear nuevo usuario
export async function POST(request) {
  try {
    await requireAuth('admin');

    const { nombre, email, password, rol } = await request.json();

    // Validación
    if (!nombre || !email || !password || !rol) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    if (!['admin', 'editor'].includes(rol)) {
      return NextResponse.json(
        { error: 'Rol inválido' },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    const existentes = await query(
      'SELECT id_usuario FROM usuarios WHERE email = ?',
      [email]
    );

    if (existentes.length > 0) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      );
    }

    // Hash de contraseña
    const hashedPassword = await hashPassword(password);

    // Crear usuario
    const result = await query(
      `INSERT INTO usuarios (nombre, email, password, rol) 
       VALUES (?, ?, ?, ?)`,
      [nombre, email, hashedPassword, rol]
    );

    // Revalidar rutas
    revalidatePath('/api/usuarios');
    revalidatePath('/admin/usuarios');

    return NextResponse.json({
      success: true,
      message: 'Usuario creado correctamente',
      usuario: {
        id_usuario: result.insertId,
        nombre,
        email,
        rol,
        estado: 1,
        ultimo_login: null,
        creado_en: new Date()
      }
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
