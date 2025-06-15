const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const entrenamientoModel = require('../models/entrenamientoModel');

// GET /perfil
exports.obtenerPerfil = async (req, res) => {
  const userId = req.user.id;

  const { data: usuario, error } = await userModel.obtenerUsuarioPorId(userId);

  if (error || !usuario) {
    return res.status(404).json({ error: "Perfil no encontrado" });
  }

  const { data: entrenamientos, error: errorEntrenos } =
    await entrenamientoModel.obtenerEntrenamientosDeUsuario(userId);

  if (errorEntrenos) {
    return res.status(500).json({ error: "Error al cargar entrenamientos" });
  }

  delete usuario.contraseña;

  res.json({
    perfil: usuario,
    entrenamientos: entrenamientos || []
  });
};

// POST /api/auth/register
exports.crearUsuario = async (req, res, next) => {
  try {
    const { email, contraseña } = req.body;
    
    if (!email || !contraseña) {
      return res.status(400).json({ error: "Email y contraseña requeridos" });
    }
    
    const { data, error } = await userModel.crearUsuario({ email, contraseña });
    console.log(data);
    // console.log(data);

    if (error) {
      console.error("❌ Error al crear usuario:", error);
      return res.status(400).json({ error: "Error al crear usuario" });
    }

    
    res.status(201).json({
      message: "Usuario creado correctamente",
      // usuario: data,
      usuario: 0,
    });
  } catch (err) {
    console.error("❌ Error en crearUsuario:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// POST /api/auth/login
exports.encontrarUsuarioLogin = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
      return res.status(400).json({ error: "Email y contraseña requeridos" });
    }

    const { data, error } = await userModel.encontrarUsuarioLogin({ email, contraseña });

    if (error || !data) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }

    delete data.contraseña;

    const token = jwt.sign(
      { userId: data.id, email: data.email },
      process.env.JWT_SECRET || 'R7dh3nA$Wz@#iU9lq2fT$6j#3Pvs8Bkz',
      
    );

    res.status(200).json({
      message: "Usuario ha iniciado sesión",
      usuario: data,
      token,
    });
  } catch (err) {
    console.error("❌ Error en login:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//Editar perfil de usuario
exports.editarPerfil = async (req, res) => {
  const userId = req.user.id;
  const { nombre, contraseña, edad, genero } = req.body;

  try {
    const camposActualizados = {
      nombre,
      edad,
      genero,
    };

    // Solo actualiza la contraseña si se ha enviado
    if (contraseña) {
      camposActualizados.contraseña = contraseña;
    }

    const { data, error } = await userModel.actualizarPerfil(userId, camposActualizados);

    if (error) {
      return res.status(400).json({ error: 'No se pudo actualizar el perfil' });
    }

    res.json({ message: 'Perfil actualizado correctamente', perfil: data });
  } catch (err) {
    console.error('Error al editar perfil:', err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

