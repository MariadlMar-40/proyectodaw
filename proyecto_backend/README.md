
# FreeSport - Backend API

Este es el backend de **FreeSport**, una aplicación web para compartir y gestionar entrenamientos personales. Está construido con **Node.js**, **Express** y **Supabase**.

---

## 🚀 Tecnologías usadas

- Node.js + Express
- Supabase (Base de datos, autenticación, realtime)
- dotenv (variables de entorno)
- cors (seguridad CORS)
- nodemon (desarrollo)

---

## 📁 Estructura del proyecto

```
/backend
├── app.js               ← configuración principal de Express
├── server.js            ← arranca el servidor en local
├── .env                 ← variables de entorno (no subir)
├── /routes              ← rutas organizadas por recurso
├── /controllers         ← lógica de negocio
├── /models              ← acceso a datos (Supabase)
├── /middlewares         ← autenticación y manejo de errores
└── vercel.json          ← configuración para desplegar en Vercel
```

---

## 🧪 Cómo ejecutar en local

### 1. Clona el proyecto y entra al backend

```bash
cd ./proyecto_backend
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Crea el archivo `.env`

En la raíz de la carpeta `/backend`, crea un archivo `.env` con el siguiente contenido:

```env
PORT=3000
SUPABASE_URL=https://tuproyecto.supabase.co
SUPABASE_KEY=tu_clave_supabase
```

> ⚠️ Asegúrate de que `.env` esté en el `.gitignore`.

### 4. Ejecuta el servidor en desarrollo

```bash
npm run dev
```

### 5. Verifica que el backend funciona

Abre el navegador en:

```
http://localhost:3000
```

Deberías ver este mensaje:

```json
{ "message": "API de FreeSport funcionando 🚀" }
```

---

## 🌐 Rutas principales de la API

| Método | Endpoint                         | Descripción                        |
|--------|----------------------------------|------------------------------------|
| POST   | `/api/auth/register`             | Registro de usuario                |
| POST   | `/api/auth/login`                | Inicio de sesión                   |
| GET    | `/api/auth/perfil`               | Perfil del usuario autenticado     |
| GET    | `/api/entrenamientos/privados`   | Entrenamientos del usuario         |
| POST   | `/api/entrenamientos/crear`      | Crear un nuevo entrenamiento       |

---

## 🚀 Despliegue en Vercel

Este backend está preparado para funcionar en Vercel. Asegúrate de:

- Tener el archivo `vercel.json` en la raíz de `/backend`.
- Configurar variables de entorno (`SUPABASE_URL`, `SUPABASE_KEY`) desde el panel de Vercel.
- Exportar `app` en `app.js`, sin usar `app.listen(...)` directamente.
- Usar `server.js` solo para desarrollo local.

---

## 📬 Contacto

Cualquier duda, sugerencia o mejora, ¡bienvenida!
