const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const entrenamientoController = require('../controllers/entrenamientoController');


//router.get('/', requireAuth, entrenamientoController.obtenerEntrenamientosDelUsuario);

// Obtener entrenamientos privados del usuario
router.get('/', requireAuth, entrenamientoController.listarEntrenamientosPrivados);

// Obtener todos los entrenamientos del usuario
router.get('/todos', requireAuth, entrenamientoController.listarEntrenamientosPorUsuario);

// Crear nuevo entrenamiento 
router.post('/', requireAuth, entrenamientoController.crearEntrenamiento);

// Entrenamientos públicos
router.get('/publicos', entrenamientoController.listarEntrenamientosPublicos);

// Entrenamiento por ID
// router.get('/:id', requireAuth, entrenamientoController.listarEntrenamientosPorUsuario);
router.put('/:id', requireAuth, entrenamientoController.actualizarEntrenamiento);
router.delete('/:id', requireAuth, entrenamientoController.eliminarEntrenamiento);


module.exports = router;


