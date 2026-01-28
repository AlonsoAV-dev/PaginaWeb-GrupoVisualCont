import { getConnection } from './db';

/**
 * Obtiene las keywords asignadas a una página específica
 * @param {string} pageName - Identificador de la página (ej: 'home', 'contable', 'erp')
 * @returns {Promise<Array>} Array de objetos keyword con propiedades id_keyword y keyword
 */
export async function getPageKeywords(pageName) {
  try {
    const query = `
      SELECT k.id_keyword, k.nombre as keyword
      FROM page_keywords pk
      INNER JOIN keywords k ON pk.id_keyword = k.id_keyword
      WHERE pk.page_name = ?
      ORDER BY k.nombre ASC
    `;
    
    const pool = await getConnection();
    const [rows] = await pool.execute(query, [pageName]);
    return rows || [];
  } catch (error) {
    console.error(`Error fetching keywords for page ${pageName}:`, error);
    return [];
  }
}

/**
 * Formatea keywords para el array de metadata de Next.js
 * @param {Array} keywords - Array de objetos keyword de getPageKeywords()
 * @returns {Array<string>} Array de strings de keywords
 */
export function formatKeywordsForMetadata(keywords) {
  if (!keywords || keywords.length === 0) {
    return [];
  }
  return keywords.map(k => k.keyword);
}

/**
 * Formatea keywords para la propiedad "keywords" de Schema.org (string separado por comas)
 * @param {Array} keywords - Array de objetos keyword de getPageKeywords()
 * @returns {string} String de keywords separadas por comas
 */
export function formatKeywordsForSchema(keywords) {
  if (!keywords || keywords.length === 0) {
    return '';
  }
  return keywords.map(k => k.keyword).join(', ');
}

/**
 * Formatea keywords como objetos Thing de Schema.org para la propiedad "about"
 * @param {Array} keywords - Array de objetos keyword de getPageKeywords()
 * @returns {Array<Object>} Array de objetos Thing de Schema
 */
export function formatKeywordsAsThings(keywords) {
  if (!keywords || keywords.length === 0) {
    return [];
  }
  return keywords.map(k => ({
    '@type': 'Thing',
    'name': k.keyword
  }));
}
