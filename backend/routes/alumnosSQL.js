const express = require('express');
const router = express.Router();
const { query } = require('../db');  // Importa la función query desde db.js

// Crear un alumno
router.post('/', async (req, res) => {
  const { padron, nombre, apellido } = req.body;

  try {
    const result = await query(
      'INSERT INTO alumnos (padron, nombre, apellido) VALUES ($1, $2, $3) RETURNING *',
      [padron, nombre, apellido]
    );
    res.status(201).json(result.rows[0]);  // Retorna el alumno recién creado
  } catch (error) {
    console.error('Error al crear alumno:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Leer todos los alumnos
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM alumnos');
    res.status(200).json(result.rows);  // Retorna los alumnos
  } catch (error) {
    console.error('Error al obtener alumnos:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un alumno por padron
router.put('/:padron', async (req, res) => {
  const { padron } = req.params;
  const { nombre, apellido } = req.body;

  try {
    const result = await query(
      'UPDATE alumnos SET nombre = $1, apellido = $2 WHERE padron = $3 RETURNING *',
      [nombre, apellido, padron]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
    res.status(200).json(result.rows[0]);  // Retorna el alumno actualizado
  } catch (error) {
    console.error('Error al actualizar alumno:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un alumno por padron
router.delete('/:padron', async (req, res) => {
  const { padron } = req.params;

  try {
    const result = await query(
      'DELETE FROM alumnos WHERE padron = $1 RETURNING *',
      [padron]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
    res.status(200).json({ message: 'Alumno eliminado' });
  } catch (error) {
    console.error('Error al eliminar alumno:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
