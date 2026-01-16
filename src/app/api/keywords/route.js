import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

// GET - Obtener todas las keywords con caché
export async function GET() {
  try {
    const keywords = await query(
      'SELECT id_keyword, nombre FROM keywords ORDER BY nombre ASC'
    );

    return NextResponse.json({ success: true, keywords }, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' // Cache 30 min
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

    return NextResponse.json({
      success: true,
      message: 'Keyword creada correctamente',
      id_keyword: result.insertId,
    });
  } catch (error) {
    console.error('Error al crear keyword:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
