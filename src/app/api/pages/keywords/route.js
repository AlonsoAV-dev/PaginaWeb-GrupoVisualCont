import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET - Obtener keywords de una página específica
 * Query params: ?page=contable|erp|facturador|planilla|home
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageName = searchParams.get('page');

    if (!pageName) {
      return NextResponse.json(
        { error: 'El parámetro "page" es requerido' },
        { status: 400 }
      );
    }

    // Obtener keywords asignadas a esta página
    const pageKeywords = await query(
      `SELECT k.id_keyword, k.nombre as keyword
       FROM keywords k
       INNER JOIN page_keywords pk ON k.id_keyword = pk.id_keyword
       WHERE pk.page_name = ?
       ORDER BY k.nombre ASC`,
      [pageName]
    );

    return NextResponse.json({ 
      success: true, 
      page: pageName,
      keywords: pageKeywords 
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    });
  } catch (error) {
    console.error('Error al obtener keywords de página:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}

/**
 * POST - Asignar keywords a una página
 * Body: { page: 'contable', keywords: [1, 2, 3] }
 */
export async function POST(request) {
  try {
    await requireAuth();
    const { page, keywords } = await request.json();

    if (!page || !Array.isArray(keywords)) {
      return NextResponse.json(
        { error: 'page y keywords son requeridos' },
        { status: 400 }
      );
    }

    // Eliminar keywords existentes de esta página
    await query(
      'DELETE FROM page_keywords WHERE page_name = ?',
      [page]
    );

    // Insertar nuevas keywords una por una
    if (keywords.length > 0) {
      for (const keyword of keywords) {
        let id_keyword;
        
        // Si es un número positivo, es un ID existente
        if (typeof keyword === 'number' && keyword > 0) {
          id_keyword = keyword;
        } 
        // Si es un string o ID negativo (temporal), buscar/crear keyword
        else if (typeof keyword === 'string') {
          // Buscar si ya existe
          const existing = await query(
            'SELECT id_keyword FROM keywords WHERE nombre = ?',
            [keyword]
          );
          
          if (existing.length > 0) {
            id_keyword = existing[0].id_keyword;
          } else {
            // Crear la keyword nueva
            const keywordResult = await query(
              'INSERT INTO keywords (nombre) VALUES (?)',
              [keyword]
            );
            id_keyword = keywordResult.insertId;
          }
        }
        // Ignorar IDs temporales negativos (buscar nombre en allKeywords)
        else {
          continue;
        }
        
        // Insertar relación página-keyword
        await query(
          'INSERT INTO page_keywords (page_name, id_keyword) VALUES (?, ?)',
          [page, id_keyword]
        );
      }
    }

    // Revalidar la página para actualizar el cache
    revalidatePath(`/${page}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Keywords actualizadas correctamente' 
    });
  } catch (error) {
    console.error('Error al actualizar keywords de página:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
