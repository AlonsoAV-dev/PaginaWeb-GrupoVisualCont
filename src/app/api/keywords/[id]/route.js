import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * DELETE - Eliminar keyword con validación de uso
 * 
 * Esta función valida que la keyword no esté siendo usada antes de eliminarla.
 * Verifica uso en:
 * - Noticias (tabla noticia_keyword)
 * - Páginas (tabla page_keywords)
 * - Servicios (tabla servicio_keyword)
 * 
 * Si está en uso, retorna error 409 con detalles de dónde está siendo usada.
 */
export async function DELETE(request, { params }) {
  try {
    await requireAuth('admin');
    const { id } = await params;

    // Verificar si la keyword está siendo usada
    const [noticiasResult, pagesResult, serviciosResult] = await Promise.all([
      query('SELECT COUNT(*) as count FROM noticia_keyword WHERE id_keyword = ?', [id]),
      query('SELECT COUNT(*) as count FROM page_keywords WHERE id_keyword = ?', [id]),
      query('SELECT COUNT(*) as count FROM servicio_keyword WHERE id_keyword = ?', [id])
    ]);

    const noticiasCount = noticiasResult[0]?.count || 0;
    const pagesCount = pagesResult[0]?.count || 0;
    const serviciosCount = serviciosResult[0]?.count || 0;

    // Si está siendo usada, retornar error con detalles
    if (noticiasCount > 0 || pagesCount > 0 || serviciosCount > 0) {
      const usos = [];
      if (noticiasCount > 0) usos.push(`${noticiasCount} noticia${noticiasCount > 1 ? 's' : ''}`);
      if (pagesCount > 0) usos.push(`${pagesCount} página${pagesCount > 1 ? 's' : ''}`);
      if (serviciosCount > 0) usos.push(`${serviciosCount} servicio${serviciosCount > 1 ? 's' : ''}`);

      return NextResponse.json(
        { 
          error: `No se puede eliminar la keyword porque está siendo usada en: ${usos.join(', ')}`,
          usage: {
            noticias: noticiasCount,
            pages: pagesCount,
            servicios: serviciosCount
          }
        },
        { status: 409 } // 409 Conflict
      );
    }

    // Si no está siendo usada, eliminar keyword
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
