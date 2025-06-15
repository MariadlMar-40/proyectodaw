import { useEffect, useState } from 'react';
import './EntrenamientosPublicos.css';
import { Link } from 'react-router-dom';

function EntrenamientosPublicos() {
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState(''); // 🆕 Estado para la búsqueda

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

  const entrenamientosFiltrados = entrenamientos.filter((ent) =>
    ent.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) return <p>Cargando entrenamientos públicos...</p>;

  return (
    <div>
      <h2>Entrenamientos públicos</h2>

      {/* 🆕 Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: '400px' }}
      />

      {entrenamientosFiltrados.length === 0 ? (
        <p>No hay entrenamientos públicos disponibles.</p>
      ) : (
        <ul>
          {entrenamientosFiltrados.map((ent) => (
            <li key={ent.id}>
              <h3>{ent.nombre}</h3>
              <p>{ent.descripcion}</p>
            </li>
          ))}
        </ul>
      )}

      {/* 🔙 Botón para volver a inicio */}
      <Link to="/" className="btn">⬅️ Volver a inicio</Link>
    </div>
  );
}

export default EntrenamientosPublicos;
