import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Obtener todos los autores con caché
export async function GET() {
  try {
    const autores = await query(
      'SELECT id_autor, nombre, email, tipo, estado FROM autor WHERE estado = "activo" ORDER BY id_autor DESC'
    );

    return NextResponse.json({ success: true, autores }, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' // Cache 30 min
      }
    });
  } catch (error) {
    console.error('Error al obtener autores:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
