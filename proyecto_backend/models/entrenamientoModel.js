const supabase = require('./supabase');

// Obtener todos los entrenamientos privados del usuario
exports.obtenerEntrenamientosPrivados = async (userId) => {
  const { data, error } = await supabase
    .from('entrenamientos') // Asegúrate de usar el nombre correcto
    .select('*')
    .eq('usuario_id', userId)
    .eq('is_public', false);

  return { data, error };
};

// Crear un nuevo entrenamiento 
exports.crearEntrenamiento = async ({ nombre, descripcion, is_public, usuario_id }) => {
  const { data, error } = await supabase
    .from('entrenamientos') 
    .insert([{
      nombre: nombre,
      descripcion: descripcion,
      is_public,
      usuario_id: usuario_id, 
    }])
    .select()
    .single(); // devuelve un solo objeto

  return { data, error };
};

// Obtener un entrenamiento por ID (si pertenece al usuario)
exports.obtenerEntrenamientoPorId = async (id, userId) => {
  const { data, error } = await supabase
    .from('entrenamientos')
    .select('*')
    .eq('id', id)
    .eq('usuario_id', userId)
    .single(); // esperamos un único resultado

  return { data, error };
};

// Actualizar un entrenamiento (solo si pertenece al usuario)
exports.actualizarEntrenamiento = async (id, userId, { title, description, is_public }) => {
  const { data, error } = await supabase
    .from('entrenamientos')
    .update({
      nombre: nombre,
      descripcion: descripcion,
      is_public,
    })
    .eq('id', id)
    .eq('usuario_id', userId)
    .select()
    .single(); // devolvemos el entrenamiento actualizado como objeto

  return { data, error };
};

// Eliminar un entrenamiento (solo si pertenece al usuario)
exports.eliminarEntrenamiento = async (id, userId) => {
  const { error } = await supabase
    .from('entrenamientos')
    .delete()
    .eq('id', id)
    .eq('usuario_id', userId);

  return { error };
};

// Obtener todos los entrenamientos públicos (sin autenticación)
exports.obtenerEntrenamientosPublicos = async () => {
  const { data, error } = await supabase
    .from('entrenamientos')
    .select('*')
    .eq('is_public', true);

  return { data, error };
};


// Obtener todos los entrenamientos del usuario
exports.obtenerEntrenamientosDeUsuario = async (userId) => {
  const { data, error } = await supabase
    .from('entrenamientos') 
    .select('*')
    .eq('usuario_id', userId);

  return { data, error };
};


