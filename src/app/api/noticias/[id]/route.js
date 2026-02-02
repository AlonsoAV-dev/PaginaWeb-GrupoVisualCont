import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Función helper para generar descripción corta desde contenido HTML
function generarDescripcionCorta(contenidoHTML, maxCaracteres = 160) {
  // Eliminar etiquetas HTML
  let textoPlano = contenidoHTML.replace(/<[^>]*>/g, ' ');
  
  // Decodificar entidades HTML (mapa completo de entidades comunes)
  const entidades = {
    '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
    '&#39;': "'", '&apos;': "'",
    // Acentos y caracteres especiales en español
    '&aacute;': 'á', '&eacute;': 'é', '&iacute;': 'í', '&oacute;': 'ó', '&uacute;': 'ú',
    '&Aacute;': 'Á', '&Eacute;': 'É', '&Iacute;': 'Í', '&Oacute;': 'Ó', '&Uacute;': 'Ú',
    '&ntilde;': 'ñ', '&Ntilde;': 'Ñ',
    '&uuml;': 'ü', '&Uuml;': 'Ü',
    '&iexcl;': '¡', '&iquest;': '¿',
    // Otros caracteres comunes
    '&deg;': '°', '&copy;': '©', '&reg;': '®', '&euro;': '€',
    '&pound;': '£', '&yen;': '¥', '&cent;': '¢',
    '&sect;': '§', '&para;': '¶', '&middot;': '·',
    '&laquo;': '«', '&raquo;': '»', '&ldquo;': '"', '&rdquo;': '"',
    '&lsquo;': "'", '&rsquo;': "'", '&ndash;': '–', '&mdash;': '—'
  };
  
  // Reemplazar entidades nombradas
  textoPlano = textoPlano.replace(/&[a-zA-Z]+;/g, (match) => entidades[match] || match);
  
  // Decodificar entidades numéricas (&#160; &#xA0;)
  textoPlano = textoPlano.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
  textoPlano = textoPlano.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
  
  // Limpiar espacios múltiples y saltos de línea
  textoPlano = textoPlano.replace(/\s+/g, ' ').trim();
  
  // Si el texto es más corto que el máximo, devolverlo completo
  if (textoPlano.length <= maxCaracteres) {
    return textoPlano;
  }
  
  // Cortar en el límite de caracteres
  let descripcion = textoPlano.substring(0, maxCaracteres);
  
  // Buscar el último espacio para no cortar palabras
  const ultimoEspacio = descripcion.lastIndexOf(' ');
  if (ultimoEspacio > maxCaracteres * 0.8) { // Solo si está cerca del límite
    descripcion = descripcion.substring(0, ultimoEspacio);
  }
  
  return descripcion.trim() + '...';
}

