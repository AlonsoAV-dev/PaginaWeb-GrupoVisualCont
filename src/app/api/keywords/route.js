import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET - Obtener todas las keywords con paginación o búsqueda
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 15;
    const offset = (page - 1) * limit;
    const search = searchParams.get('search') || '';

    // Si hay búsqueda, buscar sin paginación (máximo 10 resultados)
    if (search) {
      const keywords = await query(
        'SELECT id_keyword, nombre FROM keywords WHERE nombre LIKE ? ORDER BY nombre ASC LIMIT 10',
        [`%${search}%`]
      );

      return NextResponse.json({ 
        success: true, 
        keywords
      }, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }

    // Contar total
    const [{ total }] = await query('SELECT COUNT(*) as total FROM keywords');

    // Obtener keywords con paginación
    const keywords = await query(
      'SELECT id_keyword, nombre FROM keywords ORDER BY id_keyword DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    return NextResponse.json({ 
      success: true, 
      keywords,
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
    console.error('Error al obtener keywords:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// POST - Crear nueva keyword
export async function POST(request) {
  try {
    await requireAuth();
    const { nombre } = await request.json();

    if (!nombre) {
      return NextResponse.json(
        { error: 'El nombre es requerido' },
        { status: 400 }
      );
    }

    // Verificar si ya existe
    const existentes = await query(
      'SELECT id_keyword FROM keywords WHERE nombre = ?',
      [nombre]
    );

    if (existentes.length > 0) {
      return NextResponse.json(
        { error: 'La keyword ya existe' },
        { status: 400 }
      );
    }

    const result = await query(
      'INSERT INTO keywords (nombre) VALUES (?)',
      [nombre]
    );

    // Revalidar rutas
    revalidatePath('/api/keywords');
    revalidatePath('/admin/keywords');

    return NextResponse.json({
      success: true,
      message: 'Keyword creada correctamente',
      keyword: {
        id_keyword: result.insertId,
        nombre
      }
    });
  } catch (error) {
    console.error('Error al crear keyword:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
