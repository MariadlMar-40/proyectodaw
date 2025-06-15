import './EntrenamientoCard.css';
import { apiDelete } from '../services/api';
import { useAuth } from '../context/AuthContext';

function EntrenamientoCard({ entrenamiento, onEliminar, onEditar }) {
  const { usuario } = useAuth();

  const handleEliminar = async () => {
    if (!window.confirm('¿Seguro que quieres eliminar este entrenamiento?')) return;

    try {
      await apiDelete(`/entrenamientos/eliminarEntrenamiento/${entrenamiento.id}`, usuario.access_token);
      if (onEliminar) onEliminar(entrenamiento.id);
    } catch (error) {
      console.error('Error al eliminar:', error.message);
      alert('Error al eliminar el entrenamiento');
    }
  };

  return (
    <div className="card">
      <h3>{entrenamiento.nombre}</h3>
      <p>{entrenamiento.descripcion}</p>
      <p><strong>Fecha:</strong> {new Date(entrenamiento.fecha).toLocaleDateString()}</p>
      <p><strong>Visibilidad:</strong> {entrenamiento.is_public ? 'Público' : 'Privado'}</p>
      <small><strong>Usuario ID:</strong> {entrenamiento.usuario_id}</small>

      <div className="card-actions">
        {/* Botón editar (si se pasa la función onEditar como prop) */}
        {onEditar && (
          <button className="btn-editar" onClick={() => onEditar(entrenamiento)}>
            Editar
          </button>
        )}

        {/* Botón eliminar */}
        <button className="btn-eliminar" onClick={handleEliminar}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default EntrenamientoCard;
