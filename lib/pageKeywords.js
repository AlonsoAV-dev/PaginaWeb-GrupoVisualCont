import { query } from './db';

/**
 * Obtiene las keywords asignadas a una página específica
 * @param {string} pageName - Nombre de la página (home, contable, erp, etc)
 * @returns {Promise<Array>} Array de keywords
 */
export async function getPageKeywords(pageName) {
  try {
    const keywords = await query(
      `SELECT k.id_keyword, k.nombre 
       FROM keywords k
       INNER JOIN page_keywords pk ON k.id_keyword = pk.id_keyword
       WHERE pk.page_name = ?
       ORDER BY k.nombre ASC`,
      [pageName]
    );
    return keywords || [];
  } catch (error) {
    console.error(`Error al obtener keywords de ${pageName}:`, error);
    return [];
  }
}

/**
 * Formatea keywords para metadata
 * @param {Array} keywords - Array de objetos keyword
 * @returns {Array<string>} Array de nombres de keywords
 */
export function formatKeywordsForMetadata(keywords) {
  return keywords.map(k => k.nombre);
}

/**
 * Formatea keywords para Schema.org
 * @param {Array} keywords - Array de objetos keyword
 * @returns {string} String de keywords separadas por coma
 */
export function formatKeywordsForSchema(keywords) {
  return keywords.map(k => k.nombre).join(', ');
}

/**
 * Formatea keywords como Things para Schema.org
 * @param {Array} keywords - Array de objetos keyword
 * @returns {Array} Array de objetos Thing
 */
export function formatKeywordsAsThings(keywords) {
  return keywords.map(k => ({
    '@type': 'Thing',
    name: k.nombre
  }));
}
