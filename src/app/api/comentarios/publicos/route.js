import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Obtener comentarios aprobados de una noticia (público)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const noticiaId = searchParams.get('noticia');

    if (!noticiaId) {
      return NextResponse.json(
        { error: 'El ID de la noticia es requerido' },
        { status: 400 }
      );
    }

    // Obtener solo comentarios aprobados (estado = 1)
    const sql = `
      SELECT 
        c.id_comentario,
        c.comentario,
        c.creado_en,
        a.nombre as autor_nombre,
        a.tipo as autor_tipo
      FROM comentarios c
      INNER JOIN autor a ON c.id_autor = a.id_autor
      WHERE c.id_noticia = ? AND c.estado = 1
      ORDER BY c.creado_en DESC
    `;

    const comentarios = await query(sql, [noticiaId]);

    return NextResponse.json(
      { 
        success: true, 
        comentarios 
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
        }
      }
    );
  } catch (error) {
    console.error('Error al obtener comentarios públicos:', error);
    return NextResponse.json(
      { error: 'Error al cargar comentarios' },
      { status: 500 }
    );
  }
}
