const mongoose = require('mongoose');

const AlumnoSchema = new mongoose.Schema({
  padron: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
});

module.exports = mongoose.model('Alumno', AlumnoSchema);
