import { useEffect, useState } from 'react';
import './EntrenamientosPublicos.css';
import { Link } from 'react-router-dom';

function EntrenamientosPublicos() {
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [ejerciciosPorEntrenamiento, setEjerciciosPorEntrenamiento] = useState({});
  const [entrenamientoExpandido, setEntrenamientoExpandido] = useState(null);

  useEffect(() => {
    const fetchEntrenamientos = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/entrenamientos/publicos');
        const data = await res.json();
        setEntrenamientos(data.entrenamientos || []);
      } catch (error) {
        console.error('Error al obtener entrenamientos públicos', error);
      } finally {
        setCargando(false);
      }
    };

    fetchEntrenamientos();
  }, []);

  const toggleEjercicios = async (entId) => {
    if (entrenamientoExpandido === entId) {
      setEntrenamientoExpandido(null);
      return;
    }

    if (!ejerciciosPorEntrenamiento[entId]) {
      try {
        const res = await fetch(`http://localhost:3000/api/entrenamientos/${entId}/ejerciciospublicos`);
        const data = await res.json();
        setEjerciciosPorEntrenamiento((prev) => ({ ...prev, [entId]: data.ejercicios || [] }));
      } catch (err) {
        console.error("Error al cargar ejercicios:", err);
      }
    }

    setEntrenamientoExpandido(entId);
  };

  const entrenamientosFiltrados = entrenamientos.filter((ent) =>
    ent.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) return <p>Cargando entrenamientos públicos...</p>;

  return (
    <div className="entrenamientos-publicos">
      <h2>Entrenamientos públicos</h2>

      <input
        type="text"
        className="busqueda-input"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {entrenamientosFiltrados.length === 0 ? (
        <p>No hay entrenamientos públicos disponibles.</p>
      ) : (
        <ul className="lista-entrenamientos">
          {entrenamientosFiltrados.map((ent) => (
            <li key={ent.id} className="entrenamiento-item">
              <h3>{ent.nombre}</h3>
              <p>{ent.descripcion}</p>

              <button onClick={() => toggleEjercicios(ent.id)}>
                {entrenamientoExpandido === ent.id
                  ? "🔽 Ocultar ejercicios"
                  : "▶️ Ver ejercicios"}
              </button>

              {entrenamientoExpandido === ent.id &&
                ejerciciosPorEntrenamiento[ent.id] && (
                  <ul className="lista-ejercicios">
                    {ejerciciosPorEntrenamiento[ent.id].map((ej) => (
                      <li key={ej.id}>
                        <strong>{ej.nombre}</strong> <br/> 
                        - {ej.descripcion} <br/>
                        - {ej.grupo_muscular} <br/>
                        - {ej.duracion} min <br/>
                        - {ej.repeticiones} repeticiones <br/>
                        - {ej.tipo} 
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      )}

      <Link to="/" className="btn">⬅️ Volver a inicio</Link>
    </div>
  );
}

export default EntrenamientosPublicos;
