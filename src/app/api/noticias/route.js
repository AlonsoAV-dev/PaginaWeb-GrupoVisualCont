import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET - Obtener todas las noticias con paginación
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const estado = searchParams.get('estado');
    const servicio = searchParams.get('servicio');
    const categoria = searchParams.get('categoria');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const offset = (page - 1) * limit;

    // Query optimizada - solo campos necesarios
    let sql = `
      SELECT 
        n.id_noticia,
        n.cod_unico,
        n.titulo,
        n.slug,
        n.descripcion_corta,
        n.imagen_principal,
        n.estado,
        n.fecha_publicacion,
        n.creado_en,
        n.id_categoria,
        n.nombre_autor,
        COALESCE(n.nombre_autor, a.nombre) as autor_nombre,
        c.nombre as categoria_nombre,
        c.slug as categoria_slug
      FROM noticias n
      LEFT JOIN autor a ON n.id_autor = a.id_autor
      LEFT JOIN categorias c ON n.id_categoria = c.id_categoria
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

    if (categoria) {
      sql += ' AND n.id_categoria = ?';
      params.push(categoria);
    }

    // Contar total antes de aplicar LIMIT
    const countSql = `SELECT COUNT(*) as total FROM noticias n WHERE 1=1 ${
      estado ? 'AND n.estado = ?' : ''
    } ${
      servicio ? 'AND n.id_servicio = ?' : ''
    } ${
      categoria ? 'AND n.id_categoria = ?' : ''
    }`;
    const countParams = params.slice();
    const [{ total }] = await query(countSql, countParams);

    sql += ' ORDER BY n.fecha_publicacion DESC, n.creado_en DESC';
    sql += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const noticias = await query(sql, params);

    return NextResponse.json({ 
      success: true, 
      noticias,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
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
      titulo, 
      contenido,
      descripcion_corta,
      imagen_principal,
      id_categoria,
      nombre_autor,
      estado,
      keywords 
    } = await request.json();

    // Validación - solo campos que envía el usuario
    if (!titulo || !contenido || !nombre_autor) {
      return NextResponse.json(
        { error: 'Campos requeridos: titulo, contenido, nombre_autor' },
        { status: 400 }
      );
    }

    // Generar cod_unico único (timestamp + random)
    const cod_unico = `NOT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Generar slug desde el título
    const generarSlug = (texto) => {
      return texto
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
        .replace(/[^a-z0-9]+/g, '-') // Reemplazar caracteres especiales con guiones
        .replace(/^-+|-+$/g, ''); // Eliminar guiones al inicio/fin
    };

    let slug = generarSlug(titulo);
    
    // Verificar si el slug ya existe y añadir sufijo si es necesario
    const slugsExistentes = await query(
      'SELECT slug FROM noticias WHERE slug LIKE ?',
      [`${slug}%`]
    );
    
    if (slugsExistentes.length > 0) {
      const slugs = slugsExistentes.map(n => n.slug);
      let contador = 1;
      let slugFinal = slug;
      while (slugs.includes(slugFinal)) {
        slugFinal = `${slug}-${contador}`;
        contador++;
      }
      slug = slugFinal;
    }

    // Generar fecha_publicacion automáticamente si el estado es 'publicada'
    const fecha_publicacion = estado === 'publicada' ? new Date() : null;

    // Insertar noticia
    const result = await query(
      `INSERT INTO noticias 
       (cod_unico, titulo, slug, contenido, descripcion_corta, imagen_principal, id_categoria, id_servicio, nombre_autor, estado, fecha_publicacion) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cod_unico,
        titulo,
        slug,
        contenido,
        descripcion_corta || null,
        imagen_principal || null,
        id_categoria || null,
        null, // id_servicio siempre null (campo obsoleto)
        nombre_autor,
        estado || 'borrador',
        fecha_publicacion,
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

    // Revalidar rutas para actualizar el cache
    revalidatePath('/api/noticias');
    revalidatePath('/admin/noticias');
    revalidatePath('/noticias');

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
