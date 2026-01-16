import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET - Obtener noticia por slug con caché optimizado
export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    // Query optimizada con todos los datos en una sola consulta
    const noticias = await query(
      `SELECT 
        n.id_noticia,
        n.cod_unico,
        n.titulo,
        n.slug,
        n.contenido,
        n.descripcion_corta,
        n.imagen_principal,
        n.estado,
        n.fecha_publicacion,
        n.creado_en,
        n.id_categoria,
        a.nombre as autor_nombre,
        a.email as autor_email,
        c.nombre as categoria_nombre,
        c.slug as categoria_slug,
        GROUP_CONCAT(DISTINCT CONCAT(k.id_keyword, ':', k.nombre) SEPARATOR '||') as keywords_raw
       FROM noticias n
       LEFT JOIN autor a ON n.id_autor = a.id_autor
       LEFT JOIN categorias c ON n.id_categoria = c.id_categoria
       LEFT JOIN noticia_keyword nk ON n.id_noticia = nk.id_noticia
       LEFT JOIN keywords k ON nk.id_keyword = k.id_keyword
       WHERE n.slug = ? AND n.estado = 'publicada'
       GROUP BY n.id_noticia`,
      [slug]
    );

    if (noticias.length === 0) {
      return NextResponse.json(
        { error: 'Noticia no encontrada' },
        { status: 404 }
      );
    }

    // Procesar keywords
    const noticia = { ...noticias[0] };
    if (noticia.keywords_raw) {
      noticia.keywords = noticia.keywords_raw.split('||').map(kw => {
        const [id_keyword, nombre] = kw.split(':');
        return { id_keyword: parseInt(id_keyword), nombre };
      });
    } else {
      noticia.keywords = [];
    }
    delete noticia.keywords_raw;

    return NextResponse.json({ success: true, noticia }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    });
  } catch (error) {
    console.error('Error al obtener noticia:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
