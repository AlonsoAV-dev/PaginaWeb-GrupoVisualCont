import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET - Obtener una categoría
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const categorias = await query(
      'SELECT * FROM categorias WHERE id_categoria = ?',
      [id]
    );

    if (categorias.length === 0) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, categoria: categorias[0] });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener categoría' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar categoría
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { nombre, descripcion, estado } = await request.json();

    const updates = [];
    const values = [];

    if (nombre !== undefined) {
      // Generar nuevo slug desde el nombre
      const generarSlug = (texto) => {
        return texto
          .toLowerCase()
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      };

      let slug = generarSlug(nombre);
      
      // Verificar slug duplicado (excluyendo la categoría actual)
      const slugsExistentes = await query(
        'SELECT slug FROM categorias WHERE slug LIKE ? AND id_categoria != ?',
        [`${slug}%`, id]
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

      updates.push('nombre = ?');
      values.push(nombre);
      updates.push('slug = ?');
      values.push(slug);
    }
    if (descripcion !== undefined) {
      updates.push('descripcion = ?');
      values.push(descripcion);
    }
    if (estado !== undefined) {
      updates.push('estado = ?');
      values.push(estado);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'No hay datos para actualizar' },
        { status: 400 }
      );
    }

    values.push(id);

    await query(
      `UPDATE categorias SET ${updates.join(', ')} WHERE id_categoria = ?`,
      values
    );

    // Revalidar rutas
    revalidatePath('/api/categorias');
    revalidatePath('/admin/categorias');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al actualizar categoría' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar categoría
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await query('DELETE FROM categorias WHERE id_categoria = ?', [id]);

    // Revalidar rutas
    revalidatePath('/api/categorias');
    revalidatePath('/admin/categorias');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al eliminar categoría' },
      { status: 500 }
    );
  }
}
