const { Pool } = require('pg');
require('dotenv').config();

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  connectionString: process.env.POSTGRESQL_URI,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,  // Tiempo de espera para la conexión
  idleTimeoutMillis: 30000,      // Tiempo de espera antes de liberar una conexión inactiva
});

// Función para ejecutar consultas
const query = async (text, params) => {
  const res = await pool.query(text, params);
  return res;
};

module.exports = { pool, query };
