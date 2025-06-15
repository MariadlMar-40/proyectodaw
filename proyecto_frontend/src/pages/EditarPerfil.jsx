import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiPut } from "../services/api";
import { useNavigate } from "react-router-dom";

function EditarPerfil() {
  const { usuario, setUsuario } = useAuth(); // ✅ obtenemos también setUsuario
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    contraseña: "",
    edad: "",
    genero: "",
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (usuario) {
      setForm({
        nombre: usuario.nombre || "",
        contraseña: "",
        edad: usuario.edad || "",
        genero: usuario.genero || "",
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await apiPut("/auth/perfil", form, token); // Guardamos la respuesta
      setUsuario(res.perfil); // actualizamos el contexto
      setMensaje("✅ Perfil actualizado correctamente.");
      setTimeout(() => navigate("/perfil"), 1000);
    } catch (error) {
      console.error("Error al actualizar:", error.message);
      setMensaje("❌ Error al actualizar el perfil.");
    }
  };

  return (
    <div>
      <h2>Editar perfil</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <label>Contraseña (nueva):</label>
        <input
          type="password"
          name="contraseña"
          value={form.contraseña}
          onChange={handleChange}
        />

        <label>Edad:</label>
        <input
          type="number"
          name="edad"
          value={form.edad}
          onChange={handleChange}
        />

        <label>Género:</label>
        <select name="genero" value={form.genero} onChange={handleChange}>
          <option value="">Seleccionar</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>

        <button type="submit">Guardar cambios</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
}

export default EditarPerfil;
