# 🏋️‍♂️ FreeSport

**FreeSport** es una aplicación web desarrollada con **React + Vite** que permite a los usuarios crear, visualizar y compartir entrenamientos personales. Utiliza **Supabase** para la autenticación y gestión de datos en tiempo real.

---

## 🚀 Características

- Registro e inicio de sesión con correo y contraseña (Supabase Auth)
- Creación, edición y eliminación de entrenamientos privados
- Visualización de entrenamientos públicos
- Interfaz clara y adaptada con estilos en tonos azules y blancos
- Integración con Supabase como backend (API REST + Auth)

---

## 🧱 Tecnologías

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Supabase](https://supabase.com/)
- CSS personalizado

---

## ⚙️ Instalación

```bash
git clone https://github.com/MariadlMar-40/proyectodaw.git
cd ./proyecto_frontend
npm install
```

---

## 🔐 Variables de entorno (producción)

Crea un archivo `.env` en la raíz del proyecto y añade:

```env
VITE_SUPABASE_URL=https://<tu-proyecto>.supabase.co
VITE_SUPABASE_ANON_KEY=<tu-anon-key>
VITE_BACKEND_URL=https://api.tudominio.com/api
```

---

## 🧪 Scripts de desarrollo

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Genera la build para producción
```

---

## 📁 Estructura de carpetas

```
/src
  ├── components
  ├── pages
  ├── services
  ├── context
  └── supabase
```

---

## 📌 Notas

- Este frontend está diseñado para consumir una API REST desplegada en un dominio real (no localhost).
- Asegúrate de configurar correctamente los CORS en tu backend.
- La clave pública de Supabase es segura para el frontend, pero nunca uses `service_role_key` aquí.

---

## 🧑‍💻 Autor

Desarrollado por [María del Mar López Martínez]