// GET - Obtener una noticia con sus keywords
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const noticias = await query(
      `SELECT n.*, a.nombre as autor_nombre, s.nombre as servicio_nombre, c.nombre as categoria_nombre, c.slug as categoria_slug
       FROM noticias n
       LEFT JOIN autor a ON n.id_autor = a.id_autor
       LEFT JOIN servicios s ON n.id_servicio = s.id_servicio
       LEFT JOIN categorias c ON n.id_categoria = c.id_categoria
       WHERE n.id_noticia = ?`,
      [id]
    );

    if (noticias.length === 0) {
      return NextResponse.json(
        { error: 'Noticia no encontrada' },
        { status: 404 }
      );
    }

    // Obtener keywords de la noticia
    const keywords = await query(
      `SELECT k.id_keyword, k.nombre
       FROM keywords k
       INNER JOIN noticia_keyword nk ON k.id_keyword = nk.id_keyword
       WHERE nk.id_noticia = ?`,
      [id]
    );

    const noticia = { ...noticias[0], keywords };

    return NextResponse.json({ success: true, noticia });
  } catch (error) {
    console.error('Error al obtener noticia:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// PUT - Actualizar noticia
export async function PUT(request, { params }) {
  try {
    await requireAuth();
    const { id } = await params;
    
    const { 
      titulo, 
      contenido,
      imagen_principal,
      id_categoria,
      nombre_autor,
      estado,
      keywords 
    } = await request.json();

    // Validación
    if (!titulo || !contenido) {
      return NextResponse.json(
        { error: 'Titulo y contenido son requeridos' },
        { status: 400 }
      );
    }

    // Generar descripción corta automáticamente desde el contenido
    const descripcion_corta = generarDescripcionCorta(contenido);

    // Generar slug desde el título si cambió
    const generarSlug = (texto) => {
      return texto
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    };

    let slug = generarSlug(titulo);
    
    // Verificar si el slug ya existe (excluyendo la noticia actual)
    const slugsExistentes = await query(
      'SELECT slug FROM noticias WHERE slug LIKE ? AND id_noticia != ?',
      [`${slug}%`, id]
    );
    
    if (slugsExistentes.length > 0) {
      const slugs = slugsExistentes.map(n => n.slug);
      let contador = 1;
      let slugFinal = slug;
      while (slugs.includes(slugFinal)) {
        slugFinal = `${slug}-${contador}`;
        contador++;
      }
      slug = slugFinal;
    }

    // Actualizar fecha_publicacion automáticamente si cambia a 'publicada'
    const noticiaActual = await query(
      'SELECT estado, fecha_publicacion FROM noticias WHERE id_noticia = ?',
      [id]
    );
    
    let fecha_publicacion = noticiaActual[0].fecha_publicacion;
    if (estado === 'publicada' && noticiaActual[0].estado !== 'publicada' && !fecha_publicacion) {
      fecha_publicacion = new Date();
    }

    // Actualizar noticia
    await query(
      `UPDATE noticias 
       SET titulo = ?, slug = ?, contenido = ?, descripcion_corta = ?, imagen_principal = ?, id_categoria = ?, nombre_autor = ?, estado = ?, fecha_publicacion = ?
       WHERE id_noticia = ?`,
      [
        titulo,
        slug,
        contenido,
        descripcion_corta,
        imagen_principal || null,
        id_categoria || null,
        nombre_autor,
        estado || 'borrador',
        fecha_publicacion,
        id,
      ]
    );

    // Actualizar keywords si se proporcionan
    if (keywords && Array.isArray(keywords)) {
      // Eliminar keywords anteriores
      await query('DELETE FROM noticia_keyword WHERE id_noticia = ?', [id]);

      // Insertar nuevas keywords
      for (const id_keyword of keywords) {
        await query(
          'INSERT INTO noticia_keyword (id_noticia, id_keyword) VALUES (?, ?)',
          [id, id_keyword]
        );
      }
    }

    // Revalidar rutas para actualizar el cache
    revalidatePath('/api/noticias');
    revalidatePath('/admin/noticias');
    revalidatePath('/noticias');
    revalidatePath(`/noticias/${slug}`);

    return NextResponse.json({
      success: true,
      message: 'Noticia actualizada correctamente',
    });
  } catch (error) {
    console.error('Error al actualizar noticia:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar noticia
export async function DELETE(request, { params }) {
  try {
    await requireAuth('admin');
    const { id } = await params;

    // Eliminar keywords asociadas
    await query('DELETE FROM noticia_keyword WHERE id_noticia = ?', [id]);

    // Eliminar comentarios asociados
    await query('DELETE FROM comentarios WHERE id_noticia = ?', [id]);

    // Eliminar noticia
    await query('DELETE FROM noticias WHERE id_noticia = ?', [id]);

    // Revalidar rutas para actualizar el cache
    revalidatePath('/api/noticias');
    revalidatePath('/admin/noticias');
    revalidatePath('/noticias');

    return NextResponse.json({
      success: true,
      message: 'Noticia eliminada correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar noticia:', error);
    return NextResponse.json(
      { error: error.message || 'Error en el servidor' },
      { status: 500 }
    );
  }
}
