import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./MisEntrenamientos.css";

function MisEntrenamientos() {
  const { usuario } = useAuth();
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrivados = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(
          `http://localhost:3000/api/entrenamientos/todos`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setEntrenamientos(data.entrenamientos || []);
      } catch (err) {
        console.error("Error al cargar entrenamientos privados:", err);
      } finally {
        setCargando(false);
      }
    };

    if (usuario) {
      fetchPrivados();
    }
  }, [usuario]);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar este entrenamiento?"
    );
    if (!confirmar) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://localhost:3000/api/entrenamientos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "No se pudo eliminar el entrenamiento");
        return;
      }

      // Actualiza la lista después de eliminar
      setEntrenamientos((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error al eliminar el entrenamiento:", error);
    }
  };

  if (cargando) return <p>Cargando tus entrenamientos...</p>;

  return (
    <div>
      <h2>Mis entrenamientos</h2>

      <button onClick={() => navigate("/perfil")}>⬅️ Mi perfil</button>

      <button onClick={() => navigate("/crear")}>
        ➕ Crear nuevo entrenamiento
      </button>

      {entrenamientos.length === 0 ? (
        <p>No tienes entrenamientos aún.</p>
      ) : (
        <ul>
          {entrenamientos.map((ent) => (
            <li key={ent.id}>
              <h3>{ent.nombre}</h3>
              <p>{ent.descripcion}</p>
              <small>Privado: {ent.is_public ? "No" : "Sí"}</small>
              <br />
              <button onClick={() => handleEliminar(ent.id)}>🗑 Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MisEntrenamientos;
