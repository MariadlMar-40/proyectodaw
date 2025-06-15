import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Perfil.css';

function Perfil() {
  const { usuario, entrenamientos, cargando, logout } = useAuth();
  const navigate = useNavigate();

  if (cargando) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      <h2>Mi perfil</h2>

      {usuario ? (
        <>
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Rol:</strong> {usuario.rol}</p>
          <p><strong>Edad:</strong> {usuario.edad || "No especificada"}</p>
          <p><strong>Género:</strong> {usuario.genero || "No especificado"}</p>

          {/* Botón para editar perfil */}
          <button onClick={() => navigate('/editar-perfil')}>
            Editar perfil
          </button>

          {/* Botón para cerrar sesión */}
          <button onClick={logout}>Cerrar sesión</button>

          <hr />

          <button onClick={() => navigate('/mis-entrenamientos')}>
            Mis entrenamientos
          </button>
        </>
      ) : (
        <p>No se encontró usuario.</p>
      )}
    </div>
  );
}

export default Perfil;
