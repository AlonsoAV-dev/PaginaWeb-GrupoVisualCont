import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// DELETE - Eliminar keyword
export async function DELETE(request, { params }) {
  try {
    await requireAuth('admin');
    const { id } = await params;

    // Eliminar relaciones
    await query('DELETE FROM noticia_keyword WHERE id_keyword = ?', [id]);
    await query('DELETE FROM servicio_keyword WHERE id_keyword = ?', [id]);

    // Eliminar keyword
    await query('DELETE FROM keywords WHERE id_keyword = ?', [id]);

    // Revalidar rutas
    revalidatePath('/api/keywords');
    revalidatePath('/admin/keywords');

    return NextResponse.json({
      success: true,
      message: 'Keyword eliminada correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar keyword:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
