const express = require('express');
const router = express.Router();
const ejercicioController = require('../controllers/ejercicioController');
const requireAuth = require('../middlewares/requireAuth');

router.post('/', requireAuth, ejercicioController.crearEjercicio);

// Obtener todos los ejercicios de un entrenamiento
//router.get('/todos', requireAuth, ejercicioController.listarEjerciciosPorEntrenamiento);

module.exports = router;
