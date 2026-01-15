import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { hashPassword, requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET - Obtener un usuario
export async function GET(request, { params }) {
  try {
    await requireAuth('admin');
    const { id } = await params;

    const usuarios = await query(
      `SELECT id_usuario, nombre, email, rol, estado, ultimo_login, creado_en 
       FROM usuarios 
       WHERE id_usuario = ?`,
      [id]
    );

    if (usuarios.length === 0) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, usuario: usuarios[0] });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar usuario
export async function PUT(request, { params }) {
  try {
    await requireAuth('admin');
    const { id } = await params;
    const { nombre, email, password, rol, estado } = await request.json();

    // Validación
    if (!nombre || !email || !rol) {
      return NextResponse.json(
        { error: 'Nombre, email y rol son requeridos' },
        { status: 400 }
      );
    }

    if (!['admin', 'editor'].includes(rol)) {
      return NextResponse.json(
        { error: 'Rol inválido' },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe en otro usuario
    const existentes = await query(
      'SELECT id_usuario FROM usuarios WHERE email = ? AND id_usuario != ?',
      [email, id]
    );

    if (existentes.length > 0) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      );
    }

    // Construir query de actualización
    let updateQuery = 'UPDATE usuarios SET nombre = ?, email = ?, rol = ?';
    const updateParams = [nombre, email, rol];

    if (password) {
      const hashedPassword = await hashPassword(password);
      updateQuery += ', password = ?';
      updateParams.push(hashedPassword);
    }

    if (estado !== undefined) {
      updateQuery += ', estado = ?';
      updateParams.push(estado);
    }

    updateQuery += ' WHERE id_usuario = ?';
    updateParams.push(id);

    await query(updateQuery, updateParams);

    return NextResponse.json({
      success: true,
      message: 'Usuario actualizado correctamente',
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar usuario (soft delete)
export async function DELETE(request, { params }) {
  try {
    await requireAuth('admin');
    const { id } = await params;

    await query(
      'UPDATE usuarios SET estado = 0 WHERE id_usuario = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Usuario desactivado correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
