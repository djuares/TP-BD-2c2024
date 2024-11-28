const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const mongoose = require('mongoose');
const alumnosRoutes = require('./routes/alumnos'); // Ruta para CRUD de Alumnos
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Conexión a la base de datos
/*const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});*/


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

// Rutas
app.use('/api/alumnos', alumnosRoutes);

// Ruta de prueba
/*app.get('/test', (req, res) => {
  db.query('SELECT * FROM estudiantes', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database connection failed' });
    } else {
      res.json(results);
    }
  });
});*/

// Escuchar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));


