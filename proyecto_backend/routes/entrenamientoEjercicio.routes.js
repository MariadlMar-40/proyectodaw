const express = require('express');
const router = express.Router();
const controller = require('../controllers/entrenamientoEjercicioController');
const requireAuth = require('../middlewares/requireAuth');

router.post('/', requireAuth, controller.vincular);

module.exports = router;
