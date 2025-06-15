const model = require('../models/entrenamientoEjercicioModel');

exports.vincular = async (req, res) => {
  const { entrenamiento_id, ejercicio_id, repeticiones, series, tiempo } = req.body;

  const { data, error } = await model.vincularEjercicio({
    entrenamiento_id,
    ejercicio_id,
    repeticiones,
    series,
    tiempo,
  });

  if (error) return res.status(400).json({ error });
  res.status(201).json({ vinculacion: data });
};
