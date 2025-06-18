import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./MisEntrenamientos.css";

function MisEntrenamientos() {
  const { usuario } = useAuth();
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [ejerciciosPorEntrenamiento, setEjerciciosPorEntrenamiento] = useState({});
  const [entrenamientoExpandido, setEntrenamientoExpandido] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrivados = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`http://localhost:3000/api/entrenamientos/todos`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setEntrenamientos(data.entrenamientos || []);
      } catch (err) {
        console.error("Error al cargar entrenamientos privados:", err);
      } finally {
        setCargando(false);
      }
    };

    if (usuario) fetchPrivados();
  }, [usuario]);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Eliminar este entrenamiento?");
    if (!confirmar) return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:3000/api/entrenamientos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "No se pudo eliminar el entrenamiento");
        return;
      }

      setEntrenamientos((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error al eliminar el entrenamiento:", error);
    }
  };

  const toggleEjercicios = async (entId) => {
    if (entrenamientoExpandido === entId) {
      setEntrenamientoExpandido(null); // cerrar
      return;
    }

    if (!ejerciciosPorEntrenamiento[entId]) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/api/entrenamientos/${entId}/ejercicios`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
       
        setEjerciciosPorEntrenamiento((prev) => ({ ...prev, [entId]: data.ejercicios || [] }));
      } catch (err) {
        console.error("Error al cargar ejercicios:", err);
      }
    }


    setEntrenamientoExpandido(entId); // abrir
  };

  if (cargando) return <p>Cargando tus entrenamientos...</p>;

  return (
    <div>
      <h2>Mis entrenamientos</h2>

      <button onClick={() => navigate("/perfil")}>⬅️ Mi perfil</button>
      <button onClick={() => navigate("/crear")}>➕ Crear nuevo entrenamiento</button>

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
              <button onClick={() => toggleEjercicios(ent.id)}>
                {entrenamientoExpandido === ent.id ? "🔽 Ocultar ejercicios" : "▶️ Ver ejercicios"}
              </button>

              {entrenamientoExpandido === ent.id &&
                ejerciciosPorEntrenamiento[ent.id] && (
                  <ul>
                    {ejerciciosPorEntrenamiento[ent.id].map((ej) =>
                    { 
                    /*descripcion : "Carrera continua"
                      duracion: 50
                      grupo_muscular: "full body"
                      id: "a8f68026-2bf1-47d7-b585-03b1e3c9f0de"
                      nombre: "carrera"
                      repeticiones: 1
                      series: 1
                      tiempo: 3000
                      tipo: "running"
*/
                      return  (
                      
                      <li key={ej.id}>
                        <strong>{ej.nombre}</strong> <br/> 
                        - {ej.descripcion} <br/>
                        - {ej.grupo_muscular} <br/>
                        - {ej.duracion} min <br/>
                        - {ej.repeticiones} repeticiones <br/>
                        - {ej.tipo} 
                      </li>
                    )})}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MisEntrenamientos;
