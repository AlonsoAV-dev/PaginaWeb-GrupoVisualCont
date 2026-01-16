import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

// GET - Obtener todos los comentarios con paginación y optimización
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const noticia = searchParams.get('noticia');
    const estado = searchParams.get('estado');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const offset = (page - 1) * limit;

    // Query optimizada - solo campos necesarios
    let sql = `
      SELECT 
        c.id_comentario,
        c.id_noticia,
        c.id_autor,
        c.comentario,
        c.estado,
        c.creado_en,
        a.nombre as autor_nombre,
        a.email as autor_email,
        n.titulo as noticia_titulo
      FROM comentarios c
      INNER JOIN autor a ON c.id_autor = a.id_autor
      INNER JOIN noticias n ON c.id_noticia = n.id_noticia
      WHERE 1=1
    `;
    const params = [];

    if (noticia) {
      sql += ' AND c.id_noticia = ?';
      params.push(noticia);
    }

    if (estado) {
      sql += ' AND c.estado = ?';
      params.push(estado);
    }

    // Contar total
    const countSql = `SELECT COUNT(*) as total FROM comentarios c WHERE 1=1 ${
      noticia ? 'AND c.id_noticia = ?' : ''
    } ${
      estado ? 'AND c.estado = ?' : ''
    }`;
    const countParams = params.slice();
    const [{ total }] = await query(countSql, countParams);

    sql += ' ORDER BY c.creado_en DESC';
    sql += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const comentarios = await query(sql, params);

    return NextResponse.json({ 
      success: true, 
      comentarios,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
      }
    });
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo comentario (público)
export async function POST(request) {
  try {
    const { id_noticia, nombre, email, comentario } = await request.json();

    // Validación
    if (!id_noticia || !nombre || !email || !comentario) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Buscar o crear autor
    let autor = await query(
      'SELECT id_autor FROM autor WHERE email = ?',
      [email]
    );

    let id_autor;
    if (autor.length === 0) {
      // Crear nuevo autor externo
      const result = await query(
        'INSERT INTO autor (nombre, email, tipo) VALUES (?, ?, ?)',
        [nombre, email, 'externo']
      );
      id_autor = result.insertId;
    } else {
      id_autor = autor[0].id_autor;
    }

    // Crear comentario (estado 2 = en espera)
    const result = await query(
      'INSERT INTO comentarios (id_noticia, id_autor, comentario, estado) VALUES (?, ?, ?, ?)',
      [id_noticia, id_autor, comentario, 2]
    );

    return NextResponse.json({
      success: true,
      message: 'Comentario enviado. Será visible después de ser aprobado.',
      id_comentario: result.insertId,
    });
  } catch (error) {
    console.error('Error al crear comentario:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
