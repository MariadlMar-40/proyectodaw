import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AgregarEjercicio from '../components/AgregarEjercicio';
import './CrearEntrenamiento.css';

function CrearEntrenamiento() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [ejercicios, setEjercicios] = useState([]);
  const [mostrarFormularioEjercicio, setMostrarFormularioEjercicio] = useState(false);

  const handleAgregarEjercicio = (nuevoEjercicio) => {
    setEjercicios([...ejercicios, nuevoEjercicio]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMensaje('❌ No tienes sesión iniciada.');
      return;
    }

    try {
      // Crear entrenamiento
      const res = await fetch('http://localhost:3000/api/entrenamientos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: nombre, 
          descripcion: descripcion, 
          is_public: isPublic,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al crear entrenamiento');
      }

      const entrenamientoId = data.entrenamiento.id;

      // Crear ejercicios y vincular con detalles
      for (let ej of ejercicios) {
        const resEj = await fetch('http://localhost:3000/api/ejercicios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nombre: ej.nombre,
            descripcion: ej.descripcion,
            tipo: ej.tipo,
            grupo_muscular: ej.grupo_muscular,
            duracion: ej.duracion,
            imagen: ej.imagen,
          }),
        });

        const dataEj = await resEj.json();
        if (!resEj.ok) throw new Error(dataEj.error || 'Error al crear ejercicio');

        await fetch('http://localhost:3000/api/entrenamiento-ejercicio', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            entrenamiento_id: entrenamientoId,
            ejercicio_id: dataEj.ejercicio.id,
            series: ej.series || null,
            repeticiones: ej.repeticiones || null,
            tiempo: ej.tiempo || null,
          }),
        });
      }

      setMensaje('✅ Entrenamiento creado con ejercicios');
      setTimeout(() => navigate('/mis-entrenamientos'), 1000);
    } catch (err) {
      setMensaje('❌ ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear nuevo entrenamiento</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      ></textarea>

      <label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={() => setIsPublic(!isPublic)}
        />
        ¿Hacer público?
      </label>

      <h3>Ejercicios</h3>

      <button
        type="button"
        onClick={() => setMostrarFormularioEjercicio(!mostrarFormularioEjercicio)}
      >
        {mostrarFormularioEjercicio ? 'Cancelar' : '➕ Agregar ejercicio'}
      </button>

      {mostrarFormularioEjercicio && (
        <AgregarEjercicio
          onAdd={(ejercicio) => {
            handleAgregarEjercicio(ejercicio);
            setMostrarFormularioEjercicio(false);
          }}
        />
      )}


      {ejercicios.length > 0 && (
  <div className="ejercicios-preview">
    <h4>Ejercicios añadidos:</h4>
    <ul>
      {ejercicios.map((ej, index) => (
        <li key={index}>
          <strong>{ej.nombre}</strong> — {ej.grupo_muscular} — {ej.duracion || 0} min
          {ej.series && ` — ${ej.series}x${ej.repeticiones || 0}`}
          {ej.tiempo && ` — ${ej.tiempo}s`}
        </li>
      ))}
    </ul>
  </div>
)}

      <ul>
        {ejercicios.map((ej, i) => (
          <li key={i}>
            {ej.nombre} - {ej.grupo_muscular} - {ej.duracion} min — 
            {ej.series}x{ej.repeticiones} / {ej.tiempo} seg
          </li>
        ))}
      </ul>

      <button type="submit">Guardar entrenamiento</button>
      <button type="button" onClick={() => navigate('/perfil')} className="boton-volver">← Volver a Mi perfil</button>

      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}

export default CrearEntrenamiento;

