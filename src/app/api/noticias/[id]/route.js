import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET - Obtener una noticia con sus keywords
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const noticias = await query(
      `SELECT n.*, a.nombre as autor_nombre, s.nombre as servicio_nombre
       FROM noticias n
       LEFT JOIN autor a ON n.id_autor = a.id_autor
       LEFT JOIN servicios s ON n.id_servicio = s.id_servicio
       WHERE n.id_noticia = ?`,
      [id]
    );

    if (noticias.length === 0) {
      return NextResponse.json(
        { error: 'Noticia no encontrada' },
        { status: 404 }
      );
    }

    // Obtener keywords de la noticia
    const keywords = await query(
      `SELECT k.id_keyword, k.nombre
       FROM keywords k
       INNER JOIN noticia_keyword nk ON k.id_keyword = nk.id_keyword
       WHERE nk.id_noticia = ?`,
      [id]
    );

    const noticia = { ...noticias[0], keywords };

    return NextResponse.json({ success: true, noticia });
  } catch (error) {
    console.error('Error al obtener noticia:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar noticia
export async function PUT(request, { params }) {
  try {
    await requireAuth();
    const { id } = await params;
    
    const { 
      titulo, 
      slug, 
      contenido, 
      id_servicio, 
      estado,
      fecha_publicacion,
      keywords 
    } = await request.json();

    // Validación
    if (!titulo || !contenido) {
      return NextResponse.json(
        { error: 'Titulo y contenido son requeridos' },
        { status: 400 }
      );
    }

    // Actualizar noticia
    await query(
      `UPDATE noticias 
       SET titulo = ?, slug = ?, contenido = ?, id_servicio = ?, estado = ?, fecha_publicacion = ?
       WHERE id_noticia = ?`,
      [
        titulo,
        slug || titulo.toLowerCase().replace(/\s+/g, '-'),
        contenido,
        id_servicio || null,
        estado || 'borrador',
        fecha_publicacion || null,
        id,
      ]
    );

    // Actualizar keywords si se proporcionan
    if (keywords && Array.isArray(keywords)) {
      // Eliminar keywords anteriores
      await query('DELETE FROM noticia_keyword WHERE id_noticia = ?', [id]);

      // Insertar nuevas keywords
      for (const id_keyword of keywords) {
        await query(
          'INSERT INTO noticia_keyword (id_noticia, id_keyword) VALUES (?, ?)',
          [id, id_keyword]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Noticia actualizada correctamente',
    });
  } catch (error) {
    console.error('Error al actualizar noticia:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar noticia
export async function DELETE(request, { params }) {
  try {
    await requireAuth('admin');
    const { id } = await params;

    // Eliminar keywords asociadas
    await query('DELETE FROM noticia_keyword WHERE id_noticia = ?', [id]);

    // Eliminar comentarios asociados
    await query('DELETE FROM comentarios WHERE id_noticia = ?', [id]);

    // Eliminar noticia
    await query('DELETE FROM noticias WHERE id_noticia = ?', [id]);

    return NextResponse.json({
      success: true,
      message: 'Noticia eliminada correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar noticia:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
