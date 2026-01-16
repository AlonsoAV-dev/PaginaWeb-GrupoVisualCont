import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Listar categorías con caché
export async function GET() {
  try {
    const categorias = await query(
      'SELECT id_categoria, nombre, slug, descripcion, estado FROM categorias WHERE estado = 1 ORDER BY nombre ASC'
    );

    return NextResponse.json({ success: true, categorias }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' // Cache 1 hora
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

    return NextResponse.json({
      success: true,
      id_categoria: result.insertId,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al crear categoría' },
      { status: 500 }
    );
  }
}
