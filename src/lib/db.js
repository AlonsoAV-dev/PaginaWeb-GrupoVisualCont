import mysql from 'mysql2/promise';

// Pool de conexiones para mejor rendimiento
let pool;

/**
 * Obtiene una conexión a la base de datos
 * Soporta dos formas de configuración:
 * 1. Variables individuales: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
 * 2. URL completa: DATABASE_URL
 */
export async function getConnection() {
  if (!pool) {
    // Opción 1: Usar DATABASE_URL si está disponible
    if (process.env.DATABASE_URL) {
      pool = mysql.createPool({
        uri: process.env.DATABASE_URL,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
      });
    } 
    // Opción 2: Usar variables individuales
    else {
      if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
        throw new Error(
          'Configuración de base de datos incompleta. ' +
          'Proporciona DATABASE_URL o (DB_HOST, DB_USER, DB_NAME) en tus variables de entorno.'
        );
      }

      pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
      });
    }

    // Log de conexión (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Pool de conexiones MySQL creado');
    }
  }
  return pool;
}

// Helper para ejecutar queries
export async function query(sql, params) {
  const connection = await getConnection();
  const [results] = await connection.execute(sql, params);
  return results;
}

// Helper para transacciones
export async function transaction(callback) {
  const connection = await getConnection();
  const conn = await connection.getConnection();

  try {
    await conn.beginTransaction();
    const result = await callback(conn);
    await conn.commit();
    return result;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}
