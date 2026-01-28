import { getConnection } from './db';

/**
 * Get keywords assigned to a specific page
 * @param {string} pageName - The page identifier (e.g., 'home', 'contable', 'erp')
 * @returns {Promise<Array>} Array of keyword objects with id_keyword and keyword properties
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
 * Format keywords for Next.js metadata keywords array
 * @param {Array} keywords - Array of keyword objects from getPageKeywords()
 * @returns {Array<string>} Array of keyword strings
 */
export function formatKeywordsForMetadata(keywords) {
  if (!keywords || keywords.length === 0) {
    return [];
  }
  return keywords.map(k => k.keyword);
}

/**
 * Format keywords for Schema.org "keywords" property (comma-separated string)
 * @param {Array} keywords - Array of keyword objects from getPageKeywords()
 * @returns {string} Comma-separated keywords string
 */
export function formatKeywordsForSchema(keywords) {
  if (!keywords || keywords.length === 0) {
    return '';
  }
  return keywords.map(k => k.keyword).join(', ');
}

/**
 * Format keywords as Schema.org Thing objects for "about" property
 * @param {Array} keywords - Array of keyword objects from getPageKeywords()
 * @returns {Array<Object>} Array of Schema Thing objects
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
