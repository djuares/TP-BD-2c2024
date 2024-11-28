const express = require('express');
const router = express.Router();
const Alumno = require('../models/Alumno'); // Modelo de Alumnos

// Crear alumno
router.post('/', async (req, res) => {
  try {
    const nuevoAlumno = new Alumno(req.body);
    const alumno = await nuevoAlumno.save();
    res.status(201).json(alumno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leer todos los alumnos
router.get('/', async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.status(200).json(alumnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un alumno
router.put('/:padron', async (req, res) => {
  try {
    const alumno = await Alumno.findOneAndUpdate(
      { padron: req.params.padron }, // Filtro para buscar por padron
      req.body, // Nuevos datos
      { new: true, runValidators: true } // Devuelve el documento actualizado y valida los datos
    );
    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
    res.status(200).json(alumno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un alumno por padron
router.delete('/:padron', async (req, res) => {
  try {
    const alumno = await Alumno.findOneAndDelete({ padron: Number(req.params.padron) });
    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }
    res.status(200).json({ message: 'Alumno eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
