const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// const userController = require('../controllers/userController');
const userController = require('../controllers/userController');
const requireAuth = require('../middlewares/requireAuth');

// Procesar formularios

router.post('/login', async (req, res) => {
  try {
    console.log('📥 Datos recibidos:', req.body);

    const { email, contraseña } = req.body;

    const { data, error } = await require('../models/userModel').encontrarUsuarioLogin({ email, contraseña });

    console.log('📤 Resultado Supabase:', { data, error });

    if (error || !data) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    const token = require('jsonwebtoken').sign(
      { userId: data.id, email: data.email },
      'R7dh3nA$Wz@#iU9lq2fT$6j#3Pvs8Bkz'
    );

    res.json({ message: 'Login correcto', usuario: data, token });
  } catch (err) {
    console.error('❌ Error inesperado en login:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.put('/perfil', requireAuth, userController.editarPerfil);


router.post('/register', userController.crearUsuario);

// Ruta protegida para obtener datos del usuario logueado
router.get('/perfil', requireAuth, userController.obtenerPerfil);


module.exports = router;


