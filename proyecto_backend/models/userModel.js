const supabase = require('./supabase');

// Crear un nuevo usuario
exports.crearUsuario = async ({ email, contraseña }) => {
  const { data, error } = await supabase
    .from("usuarios")
    .insert([{ email, contraseña }])
    .select()
    .single(); // devolvemos un solo usuario

  return {data,error};
};

// Buscar usuario por email
exports.buscarPorEmail = async (email) => {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .single();

  if (error) return null;
  return data;
};

//Obtener usuario por ID
exports.obtenerUsuarioPorId = async (id) => {
  const { data, error } = await supabase
    .from("usuarios")
    .select("id, nombre, email, rol, edad, genero, fecha_registro")
    .eq("id", id)
    .single();

  return { data, error };
};


// Buscar usuario por email y contraseña
exports.encontrarUsuarioLogin = async ({ email, contraseña }) => {
  
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .eq("contraseña", contraseña) 
    .single();

  if (error) return { data: null, error };
  return { data, error: null };
};

//Actualizar perfil de usuario

exports.actualizarPerfil = async (id, camposActualizados) => {
  // Elimina claves vacías o sin cambios
  const actualizados = Object.fromEntries(
    Object.entries(camposActualizados).filter(([_, v]) => v !== undefined && v !== '')
  );

  const { data, error } = await supabase
    .from('usuarios')
    .update(actualizados)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
};
