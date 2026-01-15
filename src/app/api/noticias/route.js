import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET - Obtener todas las noticias
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const estado = searchParams.get('estado');
    const servicio = searchParams.get('servicio');

    let sql = `
      SELECT n.*, a.nombre as autor_nombre, s.nombre as servicio_nombre
      FROM noticias n
      LEFT JOIN autor a ON n.id_autor = a.id_autor
      LEFT JOIN servicios s ON n.id_servicio = s.id_servicio
      WHERE 1=1
    `;
    const params = [];

    if (estado) {
      sql += ' AND n.estado = ?';
      params.push(estado);
    }

    if (servicio) {
      sql += ' AND n.id_servicio = ?';
      params.push(servicio);
    }

    sql += ' ORDER BY n.creado_en DESC';

    const noticias = await query(sql, params);

    return NextResponse.json({ success: true, noticias });
  } catch (error) {
    console.error('Error al obtener noticias:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// POST - Crear nueva noticia
export async function POST(request) {
  try {
    const user = await requireAuth();

    const { 
      cod_unico, 
      titulo, 
      slug, 
      contenido, 
      id_servicio, 
      id_autor,
      estado,
      fecha_publicacion,
      keywords 
    } = await request.json();

    // Validación
    if (!cod_unico || !titulo || !contenido || !id_autor) {
      return NextResponse.json(
        { error: 'Campos requeridos: cod_unico, titulo, contenido, id_autor' },
        { status: 400 }
      );
    }

    // Verificar si el código único ya existe
    const existentes = await query(
      'SELECT id_noticia FROM noticias WHERE cod_unico = ?',
      [cod_unico]
    );

    if (existentes.length > 0) {
      return NextResponse.json(
        { error: 'El código único ya existe' },
        { status: 400 }
      );
    }

    // Insertar noticia
    const result = await query(
      `INSERT INTO noticias 
       (cod_unico, titulo, slug, contenido, id_servicio, id_autor, estado, fecha_publicacion) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cod_unico,
        titulo,
        slug || titulo.toLowerCase().replace(/\s+/g, '-'),
        contenido,
        id_servicio || null,
        id_autor,
        estado || 'borrador',
        fecha_publicacion || null,
      ]
    );

    const id_noticia = result.insertId;

    // Insertar keywords si se proporcionan
    if (keywords && Array.isArray(keywords) && keywords.length > 0) {
      for (const id_keyword of keywords) {
        await query(
          'INSERT INTO noticia_keyword (id_noticia, id_keyword) VALUES (?, ?)',
          [id_noticia, id_keyword]
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Noticia creada correctamente',
      id_noticia,
    });
  } catch (error) {
    console.error('Error al crear noticia:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
