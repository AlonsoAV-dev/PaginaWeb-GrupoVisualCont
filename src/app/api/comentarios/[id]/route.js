import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// PUT - Actualizar estado del comentario
export async function PUT(request, { params }) {
  try {
    await requireAuth();
    const { id } = await params;
    const { estado } = await request.json();

    // Validación: 1 = Aprobado, 2 = En espera, 3 = Spam
    if (![1, 2, 3].includes(estado)) {
      return NextResponse.json(
        { error: 'Estado inválido. Debe ser 1 (Aprobado), 2 (En espera) o 3 (Spam)' },
        { status: 400 }
      );
    }

    await query(
      'UPDATE comentarios SET estado = ? WHERE id_comentario = ?',
      [estado, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Comentario actualizado correctamente',
    });
  } catch (error) {
    console.error('Error al actualizar comentario:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar comentario
export async function DELETE(request, { params }) {
  try {
    await requireAuth('admin');
    const { id } = await params;

    await query('DELETE FROM comentarios WHERE id_comentario = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Comentario eliminado correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
