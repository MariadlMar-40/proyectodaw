const supabase = require('./supabase');

exports.vincularEjercicio = async ({
  entrenamiento_id,
  ejercicio_id,
  repeticiones,
  series,
  tiempo,
}) => {
  const { data, error } = await supabase
    .from('entrenamiento_ejercicio')
    .insert([
      {
        entrenamiento_id,
        ejercicio_id,
        repeticiones,
        series,
        tiempo,
      },
    ])
    .select()
    .single();

  return { data, error };
};
