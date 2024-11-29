const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const alumnosRoutes = require('./routes/alumnos');  // Rutas para MongoDB
const alumnosSQLRoutes = require('./routes/alumnosSQL');  // Rutas para PostgreSQL
const initializeDatabase = require('./initializeDatabase'); // Importa la función
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};
connectMongoDB();

// Inicializa la base de datos PostgreSQL
initializeDatabase();

// Rutas
app.use('/api/alumnos', alumnosRoutes);  // Rutas para MongoDB
app.use('/api/sql/alumnos', alumnosSQLRoutes);  // Rutas para PostgreSQL

// Escuchar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
