const supabase = require('./supabase');

exports.crearEjercicio = async (ejercicio) => {
  const { data, error } = await supabase
    .from('ejercicios')
    .insert([ejercicio])
    .select()
    .single();

  return { data, error };
};
