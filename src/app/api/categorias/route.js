import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET - Listar categorías con caché
export async function GET() {
  try {
    const categorias = await query(
      'SELECT id_categoria, nombre, slug, descripcion, estado FROM categorias WHERE estado = 1 ORDER BY nombre ASC'
    );

    return NextResponse.json({ success: true, categorias }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener categorías' },
      { status: 500 }
    );
  }
}

// POST - Crear categoría
export async function POST(request) {
  try {
    const { nombre, descripcion } = await request.json();

    if (!nombre) {
      return NextResponse.json(
        { error: 'Nombre es requerido' },
        { status: 400 }
      );
    }

    // Generar slug automáticamente desde el nombre
    const generarSlug = (texto) => {
      return texto
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    };

    let slug = generarSlug(nombre);
    
    // Verificar si el slug ya existe y añadir sufijo
    const slugsExistentes = await query(
      'SELECT slug FROM categorias WHERE slug LIKE ?',
      [`${slug}%`]
    );
    
    if (slugsExistentes.length > 0) {
      const slugs = slugsExistentes.map(c => c.slug);
      let contador = 1;
      let slugFinal = slug;
      while (slugs.includes(slugFinal)) {
        slugFinal = `${slug}-${contador}`;
        contador++;
      }
      slug = slugFinal;
    }

    const result = await query(
      'INSERT INTO categorias (nombre, slug, descripcion) VALUES (?, ?, ?)',
      [nombre, slug, descripcion || null]
    );

    // Revalidar rutas
    revalidatePath('/api/categorias');
    revalidatePath('/admin/categorias');

    return NextResponse.json({
      success: true,
      categoria: {
        id_categoria: result.insertId,
        nombre,
        slug,
        descripcion: descripcion || null
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al crear categoría' },
      { status: 500 }
    );
  }
}
