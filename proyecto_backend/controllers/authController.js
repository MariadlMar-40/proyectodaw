const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel'); 
const JWT_SECRET = process.env.JWT_SECRET;

// POST /auth/register
exports.postRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Verifica si el usuario ya existe
    const existe = await userModel.buscarPorEmail(email);
    if (existe) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }

    // Crea el nuevo usuario 
    const nuevoUsuario = await userModel.crearUsuario({ email, contraseña: password });

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      usuario: nuevoUsuario,
    });
  } catch (err) {
    next(err);
  }
};

// POST /auth/login
exports.postLogin = async (req, res, next) => {
  try {

    const { email, password } = req.body;
    console.log(email, password );

    // Busca el usuario
    const usuario = await userModel.buscarPorEmail(email);
    if (!usuario || usuario.contraseña !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Crea token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
     
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      usuario: { id: usuario.id, email: usuario.email },
      token
    });
  } catch (err) {
    next(err);
  }
};
