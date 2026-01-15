import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Obtener todos los autores
export async function GET() {
  try {
    const autores = await query(
      'SELECT * FROM autor WHERE estado = "activo" ORDER BY nombre ASC'
    );

    return NextResponse.json({ success: true, autores });
  } catch (error) {
    console.error('Error al obtener autores:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
