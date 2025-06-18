// controllers/entrenamientoController.js

const entrenamientoModel = require("../models/entrenamientoModel");

// GET /api/entrenamientos/:id
exports.obtenerEntrenamiento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuarioId = req.user.id;

    const { data, error } = await entrenamientoModel.obtenerEntrenamientoPorId(
      id,
      usuarioId
    );

    if (error || !data) {
      return res.status(404).json({ error: "Entrenamiento no encontrado" });
    }

    res.json({ entrenamiento: data });
  } catch (err) {
    next(err);
  }
};

// PUT /api/entrenamientos/:id
exports.actualizarEntrenamiento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entrenamientoActualizado = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      is_public: req.body.is_public,
    };

    const { data, error } = await entrenamientoModel.actualizarEntrenamiento(
      id,
      req.user.id,
      entrenamientoActualizado
    );

    if (error) {
      return res
        .status(400)
        .json({ error: "Error al actualizar entrenamiento" });
    }

    res.json({
      message: "Entrenamiento actualizado correctamente",
      entrenamiento: data,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/entrenamientos/:id
exports.eliminarEntrenamiento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await entrenamientoModel.eliminarEntrenamiento(
      id,
      req.user.id
    );

    if (error) {
      return res.status(400).json({ error: "Error al eliminar entrenamiento" });
    }

    res.json({ message: "Entrenamiento eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};

// POST /api/entrenamientos
exports.crearEntrenamiento = async (req, res, next) => {
  try {
    const nuevoEntrenamiento = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      is_public: req.body.is_public,
      usuario_id: req.user.id,
    };

    const { data, error } = await entrenamientoModel.crearEntrenamiento(
      nuevoEntrenamiento
    );

    if (error) {
      return res.status(400).json({ error: "Error al crear entrenamiento" });
    }

    res.status(201).json({
      message: "Entrenamiento creado correctamente",
      entrenamiento: data,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/entrenamientos/publicos
exports.listarEntrenamientosPublicos = async (req, res, next) => {
  try {
    const { data, error } =
      await entrenamientoModel.obtenerEntrenamientosPublicos();

    if (error) {
      return res
        .status(400)
        .json({ error: "Error al obtener entrenamientos públicos" });
    }

    res.json({ entrenamientos: data });
  } catch (err) {
    next(err);
  }
};

//GET /api/entrenamientos/privados
exports.listarEntrenamientosPrivados = async (req, res, next) => {
  try {
    const { data, error } =
      await entrenamientoModel.obtenerEntrenamientosPrivados(req.user.id);

    if (error) {
      return res
        .status(400)
        .json({ error: "Error al obtener entrenamientos privados" });
    }

    res.json({ entrenamientos: data });
  } catch (err) {
    next(err);
  }
};

//GET /api/entrenamientos/por id de usuario
exports.listarEntrenamientosPorUsuario = async (req, res, next) => {
  try {
    const { data, error } =
      await entrenamientoModel.obtenerEntrenamientosDeUsuario(req.user.id);

    if (error) {
      return res
        .status(400)
        .json({ error: "Error al obtener entrenamientos del usuario" });
    }

    res.json({ entrenamientos: data });
  } catch (err) {
    next(err);
  }
};

//Obtener ejercicios de un entrenamiento.
exports.obtenerEjerciciosDeEntrenamiento = async (req, res, next) => {
  const entrenamientoId = req.params.id;

  try {
    const { data, error } =
      await entrenamientoModel.obtenerEjerciciosPorEntrenamiento(
        entrenamientoId
      );

    if (error) {
      return res.status(500).json({ error: "Error al obtener los ejercicios" });
    }

    res.json({ ejercicios: data });
  } catch (err) {
    next(err);
  }
};
