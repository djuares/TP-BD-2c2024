const { query } = require('./db'); // Importa la función query desde db.js

async function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS alumnos (
      padron INT PRIMARY KEY NOT NULL,
      nombre VARCHAR(100) NOT NULL,
      apellido VARCHAR(100) NOT NULL
    );
  `;

  try {
    console.log("Verificando la tabla 'alumnos'...");
    await query(createTableQuery); // Ejecuta la consulta usando query
    console.log("Tabla 'alumnos' verificada o creada exitosamente.");
  } catch (error) {
    console.error('Error al verificar o crear la tabla:', error.message);
    process.exit(1); // Finaliza la ejecución si hay un error crítico
  }
}

module.exports = initializeDatabase;
