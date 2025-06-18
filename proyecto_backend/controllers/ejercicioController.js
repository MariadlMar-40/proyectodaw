const ejercicioModel = require('../models/ejercicioModel');

exports.crearEjercicio = async (req, res) => {

  const ejercicio = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    tipo: req.body.tipo,
    grupo_muscular: req.body.grupo_muscular,
    duracion: req.body.duracion,
    imagen_url: req.body.imagen,
  };
  
  const { data, error } = await ejercicioModel.crearEjercicio(ejercicio);
  if (error) return res.status(400).json({ error });
  res.status(201).json({ ejercicio: data });
};
