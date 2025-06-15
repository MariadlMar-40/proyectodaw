// app.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const authRoutes = require('./routes/auth.routes');
const entrenamientoRoutes = require('./routes/entrenamiento.routes');

// const userRoutes = require('./routes/')
app.use('/api/auth', authRoutes);
app.use('/api/entrenamientos', entrenamientoRoutes);

// app.use('/api/usuarios/', userRouter);
app.get('/', (req, res) => {
  res.json({ message: 'API de FreeSport funcionando 🚀' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

app.use('/api/ejercicios', require('./routes/ejercicio.routes'));
app.use('/api/entrenamiento-ejercicio', require('./routes/entrenamientoEjercicio.routes'));


module.exports = app;
