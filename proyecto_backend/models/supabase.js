// Importamos la función para crear el cliente de Supabase
const { createClient } = require('@supabase/supabase-js');

// Cargamos las variables de entorno definidas en el archivo .env
require('dotenv').config();

// Obtenemos la URL y la clave secreta de Supabase desde las variables de entorno
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Validamos que ambas variables estén definidas.
// Si falta alguna, lanzamos un error para evitar que la app arranque mal configurada.
if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL y SUPABASE_KEY deben estar definidos en el archivo .env');
}

// Creamos una única instancia de Supabase que se reutilizará en toda la app
const supabase = createClient(supabaseUrl, supabaseKey);

// Exportamos la instancia para poder usarla en otros archivos del backend
module.exports = supabase;

