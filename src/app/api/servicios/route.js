import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

// GET - Obtener todos los servicios
export async function GET() {
  try {
    const servicios = await query(
      'SELECT * FROM servicios WHERE estado = 1 ORDER BY nombre ASC'
    );

    return NextResponse.json({ success: true, servicios });
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo servicio
export async function POST(request) {
  try {
    await requireAuth('admin');
    const { nombre, descripcion } = await request.json();

    if (!nombre) {
      return NextResponse.json(
        { error: 'El nombre es requerido' },
        { status: 400 }
      );
    }

    const result = await query(
      'INSERT INTO servicios (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion || null]
    );

    return NextResponse.json({
      success: true,
      message: 'Servicio creado correctamente',
      id_servicio: result.insertId,
    });
  } catch (error) {
    console.error('Error al crear servicio:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
